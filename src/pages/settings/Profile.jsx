import React, { useState } from "react";

import {
  Building2,
  Activity,
  UserRound,
  LockKeyhole,
  KeyRound,
  UsersRound,
  Mail,
  Shield,
  X,
} from "lucide-react";


export default function Profile() {
  const [firstName, setFirstName] = useState("Kamlesh");
  const [lastName, setLastName] = useState("Badgujar");

  const email = "badgujarkamlesh13@gmail.com";

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "ravanai_profile",
      JSON.stringify({
        firstName,
        lastName,
        email,
      })
    );

    alert("Profile updated successfully!");
  };

  const settingsItems = [
    {
      label: "Organization",
      icon: Building2,
    },
    {
      label: "Recent Activity",
      icon: Activity,
    },
    {
      label: "Profile",
      icon: UserRound,
      active: true,
    },
    {
      label: "Security",
      icon: LockKeyhole,
    },
    {
      label: "API Keys",
      icon: KeyRound,
    },
    {
      label: "Users",
      icon: UsersRound,
    },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-[2px]">
      <div
        className="
          relative flex h-[calc(100vh-120px)] w-full max-w-[1100px]
          overflow-hidden rounded-xl
          border border-white/[0.08]
          bg-[#0b0b0e]
          text-zinc-100
          shadow-2xl
        "
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            absolute right-5 top-5 z-20
            flex h-8 w-8 items-center justify-center
            rounded-lg
            text-zinc-500
            transition
            hover:bg-white/[0.06]
            hover:text-zinc-200
          "
        >
          <X size={20} />
        </button>

        {/* LEFT SETTINGS SIDEBAR */}
        <aside className="w-[240px] shrink-0 border-r border-white/[0.07] bg-[#101012]">
          {/* SETTINGS TITLE */}
          <div className="border-b border-white/[0.07] px-4 py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] font-bold text-zinc-100">
                Settings
              </h1>

              <span
                className="
                  flex h-4 w-4 items-center justify-center
                  rounded-full border border-zinc-600
                  text-[10px] text-zinc-500
                "
              >
                
              </span>
            </div>
          </div>

          {/* SETTINGS MENU */}
          <nav className="py-2">
            {settingsItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  className={`
                    relative flex w-full items-center gap-3
                    px-5 py-3 text-left text-[14px]
                    transition
                    ${
                      item.active
                        ? "bg-white/[0.05] text-zinc-100"
                        : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200"
                    }
                  `}
                >
                  {item.active && (
                    <span className="absolute left-0 top-0 h-full w-[2px] bg-cyan-400" />
                  )}

                  <Icon size={17} />

                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* RIGHT CONTENT */}
        <section className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[800px] px-7 py-10">

            {/* PAGE HEADER */}
            <div className="mb-7">
              <h2 className="text-[26px] font-bold tracking-tight text-zinc-100">
                Profile
              </h2>

              <p className="mt-1 text-[14px] text-zinc-500">
                Manage your personal information
              </p>
            </div>

            {/* PROFILE HEADER CARD */}
            <div
              className="
                mb-6 flex items-center gap-4
                rounded-xl
                border border-white/[0.08]
                bg-[#0d0d10]
                px-6 py-6
              "
            >
              {/* AVATAR */}
              <div
                className="
                  flex h-[68px] w-[68px] shrink-0
                  items-center justify-center
                  rounded-full
                  bg-cyan-400
                  text-[#061218]
                "
              >
                <UserRound size={36} strokeWidth={1.6} />
              </div>

              {/* NAME + EMAIL */}
              <div className="min-w-0">
                <h3 className="text-[21px] font-bold text-zinc-100">
                  {firstName} {lastName}
                </h3>

                <p className="mt-1 text-[15px] text-zinc-400">
                  {email}
                </p>
              </div>
            </div>

            {/* EMAIL + ROLE */}
            <div className="mb-6 grid grid-cols-2 gap-4">

              {/* EMAIL CARD */}
              <div
                className="
                  rounded-xl
                  border border-white/[0.08]
                  bg-[#0d0d10]
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-3">
                  <Mail size={20} className="text-cyan-400" />

                  <span className="text-[14px] font-medium text-zinc-400">
                    Email
                  </span>
                </div>

                <p className="break-all text-[16px] font-semibold text-zinc-200">
                  {email}
                </p>
              </div>

              {/* ROLE CARD */}
              <div
                className="
                  rounded-xl
                  border border-white/[0.08]
                  bg-[#0d0d10]
                  p-5
                "
              >
                <div className="mb-3 flex items-center gap-3">
                  <Shield size={20} className="text-cyan-400" />

                  <span className="text-[14px] font-medium text-zinc-400">
                    Role
                  </span>
                </div>

                <span
                  className="
                    inline-flex rounded-full
                    border border-cyan-400/40
                    bg-cyan-400/[0.08]
                    px-3 py-1
                    text-[11px] font-bold
                    tracking-wide text-cyan-400
                  "
                >
                  ADMIN
                </span>
              </div>
            </div>

            {/* EDIT PROFILE */}
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

                {/* FIRST NAME */}
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
                    onChange={(event) =>
                      setFirstName(event.target.value)
                    }
                    className="
                      h-[52px] w-full
                      rounded-lg
                      border border-white/[0.09]
                      bg-[#111114]
                      px-4
                      text-[15px]
                      text-zinc-100
                      outline-none
                      transition
                      focus:border-cyan-400/60
                      focus:ring-1
                      focus:ring-cyan-400/20
                    "
                  />
                </div>

                {/* LAST NAME */}
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
                    onChange={(event) =>
                      setLastName(event.target.value)
                    }
                    className="
                      h-[52px] w-full
                      rounded-lg
                      border border-white/[0.09]
                      bg-[#111114]
                      px-4
                      text-[15px]
                      text-zinc-100
                      outline-none
                      transition
                      focus:border-cyan-400/60
                      focus:ring-1
                      focus:ring-cyan-400/20
                    "
                  />
                </div>
              </div>

              {/* SAVE BUTTON */}
              <button
                type="submit"
                className="
                  mt-5 h-[54px] w-full
                  rounded-lg
                  bg-cyan-400
                  text-[15px]
                  font-semibold
                  text-[#041015]
                  transition
                  hover:bg-cyan-300
                  active:scale-[0.99]
                "
              >
                Save Changes
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}