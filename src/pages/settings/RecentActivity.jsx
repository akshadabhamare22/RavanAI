import React from "react";
import { NavLink } from "react-router-dom";
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
} from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      type: "login",
      title: "Login Success",
      email: "badgujarkamlesh13@gmail.com",
      details: "Email: badgujarkamlesh13@gmail.com · Provider: google",
      date: "Sep 23, 2026, 3:54 PM",
      time: "2h ago",
    },
    {
      type: "info",
      title: "User Registered",
      email: "badgujarkamlesh13@gmail.com",
      details:
        "Email: badgujarkamlesh13@gmail.com · Org Name: abc",
      date: "Sep 23, 2026, 10:58 AM",
      time: "7h ago",
      clickable: true,
    },
    {
      type: "info",
      title: "Org Joined",
      email: "badgujarkamlesh13@gmail.com",
      details: "Event: ORG_CREATE_SUCCESS · Name: abc",
      date: "Sep 23, 2026, 10:58 AM",
      time: "7h ago",
    },
  ];

const settingsItems = [
  {
    label: "Organization",
    icon: Building2,
    path: "/settings/general",
  },
  {
    label: "Recent Activity",
    icon: Activity,
    path: "/settings/recent-activity",
  },
  {
    label: "Profile",
    icon: UserRound,
    path: "/settings/profile",
  },
  {
    label: "Security",
    icon: LockKeyhole,
    path: "/settings/security",
  },
  {
    label: "API Keys",
    icon: KeyRound,
    path: "/settings/api-keys",
  },
  {
    label: "Users",
    icon: UsersRound,
    path: "/settings/users",
  },
];

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
            LEFT SETTINGS SIDEBAR
        ===================================================== */}

        <aside className="w-[240px] shrink-0 border-r border-white/[0.07] bg-[#101012]">
          {/* Header */}

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
                i
              </span>
            </div>
          </div>

          {/* Settings Navigation */}

          <nav className="py-2">
           {settingsItems.map((item) => {
            const Icon = item.icon;

            return (
                <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => `
                    relative flex w-full items-center gap-3
                    px-5 py-3
                    text-left text-[14px]
                    transition
                    ${
                        isActive
                            ? "bg-white/[0.05] text-zinc-100"
                            : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200"
                    }
                `}
            >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-0 h-full w-[2px] bg-cyan-400" />
          )}

          <Icon size={17} />

          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
})}
          </nav>
        </aside>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <section className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[800px] px-7 py-10">
            {/* PAGE HEADER */}

            <div className="mb-7">
              <h2 className="text-[26px] font-bold tracking-tight text-zinc-100">
                Recent Activity
              </h2>

              <p className="mt-1 text-[14px] text-zinc-500">
                View the latest events and actions in your organization.
                Select an entry to see its full details.
              </p>
            </div>

            {/* =================================================
                ACTIVITY CARD
            ================================================= */}

            <div
              className="
                rounded-xl
                border border-white/[0.08]
                bg-[#0d0d10]
                p-4
              "
            >
              {activities.map((activity, index) => (
                <React.Fragment key={`${activity.title}-${index}`}>
                  <div
                    className={`
                      group flex items-center gap-4
                      rounded-lg
                      px-3 py-5
                      transition
                      ${
                        activity.clickable
                          ? "cursor-pointer bg-white/[0.02] hover:bg-white/[0.04]"
                          : ""
                      }
                    `}
                  >
                    {/* Activity icon */}

                    <div
                      className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        text-cyan-400
                      "
                    >
                      {renderActivityIcon(activity.type)}
                    </div>

                    {/* Activity details */}

                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-medium text-zinc-200">
                        {activity.title}
                      </h3>

                      <p className="mt-1 flex items-center gap-1.5 text-[12px] text-zinc-500">
                        <span className="truncate">
                          {activity.email}
                        </span>
                      </p>

                      <p className="mt-1 text-[12px] text-zinc-500">
                        {activity.details}
                      </p>
                    </div>

                    {/* Date/time */}

                    <div className="flex shrink-0 flex-col items-end">
                      <span className="text-[12px] text-zinc-400">
                        {activity.date}
                      </span>

                      <span className="mt-1 text-[11px] text-zinc-600">
                        {activity.time}
                      </span>
                    </div>

                    {/* Arrow */}

                    {activity.clickable && (
                      <ChevronRight
                        size={16}
                        className="
                          shrink-0
                          text-zinc-600
                          transition
                          group-hover:translate-x-0.5
                          group-hover:text-zinc-400
                        "
                      />
                    )}
                  </div>

                  {/* Divider */}

                  {index < activities.length - 1 && (
                    <div className="h-px bg-white/[0.05]" />
                  )}
                </React.Fragment>
              ))}

              {/* Bottom divider */}

              <div className="mt-2 h-px bg-white/[0.07]" />

              {/* Footer */}

              <div className="px-3 pt-5">
                <p className="text-[12px] text-zinc-500">
                  Showing 3 of 3 events
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}