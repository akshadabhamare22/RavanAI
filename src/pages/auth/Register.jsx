import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight, Loader2, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "US +1",
    phoneNumber: "",
    password: "",
    referral: "",
  });

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleGoogleSignup = () => {
    setIsGoogleLoading(true);
    setError("");

    const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
    const REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
    const SCOPE = "openid email profile";

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code&scope=${encodeURIComponent(SCOPE)}&access_type=offline&prompt=consent`;

    setTimeout(() => {
      window.location.href = googleAuthUrl;
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.organizationName.trim()) return setError("Organization name is required.");
    if (!formData.firstName.trim() || !formData.lastName.trim()) return setError("First and last name are required.");
    if (!formData.email.trim()) return setError("Email is required.");
    if (!formData.phoneNumber.trim()) return setError("Phone number is required.");
    if (formData.password.length < 8) return setError("Password must be at least 8 characters.");

    localStorage.setItem(
      "ravanai_auth",
      JSON.stringify({
        isAuthenticated: true,
        email: formData.email,
        organization: formData.organizationName,
      })
    );

    navigate("/dashboard", { replace: true });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110 } },
  };

  const leftSectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightSectionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // Compact input styling
  const inputClass =
    "h-[38px] w-full rounded-md border border-[#29292d] bg-[#101012] px-3 text-[13px] text-gray-100 outline-none placeholder:text-gray-500 transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400";

  const labelClass = "mb-1 block text-[12px] font-medium text-gray-300";

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#08080a] text-white">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">

        {/* LEFT SECTION */}
        <motion.section
          variants={leftSectionVariants}
          initial="hidden"
          animate="visible"
          className="relative hidden h-full overflow-hidden px-10 py-8 sm:px-14 lg:flex xl:px-16"
          style={{
            backgroundColor: "#10191a",
            backgroundImage: `
              radial-gradient(circle at 75% 20%, rgba(25, 75, 73, 0.20), transparent 38%),
              radial-gradient(circle at 20% 80%, rgba(5, 40, 42, 0.25), transparent 40%)
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
                alt="Agni Logo"
                className="h-12 w-12 rounded-full object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <span className="text-2xl font-bold tracking-tight">Agni</span>
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
                Join the revolution
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold leading-[1.06] tracking-[-1.5px] text-gray-100 xl:text-[50px]"
              >
                Start building the future
                <br />
                of voice AI today
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-7 max-w-[560px] text-[17px] leading-8 text-gray-400"
              >
                Create your organization, invite your team, and deploy intelligent
                voice agents in minutes.
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
                { value: "5000+", label: "Leading companies" },
                { value: "0ms", label: "Latency overhead" },
                { value: "24/7", label: "Expert support" },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <h3 className="text-3xl font-bold text-gray-100">{stat.value}</h3>
                  <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* RIGHT SECTION */}
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
              <img src="/logo.svg" alt="Agni Logo" className="h-9 w-9 rounded-full object-contain" />
              <span className="text-lg font-bold">Agni</span>
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
                Create an account
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="mt-1 text-[13px] text-gray-400"
              >
                Enter your details to get started.
              </motion.p>
            </motion.div>

            {/* Google Button */}
            <motion.button
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: isGoogleLoading ? 1 : 1.02, backgroundColor: isGoogleLoading ? "#101012" : "#18181b" }}
              whileTap={{ scale: isGoogleLoading ? 1 : 0.98 }}
              type="button"
              disabled={isGoogleLoading}
              onClick={handleGoogleSignup}
              className="flex h-9 w-full items-center justify-center gap-2.5 rounded-md border border-[#29292d] bg-[#101012] text-[13px] font-semibold text-gray-200 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin text-cyan-400" />
                  <span>Redirecting...</span>
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                  </svg>
                  <span>Sign up with Google</span>
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

            {/* Form */}
            <motion.form
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="space-y-2.5"
            >
              {/* Organization Name */}
              <motion.div variants={itemVariants}>
                <label htmlFor="organizationName" className={labelClass}>
                  Organization Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="organizationName"
                  name="organizationName"
                  type="text"
                  placeholder="Acme Corp"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </motion.div>

              {/* First / Last Name */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="firstName" className={labelClass}>First Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={labelClass}>Last Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className={`${labelClass} flex items-center gap-1`}>
                  Email
                  <Info size={11} className="text-gray-500" />
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
                  className={inputClass}
                />
              </motion.div>

              {/* Phone Number */}
              <motion.div variants={itemVariants}>
                <label htmlFor="phoneNumber" className={labelClass}>Phone Number</label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="h-[38px] rounded-md border border-[#29292d] bg-[#101012] px-2.5 text-[13px] text-gray-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="US +1">US +1</option>
                    <option value="IN +91">IN +91</option>
                    <option value="UK +44">UK +44</option>
                    <option value="AU +61">AU +61</option>
                    <option value="CA +1">CA +1</option>
                    <option value="DE +49">DE +49</option>
                    <option value="FR +33">FR +33</option>
                    <option value="JP +81">JP +81</option>
                  </select>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className={`${inputClass} flex-1`}
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
                <label htmlFor="password" className={labelClass}>Password</label>
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
                    minLength={8}
                    className={`${inputClass} pr-10`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </motion.button>
                </div>
              </motion.div>

              {/* Referral */}
              <motion.div variants={itemVariants}>
                <label htmlFor="referral" className={labelClass}>
                  How did you hear about us?
                </label>
                <select
                  id="referral"
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  className="h-[38px] w-full rounded-md border border-[#29292d] bg-[#101012] px-3 text-[13px] text-gray-100 outline-none transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                >
                  <option value="">Select an option</option>
                  <option value="google">Google Search</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter / X</option>
                  <option value="friend">Friend / Colleague</option>
                  <option value="event">Conference / Event</option>
                  <option value="blog">Blog / Article</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02, backgroundColor: "#45d5f1" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="group flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#25c7e8] text-[14px] font-semibold text-[#061015] transition"
              >
                Create account
                <motion.span className="transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>
            </motion.form>

            {/* Sign in link */}
            <motion.p
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-4 text-center text-[12.5px] text-gray-400"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-gray-200 transition hover:text-cyan-400"
              >
                Sign in
              </Link>
            </motion.p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Register;