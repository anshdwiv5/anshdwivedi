import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Building } from "@/components/site/building";
import { SideQuests } from "@/components/site/side-quests";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ansh Dwivedi — product, AI, & side quests" },
      {
        name: "description",
        content:
          "Personal site of Ansh Dwivedi — product manager by day, AI tinkerer otherwise. Currently building Tsundoku from Bengaluru.",
      },
      { property: "og:title", content: "Ansh Dwivedi" },
      {
        property: "og:description",
        content: "Product, AI, and a few side quests.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="grain relative min-h-screen">
      <Hero />
      <About />
      <Building />
      <SideQuests />
      <Contact />
      <Footer />
    </main>
  );
}
