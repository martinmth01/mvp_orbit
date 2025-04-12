# Orbit Patrimoine – MVP

## Overview
Orbit Patrimoine is a web-based conversational assistant designed for individual real estate investors. It provides neutral, educational, and contextual guidance throughout their investment journey, powered by AI and enriched with structured internal documentation.

This MVP is built using Next.js with the App Router, TypeScript, Tailwind CSS, and integrates:
- An authenticated AI chat interface (freemium tier)
- A public blog with markdown-based content
- Basic user onboarding and profile personalization

---

## Key Features

### Freemium Chat
- Conversational interface powered by OpenAI GPT-4
- Personalized responses based on user profile data
- Internal documentation suggested via links in responses

### Blog / Knowledge Base
- Publicly accessible articles in `.mdx` format
- Organized by category (e.g., taxation, financing, strategy)
- SEO-ready via Next.js static generation

### User System
- Sign up / Login (via Supabase authentication)
- Simple profile: investment goal, level, and strategy
- Profile used to enrich AI context

---

## Stack
- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Authentication & DB**: Supabase (PostgreSQL, Auth)
- **AI**: OpenAI GPT-4 (via API)
- **Content**: Static Markdown files (`.mdx`)
- **Hosting**: Vercel

---

## Project Structure
See [`project-structure.md`](./.cursor/project-structure.md) for the full file and folder breakdown.

---

## Prompts & AI
See [`prompts.md`](./.cursor/prompts.md) for reusable AI prompt templates.

- Prompts use contextual data from the user profile
- Related blog content is suggested when relevant

---

## Development Rules
See [`rules.md`](./.cursor/rules.md) for coding guidelines and project constraints.

- Use only approved frameworks and tools
- Write concise, modular, well-documented code
- Keep all docs up to date during development

---

## Getting Started
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables in `.env`
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## Roadmap
See the Notion project planner for the detailed technical roadmap.

---

_Last updated: April 2025_
