// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft, HelpCircle, Pencil, Copy, ChevronDown, ChevronUp,
//   Clock, Mic, Mic2, Braces, Calendar, RefreshCw,
//   BookOpen, Phone, BarChart3, Webhook, Plus, Search, Globe,
//   ExternalLink, Check, Play, MessageSquare, SlidersHorizontal,
//   PhoneForwarded, KeyRound, Trash2, X,
//   ClipboardCopy, ClipboardPaste, Equal, List, Hash, CircleDot,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify";

// import ThemeToggle from "../../components/ThemeToggle";
// import config from "../../config/Config";

// // ============================================================
// // STATIC DATA
// // ============================================================
// const MODELS = [
//   { name: "Agni Premium Lite", credits: "0.7 credits/min" },
//   { name: "Agni Duplex", credits: "1 credits/min" },
//   { name: "Agni 5.0 Lite", credits: "0.5 credits/min" },
//   { name: "Agni 5.0", credits: "0.6 credits/min" },
// ];

// const VOICES = [
//   { name: "Priya", gender: "Female", color: "from-rose-400 to-pink-500" },
//   { name: "Anika", gender: "Female", color: "from-orange-400 to-red-500" },
//   { name: "Yash", gender: "Male", color: "from-blue-400 to-indigo-500" },
//   { name: "Varun", gender: "Male", color: "from-emerald-400 to-teal-500" },
//   { name: "Sameer", gender: "Male", color: "from-purple-400 to-pink-500" },
//   { name: "Reyansh", gender: "Male", color: "from-amber-400 to-orange-500" },
//   { name: "Nikhil", gender: "Male", color: "from-sky-400 to-blue-500" },
//   { name: "Kunal", gender: "Male", color: "from-indigo-400 to-violet-500" },
//   { name: "Ishaan", gender: "Male", color: "from-cyan-400 to-blue-500" },
//   { name: "Dev", gender: "Male", color: "from-teal-400 to-emerald-500" },
//   { name: "Aarav", gender: "Male", color: "from-yellow-400 to-orange-500" },
//   { name: "Vihaan", gender: "Male", color: "from-fuchsia-400 to-purple-500" },
// ];

// const ACCENT_COUNTRIES = ["India", "United States", "United Kingdom", "Australia", "Canada", "Ireland"];

// const ACCENT_LANGUAGES = {
//   India: [
//     { section: "ENGLISH", items: ["Indian English"] },
//     { section: "NORTH", items: ["Hindi", "Punjabi", "Haryanvi"] },
//     { section: "SOUTH", items: ["Tamil", "Telugu", "Kannada", "Malayalam"] },
//     { section: "WEST", items: ["Marathi", "Gujarati"] },
//     { section: "EAST", items: ["Bengali", "Odia", "Assamese"] },
//   ],
//   "United States": [{ section: "ENGLISH", items: ["American English"] }],
//   "United Kingdom": [{ section: "ENGLISH", items: ["British English"] }],
//   Australia: [{ section: "ENGLISH", items: ["Australian English"] }],
//   Canada: [{ section: "ENGLISH", items: ["Canadian English"] }],
//   Ireland: [{ section: "ENGLISH", items: ["Irish English"] }],
// };

// const TIMEZONES = [
//   "UTC", "Asia/Kolkata", "Asia/Dubai", "Asia/Singapore",
//   "America/New_York", "Europe/London", "Australia/Sydney",
// ];

// const FUNCTION_OPTIONS = [
//   { id: "end_call", title: "End Call", description: "Terminate the call at a specific point", icon: Phone },
//   { id: "transfer_call", title: "Transfer Call", description: "Transfer the call to a phone number", icon: PhoneForwarded },
//   { id: "press_digit", title: "IVR / Press Digit", description: "Navigate an IVR menu by pressing a digit", icon: KeyRound },
//   { id: "custom_function", title: "Custom Function", description: "Webhook / HTTP API call", icon: Globe },
// ];

// const EXTRACTION_FIELD_TYPES = [
//   { id: "text", label: "Text", icon: Equal },
//   { id: "selector", label: "Selector", icon: List },
//   { id: "yesno", label: "Yes/No", icon: CircleDot },
//   { id: "number", label: "Number", icon: Hash },
// ];

// const COUNTRIES = [
//   { name: "India", code: "+91", iso: "IN" },
//   { name: "United States", code: "+1", iso: "US" },
//   { name: "United Kingdom", code: "+44", iso: "GB" },
//   { name: "Australia", code: "+61", iso: "AU" },
// ];

// // ============================================================
// // MAIN COMPONENT
// // ============================================================
// export default function CreateAgent() {
//   const navigate = useNavigate();

//   const [theme, setTheme] = useState(() => {
//     const saved = localStorage.getItem("ravanai-theme");
//     return saved === "light" ? "light" : "dark";
//   });

//   const handleThemeToggle = () => {
//     const next = theme === "dark" ? "light" : "dark";
//     setTheme(next);
//     localStorage.setItem("ravanai-theme", next);
//     document.documentElement.classList.toggle("dark", next === "dark");
//     document.documentElement.style.colorScheme = next;
//   };

//   const [agentName, setAgentName] = useState("Unnamed Agent");
//   const [welcomeMessage, setWelcomeMessage] = useState("Hello! Welcome to our customer support. How can I help you today?");
//   const [knowledgeBases, setKnowledgeBases] = useState([]);
//   const [knowledgeBasesLoading, setKnowledgeBasesLoading] = useState(false);
//   const [selectedKnowledgeBaseIds, setSelectedKnowledgeBaseIds] = useState([]);
//   const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || "e28286da-9abd-4882-babb-696dd40e5635";
//   const [isEditingName, setIsEditingName] = useState(false);
//   const [functionSearch, setFunctionSearch] = useState("");

//   const [model, setModel] = useState("Agni Premium Lite");
//   const [showModelPicker, setShowModelPicker] = useState(false);
//   const [showProviderSettings, setShowProviderSettings] = useState(false);
//   const [providerModel, setProviderModel] = useState("Agni Premium Lite");
//   const [providerAdvanced, setProviderAdvanced] = useState("Advanced");
//   const [temperature, setTemperature] = useState(0.7);

//   const [voice, setVoice] = useState("Iris");
//   const [showVoicePicker, setShowVoicePicker] = useState(false);

//   const [memoryEnabled, setMemoryEnabled] = useState(false);
//   const [showMemoryMenu, setShowMemoryMenu] = useState(false);
//   const [emotionEnabled, setEmotionEnabled] = useState(false);
//   const [showEmotionMenu, setShowEmotionMenu] = useState(false);

//   const [accent, setAccent] = useState("India");
//   const [showAccentPanel, setShowAccentPanel] = useState(false);

//   const [welcomeOpen, setWelcomeOpen] = useState(true);
//   const [welcomeMode, setWelcomeMode] = useState("User speaks first");

//   const [systemPrompt, setSystemPrompt] = useState("");
//   const [timezone, setTimezone] = useState("UTC");
//   const [showTimezonePicker, setShowTimezonePicker] = useState(false);

//   // CALENDAR
//   const [calendarTimezone, setCalendarTimezone] = useState("UTC");
//   const [selectedCalendar, setSelectedCalendar] = useState("");

//   // CRM
//   const [salesforce, setSalesforce] = useState(false);
//   const [gohighlevel, setGohighlevel] = useState(false);

//   // SPEECH SETTINGS
//   const [transcriptionLanguage, setTranscriptionLanguage] = useState("Auto-detect (default)");
//   const [backgroundSound, setBackgroundSound] = useState("None");
//   const [interruptionSensitivity, setInterruptionSensitivity] = useState(0.9);
//   const [speechSpeed, setSpeechSpeed] = useState(1.0);
//   const [reminderSeconds, setReminderSeconds] = useState(10);
//   const [reminderTimes, setReminderTimes] = useState(1);
//   const [reminderMessage, setReminderMessage] = useState("");

//   // CALL SETTINGS
//   const [voicemailDetection, setVoicemailDetection] = useState(false);
//   const [endOnSilence, setEndOnSilence] = useState(false);
//   const [silenceTimeout, setSilenceTimeout] = useState(10);
//   const [durationLimit, setDurationLimit] = useState(30);
//   const [emergencyFallback, setEmergencyFallback] = useState(false);
//   const [advancedOpen, setAdvancedOpen] = useState(true);
//   const [ringDuration, setRingDuration] = useState(30);

//   // POST-CALL EXTRACTION
//   const [extractionFields, setExtractionFields] = useState([]);
//   const [showAddFieldDropdown, setShowAddFieldDropdown] = useState(false);
//   const [extractionModel, setExtractionModel] = useState("GPT-4o mini");
//   const [showExtractionModelDropdown, setShowExtractionModelDropdown] = useState(false);
//   const addFieldRef = useRef(null);
//   const extractionModelRef = useRef(null);

//   // WEBHOOK SETTINGS
//   const [webhookUrl, setWebhookUrl] = useState("");
//   const [webhookHeaderName, setWebhookHeaderName] = useState("");
//   const [webhookHeaderValue, setWebhookHeaderValue] = useState("");
//   const [webhookRetries, setWebhookRetries] = useState(0);
//   const [webhooks, setWebhooks] = useState([]);

//   const handleAddWebhook = () => {
//     if (!webhookUrl.trim()) {
//       toast.error("Please enter a webhook URL");
//       return;
//     }

//     const newWebhook = {
//       id: `wh-${Date.now()}`,
//       url: webhookUrl.trim(),
//       headers: webhookHeaderName.trim() && webhookHeaderValue.trim()
//         ? { [webhookHeaderName.trim()]: webhookHeaderValue.trim() }
//         : {},
//       retries: webhookRetries,
//     };

//     setWebhooks((prev) => [...prev, newWebhook]);
//     setWebhookUrl("");
//     setWebhookHeaderName("");
//     setWebhookHeaderValue("");
//     setWebhookRetries(0);
//     toast.success("Webhook added successfully!");
//   };

//   const handleRemoveWebhook = (id) => {
//     setWebhooks((prev) => prev.filter((w) => w.id !== id));
//   };

//   useEffect(() => {
//     const handler = (e) => {
//       if (addFieldRef.current && !addFieldRef.current.contains(e.target)) {
//         setShowAddFieldDropdown(false);
//       }
//       if (extractionModelRef.current && !extractionModelRef.current.contains(e.target)) {
//         setShowExtractionModelDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const handleAddExtractionField = (type) => {
//     setShowAddFieldDropdown(false);
//     const newField = {
//       id: `field-${Date.now()}`,
//       type,
//       name: `field_${extractionFields.length + 1}`,
//       description: "",
//       required: false,
//     };
//     setExtractionFields((prev) => [...prev, newField]);
//   };

//   const handleRemoveExtractionField = (id) => {
//     setExtractionFields((prev) => prev.filter((f) => f.id !== id));
//   };

//   const handleCopyExtraction = () => {
//     const json = JSON.stringify(extractionFields, null, 2);
//     navigator.clipboard.writeText(json);
//     toast.success("Copied to clipboard");
//   };

//   const handlePasteExtraction = async () => {
//     try {
//       const text = await navigator.clipboard.readText();
//       const parsed = JSON.parse(text);
//       if (Array.isArray(parsed)) {
//         setExtractionFields(parsed);
//         toast.success("Pasted successfully");
//       } else {
//         toast.error("Invalid format");
//       }
//     } catch {
//       toast.error("Nothing to paste");
//     }
//   };

//   // ⭐ ALL SECTIONS COLLAPSED BY DEFAULT (matches screenshot)
//   const [openSections, setOpenSections] = useState({
//     functions: false,
//     calendars: false,
//     crm: false,
//     knowledge: false,
//     speech: false,
//     call: false,
//     postcall: false,
//     webhook: false,
//   });

//   const toggleSection = (key) =>
//     setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

//   // FUNCTIONS STATE
//   const [functions, setFunctions] = useState([]);
//   const [showFunctionDropdown, setShowFunctionDropdown] = useState(false);
//   const [activeModal, setActiveModal] = useState(null);
//   const functionDropdownRef = useRef(null);

//   useEffect(() => {
//     const handler = (e) => {
//       if (functionDropdownRef.current && !functionDropdownRef.current.contains(e.target)) {
//         setShowFunctionDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const handleSelectFunctionType = (type) => {
//     setShowFunctionDropdown(false);
//     setActiveModal(type);
//   };

//   const handleAddFunction = (newFunction) => {
//     setFunctions((prev) => [...prev, newFunction]);
//     setActiveModal(null);
//     toast.success(`${newFunction.name} added successfully!`);
//   };

//   const handleRemoveFunction = (id) => {
//     setFunctions((prev) => prev.filter((fn) => fn.id !== id));
//   };

//   const handleAddKnowledgeBase = () => {
//     navigate("/knowledge-base");
//   };

//   const filteredFunctions = functions.filter((fn) => {
//     const q = functionSearch.trim().toLowerCase();
//     if (!q) return true;
//     return (
//       fn.name?.toLowerCase().includes(q) ||
//       fn.type?.toLowerCase().includes(q) ||
//       fn.description?.toLowerCase().includes(q)
//     );
//   });

//   const [isSaving, setIsSaving] = useState(false);
//   const [saveMessage, setSaveMessage] = useState("");
//   const [saveError, setSaveError] = useState("");
//   const [createdAgent, setCreatedAgent] = useState(null);

//   useEffect(() => {
//     let cancelled = false;
//     const loadKnowledgeBases = async () => {
//       const token = localStorage.getItem("access_token");
//       setKnowledgeBasesLoading(true);
//       try {
//         const response = await axios.get(`${config.BASE_URL}/knowledge-bases`, {
//           headers: token ? { Authorization: `Bearer ${token}` } : {},
//         });
//         const items = Array.isArray(response.data?.items) ? response.data.items : [];
//         if (!cancelled) setKnowledgeBases(items);
//       } catch (error) {
//         console.error("Failed to load knowledge bases:", error);
//         if (!cancelled) setKnowledgeBases([]);
//       } finally {
//         if (!cancelled) setKnowledgeBasesLoading(false);
//       }
//     };
//     loadKnowledgeBases();
//     return () => { cancelled = true; };
//   }, []);

//   const handleSaveAgent = async () => {
//     setSaveMessage("");
//     setSaveError("");

//     const trimmedName = agentName.trim();
//     if (!trimmedName || trimmedName === "Unnamed Agent") {
//       setSaveError("Please enter an agent name before saving.");
//       return;
//     }

//     const accessToken = localStorage.getItem("access_token");
//     if (!accessToken) {
//       setSaveError("Authentication token not found. Please login again.");
//       navigate("/login", { replace: true });
//       return;
//     }

//     try {
//       setIsSaving(true);
//       const voiceMeta = VOICES.find((item) => item.name.toLowerCase() === voice.toLowerCase());
//       const selectedModel = MODELS.find((item) => item.name === model) || MODELS[0];
//       const accentLanguages = accent === "India"
//         ? ["English", "Hindi", "Marathi"]
//         : ["English"];
//       const selectedCalendarIds = selectedCalendar && !["ghl", "calcom"].includes(selectedCalendar)
//         ? [selectedCalendar]
//         : [];
//       const crmProvider = salesforce ? "salesforce" : gohighlevel ? "gohighlevel" : null;
//       const payload = {
//         name: trimmedName,
//         status: "active",
//         client_id: CLIENT_ID,
//         timezone,
//         model: {
//           id: model === "Agni Premium Lite" ? "agni-premium-lite" : model.toLowerCase().replaceAll(" ", "-"),
//           name: model,
//           gender: "female",
//         },
//         voice: {
//           id: voice.toLowerCase(),
//           name: voice,
//           gender: voiceMeta?.gender?.toLowerCase() || "female",
//         },
//         memory: { enabled: memoryEnabled },
//         emotion: { enabled: emotionEnabled },
//         accent: {
//           country: accent,
//           language: "English",
//           languages: accentLanguages,
//         },
//         welcome_message: {
//           enabled: welcomeMode !== "Silent",
//           message: welcomeMessage,
//         },
//         system_prompt: {
//           role: "customer_support",
//           instruction: systemPrompt,
//           behavior: "Be polite, clear and concise.",
//         },
//         functions: functions.map(({ id, ...fn }) => ({
//           type: fn.type === "custom_function" ? "custom" : fn.type,
//           name: fn.name,
//           description: fn.description || "",
//           enabled: fn.enabled !== false,
//           configuration: {
//             ...(fn.url ? { url: fn.url } : {}),
//             ...(fn.method ? { method: fn.method } : {}),
//             ...(fn.configuration || {}),
//           },
//         })),
//         calendar: {
//           enabled: selectedCalendarIds.length > 0,
//           calendar_ids: selectedCalendarIds,
//         },
//         crm_sync: {
//           enabled: Boolean(crmProvider),
//           provider: crmProvider,
//           configuration: {},
//         },
//         knowledge_base: {
//           enabled: selectedKnowledgeBaseIds.length > 0,
//           knowledge_base_ids: selectedKnowledgeBaseIds,
//         },
//         speech_settings: {
//           language: "en-IN",
//           speed: speechSpeed,
//           pitch: 0,
//           silence: { enabled: endOnSilence, timeout_seconds: silenceTimeout },
//           transcription_language: transcriptionLanguage === "Auto-detect (default)" ? null : transcriptionLanguage,
//           background_sound: backgroundSound === "None" ? null : backgroundSound,
//           interruption_sensitivity: interruptionSensitivity,
//           reminder_message: {
//             enabled: Boolean(reminderMessage.trim()),
//             message: reminderMessage || null,
//             max_reminders: reminderTimes,
//             interval_seconds: reminderSeconds,
//           },
//         },
//         call_settings: {
//           recording_enabled: true,
//           transcription_enabled: true,
//           max_duration: { enabled: true, seconds: durationLimit * 60 },
//           fallback: {
//             enabled: true,
//             message: "Sorry, I am unable to help with that right now. Please try again later.",
//           },
//           voicemail_detection: voicemailDetection,
//           end_call_on_silence: { enabled: endOnSilence, timeout_seconds: endOnSilence ? silenceTimeout : null },
//           emergency_fallback: { enabled: emergencyFallback, phone_number: null },
//           advanced: { ring_duration_seconds: ringDuration },
//         },
//         post_call_data_extraction: {
//           enabled: extractionFields.length > 0,
//           fields: extractionFields.map(({ id, type, ...field }) => ({
//             name: field.name,
//             description: field.description || "",
//             type: type === "text" ? "string" : type === "yesno" ? "boolean" : type === "number" ? "number" : "string",
//             required: Boolean(field.required),
//           })),
//         },
//         webhook_settings: {
//           enabled: webhooks.length > 0 || Boolean(webhookUrl.trim()),
//           events: ["call_started", "call_ended"],
//           configuration: {
//             url: webhooks[0]?.url || webhookUrl || "",
//             method: webhooks[0]?.method || "POST",
//             headers: webhooks[0]?.headers || {},
//             timeout_seconds: 10,
//             retries: webhookRetries,
//           },
//         },
//         prompt_variables: {
//           company_name: "Agni AI",
//           support_email: "support@example.com",
//           language: "English",
//         },
//         metadata: { department: "customer_support", environment: "development" },
//       };

//       const response = await axios.post(`${config.BASE_URL}/agents`, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setCreatedAgent(response.data);
//       setSaveMessage("Agent created successfully.");
//       localStorage.setItem("ravanai_last_created_agent", JSON.stringify(response.data));
//     } catch (error) {
//       console.error("Create Agent error:", error);
//       const responseData = error?.response?.data;
//       let apiError =
//         responseData?.message ||
//         responseData?.error ||
//         responseData?.detail ||
//         error?.message ||
//         "Unable to create the agent.";
//       if (Array.isArray(responseData?.detail)) {
//         apiError = responseData.detail.map((item) => item?.msg).filter(Boolean).join(", ");
//       }
//       setSaveError(apiError);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       <style>{`
//         .thin-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
//         .thin-scroll::-webkit-scrollbar-track { background: transparent; }
//         .thin-scroll::-webkit-scrollbar-thumb { background: rgba(120,120,130,0.35); border-radius: 9999px; }
//         .thin-scroll { scrollbar-width: thin; }
//       `}</style>

//       {/* TOP BAR */}
//       <div className="z-20 shrink-0 border-b border-black/[0.06] bg-zinc-100/95 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#09090B]/95">
//         <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
//           <div className="flex min-w-0 items-center gap-3">
//             <button
//               onClick={() => navigate("/agents")}
//               className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//             >
//               <ArrowLeft size={14} /> Back
//             </button>

//             <div className="min-w-0">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-semibold text-zinc-500">Agent name :</span>
//                 {isEditingName ? (
//                   <input
//                     autoFocus
//                     value={agentName}
//                     onChange={(e) => setAgentName(e.target.value)}
//                     onBlur={() => setIsEditingName(false)}
//                     onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
//                     className="bg-transparent text-sm font-semibold outline-none"
//                   />
//                 ) : (
//                   <span className="text-sm font-semibold">{agentName}</span>
//                 )}
//                 <HelpCircle size={13} className="text-zinc-400" />
//                 <button onClick={() => setIsEditingName(true)} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
//                   <Pencil size={13} />
//                 </button>
//               </div>
//               <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500">
//                 <span>ag01...5ec</span>
//                 <Copy size={11} />
//               </div>
//             </div>
//           </div>

//           <div className="flex shrink-0 flex-col items-end gap-1">
//             <div className="flex items-center gap-2">
//               <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
//               <button
//                 onClick={handleSaveAgent}
//                 disabled={isSaving}
//                 className="flex h-9 items-center rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-400 disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950"
//               >
//                 {isSaving ? "Saving..." : "Save"}
//               </button>
//             </div>
//             <div className="text-[10px]">
//               {saveError ? (
//                 <span className="text-red-500">{saveError}</span>
//               ) : saveMessage ? (
//                 <span className="text-emerald-500">{saveMessage}</span>
//               ) : (
//                 <span className="text-zinc-500">Auto saved at 16:08</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 3-COLUMN */}
//       <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden p-4 sm:p-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)_minmax(320px,0.85fr)]">
//         {/* LEFT */}
//         <div className="thin-scroll flex h-full min-h-0 flex-col gap-3 overflow-y-auto pr-2 pb-4">
//           <div className="flex flex-wrap items-center gap-2">
//             <div className="relative flex items-center gap-1">
//               <button
//                 onClick={() => setShowModelPicker((v) => !v)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span className="truncate">{model}</span>
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>
//               <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-400 dark:border-white/[0.08] dark:bg-[#101012]">
//                 <HelpCircle size={12} />
//               </button>
//               <button
//                 onClick={() => setShowProviderSettings((v) => !v)}
//                 className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
//                   showProviderSettings
//                     ? "border-cyan-500/50 bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400"
//                     : "border-black/[0.08] bg-white text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]"
//                 }`}
//               >
//                 <SlidersHorizontal size={12} />
//               </button>
//               {showModelPicker && (
//                 <ModelDropdown
//                   current={model}
//                   onSelect={(m) => { setModel(m); setShowModelPicker(false); }}
//                   onClose={() => setShowModelPicker(false)}
//                 />
//               )}
//               {showProviderSettings && (
//                 <AIProviderSettings
//                   model={providerModel}
//                   onModelChange={setProviderModel}
//                   advanced={providerAdvanced}
//                   onAdvancedChange={setProviderAdvanced}
//                   temperature={temperature}
//                   onTemperatureChange={setTemperature}
//                   onClose={() => setShowProviderSettings(false)}
//                 />
//               )}
//             </div>

//             <div className="relative flex items-center gap-1">
//               <button
//                 onClick={() => setShowVoicePicker(true)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-slate-900">
//                   {voice[0]}
//                 </span>
//                 <span>{voice}</span>
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>
//               <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-400 dark:border-white/[0.08] dark:bg-[#101012]">
//                 <HelpCircle size={12} />
//               </button>
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setShowMemoryMenu((v) => !v)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span>Memory</span>
//                 <HelpCircle size={11} className="text-zinc-400" />
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>
//               {showMemoryMenu && (
//                 <ToggleMenu
//                   onSelect={(v) => { setMemoryEnabled(v === "Enable"); setShowMemoryMenu(false); }}
//                   onClose={() => setShowMemoryMenu(false)}
//                   selected={memoryEnabled ? "Enable" : "Disable"}
//                 />
//               )}
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setShowEmotionMenu((v) => !v)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span>Emotion</span>
//                 <HelpCircle size={11} className="text-zinc-400" />
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>
//               {showEmotionMenu && (
//                 <ToggleMenu
//                   onSelect={(v) => { setEmotionEnabled(v === "Enable"); setShowEmotionMenu(false); }}
//                   onClose={() => setShowEmotionMenu(false)}
//                   selected={emotionEnabled ? "Enable" : "Disable"}
//                 />
//               )}
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => setShowAccentPanel((v) => !v)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span>Accent</span>
//                 <HelpCircle size={11} className="text-zinc-400" />
//                 <span className="text-zinc-500">{accent[0]}.</span>
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>
//               {showAccentPanel && (
//                 <AccentPanel
//                   current={accent}
//                   onSelect={setAccent}
//                   onClose={() => setShowAccentPanel(false)}
//                 />
//               )}
//             </div>
//           </div>

//           {/* Welcome Message */}
//           <div className="rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//             <button
//               onClick={() => setWelcomeOpen((v) => !v)}
//               className="flex w-full items-center justify-between px-4 py-3"
//             >
//               <div className="flex items-center gap-2">
//                 <MessageSquare size={12} className="text-zinc-500" />
//                 <span className="text-xs font-medium">Welcome Message</span>
//               </div>
//               {welcomeOpen ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
//             </button>
//             {welcomeOpen && (
//               <div className="border-t border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
//                 <select
//                   value={welcomeMode}
//                   onChange={(e) => setWelcomeMode(e.target.value)}
//                   className="h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//                 >
//                   <option>User speaks first</option>
//                   <option>Agent speaks first</option>
//                   <option>Silent</option>
//                 </select>
//                 <textarea
//                   value={welcomeMessage}
//                   onChange={(e) => setWelcomeMessage(e.target.value)}
//                   rows={3}
//                   disabled={welcomeMode === "Silent"}
//                   placeholder="Enter the welcome message..."
//                   className="mt-3 w-full resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-2.5 text-[12px] text-zinc-800 outline-none placeholder:text-zinc-400 disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//                 />
//               </div>
//             )}
//           </div>

//           {/* System Prompt */}
//           <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//             <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.06] px-4 py-2.5 dark:border-white/[0.06]">
//               <div className="flex items-center gap-2">
//                 <div className="flex items-center gap-1">
//                   <span className="h-2 w-2 rounded-full bg-red-400" />
//                   <span className="h-2 w-2 rounded-full bg-amber-400" />
//                   <span className="h-2 w-2 rounded-full bg-emerald-400" />
//                 </div>
//                 <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">System Prompt</span>
//                 <HelpCircle size={11} className="text-zinc-400" />
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowTimezonePicker((v) => !v)}
//                     className="flex items-center gap-1 rounded-md border border-black/[0.08] px-2 py-1 text-[10px] font-medium text-cyan-600 dark:border-white/[0.08] dark:text-cyan-400"
//                   >
//                     <Clock size={10} /> {timezone} <ChevronDown size={10} />
//                   </button>
//                   {showTimezonePicker && (
//                     <TimezonePicker
//                       current={timezone}
//                       onSelect={setTimezone}
//                       onClose={() => setShowTimezonePicker(false)}
//                     />
//                   )}
//                 </div>
//                 <span className="flex items-center gap-1 rounded-md border border-black/[0.08] px-2 py-1 text-[10px] text-zinc-600 dark:border-white/[0.08] dark:text-zinc-400">
//                   <span className="text-cyan-500">✱</span> ≈0 tokens
//                 </span>
//                 <span className="rounded-md border border-black/[0.08] px-2 py-1 text-[10px] text-zinc-600 dark:border-white/[0.08] dark:text-zinc-400">
//                   {"{var}"} for variables
//                 </span>
//               </div>
//             </div>
//             <textarea
//               value={systemPrompt}
//               onChange={(e) => setSystemPrompt(e.target.value)}
//               placeholder="Type in a universal prompt for your agent, such as its role, conversational style, objective, etc."
//               className="min-h-0 flex-1 resize-none bg-transparent px-4 py-3 text-[13px] leading-relaxed outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//             />
//           </div>
//         </div>

//         {/* MIDDLE — ALL SECTIONS COLLAPSED */}
//         <div className="thin-scroll h-full min-h-0 space-y-2.5 overflow-y-auto pr-2 pb-4">
//           {/* FUNCTIONS */}
//           <Section
//             icon={Braces}
//             title="Functions"
//             badge={String(functions.length)}
//             open={openSections.functions}
//             onToggle={() => toggleSection("functions")}
//           >
//             <div className="relative mb-3" ref={functionDropdownRef}>
//               <button
//                 type="button"
//                 onClick={() => setShowFunctionDropdown((v) => !v)}
//                 className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
//               >
//                 <Plus size={12} />
//                 Add Function
//                 <ChevronDown
//                   size={12}
//                   className={`transition-transform ${showFunctionDropdown ? "rotate-180" : ""}`}
//                 />
//               </button>

//               <AnimatePresence>
//                 {showFunctionDropdown && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -6, scale: 0.98 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: -4, scale: 0.98 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 28 }}
//                     className="absolute left-0 top-full z-50 mt-2 w-[320px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] dark:border-white/[0.08] dark:bg-[#161618]"
//                   >
//                     {FUNCTION_OPTIONS.map((option, index) => {
//                       const Icon = option.icon;
//                       return (
//                         <button
//                           key={option.id}
//                           type="button"
//                           onClick={() => handleSelectFunctionType(option.id)}
//                           className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition hover:bg-black/[0.03] dark:hover:bg-white/[0.04] ${
//                             index !== FUNCTION_OPTIONS.length - 1
//                               ? "border-b border-black/[0.05] dark:border-white/[0.05]"
//                               : ""
//                           }`}
//                         >
//                           <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-black/[0.02] dark:border-white/[0.08] dark:bg-white/[0.03]">
//                             <Icon size={15} className="text-zinc-600 dark:text-zinc-300" />
//                           </div>
//                           <div className="min-w-0 flex-1">
//                             <p className="text-[13.5px] font-semibold text-zinc-900 dark:text-zinc-100">
//                               {option.title}
//                             </p>
//                             <p className="mt-0.5 text-[12px] leading-snug text-zinc-500">
//                               {option.description}
//                             </p>
//                           </div>
//                         </button>
//                       );
//                     })}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <div className="mb-3 flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12]">
//               <Search size={13} className="shrink-0 text-zinc-500" />
//               <input
//                 type="text"
//                 value={functionSearch}
//                 onChange={(e) => setFunctionSearch(e.target.value)}
//                 placeholder="Search functions..."
//                 className="min-w-0 flex-1 bg-transparent text-[12px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//               />
//               {functionSearch && (
//                 <button
//                   type="button"
//                   onClick={() => setFunctionSearch("")}
//                   className="shrink-0 rounded-full p-0.5 text-zinc-400 transition hover:bg-black/[0.05] hover:text-zinc-600 dark:hover:bg-white/[0.08] dark:hover:text-zinc-300"
//                 >
//                   <X size={12} />
//                 </button>
//               )}
//             </div>

//             {functions.length === 0 ? (
//               <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center text-[12px] text-zinc-500 dark:border-white/[0.10]">
//                 No functions available yet.
//               </div>
//             ) : filteredFunctions.length === 0 ? (
//               <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center text-[12px] text-zinc-500 dark:border-white/[0.10]">
//                 No functions match "<span className="font-semibold text-zinc-700 dark:text-zinc-300">{functionSearch}</span>"
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 {filteredFunctions.map((fn) => (
//                   <div
//                     key={fn.id}
//                     className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
//                   >
//                     <div className="min-w-0">
//                       <p className="truncate text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
//                         {fn.name}
//                       </p>
//                       <p className="text-[10px] text-zinc-500">{fn.type}</p>
//                     </div>
//                     <button
//                       onClick={() => handleRemoveFunction(fn.id)}
//                       className="shrink-0 rounded-md p-1.5 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
//                     >
//                       <Trash2 size={13} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Section>

//           {/* CALENDARS */}
//           <Section
//             icon={Calendar}
//             title="Calendars"
//             open={openSections.calendars}
//             onToggle={() => toggleSection("calendars")}
//           >
//             <p className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//               <Globe size={12} className="text-zinc-500" />
//               Calendar Time Zone
//               <HelpCircle size={11} className="text-zinc-400" />
//             </p>
//             <select
//               value={calendarTimezone}
//               onChange={(e) => setCalendarTimezone(e.target.value)}
//               className="mb-3 h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//             >
//               <option value="UTC">UTC</option>
//               <option value="Asia/Kolkata">Asia/Kolkata</option>
//               <option value="America/New_York">America/New_York</option>
//               <option value="Europe/London">Europe/London</option>
//             </select>

//             <p className="mb-3 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
//               Select a calendar integration. Only one can be active at a time.
//             </p>

//             <div className="space-y-2">
//               <RadioOption
//                 label="GoHighLevel (GHL)"
//                 sub="GoHighLevel / Lead Connector calendar"
//                 name="calendar"
//                 value="ghl"
//                 selected={selectedCalendar}
//                 onSelect={setSelectedCalendar}
//               />
//               <RadioOption
//                 label="Cal.com"
//                 sub="Cal.com appointment scheduling"
//                 name="calendar"
//                 value="calcom"
//                 selected={selectedCalendar}
//                 onSelect={setSelectedCalendar}
//               />
//             </div>
//           </Section>

//           {/* CRM SYNC */}
//           <Section
//             icon={RefreshCw}
//             title="CRM Sync"
//             badge="Connect a CRM to sync leads"
//             open={openSections.crm}
//             onToggle={() => toggleSection("crm")}
//           >
//             <p className="mb-3 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
//               Pick the CRMs that should receive leads from this agent. With none
//               selected, leads sync to all connected CRMs.
//             </p>

//             <div className="space-y-2">
//               <ToggleRow
//                 label="Salesforce"
//                 sub="Sync leads to Salesforce"
//                 badge="NOT CONNECTED"
//                 value={salesforce}
//                 onChange={setSalesforce}
//               />
//               <ToggleRow
//                 label="GoHighLevel"
//                 sub="Sync leads to GoHighLevel / Lead Connector"
//                 badge="NOT CONNECTED"
//                 value={gohighlevel}
//                 onChange={setGohighlevel}
//               />
//             </div>
//           </Section>

//           {/* KNOWLEDGE BASE */}
//           <Section
//             icon={BookOpen}
//             title="Knowledge Base"
//             open={openSections.knowledge}
//             onToggle={() => toggleSection("knowledge")}
//           >
//             <p className="mb-3 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
//               Select a knowledge base for this agent
//             </p>

//             <div className="space-y-3 rounded-lg border border-black/[0.08] bg-white p-3 dark:border-white/[0.10] dark:bg-white/[0.02]">
//               <label className="block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">Select Knowledge Base</label>
//               {knowledgeBasesLoading ? (
//                 <p className="text-[12px] text-zinc-500">Loading knowledge bases...</p>
//               ) : knowledgeBases.length === 0 ? (
//                 <p className="text-[12px] text-zinc-500">No knowledge bases found. Create one first.</p>
//               ) : (
//                 <div className="max-h-48 space-y-2 overflow-y-auto">
//                   {knowledgeBases.map((kb) => (
//                     <label key={kb.id} className="flex cursor-pointer items-start gap-2 rounded-lg border border-black/[0.06] p-2.5 text-[12px] dark:border-white/[0.08]">
//                       <input
//                         type="checkbox"
//                         checked={selectedKnowledgeBaseIds.includes(kb.id)}
//                         onChange={(e) => setSelectedKnowledgeBaseIds((current) => e.target.checked ? [...current, kb.id] : current.filter((id) => id !== kb.id))}
//                         className="mt-0.5 accent-cyan-500"
//                       />
//                       <span className="min-w-0 flex-1">
//                         <span className="block font-medium text-zinc-800 dark:text-zinc-200">{kb.name}</span>
//                         <span className="block truncate text-zinc-500">{kb.description || "No description"}</span>
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//               <button
//                 type="button"
//                 onClick={handleAddKnowledgeBase}
//                 className="inline-flex items-center gap-2 rounded-lg border border-black/[0.10] bg-white px-3 py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.10] dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/[0.04]"
//               >
//                 <ExternalLink size={13} /> Manage Knowledge Bases
//               </button>
//             </div>
//           </Section>

//           {/* SPEECH SETTINGS */}
//           <Section
//             icon={Mic2}
//             title="Speech Settings"
//             open={openSections.speech}
//             onToggle={() => toggleSection("speech")}
//           >
//             <p className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//               Transcription Language
//               <HelpCircle size={11} className="text-zinc-400" />
//             </p>
//             <select
//               value={transcriptionLanguage}
//               onChange={(e) => setTranscriptionLanguage(e.target.value)}
//               className="mb-4 h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//             >
//               <option>Auto-detect (default)</option>
//               <option>English</option>
//               <option>Hindi</option>
//               <option>Spanish</option>
//             </select>

//             <p className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//               Background Sound
//               <HelpCircle size={11} className="text-zinc-400" />
//             </p>
//             <div className="mb-4 flex items-center gap-2">
//               <select
//                 value={backgroundSound}
//                 onChange={(e) => setBackgroundSound(e.target.value)}
//                 className="h-10 flex-1 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//               >
//                 <option>None</option>
//                 <option>Office</option>
//                 <option>Restaurant</option>
//                 <option>Cafe</option>
//                 <option>Street</option>
//               </select>
//               <button
//                 type="button"
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
//               >
//                 <SlidersHorizontal size={15} />
//               </button>
//             </div>

//             <div className="mb-4">
//               <div className="mb-2 flex items-center justify-between">
//                 <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//                   Interruption Sensitivity
//                   <HelpCircle size={11} className="text-zinc-400" />
//                 </span>
//                 <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
//                   {interruptionSensitivity.toFixed(1)}
//                 </span>
//               </div>
//               <input
//                 type="range" min={0} max={1} step={0.1}
//                 value={interruptionSensitivity}
//                 onChange={(e) => setInterruptionSensitivity(parseFloat(e.target.value))}
//                 className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
//                 style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${interruptionSensitivity * 100}%, rgb(228 228 231) ${interruptionSensitivity * 100}%, rgb(228 228 231) 100%)` }}
//               />
//             </div>

//             <div className="mb-4">
//               <div className="mb-2 flex items-center justify-between">
//                 <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//                   Speech Speed
//                   <HelpCircle size={11} className="text-zinc-400" />
//                 </span>
//                 <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
//                   {speechSpeed.toFixed(1)}
//                 </span>
//               </div>
//               <input
//                 type="range" min={0.5} max={2} step={0.1}
//                 value={speechSpeed}
//                 onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
//                 className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
//                 style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((speechSpeed - 0.5) / 1.5) * 100}%, rgb(228 228 231) ${((speechSpeed - 0.5) / 1.5) * 100}%, rgb(228 228 231) 100%)` }}
//               />
//             </div>

//             <div className="rounded-lg border border-black/[0.08] bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <div className="mb-1 flex items-start justify-between gap-2">
//                 <div>
//                   <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//                     Reminder Message Frequency
//                   </p>
//                   <p className="mt-0.5 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
//                     Control how often AI sends a reminder message.
//                   </p>
//                 </div>
//                 <HelpCircle size={12} className="mt-0.5 shrink-0 text-zinc-400" />
//               </div>

//               <div className="mt-4 flex items-center gap-3">
//                 <input
//                   type="number" min="0"
//                   value={reminderSeconds}
//                   onChange={(e) => setReminderSeconds(Number(e.target.value))}
//                   className="h-10 w-[80px] rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//                 />
//                 <span className="text-[12px] text-zinc-500 dark:text-zinc-400">seconds</span>

//                 <input
//                   type="number" min="0"
//                   value={reminderTimes}
//                   onChange={(e) => setReminderTimes(Number(e.target.value))}
//                   className="h-10 w-[70px] rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//                 />
//                 <span className="text-[12px] text-zinc-500 dark:text-zinc-400">times</span>
//               </div>

//               <p className="mb-2 mt-4 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//                 Reminder Message
//               </p>
//               <textarea
//                 value={reminderMessage}
//                 onChange={(e) => setReminderMessage(e.target.value)}
//                 placeholder="Enter reminder message..."
//                 rows={4}
//                 className="w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3 py-2.5 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500"
//               />
//             </div>
//           </Section>

//           {/* CALL SETTINGS */}
//           <Section
//             icon={Phone}
//             title="Call Settings"
//             open={openSections.call}
//             onToggle={() => toggleSection("call")}
//           >
//             <div className="mb-2 flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <div className="min-w-0 flex-1">
//                 <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//                   Voicemail detection
//                 </p>
//                 <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
//                   Detect and handle voicemail automatically.
//                 </p>
//               </div>
//               <HelpCircle size={12} className="shrink-0 text-zinc-400" />
//               <button
//                 type="button"
//                 onClick={() => setVoicemailDetection(!voicemailDetection)}
//                 className={`relative h-6 w-11 shrink-0 rounded-full transition ${voicemailDetection ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
//               >
//                 <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${voicemailDetection ? "translate-x-[22px]" : "translate-x-0.5"}`} />
//               </button>
//             </div>

//             <div className="mb-2 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <div className="flex items-center justify-between gap-3">
//                 <div className="min-w-0 flex-1">
//                   <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//                     End call on silence
//                   </p>
//                   <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
//                     End call when prolonged silence is detected.
//                   </p>
//                 </div>
//                 <HelpCircle size={12} className="shrink-0 text-zinc-400" />
//                 <button
//                   type="button"
//                   onClick={() => setEndOnSilence(!endOnSilence)}
//                   className={`relative h-6 w-11 shrink-0 rounded-full transition ${endOnSilence ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
//                 >
//                   <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${endOnSilence ? "translate-x-[22px]" : "translate-x-0.5"}`} />
//                 </button>
//               </div>

//               {endOnSilence && (
//                 <div className="mt-3 border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
//                   <div className="mb-2 flex items-center justify-between">
//                     <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//                       Silence timeout
//                       <HelpCircle size={11} className="text-zinc-400" />
//                     </span>
//                     <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
//                       {silenceTimeout} s
//                     </span>
//                   </div>
//                   <input
//                     type="range" min={5} max={30} step={1}
//                     value={silenceTimeout}
//                     onChange={(e) => setSilenceTimeout(Number(e.target.value))}
//                     className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
//                     style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((silenceTimeout - 5) / 25) * 100}%, rgb(228 228 231) ${((silenceTimeout - 5) / 25) * 100}%, rgb(228 228 231) 100%)` }}
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="mb-2 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <div className="mb-3 flex items-start justify-between gap-2">
//                 <div>
//                   <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//                     Max duration
//                   </p>
//                   <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
//                     Set a maximum call duration.
//                   </p>
//                 </div>
//                 <HelpCircle size={12} className="mt-0.5 shrink-0 text-zinc-400" />
//               </div>

//               <div className="mb-2 flex items-center justify-between">
//                 <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//                   Duration limit
//                   <HelpCircle size={11} className="text-zinc-400" />
//                 </span>
//                 <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
//                   {durationLimit} min
//                 </span>
//               </div>
//               <input
//                 type="range" min={5} max={60} step={1}
//                 value={durationLimit}
//                 onChange={(e) => setDurationLimit(Number(e.target.value))}
//                 className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
//                 style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((durationLimit - 5) / 55) * 100}%, rgb(228 228 231) ${((durationLimit - 5) / 55) * 100}%, rgb(228 228 231) 100%)` }}
//               />
//             </div>

//             <div className="mb-2 flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <div className="min-w-0 flex-1">
//                 <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//                   Emergency fallback
//                 </p>
//                 <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
//                   Transfer the call to a backup number on failure.
//                 </p>
//               </div>
//               <HelpCircle size={12} className="shrink-0 text-zinc-400" />
//               <button
//                 type="button"
//                 onClick={() => setEmergencyFallback(!emergencyFallback)}
//                 className={`relative h-6 w-11 shrink-0 rounded-full transition ${emergencyFallback ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
//               >
//                 <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${emergencyFallback ? "translate-x-[22px]" : "translate-x-0.5"}`} />
//               </button>
//             </div>

//             <div className="rounded-lg border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <button
//                 type="button"
//                 onClick={() => setAdvancedOpen((v) => !v)}
//                 className="flex w-full items-center justify-between gap-2 px-3.5 py-3"
//               >
//                 <span className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//                   Advanced
//                   <HelpCircle size={11} className="text-zinc-400" />
//                 </span>
//                 {advancedOpen ? <ChevronUp size={14} className="text-zinc-400" /> : <ChevronDown size={14} className="text-zinc-400" />}
//               </button>

//               {advancedOpen && (
//                 <div className="border-t border-black/[0.06] px-3.5 pb-3.5 pt-3 dark:border-white/[0.06]">
//                   <div className="mb-2 flex items-center justify-between">
//                     <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//                       Ring duration
//                     </span>
//                     <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300">
//                       {ringDuration} s
//                     </span>
//                   </div>
//                   <input
//                     type="range" min={5} max={60} step={1}
//                     value={ringDuration}
//                     onChange={(e) => setRingDuration(Number(e.target.value))}
//                     className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
//                     style={{ background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((ringDuration - 5) / 55) * 100}%, rgb(228 228 231) ${((ringDuration - 5) / 55) * 100}%, rgb(228 228 231) 100%)` }}
//                   />
//                 </div>
//               )}
//             </div>
//           </Section>

//           {/* POST-CALL DATA EXTRACTION */}
//           <Section
//             icon={BarChart3}
//             title="Post-Call Data Extraction"
//             open={openSections.postcall}
//             onToggle={() => toggleSection("postcall")}
//           >
//             <div className="rounded-lg border border-black/[0.08] bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <div className="flex items-start justify-between gap-3">
//                 <div className="min-w-0 flex-1">
//                   <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//                     Post Call Data Retrieval
//                   </p>
//                   <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
//                     Define the information you need to extract from the call.
//                   </p>
//                 </div>

//                 <div className="flex shrink-0 items-center gap-2">
//                   <button
//                     type="button"
//                     onClick={handleCopyExtraction}
//                     className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-600 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//                   >
//                     <ClipboardCopy size={12} />
//                     Copy
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handlePasteExtraction}
//                     className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-600 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//                   >
//                     <ClipboardPaste size={12} />
//                     Paste
//                   </button>
//                 </div>
//               </div>

//               {extractionFields.length === 0 ? (
//                 <p className="mt-4 text-[12px] text-zinc-500 dark:text-zinc-400">
//                   No fields yet. Add one below.
//                 </p>
//               ) : (
//                 <div className="mt-4 space-y-2">
//                   {extractionFields.map((field) => {
//                     const typeMeta = EXTRACTION_FIELD_TYPES.find((t) => t.id === field.type);
//                     const TypeIcon = typeMeta?.icon || Equal;
//                     return (
//                       <div
//                         key={field.id}
//                         className="flex items-center gap-2 rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
//                       >
//                         <TypeIcon size={13} className="shrink-0 text-zinc-500" />
//                         <input
//                           value={field.name}
//                           onChange={(e) =>
//                             setExtractionFields((prev) =>
//                               prev.map((f) => (f.id === field.id ? { ...f, name: e.target.value } : f))
//                             )
//                           }
//                           className="min-w-0 flex-1 bg-transparent text-[12px] text-zinc-800 outline-none dark:text-zinc-200"
//                         />
//                         <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
//                           {typeMeta?.label}
//                         </span>
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveExtractionField(field.id)}
//                           className="shrink-0 rounded-md p-1 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
//                         >
//                           <Trash2 size={12} />
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
//                 <div className="relative" ref={addFieldRef}>
//                   <button
//                     type="button"
//                     onClick={() => setShowAddFieldDropdown((v) => !v)}
//                     className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/[0.04]"
//                   >
//                     <Plus size={12} />
//                     Add
//                   </button>

//                   <AnimatePresence>
//                     {showAddFieldDropdown && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 6, scale: 0.98 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 4, scale: 0.98 }}
//                         transition={{ type: "spring", stiffness: 400, damping: 28 }}
//                         className="absolute bottom-full left-0 z-50 mb-2 w-[220px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:border-white/[0.08] dark:bg-[#161618] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
//                       >
//                         {EXTRACTION_FIELD_TYPES.map((type) => {
//                           const Icon = type.icon;
//                           return (
//                             <button
//                               key={type.id}
//                               type="button"
//                               onClick={() => handleAddExtractionField(type.id)}
//                               className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] text-zinc-700 transition hover:bg-black/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//                             >
//                               <Icon size={14} className="text-zinc-500" />
//                               {type.label}
//                             </button>
//                           );
//                         })}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <div className="relative" ref={extractionModelRef}>
//                   <button
//                     type="button"
//                     onClick={() => setShowExtractionModelDropdown((v) => !v)}
//                     className="flex items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/[0.04]"
//                   >
//                     <SlidersHorizontal size={12} className="text-zinc-500" />
//                     {extractionModel}
//                     <ChevronDown size={12} className="text-zinc-400" />
//                   </button>

//                   <AnimatePresence>
//                     {showExtractionModelDropdown && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 6, scale: 0.98 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 4, scale: 0.98 }}
//                         transition={{ type: "spring", stiffness: 400, damping: 28 }}
//                         className="absolute bottom-full right-0 z-50 mb-2 w-[200px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:border-white/[0.08] dark:bg-[#161618] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
//                       >
//                         {["GPT-4o mini", "GPT-4o", "GPT-4 turbo", "Claude 3.5 Sonnet"].map((m) => (
//                           <button
//                             key={m}
//                             type="button"
//                             onClick={() => {
//                               setExtractionModel(m);
//                               setShowExtractionModelDropdown(false);
//                             }}
//                             className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[13px] transition hover:bg-black/[0.03] dark:hover:bg-white/[0.04] ${
//                               extractionModel === m ? "font-semibold text-cyan-600 dark:text-cyan-400" : "text-zinc-700 dark:text-zinc-300"
//                             }`}
//                           >
//                             {m}
//                             {extractionModel === m && <Check size={13} className="text-cyan-500" />}
//                           </button>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>
//           </Section>

//           {/* WEBHOOK SETTINGS */}
//           <Section
//             icon={Webhook}
//             title="Webhook Settings"
//             open={openSections.webhook}
//             onToggle={() => toggleSection("webhook")}
//           >
//             <p className="mb-3 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
//               Add webhook URLs to receive event notifications when calls are completed.
//             </p>

//             <div className="rounded-lg border border-black/[0.08] bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <input
//                 type="text"
//                 value={webhookUrl}
//                 onChange={(e) => setWebhookUrl(e.target.value)}
//                 placeholder="Enter webhook URL"
//                 className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500"
//               />

//               <div className="mt-3 grid grid-cols-2 gap-3">
//                 <input
//                   type="text"
//                   value={webhookHeaderName}
//                   onChange={(e) => setWebhookHeaderName(e.target.value)}
//                   placeholder="Header name"
//                   className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500"
//                 />
//                 <input
//                   type="text"
//                   value={webhookHeaderValue}
//                   onChange={(e) => setWebhookHeaderValue(e.target.value)}
//                   placeholder="Header value"
//                   className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500"
//                 />
//               </div>

//               <div className="mt-3 flex items-center justify-between gap-3">
//                 <div className="flex items-center gap-2">
//                   <span className="text-[12px] text-zinc-600 dark:text-zinc-400">Retries</span>
//                   <input
//                     type="number"
//                     min="0"
//                     value={webhookRetries}
//                     onChange={(e) => setWebhookRetries(Number(e.target.value))}
//                     className="h-10 w-[80px] rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//                   />
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleAddWebhook}
//                   className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
//                 >
//                   <Plus size={13} />
//                   Add
//                 </button>
//               </div>
//             </div>

//             {webhooks.length === 0 ? (
//               <div className="mt-3 rounded-lg border border-dashed border-black/[0.12] px-4 py-5 text-center text-[12px] leading-relaxed text-zinc-500 dark:border-white/[0.10] dark:text-zinc-400">
//                 No webhooks added yet. Add a URL above to get started.
//               </div>
//             ) : (
//               <div className="mt-3 space-y-2">
//                 {webhooks.map((wh) => (
//                   <div
//                     key={wh.id}
//                     className="flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-black/[0.02] px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
//                   >
//                     <div className="min-w-0 flex-1">
//                       <p className="truncate text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
//                         {wh.url}
//                       </p>
//                       <p className="mt-0.5 text-[10px] text-zinc-500">
//                         {Object.keys(wh.headers).length > 0 && `${Object.keys(wh.headers).length} header(s) · `}
//                         Retries: {wh.retries}
//                       </p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveWebhook(wh.id)}
//                       className="shrink-0 rounded-md p-1.5 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-500"
//                     >
//                       <Trash2 size={13} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Section>
//         </div>

//         {/* RIGHT */}
//         <div className="thin-scroll h-full min-h-0 overflow-y-auto rounded-xl border border-black/[0.06] bg-white pb-4 dark:border-white/[0.08] dark:bg-[#101012]">
//           <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
//             <div className="flex items-center gap-2">
//               <Mic size={13} className="text-cyan-500" />
//               <span className="text-xs font-semibold">Test Agent</span>
//             </div>
//           </div>
//           <div className="flex flex-col items-center px-5 py-10 text-center">
//             <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/[0.03]">
//               <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/[0.08]">
//                 <Mic size={22} className="text-cyan-500" />
//               </div>
//             </div>
//             <h4 className="mt-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Test your agent</h4>
//             <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
//               Run a live call to test your agent's voice, prompt, and functions.
//             </p>

//             <div className="mt-5 flex w-full items-start gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] px-3 py-2.5 text-left">
//               <HelpCircle size={12} className="mt-0.5 shrink-0 text-cyan-500 dark:text-cyan-400" />
//               <p className="text-[11px] leading-relaxed text-cyan-700 dark:text-cyan-300">
//                 Please note memory is not supported in Webcall.
//               </p>
//             </div>

//             <button className="mt-5 flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950">
//               <Mic size={13} /> Start Test
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MODALS */}
//       {activeModal === "end_call" && (
//         <EndCallModal onClose={() => setActiveModal(null)} onAddFunction={handleAddFunction} />
//       )}
//       {activeModal === "transfer_call" && (
//         <TransferCallModal onClose={() => setActiveModal(null)} onAddFunction={handleAddFunction} />
//       )}
//       {activeModal === "press_digit" && (
//         <IVRModal onClose={() => setActiveModal(null)} onAddFunction={handleAddFunction} />
//       )}
//       {activeModal === "custom_function" && (
//         <CustomFunctionModal onClose={() => setActiveModal(null)} onAddFunction={handleAddFunction} />
//       )}

//       {showVoicePicker && (
//         <VoicePickerModal
//           current={voice}
//           onClose={() => setShowVoicePicker(false)}
//           onSelect={(v) => { setVoice(v); setShowVoicePicker(false); }}
//         />
//       )}
//     </div>
//   );
// }

// // ============================================================
// // MODAL COMPONENTS
// // ============================================================

// function EndCallModal({ onClose, onAddFunction }) {
//   const [name, setName] = useState("end_call");
//   const [description, setDescription] = useState("");
//   const [executionMessage, setExecutionMessage] = useState("");

//   const handleAddFunction = () => {
//     if (!name.trim()) return toast.error("Please enter a function name.");
//     if (!description.trim()) return toast.error("Please enter a description.");

//     onAddFunction({
//       id: `fn-${Date.now()}`,
//       name: name.trim(),
//       type: "end_call",
//       description: description.trim(),
//       execution_message: executionMessage.trim(),
//       enabled: true,
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
//       <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#18181b] shadow-2xl">
//         <div className="flex items-start justify-between px-5 py-4">
//           <div>
//             <h2 className="text-[18px] font-semibold text-zinc-100">End Call</h2>
//             <p className="mt-1 text-[12px] text-zinc-400">Define when the agent should end the call.</p>
//           </div>
//           <button onClick={onClose} className="text-xl text-zinc-500 hover:text-zinc-200">×</button>
//         </div>
//         <div className="px-5 pb-5">
//           <div className="mb-4">
//             <label className="mb-2 block text-[12px] font-semibold text-zinc-300">Name <span className="text-red-400">*</span></label>
//             <input value={name} onChange={(e) => setName(e.target.value)} className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0f0f11] px-3 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50" />
//           </div>
//           <div className="mb-4">
//             <label className="mb-2 block text-[12px] font-semibold text-zinc-300">Description <span className="text-red-400">*</span></label>
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe when the assistant should call this function." className="min-h-[106px] w-full resize-none rounded-lg border border-white/[0.10] bg-[#0f0f11] px-3 py-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
//           </div>
//           <div>
//             <label className="mb-2 block text-[12px] font-semibold text-zinc-300">Execution Message</label>
//             <input value={executionMessage} onChange={(e) => setExecutionMessage(e.target.value)} placeholder="Message spoken while this function executes" className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0f0f11] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
//           </div>
//         </div>
//         <div className="flex justify-end gap-2 border-t border-white/[0.08] px-5 py-3.5">
//           <button onClick={onClose} className="rounded-lg px-4 py-2 text-[13px] font-medium text-zinc-400 hover:bg-white/[0.05]">Cancel</button>
//           <button onClick={handleAddFunction} className="rounded-lg bg-cyan-500 px-4 py-2 text-[13px] font-semibold text-slate-950 hover:bg-cyan-400">Add Function</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function TransferCallModal({ onClose, onAddFunction }) {
//   const [name, setName] = useState("transfer_call");
//   const [description, setDescription] = useState("Transfer the call to a human agent");
//   const [executionMessage, setExecutionMessage] = useState("");
//   const [transferMode, setTransferMode] = useState("cold");
//   const [transferTo, setTransferTo] = useState("static");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
//   const [prompt, setPrompt] = useState("");
//   const [onHoldMusic, setOnHoldMusic] = useState(true);

//   const handleSave = () => {
//     if (!name.trim()) return toast.error("Please enter a function name.");
//     if (transferTo === "static") {
//       if (!phoneNumber.trim()) return toast.error("Please enter a phone number.");
//       if (!/^\d{10}$/.test(phoneNumber)) return toast.error("Phone must be 10 digits.");
//     }
//     if (transferTo === "dynamic" && !prompt.trim()) return toast.error("Please enter a prompt.");

//     onAddFunction({
//       id: `fn-${Date.now()}`,
//       name: name.trim(),
//       type: "transfer_call",
//       description: description.trim(),
//       execution_message: executionMessage.trim(),
//       transfer_mode: transferMode,
//       transfer_to: transferTo,
//       phone_number: transferTo === "static" ? `${selectedCountry.code}${phoneNumber}` : null,
//       prompt: transferTo === "dynamic" ? prompt.trim() : null,
//       on_hold_music: onHoldMusic,
//       enabled: true,
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
//       <div className="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012] shadow-2xl">
//         <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
//           <h2 className="text-[18px] font-semibold text-zinc-100">Transfer Call</h2>
//           <button onClick={onClose} className="text-xl text-zinc-500 hover:text-zinc-200">×</button>
//         </div>

//         <div className="thin-scroll flex-1 overflow-y-auto p-6 space-y-4">
//           <div className="grid grid-cols-[1fr_auto] items-end gap-4">
//             <div>
//               <label className="mb-2 block text-[12px] font-medium text-zinc-300">Name <span className="text-red-400">*</span></label>
//               <input value={name} onChange={(e) => setName(e.target.value)} className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none" />
//             </div>
//             <label className="mb-2 flex items-center gap-2 text-[13px] text-zinc-300">
//               <input type="checkbox" checked={onHoldMusic} onChange={(e) => setOnHoldMusic(e.target.checked)} className="h-4 w-4 accent-cyan-500" />
//               On Hold Music
//             </label>
//           </div>

//           <div>
//             <label className="mb-2 block text-[12px] font-medium text-zinc-300">Description</label>
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-2.5 text-[13px] text-zinc-200 outline-none" />
//           </div>

//           <div>
//             <label className="mb-2 block text-[12px] font-medium text-zinc-300">Transfer Mode</label>
//             <div className="inline-flex rounded-lg border border-white/[0.08] bg-[#0b0b0d] p-0.5">
//               {["cold", "warm"].map((m) => (
//                 <button key={m} onClick={() => setTransferMode(m)} className={`rounded-md px-4 py-2 text-[12px] font-semibold capitalize ${transferMode === m ? "bg-[#252529] text-zinc-100" : "text-zinc-500"}`}>
//                   {m} Transfer
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="mb-2 block text-[12px] font-medium text-zinc-300">Transfer To</label>
//             <div className="mb-3 inline-flex rounded-lg border border-white/[0.08] bg-[#0b0b0d] p-0.5">
//               {["static", "dynamic"].map((t) => (
//                 <button key={t} onClick={() => setTransferTo(t)} className={`rounded-md px-4 py-2 text-[12px] font-semibold capitalize ${transferTo === t ? "bg-[#252529] text-zinc-100" : "text-zinc-500"}`}>
//                   {t}
//                 </button>
//               ))}
//             </div>

//             {transferTo === "static" ? (
//               <div className="flex h-10 overflow-hidden rounded-lg border border-white/[0.10] bg-[#0b0b0d]">
//                 <select value={selectedCountry.iso} onChange={(e) => setSelectedCountry(COUNTRIES.find(c => c.iso === e.target.value))} className="w-[125px] shrink-0 border-r border-white/[0.08] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none">
//                   {COUNTRIES.map((c) => (<option key={c.iso} value={c.iso}>{c.iso} {c.code}</option>))}
//                 </select>
//                 <input type="tel" value={phoneNumber} maxLength={10} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Enter destination number" className="min-w-0 flex-1 bg-transparent px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600" />
//               </div>
//             ) : (
//               <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask the user which number to transfer to" rows={4} className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-2.5 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600" />
//             )}
//           </div>
//         </div>

//         <div className="flex justify-end gap-2 border-t border-white/[0.08] px-6 py-3.5">
//           <button onClick={onClose} className="rounded-lg border border-white/[0.08] px-4 py-2 text-[13px] text-zinc-400">Cancel</button>
//           <button onClick={handleSave} className="rounded-lg bg-cyan-500 px-5 py-2 text-[13px] font-semibold text-slate-950">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function IVRModal({ onClose, onAddFunction }) {
//   const [name, setName] = useState("press_digit");
//   const [description, setDescription] = useState("Press a digit to navigate the IVR menu");
//   const [pauseDetectionDelay, setPauseDetectionDelay] = useState(1000);

//   const handleAddFunction = () => {
//     if (!name.trim()) return toast.error("Please enter a function name.");

//     onAddFunction({
//       id: `fn-${Date.now()}`,
//       name: name.trim(),
//       type: "press_digit",
//       description: description.trim(),
//       pause_detection_delay: pauseDetectionDelay,
//       enabled: true,
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
//       <div className="w-full max-w-[560px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#18181b] shadow-2xl">
//         <div className="flex items-start justify-between px-5 pt-5">
//           <div>
//             <h2 className="text-[18px] font-semibold text-zinc-100">IVR / Press Digit</h2>
//             <p className="mt-1 text-[13px] text-zinc-400">Configure the digit-press IVR navigation function.</p>
//           </div>
//           <button onClick={onClose} className="text-lg text-zinc-500 hover:text-zinc-200">×</button>
//         </div>
//         <div className="px-5 py-5">
//           <div className="mb-4">
//             <label className="mb-2 block text-[12px] font-medium text-zinc-300">Name <span className="text-red-400">*</span></label>
//             <input value={name} onChange={(e) => setName(e.target.value)} className="h-11 w-full rounded-lg border border-white/[0.10] bg-[#0d0d0f] px-3 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50" />
//           </div>
//           <div className="mb-5">
//             <label className="mb-2 block text-[12px] font-medium text-zinc-300">Description</label>
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0d0d0f] px-3 py-2.5 text-[13px] text-zinc-200 outline-none" />
//           </div>
//           <div className="rounded-lg border border-white/[0.08] bg-[#1b1b1e] p-4">
//             <p className="mb-4 text-[12px] font-semibold uppercase tracking-wide text-zinc-400">Press Digit Config</p>
//             <label className="mb-2 block text-[12px] font-medium text-zinc-300">Pause Detection Delay (ms)</label>
//             <input type="number" min="0" value={pauseDetectionDelay} onChange={(e) => setPauseDetectionDelay(Number(e.target.value))} className="h-11 w-full rounded-lg border border-white/[0.10] bg-[#0d0d0f] px-3 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50" />
//             <p className="mt-2 text-[11px] text-zinc-500">How long the agent waits after speaking before pressing a digit. Default: 1000ms.</p>
//           </div>
//         </div>
//         <div className="flex justify-end gap-2 border-t border-white/[0.08] px-5 py-4">
//           <button onClick={onClose} className="rounded-lg border border-white/[0.08] px-4 py-2 text-[13px] text-zinc-400">Cancel</button>
//           <button onClick={handleAddFunction} className="rounded-lg bg-cyan-400 px-5 py-2 text-[13px] font-semibold text-slate-950">Add Function</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CustomFunctionModal({ onClose, onAddFunction }) {
//   const [functionType, setFunctionType] = useState("custom");
//   const [method, setMethod] = useState("POST");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [url, setUrl] = useState("");

//   const handleSave = () => {
//     if (!name.trim()) return toast.error("Please enter the function name.");
//     if (!description.trim()) return toast.error("Please enter the description.");
//     if (functionType === "custom" && !url.trim()) return toast.error("Please enter the API URL.");

//     onAddFunction({
//       id: `fn-${Date.now()}`,
//       name: name.trim(),
//       type: functionType,
//       description: description.trim(),
//       url: functionType === "custom" ? url.trim() : null,
//       method: functionType === "custom" ? method : null,
//       enabled: true,
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
//       <div className="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012] shadow-2xl">
//         <div className="flex items-start justify-between border-b border-white/[0.08] px-6 py-5">
//           <div>
//             <h2 className="text-[19px] font-semibold text-zinc-100">
//               {functionType === "custom" ? "Custom Function" : "Client Function"}
//             </h2>
//             <p className="mt-1 text-[12px] text-zinc-500">Configure endpoint details and execution options.</p>
//           </div>
//           <button onClick={onClose} className="text-xl text-zinc-500 hover:text-zinc-200">×</button>
//         </div>

//         <div className="thin-scroll flex-1 overflow-y-auto p-6 space-y-4">
//           <div className="flex gap-2">
//             <button onClick={() => setFunctionType("custom")} className={`rounded-lg border px-4 py-2 text-[12px] font-semibold ${functionType === "custom" ? "border-cyan-400 bg-cyan-400 text-slate-950" : "border-white/[0.10] text-zinc-400"}`}>Custom</button>
//             <button onClick={() => setFunctionType("client")} className={`rounded-lg border px-4 py-2 text-[12px] font-semibold ${functionType === "client" ? "border-cyan-400 bg-cyan-400 text-slate-950" : "border-white/[0.10] text-zinc-400"}`}>Client Function</button>
//           </div>

//           <div>
//             <label className="mb-2 block text-[12px] font-medium text-zinc-300">Name</label>
//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter function name" className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
//           </div>

//           <div>
//             <label className="mb-2 block text-[12px] font-medium text-zinc-300">Description</label>
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe what this function does" className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
//           </div>

//           {functionType === "custom" && (
//             <div>
//               <label className="mb-2 block text-[12px] font-medium text-zinc-300">API Endpoint</label>
//               <div className="flex gap-2">
//                 <select value={method} onChange={(e) => setMethod(e.target.value)} className="h-10 w-[150px] rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none">
//                   <option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option>
//                 </select>
//                 <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/endpoint" className="h-10 flex-1 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50" />
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end gap-2 border-t border-white/[0.08] px-6 py-3.5">
//           <button onClick={onClose} className="rounded-lg border border-white/[0.08] px-5 py-2 text-[13px] text-zinc-400">Cancel</button>
//           <button onClick={handleSave} className="rounded-lg bg-cyan-500 px-6 py-2 text-[13px] font-semibold text-slate-950 hover:bg-cyan-400">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // SMALL UI COMPONENTS
// // ============================================================

// function AIProviderSettings({ model, onModelChange, temperature, onTemperatureChange, onClose }) {
//   const ref = useRef(null);
//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onClose]);

//   return (
//     <div ref={ref} className="absolute left-0 top-full z-50 mt-1 w-[400px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
//       <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
//         <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">AI Provider Settings</h3>
//         <p className="mt-0.5 text-[11px] text-zinc-500">Configure model and response behavior.</p>
//       </div>
//       <div className="space-y-4 p-4">
//         <div>
//           <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">Model</label>
//           <select value={model} onChange={(e) => onModelChange(e.target.value)} className="h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
//             <option>Agni Premium Lite — 0.7 credits/min</option>
//             <option>Agni Duplex — 1 credits/min</option>
//             <option>Agni 5.0 Lite — 0.5 credits/min</option>
//           </select>
//         </div>
//         <div>
//           <label className="mb-2 flex items-center justify-between text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//             Temperature <span className="text-[11px] font-semibold">{temperature.toFixed(1)}</span>
//           </label>
//           <input type="range" min={0} max={1} step={0.1} value={temperature} onChange={(e) => onTemperatureChange(parseFloat(e.target.value))} className="h-1.5 w-full accent-cyan-500" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ToggleMenu({ selected, onSelect, onClose }) {
//   const ref = useRef(null);
//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onClose]);

//   return (
//     <div ref={ref} className="absolute left-0 top-full z-50 mt-1 w-[180px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
//       {["Enable", "Disable"].map((option) => (
//         <button key={option} onClick={() => onSelect(option)} className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] ${selected === option ? "bg-cyan-500/[0.08] font-semibold text-cyan-600 dark:text-cyan-400" : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"}`}>
//           <Check size={13} className={selected === option ? "text-cyan-500 dark:text-cyan-400" : "text-transparent"} />
//           {option}
//         </button>
//       ))}
//     </div>
//   );
// }

// function TimezonePicker({ current, onSelect, onClose }) {
//   const ref = useRef(null);
//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onClose]);

//   return (
//     <div ref={ref} className="absolute right-0 top-full z-50 mt-1 max-h-[280px] w-[240px] overflow-y-auto rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
//       {TIMEZONES.map((tz) => (
//         <button key={tz} onClick={() => { onSelect(tz); onClose(); }} className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] ${current === tz ? "bg-cyan-500/[0.08] font-semibold text-cyan-600 dark:text-cyan-400" : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"}`}>
//           {current === tz && <Check size={11} className="text-cyan-500" />}
//           {tz}
//         </button>
//       ))}
//     </div>
//   );
// }

// function AccentPanel({ current, onSelect, onClose }) {
//   const ref = useRef(null);
//   const [country, setCountry] = useState(current || "India");
//   const [selected, setSelected] = useState([]);

//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onClose]);

//   const sections = ACCENT_LANGUAGES[country] || [];

//   return (
//     <div ref={ref} className="absolute left-0 top-full z-50 mt-1 max-h-[400px] w-[340px] overflow-y-auto rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
//       <div className="border-b border-black/[0.06] p-3 dark:border-white/[0.06]">
//         <div className="flex flex-wrap gap-1">
//           {ACCENT_COUNTRIES.map((c) => (
//             <button key={c} onClick={() => { setCountry(c); onSelect(c); setSelected([]); }} className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium ${country === c ? "bg-cyan-500 text-white" : "bg-black/[0.04] text-zinc-600 dark:bg-white/[0.05] dark:text-zinc-400"}`}>
//               {c}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="p-3">
//         {sections.map((group) => (
//           <div key={group.section} className="mb-3">
//             <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{group.section}</p>
//             <div className="space-y-1">
//               {group.items.map((lang) => {
//                 const isChecked = selected.includes(lang);
//                 return (
//                   <button key={lang} onClick={() => setSelected((prev) => isChecked ? prev.filter((l) => l !== lang) : [...prev, lang])} className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-[12px] ${isChecked ? "border-cyan-500/40 bg-cyan-500/[0.04] text-cyan-600 dark:text-cyan-400" : "border-black/[0.06] text-zinc-700 dark:border-white/[0.08] dark:text-zinc-300"}`}>
//                     <span className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${isChecked ? "border-cyan-500 bg-cyan-500" : "border-zinc-300 dark:border-zinc-600"}`}>
//                       {isChecked && <Check size={9} className="text-white" strokeWidth={3} />}
//                     </span>
//                     {lang}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ModelDropdown({ current, onSelect, onClose }) {
//   const ref = useRef(null);
//   useEffect(() => {
//     const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onClose]);

//   return (
//     <div ref={ref} className="absolute left-0 top-full z-50 mt-1 w-[280px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
//       <div className="max-h-[320px] overflow-y-auto py-1">
//         {MODELS.map((m) => (
//           <button key={m.name} onClick={() => onSelect(m.name)} className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[13px] ${current === m.name ? "bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400" : "text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"}`}>
//             <span className="flex items-center gap-2">
//               {current === m.name && <Check size={13} className="text-cyan-500" />}
//               <span className={current === m.name ? "font-semibold" : "font-medium"}>{m.name}</span>
//             </span>
//             <span className="text-[11px] text-zinc-400">{m.credits}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// function VoicePickerModal({ current, onClose, onSelect }) {
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("All");
//   const filtered = VOICES.filter((v) => {
//     const matchesQuery = v.name.toLowerCase().includes(query.toLowerCase());
//     const matchesFilter = filter === "All" || v.gender === filter;
//     return matchesQuery && matchesFilter;
//   });

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
//         <div className="flex items-start justify-between border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
//           <div>
//             <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Choose a Voice</h3>
//             <p className="mt-1 text-xs text-zinc-500">{VOICES.length} voices available</p>
//           </div>
//           <button onClick={onClose} className="rounded-md p-1 text-zinc-500">✕</button>
//         </div>
//         <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
//           <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12]">
//             <Search size={14} className="text-zinc-400" />
//             <input type="text" placeholder="Search voices..." value={query} onChange={(e) => setQuery(e.target.value)} className="min-w-0 flex-1 bg-transparent text-[13px] outline-none" />
//           </div>
//           <div className="flex rounded-lg border border-black/[0.08] p-1 dark:border-white/[0.08]">
//             {["All", "Female", "Male"].map((f) => (
//               <button key={f} onClick={() => setFilter(f)} className={`rounded-md px-3 py-1 text-xs font-medium ${filter === f ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300" : "text-zinc-500"}`}>
//                 {f}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {filtered.map((v) => (
//               <div key={v.name} className={`flex flex-col gap-3 rounded-xl border p-4 ${current === v.name ? "border-cyan-500/50 bg-cyan-500/[0.04]" : "border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]"}`}>
//                 <div className="flex items-center gap-3">
//                   <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${v.color} text-[12px] font-bold text-white`}>
//                     {v.name[0]}
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{v.name}</p>
//                     <p className="text-[11px] text-zinc-500">{v.gender}</p>
//                   </div>
//                 </div>
//                 <button onClick={() => onSelect(v.name)} className="flex items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white py-2 text-[12px] font-medium dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300">
//                   <Play size={11} /> Select
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Section({ icon: Icon, title, badge, open, onToggle, children }) {
//   return (
//     <div className="relative overflow-visible rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//       <button onClick={onToggle} className="flex w-full items-center gap-3 rounded-t-xl px-4 py-3.5 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
//         <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/[0.04] dark:bg-white/[0.05]">
//           <Icon size={14} className="text-zinc-600 dark:text-zinc-400" />
//         </div>
//         <div className="min-w-0 flex-1">
//           <div className="flex items-center gap-2">
//             <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">{title}</span>
//             {badge && (
//               <span className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
//                 {badge}
//               </span>
//             )}
//           </div>
//         </div>
//         <HelpCircle size={12} className="shrink-0 text-zinc-400" />
//         {open ? <ChevronUp size={14} className="shrink-0 text-zinc-400" /> : <ChevronDown size={14} className="shrink-0 text-zinc-400" />}
//       </button>
//       {open && (
//         <div className="rounded-b-xl border-t border-black/[0.06] px-4 py-4 dark:border-white/[0.06]">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// function RadioOption({ label, sub, name, value, selected, onSelect }) {
//   const isSelected = selected === value;
//   return (
//     <label
//       className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition ${
//         isSelected
//           ? "border-cyan-500/40 bg-cyan-500/[0.03] dark:border-cyan-500/40 dark:bg-cyan-500/[0.05]"
//           : "border-black/[0.06] bg-white hover:border-black/[0.12] dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-white/[0.14]"
//       }`}
//     >
//       <input
//         type="radio"
//         name={name}
//         value={value}
//         checked={isSelected}
//         onChange={() => onSelect(value)}
//         className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-cyan-500"
//       />
//       <div className="min-w-0 flex-1">
//         <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//           {label}
//         </p>
//         <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
//           {sub}
//         </p>
//       </div>
//     </label>
//   );
// }

// function ToggleRow({ label, sub, badge, value, onChange }) {
//   return (
//     <div className="flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
//       <div className="min-w-0 flex-1">
//         <div className="flex flex-wrap items-center gap-2">
//           <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//             {label}
//           </p>
//           {badge && (
//             <span className="rounded bg-black/[0.05] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-500 dark:bg-white/[0.08] dark:text-zinc-400">
//               {badge}
//             </span>
//           )}
//         </div>
//         <p className="mt-0.5 text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
//           {sub}
//         </p>
//       </div>

//       <button
//         type="button"
//         onClick={() => onChange(!value)}
//         className={`relative h-6 w-11 shrink-0 rounded-full transition ${
//           value ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-600"
//         }`}
//       >
//         <span
//           className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
//             value ? "translate-x-[22px]" : "translate-x-0.5"
//           }`}
//         />
//       </button>
//     </div>
//   );
// }

// function SliderRow({ label, value, min, max, step, display, onChange }) {
//   return (
//     <div className="mb-3">
//       <div className="mb-2 flex items-center justify-between">
//         <span className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//           {label}
//         </span>
//         <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">{display}</span>
//       </div>
//       <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800" />
//     </div>
//   );
// }




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

const DEFAULT_VOICE_COLORS = [
  "from-rose-400 to-pink-500", "from-orange-400 to-red-500",
  "from-blue-400 to-indigo-500", "from-emerald-400 to-teal-500",
  "from-purple-400 to-pink-500", "from-amber-400 to-orange-500",
];

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
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! Welcome to our customer support. How can I help you today?");
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [knowledgeBasesLoading, setKnowledgeBasesLoading] = useState(false);
  const [selectedKnowledgeBaseIds, setSelectedKnowledgeBaseIds] = useState([]);
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || "e28286da-9abd-4882-babb-696dd40e5635";
  const [isEditingName, setIsEditingName] = useState(false);
  const [functionSearch, setFunctionSearch] = useState("");

  const [model, setModel] = useState("Agni Premium Lite");
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showProviderSettings, setShowProviderSettings] = useState(false);
  const [providerModel, setProviderModel] = useState("Agni Premium Lite");
  const [providerAdvanced, setProviderAdvanced] = useState("Advanced");
  const [temperature, setTemperature] = useState(0.7);

  const [voice, setVoice] = useState("aarav");
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const [catalog, setCatalog] = useState({ languages: [], accents: [], voices: [] });
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const [memoryEnabled, setMemoryEnabled] = useState(false);
  const [showMemoryMenu, setShowMemoryMenu] = useState(false);
  const [emotionEnabled, setEmotionEnabled] = useState(false);
  const [showEmotionMenu, setShowEmotionMenu] = useState(false);

  const [accent, setAccent] = useState("indian");
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

  useEffect(() => {
    let cancelled = false;
    const loadCatalog = async () => {
      setCatalogLoading(true);
      setCatalogError("");
      try {
        const token = localStorage.getItem("access_token") || localStorage.getItem("accessToken");
        const response = await axios.get(`${config.BASE_URL}/catalog`, {
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = response.data || {};
        const nextCatalog = {
          languages: Array.isArray(data.languages) ? data.languages : [],
          accents: Array.isArray(data.accents) ? data.accents : [],
          voices: Array.isArray(data.voices) ? data.voices : [],
        };
        if (!cancelled) {
          setCatalog(nextCatalog);
          if (nextCatalog.languages.length) {
            setSelectedLanguage((current) => nextCatalog.languages.some((item) => item.id === current) ? current : nextCatalog.languages[0].id);
          }
          if (nextCatalog.accents.length) {
            setAccent((current) => nextCatalog.accents.some((item) => item.id === current) ? current : nextCatalog.accents[0].id);
          }
          if (nextCatalog.voices.length) {
            setVoice((current) => nextCatalog.voices.some((item) => item.id === current) ? current : nextCatalog.voices[0].id);
          }
        }
      } catch (error) {
        const responseData = error?.response?.data;
        console.error("Failed to load catalog:", responseData || error);
        const detail = responseData?.detail;
        const message = Array.isArray(detail)
          ? detail.map((item) => {
              const field = Array.isArray(item?.loc) ? item.loc.slice(1).join(".") : "Field";
              return `${field}: ${item?.msg || "Invalid value"}`;
            }).filter(Boolean).join("; ")
          : typeof detail === "string"
            ? detail
            : typeof responseData?.message === "string"
              ? responseData.message
              : "Unable to load languages, accents and voices.";
        if (!cancelled) setCatalogError(message);
      } finally {
        if (!cancelled) setCatalogLoading(false);
      }
    };
    loadCatalog();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadKnowledgeBases = async () => {
      const token = localStorage.getItem("access_token");
      setKnowledgeBasesLoading(true);
      try {
        const response = await axios.get(`${config.BASE_URL}/knowledge-bases`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const items = Array.isArray(response.data?.items) ? response.data.items : [];
        if (!cancelled) setKnowledgeBases(items);
      } catch (error) {
        console.error("Failed to load knowledge bases:", error);
        if (!cancelled) setKnowledgeBases([]);
      } finally {
        if (!cancelled) setKnowledgeBasesLoading(false);
      }
    };
    loadKnowledgeBases();
    return () => { cancelled = true; };
  }, []);

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
      const voiceMeta = catalog.voices.find((item) => item.id === voice);
      const selectedAccent = catalog.accents.find((item) => item.id === accent);
      const selectedLanguageMeta = catalog.languages.find((item) => item.id === selectedLanguage);
      const selectedModel = MODELS.find((item) => item.name === model) || MODELS[0];
      const voiceLanguages = voiceMeta?.languages || [selectedLanguage];
      const selectedCalendarIds = selectedCalendar && !["ghl", "calcom"].includes(selectedCalendar)
        ? [selectedCalendar]
        : [];
      const crmProvider = salesforce ? "salesforce" : gohighlevel ? "gohighlevel" : null;
      const payload = {
        name: trimmedName,
        status: "active",
        client_id: CLIENT_ID,
        timezone,
        model: {
          id: model === "Agni Premium Lite" ? "agni-premium-lite" : model.toLowerCase().replaceAll(" ", "-"),
          name: model,
          gender: "female",
        },
        voice: {
          id: voiceMeta?.id || voice,
          name: voiceMeta?.name || voice,
          gender: (voiceMeta?.gender || "unknown").toLowerCase(),
        },
        memory: { enabled: memoryEnabled },
        emotion: { enabled: emotionEnabled },
        accent: {
          country: selectedAccent?.label || accent,
          language: selectedLanguageMeta?.label || "English",
          languages: (selectedAccent?.languages || []).map((id) => catalog.languages.find((item) => item.id === id)?.label || id),
        },
        welcome_message: {
          enabled: welcomeMode !== "Silent",
          message: welcomeMessage,
        },
        system_prompt: {
          role: "customer_support",
          instruction: systemPrompt,
          behavior: "Be polite, clear and concise.",
        },
        functions: functions.map(({ id, ...fn }) => ({
          type: fn.type === "custom_function" ? "custom" : fn.type,
          name: fn.name,
          description: fn.description || "",
          enabled: fn.enabled !== false,
          configuration: {
            ...(fn.url ? { url: fn.url } : {}),
            ...(fn.method ? { method: fn.method } : {}),
            ...(fn.configuration || {}),
          },
        })),
        calendar: {
          enabled: selectedCalendarIds.length > 0,
          calendar_ids: selectedCalendarIds,
        },
        crm_sync: {
          enabled: Boolean(crmProvider),
          provider: crmProvider,
          configuration: {},
        },
        knowledge_base: {
          enabled: selectedKnowledgeBaseIds.length > 0,
          knowledge_base_ids: selectedKnowledgeBaseIds,
        },
        speech_settings: {
          language: selectedLanguage === "english" ? "en-IN" : selectedLanguage,
          speed: speechSpeed,
          pitch: 0,
          silence: { enabled: endOnSilence, timeout_seconds: silenceTimeout },
          transcription_language: transcriptionLanguage === "Auto-detect (default)" ? null : transcriptionLanguage,
          background_sound: backgroundSound === "None" ? null : backgroundSound,
          interruption_sensitivity: interruptionSensitivity,
          reminder_message: {
            enabled: Boolean(reminderMessage.trim()),
            message: reminderMessage || null,
            max_reminders: reminderTimes,
            interval_seconds: reminderSeconds,
          },
        },
        call_settings: {
          recording_enabled: true,
          transcription_enabled: true,
          max_duration: { enabled: true, seconds: durationLimit * 60 },
          fallback: {
            enabled: true,
            message: "Sorry, I am unable to help with that right now. Please try again later.",
          },
          voicemail_detection: voicemailDetection,
          end_call_on_silence: { enabled: endOnSilence, timeout_seconds: endOnSilence ? silenceTimeout : null },
          emergency_fallback: { enabled: emergencyFallback, phone_number: null },
          advanced: { ring_duration_seconds: ringDuration },
        },
        post_call_data_extraction: {
          enabled: extractionFields.length > 0,
          fields: extractionFields.map(({ id, type, ...field }) => ({
            name: field.name,
            description: field.description || "",
            type: type === "text" ? "string" : type === "yesno" ? "boolean" : type === "number" ? "number" : "string",
            required: Boolean(field.required),
          })),
        },
        webhook_settings: {
          enabled: webhooks.length > 0 || Boolean(webhookUrl.trim()),
          events: ["call_started", "call_ended"],
          configuration: {
            url: webhooks[0]?.url || webhookUrl || "",
            method: webhooks[0]?.method || "POST",
            headers: webhooks[0]?.headers || {},
            timeout_seconds: 10,
            retries: webhookRetries,
          },
        },
        prompt_variables: {
          company_name: "Agni AI",
          support_email: "support@example.com",
          language: selectedLanguageMeta?.label || "English",
        },
        metadata: { department: "customer_support", environment: "development" },
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

      // Show a success snackbar in the top-right, then return to the agents list.
      toast.success("Agent created successfully!", {
        position: "top-right",
        autoClose: 1800,
      });
      window.setTimeout(() => {
        navigate("/agents", { replace: true });
      }, 1200);
    } catch (error) {
      const responseData = error?.response?.data;
      console.error("Create Agent API failed:", {
        status: error?.response?.status,
        response: responseData,
        payload,
      });

      const detail = responseData?.detail;
      let apiError = "Unable to create the agent. Please try again.";

      if (Array.isArray(detail)) {
        apiError = detail.map((item) => {
          const field = Array.isArray(item?.loc)
            ? item.loc.filter((part) => part !== "body").join(".")
            : "Field";
          const reason = typeof item?.msg === "string" ? item.msg : "Invalid value";
          return `${field || "Field"}: ${reason}`;
        }).filter(Boolean).join("; ");
      } else if (typeof detail === "string") {
        apiError = detail;
      } else if (typeof responseData?.message === "string") {
        apiError = responseData.message;
      } else if (typeof responseData?.error === "string") {
        apiError = responseData.error;
      } else if (typeof error?.message === "string") {
        apiError = error.message;
      } else if (responseData && typeof responseData === "object") {
        apiError = JSON.stringify(responseData);
      }

      setSaveError(apiError);
      toast.error(apiError);
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
                <span className="whitespace-pre-wrap text-red-500">{typeof saveError === "string" ? saveError : JSON.stringify(saveError)}</span>
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
                  {(catalog.voices.find((item) => item.id === voice)?.name || voice)[0]}
                </span>
                <span>{catalog.voices.find((item) => item.id === voice)?.name || voice}</span>
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
                <span className="text-zinc-500">{(catalog.accents.find((item) => item.id === accent)?.label || accent)[0]}.</span>
                <ChevronDown size={11} className="text-zinc-400" />
              </button>
              {showAccentPanel && (
                <AccentPanel
                  accents={catalog.accents}
                  languages={catalog.languages}
                  current={accent}
                  selectedLanguage={selectedLanguage}
                  onSelect={(accentId) => {
                    setAccent(accentId);
                    const chosenAccent = catalog.accents.find((item) => item.id === accentId);
                    if (chosenAccent?.languages?.length && !chosenAccent.languages.includes(selectedLanguage)) {
                      setSelectedLanguage(chosenAccent.languages[0]);
                    }
                  }}
                  onLanguageSelect={setSelectedLanguage}
                  loading={catalogLoading}
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
                <textarea
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={3}
                  disabled={welcomeMode === "Silent"}
                  placeholder="Enter the welcome message..."
                  className="mt-3 w-full resize-y rounded-lg border border-black/[0.08] bg-white px-3 py-2.5 text-[12px] text-zinc-800 outline-none placeholder:text-zinc-400 disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
                />
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

            <div className="space-y-3 rounded-lg border border-black/[0.08] bg-white p-3 dark:border-white/[0.10] dark:bg-white/[0.02]">
              <label className="block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">Select Knowledge Base</label>
              {knowledgeBasesLoading ? (
                <p className="text-[12px] text-zinc-500">Loading knowledge bases...</p>
              ) : knowledgeBases.length === 0 ? (
                <p className="text-[12px] text-zinc-500">No knowledge bases found. Create one first.</p>
              ) : (
                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {knowledgeBases.map((kb) => (
                    <label key={kb.id} className="flex cursor-pointer items-start gap-2 rounded-lg border border-black/[0.06] p-2.5 text-[12px] dark:border-white/[0.08]">
                      <input
                        type="checkbox"
                        checked={selectedKnowledgeBaseIds.includes(kb.id)}
                        onChange={(e) => setSelectedKnowledgeBaseIds((current) => e.target.checked ? [...current, kb.id] : current.filter((id) => id !== kb.id))}
                        className="mt-0.5 accent-cyan-500"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-zinc-800 dark:text-zinc-200">{kb.name}</span>
                        <span className="block truncate text-zinc-500">{kb.description || "No description"}</span>
                      </span>
                    </label>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={handleAddKnowledgeBase}
                className="inline-flex items-center gap-2 rounded-lg border border-black/[0.10] bg-white px-3 py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.10] dark:bg-transparent dark:text-zinc-200 dark:hover:bg-white/[0.04]"
              >
                <ExternalLink size={13} /> Manage Knowledge Bases
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
              <option value="Auto-detect (default)">Auto-detect (default)</option>
              {catalog.languages.map((language) => (
                <option key={language.id} value={language.label}>{language.label}</option>
              ))}
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
          voices={catalog.voices}
          loading={catalogLoading}
          error={catalogError}
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

function AccentPanel({ accents, languages, current, selectedLanguage, onSelect, onLanguageSelect, loading, onClose }) {
  const ref = useRef(null);
  const selectedAccent = accents.find((item) => item.id === current);
  useEffect(() => {
    const handler = (event) => { if (ref.current && !ref.current.contains(event.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  const allowedLanguages = selectedAccent?.languages || languages.map((item) => item.id);
  return (
    <div ref={ref} className="absolute left-0 top-full z-50 mt-1 max-h-[400px] w-[320px] overflow-y-auto rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
      <div className="border-b border-black/[0.06] p-3 dark:border-white/[0.06]">
        <p className="mb-2 text-[11px] font-semibold text-zinc-500">ACCENT</p>
        {loading ? <p className="text-xs text-zinc-500">Loading catalog...</p> : accents.length ? (
          <div className="flex flex-wrap gap-1.5">
            {accents.map((item) => (
              <button type="button" key={item.id} onClick={() => onSelect(item.id)} className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium ${current === item.id ? "bg-cyan-500 text-white" : "bg-black/[0.04] text-zinc-600 dark:bg-white/[0.05] dark:text-zinc-400"}`}>
                {item.label}
              </button>
            ))}
          </div>
        ) : <p className="text-xs text-amber-600">No accents returned by /catalog.</p>}
      </div>
      <div className="p-3">
        <p className="mb-2 text-[11px] font-semibold text-zinc-500">LANGUAGE</p>
        {languages.filter((item) => allowedLanguages.includes(item.id)).map((item) => (
          <button type="button" key={item.id} onClick={() => onLanguageSelect(item.id)} className={`mb-1 flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-[12px] ${selectedLanguage === item.id ? "border-cyan-500/40 bg-cyan-500/[0.05] text-cyan-600 dark:text-cyan-400" : "border-black/[0.06] text-zinc-700 dark:border-white/[0.08] dark:text-zinc-300"}`}>
            <span className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${selectedLanguage === item.id ? "border-cyan-500 bg-cyan-500" : "border-zinc-300 dark:border-zinc-600"}`}>{selectedLanguage === item.id && <Check size={9} className="text-white" strokeWidth={3} />}</span>
            {item.label}
          </button>
        ))}
        {!loading && !languages.length && <p className="text-xs text-zinc-500">No languages available.</p>}
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

function VoicePickerModal({ current, voices = [], loading, error, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = voices.filter((voiceItem) => {
    const searchText = [voiceItem.name, voiceItem.id, voiceItem.gender, voiceItem.accent_label, voiceItem.accent, ...(voiceItem.languages || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesQuery = searchText.includes(query.trim().toLowerCase());
    const gender = String(voiceItem.gender || "").toLowerCase();
    const matchesGender = filter === "All" || gender === filter.toLowerCase();
    return matchesQuery && matchesGender;
  });

  const handlePreview = (voiceItem) => {
    // The /catalog response does not include an audio preview URL.
    toast.info(`Preview audio is not available for ${voiceItem.name || voiceItem.id} in the catalog response.`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5">
      <button
        type="button"
        aria-label="Close voice picker"
        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-picker-title"
        className="relative flex max-h-[86vh] w-full max-w-[724px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl"
      >
        {/* Header */}
        <header className="flex shrink-0 items-start justify-between px-5 pb-4 pt-5 sm:px-[22px]">
          <div>
            <h3 id="voice-picker-title" className="text-[15px] font-semibold tracking-tight text-zinc-900">
              Choose a Voice
            </h3>
            <p className="mt-1 text-[12px] text-zinc-500">
              {loading ? "Loading voices..." : `${voices.length} ${voices.length === 1 ? "voice" : "voices"} available`}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="-mr-1 -mt-1 rounded-md p-1.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X size={17} />
          </button>
        </header>

        {/* Search + gender filters */}
        <div className="flex shrink-0 flex-col gap-2.5 border-b border-zinc-200 px-5 pb-4 sm:flex-row sm:items-center sm:px-[22px]">
          <div className="flex h-[36px] min-w-0 flex-1 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-100">
            <Search size={15} className="shrink-0 text-zinc-400" />
            <input
              type="text"
              placeholder="Search voices..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[12px] text-zinc-800 outline-none placeholder:text-zinc-400"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="text-zinc-400 hover:text-zinc-700">
                <X size={13} />
              </button>
            )}
          </div>
          <div className="flex h-[36px] shrink-0 items-center rounded-lg border border-zinc-200 p-1">
            {["All", "Female", "Male"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                className={`h-[26px] rounded-md px-3 text-[11px] font-medium transition ${
                  filter === item ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Voice cards */}
        <div className="min-h-[180px] flex-1 overflow-y-auto px-[18px] py-4 sm:px-[18px]">
          {error && <p className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-[12px] text-red-600">{error}</p>}
          {loading ? (
            <div className="flex min-h-[180px] items-center justify-center gap-2 text-[13px] text-zinc-500">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-700" />
              Loading voices...
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
              <Mic2 size={24} className="mb-2 text-zinc-300" />
              <p className="text-[13px] font-medium text-zinc-700">No voices found</p>
              <p className="mt-1 text-[11px] text-zinc-500">Try another search or gender filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => {
                const isSelected = current === item.id;
                const isFemale = String(item.gender || "").toLowerCase() === "female";
                const initials = String(item.name || item.id || "V").slice(0, 1).toUpperCase();
                return (
                  <article
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(item.id); } }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    className={`group flex min-h-[119px] cursor-pointer flex-col justify-between rounded-[14px] border p-[14px] text-left transition ${
                      isSelected
                        ? "border-cyan-400 bg-cyan-50/40 ring-1 ring-cyan-100"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 text-[13px] font-semibold text-zinc-600">
                        {item.avatar_url || item.image_url ? (
                          <img src={item.avatar_url || item.image_url} alt="" className="h-full w-full object-cover" />
                        ) : initials}
                        <span className={`absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full border-2 border-white ${isFemale ? "bg-rose-500" : "bg-cyan-600"}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-[13px] font-semibold text-zinc-900">{item.name || item.id}</p>
                          {isSelected && <Check size={13} className="shrink-0 text-cyan-600" />}
                        </div>
                        <p className="mt-0.5 text-[11px] capitalize text-zinc-500">{item.gender || "Gender not specified"}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => { event.stopPropagation(); handlePreview(item); }}
                      className="mt-3 flex h-[33px] w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white text-[11px] font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                    >
                      <Play size={12} /> Preview
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="flex h-[59px] shrink-0 items-center justify-between border-t border-zinc-200 bg-white px-5 sm:px-[22px]">
          <span className="text-[11px] text-zinc-400">
            {loading ? "Loading results..." : `${filtered.length} ${filtered.length === 1 ? "result" : "results"}`}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-[11px] font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
          >
            Close
          </button>
        </footer>
      </section>
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