/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — edit this file to update your portfolio.
 * ─────────────────────────────────────────────────────────────
 *
 * Any value that starts with "TODO" is treated as a placeholder:
 *  • in development (`npm run dev`) it is shown with a dashed "TODO" hint
 *    so you can see what still needs filling in;
 *  • in the production build it is hidden, so visitors never see a
 *    broken link or a placeholder.
 */

export const siteConfig = {
  name: 'Gowri Priya Chelluri',
  firstName: 'Gowri Priya',
  initials: 'GP',
  title: 'Software Engineer | Frontend & Full Stack Developer | AI Enthusiast',

  /** Roles cycled by the typing animation in the hero. */
  roles: ['Software Engineer', 'Frontend Developer', 'Full Stack Developer', 'AI Enthusiast'],

  headline: 'Building Modern Web Experiences & Intelligent Applications.',
  description:
    'Software Engineer with experience building scalable web interfaces at Cisco AppDynamics. Passionate about frontend engineering, full-stack development, and AI-powered applications.',
  availability: 'Open to Software Engineering Opportunities',

  /**
   * Profile photo. Put the image in /public (e.g. public/profile.webp) and set
   * the file name here, e.g. 'profile.webp'. Leave empty to show the
   * initials avatar. Square images around 800×800 (WebP/JPG) work best.
   */
  profileImage: 'profile.webp',

  /**
   * Resume. Put your PDF at public/resume.pdf (or change the path below).
   * The path is relative so it works on any host (GitHub Pages included).
   */
  resume: {
    path: 'resume.pdf',
    downloadName: 'Gowri-Priya-Chelluri-Resume.pdf',
  },

  links: {
    linkedin: 'https://linkedin.com/in/gowri-priya-chelluri/',
    github: 'https://github.com/GowriChelluri',
    email: 'gowrichelluri08@gmail.com',
  },

  contact: {
    closingMessage: "Have an interesting opportunity or project in mind? Let's connect.",
    /**
     * Optional, free: create a form at https://formspree.io (free tier) and paste
     * its endpoint, e.g. 'https://formspree.io/f/abcdwxyz'. The endpoint is a
     * public form ID, not a secret key.
     * Leave empty to use the mailto fallback (opens the visitor's email app).
     */
    formEndpoint: '',
  },
} as const

export type SiteConfig = typeof siteConfig
