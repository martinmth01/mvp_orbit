# project-structure.md – Orbit Patrimoine (English Version)

## Objective
This file defines the folder and file structure for the MVP of Orbit Patrimoine. The goal is to maintain a clean, modular, and scalable architecture for development using Next.js App Router.

---

## Project Folder Structure

```
/app/
  layout.tsx              # Root layout component
  page.tsx                # Landing page
  /dashboard/
    page.tsx              # User dashboard (after login)
  /chat/
    page.tsx              # AI chat interface
  /auth/
    login.tsx             # Login page
    register.tsx          # Registration page

/components/
  Header.tsx              # Top navigation bar
  Footer.tsx              # Bottom page footer
  ChatBox.tsx             # Reusable chat component
  BlogPostCard.tsx        # Display card for blog articles

/lib/
  supabaseClient.ts       # Supabase client instance
  openai.ts               # OpenAI API functions
  userProfile.ts          # Utilities for managing user profiles

/content/
  blog/
    define-strategy.mdx   # Article: define investment strategy
    choose-location.mdx   # Article: how to choose location

/styles/
  globals.css             # Global Tailwind styles
  tailwind.config.ts      # Tailwind configuration

/.cursor/
  rules.md                # Project constraints and guidelines
  prompts.md              # Chat prompt templates
  project-structure.md    # (this file)

.eslint.config.mjs        # ESLint configuration
.jsconfig.json            # Path aliases and IntelliSense support
.next.config.mjs          # Next.js configuration
.package.json             # Project dependencies and scripts
.package-lock.json        # Lock file for npm dependencies
.postcss.config.mjs       # PostCSS configuration
.env                      # Environment variables (API keys, etc.)
README.md                 # Project documentation
```

---

## Organization Principles
- Use **Next.js App Router** in `/app/` with one `layout.tsx` and route-specific folders
- Group all **reusable UI components** in `/components/`
- Store **markdown content** in `/content/`, organized by topic (e.g., `blog/`)
- Place **utility functions** and external service logic in `/lib/`
- Use `/styles/` for Tailwind configuration and global styles
- Maintain all documentation and configuration for Cursor inside `/.cursor/`

---

## Naming Conventions
- Use **kebab-case** for markdown and content files (e.g., `define-strategy.mdx`)
- Use **PascalCase** for React components (e.g., `ChatBox.tsx`)
- Use **camelCase** for functions and helpers (e.g., `userProfile.ts`)

---

## Best Practices
- Document any complex component or logic directly in the `README.md`
- Avoid nested folders unless structurally necessary
- Keep the structure lean and readable for any future contributor
- All new utility functions must be placed in `/lib/`
- All static resources (e.g., images) must go in `/public/`

---

**Keep this file updated as the project evolves.**
