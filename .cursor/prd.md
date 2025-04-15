##Project Overview

Orbit Patrimoine is a web-based conversational assistant designed to help individual investors navigate the real estate investment process. The MVP focuses on delivering a freemium chat experience and a structured knowledge base.

This MVP is developed using Next.js (App Router), TypeScript, Tailwind CSS, Supabase, and OpenAI GPT-4.

⸻

##Objective

Build a functional MVP where:
	•	Visitors can register and log in
	•	Users can access a chat interface powered by GPT-4
	•	The chatbot provides personalized responses based on the user’s profile
	•	Relevant blog posts can be linked within the conversation
	•	A public blog provides static educational content for SEO and credibility

⸻

##Target Users
	•	Individual French-speaking real estate investors
	•	Beginner to intermediate level
	•	Seeking neutral, non-commercial financial advice

⸻

##Core Features

1. Authentication ✅
	•	Sign-up and login via email/password (Supabase) ✅
	•	Minimal UI: form with validation and error display ✅
	•	Route protection with middleware ✅
	•	Session management via cookies for SSR ✅

2. User Profile ✅
	•	After registration, users fill out a short form with:
	•	Investment goal
	•	Experience level
	•	Strategy preference
	•	The profile is saved in Supabase and reused by the AI

3. AI Chat Interface 🚧
	•	Display the conversation in a familiar chat layout
	•	Text input field and send button
	•	Send user profile + message to OpenAI API
	•	Display AI response below each user message
	•	Support context (remember previous interactions)
	•	Link to a relevant blog post (if applicable)

4. Blog 🚧
	•	Public blog at /blog
	•	Articles in .mdx format stored locally in /content/blog/
	•	Each article includes a title, summary, and content
	•	Route: /blog/[slug]
	•	Article list (/blog) with BlogPostCard

5. Dashboard ✅
	•	Display user properties ✅
	•	Add new properties ✅
	•	Detailed property view ✅
	•	Intuitive UI with cards and responsive grid ✅

6. UI Components ✅
	•	MainLayout: main layout with navigation ✅
	•	ClientLayout: wrapper for client-side components ✅
	•	Navbar: navigation bar with links to main sections ✅
	•	AuthForm: reusable authentication form ✅
	•	AuthGuard: route protection for authenticated pages ✅
	•	Button, Input, Card: reusable UI components ✅

⸻

##Technical Constraints
	•	Use only Next.js App Router (no Pages Router) ✅
	•	Use TypeScript throughout the codebase ✅
	•	Use Tailwind CSS for all layout and styling ✅
	•	The blog must remain static (no CMS, no database for blog content)
	•	All rules defined in .cursor/rules.md must be followed

⸻

##Deliverables
	•	Pages:
	•	/ – Homepage ✅
	•	/chat – Chat interface (auth protected) 🚧
	•	/dashboard – Profile data and completion prompt ✅
	•	/auth/login, /auth/register – Auth pages ✅
	•	/blog – Blog article list (public) 🚧
	•	/blog/[slug] – Individual article page 🚧
	•	Components:
	•	MainLayout.tsx ✅
	•	ClientLayout.tsx ✅
	•	Navbar.tsx ✅
	•	AuthForm.tsx ✅
	•	AuthGuard.tsx ✅
	•	Button.tsx, Input.tsx, Card.tsx ✅
	•	Markdown articles in /content/blog/ 🚧

⸻

##Out of Scope (for MVP)
	•	Payment integration (for premium tier)
	•	Real-time chat updates (use useState, no websockets)
	•	Admin dashboard
	•	Multilingual support

⸻

##Success Criteria
	•	The MVP is deployable on Vercel ✅
	•	Users can sign up, complete their profile, and chat ✅
	•	Blog content is publicly accessible and searchable
	•	The code is modular, well-documented, and follows the project rules.md ✅

⸻

##Progress Overview
	•	Authentication: ✅ Completed
	•	User Profile: ✅ Completed
	•	Dashboard: ✅ Completed
	•	Chat Interface: 🚧 In Progress
	•	Blog: 🚧 In Progress
	•	UI Components: ✅ Completed
