import { NextRequest, NextResponse } from "next/server";
import { runAuraGraph } from "@/lib/agents/aura-graph";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message requis" }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          content: `⚠️ **Clé API manquante**

Pour activer AURA, ajoutez votre clé API Anthropic :

1. Créez un fichier \`.env.local\` à la racine du dossier \`aura/\`
2. Ajoutez : \`ANTHROPIC_API_KEY=sk-ant-...\`
3. Obtenez votre clé sur **console.anthropic.com**
4. Redémarrez le serveur

En attendant, voici comment je fonctionnerais : j'analyserais votre demande, j'identifierais le bon agent spécialisé, et je vous retournerais une réponse experte en architecture d'entreprise avec des artefacts visuels pour le canvas.`,
          artifacts: [],
          agent: "supervisor",
        },
        { status: 200 }
      );
    }

    const result = await runAuraGraph(message, history);

    return NextResponse.json({
      content: result.content,
      artifacts: result.artifacts,
      agent: result.agent,
    });
  } catch (err) {
    console.error("[AURA Chat Error]", err);
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json(
      { error: `Erreur AURA: ${message}` },
      { status: 500 }
    );
  }
}
