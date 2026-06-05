import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { ComingSoon } from "@/components/site/coming-soon";

export const Route = createFileRoute("/quests")({
  head: () => ({
    meta: [
      { title: "side quests · ansh dwivedi" },
      { name: "description", content: "detours, hobbies, and one-offs ansh has tried." },
      { property: "og:title", content: "side quests · ansh dwivedi" },
      { property: "og:description", content: "things i've tried." },
    ],
  }),
  component: QuestsPage,
});

function QuestsPage() {
  useReveal();
  return (
    <ComingSoon
      kicker="side quests"
      note="the full quest log is mid-edit. detours, hobbies, and one-offs landing here soon."
    />
  );
}