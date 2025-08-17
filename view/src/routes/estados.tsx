import { createRoute, type RootRoute } from "@tanstack/react-router";
import { BrazilianStates } from "@/components/brazilian-states";

function StatesPage() {
  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <BrazilianStates />
      </div>
    </div>
  );
}

export default (parentRoute: RootRoute) =>
  createRoute({
    path: "/estados-ibge",
    component: StatesPage,
    getParentRoute: () => parentRoute,
  });
