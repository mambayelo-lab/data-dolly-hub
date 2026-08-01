// Atlassian Confluence Integration - REST API v2

const CONF_BASE = process.env.CONFLUENCE_BASE_URL ?? "";
const CONF_EMAIL = process.env.CONFLUENCE_EMAIL ?? "";
const CONF_TOKEN = process.env.CONFLUENCE_API_TOKEN ?? "";

function getAuthHeader(): string {
  return `Basic ${Buffer.from(`${CONF_EMAIL}:${CONF_TOKEN}`).toString("base64")}`;
}

async function confFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${CONF_BASE}/rest/api${path}`, {
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
    throw new Error(`Confluence API error ${res.status}: ${err}`);
  }
  return res.json();
}

export async function getSpaces() {
  return confFetch("/space?limit=50");
}

export async function createPage(params: {
  spaceKey: string;
  title: string;
  content: string; // HTML content
  parentId?: string;
  labels?: string[];
}) {
  return confFetch("/content", {
    method: "POST",
    body: JSON.stringify({
      type: "page",
      title: params.title,
      space: { key: params.spaceKey },
      ...(params.parentId && { ancestors: [{ id: params.parentId }] }),
      body: {
        storage: {
          value: params.content,
          representation: "storage",
        },
      },
      metadata: {
        labels: (params.labels ?? ["aura-generated"]).map((l) => ({ name: l })),
      },
    }),
  });
}

export function generateADRPage(params: {
  title: string;
  context: string;
  decision: string;
  consequences: string;
  alternatives: string[];
  status: string;
}): string {
  return `
<ac:structured-macro ac:name="info">
  <ac:rich-text-body>
    <p><strong>Status:</strong> ${params.status.toUpperCase()} | <strong>Généré par:</strong> AURA Architecture Agent</p>
  </ac:rich-text-body>
</ac:structured-macro>

<h2>Contexte</h2>
<p>${params.context}</p>

<h2>Décision</h2>
<p>${params.decision}</p>

<h2>Conséquences</h2>
<p>${params.consequences}</p>

<h2>Alternatives considérées</h2>
<ul>
  ${params.alternatives.map((a) => `<li>${a}</li>`).join("")}
</ul>
  `.trim();
}

export async function publishADR(params: {
  spaceKey: string;
  parentId?: string;
  title: string;
  context: string;
  decision: string;
  consequences: string;
  alternatives: string[];
  status: string;
}) {
  const content = generateADRPage(params);
  return createPage({
    spaceKey: params.spaceKey,
    parentId: params.parentId,
    title: `ADR: ${params.title}`,
    content,
    labels: ["adr", "architecture", "aura-generated"],
  });
}

export async function publishBizCapMap(params: {
  spaceKey: string;
  parentId?: string;
  capabilities: Array<{ name: string; domain: string; description: string; level: number }>;
}) {
  const tableRows = params.capabilities
    .map(
      (c) =>
        `<tr><td>${c.level}</td><td><strong>${c.name}</strong></td><td>${c.domain}</td><td>${c.description}</td></tr>`
    )
    .join("");

  const content = `
<ac:structured-macro ac:name="info">
  <ac:rich-text-body><p>Business Capability Map générée par <strong>AURA</strong> — ${new Date().toLocaleDateString("fr-FR")}</p></ac:rich-text-body>
</ac:structured-macro>

<h2>Business Capability Map</h2>
<table>
  <thead>
    <tr><th>Niveau</th><th>Capability</th><th>Domaine</th><th>Description</th></tr>
  </thead>
  <tbody>${tableRows}</tbody>
</table>
  `.trim();

  return createPage({
    spaceKey: params.spaceKey,
    parentId: params.parentId,
    title: `BizCap Map — ${new Date().toLocaleDateString("fr-FR")}`,
    content,
    labels: ["bizcap", "architecture", "aura-generated"],
  });
}
