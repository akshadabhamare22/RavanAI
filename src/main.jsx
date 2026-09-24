// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ Apply saved theme BEFORE React mounts (no flash on refresh)
const savedTheme = localStorage.getItem("ravanai-theme");
const isDark = savedTheme !== "light"; // default dark

// Add no-transition to prevent initial flash
document.documentElement.classList.add("no-transition");

if (isDark) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

document.documentElement.style.colorScheme = isDark ? "dark" : "light";

// Remove no-transition after first paint
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.documentElement.classList.remove("no-transition");
  });
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);