import type { IntentId } from "./intents";

export const replies: Record<IntentId, string> = {
  who: `I'm Avez. Software engineer at Webknot in Bengaluru.

I build the parts that have to stay up — and the interfaces people actually use.

Right now that's TalentOS, Webknot's internal AI hiring platform. Before that: Rakuten SixthSense, then Omron Healthcare. Same employer, three very different systems.

Pune University, B.E. IT, 2024. 8.34/10.`,

  work: `Here's what I've been working on lately.

→ SixthSense — observability at Rakuten. Go ingest at 50K–100K events/sec.
→ TalentOS — Webknot's AI hiring OS. LangGraph, a recruiter copilot, 27 MCP tools.
→ Omron — factory monitoring. Kafka so vendor APIs couldn't take the rest down.

Ask about any of them.`,

  experience: `Webknot Technologies. Senior Software Engineer. May 2024–present. Bangalore.

2024 — Omron Healthcare India, client.
2025 — Rakuten India, SixthSense, client.
2026 — TalentOS, Webknot internal product.

Spot Award, Webknot 2024 — Taxlab.
Spot Award, Rakuten India 2025 — SixthSense.`,

  omron: `Omron Healthcare

I worked on a B2B factory monitoring system.

The problem was simple:

slow vendor APIs were slowing down everything else.

I moved the heavy work behind Kafka, added strict timeouts + exponential backoff, and built fail-safe processing paths.

Result: user-facing services stayed responsive during traffic spikes. The platform ran 24/7.

Kafka · Docker · Grafana`,

  rakuten: `SixthSense is an observability platform I worked on at Rakuten.

The interesting part wasn't the dashboard.

It was handling the event pipeline behind it.

Browser RUM in. Stateless Go ingest. Kafka. Consumers. ClickHouse.

At peak: 50K–100K events per second.

On the frontend I owned the architecture a 7-engineer team used — component library, theming, plugins, and a typed ApexCharts factory that cut duplication by about 70%.`,

  talentos: `TalentOS is Webknot's internal product — not a client. I've been on it since July 2026.

It's a multi-tenant AI hiring OS for recruiters and hiring managers. Not a public job board.

React, FastAPI, PostgreSQL. Kafka workers parse resumes. LangGraph agents score them against the JD, with an audit trail on every auto-reject.

I also shipped the recruiter copilot: a LangGraph supervisor plus 27 MCP tools that call the API as the logged-in user, scoped by RBAC.`,

  pipeline: `Honestly? Kafka was the only thing that made the ingest path honest.

SixthSense had to accept browser events and get out of the way. Validate, push to Kafka, return. That's how a stateless Go service holds 50K–100K events/sec when ClickHouse slows down.

The bottleneck at peak wasn't Kafka — it was database write-throughput. Bulk inserts, async processing, lag-based autoscaling with KEDA / HPA. Permanently failing events go to a dead-letter queue.

Ingest stays up. Downstream can catch its breath.`,

  architecture: `This is the SixthSense path, stripped down.

Browser
   ↓
Go ingest
   ↓
Kafka
   ↓
Consumers
   ↓
ClickHouse

The ingest service does not wait on the database. It validates the payload, writes to Kafka, and returns.

Consumers batch the writes. When ClickHouse lags, we scale them on Kafka lag — KEDA / HPA — instead of letting the browser start failing.`,

  whygo: `Honestly? I like being forced to think about what my program is actually doing.

Goroutines, channels, memory, interfaces...

There's less magic between the code I write and the system that runs.

Also, it happens to be pretty damn good for the kind of backend systems I enjoy building — the SixthSense ingest path being the obvious example.`,

  improved: `At Omron the failure mode was obvious: a slow vendor took everyone else with it.

What changed: Kafka for the heavy jobs. Timeouts and exponential backoff on the APIs we didn't control. Fail-safe paths so telemetry wasn't dropped when traffic spiked.

Cascading production failures stopped under peak load. The platform stayed available 24/7.

Winston and Grafana so we could see it when something still went wrong.`,

  stack: `What the work actually uses.

Languages: TypeScript, JavaScript, Go, Python, SQL.
Frontend: React, Tailwind CSS, Ant Design, ApexCharts.
Backend: REST APIs, FastAPI, NestJS, Kafka, LangGraph.
Data: PostgreSQL, MySQL, SQL Server, ClickHouse, Redis.
Infra: Docker, Kubernetes, KEDA, AWS, Grafana, Prometheus.

I reach for Go when the path has to be obvious. TypeScript when people have to live in the UI.`,

  contact: `Email — avezqureshi4785@gmail.com
Phone — +91-9890562214
LinkedIn, GitHub, LeetCode — same handle, avezqureshi14.

Bangalore. Webknot Technologies.`,
};

export const fallbackReply =
  "Ask me about the work — Omron, Rakuten SixthSense, TalentOS — the stack, or how to reach me.";
