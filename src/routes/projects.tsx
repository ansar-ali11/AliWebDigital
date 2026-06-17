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
      { property: "og:url", content: "https://www.aliwebdigital.in/projects" },
      { property: "og:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { property: "og:image:alt", content: "AliWebDigital website design and branding showcase" },
      { property: "og:site_name", content: "AliWebDigital" },
      { name: "twitter:site", content: "@AliWebDigital" },
      { name: "twitter:image", content: "https://www.aliwebdigital.in/og-image.png" },
      { name: "twitter:image:alt", content: "AliWebDigital website design and branding showcase" },
    ],
    links: [{ rel: "canonical", href: "https://www.aliwebdigital.in/projects" }],
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
