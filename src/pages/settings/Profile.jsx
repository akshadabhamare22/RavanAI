import React, { useState } from "react";

import {
  UserRound,
  Mail,
  Shield,
  Save,
} from "lucide-react";

import { toast } from "react-toastify";

export default function Profile() {
  const [firstName, setFirstName] = useState("Kamlesh");
  const [lastName, setLastName] = useState("Badgujar");

  const [errors, setErrors] = useState({});

  const email = "badgujarkamlesh13@gmail.com";

  const handleSave = (e) => {
    e.preventDefault();

    const newErrors = {};

    // First Name validation
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Last Name validation
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    setErrors(newErrors);

    // Stop if there are validation errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const profile = {
      firstName,
      lastName,
      email,
    };

    localStorage.setItem(
      "ravanai_profile",
      JSON.stringify(profile)
    );

    setErrors({});

    // Success Toast
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="mx-auto max-w-[800px] px-7 py-10">

      {/* =========================
          PROFILE HEADER
      ========================= */}

      <div className="mb-7">
        <h2 className="text-[26px] font-bold tracking-tight text-zinc-100">
          Profile
        </h2>

        <p className="mt-1 text-[14px] text-zinc-500">
          Manage your personal information
        </p>
      </div>

      {/* =========================
          USER INFORMATION
      ========================= */}

      <div
        className="
          mb-6 flex items-center gap-4
          rounded-xl
          border border-white/[0.08]
          bg-[#0d0d10]
          px-6 py-6
        "
      >
        {/* Avatar */}

        <div
          className="
            flex h-[68px] w-[68px] shrink-0
            items-center justify-center
            rounded-full
            bg-cyan-400
            text-[#061218]
          "
        >
          <UserRound
            size={36}
            strokeWidth={1.8}
          />
        </div>

        {/* Name + Email */}

        <div className="min-w-0">
          <h3 className="text-[21px] font-bold text-zinc-100">
            {firstName} {lastName}
          </h3>

          <p className="mt-1 text-[15px] text-zinc-400">
            {email}
          </p>
        </div>
      </div>

      {/* =========================
          EMAIL + ROLE
      ========================= */}

      <div className="mb-6 grid grid-cols-2 gap-4">

        {/* Email */}

        <div
          className="
            rounded-xl
            border border-white/[0.08]
            bg-[#0d0d10]
            p-5
          "
        >
          <div className="mb-3 flex items-center gap-3">
            <Mail
              size={20}
              className="text-cyan-400"
              strokeWidth={1.8}
            />

            <span className="text-[15px] font-medium text-zinc-400">
              Email
            </span>
          </div>

          <p className="break-all text-[16px] font-medium text-zinc-200">
            {email}
          </p>
        </div>

        {/* Role */}

        <div
          className="
            rounded-xl
            border border-white/[0.08]
            bg-[#0d0d10]
            p-5
          "
        >
          <div className="mb-3 flex items-center gap-3">
            <Shield
              size={20}
              className="text-cyan-400"
              strokeWidth={1.8}
            />

            <span className="text-[15px] font-medium text-zinc-400">
              Role
            </span>
          </div>

          <span
            className="
              inline-flex
              rounded-full
              border border-cyan-400/40
              bg-cyan-400/[0.08]
              px-3 py-1
              text-[11px]
              font-bold
              text-cyan-400
            "
          >
            ADMIN
          </span>
        </div>
      </div>

      {/* =========================
          EDIT PROFILE
      ========================= */}

      <form
        onSubmit={handleSave}
        className="
          rounded-xl
          border border-white/[0.08]
          bg-[#0d0d10]
          p-6
        "
      >
        <h3 className="mb-7 text-[19px] font-bold text-zinc-100">
          Edit Profile
        </h3>

        <div className="grid grid-cols-2 gap-4">

          {/* =========================
              FIRST NAME
          ========================= */}

          <div>
            <label
              htmlFor="firstName"
              className="
                mb-2 block
                text-[13px]
                font-medium
                text-zinc-400
              "
            >
              First Name
            </label>

            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  firstName: "",
                }));
              }}
              className={`
                h-[52px] w-full
                rounded-lg
                border
                bg-[#111114]
                px-4
                text-[14px]
                text-zinc-100
                outline-none
                transition
                ${
                  errors.firstName
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                    : "border-white/[0.09] focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20"
                }
              `}
            />

            {errors.firstName && (
              <p className="mt-1.5 text-[12px] text-red-500">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* =========================
              LAST NAME
          ========================= */}

          <div>
            <label
              htmlFor="lastName"
              className="
                mb-2 block
                text-[13px]
                font-medium
                text-zinc-400
              "
            >
              Last Name
            </label>

            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  lastName: "",
                }));
              }}
              className={`
                h-[52px] w-full
                rounded-lg
                border
                bg-[#111114]
                px-4
                text-[14px]
                text-zinc-100
                outline-none
                transition
                ${
                  errors.lastName
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                    : "border-white/[0.09] focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20"
                }
              `}
            />

            {errors.lastName && (
              <p className="mt-1.5 text-[12px] text-red-500">
                {errors.lastName}
              </p>
            )}
          </div>

        </div>

        {/* =========================
            SAVE BUTTON
        ========================= */}

        <button
          type="submit"
          className="
            mt-5 flex h-[54px] w-full
            items-center justify-center gap-2
            rounded-lg
            bg-cyan-400
            text-[15px]
            font-semibold
            text-[#041015]
            transition
            hover:bg-cyan-300
          "
        >
          <Save size={17} />
          Save Changes
        </button>
      </form>
    </div>
  );
}