import { createFileRoute, notFound } from "@tanstack/react-router";
import { apps, type AppId } from "@/data/maisonLumen";
import { SapApp } from "@/apps/sap";
import { CegidApp } from "@/apps/cegid-y2";
import { ShopifyApp } from "@/apps/shopify";
import { ManhattanApp } from "@/apps/manhattan";
import { SalesforceApp } from "@/apps/salesforce";
import { O9App } from "@/apps/o9";

const map = {
  sap: SapApp,
  "cegid-y2": CegidApp,
  shopify: ShopifyApp,
  manhattan: ManhattanApp,
  salesforce: SalesforceApp,
  o9: O9App,
} as const satisfies Record<AppId, () => React.JSX.Element>;

export const Route = createFileRoute("/apps/$appId")({
  loader: ({ params }) => {
    if (!(params.appId in map)) throw notFound();
    const app = apps.find((a) => a.id === params.appId)!;
    return { app };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.app.name} — Maison Lumen · Aura SI Hub` },
          { name: "description", content: `Mock fidèle ${loaderData.app.vendor} · ${loaderData.app.module} · données cohérentes Maison Lumen.` },
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
  const Comp = map[app.id as AppId];
  return <Comp />;
}
