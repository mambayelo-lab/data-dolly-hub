import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, AIMessage, SystemMessage, type BaseMessage } from "@langchain/core/messages";
import {
  SUPERVISOR_PROMPT,
  BIZCAP_AGENT_PROMPT,
  ARCHITECTURE_AGENT_PROMPT,
  EVENTSOURCING_AGENT_PROMPT,
  SIZING_AGENT_PROMPT,
} from "./prompts";

// ─── State Definition ───────────────────────────────────────────────

const AuraState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  next_agent: Annotation<string>({
    reducer: (_, y) => y,
    default: () => "supervisor",
  }),
  artifacts: Annotation<unknown[]>({
    reducer: (x, y) => x.concat(y),
    default: () => [],
  }),
  context: Annotation<Record<string, unknown>>({
    reducer: (x, y) => ({ ...x, ...y }),
    default: () => ({}),
  }),
  iteration: Annotation<number>({
    reducer: (_, y) => y,
    default: () => 0,
  }),
});

// ─── LLM Factory ────────────────────────────────────────────────────

function makeLLM(temperature = 0.3) {
  return new ChatAnthropic({
    model: "claude-sonnet-5",
    temperature,
    maxTokens: 4096,
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

// ─── Helper: extract JSON artifact from assistant text ───────────────

function extractArtifacts(text: string): unknown[] {
  const artifacts: unknown[] = [];
  const jsonRegex = /```json\n([\s\S]*?)\n```/g;
  let match;
  while ((match = jsonRegex.exec(text)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed.type) artifacts.push(parsed);
    } catch {
      // ignore invalid JSON
    }
  }
  return artifacts;
}

// ─── Supervisor Node ────────────────────────────────────────────────

async function supervisorNode(state: typeof AuraState.State) {
  const llm = makeLLM(0.2);
  const messages = [
    new SystemMessage(SUPERVISOR_PROMPT),
    ...state.messages,
    new HumanMessage(
      `Analyse la dernière demande et réponds de manière experte.
      Si tu dois déléguer à un agent spécialisé, indique-le avec le format: ROUTE_TO: [agent_name]
      Agents disponibles: bizcap, architecture, eventsourcing, infra, data, cyber, migration, benchmark, sizing`
    ),
  ];

  const response = await llm.invoke(messages);
  const content = response.content as string;

  // Check if supervisor wants to route to a specialized agent
  const routeMatch = content.match(/ROUTE_TO:\s*(\w+)/i);
  const nextAgent = routeMatch ? routeMatch[1].toLowerCase() : "end";

  const artifacts = extractArtifacts(content);

  return {
    messages: [new AIMessage(content)],
    next_agent: nextAgent,
    artifacts,
    iteration: state.iteration + 1,
  };
}

// ─── BizCap Agent Node ───────────────────────────────────────────────

async function bizcapNode(state: typeof AuraState.State) {
  const llm = makeLLM(0.3);
  const messages = [
    new SystemMessage(BIZCAP_AGENT_PROMPT),
    ...state.messages,
  ];

  const response = await llm.invoke(messages);
  const content = response.content as string;
  const artifacts = extractArtifacts(content);

  return {
    messages: [new AIMessage(content)],
    next_agent: "end",
    artifacts,
  };
}

// ─── Architecture Agent Node ─────────────────────────────────────────

async function architectureNode(state: typeof AuraState.State) {
  const llm = makeLLM(0.3);
  const messages = [
    new SystemMessage(ARCHITECTURE_AGENT_PROMPT),
    ...state.messages,
  ];

  const response = await llm.invoke(messages);
  const content = response.content as string;
  const artifacts = extractArtifacts(content);

  return {
    messages: [new AIMessage(content)],
    next_agent: "end",
    artifacts,
  };
}

// ─── Event Storming Agent Node ────────────────────────────────────────

async function eventstormingNode(state: typeof AuraState.State) {
  const llm = makeLLM(0.3);
  const messages = [
    new SystemMessage(EVENTSOURCING_AGENT_PROMPT),
    ...state.messages,
  ];

  const response = await llm.invoke(messages);
  const content = response.content as string;
  const artifacts = extractArtifacts(content);

  return {
    messages: [new AIMessage(content)],
    next_agent: "end",
    artifacts,
  };
}

// ─── Sizing Agent Node ────────────────────────────────────────────────

async function sizingNode(state: typeof AuraState.State) {
  const llm = makeLLM(0.2);
  const messages = [
    new SystemMessage(SIZING_AGENT_PROMPT),
    ...state.messages,
  ];

  const response = await llm.invoke(messages);
  const content = response.content as string;
  const artifacts = extractArtifacts(content);

  return {
    messages: [new AIMessage(content)],
    next_agent: "end",
    artifacts,
  };
}

// ─── Generic specialized node factory ────────────────────────────────

function makeSpecializedNode(systemPrompt: string) {
  return async (state: typeof AuraState.State) => {
    const llm = makeLLM(0.3);
    const messages = [new SystemMessage(systemPrompt), ...state.messages];
    const response = await llm.invoke(messages);
    const content = response.content as string;
    const artifacts = extractArtifacts(content);
    return { messages: [new AIMessage(content)], next_agent: "end", artifacts };
  };
}

// ─── Routing Logic ────────────────────────────────────────────────────

function routeFromSupervisor(state: typeof AuraState.State): string {
  const { next_agent, iteration } = state;

  // Safety: max 3 iterations
  if (iteration >= 3) return END;

  const agentMap: Record<string, string> = {
    bizcap: "bizcap",
    architecture: "architecture",
    eventsourcing: "eventsourcing",
    eventsourcing: "eventsourcing",
    sizing: "sizing",
    infra: "infra",
    data: "data",
    cyber: "cyber",
    migration: "migration",
    benchmark: "benchmark",
  };

  return agentMap[next_agent] ?? END;
}

// ─── Build the AURA Graph ─────────────────────────────────────────────

export function buildAuraGraph() {
  const graph = new StateGraph(AuraState)
    .addNode("supervisor", supervisorNode)
    .addNode("bizcap", bizcapNode)
    .addNode("architecture", architectureNode)
    .addNode("eventsourcing", eventstormingNode)
    .addNode("sizing", sizingNode)
    .addNode("infra", makeSpecializedNode(`${SUPERVISOR_PROMPT}\n\nTu es l'expert Infrastructure & Cloud. Conçois des architectures cloud-native robustes avec les meilleures pratiques AWS/Azure/GCP, Kubernetes, Terraform, et FinOps.`))
    .addNode("data", makeSpecializedNode(`${SUPERVISOR_PROMPT}\n\nTu es l'expert Architecture Data & Data Governance. Tu maîtrises Databricks, Dataiku, Data Mesh, Data Fabric, dbt, Kafka, et tous les patterns de Data Architecture modernes.`))
    .addNode("cyber", makeSpecializedNode(`${SUPERVISOR_PROMPT}\n\nTu es l'expert Cybersécurité Architecture. Tu maîtrises Zero Trust, SASE, IAM/PAM, DevSecOps, et toutes les conformités (RGPD, ISO27001, NIS2, PCI-DSS).`))
    .addNode("migration", makeSpecializedNode(`${SUPERVISOR_PROMPT}\n\nTu es l'expert Migration et Modernisation. Tu maîtrises l'éligibilité des applications (6R), le Strangler Fig pattern, la gestion des risques de migration, et l'orchestration des programmes de modernisation du SI.`))
    .addNode("benchmark", makeSpecializedNode(`${SUPERVISOR_PROMPT}\n\nTu es l'expert Veille Technologique et Benchmark. Tu connais toutes les dernières innovations 2024-2025 : GenAI, LangGraph, Platform Engineering, eBPF, WASM, et tu fais des comparatifs objectifs entre solutions.`))
    .addEdge(START, "supervisor")
    .addConditionalEdges("supervisor", routeFromSupervisor, {
      bizcap: "bizcap",
      architecture: "architecture",
      eventsourcing: "eventsourcing",
      sizing: "sizing",
      infra: "infra",
      data: "data",
      cyber: "cyber",
      migration: "migration",
      benchmark: "benchmark",
      [END]: END,
    })
    .addEdge("bizcap", END)
    .addEdge("architecture", END)
    .addEdge("eventsourcing", END)
    .addEdge("sizing", END)
    .addEdge("infra", END)
    .addEdge("data", END)
    .addEdge("cyber", END)
    .addEdge("migration", END)
    .addEdge("benchmark", END);

  return graph.compile();
}

// ─── Run helper ───────────────────────────────────────────────────────

export async function runAuraGraph(
  userMessage: string,
  history: Array<{ role: string; content: string }> = []
) {
  const graph = buildAuraGraph();

  const messages: BaseMessage[] = [
    ...history.map((m) =>
      m.role === "user"
        ? new HumanMessage(m.content)
        : new AIMessage(m.content)
    ),
    new HumanMessage(userMessage),
  ];

  const result = await graph.invoke({ messages });

  const lastMessage = result.messages[result.messages.length - 1];
  const content = typeof lastMessage.content === "string"
    ? lastMessage.content
    : JSON.stringify(lastMessage.content);

  return {
    content,
    artifacts: result.artifacts,
    agent: result.next_agent,
  };
}
