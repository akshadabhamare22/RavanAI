import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, HelpCircle, Pencil, Copy, ChevronDown, ChevronUp,
  Clock, Mic, Mic2, Braces, Calendar, RefreshCw,
  BookOpen, Phone, BarChart3, Webhook, Plus, Search, Globe,
  ExternalLink, Check, Play, MessageSquare, SlidersHorizontal,
  PhoneForwarded, KeyRound, Trash2, X,
  ClipboardCopy, ClipboardPaste, Equal, List, Hash, CircleDot,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import ThemeToggle from "../../components/ThemeToggle";
import config from "../../config/Config";

// ============================================================
// STATIC DATA
// ============================================================
const MODELS = [
  { name: "Agni Premium Lite", credits: "0.7 credits/min" },
  { name: "Agni Duplex", credits: "1 credits/min" },
  { name: "Agni 5.0 Lite", credits: "0.5 credits/min" },
  { name: "Agni 5.0", credits: "0.6 credits/min" },
];

const VOICES = [
  { name: "Priya", gender: "Female", color: "from-rose-400 to-pink-500" },
  { name: "Anika", gender: "Female", color: "from-orange-400 to-red-500" },
  { name: "Yash", gender: "Male", color: "from-blue-400 to-indigo-500" },
  { name: "Varun", gender: "Male", color: "from-emerald-400 to-teal-500" },
  { name: "Sameer", gender: "Male", color: "from-purple-400 to-pink-500" },
  { name: "Reyansh", gender: "Male", color: "from-amber-400 to-orange-500" },
  { name: "Nikhil", gender: "Male", color: "from-sky-400 to-blue-500" },
  { name: "Kunal", gender: "Male", color: "from-indigo-400 to-violet-500" },
  { name: "Ishaan", gender: "Male", color: "from-cyan-400 to-blue-500" },
  { name: "Dev", gender: "Male", color: "from-teal-400 to-emerald-500" },
  { name: "Aarav", gender: "Male", color: "from-yellow-400 to-orange-500" },
  { name: "Vihaan", gender: "Male", color: "from-fuchsia-400 to-purple-500" },
];

const ACCENT_COUNTRIES = ["India", "United States", "United Kingdom", "Australia", "Canada", "Ireland"];

const ACCENT_LANGUAGES = {
  India: [
    { section: "ENGLISH", items: ["Indian English"] },
    { section: "NORTH", items: ["Hindi", "Punjabi", "Haryanvi"] },
    { section: "SOUTH", items: ["Tamil", "Telugu", "Kannada", "Malayalam"] },
    { section: "WEST", items: ["Marathi", "Gujarati"] },
    { section: "EAST", items: ["Bengali", "Odia", "Assamese"] },
  ],
  "United States": [{ section: "ENGLISH", items: ["American English"] }],
  "United Kingdom": [{ section: "ENGLISH", items: ["British English"] }],
  Australia: [{ section: "ENGLISH", items: ["Australian English"] }],
  Canada: [{ section: "ENGLISH", items: ["Canadian English"] }],
  Ireland: [{ section: "ENGLISH", items: ["Irish English"] }],
};

const TIMEZONES = [
  "UTC", "Asia/Kolkata", "Asia/Dubai", "Asia/Singapore",
  "America/New_York", "Europe/London", "Australia/Sydney",
];

const FUNCTION_OPTIONS = [
  { id: "end_call", title: "End Call", description: "Terminate the call at a specific point", icon: Phone },
  { id: "transfer_call", title: "Transfer Call", description: "Transfer the call to a phone number", icon: PhoneForwarded },
  { id: "press_digit", title: "IVR / Press Digit", description: "Navigate an IVR menu by pressing a digit", icon: KeyRound },
  { id: "custom_function", title: "Custom Function", description: "Webhook / HTTP API call", icon: Globe },
];

const EXTRACTION_FIELD_TYPES = [
  { id: "text", label: "Text", icon: Equal },
  { id: "selector", label: "Selector", icon: List },
  { id: "yesno", label: "Yes/No", icon: CircleDot },
  { id: "number", label: "Number", icon: Hash },
];

const COUNTRIES = [
  { name: "India", code: "+91", iso: "IN" },
  { name: "United States", code: "+1", iso: "US" },
  { name: "United Kingdom", code: "+44", iso: "GB" },
  { name: "Australia", code: "+61", iso: "AU" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function CreateAgent() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("ravanai-theme");
    return saved === "light" ? "light" : "dark";
  });

  const handleThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("ravanai-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
  };

  const [agentName, setAgentName] = useState("Unnamed Agent");
  const [isEditingName, setIsEditingName] = useState(false);
  const [functionSearch, setFunctionSearch] = useState("");

  const [model, setModel] = useState("Agni Premium Lite");
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showProviderSettings, setShowProviderSettings] = useState(false);
  const [providerModel, setProviderModel] = useState("Agni Premium Lite");
  const [providerAdvanced, setProviderAdvanced] = useState("Advanced");
  const [temperature, setTemperature] = useState(0.7);

  const [voice, setVoice] = useState("Iris");
  const [showVoicePicker, setShowVoicePicker] = useState(false);

  const [memoryEnabled, setMemoryEnabled] = useState(false);
  const [showMemoryMenu, setShowMemoryMenu] = useState(false);
  const [emotionEnabled, setEmotionEnabled] = useState(false);
  const [showEmotionMenu, setShowEmotionMenu] = useState(false);

  const [accent, setAccent] = useState("India");
  const [showAccentPanel, setShowAccentPanel] = useState(false);

  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [welcomeMode, setWelcomeMode] = useState("User speaks first");

  const [systemPrompt, setSystemPrompt] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [showTimezonePicker, setShowTimezonePicker] = useState(false);

  // CALENDAR
  const [calendarTimezone, setCalendarTimezone] = useState("UTC");
  const [selectedCalendar, setSelectedCalendar] = useState("");

  // CRM
  const [salesforce, setSalesforce] = useState(false);
  const [gohighlevel, setGohighlevel] = useState(false);

  // SPEECH SETTINGS
  const [transcriptionLanguage, setTranscriptionLanguage] = useState("Auto-detect (default)");
  const [backgroundSound, setBackgroundSound] = useState("None");
  const [interruptionSensitivity, setInterruptionSensitivity] = useState(0.9);
  const [speechSpeed, setSpeechSpeed] = useState(1.0);
  const [reminderSeconds, setReminderSeconds] = useState(10);
  const [reminderTimes, setReminderTimes] = useState(1);
  const [reminderMessage, setReminderMessage] = useState("");

  // CALL SETTINGS
  const [voicemailDetection, setVoicemailDetection] = useState(false);
  const [endOnSilence, setEndOnSilence] = useState(false);
  const [silenceTimeout, setSilenceTimeout] = useState(10);
  const [durationLimit, setDurationLimit] = useState(30);
  const [emergencyFallback, setEmergencyFallback] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [ringDuration, setRingDuration] = useState(30);

  // POST-CALL EXTRACTION
  const [extractionFields, setExtractionFields] = useState([]);
  const [showAddFieldDropdown, setShowAddFieldDropdown] = useState(false);
  const [extractionModel, setExtractionModel] = useState("GPT-4o mini");
  const [showExtractionModelDropdown, setShowExtractionModelDropdown] = useState(false);
  const addFieldRef = useRef(null);
  const extractionModelRef = useRef(null);

  // WEBHOOK SETTINGS
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookHeaderName, setWebhookHeaderName] = useState("");
  const [webhookHeaderValue, setWebhookHeaderValue] = useState("");
  const [webhookRetries, setWebhookRetries] = useState(0);
  const [webhooks, setWebhooks] = useState([]);

  const handleAddWebhook = () => {
    if (!webhookUrl.trim()) {
      toast.error("Please enter a webhook URL");
      return;
    }

    const newWebhook = {
      id: `wh-${Date.now()}`,
      url: webhookUrl.trim(),
      headers: webhookHeaderName.trim() && webhookHeaderValue.trim()
        ? { [webhookHeaderName.trim()]: webhookHeaderValue.trim() }
        : {},
      retries: webhookRetries,
    };

    setWebhooks((prev) => [...prev, newWebhook]);
    setWebhookUrl("");
    setWebhookHeaderName("");
    setWebhookHeaderValue("");
    setWebhookRetries(0);
    toast.success("Webhook added successfully!");
  };

  const handleRemoveWebhook = (id) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
  };

  useEffect(() => {
    const handler = (e) => {
      if (addFieldRef.current && !addFieldRef.current.contains(e.target)) {
        setShowAddFieldDropdown(false);
      }
      if (extractionModelRef.current && !extractionModelRef.current.contains(e.target)) {
        setShowExtractionModelDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAddExtractionField = (type) => {
    setShowAddFieldDropdown(false);
    const newField = {
      id: `field-${Date.now()}`,
      type,
      name: `field_${extractionFields.length + 1}`,
      description: "",
      required: false,
    };
    setExtractionFields((prev) => [...prev, newField]);
  };

  const handleRemoveExtractionField = (id) => {
    setExtractionFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleCopyExtraction = () => {
    const json = JSON.stringify(extractionFields, null, 2);
    navigator.clipboard.writeText(json);
    toast.success("Copied to clipboard");
  };

  const handlePasteExtraction = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        setExtractionFields(parsed);
        toast.success("Pasted successfully");
      } else {
        toast.error("Invalid format");
      }
    } catch {
      toast.error("Nothing to paste");
    }
  };

  // ⭐ ALL SECTIONS COLLAPSED BY DEFAULT (matches screenshot)
  const [openSections, setOpenSections] = useState({
    functions: false,
    calendars: false,
    crm: false,
    knowledge: false,
    speech: false,
    call: false,
    postcall: false,
    webhook: false,
  });

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // FUNCTIONS STATE
  const [functions, setFunctions] = useState([]);
  const [showFunctionDropdown, setShowFunctionDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const functionDropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (functionDropdownRef.current && !functionDropdownRef.current.contains(e.target)) {
        setShowFunctionDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectFunctionType = (type) => {
    setShowFunctionDropdown(false);
    setActiveModal(type);
  };

  const handleAddFunction = (newFunction) => {
    setFunctions((prev) => [...prev, newFunction]);
    setActiveModal(null);
    toast.success(`${newFunction.name} added successfully!`);
  };

  const handleRemoveFunction = (id) => {
    setFunctions((prev) => prev.filter((fn) => fn.id !== id));
  };

  const handleAddKnowledgeBase = () => {
    navigate("/knowledge-base");
  };

  const filteredFunctions = functions.filter((fn) => {
    const q = functionSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      fn.name?.toLowerCase().includes(q) ||
      fn.type?.toLowerCase().includes(q) ||
      fn.description?.toLowerCase().includes(q)
    );
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [createdAgent, setCreatedAgent] = useState(null);

  const handleSaveAgent = async () => {
    setSaveMessage("");
    setSaveError("");

    const trimmedName = agentName.trim();
    if (!trimmedName || trimmedName === "Unnamed Agent") {
      setSaveError("Please enter an agent name before saving.");
      return;
    }

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setSaveError("Authentication token not found. Please login again.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        name: trimmedName,
        status: "active",
        llm_model: model,
        voice: voice,
        memory_enabled: memoryEnabled,
        emotion: emotionEnabled ? "enabled" : "disabled",
        accent: accent,
        timezone: timezone,
        system_prompt: systemPrompt,
        functions: functions,
        calendar: { timezone: calendarTimezone, selected: selectedCalendar },
        crm_sync: { salesforce, gohighlevel },
        speech_settings: {
          transcription_language: transcriptionLanguage,
          background_sound: backgroundSound,
          interruption_sensitivity: interruptionSensitivity,
          speech_speed: speechSpeed,
          reminder: {
            seconds: reminderSeconds,
            times: reminderTimes,
            message: reminderMessage,
          },
        },
        call_settings: {
          voicemail_detection: voicemailDetection,
          end_on_silence: endOnSilence,
          silence_timeout: silenceTimeout,
          duration_limit: durationLimit,
          emergency_fallback: emergencyFallback,
          ring_duration: ringDuration,
        },
        post_call_extraction: {
          model: extractionModel,
          fields: extractionFields,
        },
        webhook_settings: {
          webhooks: webhooks,
        },
      };

      const response = await axios.post(`${config.BASE_URL}/agents`, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setCreatedAgent(response.data);
      setSaveMessage("Agent created successfully.");
      localStorage.setItem("ravanai_last_created_agent", JSON.stringify(response.data));
    } catch (error) {
      console.error("Create Agent error:", error);
      const responseData = error?.response?.data;
      let apiError =
        responseData?.message ||
        responseData?.error ||
        responseData?.detail ||
        error?.message ||
        "Unable to create the agent.";
      if (Array.isArray(responseData?.detail)) {
        apiError = responseData.detail.map((item) => item?.msg).filter(Boolean).join(", ");
      }
      setSaveError(apiError);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <style>{`
        .thin-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .thin-scroll::-webkit-scrollbar-track { background: transparent; }
        .thin-scroll::-webkit-scrollbar-thumb { background: rgba(120,120,130,0.35); border-radius: 9999px; }
        .thin-scroll { scrollbar-width: thin; }
      `}</style>

      {/* TOP BAR */}
      <div className="z-20 shrink-0 border-b border-black/[0.06] bg-zinc-100/95 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#09090B]/95">
        <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => navigate("/agents")}
              className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              <ArrowLeft size={14} /> Back
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-zinc-500">Agent name :</span>
                {isEditingName ? (
                  <input
                    autoFocus
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
                    className="bg-transparent text-sm font-semibold outline-none"
                  />
                ) : (
                  <span className="text-sm font-semibold">{agentName}</span>
                )}
                <HelpCircle size={13} className="text-zinc-400" />
                <button onClick={() => setIsEditingName(true)} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
                  <Pencil size={13} />
                </button>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500">
                <span>ag01...5ec</span>
                <Copy size={11} />
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
              <button
                onClick={handleSaveAgent}
                disabled={isSaving}
                className="flex h-9 items-center rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-400 disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
            <div className="text-[10px]">
              {saveError ? (
                <span className="text-red-500">{saveError}</span>
              ) : saveMessage ? (
                <span className="text-emerald-500">{saveMessage}</span>
              ) : (
                <span className="text-zinc-500">Auto saved at 16:08</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3-COLUMN */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden p-4 sm:p-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)_minmax(320px,0.85fr)]">
        {/* LEFT */}
        <div className="thin-scroll flex h-full min-h-0 flex-col gap-3 overflow-y-auto pr-2 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex items-center gap-1">
              <button
                onClick={() => setShowModelPicker((v) => !v)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span className="truncate">{model}</span>
                <ChevronDown size={11} className="text-zinc-400" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-400 dark:border-white/[0.08] dark:bg-[#101012]">
                <HelpCircle size={12} />
              </button>
              <button
                onClick={() => setShowProviderSettings((v) => !v)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                  showProviderSettings
                    ? "border-cyan-500/50 bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400"
                    : "border-black/[0.08] bg-white text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]"
                }`}
              >
                <SlidersHorizontal size={12} />
              </button>
              {showModelPicker && (
                <ModelDropdown
                  current={model}
                  onSelect={(m) => { setModel(m); setShowModelPicker(false); }}
                  onClose={() => setShowModelPicker(false)}
                />
              )}
              {showProviderSettings && (
                <AIProviderSettings
                  model={providerModel}
                  onModelChange={setProviderModel}
                  advanced={providerAdvanced}
                  onAdvancedChange={setProviderAdvanced}
                  temperature={temperature}
                  onTemperatureChange={setTemperature}
                  onClose={() => setShowProviderSettings(false)}
                />
              )}
            </div>

            <div className="relative flex items-center gap-1">
              <button
                onClick={() => setShowVoicePicker(true)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-slate-900">
                  {voice[0]}
                </span>
                <span>{voice}</span>
                <ChevronDown size={11} className="text-zinc-400" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-400 dark:border-white/[0.08] dark:bg-[#101012]">
                <HelpCircle size={12} />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMemoryMenu((v) => !v)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span>Memory</span>
                <HelpCircle size={11} className="text-zinc-400" />
                <ChevronDown size={11} className="text-zinc-400" />
              </button>
              {showMemoryMenu && (
                <ToggleMenu
                  onSelect={(v) => { setMemoryEnabled(v === "Enable"); setShowMemoryMenu(false); }}
                  onClose={() => setShowMemoryMenu(false)}
                  selected={memoryEnabled ? "Enable" : "Disable"}
                />
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowEmotionMenu((v) => !v)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span>Emotion</span>
                <HelpCircle size={11} className="text-zinc-400" />
                <ChevronDown size={11} className="text-zinc-400" />
              </button>
              {showEmotionMenu && (
                <ToggleMenu
                  onSelect={(v) => { setEmotionEnabled(v === "Enable"); setShowEmotionMenu(false); }}
                  onClose={() => setShowEmotionMenu(false)}
                  selected={emotionEnabled ? "Enable" : "Disable"}
                />
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowAccentPanel((v) => !v)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span>Accent</span>
                <HelpCircle size={11} className="text-zinc-400" />
                <span className="text-zinc-500">{accent[0]}.</span>
                <ChevronDown size={11} className="text-zinc-400" />
              </button>
              {showAccentPanel && (
                <AccentPanel
                  current={accent}
                  onSelect={setAccent}
                  onClose={() => setShowAccentPanel(false)}
                />
              )}
            </div>
          </div>

          {/* Welcome Message */}
          <div className="rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
            <button
              onClick={() => setWelcomeOpen((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={12} className="text-zinc-500" />
                <span className="text-xs font-medium">Welcome Message</span>
              </div>
              {welcomeOpen ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
            </button>
            {welcomeOpen && (
              <div className="border-t border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
                <select
                  value={welcomeMode}
                  onChange={(e) => setWelcomeMode(e.target.value)}
                  className="h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
                >
                  <option>User speaks first</option>
                  <option>Agent speaks first</option>
                  <option>Silent</option>
                </select>
              </div>
            )}
          </div>

          {/* System Prompt */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.06] px-4 py-2.5 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">System Prompt</span>
                <HelpCircle size={11} className="text-zinc-400" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <button
                    onClick={() => setShowTimezonePicker((v) => !v)}
                    className="flex items-center gap-1 rounded-md border border-black/[0.08] px-2 py-1 text-[10px] font-medium text-cyan-600 dark:border-white/[0.08] dark:text-cyan-400"
                  >
                    <Clock size={10} /> {timezone} <ChevronDown size={10} />
                  </button>
                  {showTimezonePicker && (
                    <TimezonePicker
                      current={timezone}
                      onSelect={setTimezone}
                      onClose={() => setShowTimezonePicker(false)}
                    />
                  )}
                </div>
                <span className="flex items-center gap-1 rounded-md border border-black/[0.08] px-2 py-1 text-[10px] text-zinc-600 dark:border-white/[0.08] dark:text-zinc-400">
                  <span className="text-cyan-500">✱</span> ≈0 tokens
                </span>
                <span className="rounded-md border border-black/[0.08] px-2 py-1 text-[10px] text-zinc-600 dark:border-white/[0.08] dark:text-zinc-400">
                  {"{var}"} for variables
                </span>
              </div>
            </div>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Type in a universal prompt for your agent, such as its role, conversational style, objective, etc."
              className="min-h-0 flex-1 resize-none bg-transparent px-4 py-3 text-[13px] leading-relaxed outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
          </div>
        </div>

        {/* MIDDLE — ALL SECTIONS COLLAPSED */}
        <div className="thin-scroll h-full min-h-0 space-y-2.5 overflow-y-auto pr-2 pb-4">
          {/* FUNCTIONS */}
          <Section
            icon={Braces}
            title="Functions"
            badge={String(functions.length)}
            open={openSections.functions}
            onToggle={() => toggleSection("functions")}
          >
            <div className="relative mb-3" ref={functionDropdownRef}>
              <button
                type="button"
                onClick={() => setShowFunctionDropdown((v) => !v)}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
              >
                <Plus size={12} />
                Add Function
                <ChevronDown
                  size={12}
                  className={`transition-transform ${showFunctionDropdown ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {showFunctionDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="absolute left-0 top-full z-50 mt-2 w-[320px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] dark:border-white/[0.08] dark:bg-[#161618]"
                  >
                    {FUNCTION_OPTIONS.map((option, index) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSelectFunctionType(option.id)}
                          className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition hover:bg-black/[0.03] dark:hover:bg-white/[0.04] ${
                            index !== FUNCTION_OPTIONS.length - 1
                              ? "border-b border-black/[0.05] dark:border-white/[0.05]"
                              : ""
                          }`}
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-black/[0.02] dark:border-white/[0.08] dark:bg-white/[0.03]">
                            <Icon size={15} className="text-zinc-600 dark:text-zinc-300" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
                              {option.title}
                            </p>
                            <p className="mt-0.5 text-[12px] leading-snug text-zinc-500">
                              {option.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mb-3 flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12]">
              <Search size={13} className="shrink-0 text-zinc-500" />
              <input
                type="text"
                value={functionSearch}
                onChange={(e) => setFunctionSearch(e.target.value)}
                placeholder="Search functions..."
                className="min-w-0 flex-1 bg-transparent text-[12px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
              />
              {functionSearch && (
                <button
                  type="button"
                  onClick={() => setFunctionSearch("")}
                  className="shrink-0 rounded-full p-0.5 text-zinc-400 transition hover:bg-black/[0.05] hover:text-zinc-600 dark:hover:bg-white/[0.08] dark:hover:text-zinc-300"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {functions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center text-[12px] text-zinc-500 dark:border-white/[0.10]">
                No functions available yet.
              </div>
            ) : filteredFunctions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center text-[12px] text-zinc-500 dark:border-white/[0.10]">
                No functions match "<span className="font-semibold text-zinc-700 dark:text-zinc-300">{functionSearch}</span>"
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFunctions.map((fn) => (
                  <div
                    key={fn.id}
                    className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
                        {fn.name}
                      </p>
                      <p className="text-[10px] text-zinc-500">{fn.type}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFunction(fn.id)}
                      className="shrink-0 rounded-md p-1.5 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* CALENDARS */}
          <Section
            icon={Calendar}
            title="Calendars"
            open={openSections.calendars}
            onToggle={() => toggleSection("calendars")}
          >
            <p className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
              <Globe size={12} className="text-zinc-500" />
              Calendar Time Zone
              <HelpCircle size={11} className="text-zinc-400" />
            </p>
            <select
              value={calendarTimezone}
              onChange={(e) => setCalendarTimezone(e.target.value)}
              className="mb-3 h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
            >
              <option value="UTC">UTC</option>
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
            </select>

            <p className="mb-3 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              Select a calendar integration. Only one can be active at a time.
            </p>

            <div className="space-y-2">
              <RadioOption
                label="GoHighLevel (GHL)"
                sub="GoHighLevel / Lead Connector calendar"
                name="calendar"
                value="ghl"
                selected={selectedCalendar}
                onSelect={setSelectedCalendar}
              />
              <RadioOption
                label="Cal.com"
                sub="Cal.com appointment scheduling"
                name="calendar"
                value="calcom"
                selected={selectedCalendar}
                onSelect={setSelectedCalendar}
              />
            </div>
          </Section>

          {/* CRM SYNC */}
          <Section
            icon={RefreshCw}
            title="CRM Sync"
            badge="Connect a CRM to sync leads"
            open={openSections.crm}
            onToggle={() => toggleSection("crm")}
          >
            <p className="mb-3 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              Pick the CRMs that should receive leads from this agent. With none
              selected, leads sync to all connected CRMs.
            </p>

            <div className="space-y-2">
              <ToggleRow
                label="Salesforce"
                sub="Sync leads to Salesforce"
                badge="NOT CONNECTED"
                value={salesforce}
                onChange={setSalesforce}
              />
              <ToggleRow
                label="GoHighLevel"
                sub="Sync leads to GoHighLevel / Lead Connector"
                badge="NOT CONNECTED"
                value={gohighlevel}
                onChange={setGohighlevel}
              />
            </div>
          </Section>

          {/* KNOWLEDGE BASE */}
          <Section
            icon={BookOpen}
            title="Knowledge Base"
            open={openSections.knowledge}
            onToggle={() => toggleSection("knowledge")}
          >
            <p className="mb-3 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              Select a knowledge base for this agent
            </p>

            <div className="rounded-lg border border-black/[0.08] bg-white px-4 py-6 text-center dark:border-white/[0.10] dark:bg-white/[0.02]">
              <p className="text-[13px] font-medium text-zinc-600 dark:text-zinc-400">
                No knowledge bases found.
              </p>
              <p className="mt-1 text-[12px] text-zinc-500 dark:text-zinc-500">
                Create one and come back to attach it to this agent.
              </p>

              <button
                type="button"
                onClick={handleAddKnowledgeBase}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-black/[0.10] bg-white px-4 py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.10] dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/[0.04]"
              >
                <ExternalLink size={13} />
                Add Knowledge Base
              </button>
            </div>
          </Section>

          {/* SPEECH SETTINGS */}
          <Section
            icon={Mic2}
            title="Speech Settings"
            open={openSections.speech}
            onToggle={() => toggleSection("speech")}
          >
            <p className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
              Transcription Language
              <HelpCircle size={11} className="text-zinc-400" />
            </p>
            <select
              value={transcriptionLanguage}
              onChange={(e) => setTranscriptionLanguage(e.target.value)}
              className="mb-4 h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
            >
              <option>Auto-detect (default)</option>
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
            </select>

            <p className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
              Background Sound
              <HelpCircle size={11} className="text-zinc-400" />
            </p>
            <div className="mb-4 flex items-center gap-2">
              <select
                value={backgroundSound}
                onChange={(e) => setBackgroundSound(e.target.value)}
                className="h-10 flex-1 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
              >
                <option>None</option>
                <option>Office</option>
                <option>Restaurant</option>
                <option>Cafe</option>
                <option>Street</option>
              </select>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
              >
                <SlidersHorizontal size={15} />
              </button>
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                  Interruption Sensitivity
                  <HelpCircle size={11} className="text-zinc-400" />
                </span>
                <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
                  {interruptionSensitivity.toFixed(1)}
                </span>
              </div>
              <input
                type="range" min={0} max={1} step={0.1}
                value={interruptionSensitivity}
                onChange={(e) => setInterruptionSensitivity(parseFloat(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
                style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${interruptionSensitivity * 100}%, rgb(228 228 231) ${interruptionSensitivity * 100}%, rgb(228 228 231) 100%)` }}
              />
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                  Speech Speed
                  <HelpCircle size={11} className="text-zinc-400" />
                </span>
                <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
                  {speechSpeed.toFixed(1)}
                </span>
              </div>
              <input
                type="range" min={0.5} max={2} step={0.1}
                value={speechSpeed}
                onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
                style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((speechSpeed - 0.5) / 1.5) * 100}%, rgb(228 228 231) ${((speechSpeed - 0.5) / 1.5) * 100}%, rgb(228 228 231) 100%)` }}
              />
            </div>

            <div className="rounded-lg border border-black/[0.08] bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div>
                  <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                    Reminder Message Frequency
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                    Control how often AI sends a reminder message.
                  </p>
                </div>
                <HelpCircle size={12} className="mt-0.5 shrink-0 text-zinc-400" />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <input
                  type="number" min="0"
                  value={reminderSeconds}
                  onChange={(e) => setReminderSeconds(Number(e.target.value))}
                  className="h-10 w-[80px] rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
                />
                <span className="text-[12px] text-zinc-500 dark:text-zinc-400">seconds</span>

                <input
                  type="number" min="0"
                  value={reminderTimes}
                  onChange={(e) => setReminderTimes(Number(e.target.value))}
                  className="h-10 w-[70px] rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
                />
                <span className="text-[12px] text-zinc-500 dark:text-zinc-400">times</span>
              </div>

              <p className="mb-2 mt-4 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                Reminder Message
              </p>
              <textarea
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
                placeholder="Enter reminder message..."
                rows={4}
                className="w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3 py-2.5 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />
            </div>
          </Section>

          {/* CALL SETTINGS */}
          <Section
            icon={Phone}
            title="Call Settings"
            open={openSections.call}
            onToggle={() => toggleSection("call")}
          >
            <div className="mb-2 flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                  Voicemail detection
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
                  Detect and handle voicemail automatically.
                </p>
              </div>
              <HelpCircle size={12} className="shrink-0 text-zinc-400" />
              <button
                type="button"
                onClick={() => setVoicemailDetection(!voicemailDetection)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${voicemailDetection ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${voicemailDetection ? "translate-x-[22px]" : "translate-x-0.5"}`} />
              </button>
            </div>

            <div className="mb-2 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                    End call on silence
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
                    End call when prolonged silence is detected.
                  </p>
                </div>
                <HelpCircle size={12} className="shrink-0 text-zinc-400" />
                <button
                  type="button"
                  onClick={() => setEndOnSilence(!endOnSilence)}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${endOnSilence ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${endOnSilence ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                </button>
              </div>

              {endOnSilence && (
                <div className="mt-3 border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                      Silence timeout
                      <HelpCircle size={11} className="text-zinc-400" />
                    </span>
                    <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
                      {silenceTimeout} s
                    </span>
                  </div>
                  <input
                    type="range" min={5} max={30} step={1}
                    value={silenceTimeout}
                    onChange={(e) => setSilenceTimeout(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
                    style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((silenceTimeout - 5) / 25) * 100}%, rgb(228 228 231) ${((silenceTimeout - 5) / 25) * 100}%, rgb(228 228 231) 100%)` }}
                  />
                </div>
              )}
            </div>

            <div className="mb-2 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                    Max duration
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
                    Set a maximum call duration.
                  </p>
                </div>
                <HelpCircle size={12} className="mt-0.5 shrink-0 text-zinc-400" />
              </div>

              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                  Duration limit
                  <HelpCircle size={11} className="text-zinc-400" />
                </span>
                <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
                  {durationLimit} min
                </span>
              </div>
              <input
                type="range" min={5} max={60} step={1}
                value={durationLimit}
                onChange={(e) => setDurationLimit(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
                style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((durationLimit - 5) / 55) * 100}%, rgb(228 228 231) ${((durationLimit - 5) / 55) * 100}%, rgb(228 228 231) 100%)` }}
              />
            </div>

            <div className="mb-2 flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                  Emergency fallback
                </p>
                <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
                  Transfer the call to a backup number on failure.
                </p>
              </div>
              <HelpCircle size={12} className="shrink-0 text-zinc-400" />
              <button
                type="button"
                onClick={() => setEmergencyFallback(!emergencyFallback)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${emergencyFallback ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${emergencyFallback ? "translate-x-[22px]" : "translate-x-0.5"}`} />
              </button>
            </div>

            <div className="rounded-lg border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-white/[0.02]">
              <button
                type="button"
                onClick={() => setAdvancedOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-2 px-3.5 py-3"
              >
                <span className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                  Advanced
                  <HelpCircle size={11} className="text-zinc-400" />
                </span>
                {advancedOpen ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
              </button>

              {advancedOpen && (
                <div className="border-t border-black/[0.06] px-3.5 pb-3.5 pt-3 dark:border-white/[0.06]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                      Ring duration
                    </span>
                    <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
                      {ringDuration} s
                    </span>
                  </div>
                  <input
                    type="range" min={5} max={60} step={1}
                    value={ringDuration}
                    onChange={(e) => setRingDuration(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
                    style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((ringDuration - 5) / 55) * 100}%, rgb(228 228 231) ${((ringDuration - 5) / 55) * 100}%, rgb(228 228 231) 100%)` }}
                  />
                </div>
              )}
            </div>
          </Section>

          {/* POST-CALL DATA EXTRACTION */}
          <Section
            icon={BarChart3}
            title="Post-Call Data Extraction"
            open={openSections.postcall}
            onToggle={() => toggleSection("postcall")}
          >
            <div className="rounded-lg border border-black/[0.08] bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
                    Post Call Data Retrieval
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
                    Define the information you need to extract from the call.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyExtraction}
                    className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-600 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                  >
                    <ClipboardCopy size={12} />
                    Copy
                  </button>
                  <button
                    type="button"
                    onClick={handlePasteExtraction}
                    className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-600 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                  >
                    <ClipboardPaste size={12} />
                    Paste
                  </button>
                </div>
              </div>

              {extractionFields.length === 0 ? (
                <p className="mt-4 text-[12px] text-zinc-500 dark:text-zinc-400">
                  No fields yet. Add one below.
                </p>
              ) : (
                <div className="mt-4 space-y-2">
                  {extractionFields.map((field) => {
                    const typeMeta = EXTRACTION_FIELD_TYPES.find((t) => t.id === field.type);
                    const TypeIcon = typeMeta?.icon || Equal;
                    return (
                      <div
                        key={field.id}
                        className="flex items-center gap-2 rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
                      >
                        <TypeIcon size={13} className="shrink-0 text-zinc-500" />
                        <input
                          value={field.name}
                          onChange={(e) =>
                            setExtractionFields((prev) =>
                              prev.map((f) => (f.id === field.id ? { ...f, name: e.target.value } : f))
                            )
                          }
                          className="min-w-0 flex-1 bg-transparent text-[12px] text-zinc-800 outline-none dark:text-zinc-200"
                        />
                        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                          {typeMeta?.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExtractionField(field.id)}
                          className="shrink-0 rounded-md p-1 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
                <div className="relative" ref={addFieldRef}>
                  <button
                    type="button"
                    onClick={() => setShowAddFieldDropdown((v) => !v)}
                    className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/[0.04]"
                  >
                    <Plus size={12} />
                    Add
                  </button>

                  <AnimatePresence>
                    {showAddFieldDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        className="absolute bottom-full left-0 z-50 mb-2 w-[220px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:border-white/[0.08] dark:bg-[#161618] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                      >
                        {EXTRACTION_FIELD_TYPES.map((type) => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => handleAddExtractionField(type.id)}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] text-zinc-700 transition hover:bg-black/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                            >
                              <Icon size={14} className="text-zinc-500" />
                              {type.label}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative" ref={extractionModelRef}>
                  <button
                    type="button"
                    onClick={() => setShowExtractionModelDropdown((v) => !v)}
                    className="flex items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/[0.04]"
                  >
                    <SlidersHorizontal size={12} className="text-zinc-500" />
                    {extractionModel}
                    <ChevronDown size={12} className="text-zinc-400" />
                  </button>

                  <AnimatePresence>
                    {showExtractionModelDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        className="absolute bottom-full right-0 z-50 mb-2 w-[200px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:border-white/[0.08] dark:bg-[#161618] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                      >
                        {["GPT-4o mini", "GPT-4o", "GPT-4 turbo", "Claude 3.5 Sonnet"].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => {
                              setExtractionModel(m);
                              setShowExtractionModelDropdown(false);
                            }}
                            className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[13px] transition hover:bg-black/[0.03] dark:hover:bg-white/[0.04] ${
                              extractionModel === m ? "font-semibold text-cyan-600 dark:text-cyan-400" : "text-zinc-700 dark:text-zinc-300"
                            }`}
                          >
                            {m}
                            {extractionModel === m && <Check size={13} className="text-cyan-500" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </Section>

          {/* WEBHOOK SETTINGS */}
          <Section
            icon={Webhook}
            title="Webhook Settings"
            open={openSections.webhook}
            onToggle={() => toggleSection("webhook")}
          >
            <p className="mb-3 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              Add webhook URLs to receive event notifications when calls are completed.
            </p>

            <div className="rounded-lg border border-black/[0.08] bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="Enter webhook URL"
                className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500"
              />

              <div className="mt-3 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={webhookHeaderName}
                  onChange={(e) => setWebhookHeaderName(e.target.value)}
                  placeholder="Header name"
                  className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
                <input
                  type="text"
                  value={webhookHeaderValue}
                  onChange={(e) => setWebhookHeaderValue(e.target.value)}
                  placeholder="Header value"
                  className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-zinc-600 dark:text-zinc-400">Retries</span>
                  <input
                    type="number"
                    min="0"
                    value={webhookRetries}
                    onChange={(e) => setWebhookRetries(Number(e.target.value))}
                    className="h-10 w-[80px] rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddWebhook}
                  className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                >
                  <Plus size={13} />
                  Add
                </button>
              </div>
            </div>

            {webhooks.length === 0 ? (
              <div className="mt-3 rounded-lg border border-dashed border-black/[0.12] px-4 py-5 text-center text-[12px] leading-relaxed text-zinc-500 dark:border-white/[0.10] dark:text-zinc-400">
                No webhooks added yet. Add a URL above to get started.
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                {webhooks.map((wh) => (
                  <div
                    key={wh.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
                        {wh.url}
                      </p>
                      <p className="mt-0.5 text-[10px] text-zinc-500">
                        {Object.keys(wh.headers).length > 0 && `${Object.keys(wh.headers).length} header(s) · `}
                        Retries: {wh.retries}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveWebhook(wh.id)}
                      className="shrink-0 rounded-md p-1.5 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* RIGHT */}
        <div className="thin-scroll h-full min-h-0 overflow-y-auto rounded-xl border border-black/[0.06] bg-white pb-4 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Mic size={13} className="text-cyan-500" />
              <span className="text-xs font-semibold">Test Agent</span>
            </div>
          </div>
          <div className="flex flex-col items-center px-5 py-10 text-center">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/[0.03]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/[0.08]">
                <Mic size={22} className="text-cyan-500" />
              </div>
            </div>
            <h4 className="mt-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Test your agent</h4>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
              Run a live call to test your agent's voice, prompt, and functions.
            </p>

            <div className="mt-5 flex w-full items-start gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] px-3 py-2.5 text-left">
              <HelpCircle size={12} className="mt-0.5 shrink-0 text-cyan-500 dark:text-cyan-400" />
              <p className="text-[11px] leading-relaxed text-cyan-700 dark:text-cyan-300">
                Please note memory is not supported in Webcall.
              </p>
            </div>

            <button className="mt-5 flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950">
              <Mic size={13} /> Start Test
            </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {activeModal === "end_call" && (
        <EndCallModal onClose={() => setActiveModal(null)} onAddFunction={handleAddFunction} />
      )}
      {activeModal === "transfer_call" && (
        <TransferCallModal onClose={() => setActiveModal(null)} onAddFunction={handleAddFunction} />
      )}
      {activeModal === "press_digit" && (
        <IVRModal onClose={() => setActiveModal(null)} onAddFunction={handleAddFunction} />
      )}
      {activeModal === "custom_function" && (
        <CustomFunctionModal onClose={() => setActiveModal(null)} onAddFunction={handleAddFunction} />
      )}

      {showVoicePicker && (
        <VoicePickerModal
          current={voice}
          onClose={() => setShowVoicePicker(false)}
          onSelect={(v) => { setVoice(v); setShowVoicePicker(false); }}
        />
      )}
    </div>
  );
}

// ============================================================
// MODAL COMPONENTS
// ============================================================

function EndCallModal({ onClose, onAddFunction }) {
  const [name, setName] = useState("end_call");
  const [description, setDescription] = useState("");
  const [executionMessage, setExecutionMessage] = useState("");

  const handleAddFunction = () => {
    if (!name.trim()) return toast.error("Please enter a function name.");
    if (!description.trim()) return toast.error("Please enter a description.");

    onAddFunction({
      id: `fn-${Date.now()}`,
      name: name.trim(),
      type: "end_call",
      description: description.trim(),
      execution_message: executionMessage.trim(),
      enabled: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#18181b] shadow-2xl">
        <div className="flex items-start justify-between px-5 py-4">
          <div>
            <h2 className="text-[18px] font-semibold text-zinc-100">End Call</h2>
            <p className="mt-1 text-[12px] text-zinc-400">Define when the agent should end the call.</p>
          </div>
          <button onClick={onClose} className="text-xl text-zinc-500 hover:text-zinc-200">×</button>
        </div>
        <div className="px-5 pb-5">
          <div className="mb-4">
            <label className="mb-2 block text-[12px] font-semibold text-zinc-300">Name <span className="text-red-400">*</span></label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0f0f11] px-3 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50" />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-[12px] font-semibold text-zinc-300">Description <span className="text-red-400">*</span></label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe when the assistant should call this function." className="min-h-[106px] w-full resize-none rounded-lg border border-white/[0.10] bg-[#0f0f11] px-3 py-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
          </div>
          <div>
            <label className="mb-2 block text-[12px] font-semibold text-zinc-300">Execution Message</label>
            <input value={executionMessage} onChange={(e) => setExecutionMessage(e.target.value)} placeholder="Message spoken while this function executes" className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0f0f11] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-white/[0.08] px-5 py-3.5">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-[13px] font-medium text-zinc-400 hover:bg-white/[0.05]">Cancel</button>
          <button onClick={handleAddFunction} className="rounded-lg bg-cyan-500 px-4 py-2 text-[13px] font-semibold text-slate-950 hover:bg-cyan-400">Add Function</button>
        </div>
      </div>
    </div>
  );
}

function TransferCallModal({ onClose, onAddFunction }) {
  const [name, setName] = useState("transfer_call");
  const [description, setDescription] = useState("Transfer the call to a human agent");
  const [executionMessage, setExecutionMessage] = useState("");
  const [transferMode, setTransferMode] = useState("cold");
  const [transferTo, setTransferTo] = useState("static");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [prompt, setPrompt] = useState("");
  const [onHoldMusic, setOnHoldMusic] = useState(true);

  const handleSave = () => {
    if (!name.trim()) return toast.error("Please enter a function name.");
    if (transferTo === "static") {
      if (!phoneNumber.trim()) return toast.error("Please enter a phone number.");
      if (!/^\d{10}$/.test(phoneNumber)) return toast.error("Phone must be 10 digits.");
    }
    if (transferTo === "dynamic" && !prompt.trim()) return toast.error("Please enter a prompt.");

    onAddFunction({
      id: `fn-${Date.now()}`,
      name: name.trim(),
      type: "transfer_call",
      description: description.trim(),
      execution_message: executionMessage.trim(),
      transfer_mode: transferMode,
      transfer_to: transferTo,
      phone_number: transferTo === "static" ? `${selectedCountry.code}${phoneNumber}` : null,
      prompt: transferTo === "dynamic" ? prompt.trim() : null,
      on_hold_music: onHoldMusic,
      enabled: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
          <h2 className="text-[18px] font-semibold text-zinc-100">Transfer Call</h2>
          <button onClick={onClose} className="text-xl text-zinc-500 hover:text-zinc-200">×</button>
        </div>

        <div className="thin-scroll flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-[1fr_auto] items-end gap-4">
            <div>
              <label className="mb-2 block text-[12px] font-medium text-zinc-300">Name <span className="text-red-400">*</span></label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none" />
            </div>
            <label className="mb-2 flex items-center gap-2 text-[13px] text-zinc-300">
              <input type="checkbox" checked={onHoldMusic} onChange={(e) => setOnHoldMusic(e.target.checked)} className="h-4 w-4 accent-cyan-500" />
              On Hold Music
            </label>
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-2.5 text-[13px] text-zinc-200 outline-none" />
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">Transfer Mode</label>
            <div className="inline-flex rounded-lg border border-white/[0.08] bg-[#0b0b0d] p-0.5">
              {["cold", "warm"].map((m) => (
                <button key={m} onClick={() => setTransferMode(m)} className={`rounded-md px-4 py-2 text-[12px] font-semibold capitalize ${transferMode === m ? "bg-[#252529] text-zinc-100" : "text-zinc-500"}`}>
                  {m} Transfer
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">Transfer To</label>
            <div className="mb-3 inline-flex rounded-lg border border-white/[0.08] bg-[#0b0b0d] p-0.5">
              {["static", "dynamic"].map((t) => (
                <button key={t} onClick={() => setTransferTo(t)} className={`rounded-md px-4 py-2 text-[12px] font-semibold capitalize ${transferTo === t ? "bg-[#252529] text-zinc-100" : "text-zinc-500"}`}>
                  {t}
                </button>
              ))}
            </div>

            {transferTo === "static" ? (
              <div className="flex h-10 overflow-hidden rounded-lg border border-white/[0.10] bg-[#0b0b0d]">
                <select value={selectedCountry.iso} onChange={(e) => setSelectedCountry(COUNTRIES.find(c => c.iso === e.target.value))} className="w-[125px] shrink-0 border-r border-white/[0.08] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none">
                  {COUNTRIES.map((c) => (<option key={c.iso} value={c.iso}>{c.iso} {c.code}</option>))}
                </select>
                <input type="tel" value={phoneNumber} maxLength={10} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Enter destination number" className="min-w-0 flex-1 bg-transparent px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600" />
              </div>
            ) : (
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask the user which number to transfer to" rows={4} className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-2.5 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600" />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-white/[0.08] px-6 py-3.5">
          <button onClick={onClose} className="rounded-lg border border-white/[0.08] px-4 py-2 text-[13px] text-zinc-400">Cancel</button>
          <button onClick={handleSave} className="rounded-lg bg-cyan-500 px-5 py-2 text-[13px] font-semibold text-slate-950">Save</button>
        </div>
      </div>
    </div>
  );
}

function IVRModal({ onClose, onAddFunction }) {
  const [name, setName] = useState("press_digit");
  const [description, setDescription] = useState("Press a digit to navigate the IVR menu");
  const [pauseDetectionDelay, setPauseDetectionDelay] = useState(1000);

  const handleAddFunction = () => {
    if (!name.trim()) return toast.error("Please enter a function name.");

    onAddFunction({
      id: `fn-${Date.now()}`,
      name: name.trim(),
      type: "press_digit",
      description: description.trim(),
      pause_detection_delay: pauseDetectionDelay,
      enabled: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-[560px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#18181b] shadow-2xl">
        <div className="flex items-start justify-between px-5 pt-5">
          <div>
            <h2 className="text-[18px] font-semibold text-zinc-100">IVR / Press Digit</h2>
            <p className="mt-1 text-[13px] text-zinc-400">Configure the digit-press IVR navigation function.</p>
          </div>
          <button onClick={onClose} className="text-lg text-zinc-500 hover:text-zinc-200">×</button>
        </div>
        <div className="px-5 py-5">
          <div className="mb-4">
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">Name <span className="text-red-400">*</span></label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="h-11 w-full rounded-lg border border-white/[0.10] bg-[#0d0d0f] px-3 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50" />
          </div>
          <div className="mb-5">
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0d0d0f] px-3 py-2.5 text-[13px] text-zinc-200 outline-none" />
          </div>
          <div className="rounded-lg border border-white/[0.08] bg-[#1b1b1e] p-4">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-wide text-zinc-400">Press Digit Config</p>
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">Pause Detection Delay (ms)</label>
            <input type="number" min="0" value={pauseDetectionDelay} onChange={(e) => setPauseDetectionDelay(Number(e.target.value))} className="h-11 w-full rounded-lg border border-white/[0.10] bg-[#0d0d0f] px-3 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50" />
            <p className="mt-2 text-[11px] text-zinc-500">How long the agent waits after speaking before pressing a digit. Default: 1000ms.</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-white/[0.08] px-5 py-4">
          <button onClick={onClose} className="rounded-lg border border-white/[0.08] px-4 py-2 text-[13px] text-zinc-400">Cancel</button>
          <button onClick={handleAddFunction} className="rounded-lg bg-cyan-400 px-5 py-2 text-[13px] font-semibold text-slate-950">Add Function</button>
        </div>
      </div>
    </div>
  );
}

function CustomFunctionModal({ onClose, onAddFunction }) {
  const [functionType, setFunctionType] = useState("custom");
  const [method, setMethod] = useState("POST");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleSave = () => {
    if (!name.trim()) return toast.error("Please enter the function name.");
    if (!description.trim()) return toast.error("Please enter the description.");
    if (functionType === "custom" && !url.trim()) return toast.error("Please enter the API URL.");

    onAddFunction({
      id: `fn-${Date.now()}`,
      name: name.trim(),
      type: functionType,
      description: description.trim(),
      url: functionType === "custom" ? url.trim() : null,
      method: functionType === "custom" ? method : null,
      enabled: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012] shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/[0.08] px-6 py-5">
          <div>
            <h2 className="text-[19px] font-semibold text-zinc-100">
              {functionType === "custom" ? "Custom Function" : "Client Function"}
            </h2>
            <p className="mt-1 text-[12px] text-zinc-500">Configure endpoint details and execution options.</p>
          </div>
          <button onClick={onClose} className="text-xl text-zinc-500 hover:text-zinc-200">×</button>
        </div>

        <div className="thin-scroll flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex gap-2">
            <button onClick={() => setFunctionType("custom")} className={`rounded-lg border px-4 py-2 text-[12px] font-semibold ${functionType === "custom" ? "border-cyan-400 bg-cyan-400 text-slate-950" : "border-white/[0.10] text-zinc-400"}`}>Custom</button>
            <button onClick={() => setFunctionType("client")} className={`rounded-lg border px-4 py-2 text-[12px] font-semibold ${functionType === "client" ? "border-cyan-400 bg-cyan-400 text-slate-950" : "border-white/[0.10] text-zinc-400"}`}>Client Function</button>
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter function name" className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe what this function does" className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
          </div>

          {functionType === "custom" && (
            <div>
              <label className="mb-2 block text-[12px] font-medium text-zinc-300">API Endpoint</label>
              <div className="flex gap-2">
                <select value={method} onChange={(e) => setMethod(e.target.value)} className="h-10 w-[150px] rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none">
                  <option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option>
                </select>
                <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="h-10 flex-1 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-white/[0.08] px-6 py-3.5">
          <button onClick={onClose} className="rounded-lg border border-white/[0.08] px-5 py-2 text-[13px] text-zinc-400">Cancel</button>
          <button onClick={handleSave} className="rounded-lg bg-cyan-500 px-6 py-2 text-[13px] font-semibold text-slate-950 hover:bg-cyan-400">Save</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SMALL UI COMPONENTS
// ============================================================

function AIProviderSettings({ model, onModelChange, temperature, onTemperatureChange, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute left-0 top-full z-50 mt-1 w-[400px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
      <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
        <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">AI Provider Settings</h3>
        <p className="mt-0.5 text-[11px] text-zinc-500">Configure model and response behavior.</p>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">Model</label>
          <select value={model} onChange={(e) => onModelChange(e.target.value)} className="h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
            <option>Agni Premium Lite — 0.7 credits/min</option>
            <option>Agni Duplex — 1 credits/min</option>
            <option>Agni 5.0 Lite — 0.5 credits/min</option>
          </select>
        </div>
        <div>
          <label className="mb-2 flex items-center justify-between text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
            Temperature <span className="text-[11px] font-semibold">{temperature.toFixed(1)}</span>
          </label>
          <input type="range" min={0} max={1} step={0.1} value={temperature} onChange={(e) => onTemperatureChange(parseFloat(e.target.value))} className="h-1.5 w-full accent-cyan-500" />
        </div>
      </div>
    </div>
  );
}

function ToggleMenu({ selected, onSelect, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute left-0 top-full z-50 mt-1 w-[180px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
      {["Enable", "Disable"].map((option) => (
        <button key={option} onClick={() => onSelect(option)} className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] ${selected === option ? "bg-cyan-500/[0.08] font-semibold text-cyan-600 dark:text-cyan-400" : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"}`}>
          <Check size={13} className={selected === option ? "text-cyan-500 dark:text-cyan-400" : "text-transparent"} />
          {option}
        </button>
      ))}
    </div>
  );
}

function TimezonePicker({ current, onSelect, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute right-0 top-full z-50 mt-1 max-h-[280px] w-[240px] overflow-y-auto rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
      {TIMEZONES.map((tz) => (
        <button key={tz} onClick={() => { onSelect(tz); onClose(); }} className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] ${current === tz ? "bg-cyan-500/[0.08] font-semibold text-cyan-600 dark:text-cyan-400" : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"}`}>
          {current === tz && <Check size={11} className="text-cyan-500" />}
          {tz}
        </button>
      ))}
    </div>
  );
}

function AccentPanel({ current, onSelect, onClose }) {
  const ref = useRef(null);
  const [country, setCountry] = useState(current || "India");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const sections = ACCENT_LANGUAGES[country] || [];

  return (
    <div ref={ref} className="absolute left-0 top-full z-50 mt-1 max-h-[400px] w-[340px] overflow-y-auto rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
      <div className="border-b border-black/[0.06] p-3 dark:border-white/[0.06]">
        <div className="flex flex-wrap gap-1">
          {ACCENT_COUNTRIES.map((c) => (
            <button key={c} onClick={() => { setCountry(c); onSelect(c); setSelected([]); }} className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium ${country === c ? "bg-cyan-500 text-white" : "bg-black/[0.04] text-zinc-600 dark:bg-white/[0.05] dark:text-zinc-400"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="p-3">
        {sections.map((group) => (
          <div key={group.section} className="mb-3">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{group.section}</p>
            <div className="space-y-1">
              {group.items.map((lang) => {
                const isChecked = selected.includes(lang);
                return (
                  <button key={lang} onClick={() => setSelected((prev) => isChecked ? prev.filter((l) => l !== lang) : [...prev, lang])} className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-[12px] ${isChecked ? "border-cyan-500/40 bg-cyan-500/[0.04] text-cyan-600 dark:text-cyan-400" : "border-black/[0.06] text-zinc-700 dark:border-white/[0.08] dark:text-zinc-300"}`}>
                    <span className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${isChecked ? "border-cyan-500 bg-cyan-500" : "border-zinc-300 dark:border-zinc-600"}`}>
                      {isChecked && <Check size={9} className="text-white" strokeWidth={3} />}
                    </span>
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelDropdown({ current, onSelect, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute left-0 top-full z-50 mt-1 w-[280px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
      <div className="max-h-[320px] overflow-y-auto py-1">
        {MODELS.map((m) => (
          <button key={m.name} onClick={() => onSelect(m.name)} className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[13px] ${current === m.name ? "bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400" : "text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"}`}>
            <span className="flex items-center gap-2">
              {current === m.name && <Check size={13} className="text-cyan-500" />}
              <span className={current === m.name ? "font-semibold" : "font-medium"}>{m.name}</span>
            </span>
            <span className="text-[11px] text-zinc-400">{m.credits}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function VoicePickerModal({ current, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = VOICES.filter((v) => {
    const matchesQuery = v.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || v.gender === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        <div className="flex items-start justify-between border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Choose a Voice</h3>
            <p className="mt-1 text-xs text-zinc-500">{VOICES.length} voices available</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-zinc-500">✕</button>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
          <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12]">
            <Search size={14} className="text-zinc-400" />
            <input type="text" placeholder="Search voices..." value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-[13px] outline-none" />
          </div>
          <div className="flex rounded-lg border border-black/[0.08] p-1 dark:border-white/[0.08]">
            {["All", "Female", "Male"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-md px-3 py-1 text-xs font-medium ${filter === f ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300" : "text-zinc-500"}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v) => (
              <div key={v.name} className={`flex flex-col gap-3 rounded-xl border p-4 ${current === v.name ? "border-cyan-500/50 bg-cyan-500/[0.04]" : "border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]"}`}>
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${v.color} text-[12px] font-bold text-white`}>
                    {v.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{v.name}</p>
                    <p className="text-[11px] text-zinc-500">{v.gender}</p>
                  </div>
                </div>
                <button onClick={() => onSelect(v.name)} className="flex items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white py-2 text-[12px] font-medium dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300">
                  <Play size={11} /> Select
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, badge, open, onToggle, children }) {
  return (
    <div className="relative overflow-visible rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
      <button onClick={onToggle} className="flex w-full items-center gap-3 rounded-t-xl px-4 py-3.5 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/[0.04] dark:bg-white/[0.05]">
          <Icon size={14} className="text-zinc-600 dark:text-zinc-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">{title}</span>
            {badge && (
              <span className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
                {badge}
              </span>
            )}
          </div>
        </div>
        <HelpCircle size={12} className="shrink-0 text-zinc-400" />
        {open ? <ChevronUp size={14} className="shrink-0 text-zinc-400" /> : <ChevronDown size={14} className="shrink-0 text-zinc-400" />}
      </button>
      {open && (
        <div className="rounded-b-xl border-t border-black/[0.06] px-4 py-4 dark:border-white/[0.06]">
          {children}
        </div>
      )}
    </div>
  );
}

function RadioOption({ label, sub, name, value, selected, onSelect }) {
  const isSelected = selected === value;
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition ${
        isSelected
          ? "border-cyan-500/40 bg-cyan-500/[0.03] dark:border-cyan-500/40 dark:bg-cyan-500/[0.05]"
          : "border-black/[0.06] bg-white hover:border-black/[0.12] dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-white/[0.14]"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onSelect(value)}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-cyan-500"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
          {label}
        </p>
        <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
          {sub}
        </p>
      </div>
    </label>
  );
}

function ToggleRow({ label, sub, badge, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
            {label}
          </p>
          {badge && (
            <span className="rounded bg-black/[0.05] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:bg-white/[0.08] dark:text-zinc-400">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
          {sub}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          value ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-600"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            value ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SliderRow({ label, value, min, max, step, display, onChange }) {
  return (
    <div className="mb-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
        <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800" />
    </div>
  );
}