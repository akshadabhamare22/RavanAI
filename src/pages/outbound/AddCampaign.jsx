import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Bot,
  Phone,
  Search,
  Check,
} from "lucide-react";

// ============================================================
// SAMPLE AGENTS (replace with real data later)
// ============================================================

const AVAILABLE_AGENTS = [
  {
    id: "1",
    name: "Unnamed Agent",
    initials: "UA",
    status: "ACTIVE",
  },
];

// ============================================================
// MAIN PAGE
// ============================================================

export default function AddCampaign() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentSearch, setAgentSearch] = useState("");

  const filteredAgents = AVAILABLE_AGENTS.filter((a) =>
    a.name.toLowerCase().includes(agentSearch.toLowerCase())
  );

  const canContinue =
    campaignName.trim().length > 0 && selectedAgent !== null;

  const handleContinue = () => {
    if (step === 1) {
      if (!canContinue) return;
      setStep(2);
    } else {
      // Submit step 2 and navigate back
      navigate("/outbound");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      {/* ============ TOP BAR (sticky) ============ */}
      <div className="sticky top-0 z-20 border-b border-black/[0.06] bg-zinc-100/95 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#09090B]/95">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/outbound")}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
            >
              <ArrowLeft size={16} />
            </button>

            <div>
              <h1 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                New Campaign
              </h1>
              <p className="mt-0.5 text-[11px] text-zinc-500">
                Step {step} of 2
              </p>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className="
              flex h-9 items-center gap-2
              rounded-lg bg-cyan-500 px-4
              text-[13px] font-semibold text-white
              transition
              hover:bg-cyan-400
              disabled:cursor-not-allowed
              disabled:bg-zinc-300
              dark:bg-cyan-400 dark:text-slate-950
              dark:disabled:bg-zinc-700
            "
          >
            Continue
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-full bg-black/[0.05] dark:bg-white/[0.05]">
          <div
            className="h-full bg-cyan-500 transition-all duration-500 dark:bg-cyan-400"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* ============ FORM ============ */}
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* Campaign Name */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <Pencil
                size={14}
                className="text-zinc-500 dark:text-zinc-400"
              />
            </div>
            <div>
              <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                Campaign Name
              </h2>
              <p className="mt-0.5 text-[12px] text-zinc-500">
                What should we call this campaign?
              </p>
            </div>
          </div>

          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="e.g., Q1 Customer Outreach"
            autoFocus
            className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[14px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
          />
        </section>

        {/* AI Agent */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Bot
                  size={14}
                  className="text-zinc-500 dark:text-zinc-400"
                />
              </div>
              <div>
                <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                  AI Agent
                </h2>
                <p className="mt-0.5 text-[12px] text-zinc-500">
                  Select the agent that will handle calls
                </p>
              </div>
            </div>
            <span className="text-[11px] text-zinc-500">
              {AVAILABLE_AGENTS.length} agent
              {AVAILABLE_AGENTS.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Search */}
          <div className="mb-4 flex h-11 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12]">
            <Search size={14} className="text-zinc-400" />
            <input
              type="text"
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              placeholder="Search agents..."
              className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
          </div>

          {/* Agent list */}
          <div className="space-y-2">
            {filteredAgents.map((agent) => {
              const isSelected = selectedAgent?.id === agent.id;
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedAgent(agent)}
                  className={`
                    flex w-full items-center gap-3
                    rounded-lg border px-4 py-3
                    text-left transition
                    ${
                      isSelected
                        ? "border-cyan-500/50 bg-cyan-500/[0.04]"
                        : "border-black/[0.06] bg-white hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
                    }
                  `}
                >
                  {/* Avatar */}
                  <div
                    className={`
                      flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                      text-[11px] font-bold
                      ${
                        isSelected
                          ? "bg-cyan-500 text-white dark:bg-cyan-400 dark:text-slate-950"
                          : "border border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400"
                      }
                    `}
                  >
                    {agent.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                      {agent.name}
                    </p>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {agent.status}
                    </p>
                  </div>

                  {isSelected && (
                    <Check
                      size={16}
                      className="shrink-0 text-cyan-500 dark:text-cyan-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-[11px] text-zinc-500">
            Showing {filteredAgents.length} of {AVAILABLE_AGENTS.length} active
            agent{AVAILABLE_AGENTS.length !== 1 ? "s" : ""}
          </p>
        </section>

        {/* Caller ID */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Phone
                  size={14}
                  className="text-zinc-500 dark:text-zinc-400"
                />
              </div>
              <div>
                <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Caller ID
                </h2>
                <p className="mt-0.5 text-[12px] text-zinc-500">
                  Phone number to call from
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
              Required
            </span>
          </div>

          <p className="text-[13px] text-zinc-500">
            No active phone numbers.{" "}
            <a
              href="#"
              className="text-cyan-600 hover:underline dark:text-cyan-400"
            >
              Add one.
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}