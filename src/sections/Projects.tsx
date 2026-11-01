import { ArrowUpRight } from 'lucide-react'
import { featuredProjects } from '../data/projects'
import { siteConfig } from '../config/site'
import { isConfigured } from '../lib/placeholder'
import { Section, SectionHeading } from '../components/ui/Section'
import { Reveal, RevealGroup } from '../components/ui/Reveal'
import { ProjectCard } from '../components/ProjectCard'
import { GithubIcon } from '../components/icons/BrandIcons'

export function Projects() {
  // With an odd number of projects, the first one spans the full row so the grid stays balanced.
  const wideFirst = featuredProjects.length % 2 === 1
  const github = siteConfig.links.github

  return (
    <Section id="projects">
      <SectionHeading
        id="projects-title"
        eyebrow="Featured projects"
        title={
          <>
            Things I've <span className="text-gradient">built</span>.
          </>
        }
        description="A selection of web applications, data analytics and machine learning work. Each one taught me something new about building software end to end."
      />

      <RevealGroup staggerBy={0.12} className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} wide={wideFirst && i === 0} />
        ))}
      </RevealGroup>

      {isConfigured(github) && (
        <Reveal className="mt-10 flex justify-center">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="group link-underline gap-2 text-[15px] font-medium text-muted transition-colors hover:text-fg"
          >
            <GithubIcon size={16} />
            See more on GitHub
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      )}
    </Section>
  )
}
