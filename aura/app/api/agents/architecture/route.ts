import { NextRequest, NextResponse } from "next/server";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ARCHITECTURE_AGENT_PROMPT } from "@/lib/agents/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { requirement, context, constraints } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY manquant" }, { status: 500 });
    }

    const llm = new ChatAnthropic({
      model: "claude-sonnet-5",
      temperature: 0.3,
      maxTokens: 4096,
    });

    const prompt = `Conçois une architecture solution pour :

**Besoin** : ${requirement}
**Contexte** : ${context ?? "Non précisé"}
**Contraintes** : ${constraints ?? "Aucune contrainte spécifique"}

Inclus :
1. Les composants principaux et leurs responsabilités
2. Les patterns utilisés (microservices, CQRS, Event Sourcing...)
3. Les interfaces et protocoles (REST, gRPC, Kafka...)
4. Les points d'attention et anti-patterns à éviter
5. Un T-shirt sizing préliminaire

Termine avec le JSON canvas_update.`;

    const response = await llm.invoke([
      new SystemMessage(ARCHITECTURE_AGENT_PROMPT),
      new HumanMessage(prompt),
    ]);

    const content = response.content as string;

    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    let canvasUpdate = null;
    if (jsonMatch) {
      try {
        canvasUpdate = JSON.parse(jsonMatch[1]);
      } catch {
        // ignore
      }
    }

    return NextResponse.json({ content, canvasUpdate });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur" },
      { status: 500 }
    );
  }
}
