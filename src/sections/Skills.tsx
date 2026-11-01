import { skillCategories } from '../data/skills'
import { Section, SectionHeading } from '../components/ui/Section'
import { RevealGroup } from '../components/ui/Reveal'
import { SkillCard } from '../components/SkillCard'

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills-title"
        eyebrow="Skills"
        title={
          <>
            Tools I use to <span className="text-gradient">ship</span>.
          </>
        }
        description="From component libraries and APIs to language models: the technologies I work with day to day and the ones I'm actively learning."
      />

      <RevealGroup staggerBy={0.07} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => (
          <SkillCard key={category.id} category={category} />
        ))}
      </RevealGroup>
    </Section>
  )
}
