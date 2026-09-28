import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import Security from "./Security";
import Users from "./Users";
import APIKeys from "./APIKeys";
import Profile from "./Profile";

import {
  Building2,
  Activity,
  UserRound,
  LockKeyhole,
  KeyRound,
  UsersRound,
  X,
  LogIn,
  Info,
  ChevronRight,
  Save,
} from "lucide-react";

export default function Settings() {
  const [searchParams] = useSearchParams();

  // =========================================================
  // ACTIVE SETTINGS SECTION
  // =========================================================
  const [activeSection, setActiveSection] = useState(
    searchParams.get("section") || "organization"
  );

  // =========================================================
  // PROFILE STATE
  // =========================================================
  const [firstName, setFirstName] = useState("Kamlesh");
  const [lastName, setLastName] = useState("Badgujar");

  // =========================================================
  // ORGANIZATION STATE
  // =========================================================
  const [organizationName, setOrganizationName] = useState("abc");
  const [website, setWebsite] = useState("");
  const [emailDomains, setEmailDomains] = useState("");
  const [region, setRegion] = useState("India");

  // =========================================================
  // NEW ORGANIZATION STATE
  // =========================================================
  const [isCreatingOrganization, setIsCreatingOrganization] =
    useState(false);

  const [newOrganizationName, setNewOrganizationName] = useState("");

  const email = "badgujarkamlesh13@gmail.com";

  // =========================================================
  // SETTINGS MENU
  // =========================================================
  const menuItems = [
    {
      id: "organization",
      label: "Organization",
      icon: Building2,
    },
    {
      id: "recent-activity",
      label: "Recent Activity",
      icon: Activity,
    },
    {
      id: "profile",
      label: "Profile",
      icon: UserRound,
    },
    {
      id: "security",
      label: "Security",
      icon: LockKeyhole,
    },
    {
      id: "api-keys",
      label: "API Keys",
      icon: KeyRound,
    },
    {
      id: "users",
      label: "Users",
      icon: UsersRound,
    },
  ];

  // =========================================================
  // SAVE ORGANIZATION SETTINGS
  // =========================================================
  const handleSaveOrganization = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "ravanai_organization",
      JSON.stringify({
        organizationName,
        website,
        emailDomains,
        region,
      })
    );

    toast.success("Changes saved successfully!");
  };

  // =========================================================
  // OPEN NEW ORGANIZATION FORM
  // =========================================================
  const handleNewOrganization = () => {
    setNewOrganizationName("");
    setIsCreatingOrganization(true);
  };

  // =========================================================
  // CANCEL NEW ORGANIZATION
  // =========================================================
  const handleCancelNewOrganization = () => {
    setNewOrganizationName("");
    setIsCreatingOrganization(false);
  };

  // =========================================================
  // CREATE NEW ORGANIZATION
  // =========================================================
  const handleCreateOrganization = (event) => {
    event.preventDefault();

    const trimmedName = newOrganizationName.trim();

    // Validation
    if (!trimmedName) {
      toast.error("Organization name is required.");
      return;
    }

    // Set new organization as active organization
    setOrganizationName(trimmedName);

    // Reset organization details
    setWebsite("");
    setEmailDomains("");
    setRegion("India");

    // Save to localStorage
    localStorage.setItem(
      "ravanai_organization",
      JSON.stringify({
        organizationName: trimmedName,
        website: "",
        emailDomains: "",
        region: "India",
      })
    );

    // Close create form
    setIsCreatingOrganization(false);
    setNewOrganizationName("");

    // Success toast
    toast.success(`Organization "${trimmedName}" created successfully!`);
  };

  // =========================================================
  // RECENT ACTIVITIES
  // =========================================================
  const activities = [
    {
      type: "login",
      title: "Login Success",
      email: email,
      details: `Email: ${email} · Provider: google`,
      date: "Sep 23, 2026, 3:54 PM",
      time: "2h ago",
    },
    {
      type: "info",
      title: "User Registered",
      email: email,
      details: `Email: ${email} · Org Name: abc`,
      date: "Sep 23, 2026, 10:58 AM",
      time: "7h ago",
      clickable: true,
    },
    {
      type: "info",
      title: "Org Joined",
      email: email,
      details: "Event: ORG_CREATE_SUCCESS · Name: abc",
      date: "Sep 23, 2026, 10:58 AM",
      time: "7h ago",
    },
  ];

  // =========================================================
  // ACTIVITY ICON
  // =========================================================
  const renderActivityIcon = (type) => {
    if (type === "login") {
      return <LogIn size={16} />;
    }

    return <Info size={16} />;
  };

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
        {/* =====================================================
            CLOSE BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            absolute right-5 top-5 z-30
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

        {/* =====================================================
            LEFT SETTINGS MENU
        ===================================================== */}

        <aside className="w-[240px] shrink-0 border-r border-white/[0.07] bg-[#101012]">
          <div className="border-b border-white/[0.07] px-4 py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] font-bold text-zinc-100">
                Settings
              </h1>

              <span
                className="
                  flex h-5 w-5 items-center justify-center
                  rounded-full border border-zinc-600
                  text-[11px] text-zinc-500
                "
              >
                i
              </span>
            </div>
          </div>

          <nav className="py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    relative flex w-full items-center gap-3
                    px-5 py-3
                    text-left text-[14px]
                    transition
                    ${
                      active
                        ? "bg-white/[0.05] text-zinc-100"
                        : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-[2px] bg-cyan-400" />
                  )}

                  <Icon size={17} />

                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* =====================================================
            RIGHT CONTENT
        ===================================================== */}

        <section className="min-w-0 flex-1 overflow-y-auto">

          {/* ===================================================
              ORGANIZATION
          =================================================== */}

          {activeSection === "organization" && (
            <div className="mx-auto max-w-[800px] px-7 py-10">

              {/* Header */}
              <div className="mb-7">
                <h2 className="text-[26px] font-bold tracking-tight">
                  Organization
                </h2>

                <p className="mt-1 text-[14px] text-zinc-500">
                  Manage your organization settings, members, and switch or
                  create new organizations.
                </p>
              </div>

              {/* =================================================
                  YOUR ORGANIZATIONS
              ================================================= */}

              <div
                className="
                  mb-6 rounded-xl
                  border border-white/[0.08]
                  bg-[#0d0d10]
                  p-6
                "
              >
                <div className="mb-5 flex items-start justify-between">

                  <div>
                    <div className="flex items-center gap-2">
                      <Building2
                        size={18}
                        className="text-cyan-400"
                      />

                      <h3 className="text-[17px] font-bold">
                        Your Organizations
                      </h3>
                    </div>

                    <p className="mt-1 text-[12px] text-zinc-500">
                      Select an organization to work on or create a new one.
                    </p>
                  </div>

                  {/* New Organization Button */}
                  {!isCreatingOrganization && (
                    <button
                      type="button"
                      onClick={handleNewOrganization}
                      className="
                        rounded-lg
                        border border-cyan-400/30
                        bg-cyan-400/[0.05]
                        px-3 py-2
                        text-[12px]
                        font-semibold
                        text-cyan-400
                        transition
                        hover:bg-cyan-400/[0.10]
                      "
                    >
                      + New Organization
                    </button>
                  )}

                  {/* Cancel Button */}
                  {isCreatingOrganization && (
                    <button
                      type="button"
                      onClick={handleCancelNewOrganization}
                      className="
                        rounded-lg
                        bg-zinc-700
                        px-4 py-2
                        text-[12px]
                        font-semibold
                        text-zinc-300
                        transition
                        hover:bg-zinc-600
                      "
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {/* =================================================
                    NEW ORGANIZATION FORM
                ================================================= */}

                {isCreatingOrganization && (
                  <form
                    onSubmit={handleCreateOrganization}
                    className="
                      mb-4 rounded-xl
                      border border-white/[0.08]
                      bg-[#171719]
                      p-3
                    "
                  >
                    <div className="flex items-center gap-3">

                      <input
                        autoFocus
                        type="text"
                        value={newOrganizationName}
                        onChange={(e) =>
                          setNewOrganizationName(e.target.value)
                        }
                        placeholder="Enter organization name"
                        className="
                          h-[40px]
                          flex-1
                          rounded-lg
                          border border-zinc-600
                          bg-[#0d0d10]
                          px-3
                          text-sm
                          text-zinc-100
                          outline-none
                          placeholder:text-zinc-500
                          focus:border-cyan-400/70
                        "
                      />

                      <button
                        type="submit"
                        className="
                          h-[40px]
                          rounded-lg
                          bg-cyan-400
                          px-5
                          text-[12px]
                          font-semibold
                          text-[#041015]
                          transition
                          hover:bg-cyan-300
                        "
                      >
                        Create Org
                      </button>

                    </div>
                  </form>
                )}

                {/* Existing Organization */}
                <div
                  className="
                    relative flex w-[240px]
                    items-center justify-between
                    rounded-xl
                    border border-cyan-400/60
                    bg-cyan-400/[0.06]
                    px-4 py-4
                  "
                >
                  <span
                    className="
                      absolute left-0 top-0
                      h-full w-[3px]
                      rounded-l-xl
                      bg-cyan-400
                    "
                  />

                  <div>
                    <p className="text-[15px] font-bold">
                      {organizationName}
                    </p>

                    <p className="mt-1 text-[12px] text-zinc-400">
                      ADMIN
                    </p>
                  </div>

                  <span className="text-cyan-400">
                    ✓
                  </span>
                </div>
              </div>

              {/* =================================================
                  ORGANIZATION DETAILS
              ================================================= */}

              <form
                onSubmit={handleSaveOrganization}
                className="
                  rounded-xl
                  border border-white/[0.08]
                  bg-[#0d0d10]
                  p-6
                "
              >
                {/* Organization Header */}
                <div className="mb-5 flex items-center gap-4">

                  <div
                    className="
                      flex h-[60px] w-[60px]
                      items-center justify-center
                      rounded-xl
                      bg-cyan-400
                      text-[#061218]
                    "
                  >
                    <Building2 size={30} />
                  </div>

                  <div>
                    <h3 className="text-[20px] font-bold">
                      {organizationName}
                    </h3>

                    <p className="mt-1 text-[11px] text-zinc-500">
                      # 2aad18de-aa62-4caa-9b2b-2068da7e2852
                    </p>
                  </div>

                </div>

                <div className="mb-6 h-px bg-white/[0.07]" />

                {/* Organization Name + Website */}
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
                      Organization Name
                    </label>

                    <input
                      value={organizationName}
                      onChange={(e) =>
                        setOrganizationName(e.target.value)
                      }
                      className="
                        h-[46px] w-full
                        rounded-lg
                        border border-white/[0.08]
                        bg-[#171719]
                        px-3
                        text-sm
                        outline-none
                        focus:border-cyan-400/60
                      "
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
                      Website
                    </label>

                    <input
                      value={website}
                      onChange={(e) =>
                        setWebsite(e.target.value)
                      }
                      placeholder="https://company.com"
                      className="
                        h-[46px] w-full
                        rounded-lg
                        border border-white/[0.08]
                        bg-[#171719]
                        px-3
                        text-sm
                        outline-none
                        placeholder:text-zinc-600
                        focus:border-cyan-400/60
                      "
                    />
                  </div>

                </div>

                {/* Email Domains */}
                <div className="mt-4">

                  <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
                    Allowed Email Domains

                    <span className="font-normal text-zinc-600">
                      {" "}
                      (comma-separated)
                    </span>
                  </label>

                  <input
                    value={emailDomains}
                    onChange={(e) =>
                      setEmailDomains(e.target.value)
                    }
                    placeholder="example.com, acme.com"
                    className="
                      h-[46px] w-full
                      rounded-lg
                      border border-white/[0.08]
                      bg-[#171719]
                      px-3
                      text-sm
                      outline-none
                      placeholder:text-zinc-600
                      focus:border-cyan-400/60
                    "
                  />

                </div>

                {/* Region */}
                <div className="mt-4">

                  <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
                    Your Region
                  </label>

                  <select
                    value={region}
                    onChange={(e) =>
                      setRegion(e.target.value)
                    }
                    className="
                      h-[46px] w-full
                      rounded-lg
                      border border-white/[0.08]
                      bg-[#171719]
                      px-3
                      text-sm
                      outline-none
                    "
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                  </select>

                </div>

                {/* Save Changes */}
                <button
                  type="submit"
                  className="
                    mt-5 flex items-center gap-2
                    rounded-lg
                    bg-cyan-400
                    px-5 py-3
                    text-sm
                    font-semibold
                    text-[#041015]
                    transition
                    hover:bg-cyan-300
                  "
                >
                  <Save size={16} />
                  Save Changes
                </button>

                <div className="my-6 h-px bg-white/[0.07]" />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">

                  <div
                    className="
                      rounded-lg
                      border border-white/[0.07]
                      bg-[#171719]
                      p-4
                    "
                  >
                    <p className="text-xs text-zinc-500">
                      Credits
                    </p>

                    <p className="mt-1 font-bold">
                      10
                    </p>
                  </div>

                  <div
                    className="
                      rounded-lg
                      border border-white/[0.07]
                      bg-[#171719]
                      p-4
                    "
                  >
                    <p className="text-xs text-zinc-500">
                      Plan
                    </p>

                    <p className="mt-1 font-bold">
                      Free
                    </p>
                  </div>

                  <div
                    className="
                      rounded-lg
                      border border-white/[0.07]
                      bg-[#171719]
                      p-4
                    "
                  >
                    <p className="text-xs text-zinc-500">
                      Max Concurrency
                    </p>

                    <p className="mt-1 font-bold">
                      5
                    </p>
                  </div>

                </div>
              </form>
            </div>
          )}

          {/* ===================================================
              RECENT ACTIVITY
          =================================================== */}

          {activeSection === "recent-activity" && (
            <div className="mx-auto max-w-[800px] px-7 py-10">

              <div className="mb-7">

                <h2 className="text-[26px] font-bold">
                  Recent Activity
                </h2>

                <p className="mt-1 text-[14px] text-zinc-500">
                  View the latest events and actions in your organization.
                  Select an entry to see its full details.
                </p>

              </div>

              <div
                className="
                  rounded-xl
                  border border-white/[0.08]
                  bg-[#0d0d10]
                  p-4
                "
              >

                {activities.map((activity, index) => (
                  <React.Fragment key={index}>

                    <div
                      className={`
                        flex items-center gap-4
                        rounded-lg px-3 py-5
                        ${
                          activity.clickable
                            ? "cursor-pointer bg-white/[0.02] hover:bg-white/[0.04]"
                            : ""
                        }
                      `}
                    >

                      <div
                        className="
                          flex h-8 w-8
                          items-center justify-center
                          text-cyan-400
                        "
                      >
                        {renderActivityIcon(activity.type)}
                      </div>

                      <div className="min-w-0 flex-1">

                        <h3 className="text-[15px] font-medium">
                          {activity.title}
                        </h3>

                        <p className="mt-1 text-[12px] text-zinc-500">
                          {activity.email}
                        </p>

                        <p className="mt-1 text-[12px] text-zinc-500">
                          {activity.details}
                        </p>

                      </div>

                      <div className="flex shrink-0 flex-col items-end">

                        <span className="text-[12px] text-zinc-400">
                          {activity.date}
                        </span>

                        <span className="mt-1 text-[11px] text-zinc-600">
                          {activity.time}
                        </span>

                      </div>

                      {activity.clickable && (
                        <ChevronRight
                          size={16}
                          className="text-zinc-600"
                        />
                      )}

                    </div>

                    {index < activities.length - 1 && (
                      <div className="h-px bg-white/[0.05]" />
                    )}

                  </React.Fragment>
                ))}

                <div className="mt-2 h-px bg-white/[0.07]" />

                <div className="px-3 pt-5 text-[12px] text-zinc-500">
                  Showing 3 of 3 events
                </div>

              </div>
            </div>
          )}

          {/* ===================================================
              PROFILE
          =================================================== */}

          {activeSection === "profile" && <Profile />}

          {/* ===================================================
              SECURITY
          =================================================== */}

          {activeSection === "security" && <Security />}

          {/* ===================================================
              API KEYS
          =================================================== */}

          {activeSection === "api-keys" && <APIKeys />}

          {/* ===================================================
              USERS
          =================================================== */}

          {activeSection === "users" && <Users />}

        </section>
      </div>
    </div>
  );
}