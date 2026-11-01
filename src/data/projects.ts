/**
 * PROJECTS — add, edit or reorder projects here.
 *
 * • `featured: true` + `status: 'completed'` → shown in the Projects section.
 * • `image`: optional real screenshot in /public (e.g. 'projects/nxt-trendz.webp').
 *   Without one, a styled illustration (`visual`) is shown. It is clearly an
 *   illustration, not a fake screenshot.
 * • Links starting with "TODO" are hidden in production and flagged in dev.
 */

export type ProjectVisual = 'shop' | 'video' | 'dashboard' | 'ml' | 'ai'

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  features: string[]
  tech: string[]
  github: string
  demo: string
  image?: string
  visual: ProjectVisual
  status: 'completed' | 'planned'
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'nxt-trendz',
    title: 'NxtTrendz',
    tagline: 'E-commerce application',
    description:
      'A modern e-commerce platform inspired by Amazon and Flipkart, with Login, Products and Product Details pages built from reusable components and secured with JWT authentication.',
    features: ['JWT authentication', 'Product browsing', 'Product details', 'REST API integration'],
    tech: ['React.js', 'JavaScript', 'React Router', 'Bootstrap', 'REST APIs', 'JWT'],
    github: 'https://github.com/GowriChelluri/nxtTrendzSpecificProductDetails',
    demo: 'TODO: https://your-nxt-trendz-demo.example.com',
    visual: 'shop',
    status: 'completed',
    featured: true,
  },
  {
    id: 'nxt-watch',
    title: 'Nxt Watch',
    tagline: 'Video streaming application',
    description:
      'A video streaming web app with authenticated access, client-side routing and a video browsing experience powered by API data.',
    features: ['Authentication', 'Routing', 'API integration', 'Video browsing'],
    tech: ['React.js', 'JavaScript', 'REST APIs'],
    github: 'https://github.com/GowriChelluri/gowriNxtWatch',
    demo: 'TODO: https://your-nxt-watch-demo.example.com',
    visual: 'video',
    status: 'completed',
    featured: true,
  },
  {
    id: 'blinkit-sales-dashboard',
    title: 'Blinkit Sales Analysis',
    tagline: 'Power BI dashboard',
    description:
      "An interactive Power BI dashboard analysing Blinkit's sales performance, customer satisfaction and inventory distribution, with insights on consumer preferences and outlet profitability.",
    features: ['Sales & rating KPIs', 'Interactive filters', 'Sales trend visuals', 'Outlet comparisons'],
    tech: ['Power BI', 'DAX', 'Data Modeling', 'Data Visualization'],
    github: 'TODO: https://github.com/GowriChelluri/blinkit-sales-dashboard',
    demo: '',
    visual: 'dashboard',
    status: 'completed',
    featured: true,
  },
  {
    id: 'heart-disease-prediction',
    title: 'Heart Disease Prediction',
    tagline: 'Machine learning classification',
    description:
      'A machine learning project that predicts heart disease from patient health data, combining feature selection with a Random Forest classification model.',
    // To mention model accuracy, add it here only if your original results support it,
    // e.g. 'Random Forest classifier (~92% accuracy)'.
    features: ['Random Forest model', 'Feature selection', 'Classification'],
    tech: ['Python', 'Machine Learning', 'Random Forest'],
    github: 'TODO: https://github.com/GowriChelluri/heart-disease-prediction',
    demo: '',
    visual: 'ml',
    status: 'completed',
    featured: true,
  },
  {
    // Planned: kept out of the Projects section until it is built.
    // When it's ready, set status to 'completed' and featured to true.
    id: 'ai-job-tracker',
    title: 'AI Job Application Tracker',
    tagline: 'Planned project',
    description: 'Planned: an application tracker with AI-assisted features.',
    features: [],
    tech: [],
    github: '',
    demo: '',
    visual: 'ai',
    status: 'planned',
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured && p.status === 'completed')
