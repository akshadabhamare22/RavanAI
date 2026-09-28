
// import { Moon, Sun } from "lucide-react";

// export default function ThemeToggle({ theme, onToggle }) {
//   const isDark = theme === "dark";

//   return (
//     <button
//       type="button"
//       onClick={onToggle}
//       aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
//       aria-pressed={isDark}
//       className={`
//         group relative flex h-10 w-10 shrink-0
//         items-center justify-center rounded-xl
//         border transition-all duration-300 ease-out
//         focus:outline-none focus:ring-2 focus:ring-cyan-400/40
//         ${
//           isDark
//             ? "border-white/10 bg-[#111216] text-gray-300 hover:border-cyan-400/40 hover:bg-cyan-400/10"
//             : "border-black/10 bg-white text-gray-600 hover:border-cyan-400/40 hover:bg-cyan-400/10"
//         }
//       `}
//     >
//       <span
//         className="
//           flex items-center justify-center
//           transition-all duration-300 ease-out
//           group-active:scale-90
//         "
//       >
//         {isDark ? (
//           <Moon
//             size={18}
//             strokeWidth={1.7}
//             className="text-gray-300 transition-transform duration-300"
//           />
//         ) : (
//           <Sun
//             size={18}
//             strokeWidth={1.7}
//             className="text-gray-700 transition-transform duration-300"
//           />
//         )}
//       </span>
//     </button>
//   );
// }


// import { Moon, Sun } from "lucide-react";
// import { useRef, useState } from "react";

// export default function ThemeToggle({ theme, onToggle }) {
//   const isDark = theme === "dark";
//   const [isAnimating, setIsAnimating] = useState(false);
//   const btnRef = useRef(null);

//   const handleClick = () => {
//     if (isAnimating) return;
//     setIsAnimating(true);

//     // Get click position from button center
//     const rect = btnRef.current?.getBoundingClientRect();
//     const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
//     const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

//     // Create ripple overlay
//     const ripple = document.createElement("div");
//     ripple.className = "theme-ripple";
//     ripple.style.setProperty("--ripple-x", `${x}px`);
//     ripple.style.setProperty("--ripple-y", `${y}px`);
//     ripple.style.setProperty(
//       "--ripple-color",
//       isDark ? "#f5f5f7" : "#09090B"
//     );

//     document.body.appendChild(ripple);

//     // ✅ Wait until ripple fully covers the screen (550ms),
//     //    THEN disable ALL transitions and swap theme instantly
//     setTimeout(() => {
//       // Freeze all transitions
//       document.documentElement.classList.add("no-transition");
//       onToggle();

//       // Force a reflow so the browser paints the new theme
//       void document.documentElement.offsetHeight;

//       // Re-enable transitions after 1 frame
//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           document.documentElement.classList.remove("no-transition");
//         });
//       });
//     }, 550);

//     // Fade out ripple AFTER theme swap
//     setTimeout(() => {
//       ripple.classList.add("fade-out");
//     }, 580);

//     // Cleanup
//     setTimeout(() => {
//       ripple.remove();
//       setIsAnimating(false);
//     }, 850);
//   };

//   return (
//     <button
//       ref={btnRef}
//       type="button"
//       onClick={handleClick}
//       aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
//       aria-pressed={isDark}
//       className={`
//         group relative flex h-10 w-10 shrink-0
//         items-center justify-center rounded-xl
//         border transition-all duration-300 ease-out
//         focus:outline-none focus:ring-2 focus:ring-cyan-400/40
//         overflow-hidden
//         ${
//           isDark
//             ? "border-white/10 bg-[#111216] text-gray-300 hover:border-cyan-400/40 hover:bg-cyan-400/10"
//             : "border-black/10 bg-white text-gray-600 hover:border-cyan-400/40 hover:bg-cyan-400/10"
//         }
//         ${isAnimating ? "scale-95" : "scale-100"}
//       `}
//     >
//       <span
//         className={`
//           flex items-center justify-center
//           transition-transform duration-500 ease-out
//           ${isAnimating ? "rotate-[180deg]" : "rotate-0"}
//         `}
//       >
//         <span
//           className={`
//             transition-all duration-300 ease-out
//             ${isAnimating ? "scale-0 opacity-0" : "scale-100 opacity-100"}
//           `}
//         >
//           {isDark ? (
//             <Moon size={18} strokeWidth={1.7} className="text-gray-300" />
//           ) : (
//             <Sun size={18} strokeWidth={1.7} className="text-gray-700" />
//           )}
//         </span>
//       </span>

//       <span
//         className={`
//           pointer-events-none absolute inset-0 flex items-center justify-center
//           transition-all duration-300 ease-out
//           ${isAnimating ? "scale-100 opacity-100" : "scale-0 opacity-0"}
//         `}
//       >
//         {isDark ? (
//           <Sun size={18} strokeWidth={1.7} className="text-amber-400" />
//         ) : (
//           <Moon size={18} strokeWidth={1.7} className="text-cyan-400" />
//         )}
//       </span>
//     </button>
//   );
// }


import { Moon, Sun } from "lucide-react";
import { useRef, useState } from "react";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  const [isAnimating, setIsAnimating] = useState(false);
  const btnRef = useRef(null);

  const handleClick = () => {
    console.log("🎯 Toggle clicked");
    console.log("   theme:", theme);
    console.log("   isDark:", isDark);
    console.log("   onToggle type:", typeof onToggle);

    if (isAnimating) {
      console.log("   ⏸ Animation in progress, ignored");
      return;
    }

    if (typeof onToggle !== "function") {
      console.error("   ❌ onToggle is not a function!");
      return;
    }

    setIsAnimating(true);

    // Get button center for ripple origin
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    // Ripple color = OPPOSITE of current theme
    // dark → white ripple | light → black ripple
    const rippleColor = isDark ? "#ffffff" : "#000000";
    console.log("   ripple color:", rippleColor);

    // Create ripple
    const ripple = document.createElement("div");
    ripple.className = "theme-ripple";
    ripple.style.setProperty("--ripple-x", `${x}px`);
    ripple.style.setProperty("--ripple-y", `${y}px`);
    ripple.style.setProperty("--ripple-color", rippleColor);
    document.body.appendChild(ripple);
    console.log("   ✅ ripple added to body");

    // Swap theme after ripple covers screen
    setTimeout(() => {
      console.log("   🔄 Swapping theme now");
      document.documentElement.classList.add("no-transition");
      onToggle();
      void document.documentElement.offsetHeight;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.remove("no-transition");
        });
      });
    }, 500);

    // Fade ripple out
    setTimeout(() => {
      ripple.classList.add("fade-out");
    }, 530);

    // Cleanup
    setTimeout(() => {
      ripple.remove();
      setIsAnimating(false);
      console.log("   🧹 cleanup done");
    }, 800);
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      style={{
        // Force inline styles to bypass any CSS conflict
        position: "relative",
        width: "40px",
        height: "40px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.1)",
        background: isDark ? "#111216" : "#ffffff",
        color: isDark ? "#d4d4d8" : "#4b5563",
        cursor: "pointer",
        overflow: "hidden",
        transform: isAnimating ? "scale(0.95)" : "scale(1)",
        transition: "transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Icon */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isAnimating ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.5s ease",
        }}
      >
        <span
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "scale(0)" : "scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          {isDark ? (
            <Moon size={18} strokeWidth={1.7} />
          ) : (
            <Sun size={18} strokeWidth={1.7} />
          )}
        </span>
      </span>

      {/* Opposite icon crossfade */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          opacity: isAnimating ? 1 : 0,
          transform: isAnimating ? "scale(1)" : "scale(0)",
          transition: "all 0.3s ease",
        }}
      >
        {isDark ? (
          <Sun size={18} strokeWidth={1.7} color="#fbbf24" />
        ) : (
          <Moon size={18} strokeWidth={1.7} color="#22d3ee" />
        )}
      </span>
    </button>
  );
}