
import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const DEMO_EMAIL = "demo@agni.ai";
const DEMO_PASSWORD = "Agni@123";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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

  const handleDemoLogin = () => {
    setFormData({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      formData.email.trim().toLowerCase() === DEMO_EMAIL &&
      formData.password === DEMO_PASSWORD
    ) {
      localStorage.setItem(
        "ravanai_auth",
        JSON.stringify({
          isAuthenticated: true,
          email: DEMO_EMAIL,
        })
      );

      navigate("/dashboard", { replace: true });
    } else {
      setError(
        "Invalid email or password. Please use the demo credentials."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

        {/* LEFT SECTION */}
        <section
          className="relative hidden min-h-screen overflow-hidden px-10 py-12 sm:px-14 lg:flex xl:px-16"
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
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Agni Logo"
                className="h-14 w-14 rounded-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <span className="text-2xl font-bold tracking-tight">
                Agni
              </span>
            </div>

            {/* Content */}
            <div className="mt-24 max-w-[600px] xl:mt-28">
              <p className="mb-8 text-[15px] font-semibold uppercase tracking-wide text-cyan-400">
                Voice AI Infrastructure
              </p>

              <h1 className="text-5xl font-bold leading-[1.06] tracking-[-1.8px] text-gray-100 xl:text-[54px]">
                Build intelligent voice
                <br />
                agents that drive
                <br />
                business growth
              </h1>

              <p className="mt-9 max-w-[580px] text-[18px] leading-8 text-gray-400">
                Enterprise-grade platform for deploying human-like voice AI.
                <br />
                100+ languages. Every accent. Unlimited scale.
              </p>
            </div>

            {/* Statistics */}
            <div className="mt-auto flex gap-14 pt-20">
              <div>
                <h3 className="text-3xl font-bold text-gray-100">
                  2.5M+
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Calls handled daily
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-100">
                  99.9%
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Uptime SLA
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-100">
                  100+
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Languages supported
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SECTION */}
        <section className="flex min-h-screen items-center justify-center bg-[#08080a] px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
          <div className="w-full max-w-[430px]">

            {/* Mobile Logo */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <img
                src="/logo.svg"
                alt="Agni Logo"
                className="h-12 w-12 rounded-full object-contain"
              />

              <span className="text-2xl font-bold">
                Agni
              </span>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-[36px] font-bold tracking-[-1px] text-gray-100">
                Sign in
              </h2>

              <p className="mt-3 text-[16px] text-gray-400">
                Welcome back. Enter your credentials to continue.
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mb-6 rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-cyan-400">
                  Demo Credentials
                </p>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="text-xs font-semibold text-cyan-300 transition hover:text-white"
                >
                  Use Demo
                </button>
              </div>

              <p className="mt-2 text-sm text-gray-400">
                Email:{" "}
                <span className="text-gray-200">
                  {DEMO_EMAIL}
                </span>
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Password:{" "}
                <span className="text-gray-200">
                  {DEMO_PASSWORD}
                </span>
              </p>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={() => console.log("Google Login clicked")}
              className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#29292d] bg-[#101012] text-[16px] font-semibold text-gray-200 transition hover:bg-[#18181b]"
            >
              <span className="text-xl font-bold text-[#4285F4]">
                G
              </span>

              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#28282c]" />

              <span className="text-sm text-gray-500">
                or
              </span>

              <div className="h-px flex-1 bg-[#28282c]" />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-[15px] font-medium text-gray-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-[52px] w-full rounded-lg border border-[#29292d] bg-[#101012] px-4 text-[15px] text-gray-100 outline-none placeholder:text-gray-500 transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[15px] font-medium text-gray-300"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => console.log("Forgot password clicked")}
                    className="text-[15px] text-gray-400 transition hover:text-cyan-400"
                  >
                    Forgot?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-[52px] w-full rounded-lg border border-[#29292d] bg-[#101012] px-4 pr-12 text-[15px] text-gray-100 outline-none placeholder:text-gray-500 transition focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#25c7e8] text-[16px] font-semibold text-[#061015] transition hover:bg-[#45d5f1] active:scale-[0.99]"
              >
                Sign in

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Register */}
            <p className="mt-11 text-center text-[15px] text-gray-400">
              New to Agni?{" "}
              <Link
                to="/register"
                className="font-semibold text-gray-200 transition hover:text-cyan-400"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;