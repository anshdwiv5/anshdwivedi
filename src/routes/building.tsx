import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { ComingSoon } from "@/components/site/coming-soon";

export const Route = createFileRoute("/building")({
  head: () => ({
    meta: [
      { title: "building · ansh dwivedi" },
      { name: "description", content: "things ansh is currently building on the side." },
      { property: "og:title", content: "building · ansh dwivedi" },
      { property: "og:description", content: "currently shipping." },
    ],
  }),
  component: BuildingPage,
});

function BuildingPage() {
  useReveal();
  return (
    <ComingSoon
      kicker="fun projects"
      note="still putting the project pages together. the things i'm building on the side land here soon."
    />
  );
}