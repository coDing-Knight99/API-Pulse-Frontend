import {
  Activity,
  ArrowRight,
  BarChart3,
  Braces,
  CheckCircle2,
  Gauge,
  KeyRound,
  Layers3,
  Network,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/APIPulse.png";
import heroGraphic from "../assets/hero.png";

const features = [
  {
    title: "API Gateway & Microservice Routing",
    copy: "Route requests across services with a focused gateway layer built for fast discovery, clean handoffs, and operational clarity.",
    icon: Network,
  },
  {
    title: "API Key Management System",
    copy: "Create, track, and manage API access from one control surface with key-level visibility for teams and services.",
    icon: KeyRound,
  },
  {
    title: "Rate Limiting",
    copy: "Protect services from traffic spikes with quota-aware controls that keep critical APIs responsive under pressure.",
    icon: Gauge,
  },
  {
    title: "Analytics & Monitoring",
    copy: "Watch request volume, service health, and usage trends with dashboards designed for quick operational reads.",
    icon: BarChart3,
  },
  {
    title: "API Sandbox",
    copy: "Test endpoints, headers, payloads, and responses in a dedicated sandbox before changes hit production workflows.",
    icon: Braces,
  },
];

const metrics = [
  { value: "99.9%", label: "gateway uptime focus" },
  { value: "5", label: "core API operations" },
  { value: "1", label: "unified control plane" },
];

const flowSteps = ["Client", "Gateway", "Keys", "Limits", "Services", "Insights"];

function FeatureCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <article
      className="landing-reveal rounded-lg border border-white/10 bg-[#0b0b12]/90 p-5 shadow-xl shadow-black/20 backdrop-blur"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-purple-500/15 text-purple-200 ring-1 ring-purple-300/20">
        <Icon size={21} />
      </span>
      <h3 className="text-base font-semibold text-white">{feature.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{feature.copy}</p>
    </article>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050508] text-slate-100">
      <section className="relative min-h-[92vh] border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src={heroGraphic}
            alt=""
            className=" absolute right-[-3rem] top-24 h-[28rem] w-[28rem]  sm:right-6 lg:right-24 lg:top-20 lg:h-[34rem] lg:w-[34rem] "
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(168,85,247,0.20),transparent_32%),linear-gradient(120deg,#050508_0%,rgba(5,5,8,0.90)_48%,rgba(12,12,20,0.72)_100%)]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>

        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link to="/landing" className="flex items-center gap-3">
            <img src={logo} alt="API-Pulse" className="h-30 w-30 object-contain" />
           
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#workflow" className="transition hover:text-white">
              Workflow
            </a>
            <a href="#monitoring" className="transition hover:text-white">
              Monitoring
            </a>
          </nav>

          <Link
            to="/login"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-purple-300/40 hover:bg-purple-500/20"
          >
            Launch App
            <ArrowRight size={16} />
          </Link>
        </header>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-24 lg:pt-15">
          <div className="landing-reveal max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-purple-300/20 bg-purple-500/10 px-3 py-2 text-xs font-semibold uppercase text-purple-100">
              <Activity size={15} />
              Gateway control for modern API teams
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
              API-Pulse
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Manage microservice routing, API keys, rate limits, analytics, and endpoint testing from one polished operational command center.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-purple-500 px-5 text-sm font-bold text-white shadow-lg shadow-purple-950/30 transition hover:bg-purple-400"
              >
                Start Managing APIs
                <ArrowRight size={17} />
              </Link>
              <a
                href="#features"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-[#0b0b12]/70 px-5 text-sm font-bold text-slate-200 transition hover:border-purple-300/30 hover:bg-[#151521]"
              >
                Explore Features
              </a>
            </div>

            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <dt className="text-2xl font-bold text-white">{metric.value}</dt>
                  <dd className="mt-1 text-xs leading-5 text-slate-500">{metric.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="landing-reveal landing-delay-2 relative min-h-[28rem]">
            <div className="absolute inset-0 rounded-lg border border-white/10 bg-[#090910]/80 shadow-2xl shadow-black/40 backdrop-blur" />
            <div className="relative p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">Live Gateway</p>
                  <h2 className="mt-1 text-xl font-bold text-white">Traffic Control</h2>
                </div>
                <span className="rounded-lg bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-emerald-300/20">
                  Healthy
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {flowSteps.map((step, index) => (
                  <div
                    key={step}
                    className="landing-flow flex items-center justify-between rounded-lg border border-white/10 bg-[#0d0d15] px-4 py-3"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-xs text-purple-200 ring-1 ring-purple-300/20">
                        {index + 1}
                      </span>
                      {step}
                    </span>
                    <CheckCircle2 size={17} className="text-emerald-300" />
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-[#0d0d15] p-4">
                  <ShieldCheck className="text-purple-200" size={22} />
                  <p className="mt-4 text-sm font-semibold text-white">Key protected</p>
                  <p className="mt-1 text-xs text-slate-500">Access verified before routing</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#0d0d15] p-4">
                  <Zap className="text-amber-200" size={22} />
                  <p className="mt-4 text-sm font-semibold text-white">Limit aware</p>
                  <p className="mt-1 text-xs text-slate-500">Traffic shaped by quotas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-purple-300">Feature stack</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Everything API-Pulse brings into one place</h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            From gateway traffic to sandbox testing, the product surface is shaped around the daily work of API operations.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </section>

      <section id="workflow" className="border-y border-white/10 bg-[#08080d]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase text-purple-300">Operational workflow</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">A clear path from request to insight</h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              API-Pulse keeps each gateway decision visible: who called, which key was used, how traffic was limited, and what the service returned.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Route", "Direct calls to the right microservice with less routing guesswork.", Layers3],
              ["Protect", "Validate API keys and shape usage before services take the load.", ShieldCheck],
              ["Observe", "Turn request history into monitoring signals and analytics views.", BarChart3],
            ].map(([title, copy, Icon]) => (
              <article key={title} className="rounded-lg border border-white/10 bg-[#0b0b12] p-5">
                <Icon className="text-purple-200" size={24} />
                <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="monitoring" className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-lg border border-white/10 bg-[#0b0b12] p-5 shadow-2xl shadow-black/30 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Analytics snapshot</p>
                <h2 className="mt-1 text-2xl font-bold text-white">Requests by service</h2>
              </div>
              <span className="rounded-lg bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-200 ring-1 ring-purple-300/20">
                Realtime
              </span>
            </div>
            <div className="mt-8 flex h-64 items-end gap-3">
              {[58, 82, 44, 72, 96, 64, 88].map((height, index) => (
                <span
                  key={height + index}
                  className="landing-bar flex-1 rounded-t-lg bg-purple-400/80"
                  style={{ height: `${height}%`, animationDelay: `${index * 110}ms` }}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase text-purple-300">Built for signal</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Monitoring that stays readable under load</h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              The interface favors fast scanning: request patterns, service status, key usage, and sandbox output stay close to the workflows that need them.
            </p>
            <Link
              to="/login"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-[#08080d] transition hover:bg-purple-100"
            >
              Open API-Pulse
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
