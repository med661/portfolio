claude --resume c33394f5-374b-4a7d-ac6e-98ee0673acae 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# portfolio


Here's the honest problem: LearnHub,
  Job Hunt Diary, Real-Time Chat, 
  E-commerce Backend are classic
  tutorial projects that every
  junior/mid developer also has. Here
  are 6 project ideas that actually 
  signal senior-level thinking:

  ---
  1. Distributed Rate Limiter as a 
  Service
  
  A standalone microservice that other
  apps plug into — Redis-backed
  sliding window algorithm,
  multi-tenant, with a dashboard
  showing request analytics per API
  key. Shows: distributed systems, SRE
  thinking, reusable infrastructure.

  ▎ Stack: NestJS + Redis + Kafka + 
  ▎ React dashboard

  ---
  2. Schema-Driven Form Engine
  
  A JSON/config-driven dynamic form
  builder — define a form in JSON, the
  engine renders it, validates it,
  and submits it. Used internally at
  companies like Airbnb, Stripe.
  Shows: abstraction, DX thinking,
  extensible architecture.

  ▎ Stack: React + TypeScript + Zod +
  ▎ React Hook Form

  ---
  3. Real-Time Collaborative 
  Whiteboard

  Like Figma's canvas — multi-user
  drawing with CRDTs (conflict-free
  replicated data types) for sync
  without server authority. Shows:
  deep WebSocket knowledge,
  distributed state, algorithms.

  ▎ Stack: NestJS + Socket.io + Canvas
  ▎ API + Redis Pub/Sub

  ---
  4. CI/CD Pipeline Monitoring 
  Dashboard
  
  A tool that aggregates build/deploy
  status from GitHub Actions, shows
  flaky test trends, deployment
  frequency, MTTR metrics. Shows:
  DevOps culture, data visualization,
  system observability.

  ▎ Stack: Next.js + GitHub API + 
  ▎ PostgreSQL + Chart.js

  ---
  5. Multi-Tenant SaaS Boilerplate
  
  A fully production-ready SaaS
  starter — tenant isolation at DB
  level (row-level security), Stripe
  billing, role-based permissions,
  audit logs, feature flags. Shows:
  you've built SaaS in production.

  ▎ Stack: NestJS + PostgreSQL (RLS) +
  ▎ Stripe + Next.js

  ---
  6. AI Document Q&A Engine (RAG)

  Upload PDFs/docs → ask questions →
  get answers with source citations.
  Uses vector embeddings + semantic
  search. Shows: AI integration,
  modern architecture, practical LLM
  use.