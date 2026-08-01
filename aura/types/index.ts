// ============================================================
// AURA - Core Type Definitions
// ============================================================

export type AgentType =
  | "supervisor"
  | "strategy"
  | "bizcap"
  | "architecture"
  | "eventsourcing"
  | "infra"
  | "data"
  | "cyber"
  | "migration"
  | "benchmark"
  | "integrations";

export type NodeType =
  | "bizcap"
  | "application"
  | "service"
  | "data"
  | "infra"
  | "person"
  | "event"
  | "command"
  | "policy"
  | "aggregate"
  | "external"
  | "hotspot"
  | "readmodel"
  | "domain";

export type LifecycleStatus = "active" | "planned" | "legacy" | "decommission" | "candidate";

export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export type BizCapDomain =
  | "strategy"
  | "customer"
  | "commerce"
  | "operations"
  | "finance"
  | "people"
  | "data"
  | "support";

// Business Capability
export interface BusinessCapability {
  id: string;
  name: string;
  description: string;
  domain: BizCapDomain;
  level: 1 | 2 | 3;
  parentId?: string;
  maturity: MaturityLevel;
  strategic_importance: "critical" | "high" | "medium" | "low";
  applications: string[];
  owner?: string;
  pain_points?: string[];
  objectives?: string[];
  kpis?: string[];
  tags: string[];
}

// Application
export interface Application {
  id: string;
  name: string;
  vendor?: string;
  lifecycle: LifecycleStatus;
  type: "saas" | "paas" | "on-premise" | "custom" | "api";
  capabilities: string[];
  tech_stack?: string[];
  hosting?: string;
  criticality: "critical" | "high" | "medium" | "low";
  cost_annual?: number;
  users?: number;
  integrations?: string[];
  description?: string;
  tags: string[];
}

// Canvas Node Data (React Flow)
export interface AuraNodeData {
  label: string;
  type: NodeType;
  // bizcap specific
  domain?: BizCapDomain;
  level?: 1 | 2 | 3;
  maturity?: MaturityLevel;
  strategic_importance?: string;
  applications?: string[];
  // application specific
  vendor?: string;
  lifecycle?: LifecycleStatus;
  app_type?: string;
  criticality?: string;
  tech_stack?: string[];
  // event storming specific
  es_type?: "event" | "command" | "policy" | "aggregate" | "external" | "hotspot" | "readmodel";
  // service specific
  pattern?: "api" | "event-driven" | "saga" | "bff" | "gateway";
  // data specific
  data_type?: "database" | "data-warehouse" | "data-lake" | "api" | "stream" | "file";
  // infra specific
  provider?: "aws" | "azure" | "gcp" | "on-premise" | "hybrid";
  // common
  description?: string;
  tags?: string[];
  color?: string;
  icon?: string;
  selected?: boolean;
}

// Canvas Edge
export interface AuraEdgeData {
  label?: string;
  type?: "sync" | "async" | "event" | "data" | "depends" | "composed-of";
  protocol?: string;
  description?: string;
}

// Agent Message
export interface AgentMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  agent?: AgentType;
  timestamp: Date;
  artifacts?: AgentArtifact[];
  thinking?: string;
}

// Agent Artifact (canvas updates, diagrams, etc.)
export interface AgentArtifact {
  type: "canvas_update" | "bizcap_map" | "capability_matrix" | "sizing" | "diagram" | "report" | "roadmap";
  title: string;
  data: unknown;
}

// Canvas Update artifact data
export interface CanvasUpdateData {
  action: "add" | "update" | "remove" | "layout";
  nodes?: Array<{
    id: string;
    type: NodeType;
    position: { x: number; y: number };
    data: AuraNodeData;
  }>;
  edges?: Array<{
    id: string;
    source: string;
    target: string;
    data?: AuraEdgeData;
  }>;
}

// T-shirt Sizing
export interface TShirtSizing {
  initiative: string;
  description: string;
  complexity: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  effort_person_months: { min: number; max: number };
  cost_estimate_k_eur: { min: number; max: number };
  duration_months: { min: number; max: number };
  risk: "low" | "medium" | "high" | "critical";
  capabilities_impacted: string[];
  applications_impacted: string[];
  rationale: string;
}

// Architecture Decision Record
export interface ADR {
  id: string;
  title: string;
  status: "proposed" | "accepted" | "deprecated" | "superseded";
  context: string;
  decision: string;
  consequences: string;
  alternatives: string[];
  created_at: Date;
  updated_at: Date;
}

// Event Storming Event
export interface DomainEvent {
  id: string;
  name: string;
  aggregate?: string;
  commands?: string[];
  policies?: string[];
  x: number;
  y: number;
}

// Interview Session
export interface InterviewSession {
  id: string;
  topic: string;
  status: "active" | "completed" | "paused";
  messages: AgentMessage[];
  context: Record<string, unknown>;
  created_at: Date;
  outputs?: AgentArtifact[];
}

// Workspace / Project
export interface AuraWorkspace {
  id: string;
  name: string;
  description?: string;
  organization?: string;
  capabilities: BusinessCapability[];
  applications: Application[];
  canvases: AuraCanvas[];
  interviews: InterviewSession[];
  created_at: Date;
  updated_at: Date;
}

export interface AuraCanvas {
  id: string;
  name: string;
  type: "free" | "bizcap" | "eventsourming" | "architecture" | "portfolio" | "c4" | "data";
  thumbnail?: string;
  nodes: unknown[];
  edges: unknown[];
  created_at: Date;
  updated_at: Date;
}

// Integration Status
export interface IntegrationStatus {
  leainx: { connected: boolean; workspace?: string; last_sync?: Date };
  jira: { connected: boolean; project?: string; last_sync?: Date };
  confluence: { connected: boolean; space?: string; last_sync?: Date };
}
