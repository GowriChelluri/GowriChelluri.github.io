# Gowri Priya Chelluri — Portfolio

A fast, responsive, animated personal portfolio built with **React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons**. Free to build, free to host.

- Dark theme by default, with a light/dark toggle (remembered per visitor)
- Sections: Home · About · Experience · Skills · Projects · Education · Contact
- Every piece of content lives in data/config files, so you never need to touch the UI to update it
- Respects `prefers-reduced-motion`, keyboard accessible, SEO and Open Graph tags included

---

## 1. Run it locally

Requirements: [Node.js](https://nodejs.org) 18+ (20 LTS recommended).

```bash
npm install       # install dependencies (first time only)
npm run dev       # start the dev server → http://localhost:5173
npm run build     # type-check + production build into /dist
npm run preview   # serve the production build → http://localhost:4173
```

---

## 2. Update your content

| What                                                   | Where                       |
| ------------------------------------------------------ | --------------------------- |
| Name, headline, roles, links, email, resume, photo     | `src/config/site.ts`        |
| About paragraphs & highlight cards                     | `src/data/about.ts`         |
| Work experience                                        | `src/data/experience.ts`    |
| Skills & categories                                    | `src/data/skills.ts`        |
| Projects                                               | `src/data/projects.ts`      |
| Education & certifications                             | `src/data/education.ts`     |
| Navigation items                                       | `src/data/navigation.ts`    |
| Page title, description, social preview tags           | `index.html`                |

### Placeholders (`TODO`)

Any value starting with **`TODO`** is a placeholder:

- In `npm run dev`, placeholders are shown as **amber dashed "TODO" badges** so you can spot what's missing.
- In the production build, they are **hidden automatically**. Visitors never see broken links or placeholder text.

Fill these in when you're ready:

- [x] Resume, profile photo, email, GitHub, education, experience dates and certificates (done)
- [ ] `src/data/projects.ts` → GitHub repos for Blinkit Sales Analysis and Heart Disease Prediction, and live demo URLs
- [ ] Optional: project screenshots, Formspree endpoint

Certificate PDFs live in `public/certificates/`. Add new ones there and reference them with `file` in `src/data/education.ts`.

### Resume

Copy your PDF to **`public/resume.pdf`**. Every "Resume" / "Download Resume" button downloads it as `Gowri-Priya-Chelluri-Resume.pdf` (change the name or path in `src/config/site.ts → resume`).
Until the file exists, the buttons show a short "being updated" notice instead of a broken download.

### Profile photo

Add a square image (around 800×800, WebP or JPG) to `public/`, e.g. `public/profile.webp`, then set `profileImage: 'profile.webp'` in `src/config/site.ts`. Until then, an initials avatar is shown.

### Projects

Add a new object to the `projects` array in `src/data/projects.ts`:

```ts
{
  id: 'my-project',
  title: 'My Project',
  tagline: 'Short category label',
  description: 'One or two sentences about what it does.',
  features: ['Feature one', 'Feature two'],
  tech: ['React.js', 'Node.js'],
  github: 'https://github.com/you/my-project',
  demo: 'https://my-project.example.com',   // or '' if there's no demo
  image: 'projects/my-project.webp',       // optional real screenshot in /public
  visual: 'shop',                          // illustration used when there's no image: shop | video | ml | ai
  status: 'completed',
  featured: true,
}
```

Only projects with `featured: true` **and** `status: 'completed'` are shown. The **AI Job Application Tracker** is already in the file as `status: 'planned'`. Flip both fields once it's built.

> **Heart Disease Prediction accuracy:** the ~92% figure is intentionally not shown. If your original results support it, add it to that project's `features` (a comment in the file marks the spot).

### Contact form (free)

The form works out of the box with a **mailto fallback**: it opens the visitor's email app with the message pre-filled (needs `links.email` to be set).

To receive messages directly without opening an email app, use **[Formspree](https://formspree.io)**'s free tier:

1. Create a free account and a new form.
2. Copy the endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `src/config/site.ts → contact.formEndpoint`.

The endpoint is a public form ID, not a secret, so it's safe to commit. No API keys are used anywhere.

### Social preview image

`public/og-image.svg` is a starter design. Most social platforms (LinkedIn, X, Slack) need a **PNG/JPG with an absolute URL**. After deploying, export a 1200×630 PNG (e.g. screenshot the SVG in a browser), save it as `public/og-image.png`, and update the commented `og:image` / `og:url` / canonical tags in `index.html` with your live URL.

---

## 3. Deploy for free

The build uses relative asset paths (`base: './'` in `vite.config.ts`), so the same output works on any static host, including GitHub Pages sub-paths.

### Option A: GitHub Pages (recommended, automated)

A ready-made workflow lives in `.github/workflows/deploy.yml`.

1. Create a new **public** repository on GitHub (e.g. `portfolio`).
2. Push this project to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow builds and deploys automatically. Your site will be at
   `https://<your-username>.github.io/portfolio/`.
   Every later push to `main` redeploys.

> Want the root URL `https://<your-username>.github.io/`? Name the repository `<your-username>.github.io`.

### Option B: Netlify / Vercel / Cloudflare Pages (free tiers)

Import the GitHub repository and use:

| Setting           | Value           |
| ----------------- | --------------- |
| Build command     | `npm run build` |
| Output directory  | `dist`          |
| Node version      | 20              |

---

## 4. Project structure

```
├── index.html                 # SEO, Open Graph, structured data, theme pre-paint
├── public/                    # Static files served as-is (resume.pdf, photos, favicon, og image)
├── .github/workflows/         # GitHub Pages deployment
└── src/
    ├── config/site.ts         # ← Main configuration (profile, links, resume, contact)
    ├── data/                  # ← Content: about, experience, skills, projects, education, nav
    ├── sections/              # Page sections (Hero, About, Experience, Skills, Projects, Education, Contact)
    ├── components/
    │   ├── layout/            # Navbar, Footer, Background, BackToTop
    │   ├── ui/                # Button, Section/SectionHeading, Reveal, TiltCard, SocialLinks, ThemeToggle, …
    │   ├── icons/             # GitHub & LinkedIn marks
    │   ├── ProjectCard.tsx    # Project card + links
    │   ├── ProjectVisual.tsx  # Illustrations shown when no screenshot is provided
    │   ├── SkillCard.tsx
    │   └── ContactForm.tsx
    ├── hooks/                 # useTheme, useActiveSection, useTypewriter, useResume, useSmoothAnchors, …
    ├── lib/                   # Motion presets, placeholder helpers, toast store, cn()
    └── styles/index.css       # Theme tokens (light/dark), utility classes, reduced-motion rules
```

### Customising the look

Colours are CSS variables in `src/styles/index.css` (`:root` = light, `.dark` = dark), exposed to Tailwind as `bg`, `surface`, `fg`, `muted`, `accent`, `accent-2` and more. Change the `--accent` / `--accent-2` values to re-theme the whole site.

### Animations

- Built with Framer Motion (`src/lib/motion.ts` holds shared easings/variants).
- Scroll reveals run **once** per element (no replay when scrolling back).
- Desktop-only effects (3D card tilt, cursor spotlight) are disabled on touch devices.
- With the OS "reduce motion" setting on, motion is minimised: the typing effect becomes static text, particles are hidden, and transitions are near-instant.

---

## 5. Tech & licensing

All dependencies are free and open source: React, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide, and Fontsource-hosted Inter / Space Grotesk / JetBrains Mono (SIL Open Font License). Fonts are self-hosted, so there are no third-party requests and no paid services.
