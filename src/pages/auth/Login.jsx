// import React, { useState } from "react";
// import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const DEMO_EMAIL = "demo@agni.ai";
// const DEMO_PASSWORD = "Agni@123";

// const Login = () => {
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((previous) => ({
//       ...previous,
//       [e.target.name]: e.target.value,
//     }));
//     setError("");
//   };

//   const handleDemoLogin = () => {
//     setFormData({
//       email: DEMO_EMAIL,
//       password: DEMO_PASSWORD,
//     });
//     setError("");
//   };

//   // ✅ Google OAuth Handler
//   const handleGoogleLogin = () => {
//     setIsGoogleLoading(true);
//     setError("");

//     const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
//     const REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
//     const SCOPE = "openid email profile";

//     const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
//       REDIRECT_URI
//     )}&response_type=code&scope=${encodeURIComponent(SCOPE)}&access_type=offline&prompt=consent`;

//     setTimeout(() => {
//       window.location.href = googleAuthUrl;
//     }, 500);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (
//       formData.email.trim().toLowerCase() === DEMO_EMAIL &&
//       formData.password === DEMO_PASSWORD
//     ) {
//       localStorage.setItem(
//         "ravanai_auth",
//         JSON.stringify({
//           isAuthenticated: true,
//           email: DEMO_EMAIL,
//         })
//       );
//       navigate("/dashboard", { replace: true });
//     } else {
//       setError("Invalid email or password. Please use the demo credentials.");
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.06, delayChildren: 0.12 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 15 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110 } },
//   };

//   const leftSectionVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   const rightSectionVariants = {
//     hidden: { opacity: 0, x: 50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
//   };

//   // Match Register page compact styles
//   const inputClass =
//     "h-[38px] w-full rounded-md border border-[#29292d] bg-[#101012] px-3 text-[13px] text-gray-100 outline-none placeholder:text-gray-500 transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400";

//   const labelClass = "mb-1 block text-[12px] font-medium text-gray-300";

//   return (
//     <div className="h-screen w-screen overflow-hidden bg-[#08080a] text-white">
//       <div className="grid h-full grid-cols-1 lg:grid-cols-2">

//         {/* LEFT SECTION */}
//         <motion.section
//           variants={leftSectionVariants}
//           initial="hidden"
//           animate="visible"
//           className="relative hidden h-full overflow-hidden px-10 py-8 sm:px-14 lg:flex xl:px-16"
//           style={{
//             backgroundColor: "#10191a",
//             backgroundImage: `
//               radial-gradient(circle at 75% 20%, rgba(25, 75, 73, 0.20), transparent 38%),
//               radial-gradient(circle at 20% 80%, rgba(5, 40, 42, 0.25), transparent 40%)
//             `,
//           }}
//         >
//           <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#ffffff_0.7px,transparent_0.7px)] [background-size:4px_4px]" />

//           <div className="relative z-10 flex w-full flex-col">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.6 }}
//               className="flex items-center gap-3"
//             >
//               <motion.img
//                 whileHover={{ scale: 1.1, rotate: 5 }}
//                 src="/logo.svg"
//                 alt="Jeeva Logo"
//                 className="h-12 w-12 rounded-full object-contain"
//                 onError={(e) => { e.currentTarget.style.display = "none"; }}
//               />
//               <span className="text-2xl font-bold tracking-tight">JeevaAI</span>
//             </motion.div>

//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="mt-20 max-w-[600px] xl:mt-24"
//             >
//               <motion.p
//                 variants={itemVariants}
//                 className="mb-6 text-[15px] font-semibold uppercase tracking-wide text-cyan-400"
//               >
//                 Voice AI Infrastructure
//               </motion.p>

//               <motion.h1
//                 variants={itemVariants}
//                 className="text-4xl font-bold leading-[1.06] tracking-[-1.5px] text-gray-100 xl:text-[50px]"
//               >
//                 Build intelligent voice
//                 <br />
//                 agents that drive
//                 <br />
//                 business growth
//               </motion.h1>

//               <motion.p
//                 variants={itemVariants}
//                 className="mt-7 max-w-[580px] text-[17px] leading-8 text-gray-400"
//               >
//                 Enterprise-grade platform for deploying human-like voice AI.
//                 <br />
//                 100+ languages. Every accent. Unlimited scale.
//               </motion.p>
//             </motion.div>

//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="mt-auto flex gap-14 pt-10"
//             >
//               {[
//                 { value: "2.5M+", label: "Calls handled daily" },
//                 { value: "99.9%", label: "Uptime SLA" },
//                 { value: "100+", label: "Languages supported" },
//               ].map((stat, index) => (
//                 <motion.div key={index} variants={itemVariants}>
//                   <h3 className="text-3xl font-bold text-gray-100">{stat.value}</h3>
//                   <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </motion.section>

//         {/* RIGHT SECTION */}
//         <motion.section
//           variants={rightSectionVariants}
//           initial="hidden"
//           animate="visible"
//           className="flex h-full items-center justify-center overflow-hidden bg-[#08080a] px-6 py-6 sm:px-12 lg:px-16 xl:px-20"
//         >
//           <div className="w-full max-w-[420px]">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.6 }}
//               className="mb-4 flex items-center gap-2 lg:hidden"
//             >
//               <img src="/logo.svg" alt="Jeeva Logo" className="h-9 w-9 rounded-full object-contain" />
//               <span className="text-lg font-bold">JeevaAI</span>
//             </motion.div>

//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="mb-4"
//             >
//               <motion.h2
//                 variants={itemVariants}
//                 className="text-[26px] font-bold tracking-[-0.5px] text-gray-100"
//               >
//                 Sign in
//               </motion.h2>
//               <motion.p
//                 variants={itemVariants}
//                 className="mt-1 text-[13px] text-gray-400"
//               >
//                 Welcome back. Enter your credentials to continue.
//               </motion.p>
//             </motion.div>

//             {/* Demo Credentials */}
//             <motion.div
//               variants={itemVariants}
//               initial="hidden"
//               animate="visible"
//               className="mb-3 rounded-md border border-cyan-400/20 bg-cyan-400/5 p-3"
//             >
//               <div className="flex items-center justify-between">
//                 <p className="text-[12px] font-semibold text-cyan-400">Demo Credentials</p>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   type="button"
//                   onClick={handleDemoLogin}
//                   className="text-[11px] font-semibold text-cyan-300 transition hover:text-white"
//                 >
//                   Use Demo
//                 </motion.button>
//               </div>
//               <p className="mt-1.5 text-[12px] text-gray-400">
//                 Email: <span className="text-gray-200">{DEMO_EMAIL}</span>
//               </p>
//               <p className="mt-0.5 text-[12px] text-gray-400">
//                 Password: <span className="text-gray-200">{DEMO_PASSWORD}</span>
//               </p>
//             </motion.div>

//             {/* Google Button */}
//             <motion.button
//               variants={itemVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover={{ scale: isGoogleLoading ? 1 : 1.02, backgroundColor: isGoogleLoading ? "#101012" : "#18181b" }}
//               whileTap={{ scale: isGoogleLoading ? 1 : 0.98 }}
//               type="button"
//               disabled={isGoogleLoading}
//               onClick={handleGoogleLogin}
//               className="flex h-9 w-full items-center justify-center gap-2.5 rounded-md border border-[#29292d] bg-[#101012] text-[13px] font-semibold text-gray-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isGoogleLoading ? (
//                 <>
//                   <Loader2 size={14} className="animate-spin text-cyan-400" />
//                   <span>Redirecting...</span>
//                 </>
//               ) : (
//                 <>
//                   <svg width="15" height="15" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
//                     <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
//                     <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
//                     <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
//                     <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
//                   </svg>
//                   <span>Continue with Google</span>
//                 </>
//               )}
//             </motion.button>

//             {/* Divider */}
//             <motion.div
//               variants={itemVariants}
//               initial="hidden"
//               animate="visible"
//               className="my-3 flex items-center gap-3"
//             >
//               <div className="h-px flex-1 bg-[#28282c]" />
//               <span className="text-[12px] text-gray-500">or</span>
//               <div className="h-px flex-1 bg-[#28282c]" />
//             </motion.div>

//             {/* Error */}
//             <AnimatePresence>
//               {error && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0, marginBottom: 0 }}
//                   animate={{ opacity: 1, height: "auto", marginBottom: 10 }}
//                   exit={{ opacity: 0, height: 0, marginBottom: 0 }}
//                   className="overflow-hidden rounded-md border border-red-500/30 bg-red-500/10 p-2 text-[12px] text-red-400"
//                 >
//                   {error}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Form */}
//             <motion.form
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               onSubmit={handleSubmit}
//               className="space-y-2.5"
//             >
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="email" className={labelClass}>
//                   Email
//                 </label>
//                 <motion.input
//                   whileFocus={{ scale: 1.01 }}
//                   id="email"
//                   name="email"
//                   type="email"
//                   placeholder="name@company.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className={inputClass}
//                 />
//               </motion.div>

//               <motion.div variants={itemVariants}>
//                 <div className="mb-1 flex items-center justify-between">
//                   <label htmlFor="password" className={labelClass}>
//                     Password
//                   </label>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     type="button"
//                     onClick={() => console.log("Forgot password clicked")}
//                     className="text-[12px] text-gray-400 transition hover:text-cyan-400"
//                   >
//                     Forgot?
//                   </motion.button>
//                 </div>
//                 <div className="relative">
//                   <motion.input
//                     whileFocus={{ scale: 1.01 }}
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className={`${inputClass} pr-10`}
//                   />
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     type="button"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                     onClick={() => setShowPassword((previous) => !previous)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
//                   >
//                     {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
//                   </motion.button>
//                 </div>
//               </motion.div>

//               <motion.button
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.02, backgroundColor: "#45d5f1" }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 className="group flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#25c7e8] text-[14px] font-semibold text-[#061015] transition"
//               >
//                 Sign in
//                 <motion.span className="transition-transform group-hover:translate-x-1">
//                   <ArrowRight size={16} />
//                 </motion.span>
//               </motion.button>
//             </motion.form>

//             <motion.p
//               variants={itemVariants}
//               initial="hidden"
//               animate="visible"
//               className="mt-4 text-center text-[12.5px] text-gray-400"
//             >
//               New to Agni?{" "}
//               <Link to="/register" className="font-semibold text-gray-200 transition hover:text-cyan-400">
//                 Create an account
//               </Link>
//             </motion.p>
//           </div>
//         </motion.section>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import config from "../../config/Config";

const DEMO_EMAIL = "admin@ravanai.com";
const DEMO_PASSWORD = "Admin@12345";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  // =========================================================
  // Demo Login
  // =========================================================

  const handleDemoLogin = () => {
    setFormData({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });

    setError("");
  };

  // =========================================================
  // Google OAuth Handler
  // =========================================================

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setError("");

    const GOOGLE_CLIENT_ID =
      "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

    const REDIRECT_URI = `${window.location.origin}/auth/google/callback`;

    const SCOPE = "openid email profile";

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(SCOPE)}` +
      `&access_type=offline` +
      `&prompt=consent`;

    setTimeout(() => {
      window.location.href = googleAuthUrl;
    }, 500);
  };

  // =========================================================
  // Login API
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // -----------------------------
    // Frontend validation
    // -----------------------------

    if (!formData.email.trim()) {
      return setError("Email is required.");
    }

    if (!formData.password) {
      return setError("Password is required.");
    }

    try {
      setIsLoading(true);

      // -----------------------------
      // API Payload
      // -----------------------------

      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };

      // -----------------------------
      // API URL
      // -----------------------------

      const apiUrl = `${config.BASE_URL}/auth/login`;

      console.log("Login API URL:", apiUrl);
      console.log("Login API Payload:", {
        email: payload.email,
        password: "********",
      });

      // -----------------------------
      // Axios API Request
      // -----------------------------

      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      // -----------------------------
      // Axios Response
      // -----------------------------

      const responseData = response.data || {};

      console.log("Login API Response:", responseData);

      // -----------------------------
      // Successful Login
      // -----------------------------

      const user = responseData?.user;
      const accessToken = responseData?.access_token;

      console.log("Login successful:", user);

      // -----------------------------
      // Save authentication data
      // -----------------------------

      localStorage.setItem(
        "ravanai_auth",
        JSON.stringify({
          isAuthenticated: true,
          email: user?.email || formData.email,
          organization: user?.organization_name || "",
          user: user || null,
          token: accessToken || null,
          token_type: responseData?.token_type || "bearer",
        })
      );

      // -----------------------------
      // Save token separately
      // -----------------------------

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
      }

      // -----------------------------
      // Save user separately
      // -----------------------------

      if (user) {
        localStorage.setItem("ravanai_user", JSON.stringify(user));
      }

      // -----------------------------
      // Redirect to Dashboard
      // -----------------------------

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      // -----------------------------
      // Axios Error Response
      // -----------------------------

      const responseData = error?.response?.data;

      let apiError =
        responseData?.message ||
        responseData?.error ||
        responseData?.detail ||
        error?.message ||
        "Unable to connect to the server. Please try again.";

      // -----------------------------
      // FastAPI validation errors
      // -----------------------------

      if (Array.isArray(responseData?.detail)) {
        const validationMessage = responseData.detail
          .map((item) => item?.msg)
          .filter(Boolean)
          .join(", ");

        apiError =
          validationMessage || "Please check your login details.";
      }

      setError(apiError);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // Animation Variants
  // =========================================================

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 110,
      },
    },
  };

  const leftSectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const rightSectionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // =========================================================
  // Input Styles
  // =========================================================

  const inputClass =
    "h-[38px] w-full rounded-md border border-[#29292d] bg-[#101012] px-3 text-[13px] text-gray-100 outline-none placeholder:text-gray-500 transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400";

  const labelClass = "mb-1 block text-[12px] font-medium text-gray-300";

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#08080a] text-white">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">
        {/* =====================================================
            LEFT SECTION
        ====================================================== */}

        <motion.section
          variants={leftSectionVariants}
          initial="hidden"
          animate="visible"
          className="relative hidden h-full overflow-hidden px-10 py-8 sm:px-14 lg:flex xl:px-16"
          style={{
            backgroundColor: "#10191a",
            backgroundImage: `
              radial-gradient(
                circle at 75% 20%,
                rgba(25, 75, 73, 0.20),
                transparent 38%
              ),
              radial-gradient(
                circle at 20% 80%,
                rgba(5, 40, 42, 0.25),
                transparent 40%
              )
            `,
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#ffffff_0.7px,transparent_0.7px)] [background-size:4px_4px]" />

          <div className="relative z-10 flex w-full flex-col">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                src="/logo.svg"
                alt="Jeeva Logo"
                className="h-12 w-12 rounded-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="text-2xl font-bold tracking-tight">
                JeevaAI
              </span>
            </motion.div>

            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-20 max-w-[600px] xl:mt-24"
            >
              <motion.p
                variants={itemVariants}
                className="mb-6 text-[15px] font-semibold uppercase tracking-wide text-cyan-400"
              >
                Voice AI Infrastructure
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold leading-[1.06] tracking-[-1.5px] text-gray-100 xl:text-[50px]"
              >
                Build intelligent voice
                <br />
                agents that drive
                <br />
                business growth
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-7 max-w-[580px] text-[17px] leading-8 text-gray-400"
              >
                Enterprise-grade platform for deploying human-like voice AI.
                <br />
                100+ languages. Every accent. Unlimited scale.
              </motion.p>
            </motion.div>

            {/* Statistics */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-auto flex gap-14 pt-10"
            >
              {[
                { value: "2.5M+", label: "Calls handled daily" },
                { value: "99.9%", label: "Uptime SLA" },
                { value: "100+", label: "Languages supported" },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <h3 className="text-3xl font-bold text-gray-100">
                    {stat.value}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* =====================================================
            RIGHT SECTION
        ====================================================== */}

        <motion.section
          variants={rightSectionVariants}
          initial="hidden"
          animate="visible"
          className="flex h-full items-center justify-center overflow-hidden bg-[#08080a] px-6 py-6 sm:px-12 lg:px-16 xl:px-20"
        >
          <div className="w-full max-w-[420px]">
            {/* Mobile Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-4 flex items-center gap-2 lg:hidden"
            >
              <img
                src="/logo.svg"
                alt="Jeeva Logo"
                className="h-9 w-9 rounded-full object-contain"
              />
              <span className="text-lg font-bold">JeevaAI</span>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-4"
            >
              <motion.h2
                variants={itemVariants}
                className="text-[26px] font-bold tracking-[-0.5px] text-gray-100"
              >
                Sign in
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="mt-1 text-[13px] text-gray-400"
              >
                Welcome back. Enter your credentials to continue.
              </motion.p>
            </motion.div>

            {/* =================================================
                DEMO CREDENTIALS
            ================================================== */}

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mb-3 rounded-md border border-cyan-400/20 bg-cyan-400/5 p-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-cyan-400">
                  Demo Credentials
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="text-[11px] font-semibold text-cyan-300 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Use Demo
                </motion.button>
              </div>

              <p className="mt-1.5 text-[12px] text-gray-400">
                Email:{" "}
                <span className="text-gray-200">{DEMO_EMAIL}</span>
              </p>

              <p className="mt-0.5 text-[12px] text-gray-400">
                Password:{" "}
                <span className="text-gray-200">{DEMO_PASSWORD}</span>
              </p>
            </motion.div>

            {/* =================================================
                GOOGLE BUTTON
            ================================================== */}

            <motion.button
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: isGoogleLoading ? 1 : 1.02,
                backgroundColor: isGoogleLoading ? "#101012" : "#18181b",
              }}
              whileTap={{
                scale: isGoogleLoading ? 1 : 0.98,
              }}
              type="button"
              disabled={isGoogleLoading || isLoading}
              onClick={handleGoogleLogin}
              className="flex h-9 w-full items-center justify-center gap-2.5 rounded-md border border-[#29292d] bg-[#101012] text-[13px] font-semibold text-gray-200 transition disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin text-cyan-400" />
                  <span>Redirecting...</span>
                </>
              ) : (
                <>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </motion.button>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="my-3 flex items-center gap-3"
            >
              <div className="h-px flex-1 bg-[#28282c]" />
              <span className="text-[12px] text-gray-500">or</span>
              <div className="h-px flex-1 bg-[#28282c]" />
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 10 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="overflow-hidden rounded-md border border-red-500/30 bg-red-500/10 p-2 text-[12px] text-red-400"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                LOGIN FORM
            ================================================== */}

            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="space-y-2.5"
            >
              {/* Email */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className={inputClass}
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() =>
                      console.log("Forgot password clicked")
                    }
                    className="text-[12px] text-gray-400 transition hover:text-cyan-400"
                  >
                    Forgot?
                  </motion.button>
                </div>

                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={`${inputClass} pr-10`}
                  />

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300 disabled:cursor-not-allowed"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </motion.button>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={itemVariants}
                whileHover={{
                  scale: isLoading ? 1 : 1.02,
                  backgroundColor: isLoading ? "#25c7e8" : "#45d5f1",
                }}
                whileTap={{
                  scale: isLoading ? 1 : 0.98,
                }}
                type="submit"
                disabled={isLoading}
                className="group flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#25c7e8] text-[14px] font-semibold text-[#061015] transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <motion.span className="transition-transform group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </motion.span>
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Register Link */}
            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 text-center text-[12.5px] text-gray-400"
            >
              New to Agni?{" "}
              <Link
                to="/register"
                className="font-semibold text-gray-200 transition hover:text-cyan-400"
              >
                Create an account
              </Link>
            </motion.p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Login;