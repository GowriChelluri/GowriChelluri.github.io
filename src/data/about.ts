import { Briefcase, Code2, Sparkles, GraduationCap, type LucideIcon } from 'lucide-react'

export const aboutParagraphs: string[] = [
  "I'm a Software Engineer with a year of hands-on experience at Cisco AppDynamics, where I built and enhanced Angular features for an enterprise application performance monitoring platform using TypeScript and JavaScript.",
  'My work there spanned Angular version upgrades, migrating legacy UI components to Material Design standards, root-cause debugging, and expanding Playwright test coverage for critical dashboard workflows, all within an Agile, cross-functional team.',
  "Beyond Angular, I build with React, Node.js and SQL, backed by a strong foundation in OOP, data structures & algorithms and DBMS. I'm also deepening my knowledge of Generative AI (LLMs, RAG, prompt engineering and tool calling) and already use AI-assisted tools like Cursor, Codex and MCP in my day-to-day development.",
]

export interface AboutHighlight {
  icon: LucideIcon
  label: string
  value: string
}

export const aboutHighlights: AboutHighlight[] = [
  { icon: Briefcase, label: 'Experience', value: '1 year as a Software Engineer at Cisco AppDynamics' },
  { icon: Code2, label: 'Focus', value: 'Angular, React & full-stack web development' },
  { icon: Sparkles, label: 'Exploring', value: 'LLMs, RAG, prompt engineering & tool calling' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech in Computer Science & Engineering' },
]
