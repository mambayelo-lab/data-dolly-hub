import { createFileRoute, notFound } from "@tanstack/react-router";
import { apps as retailApps } from "@/data/maisonLumen";
import { apps as agroApps } from "@/data/fromagerieDuVal";
import { SapApp } from "@/apps/sap";
import { CegidApp } from "@/apps/cegid-y2";
import { ShopifyApp } from "@/apps/shopify";
import { ManhattanApp } from "@/apps/manhattan";
import { SalesforceApp } from "@/apps/salesforce";
import { O9App } from "@/apps/o9";
import { SajeXCubeApp } from "@/apps/saje-x-cube";
import { AgroWareApp } from "@/apps/agroware";
import { QualiPlusApp } from "@/apps/qualiplus";
import { TraceLinkApp } from "@/apps/tracelink";
import { DiventoApp } from "@/apps/divento";
import { DataForgeApp } from "@/apps/dataforge";

const map: Record<string, () => React.JSX.Element> = {
  sap: SapApp,
  "cegid-y2": CegidApp,
  shopify: ShopifyApp,
  manhattan: ManhattanApp,
  salesforce: SalesforceApp,
  o9: O9App,
  "saje-x-cube": SajeXCubeApp,
  agroware: AgroWareApp,
  qualiplus: QualiPlusApp,
  tracelink: TraceLinkApp,
  divento: DiventoApp,
  dataforge: DataForgeApp,
};

const catalog = [...retailApps, ...agroApps];

export const Route = createFileRoute("/apps/$appId")({
  loader: ({ params }) => {
    if (!(params.appId in map)) throw notFound();
    const app = catalog.find((a) => a.id === params.appId)!;
    return { app };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.app.name} — Aura SI Hub` },
          { name: "description", content: `Mock ${loaderData.app.vendor} · ${loaderData.app.module} · données cohérentes Aura SI Hub.` },
        ]
      : [],
  }),
  component: AppPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">
      Application non disponible.
    </div>
  ),
});

function AppPage() {
  const { app } = Route.useLoaderData();
  const Comp = map[app.id];
  return <Comp />;
}
