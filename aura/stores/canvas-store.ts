"use client";
import { create } from "zustand";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import type { Node, Edge, NodeChange, EdgeChange, Connection } from "@xyflow/react";
import type { AuraNodeData, AuraEdgeData, CanvasUpdateData, NodeType } from "@/types";
import { generateId, DOMAIN_COLORS } from "@/lib/utils";

interface CanvasStore {
  nodes: Node<AuraNodeData>[];
  edges: Edge<AuraEdgeData>[];
  selectedNodeId: string | null;
  canvasMode: "select" | "bizcap" | "application" | "service" | "event" | "connect" | "text";
  showMinimap: boolean;
  showGrid: boolean;

  // Node/Edge mutations
  setNodes: (nodes: Node<AuraNodeData>[]) => void;
  setEdges: (edges: Edge<AuraEdgeData>[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  selectNode: (id: string | null) => void;

  // Add nodes
  addBizCapNode: (x: number, y: number, label?: string) => void;
  addApplicationNode: (x: number, y: number, label?: string) => void;
  addServiceNode: (x: number, y: number, label?: string) => void;
  addEventNode: (x: number, y: number, esType?: string) => void;

  // Apply agent canvas updates
  applyCanvasUpdate: (update: CanvasUpdateData) => void;

  // Canvas mode
  setCanvasMode: (mode: CanvasStore["canvasMode"]) => void;
  toggleMinimap: () => void;
  toggleGrid: () => void;

  // Clear
  clearCanvas: () => void;
  loadTemplate: (template: "bizcap" | "eventsourming" | "c4" | "microservices") => void;
}

function makeNode(
  type: NodeType,
  x: number,
  y: number,
  data: Partial<AuraNodeData>,
  id?: string
): Node<AuraNodeData> {
  return {
    id: id ?? generateId(type),
    type,
    position: { x, y },
    data: {
      label: data.label ?? "Nouveau",
      type,
      ...data,
    } as AuraNodeData,
  };
}

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  canvasMode: "select",
  showMinimap: true,
  showGrid: true,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) =>
    set((s) => ({ nodes: applyNodeChanges(changes, s.nodes) as Node<AuraNodeData>[] })),

  onEdgesChange: (changes) =>
    set((s) => ({ edges: applyEdgeChanges(changes, s.edges) as Edge<AuraEdgeData>[] })),

  onConnect: (connection) =>
    set((s) => ({
      edges: addEdge(
        { ...connection, animated: true, data: { type: "sync" } },
        s.edges
      ) as Edge<AuraEdgeData>[],
    })),

  selectNode: (id) => set({ selectedNodeId: id }),

  addBizCapNode: (x, y, label) => {
    const node = makeNode("bizcap", x, y, {
      label: label ?? "Business Capability",
      domain: "strategy",
      level: 1,
      maturity: 3,
      strategic_importance: "high",
      applications: [],
    });
    set((s) => ({ nodes: [...s.nodes, node] }));
  },

  addApplicationNode: (x, y, label) => {
    const node = makeNode("application", x, y, {
      label: label ?? "Application",
      vendor: "",
      lifecycle: "active",
      app_type: "custom",
      criticality: "medium",
      tech_stack: [],
    });
    set((s) => ({ nodes: [...s.nodes, node] }));
  },

  addServiceNode: (x, y, label) => {
    const node = makeNode("service", x, y, {
      label: label ?? "Microservice",
      pattern: "api",
      description: "",
    });
    set((s) => ({ nodes: [...s.nodes, node] }));
  },

  addEventNode: (x, y, esType = "event") => {
    const node = makeNode("event", x, y, {
      label: esType === "event" ? "Événement Créé" : esType === "command" ? "Créer Événement" : "Politique",
      es_type: esType as AuraNodeData["es_type"],
    });
    set((s) => ({ nodes: [...s.nodes, node] }));
  },

  applyCanvasUpdate: (update: CanvasUpdateData) => {
    if (update.action === "add") {
      const newNodes: Node<AuraNodeData>[] = (update.nodes ?? []).map((n) => ({
        id: n.id,
        type: n.type,
        position: n.position,
        data: n.data as AuraNodeData,
      }));
      const newEdges: Edge<AuraEdgeData>[] = (update.edges ?? []).map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        animated: true,
        data: e.data,
      }));
      set((s) => ({
        nodes: [...s.nodes, ...newNodes],
        edges: [...s.edges, ...newEdges],
      }));
    }
  },

  setCanvasMode: (mode) => set({ canvasMode: mode }),
  toggleMinimap: () => set((s) => ({ showMinimap: !s.showMinimap })),
  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),

  clearCanvas: () => set({ nodes: [], edges: [], selectedNodeId: null }),

  loadTemplate: (template) => {
    const { clearCanvas } = get();
    clearCanvas();

    if (template === "bizcap") {
      const domains: Array<{ domain: string; label: string; color: string; caps: string[] }> = [
        {
          domain: "strategy",
          label: "Stratégie & Gouvernance",
          color: "#8b5cf6",
          caps: ["Planification Stratégique", "Gouvernance IT", "Risk Management"],
        },
        {
          domain: "customer",
          label: "Client & Marketing",
          color: "#f97316",
          caps: ["Gestion Client", "Marketing Digital", "Expérience Client"],
        },
        {
          domain: "operations",
          label: "Opérations",
          color: "#3b82f6",
          caps: ["Gestion des Processus", "Qualité", "Supply Chain"],
        },
        {
          domain: "finance",
          label: "Finance",
          color: "#a855f7",
          caps: ["Comptabilité", "Contrôle de Gestion", "Trésorerie"],
        },
        {
          domain: "data",
          label: "Data & Technologie",
          color: "#06b6d4",
          caps: ["Data Management", "Architecture IT", "Innovation"],
        },
      ];

      const nodes: Node<AuraNodeData>[] = [];
      domains.forEach((d, di) => {
        nodes.push(
          makeNode("bizcap", di * 280 + 50, 50, {
            label: d.label,
            domain: d.domain as AuraNodeData["domain"],
            level: 1,
            maturity: 3,
            strategic_importance: "high",
          })
        );
        d.caps.forEach((cap, ci) => {
          nodes.push(
            makeNode("bizcap", di * 280 + 50, 200 + ci * 130, {
              label: cap,
              domain: d.domain as AuraNodeData["domain"],
              level: 2,
              maturity: 2,
              strategic_importance: "medium",
            })
          );
        });
      });
      set({ nodes });
    }

    if (template === "eventsourming") {
      const events = [
        { label: "Commande Reçue", es_type: "event", x: 0 },
        { label: "Créer Commande", es_type: "command", x: -150 },
        { label: "Stock Vérifié", es_type: "event", x: 300 },
        { label: "Paiement Initié", es_type: "event", x: 600 },
        { label: "Paiement Validé", es_type: "event", x: 900 },
        { label: "Commande", es_type: "aggregate", x: 120 },
        { label: "Paiement PSP", es_type: "external", x: 750 },
        { label: "Si stock dispo → Initier paiement", es_type: "policy", x: 450 },
      ];

      const nodes: Node<AuraNodeData>[] = events.map((e, i) =>
        makeNode("event", e.x + 50, i % 2 === 0 ? 200 : 350, {
          label: e.label,
          es_type: e.es_type as AuraNodeData["es_type"],
        })
      );
      set({ nodes });
    }
  },
}));
