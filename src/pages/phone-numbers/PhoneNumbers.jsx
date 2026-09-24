import React, { useState } from "react";
import {
  Phone,
  PhoneCall,
  MessageCircle,
  Wrench,
  Zap,
  User,
  Building2,
  ArrowRight,
  Check,
  Circle,
} from "lucide-react";

// ============================================================
// PROVIDERS
// ============================================================

const PROVIDERS = [
  {
    id: "twilio",
    name: "Twilio",
    icon: PhoneCall,
    isDefault: true,
  },
  {
    id: "telnyx",
    name: "Telnyx",
    icon: Phone,
  },
  {
    id: "indian-telephony",
    name: "Indian Telephony",
    icon: PhoneCall,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageCircle,
  },
  {
    id: "custom",
    name: "Custom Provider",
    icon: Wrench,
  },
];

// ============================================================
// ACCOUNT STRATEGIES
// ============================================================

const STRATEGIES = [
  {
    id: "own",
    icon: User,
    badge: "Complete Control",
    title: "Your Own Account",
    description:
      "Connect your existing Twilio infrastructure for maximum flexibility and control.",
    features: [
      { icon: Circle, label: "Full ownership & compliance control" },
      { icon: Circle, label: "Direct billing & cost optimization" },
    ],
  },
  {
    id: "managed",
    icon: Building2,
    badge: "Instant Setup",
    title: "Managed Account",
    description:
      "A fully managed, pre-optimized Twilio account with zero configuration required.",
    features: [
      { icon: Zap, label: "Instant activation & deployment" },
      { icon: Zap, label: "Pre-configured optimization & compliance" },
    ],
  },
];

// ============================================================
// MAIN PAGE
// ============================================================

export default function PhoneNumbers() {
  const [selectedProvider, setSelectedProvider] = useState("twilio");
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const activeProvider = PROVIDERS.find((p) => p.id === selectedProvider);

  const handleStrategy = (strategyId) => {
    setSelectedStrategy(strategyId);
    console.log("Strategy selected:", strategyId);
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-7">
        <section className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012] lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* ============================================================
              LEFT: PROVIDERS LIST
          ============================================================ */}
          <aside className="flex flex-col border-b border-black/[0.06] bg-zinc-50/50 lg:border-b-0 lg:border-r dark:border-white/[0.06] dark:bg-white/[0.01]">
            {/* Header */}
            <div className="border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Providers
              </h3>
            </div>

            {/* Provider list */}
            <nav className="flex-1 space-y-1 p-3">
              {PROVIDERS.map((provider) => {
                const Icon = provider.icon;
                const isActive = selectedProvider === provider.id;
                return (
                  <button
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`
                      flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition
                      ${
                        isActive
                          ? "bg-white text-zinc-900 shadow-sm dark:bg-[#1c1d22] dark:text-white"
                          : "text-zinc-600 hover:bg-black/[0.03] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
                      }
                    `}
                  >
                    <Icon
                      size={16}
                      strokeWidth={isActive ? 2 : 1.8}
                      className={
                        isActive
                          ? "text-cyan-600 dark:text-cyan-400"
                          : "text-zinc-500"
                      }
                    />
                    <span className="flex-1 truncate">{provider.name}</span>
                    {isActive && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-cyan-500" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Footer hint */}
            <div className="border-t border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                More providers coming soon
              </p>
            </div>
          </aside>

          {/* ============================================================
              RIGHT: ACCOUNT STRATEGY
          ============================================================ */}
          <div className="flex flex-col">
            {/* Main content */}
            <div className="flex-1 p-5 sm:p-7">
              {/* Provider badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  {activeProvider?.name}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-5 text-[22px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Choose your account strategy
              </h2>

              <p className="mt-2 text-[13px] text-zinc-500">
                Select how you'd like to connect {activeProvider?.name} to your
                AI calling platform.
              </p>

              {/* Strategy cards */}
              <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
                {STRATEGIES.map((strategy) => {
                  const Icon = strategy.icon;
                  return (
                    <StrategyCard
                      key={strategy.id}
                      strategy={strategy}
                      Icon={Icon}
                      isSelected={selectedStrategy === strategy.id}
                      onChoose={() => handleStrategy(strategy.id)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Bottom feature strip */}
            <div className="border-t border-black/[0.06] px-5 py-4 sm:px-7 dark:border-white/[0.06]">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Enterprise-grade</span>
                <span className="text-zinc-400">·</span>
                <span>Zero latency</span>
                <span className="text-zinc-400">·</span>
                <span>Always on</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ============================================================
// STRATEGY CARD
// ============================================================

function StrategyCard({ strategy, Icon, isSelected, onChoose }) {
  return (
    <div
      className={`
        flex flex-col rounded-2xl border p-6 transition
        ${
          isSelected
            ? "border-cyan-500/40 bg-cyan-500/[0.03]"
            : "border-black/[0.06] bg-zinc-50/50 dark:border-white/[0.08] dark:bg-white/[0.01]"
        }
      `}
    >
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          <Icon
            size={16}
            className="text-zinc-500 dark:text-zinc-400"
            strokeWidth={1.8}
          />
        </div>

        <span className="rounded-md border border-black/[0.08] bg-white px-2.5 py-1 text-[10px] font-semibold text-zinc-600 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400">
          {strategy.badge}
        </span>
      </div>

      {/* Title + description */}
      <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        {strategy.title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
        {strategy.description}
      </p>

      {/* Divider */}
      <div className="my-5 border-t border-black/[0.06] dark:border-white/[0.06]" />

      {/* Feature list */}
      <ul className="space-y-3">
        {strategy.features.map((feature, idx) => {
          const FeatureIcon = feature.icon;
          return (
            <li key={idx} className="flex items-start gap-2.5">
              <FeatureIcon
                size={13}
                className="mt-0.5 shrink-0 text-zinc-400 dark:text-zinc-500"
                strokeWidth={1.8}
              />
              <span className="text-[12.5px] text-zinc-600 dark:text-zinc-400">
                {feature.label}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Choose option button */}
      <button
        onClick={onChoose}
        className={`
          mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg border text-[13px] font-semibold transition
          ${
            isSelected
              ? "border-cyan-500 bg-cyan-500 text-white hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
              : "border-black/[0.08] bg-white text-zinc-800 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-200 dark:hover:bg-white/[0.04]"
          }
        `}
      >
        {isSelected ? (
          <>
            <Check size={14} strokeWidth={2.8} />
            Selected
          </>
        ) : (
          <>
            Choose this option
            <ArrowRight size={14} />
          </>
        )}
      </button>
    </div>
  );
}