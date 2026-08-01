// Atlassian JIRA Integration - REST API v3

const JIRA_BASE = process.env.JIRA_BASE_URL ?? "";
const JIRA_EMAIL = process.env.JIRA_EMAIL ?? "";
const JIRA_TOKEN = process.env.JIRA_API_TOKEN ?? "";

function getAuthHeader(): string {
  return `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString("base64")}`;
}

async function jiraFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${JIRA_BASE}/rest/api/3${path}`, {
    ...options,
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`JIRA API error ${res.status}: ${err}`);
  }
  return res.json();
}

export async function getProjects() {
  return jiraFetch("/project/search?maxResults=50");
}

export async function createEpic(params: {
  projectKey: string;
  summary: string;
  description: string;
  labels?: string[];
}) {
  return jiraFetch("/issue", {
    method: "POST",
    body: JSON.stringify({
      fields: {
        project: { key: params.projectKey },
        summary: params.summary,
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: params.description }],
            },
          ],
        },
        issuetype: { name: "Epic" },
        labels: params.labels ?? ["AURA-generated"],
      },
    }),
  });
}

export async function createUserStory(params: {
  projectKey: string;
  epicKey?: string;
  summary: string;
  description: string;
  storyPoints?: number;
  labels?: string[];
}) {
  return jiraFetch("/issue", {
    method: "POST",
    body: JSON.stringify({
      fields: {
        project: { key: params.projectKey },
        summary: params.summary,
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: params.description }],
            },
          ],
        },
        issuetype: { name: "Story" },
        ...(params.epicKey && { "Epic Link": params.epicKey }),
        ...(params.storyPoints && { story_points: params.storyPoints }),
        labels: params.labels ?? ["AURA-generated"],
      },
    }),
  });
}

export async function createArchitectureBacklog(params: {
  projectKey: string;
  initiative: string;
  capabilities: string[];
  stories: Array<{ title: string; description: string; points: number }>;
}) {
  const epicResult = await createEpic({
    projectKey: params.projectKey,
    summary: `[ARCHITECTURE] ${params.initiative}`,
    description: `Initiative d'architecture générée par AURA.\n\nCapabilities impactées: ${params.capabilities.join(", ")}`,
    labels: ["AURA-generated", "architecture"],
  });

  const epicKey = epicResult?.key;
  const stories = [];

  for (const story of params.stories) {
    const s = await createUserStory({
      projectKey: params.projectKey,
      epicKey,
      summary: story.title,
      description: story.description,
      storyPoints: story.points,
      labels: ["AURA-generated"],
    });
    stories.push(s);
  }

  return { epic: epicResult, stories };
}
