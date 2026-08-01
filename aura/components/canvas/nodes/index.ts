export { BizCapNode } from "./BizCapNode";
export { ApplicationNode } from "./ApplicationNode";
export { ServiceNode } from "./ServiceNode";
export { EventStormNode } from "./EventStormNode";

import { BizCapNode } from "./BizCapNode";
import { ApplicationNode } from "./ApplicationNode";
import { ServiceNode } from "./ServiceNode";
import { EventStormNode } from "./EventStormNode";

// Register all custom node types for React Flow
export const nodeTypes = {
  bizcap: BizCapNode,
  application: ApplicationNode,
  service: ServiceNode,
  event: EventStormNode,
  command: EventStormNode,
  policy: EventStormNode,
  aggregate: EventStormNode,
  external: EventStormNode,
  hotspot: EventStormNode,
  readmodel: EventStormNode,
};
