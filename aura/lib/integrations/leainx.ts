// LeanIX Integration - Pathfinder GraphQL API

const LEAINX_BASE = process.env.LEAINX_BASE_URL ?? "https://app.leanix.net/services/pathfinder/v1";
const LEAINX_TOKEN = process.env.LEAINX_API_TOKEN ?? "";

async function getAuthToken(): Promise<string> {
  const res = await fetch(`${LEAINX_BASE}/auth/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`apitoken:${LEAINX_TOKEN}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`LeanIX auth failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

async function graphql(query: string, variables: Record<string, unknown> = {}) {
  const token = await getAuthToken();
  const res = await fetch(`${LEAINX_BASE}/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`LeanIX GraphQL error: ${res.status}`);
  return res.json();
}

export async function getBusinessCapabilities() {
  const query = `
    query {
      allFactSheets(factSheetType: BusinessCapability, first: 200) {
        edges {
          node {
            id
            name
            description
            ... on BusinessCapability {
              level
              lxState
              tags { name }
              relToParent { edges { node { factSheet { id name } } } }
              relBusinessCapabilityToApplication { edges { node { factSheet { id name displayName } } } }
            }
          }
        }
      }
    }
  `;
  const data = await graphql(query);
  return data?.data?.allFactSheets?.edges ?? [];
}

export async function getApplications() {
  const query = `
    query {
      allFactSheets(factSheetType: Application, first: 500) {
        edges {
          node {
            id
            name
            description
            displayName
            ... on Application {
              lxState
              businessCriticality
              functionalSuitability
              technicalSuitability
              tags { name }
              relApplicationToBusinessCapability {
                edges { node { factSheet { id name } } }
              }
            }
          }
        }
      }
    }
  `;
  const data = await graphql(query);
  return data?.data?.allFactSheets?.edges ?? [];
}

export async function createBusinessCapability(params: {
  name: string;
  description: string;
  parentId?: string;
}) {
  const mutation = `
    mutation CreateBusinessCapability($name: String!, $description: String) {
      createFactSheet(
        factSheetType: BusinessCapability
        name: $name
        comment: $description
      ) { factSheet { id name } }
    }
  `;
  return graphql(mutation, { name: params.name, description: params.description });
}

export async function syncCanvasToLeanIX(capabilities: Array<{ name: string; description: string; parentId?: string }>) {
  const results = [];
  for (const cap of capabilities) {
    try {
      const result = await createBusinessCapability(cap);
      results.push({ success: true, name: cap.name, result });
    } catch (err) {
      results.push({ success: false, name: cap.name, error: String(err) });
    }
  }
  return results;
}
