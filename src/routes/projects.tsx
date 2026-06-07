import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { ProjectsGrid } from "@/components/site/ProjectsGrid";
import { Stats } from "@/components/site/Stats";
import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — AliWebDigital" },
      {
        name: "description",
        content:
          "Selected work from AliWebDigital — websites, dashboards, brand systems and digital products.",
      },
      { property: "og:title", content: "Projects — AliWebDigital" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Selected Work"
        title={<>Projects we're <span className="text-electric">proud</span> of.</>}
        description="A curated cross-section of recent engagements across SaaS, commerce, and brand."
      />
      <ProjectsGrid heading={false} />
      <Stats />
      <ContactSection />
    </SiteLayout>
  );
}
