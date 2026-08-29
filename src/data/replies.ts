import type { IntentId } from "./intents";

export const replies: Record<IntentId, string> = {
  who: `I'm Mohammad Avez Qureshi. Software Engineer I at Webknot Technologies in Bangalore — 2+ years, since May 2024.

I do full-stack work: backends that have to stay up, and the interfaces people actually use. Right now I'm on TalentOS, Webknot's internal AI hiring platform. Before that I was on Rakuten SixthSense, then Omron Healthcare India — both Webknot clients.

Pune University, B.E. in Information Technology, May 2024. CGPA 8.34/10.`,

  work: `One employer — Webknot. Three pieces of work.

Omron Healthcare India (client, Aug 2024–Apr 2025) — B2B factory monitoring. Kafka offload, timeouts, 24/7.

Rakuten India / SixthSense (client, May 2025–July 2026) — observability. Go ingest at 50K–100K events/sec, Kafka, ClickHouse, frontend architecture used by a 7-engineer team.

TalentOS (internal product, July 2026–present) — multi-tenant AI hiring. React, FastAPI, LangGraph, 27 MCP tools.`,

  experience: `Webknot Technologies, Software Engineer I. May 2024–present. Bangalore.

Aug 2024–Apr 2025 — Omron Healthcare India, client.
May 2025–July 2026 — Rakuten India, SixthSense observability, client.
July 2026–present — TalentOS, Webknot internal product.

Spot Award, Webknot 2024 — Taxlab.
Spot Award, Rakuten India 2025 — SixthSense.`,

  omron: `Omron Healthcare India was a Webknot client. Aug 2024–Apr 2025. I was on a B2B factory monitoring system.

Slow vendor APIs and heavy background jobs were taking user-facing services down with them. I redesigned the data architecture: Kafka to offload those jobs, strict timeouts and exponential backoff on the external APIs, so a vendor delay didn't cascade. Fail-safe Kafka paths so telemetry wasn't dropped during traffic spikes. The platform stayed available 24/7.

Ops: Docker, Winston logging, Grafana dashboards.`,

  rakuten: `Rakuten India was a Webknot client. May 2025–July 2026. I worked on SixthSense, their real-time observability platform — browser RUM, similar to Datadog.

I built a stateless Go ingestion pipeline: validate, push events into Kafka, return. At peak it processed 50K–100K events per second. REST APIs for platform infrastructure, internal tracking tools, and client dashboards. Kafka consumer groups with retries and a dead-letter queue so ingest stayed up when downstream slowed.

The peak bottleneck was ClickHouse write-throughput. We fixed it with bulk inserts, async processing, and lag-based consumer autoscaling (KEDA / HPA).

On the frontend I owned architecture used by a 7-engineer team — component library, theming engine, plugin system, and a typed ApexCharts factory that cut duplication by about 70%. Theme layer: Tailwind, Ant Design Tokens, CVA, runtime overrides.`,

  talentos: `TalentOS is Webknot's internal product, not a client. I've been on it since July 2026.

It's a multi-tenant AI hiring OS for recruiters and hiring managers — not a public job board. React, FastAPI, PostgreSQL. Kafka workers parse resumes. LangGraph agents score them against the JD, with an audit trail on every auto-reject.

I also shipped the recruiter copilot: a LangGraph supervisor plus 27 MCP tools that call the API as the logged-in user, scoped by RBAC.`,

  pipeline: `This is the SixthSense ingest path at Rakuten.

Stateless Go. Validate the browser payload, push to Kafka, return. That decoupling is what holds 50K–100K events/sec when ClickHouse slows down. Consumer groups batch writes. We scaled them on Kafka lag with KEDA / HPA.

The bottleneck at peak wasn't Kafka — it was database write-throughput. Bulk inserts and async processing are what moved it. Permanently failing events go to a dead-letter queue.`,

  stack: `What the resume lists, and what the work used.

Languages: TypeScript, JavaScript, Go, Python, SQL.
Frontend: React, Tailwind CSS, Ant Design, ApexCharts.
Backend: REST APIs, FastAPI, NestJS, Kafka, LangGraph, microservices.
Data: PostgreSQL, MySQL, SQL Server, ClickHouse, Redis.
Infra: Docker, Kubernetes, KEDA, AWS, Grafana, Prometheus, CI/CD, GitHub Actions.`,

  contact: `Email — avezqureshi4785@gmail.com
Phone — +91-9890562214
LinkedIn, GitHub, LeetCode — same handle, avezqureshi14.

Bangalore. Webknot Technologies.`,
};

export const fallbackReply =
  "I only talk about the work here — Omron, Rakuten SixthSense, TalentOS, the stack, or how to reach me.";
