// // import React, { useEffect, useState } from "react";

// // export default function SplashScreen({ onComplete }) {
// //   const [progress, setProgress] = useState(0);

// //   useEffect(() => {
// //     const duration = 2200;
// //     const intervalTime = 20;
// //     const increment = 100 / (duration / intervalTime);

// //     const interval = setInterval(() => {
// //       setProgress((prev) => {
// //         const next = prev + increment;

// //         if (next >= 100) {
// //           clearInterval(interval);

// //           setTimeout(() => {
// //             onComplete();
// //           }, 250);

// //           return 100;
// //         }

// //         return next;
// //       });
// //     }, intervalTime);

// //     return () => clearInterval(interval);
// //   }, [onComplete]);

// //   return (
// //     <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#050608] text-white antialiased">
// //       {/* Background glow */}
// //       <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.07] blur-[120px]" />

// //       {/* Secondary glow */}
// //       <div className="pointer-events-none absolute left-[20%] top-[20%] h-[180px] w-[180px] rounded-full bg-cyan-500/[0.04] blur-[90px]" />

// //       <div className="relative flex w-full flex-col items-center px-6">
// //         {/* Logo */}
// //         <div className="splash-logo relative flex h-24 w-24 items-center justify-center">
// //           {/* Outer animated ring */}
// //           <div className="absolute inset-0 rounded-[28px] border border-cyan-400/20" />

// //           <div className="absolute inset-1 rounded-[25px] border border-cyan-400/10" />

// //           {/* Logo box */}
// //           <div className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-[22px] border border-cyan-400/30 bg-[#0b1114] shadow-[0_0_50px_rgba(34,211,238,0.12)]">
// //             {/* Animated glow */}
// //             <div className="absolute h-10 w-10 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />

// //             {/* AGNI mark */}
// //             <span className="relative text-[28px] font-black tracking-[-0.08em] text-cyan-300">
// //               A
// //             </span>
// //           </div>
// //         </div>

// //         {/* Brand */}
// //         <div className="mt-7 overflow-hidden text-center">
// //           <h1 className="splash-title text-3xl font-bold tracking-[-0.03em]">
// //             <span className="text-white">AGNI</span>
// //             <span className="text-cyan-400"> AI</span>
// //           </h1>

// //           <p className="splash-subtitle mt-2 text-sm text-zinc-500">
// //             Voice AI Platform
// //           </p>
// //         </div>

// //         {/* Loading */}
// //         <div className="mt-10 w-full max-w-[220px]">
// //           <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
// //             <div
// //               className="h-full rounded-full bg-cyan-400 transition-[width] duration-75 ease-linear"
// //               style={{ width: `${progress}%` }}
// //             />
// //           </div>

// //           <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-zinc-600">
// //             <span>Initializing</span>
// //             <span>{Math.round(progress)}%</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Bottom */}
// //       <div className="absolute bottom-7 left-0 right-0 text-center">
// //         <p className="text-[10px] tracking-[0.2em] text-zinc-700">
// //           POWERED BY AGNI AI
// //         </p>
// //       </div>

// //       <style>{`
// //         .splash-logo {
// //           animation: splashLogo 900ms cubic-bezier(.22,1,.36,1) both;
// //         }

// //         .splash-title {
// //           animation: splashTitle 700ms 250ms cubic-bezier(.22,1,.36,1) both;
// //         }

// //         .splash-subtitle {
// //           animation: splashSubtitle 700ms 400ms cubic-bezier(.22,1,.36,1) both;
// //         }

// //         @keyframes splashLogo {
// //           0% {
// //             opacity: 0;
// //             transform: scale(.65) rotate(-8deg);
// //             filter: blur(8px);
// //           }

// //           60% {
// //             opacity: 1;
// //             transform: scale(1.06) rotate(1deg);
// //             filter: blur(0);
// //           }

// //           100% {
// //             opacity: 1;
// //             transform: scale(1) rotate(0);
// //           }
// //         }

// //         @keyframes splashTitle {
// //           0% {
// //             opacity: 0;
// //             transform: translateY(15px);
// //           }

// //           100% {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }

// //         @keyframes splashSubtitle {
// //           0% {
// //             opacity: 0;
// //             transform: translateY(10px);
// //           }

// //           100% {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";

// export default function SplashScreen({ onComplete }) {
//   const [progress, setProgress] = useState(0);
//   const [phase, setPhase] = useState("boot");
//   const [sparks, setSparks] = useState([]);
//   const [isRestarting, setIsRestarting] = useState(false);
//   const sparkIdRef = useRef(0);

//   // ===== THEME STATE =====
//   const [theme, setTheme] = useState(() => {
//     if (typeof window !== "undefined" && window.matchMedia) {
//       return window.matchMedia("(prefers-color-scheme: light)").matches
//         ? "light"
//         : "dark";
//     }
//     return "dark";
//   });

//   const isLight = theme === "light";

//   // ===== TOGGLE: theme change + restart loading =====
//   const toggleTheme = useCallback(() => {
//     setIsRestarting(true);
//     setProgress(0);
//     setPhase("boot");
//     setSparks([]);
//     sparkIdRef.current = 0;
//     setTheme((t) => (t === "dark" ? "light" : "dark"));

//     // Flash effect bाद, restart
//     setTimeout(() => setIsRestarting(false), 350);
//   }, []);

//   // Particles
//   const particles = useMemo(
//     () =>
//       Array.from({ length: 50 }, (_, i) => ({
//         id: i,
//         left: Math.random() * 100,
//         top: Math.random() * 100,
//         size: Math.random() * 2.5 + 1,
//         delay: Math.random() * 4,
//         duration: Math.random() * 4 + 4,
//         opacity: Math.random() * 0.5 + 0.2,
//       })),
//     [theme]
//   );

//   const shootingStars = useMemo(
//     () =>
//       Array.from({ length: 5 }, (_, i) => ({
//         id: i,
//         top: Math.random() * 60,
//         left: Math.random() * 40,
//         delay: Math.random() * 5,
//         duration: Math.random() * 1.5 + 2,
//       })),
//     [theme]
//   );

//   const matrixColumns = useMemo(
//     () =>
//       Array.from({ length: 14 }, (_, i) => ({
//         id: i,
//         left: (i / 14) * 100 + Math.random() * 4,
//         delay: Math.random() * 3,
//         duration: Math.random() * 3 + 4,
//         chars: Array.from({ length: 18 }, () =>
//           "01アイウエオカキクケコ".charAt(Math.floor(Math.random() * 19))
//         ),
//       })),
//     [theme]
//   );

//   // ===== LOADING — restart aware =====
//   useEffect(() => {
//     if (isRestarting) return; // pause while restarting flash

//     const duration = 1800;
//     const intervalTime = 16;
//     const increment = 100 / (duration / intervalTime);

//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         const next = prev + increment;
//         if (next >= 100) {
//           clearInterval(interval);
//           setPhase("ready");
//           setTimeout(() => onComplete(), 300);
//           return 100;
//         }
//         if (next > 25 && phase === "boot") setPhase("reveal");
//         return next;
//       });
//     }, intervalTime);

//     return () => clearInterval(interval);
//   }, [onComplete, isRestarting, progress === 0, theme]);

//   // Spark bursts
//   useEffect(() => {
//     if (isRestarting) return;

//     const sparkInterval = setInterval(() => {
//       const newSparks = Array.from({ length: 8 }, () => {
//         const angle = Math.random() * Math.PI * 2;
//         const distance = Math.random() * 160 + 60;
//         return {
//           id: sparkIdRef.current++,
//           x: Math.cos(angle) * distance,
//           y: Math.sin(angle) * distance,
//           size: Math.random() * 3 + 2,
//           duration: Math.random() * 0.6 + 0.6,
//         };
//       });
//       setSparks((prev) => [...prev.slice(-20), ...newSparks]);
//     }, 600);

//     return () => clearInterval(sparkInterval);
//   }, [isRestarting, theme]);

//   // Reset letter animations on theme change (force remount)
//   const themeKey = theme + "-" + (isRestarting ? "r" : "n");

//   return (
//     <div
//       className={`splash-root fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden antialiased transition-colors duration-700 ${
//         isLight
//           ? "bg-[#f4f7fb] text-slate-900 light-mode"
//           : "bg-[#030407] text-white dark-mode"
//       }`}
//     >
//       {/* ============ THEME FLASH OVERLAY ============ */}
//       {isRestarting && (
//         <div className="pointer-events-none absolute inset-0 z-50 theme-flash" />
//       )}

//       {/* ============ L1: AURORA ============ */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="aurora aurora-1" />
//         <div className="aurora aurora-2" />
//         <div className="aurora aurora-3" />
//       </div>

//       {/* ============ L2: PLASMA ORB ============ */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="plasma-orb" />
//       </div>

//       {/* ============ L3: MATRIX ============ */}
//       <div
//         className={`pointer-events-none absolute inset-0 overflow-hidden ${
//           isLight ? "opacity-[0.04]" : "opacity-[0.08]"
//         }`}
//       >
//         {matrixColumns.map((col) => (
//           <div
//             key={`${theme}-${col.id}`}
//             className="matrix-col"
//             style={{
//               left: `${col.left}%`,
//               animationDelay: `${col.delay}s`,
//               animationDuration: `${col.duration}s`,
//             }}
//           >
//             {col.chars.map((c, idx) => (
//               <span key={idx}>{c}</span>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* ============ L4: GRID ============ */}
//       <div className="pointer-events-none absolute inset-0 grid-overlay" />

//       {/* ============ L5: VIGNETTE ============ */}
//       <div
//         className={`pointer-events-none absolute inset-0 ${
//           isLight
//             ? "bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(200,220,255,0.25)_60%,rgba(180,210,255,0.5)_100%)]"
//             : "bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_60%,rgba(0,0,0,0.95)_100%)]"
//         }`}
//       />

//       {/* ============ L6: SCAN LINE ============ */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="scan-line" />
//       </div>

//       {/* ============ L7: RADAR SWEEP ============ */}
//       <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//         <div className="radar-sweep" />
//       </div>

//       {/* ============ L8: PARTICLES ============ */}
//       <div className="pointer-events-none absolute inset-0">
//         {particles.map((p) => (
//           <span
//             key={`${theme}-${p.id}`}
//             className="particle"
//             style={{
//               left: `${p.left}%`,
//               top: `${p.top}%`,
//               width: `${p.size}px`,
//               height: `${p.size}px`,
//               opacity: p.opacity,
//               animationDelay: `${p.delay}s`,
//               animationDuration: `${p.duration}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* ============ L9: SHOOTING STARS ============ */}
//       <div className="pointer-events-none absolute inset-0">
//         {shootingStars.map((s) => (
//           <span
//             key={`${theme}-${s.id}`}
//             className="shooting-star"
//             style={{
//               top: `${s.top}%`,
//               left: `${s.left}%`,
//               animationDelay: `${s.delay}s`,
//               animationDuration: `${s.duration}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* ============ L10: CORNER GLOWS ============ */}
//       <div className="pointer-events-none absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.08] blur-[120px]" />
//       <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-blue-500/[0.06] blur-[120px]" />
//       <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.05] blur-[140px] animate-pulse-slow" />

//       {/* ============ L11: LENS FLARE ============ */}
//       <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//         <div className="lens-flare" />
//       </div>

//       {/* ============ THEME TOGGLE BUTTON ============ */}
//       <button
//         onClick={toggleTheme}
//         aria-label="Toggle theme and restart"
//         className={`theme-toggle fixed right-5 top-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 hover:scale-110 active:scale-95 ${
//           isLight
//             ? "border-slate-300/70 bg-white/70 text-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
//             : "border-cyan-400/30 bg-white/5 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
//         }`}
//       >
//         <span className="relative block h-5 w-5">
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
//               isLight ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
//             }`}
//           >
//             <circle cx="12" cy="12" r="4" />
//             <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
//           </svg>
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
//               isLight ? "-rotate-180 opacity-0" : "rotate-0 opacity-100"
//             }`}
//           >
//             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
//           </svg>
//         </span>
//       </button>

//       {/* ============ MAIN CONTENT ============ */}
//       <div className="relative flex w-full flex-col items-center px-6">
//         <div className="loader-wrapper">
//           <div className="electric-arc arc-1" />
//           <div className="electric-arc arc-2" />
//           <div className="electric-arc arc-3" />

//           <div className="ripple ripple-1" />
//           <div className="ripple ripple-2" />

//           <div className="beam beam-1" />
//           <div className="beam beam-2" />
//           <div className="beam beam-3" />
//           <div className="beam beam-4" />

//           <div className="orbit-dots">
//             <span className="orbit-dot dot-1" />
//             <span className="orbit-dot dot-2" />
//             <span className="orbit-dot dot-3" />
//           </div>

//           <div className="ring ring-outer" />
//           <div className="ring ring-middle" />
//           <div className="ring ring-inner" />

//           <div className="gemini-loader">
//             <div className="gemini-triangle tri-1" />
//             <div className="gemini-triangle tri-2" />
//             <div className="gemini-triangle tri-3" />
//             <div className="gemini-core" />
//             <div className="gemini-core-halo" />
//           </div>

//           <div className="sound-wave sw-1" />
//           <div className="sound-wave sw-2" />
//           <div className="sound-wave sw-3" />

//           {sparks.map((s) => (
//             <span
//               key={s.id}
//               className="spark"
//               style={{
//                 "--spark-x": `${s.x}px`,
//                 "--spark-y": `${s.y}px`,
//                 width: `${s.size}px`,
//                 height: `${s.size}px`,
//                 animationDuration: `${s.duration}s`,
//               }}
//             />
//           ))}
//         </div>

//         {/* ===== BRAND — key forces re-animation on theme change ===== */}
//         <div className="mt-10 text-center" key={themeKey}>
//           <h1 className="text-4xl font-bold tracking-[-0.03em] flex items-center justify-center chroma-flicker">
//             <span className={`letter letter-1 glow-text ${isLight ? "text-slate-900" : "text-white"}`}>J</span>
//             <span className={`letter letter-2 glow-text ${isLight ? "text-slate-900" : "text-white"}`}>E</span>
//             <span className={`letter letter-3 glow-text ${isLight ? "text-slate-900" : "text-white"}`}>E</span>
//             <span className={`letter letter-4 glow-text ${isLight ? "text-slate-900" : "text-white"}`}>V</span>
//             <span className={`letter letter-5 glow-text ${isLight ? "text-slate-900" : "text-white"}`}>A</span>
//             <span className="ml-2 letter letter-6 text-cyan-500 glow-text-cyan">A</span>
//             <span className="letter letter-7 text-cyan-500 glow-text-cyan">I</span>
//           </h1>
//           <div
//             className={`splash-divider mx-auto mt-3 h-[1px] w-40 ${
//               isLight
//                 ? "bg-gradient-to-r from-transparent via-cyan-500/70 to-transparent"
//                 : "bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
//             }`}
//           />
//           <p
//             className={`splash-subtitle mt-3 text-sm tracking-wide ${
//               isLight ? "text-slate-500" : "text-zinc-500"
//             }`}
//           >
//             Voice AI Platform
//           </p>
//         </div>

//         {/* ===== PROGRESS BAR ===== */}
//         <div className="mt-10 w-full max-w-[280px]">
//           <div
//             className={`relative h-[3px] overflow-hidden rounded-full ${
//               isLight ? "bg-slate-900/[0.08]" : "bg-white/[0.08]"
//             }`}
//           >
//             <div className="absolute inset-0 shimmer" />
//             <div
//               className="relative h-full rounded-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300 transition-[width] duration-75 ease-linear"
//               style={{
//                 width: `${progress}%`,
//                 boxShadow: isLight
//                   ? "0 0 10px rgba(6,182,212,0.5)"
//                   : "0 0 14px rgba(34,211,238,0.8)",
//               }}
//             >
//               <div
//                 className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-400 animate-ping-slow"
//                 style={{
//                   boxShadow: isLight
//                     ? "0 0 10px rgba(6,182,212,0.9)"
//                     : "0 0 14px rgba(34,211,238,1)",
//                 }}
//               />
//             </div>
//           </div>

//           <div
//             className={`mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] ${
//               isLight ? "text-slate-500" : "text-zinc-600"
//             }`}
//           >
//             <span className="flex items-center gap-2">
//               <span className="inline-block h-1 w-1 animate-ping rounded-full bg-cyan-500" />
//               {isRestarting
//                 ? "Restarting"
//                 : phase === "ready"
//                 ? "Ready"
//                 : "Initializing"}
//             </span>
//             <span
//               className={`font-mono ${
//                 isLight ? "text-cyan-600/80" : "text-cyan-400/70"
//               }`}
//             >
//               {Math.round(progress)}%
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ============ BOTTOM ============ */}
//       <div className="absolute bottom-7 left-0 right-0 text-center">
//         <p
//           className={`bottom-text text-[10px] tracking-[0.35em] ${
//             isLight ? "text-slate-400" : "text-zinc-700"
//           }`}
//         >
//           POWERED BY JEEVA AI
//         </p>
//       </div>

//       <style>{`
//         /* ============================================
//            THEME VARIABLES
//            ============================================ */
//         .dark-mode {
//           --grid-color: rgba(34,211,238,0.045);
//           --particle-glow: rgba(34,211,238,0.7);
//           --matrix-color: #22d3ee;
//         }
//         .light-mode {
//           --grid-color: rgba(6,182,212,0.08);
//           --particle-glow: rgba(6,182,212,0.6);
//           --matrix-color: #0891b2;
//         }

//         .splash-root,
//         .splash-root * {
//           transition-property: color, background-color, border-color, box-shadow, opacity;
//           transition-duration: 500ms;
//           transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         /* ============================================
//            THEME FLASH (on toggle)
//            ============================================ */
//         .theme-flash {
//           background: radial-gradient(
//             circle at center,
//             rgba(34,211,238,0.55) 0%,
//             rgba(34,211,238,0.15) 40%,
//             transparent 70%
//           );
//           animation: flashExpand 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
//         }
//         @keyframes flashExpand {
//           0% { opacity: 0; transform: scale(0.4); }
//           40% { opacity: 1; transform: scale(1); }
//           100% { opacity: 0; transform: scale(2.2); }
//         }

//         /* ============================================
//            AURORA
//            ============================================ */
//         .aurora {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(100px);
//           mix-blend-mode: screen;
//         }
//         .dark-mode .aurora { opacity: 0.55; }
//         .light-mode .aurora { opacity: 0.35; mix-blend-mode: multiply; }

//         .aurora-1 {
//           width: 55%; height: 55%; top: -10%; left: -10%;
//           background: radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 65%);
//           animation: auroraFloat1 10s ease-in-out infinite;
//         }
//         .light-mode .aurora-1 {
//           background: radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 65%);
//         }
//         .aurora-2 {
//           width: 60%; height: 60%; bottom: -15%; right: -15%;
//           background: radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 65%);
//           animation: auroraFloat2 12s ease-in-out infinite;
//         }
//         .light-mode .aurora-2 {
//           background: radial-gradient(circle, rgba(99,102,241,0.32) 0%, transparent 65%);
//         }
//         .aurora-3 {
//           width: 45%; height: 45%; top: 40%; left: 50%;
//           background: radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 65%);
//           animation: auroraFloat3 14s ease-in-out infinite;
//         }
//         .light-mode .aurora-3 {
//           background: radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 65%);
//         }
//         @keyframes auroraFloat1 {
//           0%,100% { transform: translate(0,0) scale(1); }
//           50% { transform: translate(80px,60px) scale(1.15); }
//         }
//         @keyframes auroraFloat2 {
//           0%,100% { transform: translate(0,0) scale(1); }
//           50% { transform: translate(-70px,-50px) scale(1.2); }
//         }
//         @keyframes auroraFloat3 {
//           0%,100% { transform: translate(-50%,-50%) scale(1); }
//           50% { transform: translate(-45%,-55%) scale(1.25); }
//         }

//         /* ============================================
//            PLASMA ORB
//            ============================================ */
//         .plasma-orb {
//           position: absolute;
//           top: 50%; left: 50%;
//           width: 500px; height: 500px;
//           margin-left: -250px; margin-top: -250px;
//           border-radius: 50%;
//           background:
//             radial-gradient(circle at 30% 30%, rgba(34,211,238,0.15) 0%, transparent 50%),
//             radial-gradient(circle at 70% 60%, rgba(139,92,246,0.12) 0%, transparent 50%),
//             radial-gradient(circle at 50% 80%, rgba(59,130,246,0.12) 0%, transparent 50%);
//           filter: blur(40px);
//           animation: plasmaShift 8s ease-in-out infinite;
//           mix-blend-mode: screen;
//         }
//         .light-mode .plasma-orb {
//           background:
//             radial-gradient(circle at 30% 30%, rgba(6,182,212,0.22) 0%, transparent 50%),
//             radial-gradient(circle at 70% 60%, rgba(168,85,247,0.18) 0%, transparent 50%),
//             radial-gradient(circle at 50% 80%, rgba(99,102,241,0.18) 0%, transparent 50%);
//           mix-blend-mode: multiply;
//         }
//         @keyframes plasmaShift {
//           0%,100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
//           33% { transform: scale(1.15) rotate(120deg); opacity: 1; }
//           66% { transform: scale(1.05) rotate(240deg); opacity: 0.85; }
//         }

//         /* ============================================
//            MATRIX
//            ============================================ */
//         .matrix-col {
//           position: absolute;
//           top: -100%;
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//           font-family: monospace;
//           font-size: 12px;
//           color: var(--matrix-color);
//           text-shadow: 0 0 6px var(--particle-glow);
//           animation: matrixFall linear infinite;
//         }
//         @keyframes matrixFall {
//           0% { transform: translateY(0); opacity: 0; }
//           10% { opacity: 1; }
//           100% { transform: translateY(200vh); opacity: 0; }
//         }

//         /* ============================================
//            GRID
//            ============================================ */
//         .grid-overlay {
//           background-image:
//             linear-gradient(var(--grid-color) 1px, transparent 1px),
//             linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
//           background-size: 55px 55px;
//           mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
//           -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
//           animation: gridPan 18s linear infinite;
//         }
//         @keyframes gridPan {
//           0% { background-position: 0 0; }
//           100% { background-position: 55px 55px; }
//         }

//         /* ============================================
//            SCAN LINE
//            ============================================ */
//         .scan-line {
//           position: absolute;
//           left: 0; right: 0;
//           height: 140px;
//           background: linear-gradient(
//             to bottom,
//             transparent 0%,
//             rgba(34,211,238,0.05) 40%,
//             rgba(34,211,238,0.14) 50%,
//             rgba(34,211,238,0.05) 60%,
//             transparent 100%
//           );
//           animation: scanMove 3.5s linear infinite;
//         }
//         .light-mode .scan-line {
//           background: linear-gradient(
//             to bottom,
//             transparent 0%,
//             rgba(6,182,212,0.06) 40%,
//             rgba(6,182,212,0.16) 50%,
//             rgba(6,182,212,0.06) 60%,
//             transparent 100%
//           );
//         }
//         @keyframes scanMove {
//           0% { top: -140px; }
//           100% { top: 100%; }
//         }

//         /* ============================================
//            RADAR SWEEP
//            ============================================ */
//         .radar-sweep {
//           width: 700px; height: 700px;
//           border-radius: 50%;
//           background: conic-gradient(
//             from 0deg,
//             transparent 0deg,
//             transparent 340deg,
//             rgba(34,211,238,0.12) 355deg,
//             rgba(34,211,238,0.25) 360deg
//           );
//           animation: radarSpin 4s linear infinite;
//           mask-image: radial-gradient(circle, black 40%, transparent 70%);
//           -webkit-mask-image: radial-gradient(circle, black 40%, transparent 70%);
//         }
//         .light-mode .radar-sweep {
//           background: conic-gradient(
//             from 0deg,
//             transparent 0deg,
//             transparent 340deg,
//             rgba(6,182,212,0.15) 355deg,
//             rgba(6,182,212,0.3) 360deg
//           );
//         }
//         @keyframes radarSpin {
//           to { transform: rotate(360deg); }
//         }

//         /* ============================================
//            PARTICLES
//            ============================================ */
//         .particle {
//           position: absolute;
//           border-radius: 50%;
//           background: radial-gradient(circle, #67e8f9 0%, #22d3ee 40%, transparent 75%);
//           box-shadow: 0 0 8px var(--particle-glow);
//           animation: particleFloat linear infinite;
//         }
//         .light-mode .particle {
//           background: radial-gradient(circle, #0891b2 0%, #06b6d4 40%, transparent 75%);
//         }
//         @keyframes particleFloat {
//           0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
//           10% { opacity: 1; }
//           90% { opacity: 1; }
//           100% { transform: translateY(-120px) translateX(40px) scale(0.4); opacity: 0; }
//         }

//         /* ============================================
//            SHOOTING STARS
//            ============================================ */
//         .shooting-star {
//           position: absolute;
//           width: 2px; height: 2px;
//           background: #67e8f9;
//           border-radius: 50%;
//           box-shadow: 0 0 8px 2px rgba(103,232,249,0.9);
//           animation: shoot linear infinite;
//           opacity: 0;
//         }
//         .light-mode .shooting-star {
//           background: #0891b2;
//           box-shadow: 0 0 8px 2px rgba(6,182,212,0.8);
//         }
//         .shooting-star::after {
//           content: "";
//           position: absolute;
//           top: 50%; right: 0;
//           width: 90px; height: 1px;
//           transform: translateY(-50%);
//           background: linear-gradient(to left, rgba(103,232,249,0.9), transparent);
//         }
//         .light-mode .shooting-star::after {
//           background: linear-gradient(to left, rgba(6,182,212,0.9), transparent);
//         }
//         @keyframes shoot {
//           0% { transform: translate(0,0) rotate(-35deg); opacity: 0; }
//           5% { opacity: 1; }
//           35% { transform: translate(500px, 350px) rotate(-35deg); opacity: 0; }
//           100% { transform: translate(500px, 350px) rotate(-35deg); opacity: 0; }
//         }

//         /* ============================================
//            LENS FLARE
//            ============================================ */
//         .lens-flare {
//           width: 400px; height: 400px;
//           border-radius: 50%;
//           background: radial-gradient(
//             circle,
//             rgba(34,211,238,0.12) 0%,
//             rgba(34,211,238,0.04) 30%,
//             transparent 70%
//           );
//           animation: flarePulse 3s ease-in-out infinite;
//         }
//         .light-mode .lens-flare {
//           background: radial-gradient(
//             circle,
//             rgba(6,182,212,0.18) 0%,
//             rgba(6,182,212,0.06) 30%,
//             transparent 70%
//           );
//         }
//         @keyframes flarePulse {
//           0%,100% { transform: scale(1); opacity: 0.6; }
//           50% { transform: scale(1.3); opacity: 1; }
//         }

//         /* ============================================
//            LOADER WRAPPER
//            ============================================ */
//         .loader-wrapper {
//           position: relative;
//           width: 240px;
//           height: 240px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .electric-arc {
//           position: absolute;
//           inset: 20px;
//           border-radius: 50%;
//           border: 2px solid transparent;
//           border-top-color: rgba(103,232,249,0.9);
//           border-right-color: rgba(34,211,238,0.3);
//           filter: drop-shadow(0 0 6px rgba(103,232,249,1));
//           animation: arcRotate 2s linear infinite;
//         }
//         .light-mode .electric-arc {
//           border-top-color: rgba(6,182,212,0.9);
//           border-right-color: rgba(6,182,212,0.35);
//           filter: drop-shadow(0 0 6px rgba(6,182,212,0.8));
//         }
//         .arc-1 { animation-duration: 2s; }
//         .arc-2 {
//           inset: 32px;
//           border-top-color: rgba(59,130,246,0.8);
//           border-left-color: rgba(59,130,246,0.3);
//           animation-duration: 1.6s;
//           animation-direction: reverse;
//         }
//         .light-mode .arc-2 {
//           border-top-color: rgba(99,102,241,0.85);
//           border-left-color: rgba(99,102,241,0.35);
//         }
//         .arc-3 {
//           inset: 44px;
//           border-bottom-color: rgba(139,92,246,0.7);
//           border-right-color: rgba(139,92,246,0.3);
//           animation-duration: 2.4s;
//         }
//         .light-mode .arc-3 {
//           border-bottom-color: rgba(168,85,247,0.75);
//           border-right-color: rgba(168,85,247,0.35);
//         }
//         @keyframes arcRotate {
//           to { transform: rotate(360deg); }
//         }

//         .ripple {
//           position: absolute;
//           width: 120px; height: 120px;
//           border-radius: 50%;
//           border: 2px solid rgba(34,211,238,0.7);
//           animation: rippleExpand 1.6s ease-out infinite;
//         }
//         .light-mode .ripple {
//           border-color: rgba(6,182,212,0.7);
//         }
//         .ripple-2 { animation-delay: 0.8s; }
//         @keyframes rippleExpand {
//           0% {
//             transform: scale(0.4);
//             opacity: 1;
//             border-width: 3px;
//           }
//           100% {
//             transform: scale(2.4);
//             opacity: 0;
//             border-width: 1px;
//           }
//         }

//         .beam {
//           position: absolute;
//           width: 2px;
//           height: 60px;
//           background: linear-gradient(to top, transparent, rgba(34,211,238,0.8), transparent);
//           transform-origin: bottom center;
//           animation: beamSpin 4s linear infinite;
//           filter: blur(0.5px);
//         }
//         .light-mode .beam {
//           background: linear-gradient(to top, transparent, rgba(6,182,212,0.85), transparent);
//         }
//         .beam-1 { top: 0; left: 50%; transform: translateX(-50%); }
//         .beam-2 { top: 50%; right: 0; transform: translateY(-50%); animation-delay: -1s; }
//         .beam-3 { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: -2s; }
//         .beam-4 { top: 50%; left: 0; transform: translateY(-50%); animation-delay: -3s; }
//         @keyframes beamSpin {
//           0% { opacity: 0.4; }
//           50% { opacity: 1; }
//           100% { opacity: 0.4; }
//         }

//         .orbit-dots {
//           position: absolute;
//           inset: 0;
//           animation: spinCW 7s linear infinite;
//         }
//         .orbit-dot {
//           position: absolute;
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: #67e8f9;
//           box-shadow: 0 0 12px rgba(34,211,238,1), 0 0 24px rgba(34,211,238,0.5);
//         }
//         .light-mode .orbit-dot {
//           background: #06b6d4;
//           box-shadow: 0 0 12px rgba(6,182,212,1), 0 0 24px rgba(6,182,212,0.5);
//         }
//         .dot-1 { top: 0; left: 50%; transform: translate(-50%, -50%); }
//         .dot-2 { bottom: 20%; right: 0; transform: translate(50%, 50%); }
//         .dot-3 { bottom: 20%; left: 0; transform: translate(-50%, 50%); }

//         .ring {
//           position: absolute;
//           border-radius: 50%;
//           border: 1px solid transparent;
//         }
//         .ring-outer {
//           inset: 0;
//           border-top-color: rgba(34,211,238,0.5);
//           border-right-color: rgba(34,211,238,0.15);
//           animation: spinCW 5s linear infinite;
//           filter: drop-shadow(0 0 6px rgba(34,211,238,0.6));
//         }
//         .light-mode .ring-outer {
//           border-top-color: rgba(6,182,212,0.6);
//           border-right-color: rgba(6,182,212,0.2);
//         }
//         .ring-middle {
//           inset: 22px;
//           border-bottom-color: rgba(56,189,248,0.4);
//           border-left-color: rgba(56,189,248,0.1);
//           animation: spinCCW 4s linear infinite;
//           filter: drop-shadow(0 0 5px rgba(56,189,248,0.5));
//         }
//         .light-mode .ring-middle {
//           border-bottom-color: rgba(99,102,241,0.5);
//           border-left-color: rgba(99,102,241,0.15);
//         }
//         .ring-inner {
//           inset: 46px;
//           border-top-color: rgba(103,232,249,0.35);
//           border-left-color: rgba(103,232,249,0.1);
//           animation: spinCW 2.8s linear infinite;
//         }
//         .light-mode .ring-inner {
//           border-top-color: rgba(6,182,212,0.5);
//           border-left-color: rgba(6,182,212,0.15);
//         }
//         @keyframes spinCW { to { transform: rotate(360deg); } }
//         @keyframes spinCCW { to { transform: rotate(-360deg); } }

//         .gemini-loader {
//           position: relative;
//           width: 120px; height: 120px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           filter: drop-shadow(0 0 30px rgba(34,211,238,0.45));
//         }
//         .light-mode .gemini-loader {
//           filter: drop-shadow(0 0 30px rgba(6,182,212,0.5));
//         }
//         .gemini-core {
//           position: absolute;
//           width: 14px; height: 14px;
//           border-radius: 50%;
//           background: radial-gradient(circle, #ffffff 0%, #67e8f9 40%, #22d3ee 70%, transparent 100%);
//           box-shadow:
//             0 0 20px rgba(34,211,238,1),
//             0 0 40px rgba(34,211,238,0.6),
//             0 0 70px rgba(34,211,238,0.35);
//           animation: corePulse 1.1s ease-in-out infinite;
//           z-index: 5;
//         }
//         .light-mode .gemini-core {
//           background: radial-gradient(circle, #ffffff 0%, #22d3ee 40%, #0891b2 70%, transparent 100%);
//           box-shadow:
//             0 0 20px rgba(6,182,212,1),
//             0 0 40px rgba(6,182,212,0.7),
//             0 0 70px rgba(6,182,212,0.4);
//         }
//         .gemini-core-halo {
//           position: absolute;
//           width: 60px; height: 60px;
//           border-radius: 50%;
//           background: radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%);
//           animation: haloPulse 1.6s ease-in-out infinite;
//           z-index: 1;
//         }
//         .light-mode .gemini-core-halo {
//           background: radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%);
//         }
//         @keyframes corePulse {
//           0%,100% { transform: scale(1); opacity: 1; }
//           50% { transform: scale(1.5); opacity: 0.75; }
//         }
//         @keyframes haloPulse {
//           0%,100% { transform: scale(1); opacity: 0.6; }
//           50% { transform: scale(1.8); opacity: 0.2; }
//         }

//         .gemini-triangle {
//           position: absolute;
//           width: 0; height: 0;
//           border-style: solid;
//           border-width: 0 26px 45px 26px;
//           border-color: transparent transparent rgba(34,211,238,0.9) transparent;
//           filter: drop-shadow(0 0 10px rgba(34,211,238,0.7));
//           transform-origin: 50% 70%;
//           animation-duration: 1.6s;
//           animation-iteration-count: infinite;
//           animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
//           opacity: 0.92;
//         }
//         .light-mode .gemini-triangle {
//           filter: drop-shadow(0 0 10px rgba(6,182,212,0.6));
//         }
//         .tri-1 { animation-name: orbit1; border-bottom-color: rgba(34,211,238,1); }
//         .tri-2 { animation-name: orbit2; border-bottom-color: rgba(56,189,248,0.9); }
//         .tri-3 { animation-name: orbit3; border-bottom-color: rgba(103,232,249,0.85); }
//         .light-mode .tri-1 { border-bottom-color: rgba(8,145,178,1); }
//         .light-mode .tri-2 { border-bottom-color: rgba(6,182,212,0.95); }
//         .light-mode .tri-3 { border-bottom-color: rgba(34,211,238,0.9); }

//         @keyframes orbit1 {
//           0%   { transform: rotate(0deg) translateY(-34px) rotate(0deg) scale(1); opacity: 0.95; }
//           33%  { transform: rotate(120deg) translateY(-34px) rotate(-120deg) scale(1.18); opacity: 1; }
//           66%  { transform: rotate(240deg) translateY(-34px) rotate(-240deg) scale(0.88); opacity: 0.8; }
//           100% { transform: rotate(360deg) translateY(-34px) rotate(-360deg) scale(1); opacity: 0.95; }
//         }
//         @keyframes orbit2 {
//           0%   { transform: rotate(120deg) translateY(-34px) rotate(-120deg) scale(0.88); opacity: 0.8; }
//           33%  { transform: rotate(240deg) translateY(-34px) rotate(-240deg) scale(1); opacity: 0.95; }
//           66%  { transform: rotate(360deg) translateY(-34px) rotate(-360deg) scale(1.18); opacity: 1; }
//           100% { transform: rotate(480deg) translateY(-34px) rotate(-480deg) scale(0.88); opacity: 0.8; }
//         }
//         @keyframes orbit3 {
//           0%   { transform: rotate(240deg) translateY(-34px) rotate(-240deg) scale(1.18); opacity: 1; }
//           33%  { transform: rotate(360deg) translateY(-34px) rotate(-360deg) scale(0.88); opacity: 0.8; }
//           66%  { transform: rotate(480deg) translateY(-34px) rotate(-480deg) scale(1); opacity: 0.95; }
//           100% { transform: rotate(600deg) translateY(-34px) rotate(-600deg) scale(1.18); opacity: 1; }
//         }

//         .sound-wave {
//           position: absolute;
//           width: 120px; height: 120px;
//           border-radius: 50%;
//           border: 1px solid rgba(34,211,238,0.5);
//           animation: waveEmit 2s ease-out infinite;
//         }
//         .light-mode .sound-wave {
//           border-color: rgba(6,182,212,0.6);
//         }
//         .sw-1 { animation-delay: 0s; }
//         .sw-2 { animation-delay: 0.66s; }
//         .sw-3 { animation-delay: 1.33s; }
//         @keyframes waveEmit {
//           0% { transform: scale(0.6); opacity: 0.9; border-color: rgba(34,211,238,0.8); }
//           100% { transform: scale(2.2); opacity: 0; border-color: rgba(34,211,238,0); }
//         }

//         .spark {
//           position: absolute;
//           top: 50%; left: 50%;
//           border-radius: 50%;
//           background: radial-gradient(circle, #ffffff 0%, #67e8f9 50%, transparent 100%);
//           box-shadow: 0 0 10px rgba(103,232,249,1);
//           pointer-events: none;
//           animation: sparkFly linear forwards;
//         }
//         .light-mode .spark {
//           background: radial-gradient(circle, #ffffff 0%, #22d3ee 50%, transparent 100%);
//           box-shadow: 0 0 10px rgba(6,182,212,1);
//         }
//         @keyframes sparkFly {
//           0% {
//             transform: translate(-50%, -50%) translate(0,0) scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: translate(-50%, -50%) translate(var(--spark-x), var(--spark-y)) scale(0.2);
//             opacity: 0;
//           }
//         }

//         .letter {
//           display: inline-block;
//           opacity: 0;
//           transform: translateY(24px) rotateX(-90deg);
//           animation: letterReveal 500ms cubic-bezier(.22,1,.36,1) forwards;
//         }
//         .letter-1 { animation-delay: 480ms; }
//         .letter-2 { animation-delay: 550ms; }
//         .letter-3 { animation-delay: 620ms; }
//         .letter-4 { animation-delay: 690ms; }
//         .letter-5 { animation-delay: 760ms; }
//         .letter-6 { animation-delay: 870ms; }
//         .letter-7 { animation-delay: 940ms; }

//         @keyframes letterReveal {
//           0% { opacity: 0; transform: translateY(24px) rotateX(-90deg); filter: blur(8px); }
//           100% { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }
//         }

//         .chroma-flicker {
//           animation: chromaFlicker 3s ease-in-out infinite;
//           animation-delay: 1.5s;
//         }
//         @keyframes chromaFlicker {
//           0%, 92%, 100% { text-shadow: none; }
//           93% { text-shadow: -2px 0 rgba(255,0,80,0.7), 2px 0 rgba(0,255,255,0.7); }
//           94% { text-shadow: 2px 0 rgba(255,0,80,0.7), -2px 0 rgba(0,255,255,0.7); }
//           95% { text-shadow: -1px 0 rgba(255,0,80,0.5), 1px 0 rgba(0,255,255,0.5); }
//         }

//         .glow-text {
//           text-shadow: 0 0 20px rgba(255,255,255,0.35);
//         }
//         .light-mode .glow-text {
//           text-shadow: 0 0 16px rgba(100,116,139,0.25);
//         }
//         .glow-text-cyan {
//           text-shadow:
//             0 0 14px rgba(34,211,238,0.9),
//             0 0 30px rgba(34,211,238,0.5);
//         }
//         .light-mode .glow-text-cyan {
//           text-shadow:
//             0 0 12px rgba(6,182,212,0.6),
//             0 0 24px rgba(6,182,212,0.3);
//         }

//         .splash-divider {
//           animation: dividerGrow 700ms 1050ms cubic-bezier(.22,1,.36,1) both;
//         }
//         .splash-subtitle {
//           animation: splashSubtitle 500ms 1150ms cubic-bezier(.22,1,.36,1) both;
//         }
//         .bottom-text {
//           animation: splashSubtitle 600ms 1300ms cubic-bezier(.22,1,.36,1) both;
//         }
//         @keyframes splashSubtitle {
//           0% { opacity: 0; transform: translateY(12px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes dividerGrow {
//           0% { opacity: 0; transform: scaleX(0); }
//           100% { opacity: 1; transform: scaleX(1); }
//         }

//         .shimmer {
//           background: linear-gradient(
//             90deg,
//             transparent 0%,
//             rgba(34,211,238,0.35) 50%,
//             transparent 100%
//           );
//           animation: shimmerMove 1.2s linear infinite;
//         }
//         .light-mode .shimmer {
//           background: linear-gradient(
//             90deg,
//             transparent 0%,
//             rgba(6,182,212,0.4) 50%,
//             transparent 100%
//           );
//         }
//         @keyframes shimmerMove {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }

//         .animate-ping-slow {
//           animation: pingSlow 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
//         @keyframes pingSlow {
//           0% { transform: translate(50%, -50%) scale(1); opacity: 1; }
//           75%, 100% { transform: translate(50%, -50%) scale(2); opacity: 0; }
//         }

//         .animate-pulse-slow {
//           animation: ambientPulse 3.5s ease-in-out infinite;
//         }
//         @keyframes ambientPulse {
//           0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
//           50% { opacity: 0.9; transform: translate(-50%,-50%) scale(1.15); }
//         }

//         .theme-toggle {
//           transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
//         }
//         .theme-toggle::before {
//           content: "";
//           position: absolute;
//           inset: -6px;
//           border-radius: 9999px;
//           background: radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%);
//           opacity: 0;
//           transition: opacity 400ms ease;
//         }
//         .theme-toggle:hover::before {
//           opacity: 1;
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("boot");
  const [sparks, setSparks] = useState([]);
  const [isRestarting, setIsRestarting] = useState(false);
  const sparkIdRef = useRef(0);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    return "dark";
  });

  const isLight = theme === "light";

  const toggleTheme = useCallback(() => {
    setIsRestarting(true);
    setProgress(0);
    setPhase("boot");
    setSparks([]);
    sparkIdRef.current = 0;
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    setTimeout(() => setIsRestarting(false), 350);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 4 + 4,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [theme]
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        top: Math.random() * 60,
        left: Math.random() * 40,
        delay: Math.random() * 5,
        duration: Math.random() * 1.5 + 2,
      })),
    [theme]
  );

  const matrixColumns = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: (i / 14) * 100 + Math.random() * 4,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 4,
        chars: Array.from({ length: 18 }, () =>
          "01アイウエオカキクケコ".charAt(Math.floor(Math.random() * 19))
        ),
      })),
    [theme]
  );

  useEffect(() => {
    if (isRestarting) return;

    const duration = 1800;
    const intervalTime = 16;
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setPhase("ready");
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        if (next > 25 && phase === "boot") setPhase("reveal");
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete, isRestarting, theme]);

  useEffect(() => {
    if (isRestarting) return;

    const sparkInterval = setInterval(() => {
      const newSparks = Array.from({ length: 8 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 160 + 60;
        return {
          id: sparkIdRef.current++,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          size: Math.random() * 3 + 2,
          duration: Math.random() * 0.6 + 0.6,
        };
      });
      setSparks((prev) => [...prev.slice(-20), ...newSparks]);
    }, 600);

    return () => clearInterval(sparkInterval);
  }, [isRestarting, theme]);

  const themeKey = theme + "-" + (isRestarting ? "r" : "n");

  return (
    <div
      className={`splash-root fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden antialiased transition-colors duration-700 ${
        isLight
          ? "bg-[#dbe7f5] text-slate-900 light-mode"
          : "bg-[#030407] text-white dark-mode"
      }`}
    >
      {/* LIGHT MODE MULTI-LAYER BACKGROUND */}
      {isLight && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0fb] via-[#d4e4f7] to-[#c5d9f0]" />
          <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-cyan-300/30 blur-[140px]" />
          <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-300/30 blur-[140px]" />
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/40 blur-[160px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(180,200,230,0.35)_70%,rgba(140,170,210,0.55)_100%)]" />
          <div className="absolute inset-0 light-noise" />
        </div>
      )}

      {isRestarting && (
        <div className="pointer-events-none absolute inset-0 z-50 theme-flash" />
      )}

      {/* AURORA */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </div>

      {/* PLASMA ORB */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="plasma-orb" />
      </div>

      {/* MATRIX */}
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${
          isLight ? "opacity-[0.06]" : "opacity-[0.08]"
        }`}
      >
        {matrixColumns.map((col) => (
          <div
            key={`${theme}-${col.id}`}
            className="matrix-col"
            style={{
              left: `${col.left}%`,
              animationDelay: `${col.delay}s`,
              animationDuration: `${col.duration}s`,
            }}
          >
            {col.chars.map((c, idx) => (
              <span key={idx}>{c}</span>
            ))}
          </div>
        ))}
      </div>

      {/* GRID */}
      <div className="pointer-events-none absolute inset-0 grid-overlay" />

      {/* VIGNETTE (only dark now) */}
      {!isLight && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_60%,rgba(0,0,0,0.95)_100%)]" />
      )}

      {/* PARTICLES */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <span
            key={`${theme}-${p.id}`}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* SHOOTING STARS */}
      <div className="pointer-events-none absolute inset-0">
        {shootingStars.map((s) => (
          <span
            key={`${theme}-${s.id}`}
            className="shooting-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* CORNER GLOWS */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-blue-500/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.05] blur-[140px] animate-pulse-slow" />

      {/* THEME TOGGLE */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme and restart"
        className={`theme-toggle fixed right-5 top-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 hover:scale-110 active:scale-95 ${
          isLight
            ? "border-slate-300/70 bg-white/70 text-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            : "border-cyan-400/30 bg-white/5 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
        }`}
      >
        <span className="relative block h-5 w-5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
              isLight ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
            }`}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
              isLight ? "-rotate-180 opacity-0" : "rotate-0 opacity-100"
            }`}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
      </button>

      {/* MAIN CONTENT */}
      <div className="relative flex w-full flex-col items-center px-6">
        <div className="loader-wrapper">
          <div className="electric-arc arc-1" />
          <div className="electric-arc arc-2" />
          <div className="electric-arc arc-3" />

          <div className="ripple ripple-1" />
          <div className="ripple ripple-2" />

          <div className="ring ring-outer" />
          <div className="ring ring-middle" />
          <div className="ring ring-inner" />

          <div className="gemini-loader">
            <div className="gemini-triangle tri-1" />
            <div className="gemini-triangle tri-2" />
            <div className="gemini-triangle tri-3" />
            <div className="gemini-core" />
            <div className="gemini-core-halo" />
          </div>

          <div className="sound-wave sw-1" />
          <div className="sound-wave sw-2" />
          <div className="sound-wave sw-3" />

          {sparks.map((s) => (
            <span
              key={s.id}
              className="spark"
              style={{
                "--spark-x": `${s.x}px`,
                "--spark-y": `${s.y}px`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>

        {/* BRAND */}
        <div className="mt-10 text-center" key={themeKey}>
          <h1 className="text-4xl font-bold tracking-[-0.03em] flex items-center justify-center chroma-flicker">
            <span className={`letter letter-1 glow-text ${isLight ? "text-slate-800" : "text-white"}`}>J</span>
            <span className={`letter letter-2 glow-text ${isLight ? "text-slate-800" : "text-white"}`}>E</span>
            <span className={`letter letter-3 glow-text ${isLight ? "text-slate-800" : "text-white"}`}>E</span>
            <span className={`letter letter-4 glow-text ${isLight ? "text-slate-800" : "text-white"}`}>V</span>
            <span className={`letter letter-5 glow-text ${isLight ? "text-slate-800" : "text-white"}`}>A</span>
            <span className="ml-2 letter letter-6 text-cyan-600 glow-text-cyan">A</span>
            <span className="letter letter-7 text-cyan-600 glow-text-cyan">I</span>
          </h1>
          <div
            className={`splash-divider mx-auto mt-3 h-[1px] w-40 ${
              isLight
                ? "bg-gradient-to-r from-transparent via-cyan-600/70 to-transparent"
                : "bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
            }`}
          />
          <p
            className={`splash-subtitle mt-3 text-sm tracking-wide ${
              isLight ? "text-slate-600" : "text-zinc-500"
            }`}
          >
            Voice AI Platform
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-10 w-full max-w-[280px]">
          <div
            className={`relative h-[3px] overflow-hidden rounded-full ${
              isLight ? "bg-slate-900/[0.12]" : "bg-white/[0.08]"
            }`}
          >
            <div className="absolute inset-0 shimmer" />
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 transition-[width] duration-75 ease-linear"
              style={{
                width: `${progress}%`,
                boxShadow: isLight
                  ? "0 0 10px rgba(6,182,212,0.6)"
                  : "0 0 14px rgba(34,211,238,0.8)",
              }}
            >
              <div
                className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-500 animate-ping-slow"
                style={{
                  boxShadow: isLight
                    ? "0 0 10px rgba(6,182,212,0.9)"
                    : "0 0 14px rgba(34,211,238,1)",
                }}
              />
            </div>
          </div>

          <div
            className={`mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] ${
              isLight ? "text-slate-600" : "text-zinc-600"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="inline-block h-1 w-1 animate-ping rounded-full bg-cyan-500" />
              {isRestarting
                ? "Restarting"
                : phase === "ready"
                ? "Ready"
                : "Initializing"}
            </span>
            <span
              className={`font-mono ${
                isLight ? "text-cyan-700" : "text-cyan-400/70"
              }`}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="absolute bottom-7 left-0 right-0 text-center">
        <p
          className={`bottom-text text-[10px] tracking-[0.35em] ${
            isLight ? "text-slate-500" : "text-zinc-700"
          }`}
        >
          POWERED BY JEEVA AI
        </p>
      </div>

      <style>{`
        .dark-mode {
          --grid-color: rgba(34,211,238,0.045);
          --particle-glow: rgba(34,211,238,0.7);
          --matrix-color: #22d3ee;
        }
        .light-mode {
          --grid-color: rgba(30,64,120,0.28);
          --particle-glow: rgba(6,182,212,0.8);
          --matrix-color: #0891b2;
        }

        .splash-root,
        .splash-root * {
          transition-property: color, background-color, border-color, box-shadow, opacity;
          transition-duration: 500ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Light mode subtle noise/texture */
        .light-noise {
          background-image:
            radial-gradient(rgba(100,130,180,0.08) 1px, transparent 1px),
            radial-gradient(rgba(100,130,180,0.06) 1px, transparent 1px);
          background-size: 22px 22px, 40px 40px;
          background-position: 0 0, 11px 11px;
          mix-blend-mode: multiply;
          opacity: 0.7;
        }

        .theme-flash {
          background: radial-gradient(
            circle at center,
            rgba(34,211,238,0.55) 0%,
            rgba(34,211,238,0.15) 40%,
            transparent 70%
          );
          animation: flashExpand 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes flashExpand {
          0% { opacity: 0; transform: scale(0.4); }
          40% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2.2); }
        }

        .aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          mix-blend-mode: screen;
        }
        .dark-mode .aurora { opacity: 0.55; }
        .light-mode .aurora { opacity: 0.55; mix-blend-mode: multiply; }

        .aurora-1 {
          width: 55%; height: 55%; top: -10%; left: -10%;
          background: radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 65%);
          animation: auroraFloat1 10s ease-in-out infinite;
        }
        .light-mode .aurora-1 {
          background: radial-gradient(circle, rgba(8,145,178,0.45) 0%, transparent 65%);
        }
        .aurora-2 {
          width: 60%; height: 60%; bottom: -15%; right: -15%;
          background: radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 65%);
          animation: auroraFloat2 12s ease-in-out infinite;
        }
        .light-mode .aurora-2 {
          background: radial-gradient(circle, rgba(79,70,229,0.4) 0%, transparent 65%);
        }
        .aurora-3 {
          width: 45%; height: 45%; top: 40%; left: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 65%);
          animation: auroraFloat3 14s ease-in-out infinite;
        }
        .light-mode .aurora-3 {
          background: radial-gradient(circle, rgba(147,51,234,0.35) 0%, transparent 65%);
        }
        @keyframes auroraFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(80px,60px) scale(1.15); }
        }
        @keyframes auroraFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-70px,-50px) scale(1.2); }
        }
        @keyframes auroraFloat3 {
          0%,100% { transform: translate(-50%,-50%) scale(1); }
          50% { transform: translate(-45%,-55%) scale(1.25); }
        }

        .plasma-orb {
          position: absolute;
          top: 50%; left: 50%;
          width: 500px; height: 500px;
          margin-left: -250px; margin-top: -250px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 30%, rgba(34,211,238,0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(139,92,246,0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(59,130,246,0.12) 0%, transparent 50%);
          filter: blur(40px);
          animation: plasmaShift 8s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        .light-mode .plasma-orb {
          background:
            radial-gradient(circle at 30% 30%, rgba(6,182,212,0.28) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(168,85,247,0.24) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(99,102,241,0.22) 0%, transparent 50%);
          mix-blend-mode: multiply;
        }
        @keyframes plasmaShift {
          0%,100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
          33% { transform: scale(1.15) rotate(120deg); opacity: 1; }
          66% { transform: scale(1.05) rotate(240deg); opacity: 0.85; }
        }

        .matrix-col {
          position: absolute;
          top: -100%;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: monospace;
          font-size: 12px;
          color: var(--matrix-color);
          text-shadow: 0 0 6px var(--particle-glow);
          animation: matrixFall linear infinite;
        }
        @keyframes matrixFall {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(200vh); opacity: 0; }
        }

        .grid-overlay {
          background-image:
            linear-gradient(var(--grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 55px 55px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
          animation: gridPan 18s linear infinite;
        }
        @keyframes gridPan {
          0% { background-position: 0 0; }
          100% { background-position: 55px 55px; }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #67e8f9 0%, #22d3ee 40%, transparent 75%);
          box-shadow: 0 0 8px var(--particle-glow);
          animation: particleFloat linear infinite;
        }
        .light-mode .particle {
          background: radial-gradient(circle, #0891b2 0%, #06b6d4 40%, transparent 75%);
        }
        @keyframes particleFloat {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120px) translateX(40px) scale(0.4); opacity: 0; }
        }

        .shooting-star {
          position: absolute;
          width: 2px; height: 2px;
          background: #67e8f9;
          border-radius: 50%;
          box-shadow: 0 0 8px 2px rgba(103,232,249,0.9);
          animation: shoot linear infinite;
          opacity: 0;
        }
        .light-mode .shooting-star {
          background: #0891b2;
          box-shadow: 0 0 8px 2px rgba(6,182,212,0.8);
        }
        .shooting-star::after {
          content: "";
          position: absolute;
          top: 50%; right: 0;
          width: 90px; height: 1px;
          transform: translateY(-50%);
          background: linear-gradient(to left, rgba(103,232,249,0.9), transparent);
        }
        .light-mode .shooting-star::after {
          background: linear-gradient(to left, rgba(6,182,212,0.9), transparent);
        }
        @keyframes shoot {
          0% { transform: translate(0,0) rotate(-35deg); opacity: 0; }
          5% { opacity: 1; }
          35% { transform: translate(500px, 350px) rotate(-35deg); opacity: 0; }
          100% { transform: translate(500px, 350px) rotate(-35deg); opacity: 0; }
        }

        .loader-wrapper {
          position: relative;
          width: 240px;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .electric-arc {
          position: absolute;
          inset: 20px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: rgba(103,232,249,0.9);
          border-right-color: rgba(34,211,238,0.3);
          filter: drop-shadow(0 0 6px rgba(103,232,249,1));
          animation: arcRotate 2s linear infinite;
        }
        .light-mode .electric-arc {
          border-top-color: rgba(6,182,212,0.95);
          border-right-color: rgba(6,182,212,0.4);
          filter: drop-shadow(0 0 6px rgba(6,182,212,0.9));
        }
        .arc-1 { animation-duration: 2s; }
        .arc-2 {
          inset: 32px;
          border-top-color: rgba(59,130,246,0.8);
          border-left-color: rgba(59,130,246,0.3);
          animation-duration: 1.6s;
          animation-direction: reverse;
        }
        .light-mode .arc-2 {
          border-top-color: rgba(99,102,241,0.9);
          border-left-color: rgba(99,102,241,0.4);
        }
        .arc-3 {
          inset: 44px;
          border-bottom-color: rgba(139,92,246,0.7);
          border-right-color: rgba(139,92,246,0.3);
          animation-duration: 2.4s;
        }
        .light-mode .arc-3 {
          border-bottom-color: rgba(168,85,247,0.85);
          border-right-color: rgba(168,85,247,0.4);
        }
        @keyframes arcRotate {
          to { transform: rotate(360deg); }
        }

        .ripple {
          position: absolute;
          width: 120px; height: 120px;
          border-radius: 50%;
          border: 2px solid rgba(34,211,238,0.7);
          animation: rippleExpand 1.6s ease-out infinite;
        }
        .light-mode .ripple {
          border-color: rgba(6,182,212,0.85);
        }
        .ripple-2 { animation-delay: 0.8s; }
        @keyframes rippleExpand {
          0% {
            transform: scale(0.4);
            opacity: 1;
            border-width: 3px;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
            border-width: 1px;
          }
        }

        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
        }
        .ring-outer {
          inset: 0;
          border-top-color: rgba(34,211,238,0.5);
          border-right-color: rgba(34,211,238,0.15);
          animation: spinCW 5s linear infinite;
          filter: drop-shadow(0 0 6px rgba(34,211,238,0.6));
        }
        .light-mode .ring-outer {
          border-top-color: rgba(6,182,212,0.75);
          border-right-color: rgba(6,182,212,0.25);
        }
        .ring-middle {
          inset: 22px;
          border-bottom-color: rgba(56,189,248,0.4);
          border-left-color: rgba(56,189,248,0.1);
          animation: spinCCW 4s linear infinite;
          filter: drop-shadow(0 0 5px rgba(56,189,248,0.5));
        }
        .light-mode .ring-middle {
          border-bottom-color: rgba(99,102,241,0.7);
          border-left-color: rgba(99,102,241,0.2);
        }
        .ring-inner {
          inset: 46px;
          border-top-color: rgba(103,232,249,0.35);
          border-left-color: rgba(103,232,249,0.1);
          animation: spinCW 2.8s linear infinite;
        }
        .light-mode .ring-inner {
          border-top-color: rgba(6,182,212,0.65);
          border-left-color: rgba(6,182,212,0.2);
        }
        @keyframes spinCW { to { transform: rotate(360deg); } }
        @keyframes spinCCW { to { transform: rotate(-360deg); } }

        .gemini-loader {
          position: relative;
          width: 120px; height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 30px rgba(34,211,238,0.45));
        }
        .light-mode .gemini-loader {
          filter: drop-shadow(0 0 30px rgba(6,182,212,0.55));
        }
        .gemini-core {
          position: absolute;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 0%, #67e8f9 40%, #22d3ee 70%, transparent 100%);
          box-shadow:
            0 0 20px rgba(34,211,238,1),
            0 0 40px rgba(34,211,238,0.6),
            0 0 70px rgba(34,211,238,0.35);
          animation: corePulse 1.1s ease-in-out infinite;
          z-index: 5;
        }
        .light-mode .gemini-core {
          background: radial-gradient(circle, #ffffff 0%, #22d3ee 40%, #0891b2 70%, transparent 100%);
          box-shadow:
            0 0 20px rgba(6,182,212,1),
            0 0 40px rgba(6,182,212,0.7),
            0 0 70px rgba(6,182,212,0.4);
        }
        .gemini-core-halo {
          position: absolute;
          width: 60px; height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%);
          animation: haloPulse 1.6s ease-in-out infinite;
          z-index: 1;
        }
        .light-mode .gemini-core-halo {
          background: radial-gradient(circle, rgba(6,182,212,0.45) 0%, transparent 70%);
        }
        @keyframes corePulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.75; }
        }
        @keyframes haloPulse {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.8); opacity: 0.2; }
        }

        .gemini-triangle {
          position: absolute;
          width: 0; height: 0;
          border-style: solid;
          border-width: 0 26px 45px 26px;
          border-color: transparent transparent rgba(34,211,238,0.9) transparent;
          filter: drop-shadow(0 0 10px rgba(34,211,238,0.7));
          transform-origin: 50% 70%;
          animation-duration: 1.6s;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
          opacity: 0.92;
        }
        .light-mode .gemini-triangle {
          filter: drop-shadow(0 0 10px rgba(6,182,212,0.7));
        }
        .tri-1 { animation-name: orbit1; border-bottom-color: rgba(34,211,238,1); }
        .tri-2 { animation-name: orbit2; border-bottom-color: rgba(56,189,248,0.9); }
        .tri-3 { animation-name: orbit3; border-bottom-color: rgba(103,232,249,0.85); }
        .light-mode .tri-1 { border-bottom-color: rgba(8,145,178,1); }
        .light-mode .tri-2 { border-bottom-color: rgba(6,182,212,0.95); }
        .light-mode .tri-3 { border-bottom-color: rgba(34,211,238,0.9); }

        @keyframes orbit1 {
          0%   { transform: rotate(0deg) translateY(-34px) rotate(0deg) scale(1); opacity: 0.95; }
          33%  { transform: rotate(120deg) translateY(-34px) rotate(-120deg) scale(1.18); opacity: 1; }
          66%  { transform: rotate(240deg) translateY(-34px) rotate(-240deg) scale(0.88); opacity: 0.8; }
          100% { transform: rotate(360deg) translateY(-34px) rotate(-360deg) scale(1); opacity: 0.95; }
        }
        @keyframes orbit2 {
          0%   { transform: rotate(120deg) translateY(-34px) rotate(-120deg) scale(0.88); opacity: 0.8; }
          33%  { transform: rotate(240deg) translateY(-34px) rotate(-240deg) scale(1); opacity: 0.95; }
          66%  { transform: rotate(360deg) translateY(-34px) rotate(-360deg) scale(1.18); opacity: 1; }
          100% { transform: rotate(480deg) translateY(-34px) rotate(-480deg) scale(0.88); opacity: 0.8; }
        }
        @keyframes orbit3 {
          0%   { transform: rotate(240deg) translateY(-34px) rotate(-240deg) scale(1.18); opacity: 1; }
          33%  { transform: rotate(360deg) translateY(-34px) rotate(-360deg) scale(0.88); opacity: 0.8; }
          66%  { transform: rotate(480deg) translateY(-34px) rotate(-480deg) scale(1); opacity: 0.95; }
          100% { transform: rotate(600deg) translateY(-34px) rotate(-600deg) scale(1.18); opacity: 1; }
        }

        .sound-wave {
          position: absolute;
          width: 120px; height: 120px;
          border-radius: 50%;
          border: 1px solid rgba(34,211,238,0.5);
          animation: waveEmit 2s ease-out infinite;
        }
        .light-mode .sound-wave {
          border-color: rgba(6,182,212,0.7);
        }
        .sw-1 { animation-delay: 0s; }
        .sw-2 { animation-delay: 0.66s; }
        .sw-3 { animation-delay: 1.33s; }
        @keyframes waveEmit {
          0% { transform: scale(0.6); opacity: 0.9; border-color: rgba(34,211,238,0.8); }
          100% { transform: scale(2.2); opacity: 0; border-color: rgba(34,211,238,0); }
        }

        .spark {
          position: absolute;
          top: 50%; left: 50%;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 0%, #67e8f9 50%, transparent 100%);
          box-shadow: 0 0 10px rgba(103,232,249,1);
          pointer-events: none;
          animation: sparkFly linear forwards;
        }
        .light-mode .spark {
          background: radial-gradient(circle, #ffffff 0%, #22d3ee 50%, transparent 100%);
          box-shadow: 0 0 10px rgba(6,182,212,1);
        }
        @keyframes sparkFly {
          0% {
            transform: translate(-50%, -50%) translate(0,0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--spark-x), var(--spark-y)) scale(0.2);
            opacity: 0;
          }
        }

        .letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(24px) rotateX(-90deg);
          animation: letterReveal 500ms cubic-bezier(.22,1,.36,1) forwards;
        }
        .letter-1 { animation-delay: 480ms; }
        .letter-2 { animation-delay: 550ms; }
        .letter-3 { animation-delay: 620ms; }
        .letter-4 { animation-delay: 690ms; }
        .letter-5 { animation-delay: 760ms; }
        .letter-6 { animation-delay: 870ms; }
        .letter-7 { animation-delay: 940ms; }

        @keyframes letterReveal {
          0% { opacity: 0; transform: translateY(24px) rotateX(-90deg); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }
        }

        .chroma-flicker {
          animation: chromaFlicker 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        @keyframes chromaFlicker {
          0%, 92%, 100% { text-shadow: none; }
          93% { text-shadow: -2px 0 rgba(255,0,80,0.7), 2px 0 rgba(0,255,255,0.7); }
          94% { text-shadow: 2px 0 rgba(255,0,80,0.7), -2px 0 rgba(0,255,255,0.7); }
          95% { text-shadow: -1px 0 rgba(255,0,80,0.5), 1px 0 rgba(0,255,255,0.5); }
        }

        .glow-text {
          text-shadow: 0 0 20px rgba(255,255,255,0.35);
        }
        .light-mode .glow-text {
          text-shadow: 0 0 16px rgba(71,85,105,0.2);
        }
        .glow-text-cyan {
          text-shadow:
            0 0 14px rgba(34,211,238,0.9),
            0 0 30px rgba(34,211,238,0.5);
        }
        .light-mode .glow-text-cyan {
          text-shadow:
            0 0 12px rgba(6,182,212,0.6),
            0 0 24px rgba(6,182,212,0.35);
        }

        .splash-divider {
          animation: dividerGrow 700ms 1050ms cubic-bezier(.22,1,.36,1) both;
        }
        .splash-subtitle {
          animation: splashSubtitle 500ms 1150ms cubic-bezier(.22,1,.36,1) both;
        }
        .bottom-text {
          animation: splashSubtitle 600ms 1300ms cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes splashSubtitle {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dividerGrow {
          0% { opacity: 0; transform: scaleX(0); }
          100% { opacity: 1; transform: scaleX(1); }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(34,211,238,0.35) 50%,
            transparent 100%
          );
          animation: shimmerMove 1.2s linear infinite;
        }
        .light-mode .shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(6,182,212,0.5) 50%,
            transparent 100%
          );
        }
        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-ping-slow {
          animation: pingSlow 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes pingSlow {
          0% { transform: translate(50%, -50%) scale(1); opacity: 1; }
          75%, 100% { transform: translate(50%, -50%) scale(2); opacity: 0; }
        }

        .animate-pulse-slow {
          animation: ambientPulse 3.5s ease-in-out infinite;
        }
        @keyframes ambientPulse {
          0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
          50% { opacity: 0.9; transform: translate(-50%,-50%) scale(1.15); }
        }

        .theme-toggle {
          transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .theme-toggle::before {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 400ms ease;
        }
        .theme-toggle:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}