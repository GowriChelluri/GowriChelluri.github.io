import { Layout, Server, Database, Terminal, Sparkles, Wrench, type LucideIcon } from 'lucide-react'

export interface Skill {
  name: string
  /** Optional short tag, e.g. "learning". */
  note?: string
}

export interface SkillCategory {
  id: string
  title: string
  description: string
  icon: LucideIcon
  skills: Skill[]
  /** Wider card in the bento grid. */
  wide?: boolean
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interfaces, components and the fundamentals underneath them.',
    icon: Layout,
    wide: true,
    skills: [
      { name: 'Angular' },
      { name: 'React.js' },
      { name: 'TypeScript' },
      { name: 'JavaScript (ES6+)' },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'Tailwind CSS' },
      { name: 'Bootstrap' },
      { name: 'Responsive Design' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'Server-side logic, APIs and auth.',
    icon: Server,
    skills: [{ name: 'Node.js' }, { name: 'Express.js' }, { name: 'REST APIs' }, { name: 'JWT Auth' }],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Relational and document data.',
    icon: Database,
    skills: [{ name: 'SQL' }, { name: 'MongoDB' }, { name: 'DBMS' }],
  },
  {
    id: 'ai',
    title: 'AI & Generative AI',
    description: 'Integrating language models into real software, and building with AI tools.',
    icon: Sparkles,
    wide: true,
    skills: [
      { name: 'Large Language Models' },
      { name: 'Retrieval-Augmented Generation (RAG)' },
      { name: 'Prompt Engineering' },
      { name: 'Tool Calling' },
      { name: 'MCP' },
      { name: 'Cursor' },
      { name: 'Codex' },
      { name: 'AI Agents', note: 'learning' },
    ],
  },
  {
    id: 'programming',
    title: 'Programming & CS',
    description: 'Languages and computer-science fundamentals.',
    icon: Terminal,
    skills: [{ name: 'Python' }, { name: 'OOP' }, { name: 'Data Structures & Algorithms' }],
  },
  {
    id: 'tools',
    title: 'Testing, Cloud & Tools',
    description: 'Automated testing, version control and delivery.',
    icon: Wrench,
    wide: true,
    skills: [{ name: 'Playwright' }, { name: 'Automated Testing' }, { name: 'Git' }, { name: 'GitHub' }, { name: 'AWS' }, { name: 'Agile' }],
  },
]
