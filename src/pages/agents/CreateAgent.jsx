// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   HelpCircle,
//   Pencil,
//   Copy,
//   ChevronDown,
//   ChevronUp,
//   Settings,
//   Clock,
//   Smile,
//   Mic,
//   Mic2,
//   Braces,
//   Calendar,
//   RefreshCw,
//   BookOpen,
//   Phone,
//   BarChart3,
//   Webhook,
//   Plus,
//   Search,
//   Globe,
//   ExternalLink,
//   Check,
//   Play,
//   MessageSquare,
//   SlidersHorizontal,
// } from "lucide-react";

// import ThemeToggle from "../../components/ThemeToggle";

// // ============================================================
// // STATIC DATA
// // ============================================================

// const MODELS = [
//   { name: "Agni Duplex", credits: "1 credits/min" },
//   { name: "Agni 5.0 Lite", credits: "0.5 credits/min" },
//   { name: "Agni Premium Lite", credits: "0.7 credits/min" },
//   { name: "Agni 5.0", credits: "0.6 credits/min" },
//   { name: "Agni Lite 4.0", credits: "0.55 credits/min" },
//   { name: "Agni Lite 3.0 (beta)", credits: "0.45 credits/min" },
//   { name: "Agni 4.0", credits: "1 credits/min" },
//   { name: "Agni 3.0", credits: "1 credits/min" },
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

// const ACCENT_COUNTRIES = [
//   "India",
//   "United States",
//   "United Kingdom",
//   "Australia",
//   "Canada",
//   "Ireland",
// ];

// const ACCENT_LANGUAGES = {
//   India: [
//     { section: "ENGLISH", items: ["Indian English"] },
//     { section: "NORTH", items: ["Hindi", "Punjabi", "Haryanvi"] },
//     { section: "SOUTH", items: ["Tamil", "Telugu", "Kannada", "Malayalam"] },
//     { section: "WEST", items: ["Marathi", "Gujarati"] },
//     { section: "EAST", items: ["Bengali", "Odia", "Assamese"] },
//   ],
//   "United States": [
//     { section: "ENGLISH", items: ["American English"] },
//     { section: "SPANISH", items: ["Mexican Spanish", "Puerto Rican Spanish"] },
//   ],
//   "United Kingdom": [
//     { section: "ENGLISH", items: ["British English"] },
//     { section: "WELSH", items: ["Welsh English"] },
//   ],
//   Australia: [{ section: "ENGLISH", items: ["Australian English"] }],
//   Canada: [
//     { section: "ENGLISH", items: ["Canadian English"] },
//     { section: "FRENCH", items: ["Canadian French"] },
//   ],
//   Ireland: [{ section: "ENGLISH", items: ["Irish English"] }],
// };

// const TIMEZONES = [
//   "UTC",
//   "Africa/Abidjan",
//   "Africa/Accra",
//   "Africa/Addis_Ababa",
//   "Africa/Algiers",
//   "Africa/Asmara",
//   "Africa/Bamako",
//   "Africa/Bangui",
//   "Africa/Banjul",
//   "Africa/Bissau",
//   "Africa/Blantyre",
//   "Africa/Brazzaville",
//   "Africa/Bujumbura",
//   "Africa/Cairo",
//   "Africa/Casablanca",
//   "Africa/Conakry",
//   "Africa/Dakar",
//   "Africa/Djibouti",
//   "Africa/Douala",
//   "Africa/Freetown",
//   "Africa/Gaborone",
//   "Africa/Harare",
//   "Africa/Johannesburg",
//   "Africa/Kampala",
//   "Africa/Khartoum",
//   "Africa/Kigali",
//   "Africa/Kinshasa",
//   "Africa/Lagos",
//   "Africa/Luanda",
//   "Africa/Lusaka",
//   "Africa/Maputo",
//   "Africa/Mogadishu",
//   "Africa/Nairobi",
//   "Africa/Ndjamena",
//   "Africa/Niamey",
//   "Africa/Tripoli",
//   "Africa/Tunis",
//   "Africa/Windhoek",
//   "America/Adak",
//   "America/Anchorage",
//   "America/Antigua",
//   "America/Argentina/Buenos_Aires",
//   "America/Argentina/Cordoba",
//   "America/Argentina/Mendoza",
//   "America/Aruba",
//   "America/Asuncion",
//   "America/Barbados",
//   "America/Belem",
//   "America/Belize",
//   "America/Bogota",
//   "America/Boise",
//   "America/Cancun",
//   "America/Caracas",
//   "America/Cayenne",
//   "America/Chicago",
//   "America/Chihuahua",
//   "America/Costa_Rica",
//   "America/Cuiaba",
//   "America/Denver",
//   "America/Detroit",
//   "America/Edmonton",
//   "America/El_Salvador",
//   "America/Fortaleza",
//   "America/Guatemala",
//   "America/Guayaquil",
//   "America/Guyana",
//   "America/Halifax",
//   "America/Havana",
//   "America/Hermosillo",
//   "America/Jamaica",
//   "America/Juneau",
//   "America/La_Paz",
//   "America/Lima",
//   "America/Los_Angeles",
//   "America/Managua",
//   "America/Manaus",
//   "America/Martinique",
//   "America/Mazatlan",
//   "America/Mexico_City",
//   "America/Monterrey",
//   "America/Montevideo",
//   "America/Nassau",
//   "America/New_York",
//   "America/Noronha",
//   "America/Panama",
//   "America/Paramaribo",
//   "America/Phoenix",
//   "America/Port-au-Prince",
//   "America/Porto_Velho",
//   "America/Puerto_Rico",
//   "America/Recife",
//   "America/Regina",
//   "America/Rio_Branco",
//   "America/Santiago",
//   "America/Santo_Domingo",
//   "America/Sao_Paulo",
//   "America/Sitka",
//   "America/St_Johns",
//   "America/Tegucigalpa",
//   "America/Tijuana",
//   "America/Toronto",
//   "America/Vancouver",
//   "America/Whitehorse",
//   "America/Winnipeg",
//   "Asia/Baghdad",
//   "Asia/Bangkok",
//   "Asia/Colombo",
//   "Asia/Dhaka",
//   "Asia/Dubai",
//   "Asia/Hong_Kong",
//   "Asia/Istanbul",
//   "Asia/Jakarta",
//   "Asia/Jerusalem",
//   "Asia/Karachi",
//   "Asia/Kathmandu",
//   "Asia/Kolkata",
//   "Asia/Riyadh",
//   "Asia/Shanghai",
//   "Asia/Singapore",
//   "Asia/Tehran",
//   "Asia/Tokyo",
//   "Australia/Adelaide",
//   "Australia/Brisbane",
//   "Australia/Darwin",
//   "Australia/Hobart",
//   "Australia/Melbourne",
//   "Australia/Perth",
//   "Australia/Sydney",
//   "Europe/Amsterdam",
//   "Europe/Athens",
//   "Europe/Berlin",
//   "Europe/Dublin",
//   "Europe/Lisbon",
//   "Europe/London",
//   "Europe/Madrid",
//   "Europe/Moscow",
//   "Europe/Paris",
//   "Europe/Rome",
//   "Europe/Stockholm",
//   "Europe/Vienna",
//   "Europe/Warsaw",
//   "Europe/Zurich",
//   "Pacific/Auckland",
//   "Pacific/Fiji",
//   "Pacific/Guam",
//   "Pacific/Honolulu",
// ];

// // ============================================================
// // MAIN COMPONENT
// // ============================================================

// export default function CreateAgent() {
//   const navigate = useNavigate();

//   // ✅ Theme state
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
//     window.dispatchEvent(
//       new CustomEvent("ravanai-theme-change", { detail: next })
//     );
//   };

//   const [agentName, setAgentName] = useState("Unnamed Agent");
//   const [isEditingName, setIsEditingName] = useState(false);

//   const [model, setModel] = useState("Agni Premium Lite");
//   const [showModelPicker, setShowModelPicker] = useState(false);
//   const [showModelTune, setShowModelTune] = useState(false);

//   const [voice, setVoice] = useState("Priya");
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

//   const [interruptionSensitivity, setInterruptionSensitivity] = useState(0.9);
//   const [speechSpeed, setSpeechSpeed] = useState(1.0);

//   const [silenceTimeout, setSilenceTimeout] = useState(10);
//   const [durationLimit, setDurationLimit] = useState(30);
//   const [voicemailDetection, setVoicemailDetection] = useState(false);
//   const [endOnSilence, setEndOnSilence] = useState(false);
//   const [emergencyFallback, setEmergencyFallback] = useState(false);

//   const [salesforce, setSalesforce] = useState(false);
//   const [gohighlevel, setGohighlevel] = useState(false);

//   return (
//     <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       <style>{`
//         .thin-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
//         .thin-scroll::-webkit-scrollbar-track { background: transparent; }
//         .thin-scroll::-webkit-scrollbar-thumb { background: rgba(120,120,130,0.35); border-radius: 9999px; }
//         .thin-scroll { scrollbar-width: thin; scrollbar-color: rgba(120,120,130,0.35) transparent; }
//       `}</style>

//       {/* ============ TOP BAR ============ */}
//       <div className="z-20 shrink-0 border-b border-black/[0.06] bg-zinc-100/95 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#09090B]/95">
//         <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
//           <div className="flex min-w-0 items-center gap-3">
//             <button
//               onClick={() => navigate("/agents")}
//               className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//             >
//               <ArrowLeft size={14} />
//               Back
//             </button>

//             <div className="min-w-0">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-semibold text-zinc-500">
//                   Agent name :
//                 </span>

//                 {isEditingName ? (
//                   <input
//                     autoFocus
//                     value={agentName}
//                     onChange={(e) => setAgentName(e.target.value)}
//                     onBlur={() => setIsEditingName(false)}
//                     onKeyDown={(e) =>
//                       e.key === "Enter" && setIsEditingName(false)
//                     }
//                     className="bg-transparent text-sm font-semibold text-zinc-900 outline-none dark:text-zinc-100"
//                   />
//                 ) : (
//                   <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
//                     {agentName}
//                   </span>
//                 )}

//                 <button className="text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200">
//                   <HelpCircle size={13} />
//                 </button>
//                 <button
//                   onClick={() => setIsEditingName(true)}
//                   className="text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200"
//                 >
//                   <Pencil size={13} />
//                 </button>
//               </div>

//               <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500">
//                 <span>ag01...270</span>
//                 <button className="transition hover:text-zinc-700 dark:hover:text-zinc-300">
//                   <Copy size={11} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex shrink-0 flex-col items-end gap-1">
//             <div className="flex items-center gap-2">
//               {/* ✅ Theme toggle */}
//               <ThemeToggle theme={theme} onToggle={handleThemeToggle} />

//               <button className="flex h-9 items-center rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">
//                 Save
//               </button>
//             </div>
//             <div className="pr-0.5 text-[10px] text-zinc-500">
//               Auto saved at 15:09
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ============ 3-COLUMN LAYOUT ============ */}
//       <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden p-4 sm:p-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)_minmax(320px,0.85fr)]">
//         {/* ---------- LEFT ---------- */}
//         <div className="thin-scroll flex h-full min-h-0 flex-col gap-3 overflow-y-auto pr-2 pb-4">
//           <div className="flex flex-wrap items-center gap-2">
//             {/* Model dropdown */}
//             <div className="relative flex items-center gap-1">
//               <button
//                 onClick={() => setShowModelPicker((v) => !v)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span className="truncate">{model}</span>
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>

//               <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-400 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012]">
//                 <HelpCircle size={12} />
//               </button>

//               <button
//                 onClick={() => setShowModelTune((v) => !v)}
//                 className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012]"
//               >
//                 <SlidersHorizontal size={12} />
//               </button>

//               {showModelPicker && (
//                 <ModelDropdown
//                   current={model}
//                   onSelect={(m) => {
//                     setModel(m);
//                     setShowModelPicker(false);
//                   }}
//                   onClose={() => setShowModelPicker(false)}
//                 />
//               )}
//             </div>

//             {/* Voice dropdown */}
//             <div className="relative flex items-center gap-1">
//               <button
//                 onClick={() => setShowVoicePicker(true)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-slate-900">
//                   {voice[0]}
//                 </span>
//                 <span>{voice}</span>
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>
//               <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-400 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012]">
//                 <HelpCircle size={12} />
//               </button>
//             </div>

//             {/* Memory dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowMemoryMenu((v) => !v)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span>Memory</span>
//                 <HelpCircle size={11} className="text-zinc-400" />
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>

//               {showMemoryMenu && (
//                 <ToggleMenu
//                   onSelect={(v) => {
//                     setMemoryEnabled(v === "Enable");
//                     setShowMemoryMenu(false);
//                   }}
//                   onClose={() => setShowMemoryMenu(false)}
//                   selected={memoryEnabled ? "Enable" : "Disable"}
//                 />
//               )}
//             </div>

//             {/* Emotion dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowEmotionMenu((v) => !v)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span>Emotion</span>
//                 <HelpCircle size={11} className="text-zinc-400" />
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>

//               {showEmotionMenu && (
//                 <ToggleMenu
//                   onSelect={(v) => {
//                     setEmotionEnabled(v === "Enable");
//                     setShowEmotionMenu(false);
//                   }}
//                   onClose={() => setShowEmotionMenu(false)}
//                   selected={emotionEnabled ? "Enable" : "Disable"}
//                 />
//               )}
//             </div>

//             {/* Accent dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowAccentPanel((v) => !v)}
//                 className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <span>Accent</span>
//                 <HelpCircle size={11} className="text-zinc-400" />
//                 <span className="text-zinc-500">{accent[0]}.</span>
//                 <ChevronDown size={11} className="text-zinc-400" />
//               </button>

//               {showAccentPanel && (
//                 <AccentPanel
//                   current={accent}
//                   onSelect={(a) => setAccent(a)}
//                   onClose={() => setShowAccentPanel(false)}
//                 />
//               )}
//             </div>
//           </div>

//           {/* Welcome Message */}
//           <div className="shrink-0 overflow-hidden rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//             <button
//               onClick={() => setWelcomeOpen((v) => !v)}
//               className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
//             >
//               <div className="flex items-center gap-2">
//                 <MessageSquare size={12} className="text-zinc-500" />
//                 <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
//                   Welcome Message
//                 </span>
//                 <HelpCircle size={12} className="text-zinc-400" />
//               </div>
//               {welcomeOpen ? (
//                 <ChevronUp size={14} className="text-zinc-400" />
//               ) : (
//                 <ChevronDown size={14} className="text-zinc-400" />
//               )}
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
//                 <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
//                   System Prompt
//                 </span>
//                 <HelpCircle size={11} className="text-zinc-400" />
//               </div>

//               <div className="flex items-center gap-1.5">
//                 <div className="relative">
//                   <button
//                     onClick={() => setShowTimezonePicker((v) => !v)}
//                     className="flex items-center gap-1 rounded-md border border-black/[0.08] px-2 py-1 text-[10px] font-medium text-cyan-600 dark:border-white/[0.08] dark:text-cyan-400"
//                   >
//                     <Clock size={10} />
//                     {timezone}
//                     <ChevronDown size={10} />
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
//                   <span className="text-cyan-500 dark:text-cyan-400">✱</span>
//                   ≈0 tokens
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
//               className="min-h-0 flex-1 resize-none bg-transparent px-4 py-3 text-[13px] leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//             />
//           </div>
//         </div>

//         {/* ---------- MIDDLE ---------- */}
//         <div className="thin-scroll h-full min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-2 pb-4">
//           <Section
//             icon={Braces}
//             title="Functions"
//             badge="0"
//             open={openSections.functions}
//             onToggle={() => toggleSection("functions")}
//           >
//             <button className="mb-3 flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950">
//               <Plus size={12} />
//               Add Function
//               <ChevronDown size={12} />
//             </button>

//             <div className="mb-3 flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#0e0f12]">
//               <Search size={13} />
//               <input
//                 type="text"
//                 placeholder="Search functions..."
//                 className="min-w-0 flex-1 bg-transparent text-[12px] outline-none"
//               />
//             </div>

//             <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center text-[12px] text-zinc-500 dark:border-white/[0.10]">
//               No functions available yet.
//             </div>
//           </Section>

//           <Section
//             icon={Calendar}
//             title="Calendars"
//             open={openSections.calendars}
//             onToggle={() => toggleSection("calendars")}
//           >
//             <p className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//               <Globe size={12} />
//               Calendar Time Zone
//               <HelpCircle size={11} className="text-zinc-400" />
//             </p>
//             <select className="mb-3 h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
//               <option>UTC</option>
//             </select>

//             <p className="mb-3 text-[11px] text-zinc-500">
//               Select a calendar integration. Only one can be active at a time.
//             </p>

//             <RadioOption
//               label="GoHighLevel (GHL)"
//               sub="GoHighLevel / Lead Connector calendar"
//             />
//             <RadioOption label="Cal.com" sub="Cal.com appointment scheduling" />
//           </Section>

//           <Section
//             icon={RefreshCw}
//             title="CRM Sync"
//             badge="Connect a CRM to sync leads"
//             open={openSections.crm}
//             onToggle={() => toggleSection("crm")}
//           >
//             <p className="mb-3 text-[11px] text-zinc-500">
//               Pick the CRMs that should receive leads from this agent. With none
//               selected, leads sync to all connected CRMs.
//             </p>

//             <ToggleRow
//               label="Salesforce"
//               sub="Sync leads to Salesforce"
//               badge="NOT CONNECTED"
//               value={salesforce}
//               onChange={setSalesforce}
//             />
//             <ToggleRow
//               label="GoHighLevel"
//               sub="Sync leads to GoHighLevel / Lead Connector"
//               badge="NOT CONNECTED"
//               value={gohighlevel}
//               onChange={setGohighlevel}
//             />
//           </Section>

//           <Section
//             icon={BookOpen}
//             title="Knowledge Base"
//             open={openSections.knowledge}
//             onToggle={() => toggleSection("knowledge")}
//           >
//             <p className="mb-3 text-[11px] text-zinc-500">
//               Select a knowledge base for this agent
//             </p>
//             <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center dark:border-white/[0.10]">
//               <p className="text-[12px] text-zinc-500">
//                 No knowledge bases found.
//               </p>
//               <p className="mt-0.5 text-[11px] text-zinc-500">
//                 Create one and come back to attach it to this agent.
//               </p>
//               <button className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300">
//                 <ExternalLink size={11} />
//                 Add Knowledge Base
//               </button>
//             </div>
//           </Section>

//           <Section
//             icon={Mic2}
//             title="Speech Settings"
//             open={openSections.speech}
//             onToggle={() => toggleSection("speech")}
//           >
//             <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//               Transcription Language
//               <HelpCircle size={11} className="text-zinc-400" />
//             </p>
//             <select className="mb-4 h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
//               <option>Auto-detect (default)</option>
//             </select>

//             <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//               Background Sound
//               <HelpCircle size={11} className="text-zinc-400" />
//             </p>
//             <select className="mb-4 h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
//               <option>None</option>
//               <option>Office</option>
//               <option>Restaurant</option>
//               <option>Street</option>
//             </select>

//             <SliderRow
//               label="Interruption Sensitivity"
//               value={interruptionSensitivity}
//               min={0}
//               max={1}
//               step={0.1}
//               display={interruptionSensitivity.toFixed(1)}
//               onChange={setInterruptionSensitivity}
//             />
//             <SliderRow
//               label="Speech Speed"
//               value={speechSpeed}
//               min={0.5}
//               max={2}
//               step={0.1}
//               display={speechSpeed.toFixed(1)}
//               onChange={setSpeechSpeed}
//             />

//             <div className="mt-4 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <p className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
//                 Reminder Message Frequency
//                 <HelpCircle size={11} className="text-zinc-400" />
//               </p>
//               <p className="mt-0.5 text-[10px] text-zinc-500">
//                 Control how often AI sends a reminder message.
//               </p>

//               <div className="mt-3 flex items-center gap-2">
//                 <input
//                   type="number"
//                   defaultValue={10}
//                   className="h-9 w-20 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//                 />
//                 <span className="text-[11px] text-zinc-500">seconds</span>
//                 <input
//                   type="number"
//                   defaultValue={1}
//                   className="h-9 w-16 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//                 />
//                 <span className="text-[11px] text-zinc-500">times</span>
//               </div>

//               <p className="mt-3 mb-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
//                 Reminder Message
//               </p>
//               <textarea
//                 rows={2}
//                 placeholder="Enter reminder message..."
//                 className="w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[12px] outline-none dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//               />
//             </div>
//           </Section>

//           <Section
//             icon={Phone}
//             title="Call Settings"
//             open={openSections.call}
//             onToggle={() => toggleSection("call")}
//           >
//             <ToggleRow
//               label="Voicemail detection"
//               sub="Detect and handle voicemail automatically"
//               value={voicemailDetection}
//               onChange={setVoicemailDetection}
//             />
//             <ToggleRow
//               label="End call on silence"
//               sub="End call when prolonged silence is detected."
//               value={endOnSilence}
//               onChange={setEndOnSilence}
//             />

//             {endOnSilence && (
//               <SliderRow
//                 label="Silence timeout"
//                 value={silenceTimeout}
//                 min={5}
//                 max={30}
//                 step={1}
//                 display={`${silenceTimeout} s`}
//                 onChange={setSilenceTimeout}
//               />
//             )}

//             <div className="mt-3">
//               <p className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
//                 Max duration
//                 <HelpCircle size={11} className="text-zinc-400" />
//               </p>
//               <p className="mt-0.5 text-[10px] text-zinc-500">
//                 Set a maximum call duration.
//               </p>
//               <SliderRow
//                 label="Duration limit"
//                 value={durationLimit}
//                 min={5}
//                 max={60}
//                 step={1}
//                 display={`${durationLimit} min`}
//                 onChange={setDurationLimit}
//               />
//             </div>

//             <ToggleRow
//               label="Emergency fallback"
//               sub="Transfer the call to a backup number on failure."
//               value={emergencyFallback}
//               onChange={setEmergencyFallback}
//             />

//             <button className="mt-3 flex h-9 w-full items-center justify-between rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
//               <span className="flex items-center gap-1.5 font-medium">
//                 Advanced
//                 <HelpCircle size={11} className="text-zinc-400" />
//               </span>
//               <ChevronDown size={12} className="text-zinc-400" />
//             </button>
//           </Section>

//           <Section
//             icon={BarChart3}
//             title="Post-Call Data Extraction"
//             open={openSections.postcall}
//             onToggle={() => toggleSection("postcall")}
//           >
//             <div className="rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <div className="flex items-start justify-between gap-2">
//                 <div>
//                   <p className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
//                     Post Call Data Retrieval
//                   </p>
//                   <p className="mt-0.5 text-[10px] text-zinc-500">
//                     Define the information you need to extract from the call.
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <button className="rounded-md border border-black/[0.08] px-2 py-1 text-[10px] dark:border-white/[0.08] dark:text-zinc-300">
//                     Copy
//                   </button>
//                   <button className="rounded-md border border-black/[0.08] px-2 py-1 text-[10px] dark:border-white/[0.08] dark:text-zinc-300">
//                     Paste
//                   </button>
//                 </div>
//               </div>

//               <p className="mt-4 text-[11px] text-zinc-500">
//                 No fields yet. Add one below.
//               </p>

//               <div className="mt-3 flex items-center justify-between gap-2">
//                 <button className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300">
//                   <Plus size={11} />
//                   Add
//                 </button>
//                 <button className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300">
//                   ✨ GPT-4o mini
//                   <ChevronDown size={10} />
//                 </button>
//               </div>
//             </div>
//           </Section>

//           <Section
//             icon={Webhook}
//             title="Webhook Settings"
//             open={openSections.webhook}
//             onToggle={() => toggleSection("webhook")}
//           >
//             <p className="mb-3 text-[11px] text-zinc-500">
//               Add webhook URLs to receive event notifications when calls are
//               completed.
//             </p>

//             <input
//               type="text"
//               placeholder="Enter webhook URL"
//               className="mb-2 h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//             />

//             <div className="mb-2 grid grid-cols-2 gap-2">
//               <input
//                 type="text"
//                 placeholder="Header name"
//                 className="h-9 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//               />
//               <input
//                 type="text"
//                 placeholder="Header value"
//                 className="h-9 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//               />
//             </div>

//             <div className="mb-3 flex items-center gap-2">
//               <span className="text-[11px] text-zinc-500">Retries</span>
//               <input
//                 type="number"
//                 defaultValue={0}
//                 className="h-9 w-16 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//               />
//               <button className="ml-auto flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-2 text-[11px] font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">
//                 <Plus size={11} />
//                 Add
//               </button>
//             </div>

//             <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center text-[11px] text-zinc-500 dark:border-white/[0.10]">
//               No webhooks added yet. Add a URL above to get started.
//             </div>
//           </Section>
//         </div>

//         {/* ---------- RIGHT ---------- */}
//         <div className="thin-scroll h-full min-h-0 overflow-y-auto rounded-xl border border-black/[0.06] bg-white pb-4 dark:border-white/[0.08] dark:bg-[#101012]">
//           <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
//             <div className="flex items-center gap-2">
//               <Mic size={13} className="text-cyan-500 dark:text-cyan-400" />
//               <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
//                 Test Agent
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-col items-center px-5 py-10 text-center">
//             <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/[0.03]">
//               <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/[0.08]">
//                 <Mic size={22} className="text-cyan-500 dark:text-cyan-400" />
//               </div>
//             </div>

//             <h4 className="mt-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
//               Test your agent
//             </h4>
//             <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
//               Run a live call to test your agent's voice, prompt, and functions.
//             </p>

//             <div className="mt-5 flex w-full items-start gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] px-3 py-2.5 text-left">
//               <HelpCircle
//                 size={12}
//                 className="mt-0.5 shrink-0 text-cyan-500 dark:text-cyan-400"
//               />
//               <p className="text-[11px] leading-relaxed text-cyan-700 dark:text-cyan-300">
//                 Please note memory is not supported in Webcall.
//               </p>
//             </div>

//             <button className="mt-5 flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">
//               <Mic size={13} />
//               Start Test
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Voice picker modal */}
//       {showVoicePicker && (
//         <VoicePickerModal
//           current={voice}
//           onClose={() => setShowVoicePicker(false)}
//           onSelect={(v) => {
//             setVoice(v);
//             setShowVoicePicker(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// // ============================================================
// // TIMEZONE PICKER
// // ============================================================

// function TimezonePicker({ current, onSelect, onClose }) {
//   const ref = useRef(null);
//   const inputRef = useRef(null);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const handler = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) onClose();
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onClose]);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   const filtered = TIMEZONES.filter((tz) =>
//     tz.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div
//       ref={ref}
//       className="absolute right-0 top-full z-50 mt-1 w-[280px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
//     >
//       <div className="border-b border-black/[0.06] p-2 dark:border-white/[0.06]">
//         <div className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#0e0f12]">
//           <Search size={12} />
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Search timezone..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="min-w-0 flex-1 bg-transparent text-[12px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//           />
//         </div>
//       </div>

//       <div className="thin-scroll max-h-[280px] overflow-y-auto py-1">
//         {filtered.length === 0 ? (
//           <div className="px-3 py-6 text-center text-[12px] text-zinc-500">
//             No timezone found
//           </div>
//         ) : (
//           filtered.map((tz) => {
//             const isSelected = current === tz;
//             return (
//               <button
//                 key={tz}
//                 onClick={() => {
//                   onSelect(tz);
//                   onClose();
//                 }}
//                 className={`
//                   flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] transition
//                   ${
//                     isSelected
//                       ? "bg-cyan-500/[0.08] font-semibold text-cyan-600 dark:text-cyan-400"
//                       : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//                   }
//                 `}
//               >
//                 {isSelected && (
//                   <Check
//                     size={11}
//                     className="shrink-0 text-cyan-500 dark:text-cyan-400"
//                   />
//                 )}
//                 <span className="truncate">{tz}</span>
//               </button>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // TOGGLE MENU
// // ============================================================

// function ToggleMenu({ selected, onSelect, onClose }) {
//   const ref = useRef(null);

//   useEffect(() => {
//     const handler = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) onClose();
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onClose]);

//   return (
//     <div
//       ref={ref}
//       className="absolute left-0 top-full z-50 mt-1 w-[180px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
//     >
//       {["Enable", "Disable"].map((option) => {
//         const isSelected = selected === option;
//         return (
//           <button
//             key={option}
//             onClick={() => onSelect(option)}
//             className={`
//               flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] transition
//               ${
//                 isSelected
//                   ? "bg-cyan-500/[0.08] font-semibold text-cyan-600 dark:text-cyan-400"
//                   : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//               }
//             `}
//           >
//             <Check
//               size={13}
//               className={`shrink-0 ${
//                 isSelected
//                   ? "text-cyan-500 dark:text-cyan-400"
//                   : "text-transparent"
//               }`}
//             />
//             {option}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// // ============================================================
// // ACCENT PANEL
// // ============================================================

// function AccentPanel({ current, onSelect, onClose }) {
//   const ref = useRef(null);
//   const [country, setCountry] = useState(current || "India");
//   const [countryOpen, setCountryOpen] = useState(false);
//   const [selected, setSelected] = useState([]);

//   useEffect(() => {
//     const handler = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) onClose();
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onClose]);

//   const sections = ACCENT_LANGUAGES[country] || [];

//   const toggleLanguage = (lang) => {
//     setSelected((prev) =>
//       prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
//     );
//   };

//   return (
//     <div
//       ref={ref}
//       className="absolute left-0 top-full z-50 mt-1 w-[340px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
//     >
//       <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
//         <div className="flex items-center gap-2">
//           <Globe size={13} className="text-cyan-500 dark:text-cyan-400" />
//           <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//             Voice Accent
//           </span>
//         </div>
//         <p className="mt-0.5 text-[11px] text-zinc-500">
//           Select regional accents for the agent.
//         </p>
//       </div>

//       <div className="border-b border-black/[0.06] p-3 dark:border-white/[0.06]">
//         <div className="relative">
//           <button
//             onClick={() => setCountryOpen((v) => !v)}
//             className="flex h-9 w-full items-center justify-between rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] text-zinc-800 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
//           >
//             <span>{country}</span>
//             <ChevronDown size={12} className="text-zinc-400" />
//           </button>

//           {countryOpen && (
//             <div className="absolute left-0 top-full z-10 mt-1 w-full overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
//               {ACCENT_COUNTRIES.map((c) => (
//                 <button
//                   key={c}
//                   onClick={() => {
//                     setCountry(c);
//                     onSelect(c);
//                     setCountryOpen(false);
//                     setSelected([]);
//                   }}
//                   className={`
//                     flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] transition
//                     ${
//                       country === c
//                         ? "font-semibold text-cyan-600 dark:text-cyan-400"
//                         : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//                     }
//                   `}
//                 >
//                   <Check
//                     size={12}
//                     className={`shrink-0 ${
//                       country === c
//                         ? "text-cyan-500 dark:text-cyan-400"
//                         : "text-transparent"
//                     }`}
//                   />
//                   {c}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="max-h-[340px] overflow-y-auto px-3 py-3">
//         {sections.map((group) => (
//           <div key={group.section} className="mb-3 last:mb-0">
//             <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//               {group.section}
//             </p>

//             <div className="space-y-1">
//               {group.items.map((lang) => {
//                 const isChecked = selected.includes(lang);
//                 return (
//                   <button
//                     key={lang}
//                     onClick={() => toggleLanguage(lang)}
//                     className={`
//                       flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-[12px] transition
//                       ${
//                         isChecked
//                           ? "border-cyan-500/40 bg-cyan-500/[0.04] text-cyan-600 dark:text-cyan-400"
//                           : "border-black/[0.06] bg-white text-zinc-700 hover:border-cyan-500/20 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-300"
//                       }
//                     `}
//                   >
//                     <span
//                       className={`
//                         flex h-4 w-4 shrink-0 items-center justify-center rounded border transition
//                         ${
//                           isChecked
//                             ? "border-cyan-500 bg-cyan-500"
//                             : "border-zinc-300 dark:border-zinc-600"
//                         }
//                       `}
//                     >
//                       {isChecked && (
//                         <Check
//                           size={10}
//                           className="text-white"
//                           strokeWidth={3}
//                         />
//                       )}
//                     </span>
//                     <span className="font-medium">{lang}</span>
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

// // ============================================================
// // MODEL DROPDOWN
// // ============================================================

// function ModelDropdown({ current, onSelect, onClose }) {
//   const ref = useRef(null);

//   useEffect(() => {
//     const handler = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) onClose();
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [onClose]);

//   return (
//     <div
//       ref={ref}
//       className="absolute left-0 top-full z-50 mt-1 w-[280px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
//     >
//       <div className="max-h-[320px] overflow-y-auto py-1">
//         {MODELS.map((m) => {
//           const isSelected = current === m.name;
//           return (
//             <button
//               key={m.name}
//               onClick={() => onSelect(m.name)}
//               className={`
//                 flex w-full items-center justify-between gap-3
//                 px-4 py-2.5 text-left text-[13px] transition
//                 ${
//                   isSelected
//                     ? "bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400"
//                     : "text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//                 }
//               `}
//             >
//               <span className="flex items-center gap-2">
//                 {isSelected && (
//                   <Check
//                     size={13}
//                     className="shrink-0 text-cyan-500 dark:text-cyan-400"
//                   />
//                 )}
//                 <span className={isSelected ? "font-semibold" : "font-medium"}>
//                   {m.name}
//                 </span>
//               </span>
//               <span className="shrink-0 text-[11px] text-zinc-400 dark:text-zinc-500">
//                 {m.credits}
//               </span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // VOICE PICKER MODAL
// // ============================================================

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
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
//         <div className="flex items-start justify-between border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
//           <div>
//             <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
//               Choose a Voice
//             </h3>
//             <p className="mt-1 text-xs text-zinc-500">
//               {VOICES.length} voices available
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
//           <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#0e0f12]">
//             <Search size={14} />
//             <input
//               type="text"
//               placeholder="Search voices..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//             />
//           </div>

//           <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#0e0f12]">
//             {["All", "Female", "Male"].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`rounded-md px-3 py-1 text-xs font-medium transition ${
//                   filter === f
//                     ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300"
//                     : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {filtered.map((v) => (
//               <div
//                 key={v.name}
//                 className={`flex flex-col gap-3 rounded-xl border p-4 transition ${
//                   current === v.name
//                     ? "border-cyan-500/50 bg-cyan-500/[0.04]"
//                     : "border-black/[0.06] bg-zinc-50 hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${v.color} text-[12px] font-bold text-white`}
//                   >
//                     {v.name[0]}
//                   </div>
//                   <div className="min-w-0">
//                     <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
//                       {v.name}
//                     </p>
//                     <p className="text-[11px] text-zinc-500">{v.gender}</p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => onSelect(v.name)}
//                   className="flex items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//                 >
//                   <Play size={11} />
//                   Preview
//                 </button>
//               </div>
//             ))}
//           </div>

//           {filtered.length === 0 && (
//             <div className="py-12 text-center text-sm text-zinc-500">
//               No voices found
//             </div>
//           )}
//         </div>

//         <div className="flex items-center justify-between border-t border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
//           <span className="text-xs text-zinc-500">
//             {filtered.length} results
//           </span>
//           <button
//             onClick={onClose}
//             className="rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // HELPERS
// // ============================================================

// function Section({ icon: Icon, title, badge, open, onToggle, children }) {
//   return (
//     <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//       <button
//         onClick={onToggle}
//         className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
//       >
//         <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/[0.04] dark:bg-white/[0.05]">
//           <Icon size={14} className="text-zinc-600 dark:text-zinc-400" />
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex items-center gap-2">
//             <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//               {title}
//             </span>
//             {badge && (
//               <span className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
//                 {badge}
//               </span>
//             )}
//           </div>
//         </div>

//         <HelpCircle size={12} className="shrink-0 text-zinc-400" />

//         {open ? (
//           <ChevronUp size={14} className="shrink-0 text-zinc-400" />
//         ) : (
//           <ChevronDown size={14} className="shrink-0 text-zinc-400" />
//         )}
//       </button>

//       {open && (
//         <div className="border-t border-black/[0.06] px-4 py-4 dark:border-white/[0.06]">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// function RadioOption({ label, sub }) {
//   return (
//     <label className="mb-2 flex cursor-pointer items-center gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 transition hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]">
//       <input type="radio" name="calendar" className="h-4 w-4 accent-cyan-500" />
//       <div className="min-w-0">
//         <p className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
//           {label}
//         </p>
//         <p className="mt-0.5 text-[10px] text-zinc-500">{sub}</p>
//       </div>
//     </label>
//   );
// }

// function ToggleRow({ label, sub, badge, value, onChange }) {
//   return (
//     <div className="mb-2 flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
//       <div className="min-w-0">
//         <div className="flex items-center gap-2">
//           <p className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
//             {label}
//           </p>
//           {badge && (
//             <span className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[9px] font-semibold text-zinc-500 dark:bg-white/[0.08]">
//               {badge}
//             </span>
//           )}
//         </div>
//         <p className="mt-0.5 text-[10px] text-zinc-500">{sub}</p>
//       </div>

//       <button
//         onClick={() => onChange(!value)}
//         className={`relative h-5 w-9 shrink-0 rounded-full transition ${
//           value ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-700"
//         }`}
//       >
//         <span
//           className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
//             value ? "translate-x-[18px]" : "translate-x-0.5"
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
//           <HelpCircle size={11} className="text-zinc-400" />
//         </span>
//         <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
//           {display}
//         </span>
//       </div>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         step={step}
//         value={value}
//         onChange={(e) => onChange(parseFloat(e.target.value))}
//         className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
//       />
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  Pencil,
  Copy,
  ChevronDown,
  ChevronUp,
  Settings,
  Clock,
  Smile,
  Mic,
  Mic2,
  Braces,
  Calendar,
  RefreshCw,
  BookOpen,
  Phone,
  BarChart3,
  Webhook,
  Plus,
  Search,
  Globe,
  ExternalLink,
  Check,
  Play,
  MessageSquare,
  SlidersHorizontal,
} from "lucide-react";

import ThemeToggle from "../../components/ThemeToggle";

// ============================================================
// STATIC DATA
// ============================================================

const MODELS = [
  { name: "Agni Duplex", credits: "1 credits/min" },
  { name: "Agni 5.0 Lite", credits: "0.5 credits/min" },
  { name: "Agni Premium Lite", credits: "0.7 credits/min" },
  { name: "Agni 5.0", credits: "0.6 credits/min" },
  { name: "Agni Lite 4.0", credits: "0.55 credits/min" },
  { name: "Agni Lite 3.0 (beta)", credits: "0.45 credits/min" },
  { name: "Agni 4.0", credits: "1 credits/min" },
  { name: "Agni 3.0", credits: "1 credits/min" },
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

const ACCENT_COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "Ireland",
];

const ACCENT_LANGUAGES = {
  India: [
    { section: "ENGLISH", items: ["Indian English"] },
    { section: "NORTH", items: ["Hindi", "Punjabi", "Haryanvi"] },
    { section: "SOUTH", items: ["Tamil", "Telugu", "Kannada", "Malayalam"] },
    { section: "WEST", items: ["Marathi", "Gujarati"] },
    { section: "EAST", items: ["Bengali", "Odia", "Assamese"] },
  ],
  "United States": [
    { section: "ENGLISH", items: ["American English"] },
    { section: "SPANISH", items: ["Mexican Spanish", "Puerto Rican Spanish"] },
  ],
  "United Kingdom": [
    { section: "ENGLISH", items: ["British English"] },
    { section: "WELSH", items: ["Welsh English"] },
  ],
  Australia: [{ section: "ENGLISH", items: ["Australian English"] }],
  Canada: [
    { section: "ENGLISH", items: ["Canadian English"] },
    { section: "FRENCH", items: ["Canadian French"] },
  ],
  Ireland: [{ section: "ENGLISH", items: ["Irish English"] }],
};

const TIMEZONES = [
  "UTC",
  "Africa/Abidjan",
  "Africa/Accra",
  "Africa/Addis_Ababa",
  "Africa/Algiers",
  "Africa/Asmara",
  "Africa/Bamako",
  "Africa/Bangui",
  "Africa/Banjul",
  "Africa/Bissau",
  "Africa/Blantyre",
  "Africa/Brazzaville",
  "Africa/Bujumbura",
  "Africa/Cairo",
  "Africa/Casablanca",
  "Africa/Conakry",
  "Africa/Dakar",
  "Africa/Djibouti",
  "Africa/Douala",
  "Africa/Freetown",
  "Africa/Gaborone",
  "Africa/Harare",
  "Africa/Johannesburg",
  "Africa/Kampala",
  "Africa/Khartoum",
  "Africa/Kigali",
  "Africa/Kinshasa",
  "Africa/Lagos",
  "Africa/Luanda",
  "Africa/Lusaka",
  "Africa/Maputo",
  "Africa/Mogadishu",
  "Africa/Nairobi",
  "Africa/Ndjamena",
  "Africa/Niamey",
  "Africa/Tripoli",
  "Africa/Tunis",
  "Africa/Windhoek",
  "America/Adak",
  "America/Anchorage",
  "America/Antigua",
  "America/Argentina/Buenos_Aires",
  "America/Argentina/Cordoba",
  "America/Argentina/Mendoza",
  "America/Aruba",
  "America/Asuncion",
  "America/Barbados",
  "America/Belem",
  "America/Belize",
  "America/Bogota",
  "America/Boise",
  "America/Cancun",
  "America/Caracas",
  "America/Cayenne",
  "America/Chicago",
  "America/Chihuahua",
  "America/Costa_Rica",
  "America/Cuiaba",
  "America/Denver",
  "America/Detroit",
  "America/Edmonton",
  "America/El_Salvador",
  "America/Fortaleza",
  "America/Guatemala",
  "America/Guayaquil",
  "America/Guyana",
  "America/Halifax",
  "America/Havana",
  "America/Hermosillo",
  "America/Jamaica",
  "America/Juneau",
  "America/La_Paz",
  "America/Lima",
  "America/Los_Angeles",
  "America/Managua",
  "America/Manaus",
  "America/Martinique",
  "America/Mazatlan",
  "America/Mexico_City",
  "America/Monterrey",
  "America/Montevideo",
  "America/Nassau",
  "America/New_York",
  "America/Noronha",
  "America/Panama",
  "America/Paramaribo",
  "America/Phoenix",
  "America/Port-au-Prince",
  "America/Porto_Velho",
  "America/Puerto_Rico",
  "America/Recife",
  "America/Regina",
  "America/Rio_Branco",
  "America/Santiago",
  "America/Santo_Domingo",
  "America/Sao_Paulo",
  "America/Sitka",
  "America/St_Johns",
  "America/Tegucigalpa",
  "America/Tijuana",
  "America/Toronto",
  "America/Vancouver",
  "America/Whitehorse",
  "America/Winnipeg",
  "Asia/Baghdad",
  "Asia/Bangkok",
  "Asia/Colombo",
  "Asia/Dhaka",
  "Asia/Dubai",
  "Asia/Hong_Kong",
  "Asia/Istanbul",
  "Asia/Jakarta",
  "Asia/Jerusalem",
  "Asia/Karachi",
  "Asia/Kathmandu",
  "Asia/Kolkata",
  "Asia/Riyadh",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Asia/Tehran",
  "Asia/Tokyo",
  "Australia/Adelaide",
  "Australia/Brisbane",
  "Australia/Darwin",
  "Australia/Hobart",
  "Australia/Melbourne",
  "Australia/Perth",
  "Australia/Sydney",
  "Europe/Amsterdam",
  "Europe/Athens",
  "Europe/Berlin",
  "Europe/Dublin",
  "Europe/Lisbon",
  "Europe/London",
  "Europe/Madrid",
  "Europe/Moscow",
  "Europe/Paris",
  "Europe/Rome",
  "Europe/Stockholm",
  "Europe/Vienna",
  "Europe/Warsaw",
  "Europe/Zurich",
  "Pacific/Auckland",
  "Pacific/Fiji",
  "Pacific/Guam",
  "Pacific/Honolulu",
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
    window.dispatchEvent(
      new CustomEvent("ravanai-theme-change", { detail: next })
    );
  };

  const [agentName, setAgentName] = useState("Unnamed Agent");
  const [isEditingName, setIsEditingName] = useState(false);

  const [model, setModel] = useState("Agni Premium Lite");
  const [showModelPicker, setShowModelPicker] = useState(false);

  // ✅ AI Provider Settings panel
  const [showProviderSettings, setShowProviderSettings] = useState(false);
  const [providerModel, setProviderModel] = useState("Agni Premium Lite");
  const [providerAdvanced, setProviderAdvanced] = useState("Advanced");
  const [temperature, setTemperature] = useState(0.7);

  const [voice, setVoice] = useState("Priya");
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

  const [interruptionSensitivity, setInterruptionSensitivity] = useState(0.9);
  const [speechSpeed, setSpeechSpeed] = useState(1.0);

  const [silenceTimeout, setSilenceTimeout] = useState(10);
  const [durationLimit, setDurationLimit] = useState(30);
  const [voicemailDetection, setVoicemailDetection] = useState(false);
  const [endOnSilence, setEndOnSilence] = useState(false);
  const [emergencyFallback, setEmergencyFallback] = useState(false);

  const [salesforce, setSalesforce] = useState(false);
  const [gohighlevel, setGohighlevel] = useState(false);

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <style>{`
        .thin-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
        .thin-scroll::-webkit-scrollbar-track { background: transparent; }
        .thin-scroll::-webkit-scrollbar-thumb { background: rgba(120,120,130,0.35); border-radius: 9999px; }
        .thin-scroll { scrollbar-width: thin; scrollbar-color: rgba(120,120,130,0.35) transparent; }
      `}</style>

      {/* ============ TOP BAR ============ */}
      <div className="z-20 shrink-0 border-b border-black/[0.06] bg-zinc-100/95 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#09090B]/95">
        <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => navigate("/agents")}
              className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-zinc-500">
                  Agent name :
                </span>

                {isEditingName ? (
                  <input
                    autoFocus
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setIsEditingName(false)
                    }
                    className="bg-transparent text-sm font-semibold text-zinc-900 outline-none dark:text-zinc-100"
                  />
                ) : (
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {agentName}
                  </span>
                )}

                <button className="text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200">
                  <HelpCircle size={13} />
                </button>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  <Pencil size={13} />
                </button>
              </div>

              <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500">
                <span>ag01...270</span>
                <button className="transition hover:text-zinc-700 dark:hover:text-zinc-300">
                  <Copy size={11} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <ThemeToggle theme={theme} onToggle={handleThemeToggle} />

              <button className="flex h-9 items-center rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">
                Save
              </button>
            </div>
            <div className="pr-0.5 text-[10px] text-zinc-500">
              Auto saved at 15:09
            </div>
          </div>
        </div>
      </div>

      {/* ============ 3-COLUMN LAYOUT ============ */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-hidden p-4 sm:p-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)_minmax(320px,0.85fr)]">
        {/* ---------- LEFT ---------- */}
        <div className="thin-scroll flex h-full min-h-0 flex-col gap-3 overflow-y-auto pr-2 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Model dropdown */}
            <div className="relative flex items-center gap-1">
              <button
                onClick={() => setShowModelPicker((v) => !v)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span className="truncate">{model}</span>
                <ChevronDown size={11} className="text-zinc-400" />
              </button>

              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-400 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012]">
                <HelpCircle size={12} />
              </button>

              {/* ✅ Sliders button opens AI Provider Settings */}
              <button
                onClick={() => setShowProviderSettings((v) => !v)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                  showProviderSettings
                    ? "border-cyan-500/50 bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400"
                    : "border-black/[0.08] bg-white text-zinc-500 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012]"
                }`}
              >
                <SlidersHorizontal size={12} />
              </button>

              {showModelPicker && (
                <ModelDropdown
                  current={model}
                  onSelect={(m) => {
                    setModel(m);
                    setShowModelPicker(false);
                  }}
                  onClose={() => setShowModelPicker(false)}
                />
              )}

              {/* ✅ AI Provider Settings Panel */}
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

            {/* Voice dropdown */}
            <div className="relative flex items-center gap-1">
              <button
                onClick={() => setShowVoicePicker(true)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-slate-900">
                  {voice[0]}
                </span>
                <span>{voice}</span>
                <ChevronDown size={11} className="text-zinc-400" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-400 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012]">
                <HelpCircle size={12} />
              </button>
            </div>

            {/* Memory dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMemoryMenu((v) => !v)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span>Memory</span>
                <HelpCircle size={11} className="text-zinc-400" />
                <ChevronDown size={11} className="text-zinc-400" />
              </button>

              {showMemoryMenu && (
                <ToggleMenu
                  onSelect={(v) => {
                    setMemoryEnabled(v === "Enable");
                    setShowMemoryMenu(false);
                  }}
                  onClose={() => setShowMemoryMenu(false)}
                  selected={memoryEnabled ? "Enable" : "Disable"}
                />
              )}
            </div>

            {/* Emotion dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowEmotionMenu((v) => !v)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span>Emotion</span>
                <HelpCircle size={11} className="text-zinc-400" />
                <ChevronDown size={11} className="text-zinc-400" />
              </button>

              {showEmotionMenu && (
                <ToggleMenu
                  onSelect={(v) => {
                    setEmotionEnabled(v === "Enable");
                    setShowEmotionMenu(false);
                  }}
                  onClose={() => setShowEmotionMenu(false)}
                  selected={emotionEnabled ? "Enable" : "Disable"}
                />
              )}
            </div>

            {/* Accent dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAccentPanel((v) => !v)}
                className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <span>Accent</span>
                <HelpCircle size={11} className="text-zinc-400" />
                <span className="text-zinc-500">{accent[0]}.</span>
                <ChevronDown size={11} className="text-zinc-400" />
              </button>

              {showAccentPanel && (
                <AccentPanel
                  current={accent}
                  onSelect={(a) => setAccent(a)}
                  onClose={() => setShowAccentPanel(false)}
                />
              )}
            </div>
          </div>

          {/* Welcome Message */}
          <div className="shrink-0 overflow-hidden rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
            <button
              onClick={() => setWelcomeOpen((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={12} className="text-zinc-500" />
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                  Welcome Message
                </span>
                <HelpCircle size={12} className="text-zinc-400" />
              </div>
              {welcomeOpen ? (
                <ChevronUp size={14} className="text-zinc-400" />
              ) : (
                <ChevronDown size={14} className="text-zinc-400" />
              )}
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
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  System Prompt
                </span>
                <HelpCircle size={11} className="text-zinc-400" />
              </div>

              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <button
                    onClick={() => setShowTimezonePicker((v) => !v)}
                    className="flex items-center gap-1 rounded-md border border-black/[0.08] px-2 py-1 text-[10px] font-medium text-cyan-600 dark:border-white/[0.08] dark:text-cyan-400"
                  >
                    <Clock size={10} />
                    {timezone}
                    <ChevronDown size={10} />
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
                  <span className="text-cyan-500 dark:text-cyan-400">✱</span>
                  ≈0 tokens
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
              className="min-h-0 flex-1 resize-none bg-transparent px-4 py-3 text-[13px] leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
          </div>
        </div>

        {/* ---------- MIDDLE ---------- */}
        <div className="thin-scroll h-full min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-2 pb-4">
          <Section
            icon={Braces}
            title="Functions"
            badge="0"
            open={openSections.functions}
            onToggle={() => toggleSection("functions")}
          >
            <button className="mb-3 flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950">
              <Plus size={12} />
              Add Function
              <ChevronDown size={12} />
            </button>

            <div className="mb-3 flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#0e0f12]">
              <Search size={13} />
              <input
                type="text"
                placeholder="Search functions..."
                className="min-w-0 flex-1 bg-transparent text-[12px] outline-none"
              />
            </div>

            <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center text-[12px] text-zinc-500 dark:border-white/[0.10]">
              No functions available yet.
            </div>
          </Section>

          <Section
            icon={Calendar}
            title="Calendars"
            open={openSections.calendars}
            onToggle={() => toggleSection("calendars")}
          >
            <p className="mb-2 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
              <Globe size={12} />
              Calendar Time Zone
              <HelpCircle size={11} className="text-zinc-400" />
            </p>
            <select className="mb-3 h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
              <option>UTC</option>
            </select>

            <p className="mb-3 text-[11px] text-zinc-500">
              Select a calendar integration. Only one can be active at a time.
            </p>

            <RadioOption
              label="GoHighLevel (GHL)"
              sub="GoHighLevel / Lead Connector calendar"
            />
            <RadioOption label="Cal.com" sub="Cal.com appointment scheduling" />
          </Section>

          <Section
            icon={RefreshCw}
            title="CRM Sync"
            badge="Connect a CRM to sync leads"
            open={openSections.crm}
            onToggle={() => toggleSection("crm")}
          >
            <p className="mb-3 text-[11px] text-zinc-500">
              Pick the CRMs that should receive leads from this agent. With none
              selected, leads sync to all connected CRMs.
            </p>

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
          </Section>

          <Section
            icon={BookOpen}
            title="Knowledge Base"
            open={openSections.knowledge}
            onToggle={() => toggleSection("knowledge")}
          >
            <p className="mb-3 text-[11px] text-zinc-500">
              Select a knowledge base for this agent
            </p>
            <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center dark:border-white/[0.10]">
              <p className="text-[12px] text-zinc-500">
                No knowledge bases found.
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-500">
                Create one and come back to attach it to this agent.
              </p>
              <button className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-700 dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300">
                <ExternalLink size={11} />
                Add Knowledge Base
              </button>
            </div>
          </Section>

          <Section
            icon={Mic2}
            title="Speech Settings"
            open={openSections.speech}
            onToggle={() => toggleSection("speech")}
          >
            <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
              Transcription Language
              <HelpCircle size={11} className="text-zinc-400" />
            </p>
            <select className="mb-4 h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
              <option>Auto-detect (default)</option>
            </select>

            <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
              Background Sound
              <HelpCircle size={11} className="text-zinc-400" />
            </p>
            <select className="mb-4 h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
              <option>None</option>
              <option>Office</option>
              <option>Restaurant</option>
              <option>Street</option>
            </select>

            <SliderRow
              label="Interruption Sensitivity"
              value={interruptionSensitivity}
              min={0}
              max={1}
              step={0.1}
              display={interruptionSensitivity.toFixed(1)}
              onChange={setInterruptionSensitivity}
            />
            <SliderRow
              label="Speech Speed"
              value={speechSpeed}
              min={0.5}
              max={2}
              step={0.1}
              display={speechSpeed.toFixed(1)}
              onChange={setSpeechSpeed}
            />

            <div className="mt-4 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
                Reminder Message Frequency
                <HelpCircle size={11} className="text-zinc-400" />
              </p>
              <p className="mt-0.5 text-[10px] text-zinc-500">
                Control how often AI sends a reminder message.
              </p>

              <div className="mt-3 flex items-center gap-2">
                <input
                  type="number"
                  defaultValue={10}
                  className="h-9 w-20 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
                />
                <span className="text-[11px] text-zinc-500">seconds</span>
                <input
                  type="number"
                  defaultValue={1}
                  className="h-9 w-16 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
                />
                <span className="text-[11px] text-zinc-500">times</span>
              </div>

              <p className="mt-3 mb-1.5 text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                Reminder Message
              </p>
              <textarea
                rows={2}
                placeholder="Enter reminder message..."
                className="w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[12px] outline-none dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
              />
            </div>
          </Section>

          <Section
            icon={Phone}
            title="Call Settings"
            open={openSections.call}
            onToggle={() => toggleSection("call")}
          >
            <ToggleRow
              label="Voicemail detection"
              sub="Detect and handle voicemail automatically"
              value={voicemailDetection}
              onChange={setVoicemailDetection}
            />
            <ToggleRow
              label="End call on silence"
              sub="End call when prolonged silence is detected."
              value={endOnSilence}
              onChange={setEndOnSilence}
            />

            {endOnSilence && (
              <SliderRow
                label="Silence timeout"
                value={silenceTimeout}
                min={5}
                max={30}
                step={1}
                display={`${silenceTimeout} s`}
                onChange={setSilenceTimeout}
              />
            )}

            <div className="mt-3">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
                Max duration
                <HelpCircle size={11} className="text-zinc-400" />
              </p>
              <p className="mt-0.5 text-[10px] text-zinc-500">
                Set a maximum call duration.
              </p>
              <SliderRow
                label="Duration limit"
                value={durationLimit}
                min={5}
                max={60}
                step={1}
                display={`${durationLimit} min`}
                onChange={setDurationLimit}
              />
            </div>

            <ToggleRow
              label="Emergency fallback"
              sub="Transfer the call to a backup number on failure."
              value={emergencyFallback}
              onChange={setEmergencyFallback}
            />

            <button className="mt-3 flex h-9 w-full items-center justify-between rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100">
              <span className="flex items-center gap-1.5 font-medium">
                Advanced
                <HelpCircle size={11} className="text-zinc-400" />
              </span>
              <ChevronDown size={12} className="text-zinc-400" />
            </button>
          </Section>

          <Section
            icon={BarChart3}
            title="Post-Call Data Extraction"
            open={openSections.postcall}
            onToggle={() => toggleSection("postcall")}
          >
            <div className="rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
                    Post Call Data Retrieval
                  </p>
                  <p className="mt-0.5 text-[10px] text-zinc-500">
                    Define the information you need to extract from the call.
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="rounded-md border border-black/[0.08] px-2 py-1 text-[10px] dark:border-white/[0.08] dark:text-zinc-300">
                    Copy
                  </button>
                  <button className="rounded-md border border-black/[0.08] px-2 py-1 text-[10px] dark:border-white/[0.08] dark:text-zinc-300">
                    Paste
                  </button>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-zinc-500">
                No fields yet. Add one below.
              </p>

              <div className="mt-3 flex items-center justify-between gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300">
                  <Plus size={11} />
                  Add
                </button>
                <button className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-medium dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300">
                  ✨ GPT-4o mini
                  <ChevronDown size={10} />
                </button>
              </div>
            </div>
          </Section>

          <Section
            icon={Webhook}
            title="Webhook Settings"
            open={openSections.webhook}
            onToggle={() => toggleSection("webhook")}
          >
            <p className="mb-3 text-[11px] text-zinc-500">
              Add webhook URLs to receive event notifications when calls are
              completed.
            </p>

            <input
              type="text"
              placeholder="Enter webhook URL"
              className="mb-2 h-9 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
            />

            <div className="mb-2 grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Header name"
                className="h-9 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
              />
              <input
                type="text"
                placeholder="Header value"
                className="h-9 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
              />
            </div>

            <div className="mb-3 flex items-center gap-2">
              <span className="text-[11px] text-zinc-500">Retries</span>
              <input
                type="number"
                defaultValue={0}
                className="h-9 w-16 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
              />
              <button className="ml-auto flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-2 text-[11px] font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">
                <Plus size={11} />
                Add
              </button>
            </div>

            <div className="rounded-lg border border-dashed border-black/[0.12] py-5 text-center text-[11px] text-zinc-500 dark:border-white/[0.10]">
              No webhooks added yet. Add a URL above to get started.
            </div>
          </Section>
        </div>

        {/* ---------- RIGHT ---------- */}
        <div className="thin-scroll h-full min-h-0 overflow-y-auto rounded-xl border border-black/[0.06] bg-white pb-4 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Mic size={13} className="text-cyan-500 dark:text-cyan-400" />
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                Test Agent
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center px-5 py-10 text-center">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/[0.03]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/[0.08]">
                <Mic size={22} className="text-cyan-500 dark:text-cyan-400" />
              </div>
            </div>

            <h4 className="mt-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Test your agent
            </h4>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
              Run a live call to test your agent's voice, prompt, and functions.
            </p>

            <div className="mt-5 flex w-full items-start gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] px-3 py-2.5 text-left">
              <HelpCircle
                size={12}
                className="mt-0.5 shrink-0 text-cyan-500 dark:text-cyan-400"
              />
              <p className="text-[11px] leading-relaxed text-cyan-700 dark:text-cyan-300">
                Please note memory is not supported in Webcall.
              </p>
            </div>

            <button className="mt-5 flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300">
              <Mic size={13} />
              Start Test
            </button>
          </div>
        </div>
      </div>

      {/* Voice picker modal */}
      {showVoicePicker && (
        <VoicePickerModal
          current={voice}
          onClose={() => setShowVoicePicker(false)}
          onSelect={(v) => {
            setVoice(v);
            setShowVoicePicker(false);
          }}
        />
      )}
    </div>
  );
}

// ============================================================
// ✅ AI PROVIDER SETTINGS PANEL
// ============================================================

function AIProviderSettings({
  model,
  onModelChange,
  advanced,
  onAdvancedChange,
  temperature,
  onTemperatureChange,
  onClose,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-1 w-[400px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
    >
      {/* Header */}
      <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
        <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
          AI Provider Settings
        </h3>
        <p className="mt-0.5 text-[11px] text-zinc-500">
          Configure model and response behavior.
        </p>
      </div>

      {/* Body */}
      <div className="space-y-4 p-4">
        {/* Model */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
            Model
          </label>
          <div className="relative">
            <select
              value={model}
              onChange={(e) => onModelChange(e.target.value)}
              className="h-9 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-8 text-[12px] text-zinc-800 outline-none dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
            >
              <option>Agni Premium Lite — 0.7 credits/min</option>
              <option>Agni Duplex — 1 credits/min</option>
              <option>Agni 5.0 Lite — 0.5 credits/min</option>
              <option>Agni 5.0 — 0.6 credits/min</option>
              <option>Agni Lite 4.0 — 0.55 credits/min</option>
              <option>Agni Lite 3.0 (beta) — 0.45 credits/min</option>
              <option>Agni 4.0 — 1 credits/min</option>
              <option>Agni 3.0 — 1 credits/min</option>
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
          </div>
        </div>

        {/* Advanced */}
        <div>
          <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
            Advanced
          </label>
          <div className="relative">
            <select
              value={advanced}
              onChange={(e) => onAdvancedChange(e.target.value)}
              className="h-9 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-8 text-[12px] text-zinc-800 outline-none dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
            >
              <option>Advanced</option>
              <option>Basic</option>
              <option>Expert</option>
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />
          </div>
        </div>

        {/* Temperature */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
              Temperature
            </label>
            <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
              {temperature.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={temperature}
            onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TIMEZONE PICKER
// ============================================================

function TimezonePicker({ current, onSelect, onClose }) {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = TIMEZONES.filter((tz) =>
    tz.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full z-50 mt-1 w-[280px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
    >
      <div className="border-b border-black/[0.06] p-2 dark:border-white/[0.06]">
        <div className="flex h-8 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-2.5 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#0e0f12]">
          <Search size={12} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search timezone..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-[12px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
          />
        </div>
      </div>

      <div className="thin-scroll max-h-[280px] overflow-y-auto py-1">
        {filtered.length === 0 ? (
          <div className="px-3 py-6 text-center text-[12px] text-zinc-500">
            No timezone found
          </div>
        ) : (
          filtered.map((tz) => {
            const isSelected = current === tz;
            return (
              <button
                key={tz}
                onClick={() => {
                  onSelect(tz);
                  onClose();
                }}
                className={`
                  flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] transition
                  ${
                    isSelected
                      ? "bg-cyan-500/[0.08] font-semibold text-cyan-600 dark:text-cyan-400"
                      : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                  }
                `}
              >
                {isSelected && (
                  <Check
                    size={11}
                    className="shrink-0 text-cyan-500 dark:text-cyan-400"
                  />
                )}
                <span className="truncate">{tz}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

// ============================================================
// TOGGLE MENU
// ============================================================

function ToggleMenu({ selected, onSelect, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-1 w-[180px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
    >
      {["Enable", "Disable"].map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`
              flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] transition
              ${
                isSelected
                  ? "bg-cyan-500/[0.08] font-semibold text-cyan-600 dark:text-cyan-400"
                  : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
              }
            `}
          >
            <Check
              size={13}
              className={`shrink-0 ${
                isSelected
                  ? "text-cyan-500 dark:text-cyan-400"
                  : "text-transparent"
              }`}
            />
            {option}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// ACCENT PANEL
// ============================================================

function AccentPanel({ current, onSelect, onClose }) {
  const ref = useRef(null);
  const [country, setCountry] = useState(current || "India");
  const [countryOpen, setCountryOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const sections = ACCENT_LANGUAGES[country] || [];

  const toggleLanguage = (lang) => {
    setSelected((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-1 w-[340px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
    >
      <div className="border-b border-black/[0.06] px-4 py-3 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Globe size={13} className="text-cyan-500 dark:text-cyan-400" />
          <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
            Voice Accent
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-zinc-500">
          Select regional accents for the agent.
        </p>
      </div>

      <div className="border-b border-black/[0.06] p-3 dark:border-white/[0.06]">
        <div className="relative">
          <button
            onClick={() => setCountryOpen((v) => !v)}
            className="flex h-9 w-full items-center justify-between rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] text-zinc-800 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100"
          >
            <span>{country}</span>
            <ChevronDown size={12} className="text-zinc-400" />
          </button>

          {countryOpen && (
            <div className="absolute left-0 top-full z-10 mt-1 w-full overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]">
              {ACCENT_COUNTRIES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCountry(c);
                    onSelect(c);
                    setCountryOpen(false);
                    setSelected([]);
                  }}
                  className={`
                    flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] transition
                    ${
                      country === c
                        ? "font-semibold text-cyan-600 dark:text-cyan-400"
                        : "font-medium text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                    }
                  `}
                >
                  <Check
                    size={12}
                    className={`shrink-0 ${
                      country === c
                        ? "text-cyan-500 dark:text-cyan-400"
                        : "text-transparent"
                    }`}
                  />
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-h-[340px] overflow-y-auto px-3 py-3">
        {sections.map((group) => (
          <div key={group.section} className="mb-3 last:mb-0">
            <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              {group.section}
            </p>

            <div className="space-y-1">
              {group.items.map((lang) => {
                const isChecked = selected.includes(lang);
                return (
                  <button
                    key={lang}
                    onClick={() => toggleLanguage(lang)}
                    className={`
                      flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-[12px] transition
                      ${
                        isChecked
                          ? "border-cyan-500/40 bg-cyan-500/[0.04] text-cyan-600 dark:text-cyan-400"
                          : "border-black/[0.06] bg-white text-zinc-700 hover:border-cyan-500/20 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-300"
                      }
                    `}
                  >
                    <span
                      className={`
                        flex h-4 w-4 shrink-0 items-center justify-center rounded border transition
                        ${
                          isChecked
                            ? "border-cyan-500 bg-cyan-500"
                            : "border-zinc-300 dark:border-zinc-600"
                        }
                      `}
                    >
                      {isChecked && (
                        <Check
                          size={10}
                          className="text-white"
                          strokeWidth={3}
                        />
                      )}
                    </span>
                    <span className="font-medium">{lang}</span>
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

// ============================================================
// MODEL DROPDOWN
// ============================================================

function ModelDropdown({ current, onSelect, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-1 w-[280px] overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
    >
      <div className="max-h-[320px] overflow-y-auto py-1">
        {MODELS.map((m) => {
          const isSelected = current === m.name;
          return (
            <button
              key={m.name}
              onClick={() => onSelect(m.name)}
              className={`
                flex w-full items-center justify-between gap-3
                px-4 py-2.5 text-left text-[13px] transition
                ${
                  isSelected
                    ? "bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400"
                    : "text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                }
              `}
            >
              <span className="flex items-center gap-2">
                {isSelected && (
                  <Check
                    size={13}
                    className="shrink-0 text-cyan-500 dark:text-cyan-400"
                  />
                )}
                <span className={isSelected ? "font-semibold" : "font-medium"}>
                  {m.name}
                </span>
              </span>
              <span className="shrink-0 text-[11px] text-zinc-400 dark:text-zinc-500">
                {m.credits}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// VOICE PICKER MODAL
// ============================================================

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
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        <div className="flex items-start justify-between border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Choose a Voice
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              {VOICES.length} voices available
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
          <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#0e0f12]">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search voices..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
          </div>

          <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#0e0f12]">
            {["All", "Female", "Male"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  filter === f
                    ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v) => (
              <div
                key={v.name}
                className={`flex flex-col gap-3 rounded-xl border p-4 transition ${
                  current === v.name
                    ? "border-cyan-500/50 bg-cyan-500/[0.04]"
                    : "border-black/[0.06] bg-zinc-50 hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${v.color} text-[12px] font-bold text-white`}
                  >
                    {v.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {v.name}
                    </p>
                    <p className="text-[11px] text-zinc-500">{v.gender}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelect(v.name)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                >
                  <Play size={11} />
                  Preview
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-zinc-500">
              No voices found
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
          <span className="text-xs text-zinc-500">
            {filtered.length} results
          </span>
          <button
            onClick={onClose}
            className="rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HELPERS
// ============================================================

function Section({ icon: Icon, title, badge, open, onToggle, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-black/[0.04] dark:bg-white/[0.05]">
          <Icon size={14} className="text-zinc-600 dark:text-zinc-400" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
              {title}
            </span>
            {badge && (
              <span className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
                {badge}
              </span>
            )}
          </div>
        </div>

        <HelpCircle size={12} className="shrink-0 text-zinc-400" />

        {open ? (
          <ChevronUp size={14} className="shrink-0 text-zinc-400" />
        ) : (
          <ChevronDown size={14} className="shrink-0 text-zinc-400" />
        )}
      </button>

      {open && (
        <div className="border-t border-black/[0.06] px-4 py-4 dark:border-white/[0.06]">
          {children}
        </div>
      )}
    </div>
  );
}

function RadioOption({ label, sub }) {
  return (
    <label className="mb-2 flex cursor-pointer items-center gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 transition hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <input type="radio" name="calendar" className="h-4 w-4 accent-cyan-500" />
      <div className="min-w-0">
        <p className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
          {label}
        </p>
        <p className="mt-0.5 text-[10px] text-zinc-500">{sub}</p>
      </div>
    </label>
  );
}

function ToggleRow({ label, sub, badge, value, onChange }) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3 rounded-lg border border-black/[0.06] bg-white p-3.5 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
            {label}
          </p>
          {badge && (
            <span className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[9px] font-semibold text-zinc-500 dark:bg-white/[0.08]">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[10px] text-zinc-500">{sub}</p>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`relative h-5 w-9 shrink-0 rounded-full transition ${
          value ? "bg-cyan-500" : "bg-zinc-300 dark:bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
            value ? "translate-x-[18px]" : "translate-x-0.5"
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
          <HelpCircle size={11} className="text-zinc-400" />
        </span>
        <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-cyan-500 dark:bg-zinc-800"
      />
    </div>
  );
}