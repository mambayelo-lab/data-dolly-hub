import { NextRequest, NextResponse } from "next/server";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { BIZCAP_AGENT_PROMPT } from "@/lib/agents/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { context, sector, scope } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY manquant" }, { status: 500 });
    }

    const llm = new ChatAnthropic({
      model: "claude-sonnet-5",
      temperature: 0.3,
      maxTokens: 4096,
    });

    const prompt = `Génère une Business Capability Map complète pour le contexte suivant :

**Secteur** : ${sector ?? "Non précisé"}
**Périmètre** : ${scope ?? "Toute l'entreprise"}
**Contexte** : ${context ?? "Entreprise standard"}

Génère une cartographie avec :
- 5-8 domaines L1
- 3-5 capabilities L2 par domaine
- Pour chaque capability : maturity (1-5), strategic_importance, description

IMPORTANT : Termine ta réponse avec le bloc JSON \`\`\`json ... \`\`\` décrivant le canvas_update.`;

    const response = await llm.invoke([
      new SystemMessage(BIZCAP_AGENT_PROMPT),
      new HumanMessage(prompt),
    ]);

    const content = response.content as string;

    // Extract JSON artifact
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
