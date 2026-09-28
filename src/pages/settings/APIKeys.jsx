import React, { useState } from "react";
import {
  KeyRound,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function APIKeys() {
  const [apiKeys, setApiKeys] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [keyName, setKeyName] = useState("");

  const [visibleKeys, setVisibleKeys] = useState({});

  // =========================================
  // CREATE API KEY
  // =========================================

  const handleCreateKey = (e) => {
    e.preventDefault();

    if (!keyName.trim()) {
      alert("Please enter a key name.");
      return;
    }

    const newKey = {
      id: Date.now(),
      name: keyName.trim(),
      key: `ravan_${generateRandomKey()}`,
      createdAt: new Date().toLocaleDateString("en-IN"),
    };

    setApiKeys((prev) => [...prev, newKey]);

    setKeyName("");
    setShowCreate(false);
  };

  // =========================================
  // DELETE KEY
  // =========================================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this API key?"
    );

    if (!confirmDelete) return;

    setApiKeys((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // =========================================
  // COPY KEY
  // =========================================

  const handleCopy = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      alert("API key copied.");
    } catch {
      alert("Unable to copy API key.");
    }
  };

  // =========================================
  // SHOW / HIDE KEY
  // =========================================

  const toggleKeyVisibility = (id) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mx-auto max-w-[800px] px-7 py-10 text-white">

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="mb-7 flex items-start justify-between">

        <div>
          <h2 className="text-[26px] font-bold tracking-tight">
            API Keys
          </h2>

          <p className="mt-1 text-[14px] text-zinc-500">
            Manage keys for programmatic access to your
            organization.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreate(true)}
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
          <Plus size={17} />
          New Key
        </button>

      </div>

      {/* =========================================
          CREATE NEW API KEY
      ========================================= */}

      {showCreate && (
        <div
          className="
            mb-6
            rounded-xl
            border border-cyan-400/30
            bg-[#0d0d10]
            p-5
          "
        >

          <h3 className="mb-4 text-[16px] font-bold">
            Create New API Key
          </h3>

          <form onSubmit={handleCreateKey}>

            <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
              Key Name
            </label>

            <input
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="e.g. Production Server, Mobile App..."
              className="
                h-[46px]
                w-full
                rounded-lg
                border border-white/[0.08]
                bg-[#171719]
                px-3
                text-[14px]
                text-zinc-100
                outline-none
                placeholder:text-zinc-600
                focus:border-cyan-400/60
              "
            />

            <div className="mt-4 flex items-center gap-5">

              <button
                type="submit"
                className="
                  rounded-lg
                  bg-cyan-400
                  px-5 py-2.5
                  text-[13px]
                  font-semibold
                  text-[#041015]
                  transition
                  hover:bg-cyan-300
                "
              >
                Create Key
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCreate(false);
                  setKeyName("");
                }}
                className="
                  text-[13px]
                  font-medium
                  text-zinc-400
                  transition
                  hover:text-white
                "
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* =========================================
          API KEY LIST
      ========================================= */}

      <div className="rounded-xl border border-white/[0.08] bg-[#0d0d10]">

        {apiKeys.length === 0 ? (

          /* EMPTY STATE */

          <div
            className="
              flex
              min-h-[215px]
              flex-col
              items-center
              justify-center
              px-6
              text-center
            "
          >

            <div className="mb-4 text-zinc-600">
              <KeyRound size={42} strokeWidth={1.5} />
            </div>

            <h3 className="text-[16px] font-semibold text-zinc-300">
              No API keys yet.
            </h3>

            <p className="mt-1 text-[13px] text-zinc-500">
              Create a key to access the API programmatically.
            </p>

          </div>

        ) : (

          /* API KEY LIST */

          <div>

            <div
              className="
                border-b
                border-white/[0.07]
                px-6 py-4
              "
            >
              <h3 className="text-[16px] font-bold">
                API Keys
              </h3>
            </div>

            <div className="divide-y divide-white/[0.06]">

              {apiKeys.map((item) => {

                const isVisible = visibleKeys[item.id];

                return (
                  <div
                    key={item.id}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-5
                      px-6 py-5
                    "
                  >

                    {/* LEFT */}

                    <div className="min-w-0">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            flex h-9 w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-cyan-400/[0.10]
                          "
                        >
                          <KeyRound
                            size={17}
                            className="text-cyan-400"
                          />
                        </div>

                        <div>
                          <p className="text-[14px] font-semibold">
                            {item.name}
                          </p>

                          <p className="mt-1 text-[11px] text-zinc-600">
                            Created {item.createdAt}
                          </p>
                        </div>

                      </div>

                      {/* KEY */}

                      <div className="mt-3 flex items-center gap-2">

                        <code className="max-w-[430px] truncate rounded-md bg-[#171719] px-3 py-2 text-[12px] text-zinc-400">
                          {isVisible
                            ? item.key
                            : "••••••••••••••••••••••••"}
                        </code>

                        <button
                          type="button"
                          onClick={() =>
                            toggleKeyVisibility(item.id)
                          }
                          className="text-zinc-500 hover:text-zinc-200"
                        >
                          {isVisible ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(item.key)
                          }
                          className="text-zinc-500 hover:text-cyan-400"
                        >
                          <Copy size={16} />
                        </button>

                      </div>

                    </div>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                        rounded-lg
                        border
                        border-red-500/30
                        px-3 py-2
                        text-[12px]
                        font-medium
                        text-red-400
                        transition
                        hover:bg-red-500/[0.08]
                      "
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>

                  </div>
                );
              })}

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

// =========================================
// RANDOM API KEY
// =========================================

function generateRandomKey() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < 32; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return result;
}