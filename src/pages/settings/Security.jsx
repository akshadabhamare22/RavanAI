import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  KeyRound,
  Eye,
  EyeOff,
  Shield,
  Monitor,
  Trash2,
} from "lucide-react";

export default function Security() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const sessions = [
    {
      id: 1,
      device: "Unknown device",
      ip: "Unknown IP",
      date: "Sep 24, 2026, 10:18 AM",
    },
    {
      id: 2,
      device: "Unknown device",
      ip: "Unknown IP",
      date: "Sep 23, 2026, 2:28 PM",
    },
  ];

  // =========================
  // PASSWORD INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    // If confirming password, also clear mismatch error
    if (name === "newPassword" || name === "confirm") {
      setErrors((prev) => ({
        ...prev,
        confirm: "",
      }));
    }
  };

  // =========================
  // CHANGE PASSWORD
  // =========================

  const handlePasswordChange = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Current password
    if (!passwords.current.trim()) {
      newErrors.current = "Current password is required.";
    }

    // New password
    if (!passwords.newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    } else if (passwords.newPassword.length < 8) {
      newErrors.newPassword =
        "Password must be at least 8 characters.";
    }

    // Confirm password
    if (!passwords.confirm.trim()) {
      newErrors.confirm = "Please confirm your new password.";
    } else if (passwords.newPassword !== passwords.confirm) {
      newErrors.confirm =
        "New password and confirm password do not match.";
    }

    setErrors(newErrors);

    // Stop if there are errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Password changed successfully
    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    setErrors({});
    toast.success("Password changed successfully!");
  };

  // =========================
  // REVOKE SESSION
  // =========================

  const handleRevoke = (id) => {
    // No alert popup
    console.log(`Session ${id} revoked.`);
  };

  // =========================
  // REVOKE ALL
  // =========================

  const handleRevokeAll = () => {
    // No alert popup
    console.log("All other sessions have been revoked.");
  };

  return (
    <div className="mx-auto max-w-[800px] px-7 py-10 text-white">

      {/* =========================================
          SECURITY HEADER
      ========================================= */}

      <div className="mb-7">
        <h2 className="text-[26px] font-bold tracking-tight">
          Security
        </h2>

        <p className="mt-1 text-[14px] text-zinc-500">
          Manage your password, 2FA, and active sessions.
        </p>
      </div>

      {/* =========================================
          CHANGE PASSWORD
      ========================================= */}

      <div className="mb-6 rounded-xl border border-white/[0.08] bg-[#0d0d10] p-6">

        <div className="mb-6 flex items-center gap-3">
          <KeyRound
            size={20}
            className="text-cyan-400"
          />

          <h3 className="text-[17px] font-bold">
            Change Password
          </h3>
        </div>

        <form onSubmit={handlePasswordChange}>

          {/* Current Password */}

          <PasswordInput
            label="Current Password"
            name="current"
            value={passwords.current}
            onChange={handleChange}
            showPassword={showCurrent}
            setShowPassword={setShowCurrent}
            error={errors.current}
          />

          {/* New Password */}

          <PasswordInput
            label="New Password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            showPassword={showNew}
            setShowPassword={setShowNew}
            error={errors.newPassword}
          />

          {/* Confirm Password */}

          <PasswordInput
            label="Confirm New Password"
            name="confirm"
            value={passwords.confirm}
            onChange={handleChange}
            showPassword={showConfirm}
            setShowPassword={setShowConfirm}
            error={errors.confirm}
          />

          {/* Change Password Button */}

          <button
            type="submit"
            className="
              mt-1
              flex h-[54px] w-full
              items-center justify-center
              rounded-lg
              bg-cyan-400
              text-[15px]
              font-semibold
              text-[#041015]
              transition
              hover:bg-cyan-300
            "
          >
            Change Password
          </button>

        </form>
      </div>

      {/* =========================================
          TWO FACTOR AUTHENTICATION
      ========================================= */}

      <div className="mb-6 rounded-xl border border-white/[0.08] bg-[#0d0d10] p-6">

        <div className="flex items-start justify-between">

          <div className="flex items-start gap-4">

            {/* Icon */}

            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-lg
                bg-white/[0.05]
              "
            >
              <Shield
                size={21}
                className="text-zinc-400"
              />
            </div>

            {/* Text */}

            <div>
              <h3 className="text-[17px] font-bold">
                Two-Factor Authentication
              </h3>

              <p className="mt-1 text-[13px] text-zinc-500">
                Add an extra layer of security.
              </p>
            </div>

          </div>

          {/* Status */}

          <span
            className={`
              rounded-full
              px-3 py-1
              text-[11px]
              font-semibold
              ${
                twoFactorEnabled
                  ? "bg-green-500/[0.10] text-green-400"
                  : "bg-white/[0.08] text-zinc-400"
              }
            `}
          >
            {twoFactorEnabled ? "Enabled" : "Disabled"}
          </span>

        </div>

        {/* Enable / Disable Button */}

        <button
          type="button"
          onClick={() =>
            setTwoFactorEnabled((prev) => !prev)
          }
          className="
            mt-7
            flex items-center gap-2
            rounded-lg
            bg-cyan-400
            px-5 py-2.5
            text-[14px]
            font-semibold
            text-[#041015]
            transition
            hover:bg-cyan-300
          "
        >
          <Shield size={17} />

          {twoFactorEnabled
            ? "Disable 2FA"
            : "Enable 2FA"}
        </button>

      </div>

      {/* =========================================
          ACTIVE SESSIONS
      ========================================= */}

      <div className="rounded-xl border border-white/[0.08] bg-[#0d0d10] p-6">

        {/* Header */}

        <div className="mb-6 flex items-start justify-between">

          <div>
            <h3 className="text-[17px] font-bold">
              Active Sessions
            </h3>

            <p className="mt-1 text-[13px] text-zinc-500">
              Review and revoke access from other devices.
            </p>
          </div>

          {/* Revoke All */}

          <button
            type="button"
            onClick={handleRevokeAll}
            className="
              flex items-center gap-2
              rounded-lg
              border border-red-500/40
              px-4 py-2
              text-[13px]
              font-medium
              text-red-400
              transition
              hover:bg-red-500/[0.10]
            "
          >
            <Trash2 size={16} />

            Revoke All
          </button>

        </div>

        {/* Sessions */}

        <div className="space-y-3">

          {sessions.map((session) => (
            <div
              key={session.id}
              className="
                flex items-center
                justify-between
                rounded-lg
                border border-white/[0.05]
                bg-[#171719]
                px-6 py-4
              "
            >

              {/* Device */}

              <div className="flex items-center gap-4">

                <Monitor
                  size={20}
                  className="text-zinc-400"
                />

                <div>
                  <p className="text-[14px] font-semibold">
                    {session.device}
                  </p>

                  <p className="mt-1 text-[12px] text-zinc-500">
                    {session.ip} · {session.date}
                  </p>
                </div>

              </div>

              {/* Revoke */}

              <button
                type="button"
                onClick={() =>
                  handleRevoke(session.id)
                }
                className="
                  flex items-center gap-2
                  rounded-lg
                  border border-red-500/40
                  px-4 py-2
                  text-[13px]
                  font-medium
                  text-red-400
                  transition
                  hover:bg-red-500/[0.10]
                "
              >
                <Trash2 size={15} />

                Revoke
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

/* =========================================
   PASSWORD INPUT COMPONENT
========================================= */

function PasswordInput({
  label,
  name,
  value,
  onChange,
  showPassword,
  setShowPassword,
  error,
}) {
  return (
    <div className="mb-5">

      <label className="mb-2 block text-[13px] font-semibold text-zinc-400">
        {label}
      </label>

      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className={`
            h-[52px]
            w-full
            rounded-lg
            border
            bg-[#111114]
            px-4
            pr-12
            text-zinc-100
            outline-none
            transition
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-white/[0.09] focus:border-cyan-400/60"
            }
          `}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-zinc-500
            transition
            hover:text-zinc-200
          "
        >
          {showPassword ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}
        </button>

      </div>

      {/* Inline Error */}

      {error && (
        <p className="mt-1.5 text-[12px] text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}