# Product Requirements Document (PRD) – Orbit Patrimoine MVP

## Project Overview
**Orbit Patrimoine** is a web-based conversational assistant that helps individual investors navigate the real estate investment process. The MVP focuses on providing a freemium chat experience and a structured knowledge base.

This MVP will be developed using Next.js (App Router), TypeScript, Tailwind CSS, Supabase, and OpenAI GPT-4.

---

## Goal
To build a functional MVP where:
- Visitors can register and log in
- Users can access a chat interface powered by GPT-4
- The chatbot gives personalized answers based on the user profile
- Relevant blog articles can be linked within the conversation
- A public blog provides static, educational content for SEO and credibility

---

## Target Users
- Individual French-speaking real estate investors
- Beginners to intermediate level
- Looking for neutral, non-commercial financial guidance

---

## Core Features

### 1. Authentication
- Email/password sign-up and login (Supabase)
- Minimal UI: form with validation, error display

### 2. User Profile
- After signup, user fills a short form with:
  - Investment goal
  - Experience level
  - Strategy preference
- Profile is saved to Supabase and reused by the AI

### 3. AI Chat Interface
- Display conversation in a familiar chat layout
- Text input and submit button
- Send user profile + message to OpenAI API
- Display AI response below each user input
- Support context (remember last few interactions)
- Link to relevant blog article (if any)

### 4. Blog
- Public-facing blog at `/blog`
- Articles in `.mdx` format stored locally in `/content/blog/`
- Each article includes title, summary, and content
- Route: `/blog/[slug]`
- Page list of articles (`/blog`) with `BlogPostCard`

### 5. UI Components
- `Header`: includes navigation to Home, Chat, Blog, Login/Register
- `Footer`: static footer for all pages
- `ChatBox`: main chat window logic
- `BlogPostCard`: preview card for article listing

---

## Technical Constraints
- Use only Next.js App Router (not Pages Router)
- Use TypeScript across the entire codebase
- Use Tailwind CSS for all layout and styling
- Blog must remain static (no CMS, no database for blog content)
- All rules defined in `.cursor/rules.md` must be respected

---

## Deliverables
- Pages:
  - `/` – Homepage (can be placeholder)
  - `/chat` – Chat interface (auth-protected)
  - `/dashboard` – Profile data and completion prompt
  - `/auth/login`, `/auth/register` – Auth pages
  - `/blog` – Article list (public)
  - `/blog/[slug]` – Individual article
- Components:
  - Header.tsx
  - Footer.tsx
  - ChatBox.tsx
  - BlogPostCard.tsx
- Markdown articles in `/content/blog/`

---

## Out of Scope (for MVP)
- Payment integration (for premium tier)
- Real-time chat updates (use `useState`, no websockets)
- Admin dashboard
- Multilingual support

---

## Success Criteria
- MVP is deployable on Vercel
- Users can register, complete profile, and chat
- Blog content is publicly accessible and searchable
- Code is modular, well-documented, and follows the project's `rules.md`

---

_Last updated: April 2025_
