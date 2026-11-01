export interface ExperienceItem {
  company: string
  team: string
  role: string
  /** Shown when `period` is not configured. */
  duration: string
  /** e.g. "Jan 2025 – Present". Leave as TODO to show `duration` instead. */
  period: string
  /** Shows a "Current role" badge. */
  current: boolean
  location?: string
  summary: string
  highlights: string[]
  tech: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'Cisco',
    team: 'AppDynamics',
    role: 'Software Engineer',
    duration: '1 year',
    period: 'Aug 2025 – Aug 2026',
    // Set to true if you are still in this role.
    current: false,
    location: 'Bangalore',
    summary:
      'Developed and enhanced Angular features for AppDynamics, an enterprise application performance monitoring platform, working in an Agile team alongside developers, QA and designers.',
    highlights: [
      'Developed and enhanced Angular-based features, contributing to maintainable and reliable application functionality.',
      'Contributed to Angular version upgrades by updating dependencies, replacing deprecated APIs, resolving compatibility issues and fixing regressions.',
      'Owned the migration of legacy UI components to newer versions and Material Design standards, including V0 → V1 component migrations across the application.',
      'Investigated and resolved software defects through root-cause analysis and fix validation, improving stability and user experience.',
      'Improved Playwright automated test coverage for critical dashboard workflows, reducing repetitive manual testing during releases.',
      'Used Cursor, Codex and MCP tools for code understanding, debugging and test creation, reviewing and validating all AI-generated code before it shipped.',
    ],
    tech: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Playwright'],
  },
]
