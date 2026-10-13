// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// // ============================================================
// // FIRE LOADER
// // Full-screen white page, centered flame + small gray text.
// // Usage:  <FireLoader text="Loading agent details..." />
// // ============================================================

// const FireLoader = ({
//   text = "Loading agent details...",
//   fullScreen = true,
// }) => {
//   return (
//     <div
//       className={`fire-loader-wrap flex flex-col items-center justify-center bg-white ${
//         fullScreen ? "fixed inset-0 z-[9999]" : "min-h-[400px] w-full"
//       }`}
//       role="status"
//       aria-live="polite"
//     >
//       <style>{`
//         .fire-loader-wrap {
//           transition: background-color 180ms ease;
//         }

//         /* dark mode follows the same classes the rest of the app uses */
//         :root.dark .fire-loader-wrap,
//         body.dark .fire-loader-wrap,
//         :root.dark-mode .fire-loader-wrap,
//         body.dark-mode .fire-loader-wrap,
//         [data-theme="dark"] .fire-loader-wrap {
//           background-color: #09090b !important;
//         }

//         :root.dark .fire-loader-text,
//         body.dark .fire-loader-text,
//         :root.dark-mode .fire-loader-text,
//         body.dark-mode .fire-loader-text,
//         [data-theme="dark"] .fire-loader-text {
//           color: #a1a1aa !important;
//         }

//         .fire-flame {
//           transform-origin: 50% 100%;
//           animation: fireFlicker 1.1s ease-in-out infinite;
//           filter: drop-shadow(0 6px 14px rgba(249, 115, 22, 0.35));
//         }

//         .fire-flame-inner {
//           transform-origin: 50% 100%;
//           animation: fireFlickerInner 0.8s ease-in-out infinite;
//         }

//         @keyframes fireFlicker {
//           0%   { transform: scale(1, 1) rotate(0deg); }
//           25%  { transform: scale(0.96, 1.06) rotate(-1.5deg); }
//           50%  { transform: scale(1.03, 0.97) rotate(1deg); }
//           75%  { transform: scale(0.97, 1.04) rotate(-1deg); }
//           100% { transform: scale(1, 1) rotate(0deg); }
//         }

//         @keyframes fireFlickerInner {
//           0%, 100% { transform: scale(1, 1);     opacity: 0.95; }
//           50%      { transform: scale(0.9, 1.1); opacity: 0.8; }
//         }

//         .fire-loader-text {
//           animation: fireTextPulse 1.6s ease-in-out infinite;
//         }

//         @keyframes fireTextPulse {
//           0%, 100% { opacity: 1; }
//           50%      { opacity: 0.55; }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .fire-flame,
//           .fire-flame-inner,
//           .fire-loader-text {
//             animation: none;
//           }
//         }
//       `}</style>

//       <svg
//         className="fire-flame"
//         width="56"
//         height="68"
//         viewBox="0 0 100 120"
//         xmlns="http://www.w3.org/2000/svg"
//         aria-hidden="true"
//       >
//         <defs>
//           <linearGradient id="fireOuter" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#dc0b0b" />
//             <stop offset="55%" stopColor="#f2481b" />
//             <stop offset="100%" stopColor="#f97316" />
//           </linearGradient>
//           <radialGradient id="fireInner" cx="50%" cy="60%" r="55%">
//             <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
//             <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
//           </radialGradient>
//         </defs>

//         {/* outer flame */}
//         <path
//           d="M52 4 C54 22 68 30 72 46 C76 40 80 36 84 30 C92 48 96 62 91 78 C86 99 70 115 50 115 C28 115 11 99 11 78 C11 66 17 56 24 50 C26 56 29 60 33 62 C30 42 38 22 52 4 Z"
//           fill="url(#fireOuter)"
//         />

//         {/* inner glow */}
//         <ellipse
//           className="fire-flame-inner"
//           cx="50"
//           cy="84"
//           rx="27"
//           ry="26"
//           fill="url(#fireInner)"
//         />
//       </svg>

//       <p className="fire-loader-text mt-5 text-sm tracking-wide text-gray-500">
//         {text}
//       </p>
//     </div>
//   );
// };

// // ============================================================
// // WITH FIRE LOADER  (route-level wrapper, use only in App.jsx)
// // Shows the fire loader on top while the page underneath loads,
// // so the page file itself needs NO changes / NO imports.
// //
// //   <WithFireLoader>
// //     <CreateAgent />
// //   </WithFireLoader>
// // ============================================================
// export const WithFireLoader = ({
//   children,
//   text = "Loading...",
//   editText = "Loading agent details...",
//   duration = 1200,
// }) => {
//   const location = useLocation();
//   const [show, setShow] = useState(true);

//   useEffect(() => {
//     const timer = window.setTimeout(() => setShow(false), duration);
//     return () => window.clearTimeout(timer);
//   }, [duration]);

//   // opened from an existing agent card -> edit text, else create text
//   const label = location.state?.agentId ? editText : text;

//   return (
//     <>
//       {show && <FireLoader text={label} />}
//       {children}
//     </>
//   );
// };

// export default FireLoader;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// ============================================================
// FIRE LOADER
// Full-screen white page, centered flame + small gray text.
// Usage:  <FireLoader text="Loading agent details..." />
// ============================================================

const FireLoader = ({
  text = "Loading agent details...",
  fullScreen = true,
}) => {
  return (
    <div
      className={`fire-loader-wrap flex flex-col items-center justify-center bg-white ${
        fullScreen ? "fixed inset-0 z-[9999]" : "min-h-[400px] w-full"
      }`}
      role="status"
      aria-live="polite"
    >
      <style>{`
        .fire-loader-wrap {
          transition: background-color 180ms ease;
          overflow: hidden;
        }

        /* dark mode follows the same classes the rest of the app uses */
        :root.dark .fire-loader-wrap,
        body.dark .fire-loader-wrap,
        :root.dark-mode .fire-loader-wrap,
        body.dark-mode .fire-loader-wrap,
        [data-theme="dark"] .fire-loader-wrap {
          background-color: #09090b !important;
        }

        :root.dark .fire-loader-text,
        body.dark .fire-loader-text,
        :root.dark-mode .fire-loader-text,
        body.dark-mode .fire-loader-text,
        [data-theme="dark"] .fire-loader-text {
          color: #a1a1aa !important;
        }

        :root.dark .fire-glow,
        body.dark .fire-glow,
        :root.dark-mode .fire-glow,
        body.dark-mode .fire-glow,
        [data-theme="dark"] .fire-glow {
          background: radial-gradient(circle, rgba(249,115,22,0.25) 0%, rgba(249,115,22,0) 70%) !important;
        }

        /* ---- ambient glow behind flame ---- */
        .fire-glow {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0) 70%);
          animation: fireGlowPulse 2.2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes fireGlowPulse {
          0%, 100% { transform: scale(1);    opacity: 0.7; }
          50%      { transform: scale(1.25); opacity: 1;   }
        }

        /* ---- rising ember particles ---- */
        .fire-embers {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .fire-ember {
          position: absolute;
          bottom: 0;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #f97316;
          box-shadow: 0 0 6px 2px rgba(249,115,22,0.6);
          opacity: 0;
          animation: emberRise 2.6s ease-in infinite;
        }

        .fire-ember:nth-child(1) { left: 42%; animation-delay: 0s;    animation-duration: 2.4s; }
        .fire-ember:nth-child(2) { left: 50%; animation-delay: 0.3s;  animation-duration: 2.9s; }
        .fire-ember:nth-child(3) { left: 58%; animation-delay: 0.6s;  animation-duration: 2.2s; }
        .fire-ember:nth-child(4) { left: 46%; animation-delay: 0.9s;  animation-duration: 3.1s; }
        .fire-ember:nth-child(5) { left: 54%; animation-delay: 1.2s;  animation-duration: 2.7s; }
        .fire-ember:nth-child(6) { left: 48%; animation-delay: 1.5s;  animation-duration: 2.5s; }
        .fire-ember:nth-child(7) { left: 56%; animation-delay: 1.8s;  animation-duration: 3.0s; }
        .fire-ember:nth-child(8) { left: 44%; animation-delay: 2.1s;  animation-duration: 2.3s; }

        @keyframes emberRise {
          0%   { transform: translateY(0)     scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          60%  { opacity: 0.9; }
          100% { transform: translateY(-140px) scale(0.2); opacity: 0; }
        }

        /* ---- main flame ---- */
        .fire-flame {
          transform-origin: 50% 100%;
          animation: fireFlicker 0.9s ease-in-out infinite;
          filter: drop-shadow(0 6px 18px rgba(249, 115, 22, 0.45));
        }

        .fire-flame-inner {
          transform-origin: 50% 100%;
          animation: fireFlickerInner 0.6s ease-in-out infinite;
        }

        .fire-flame-core {
          transform-origin: 50% 100%;
          animation: fireCore 0.45s ease-in-out infinite;
        }

        @keyframes fireFlicker {
          0%   { transform: scale(1, 1)        rotate(0deg);   }
          20%  { transform: scale(0.95, 1.08)  rotate(-2deg);  }
          40%  { transform: scale(1.04, 0.95)  rotate(1.5deg); }
          60%  { transform: scale(0.97, 1.05)  rotate(-1.5deg);}
          80%  { transform: scale(1.02, 0.98)  rotate(1deg);   }
          100% { transform: scale(1, 1)        rotate(0deg);   }
        }

        @keyframes fireFlickerInner {
          0%, 100% { transform: scale(1, 1)     opacity: 0.95; }
          50%      { transform: scale(0.88, 1.15) opacity: 0.75; }
        }

        @keyframes fireCore {
          0%, 100% { transform: scale(1, 1)      opacity: 1;   }
          50%      { transform: scale(0.85, 1.2) opacity: 0.85;}
        }

        /* ---- smoke wisps ---- */
        .fire-smoke {
          position: absolute;
          bottom: 55%;
          width: 30px;
          height: 30px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(160,160,160,0.18) 0%, rgba(160,160,160,0) 70%);
          filter: blur(4px);
          opacity: 0;
          animation: smokeDrift 3.5s ease-out infinite;
          pointer-events: none;
        }

        .fire-smoke:nth-child(1) { left: 46%; animation-delay: 0s;   }
        .fire-smoke:nth-child(2) { left: 52%; animation-delay: 1.2s; }
        .fire-smoke:nth-child(3) { left: 49%; animation-delay: 2.4s; }

        @keyframes smokeDrift {
          0%   { transform: translateY(0)     scale(0.6); opacity: 0; }
          20%  { opacity: 0.5; }
          100% { transform: translateY(-90px) scale(2.2); opacity: 0; }
        }

        /* ---- text ---- */
        .fire-loader-text {
          animation: fireTextPulse 1.6s ease-in-out infinite;
        }

        @keyframes fireTextPulse {
          0%, 100% { opacity: 1;    transform: translateY(0);   }
          50%      { opacity: 0.55; transform: translateY(-2px);}
        }

        /* ---- animated dots ---- */
        .fire-dots span {
          display: inline-block;
          animation: dotBounce 1.2s ease-in-out infinite;
        }
        .fire-dots span:nth-child(2) { animation-delay: 0.15s; }
        .fire-dots span:nth-child(3) { animation-delay: 0.3s;  }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%           { transform: translateY(-4px); opacity: 1;   }
        }

        @media (prefers-reduced-motion: reduce) {
          .fire-flame,
          .fire-flame-inner,
          .fire-flame-core,
          .fire-loader-text,
          .fire-glow,
          .fire-ember,
          .fire-smoke,
          .fire-dots span {
            animation: none;
          }
        }
      `}</style>

      <div className="relative flex flex-col items-center">
        {/* ambient glow */}
        <div className="fire-glow" />

        {/* smoke wisps */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="fire-smoke" />
          <div className="fire-smoke" />
          <div className="fire-smoke" />
        </div>

        {/* rising embers */}
        <div className="fire-embers">
          <div className="fire-ember" />
          <div className="fire-ember" />
          <div className="fire-ember" />
          <div className="fire-ember" />
          <div className="fire-ember" />
          <div className="fire-ember" />
          <div className="fire-ember" />
          <div className="fire-ember" />
        </div>

        <svg
          className="fire-flame relative z-10"
          width="56"
          height="68"
          viewBox="0 0 100 120"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="fireOuter" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc0b0b" />
              <stop offset="55%" stopColor="#f2481b" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <radialGradient id="fireInner" cx="50%" cy="60%" r="55%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fireCore" cx="50%" cy="70%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* outer flame */}
          <path
            d="M52 4 C54 22 68 30 72 46 C76 40 80 36 84 30 C92 48 96 62 91 78 C86 99 70 115 50 115 C28 115 11 99 11 78 C11 66 17 56 24 50 C26 56 29 60 33 62 C30 42 38 22 52 4 Z"
            fill="url(#fireOuter)"
          />

          {/* inner glow */}
          <ellipse
            className="fire-flame-inner"
            cx="50"
            cy="84"
            rx="27"
            ry="26"
            fill="url(#fireInner)"
          />

          {/* bright core */}
          <ellipse
            className="fire-flame-core"
            cx="50"
            cy="90"
            rx="14"
            ry="13"
            fill="url(#fireCore)"
          />
        </svg>

        <p className="fire-loader-text mt-5 text-sm tracking-wide text-gray-500">
          {text}
          <span className="fire-dots ml-0.5">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      </div>
    </div>
  );
};

// ============================================================
// WITH FIRE LOADER  (route-level wrapper, use only in App.jsx)
// Shows the fire loader on top while the page underneath loads,
// so the page file itself needs NO changes / NO imports.
//
//   <WithFireLoader>
//     <CreateAgent />
//   </WithFireLoader>
// ============================================================
export const WithFireLoader = ({
  children,
  text = "Loading...",
  editText = "Loading agent details...",
  duration = 1200,
}) => {
  const location = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  // opened from an existing agent card -> edit text, else create text
  const label = location.state?.agentId ? editText : text;

  return (
    <>
      {show && <FireLoader text={label} />}
      {children}
    </>
  );
};

export default FireLoader;