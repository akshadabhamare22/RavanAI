import React, { useState } from "react";
import {
  UsersRound,
  UserPlus,
  Search,
  Mail,
  Shield,
} from "lucide-react";

export default function Users() {
  const [activeTab, setActiveTab] = useState("members");

  const [search, setSearch] = useState("");

  const [inviteData, setInviteData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Kamlesh Badgujar",
      email: "badgujarkamlesh13@gmail.com",
      role: "ADMIN",
      currentUser: true,
    },
  ]);

  /* =========================================
     INVITE INPUT CHANGE
  ========================================= */

  const handleInviteChange = (e) => {
    const { name, value } = e.target;

    setInviteData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =========================================
     INVITE SUBMIT
  ========================================= */

  const handleInvite = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Email validation
    if (!inviteData.email.trim()) {
      newErrors.email = "Please enter a valid email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // First name validation
    if (!inviteData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Last name validation
    if (!inviteData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    setErrors(newErrors);

    // Stop if validation errors exist
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: `${inviteData.firstName.trim()} ${inviteData.lastName.trim()}`,
      email: inviteData.email.trim(),
      role: inviteData.role === "admin" ? "ADMIN" : "USER",
      currentUser: false,
    };

    setUsers((prev) => [...prev, newUser]);

    // Reset form
    setInviteData({
      email: "",
      firstName: "",
      lastName: "",
      role: "user",
    });

    setErrors({});

    // Go back to Members
    setActiveTab("members");
  };

  /* =========================================
     FILTER USERS
  ========================================= */

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-[800px] px-7 py-10 text-white">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="mb-7 flex items-start justify-between">
        <div>
          <h2 className="text-[26px] font-bold tracking-tight">
            User Management
          </h2>

          <p className="mt-1 text-[14px] text-zinc-500">
            {users.length} user{users.length !== 1 ? "s" : ""} in your
            organization
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveTab("invite");
            setErrors({});
          }}
          className="
            flex items-center gap-2
            rounded-lg
            bg-cyan-400
            px-4 py-2.5
            text-[13px]
            font-semibold
            text-[#041015]
            transition
            hover:bg-cyan-300
          "
        >
          <UserPlus size={17} />
          Invite User
        </button>
      </div>

      {/* =========================================
          TABS
      ========================================= */}

      <div className="mb-6 flex rounded-xl border border-white/[0.08] bg-[#0d0d10] p-1">

        {/* MEMBERS TAB */}

        <button
          type="button"
          onClick={() => setActiveTab("members")}
          className={`
            flex flex-1
            items-center justify-center
            gap-2
            rounded-lg
            py-3
            text-[14px]
            font-semibold
            transition
            ${
              activeTab === "members"
                ? "bg-white/[0.06] text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }
          `}
        >
          <UsersRound size={17} />

          Members

          <span
            className="
              flex h-5 min-w-5
              items-center justify-center
              rounded-full
              bg-cyan-400/[0.15]
              px-1.5
              text-[11px]
              text-cyan-400
            "
          >
            {users.length}
          </span>
        </button>

        {/* INVITE TAB */}

        <button
          type="button"
          onClick={() => {
            setActiveTab("invite");
            setErrors({});
          }}
          className={`
            flex flex-1
            items-center justify-center
            gap-2
            rounded-lg
            py-3
            text-[14px]
            font-semibold
            transition
            ${
              activeTab === "invite"
                ? "bg-white/[0.06] text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }
          `}
        >
          <UserPlus size={17} />

          Invite
        </button>
      </div>

      {/* =========================================
          MEMBERS
      ========================================= */}

      {activeTab === "members" && (
        <div className="rounded-xl border border-white/[0.08] bg-[#0d0d10]">

          {/* Members Header */}

          <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">

            <div className="flex items-center gap-3">
              <h3 className="text-[18px] font-bold">
                Members & Permissions
              </h3>

              <span
                className="
                  flex h-6 min-w-6
                  items-center justify-center
                  rounded-full
                  bg-white/[0.06]
                  px-2
                  text-[11px]
                  text-zinc-400
                "
              >
                {users.length}
              </span>
            </div>

            {/* Search */}

            <div className="relative">
              <Search
                size={16}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-zinc-600
                "
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or role"
                className="
                  h-[40px]
                  w-[290px]
                  rounded-lg
                  border border-white/[0.08]
                  bg-[#111114]
                  pl-9 pr-3
                  text-[12px]
                  text-zinc-200
                  outline-none
                  placeholder:text-zinc-600
                  focus:border-cyan-400/50
                "
              />
            </div>
          </div>

          {/* Table Header */}

          <div
            className="
              grid
              grid-cols-[1fr_180px_100px]
              border-b
              border-white/[0.07]
              px-6 py-4
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-zinc-500
            "
          >
            <span>Member</span>
            <span>Role</span>
            <span className="text-right">Actions</span>
          </div>

          {/* Users */}

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="
                  grid
                  grid-cols-[1fr_180px_100px]
                  items-center
                  px-6 py-4
                "
              >

                {/* Member */}

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      bg-cyan-400/[0.12]
                      text-[13px]
                      font-bold
                      text-cyan-400
                    "
                  >
                    {user.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">

                      <p className="text-[14px] font-semibold">
                        {user.name}
                      </p>

                      {user.currentUser && (
                        <span
                          className="
                            rounded-full
                            bg-white/[0.06]
                            px-2 py-0.5
                            text-[9px]
                            font-semibold
                            text-zinc-400
                          "
                        >
                          You
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 text-[12px] text-zinc-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Role */}

                <div>
                  <span
                    className="
                      inline-flex
                      items-center gap-1
                      rounded-full
                      border border-cyan-400/40
                      bg-cyan-400/[0.08]
                      px-3 py-1
                      text-[11px]
                      font-bold
                      text-cyan-400
                    "
                  >
                    <Shield size={12} />
                    {user.role}
                  </span>
                </div>

                {/* Actions */}

                <div className="text-right">
                  {user.currentUser ? (
                    <span className="text-[12px] italic text-zinc-600">
                      Current user
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="
                        text-[12px]
                        text-red-400
                        hover:text-red-300
                      "
                      onClick={() =>
                        setUsers((prev) =>
                          prev.filter(
                            (item) => item.id !== user.id
                          )
                        )
                      }
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center text-sm text-zinc-500">
              No users found.
            </div>
          )}
        </div>
      )}

      {/* =========================================
          INVITE TAB
      ========================================= */}

      {activeTab === "invite" && (
        <InviteForm
          inviteData={inviteData}
          errors={errors}
          handleInviteChange={handleInviteChange}
          handleInvite={handleInvite}
          setInviteData={setInviteData}
          onCancel={() => {
            setErrors({});
            setActiveTab("members");
          }}
        />
      )}
    </div>
  );
}

/* =========================================
   INVITE FORM
========================================= */

function InviteForm({
  inviteData,
  errors,
  handleInviteChange,
  handleInvite,
  setInviteData,
  onCancel,
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0d0d10]">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="border-b border-white/[0.07] px-6 py-5">

        <div className="flex items-center gap-3">

          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              bg-cyan-400/[0.12]
            "
          >
            <UserPlus
              size={20}
              className="text-cyan-400"
            />
          </div>

          <div>
            <h3 className="text-[17px] font-bold">
              Invite a teammate
            </h3>

            <p className="mt-1 text-[12px] text-zinc-500">
              Send an email invitation to add a new user to
              your organization.
            </p>
          </div>

        </div>
      </div>

      {/* =========================================
          FORM
      ========================================= */}

      <form
        onSubmit={handleInvite}
        className="p-6"
      >

        {/* EMAIL */}

        <div className="mb-5">

          <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
            Email address
          </label>

          <div className="relative">

            <Mail
              size={17}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-zinc-600
              "
            />

            <input
              type="email"
              name="email"
              value={inviteData.email}
              onChange={handleInviteChange}
              placeholder="user@example.com"
              className={`
                h-[46px]
                w-full
                rounded-lg
                border
                bg-[#111114]
                pl-10 pr-3
                text-sm
                text-zinc-100
                outline-none
                placeholder:text-zinc-600
                ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/[0.08] focus:border-cyan-400/60"
                }
              `}
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 text-[12px] text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* FIRST / LAST NAME */}

        <div className="mb-5 grid grid-cols-2 gap-4">

          {/* FIRST NAME */}

          <div>

            <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
              First name
            </label>

            <input
              type="text"
              name="firstName"
              value={inviteData.firstName}
              onChange={handleInviteChange}
              placeholder="John"
              className={`
                h-[46px]
                w-full
                rounded-lg
                border
                bg-[#111114]
                px-3
                text-sm
                text-zinc-100
                outline-none
                placeholder:text-zinc-600
                ${
                  errors.firstName
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/[0.08] focus:border-cyan-400/60"
                }
              `}
            />

            {errors.firstName && (
              <p className="mt-1.5 text-[12px] text-red-500">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* LAST NAME */}

          <div>

            <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
              Last name
            </label>

            <input
              type="text"
              name="lastName"
              value={inviteData.lastName}
              onChange={handleInviteChange}
              placeholder="Doe"
              className={`
                h-[46px]
                w-full
                rounded-lg
                border
                bg-[#111114]
                px-3
                text-sm
                text-zinc-100
                outline-none
                placeholder:text-zinc-600
                ${
                  errors.lastName
                    ? "border-red-500 focus:border-red-500"
                    : "border-white/[0.08] focus:border-cyan-400/60"
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

        {/* =========================================
            ROLE
        ========================================= */}

        <div className="mb-5">

          <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
            Role
          </label>

          <div className="grid grid-cols-2 gap-3">

            {/* USER */}

            <button
              type="button"
              onClick={() =>
                setInviteData((prev) => ({
                  ...prev,
                  role: "user",
                }))
              }
              className={`
                rounded-lg
                border
                p-4
                text-left
                transition
                ${
                  inviteData.role === "user"
                    ? "border-cyan-400/70 bg-cyan-400/[0.10]"
                    : "border-white/[0.08] bg-[#111114] hover:border-white/[0.15]"
                }
              `}
            >
              <p
                className={`
                  text-[13px] font-bold
                  ${
                    inviteData.role === "user"
                      ? "text-cyan-400"
                      : "text-zinc-200"
                  }
                `}
              >
                User
              </p>

              <p className="mt-1 text-[11px] text-zinc-500">
                Standard access
              </p>
            </button>

            {/* ADMIN */}

            <button
              type="button"
              onClick={() =>
                setInviteData((prev) => ({
                  ...prev,
                  role: "admin",
                }))
              }
              className={`
                rounded-lg
                border
                p-4
                text-left
                transition
                ${
                  inviteData.role === "admin"
                    ? "border-cyan-400/70 bg-cyan-400/[0.10]"
                    : "border-white/[0.08] bg-[#111114] hover:border-white/[0.15]"
                }
              `}
            >
              <p
                className={`
                  text-[13px] font-bold
                  ${
                    inviteData.role === "admin"
                      ? "text-cyan-400"
                      : "text-zinc-200"
                  }
                `}
              >
                Admin
              </p>

              <p className="mt-1 text-[11px] text-zinc-500">
                Full org access
              </p>
            </button>

          </div>
        </div>

        {/* =========================================
            INFORMATION
        ========================================= */}

        <div
          className="
            mb-6
            rounded-lg
            border border-cyan-400/20
            bg-cyan-400/[0.05]
            px-3 py-3
            text-[11px]
            text-cyan-400
          "
        >
          The invited user will receive an email with a
          temporary password and will be required to change
          it on first login.
        </div>

        {/* =========================================
            BUTTONS
        ========================================= */}

        <div className="flex justify-end gap-3">

          {/* CANCEL */}

          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-lg
              border border-white/[0.10]
              px-5 py-2.5
              text-[13px]
              font-medium
              text-zinc-400
              hover:bg-white/[0.05]
            "
          >
            Cancel
          </button>

          {/* SEND INVITATION */}

          <button
            type="submit"
            className="
              flex items-center gap-2
              rounded-lg
              bg-cyan-400
              px-5 py-2.5
              text-[13px]
              font-semibold
              text-[#041015]
              hover:bg-cyan-300
            "
          >
            <UserPlus size={16} />
            Send invitation
          </button>

        </div>

      </form>
    </div>
  );
}