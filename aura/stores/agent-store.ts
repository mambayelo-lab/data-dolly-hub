"use client";
import { create } from "zustand";
import type { AgentMessage, AgentArtifact, AgentType } from "@/types";
import { generateId } from "@/lib/utils";

interface AgentStore {
  messages: AgentMessage[];
  isLoading: boolean;
  activeAgent: AgentType;
  interviewMode: boolean;
  canvasUpdates: AgentArtifact[];

  addMessage: (msg: Omit<AgentMessage, "id" | "timestamp">) => void;
  setLoading: (loading: boolean) => void;
  setActiveAgent: (agent: AgentType) => void;
  setInterviewMode: (mode: boolean) => void;
  addCanvasUpdate: (artifact: AgentArtifact) => void;
  clearMessages: () => void;
  sendMessage: (content: string) => Promise<void>;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  messages: [
    {
      id: "welcome",
      role: "assistant",
      content: `👋 Bonjour ! Je suis **AURA**, votre agent Architecture d'Entreprise augmenté.

Je suis expert en :
- 🗺️ **Business Capability Mapping** (TOGAF, CESAMES)
- 🏗️ **Architecture Solution** (DDD, Microservices, 12-Factor)
- ⚡ **Event Storming** et modélisation métier
- ☁️ **Architecture Cloud & Infra** (AWS, Azure, GCP)
- 🔐 **Cybersécurité** (Zero Trust, SASE, conformité)
- 📊 **Architecture Data** (Databricks, Dataiku, Data Mesh)
- 🔗 **Connecteurs** LeanIX, JIRA, Confluence

**Comment puis-je vous aider ?** Décrivez-moi votre contexte métier, votre problématique, ou demandez-moi de créer une cartographie de vos capacités.`,
      agent: "supervisor",
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  activeAgent: "supervisor",
  interviewMode: false,
  canvasUpdates: [],

  addMessage: (msg) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { ...msg, id: generateId("msg"), timestamp: new Date() },
      ],
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setActiveAgent: (agent) => set({ activeAgent: agent }),
  setInterviewMode: (mode) => set({ interviewMode: mode }),

  addCanvasUpdate: (artifact) =>
    set((s) => ({ canvasUpdates: [...s.canvasUpdates, artifact] })),

  clearMessages: () =>
    set({
      messages: [],
      canvasUpdates: [],
    }),

  sendMessage: async (content: string) => {
    const { messages, addMessage, setLoading, addCanvasUpdate } = get();

    addMessage({ role: "user", content });
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.role !== "system")
        .slice(-10) // last 10 messages for context
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();

      addMessage({
        role: "assistant",
        content: data.content,
        agent: data.agent as AgentType,
        artifacts: data.artifacts,
      });

      // Apply any canvas updates
      if (data.artifacts?.length > 0) {
        for (const artifact of data.artifacts) {
          if (artifact.type === "canvas_update" || artifact.type === "bizcap_map") {
            addCanvasUpdate(artifact);
          }
        }
      }
    } catch (err) {
      addMessage({
        role: "assistant",
        content: `❌ Désolé, une erreur s'est produite : ${err instanceof Error ? err.message : "Erreur inconnue"}. Vérifiez votre clé API Anthropic dans les variables d'environnement.`,
        agent: "supervisor",
      });
    } finally {
      setLoading(false);
    }
  },
}));
