import React, { useState } from "react";
import {
  Coins,
  Zap,
  Sparkles,
  Star,
  Crown,
  Lock,
  Check,
  X,
  ArrowRight,
} from "lucide-react";

// ============================================================
// PLANS DATA
// ============================================================

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for founders testing voice AI for the first time.",
    agents: "1",
    concurrent: "5",
    price: "2,999",
    gst: "539.82",
    total: "3,538.82",
    features: [
      { label: "Call Recording", included: true },
      { label: "API Access", included: false },
    ],
    theme: "default",
  },
  {
    id: "growth",
    name: "Growth",
    badge: "RECOMMENDED",
    description: "For teams scaling outbound calls across India.",
    agents: "10",
    concurrent: "15",
    price: "5,999",
    gst: "1,079.82",
    total: "7,078.82",
    features: [
      { label: "Call Recording", included: true },
      { label: "API Access", included: false },
    ],
    theme: "cyan",
  },
  {
    id: "scale",
    name: "Scale",
    badge: "MOST POPULAR",
    description: "Full API access + integrations. Built for production.",
    agents: "20",
    concurrent: "30",
    price: "12,999",
    gst: "2,339.82",
    total: "15,338.82",
    features: [
      { label: "Call Recording", included: true },
      { label: "API Access", included: true },
    ],
    theme: "amber",
  },
];

// ============================================================
// MAIN PAGE
// ============================================================

export default function Billing() {
  const [region] = useState("India");

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* ============ CREDITS CARD ============ */}
        <section>
          <div className="max-w-md rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
                <Coins
                  size={15}
                  className="text-cyan-600 dark:text-cyan-400"
                />
              </div>
              <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                Credits
              </h3>
            </div>

            <p className="mt-5 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              10
            </p>

            <p className="mt-1 text-[12px] text-zinc-500">
              Available balance
            </p>
          </div>
        </section>

        {/* ============ AVAILABLE PLANS ============ */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
                <Zap size={14} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Available Plans
                </h2>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Billed via Stripe Checkout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[12px] text-zinc-500">Region</span>
              <select
                value={region}
                className="h-9 appearance-none rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] text-zinc-700 outline-none dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
          </div>

          {/* Plans grid */}
          <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </section>

        {/* ============ ENTERPRISE BANNER ============ */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-r from-cyan-50/70 via-white to-violet-50/60 dark:border-white/[0.08] dark:from-cyan-500/[0.04] dark:via-[#101012] dark:to-violet-500/[0.04] dark:bg-[#101012]">
          <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between lg:p-7">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-white dark:border-white/[0.08] dark:bg-[#101012]">
                <Crown
                  size={18}
                  className="text-cyan-600 dark:text-cyan-400"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
                  Enterprise Plan
                </p>
                <h3 className="mt-1 text-[17px] font-bold text-zinc-900 dark:text-zinc-100">
                  Unlock a deployment strategy built for scale
                </h3>
                <p className="mt-2 max-w-3xl text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Partner with our enterprise team for advanced integrations,
                  custom workflows, and rollout guidance designed for
                  high-volume voice AI operations. For procurement questions,
                  contact{" "}
                  <a
                    href="mailto:Info@ravan.ai"
                    className="text-cyan-600 hover:underline dark:text-cyan-400"
                  >
                    Info@ravan.ai
                  </a>
                  .
                </p>
              </div>
            </div>

            <button className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 text-[13px] font-semibold text-white transition hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
              <Crown size={14} />
              Get Enterprise Plan
            </button>
          </div>
        </section>

        {/* ============ BILLING HISTORY ============ */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="flex items-center gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-500 dark:text-zinc-400"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
              Billing History
            </h2>
          </div>

          {/* Empty state */}
          <div className="py-20 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-400 dark:text-zinc-500"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
                <text
                  x="12"
                  y="17"
                  textAnchor="middle"
                  fontSize="7"
                  fontWeight="700"
                  fill="currentColor"
                  stroke="none"
                >
                  $
                </text>
              </svg>
            </div>

            <p className="mt-4 text-[13px] text-zinc-500">No invoices yet</p>
          </div>
        </section>
      </main>
    </div>
  );
}

// ============================================================
// PLAN CARD
// ============================================================

function PlanCard({ plan }) {
  const themeStyles = {
    default: {
      wrapper:
        "border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]",
      banner: null,
    },
    cyan: {
      wrapper:
        "border-cyan-500/40 bg-white dark:border-cyan-400/30 dark:bg-[#101012]",
      banner:
        "bg-cyan-500 text-white dark:bg-cyan-400 dark:text-slate-950",
    },
    amber: {
      wrapper:
        "border-amber-500/40 bg-white dark:border-amber-500/30 dark:bg-[#101012]",
      banner: "bg-amber-500 text-slate-950",
    },
  };
  const t = themeStyles[plan.theme] || themeStyles.default;

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border ${t.wrapper}`}
    >
      {/* Top badge banner */}
      {plan.badge && (
        <div
          className={`flex items-center justify-center gap-1.5 py-2 text-[10px] font-bold uppercase tracking-wider ${t.banner}`}
        >
          {plan.theme === "amber" ? (
            <Star size={11} fill="currentColor" />
          ) : (
            <Sparkles size={11} />
          )}
          {plan.badge}
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Name + description */}
        <h3 className="text-[22px] font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
          {plan.name}
        </h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-500">
          {plan.description}
        </p>

        {/* Agents / concurrent box */}
        <div className="mt-5 rounded-xl border border-black/[0.06] bg-zinc-50/60 px-4 py-4 text-center dark:border-white/[0.08] dark:bg-white/[0.02]">
          <p className="text-[12px] text-zinc-600 dark:text-zinc-400">
            ≈ {plan.agents} AI agents included
          </p>
          <p className="mt-1 text-[12px] text-zinc-500">
            ~ {plan.concurrent} concurrent calls
          </p>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end gap-2">
          <span className="text-[30px] font-bold leading-none text-zinc-900 dark:text-zinc-100">
            ₹{plan.price}
          </span>
          <span className="pb-1 text-[11px] leading-tight text-zinc-500">
            per month, billed
            <br />
            monthly
          </span>
        </div>

        {/* GST info */}
        <p className="mt-2 text-[11px] text-zinc-500">
          + ₹{plan.gst} GST (18%) — ₹{plan.total} total
        </p>

        {/* Divider */}
        <div className="my-5 border-t border-black/[0.06] dark:border-white/[0.06]" />

        {/* Premium Features header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={12} className="text-zinc-500" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Premium Features
            </p>
          </div>
          <button className="text-[11px] text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">
            Learn more
          </button>
        </div>

        {/* Feature list */}
        <ul className="mt-4 space-y-3">
          {plan.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                {feature.included ? (
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    className="shrink-0 text-emerald-500 dark:text-emerald-400"
                  />
                ) : (
                  <X
                    size={13}
                    strokeWidth={2.5}
                    className="shrink-0 text-zinc-400"
                  />
                )}
                <span className="text-[12.5px] text-zinc-700 dark:text-zinc-300">
                  {feature.label}
                </span>
              </div>

              {feature.included && (
                <span className="rounded border border-amber-500/40 bg-amber-500/[0.12] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Included
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Bottom CTA */}
        <button
          className={`
            group mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-semibold transition
            ${
              plan.theme === "cyan"
                ? "bg-cyan-500 text-white hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                : plan.theme === "amber"
                  ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                  : "border border-black/[0.08] bg-white text-zinc-800 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-200 dark:hover:bg-white/[0.04]"
            }
          `}
        >
          Get Started
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </div>
  );
}