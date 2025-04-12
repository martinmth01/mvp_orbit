# rules.md – Orbit Patrimoine Project

## Objective
You are developing a web MVP for **Orbit Patrimoine**, a conversational assistant dedicated to individual real estate investors. The goal is to provide neutral, personalized support through a chat-based AI interface and a public documentation blog.

The website includes two main areas:
- A conversational AI chat interface (accessible after sign-up)
- A public blog that displays internal documentation (from local markdown files)

## MVP Features to Build
1. Chat interface powered by the OpenAI GPT-4 API
2. Authentication using Supabase (email/password)
3. User profile creation form (goals, experience level, strategy)
4. User dashboard page (accessible after login)
5. Blog rendering system using markdown files with categories
6. Basic SEO for the blog section

## Required Tech Stack
- Framework: **Next.js** (with App Router and TypeScript)
- UI: **Tailwind CSS** (for responsive, modern styling)
- Backend & Auth: **Supabase** (PostgreSQL, Auth, Storage)
- AI: **OpenAI GPT-4 API** via HTTPS POST
- Blog: uses `.mdx` files integrated in the Next.js project
- Hosting: **Vercel**

## Constraints
- Must be fully responsive (desktop and mobile)
- Code should be modular, clean, commented, and reusable
- No external CMS (blog content is fully local)
- Do not add external libraries unless explicitly requested
- The blog must not rely on a database (markdown files only)
- Prioritize performance and simplicity in the UX/UI

## Recommended File Structure
- `/app`: routing and page-level logic (Next.js App Router)
- `/components`: reusable UI components
- `/lib`: utility functions (OpenAI API calls, Supabase helpers, etc.)
- `/styles`: Tailwind configuration and global styles
- `/data` or `/content`: markdown files for the blog

## Expected Best Practices
- Use clear, descriptive names for files and functions
- Document complex components
- Use modern React hooks (`useEffect`, `useState`, etc.)
- Build the foundation for future Premium features

## Example Prompt to Use in AI Chat
> "You are an expert assistant in real estate investment strategy. You help users clarify their goals and better understand the steps of a rental property project. Here is the user profile: [user profile data]."

---

**This file should be updated progressively as development evolves.**