//              End Call Model
//=============================================================

import { useState } from "react";
import { toast } from "react-toastify";
import ThemeToggle from "../../components/ThemeToggle";

export function EndCallModal({ onClose, theme, onToggle }) {
  const [name, setName] = useState("end_call");
  const [description, setDescription] = useState("");
  const [executionMessage, setExecutionMessage] = useState("");

  const handleAddFunction = () => {
    if (!name.trim()) {
      toast.error("Please enter a function name.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a description.");
      return;
    }

    toast.success("Tool Created Successfully!");
    toast.success("Function Added Successfully!");


    onClose();
    };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#18181b] shadow-2xl">

        {/* HEADER */}
        <div className="flex items-start justify-between px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-semibold text-zinc-100">
                End Call
              </h2>

              <span className="text-zinc-500">ⓘ</span>
            </div>

            <p className="mt-1 text-[12px] text-zinc-400">
              Define when the agent should end the call.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xl leading-none text-zinc-500 transition hover:text-zinc-200"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 pb-5">

          {/* NAME */}
          <div className="mb-4">
            <label className="mb-2 block text-[12px] font-semibold text-zinc-300">
              Name <span className="text-red-400">*</span>
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0f0f11] px-3 text-[13px] text-zinc-200 outline-none transition focus:border-cyan-500/50"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="mb-2 block text-[12px] font-semibold text-zinc-300">
              Description <span className="text-red-400">*</span>
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe when the assistant should call this function."
              className="min-h-[106px] w-full resize-none rounded-lg border border-white/[0.10] bg-[#0f0f11] px-3 py-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 transition focus:border-cyan-500/50"
            />
          </div>

          {/* EXECUTION MESSAGE */}
          <div>
            <label className="mb-2 block text-[12px] font-semibold text-zinc-300">
              Execution Message
            </label>

            <input
              type="text"
              value={executionMessage}
              onChange={(e) => setExecutionMessage(e.target.value)}
              placeholder="Message spoken while this function executes"
              className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0f0f11] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 transition focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 border-t border-white/[0.08] px-5 py-3.5">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-[13px] font-medium text-zinc-400 transition hover:bg-white/[0.05] hover:text-zinc-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAddFunction}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-[13px] font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Add Function
          </button>

        </div>
      </div>
    </div>
  );
}

//              Transfer Call Modal
//=============================================================
const countries = [
  { name: "India", code: "+91", iso: "IN" },
  { name: "United States", code: "+1", iso: "US" },
  { name: "Canada", code: "+1", iso: "CA" },
  { name: "United Kingdom", code: "+44", iso: "GB" },
  { name: "Australia", code: "+61", iso: "AU" },
  { name: "United Arab Emirates", code: "+971", iso: "AE" },
  { name: "Singapore", code: "+65", iso: "SG" },
  { name: "Indonesia", code: "+62", iso: "ID" },
  { name: "Germany", code: "+49", iso: "DE" },
  { name: "France", code: "+33", iso: "FR" },
  { name: "Italy", code: "+39", iso: "IT" },
  { name: "Spain", code: "+34", iso: "ES" },
  { name: "Japan", code: "+81", iso: "JP" },
  { name: "China", code: "+86", iso: "CN" },
  { name: "South Korea", code: "+82", iso: "KR" },
  { name: "Saudi Arabia", code: "+966", iso: "SA" },
  { name: "Qatar", code: "+974", iso: "QA" },
  { name: "South Africa", code: "+27", iso: "ZA" },
  { name: "New Zealand", code: "+64", iso: "NZ" },
  { name: "Brazil", code: "+55", iso: "BR" },
];
export function TransferCallModal({ onClose, theme, onToggle }) {
  const [name, setName] = useState("transfer_call");
  const [description, setDescription] = useState(
    "Transfer the call to a human agent"
  );
  const [executionMessage, setExecutionMessage] = useState("");
  const [transferMode, setTransferMode] = useState("cold");
  const [transferTo, setTransferTo] = useState("static");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
  name: "India",
  code: "+91",
  iso: "IN",
});
  const [prompt, setPrompt] = useState("");
  const [onHoldMusic, setOnHoldMusic] = useState(true);
  const [assignHuman, setAssignHuman] = useState(false);
  const [timezone, setTimezone] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Please enter a function name.");
      return;
    }

    if (transferTo === "static") {
      if (!phoneNumber.trim()) {
        toast.error("Please enter a phone number.");
        return;
      }

      if (!/^\d{10}$/.test(phoneNumber)) {
        toast.error("Phone number must be exactly 10 digits.");
        return;
      }
    }

    if (transferTo === "dynamic" && !prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    toast.success("Transfer Call function added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[90vh] w-full max-w-[920px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012] shadow-2xl">

        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-6 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-semibold text-zinc-100">
              Transfer Call
            </h2>

            <span className="text-zinc-500">ⓘ</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-zinc-500 transition hover:text-zinc-200"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="thin-scroll overflow-y-auto px-6 py-4">

          {/* NAME + HOLD MUSIC */}
          <div className="mb-4 grid grid-cols-[1fr_auto] items-end gap-4">
            <div>
              <label className="mb-2 block text-[12px] font-medium text-zinc-300">
                Name <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50"
              />
            </div>

            <label className="mb-2 flex items-center gap-2 text-[13px] text-zinc-300">
              <input
                type="checkbox"
                checked={onHoldMusic}
                onChange={(e) => setOnHoldMusic(e.target.checked)}
                className="h-4 w-4 accent-cyan-500"
              />
              On Hold Music
            </label>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">
              Description <span className="text-zinc-500">(Optional)</span>
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-2.5 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* EXECUTION MESSAGE */}
          <div className="mb-4">
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">
              Execution Message
            </label>

            <input
              type="text"
              value={executionMessage}
              onChange={(e) => setExecutionMessage(e.target.value)}
              placeholder="Message spoken while the call is being transferred"
              className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
            />
          </div>

          {/* TRANSFER MODE */}
          <div className="mb-4 rounded-lg border border-white/[0.08] bg-[#111113] p-4">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-zinc-400">
              Transfer Mode
            </p>

            <div className="inline-flex rounded-lg border border-white/[0.08] bg-[#0b0b0d] p-0.5">
              <button
                type="button"
                onClick={() => setTransferMode("cold")}
                className={`rounded-md px-4 py-2 text-[12px] font-semibold ${
                  transferMode === "cold"
                    ? "bg-[#252529] text-zinc-100"
                    : "text-zinc-500"
                }`}
              >
                Cold Transfer
              </button>

              <button
                type="button"
                onClick={() => setTransferMode("warm")}
                className={`rounded-md px-4 py-2 text-[12px] font-semibold ${
                  transferMode === "warm"
                    ? "bg-[#252529] text-zinc-100"
                    : "text-zinc-500"
                }`}
              >
                Warm Transfer
              </button>
            </div>
          </div>

          {/* ASSIGN HUMAN AGENT */}
          <div className="mb-4 rounded-lg border border-white/[0.08] bg-[#111113] p-3.5">
            <label className="flex items-center gap-2 text-[13px] text-zinc-400">
              <input
                type="checkbox"
                checked={assignHuman}
                onChange={(e) => setAssignHuman(e.target.checked)}
                className="h-4 w-4 accent-cyan-500"
              />
              Assign Human Agent
            </label>

            <p className="mt-2 text-[11px] text-zinc-500">
              ⓘ To enable this, connect GoHighLevel or Salesforce in the
              Integrations section first.
            </p>
          </div>

          {/* TRANSFER TO */}
          <div className="mb-4 rounded-lg border border-white/[0.08] bg-[#111113] p-4">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-zinc-400">
              Transfer To
            </p>

            <div className="mb-4 inline-flex rounded-lg border border-white/[0.08] bg-[#0b0b0d] p-0.5">
              <button
                type="button"
                onClick={() => setTransferTo("static")}
                className={`rounded-md px-4 py-2 text-[12px] font-semibold ${
                  transferTo === "static"
                    ? "bg-[#252529] text-zinc-100"
                    : "text-zinc-500"
                }`}
              >
                Static
              </button>

              <button
                type="button"
                onClick={() => setTransferTo("dynamic")}
                className={`rounded-md px-4 py-2 text-[12px] font-semibold ${
                  transferTo === "dynamic"
                    ? "bg-[#252529] text-zinc-100"
                    : "text-zinc-500"
                }`}
              >
                Dynamic
              </button>
            </div>

            {transferTo === "static" ? (
              <>
                <label className="mb-2 block text-[12px] font-medium text-zinc-300">
                  Phone Number <span className="text-red-400">*</span>
                </label>

              <div className="flex h-10 overflow-hidden rounded-lg border border-white/[0.10] bg-[#0b0b0d]">

                {/* COUNTRY */}
                <select
                  value={selectedCountry.iso}
                  onChange={(e) => {
                    const country = countries.find(
                      (item) => item.iso === e.target.value
                    );

                    if (country) {
                      setSelectedCountry(country);
                    }
                  }}
                  className="w-[125px] shrink-0 border-r border-white/[0.08] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none"
                >
                  {countries.map((country) => (
                    <option
                      key={country.iso}
                      value={country.iso}
                      className="bg-[#111113] text-zinc-200"
                    >
                      {country.iso} {country.code}
                    </option>
                  ))}
                </select>

                {/* PHONE NUMBER */}
                <input
                  type="tel"
                  value={phoneNumber}
                  maxLength={10}
                  inputMode="numeric"
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);

                    setPhoneNumber(value);
                  }}
                  placeholder="Enter destination number"
                  className="min-w-0 flex-1 bg-transparent px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600"
                />

              </div>
              </>
            ) : (
              <>
                <label className="mb-2 block text-[12px] font-medium text-zinc-300">
                  Prompt <span className="text-red-400">*</span>
                </label>

                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask the user which number to transfer the call to"
                  rows={4}
                  className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-2.5 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
                />
              </>
            )}
          </div>

          {/* CLIENT TRANSFER NUMBER */}
          <div className="mb-4">
            <label className="mb-2 block text-[12px] font-medium text-zinc-400">
              Client Transfer Number
            </label>

            <div className="flex items-center justify-between rounded-lg border border-dashed border-white/[0.10] px-3 py-3">
              <span className="text-[12px] text-zinc-500">
                No phone numbers yet. Add one to enable client transfer.
              </span>

              <button
                type="button"
                className="text-[12px] font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Add number ↗
              </button>
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="rounded-lg border border-white/[0.08] bg-[#111113] p-4">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-wide text-zinc-400">
              Schedule (Optional)
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-2 block text-[11px] font-medium text-zinc-400">
                  TIMEZONE
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-400 outline-none"
                >
                  <option value="">Select timezone</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">
                    America/New_York
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-medium text-zinc-400">
                  START TIME
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-400 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-medium text-zinc-400">
                  END TIME
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex shrink-0 justify-end gap-2 border-t border-white/[0.08] px-6 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/[0.08] px-4 py-2 text-[13px] text-zinc-400 transition hover:bg-white/[0.05] hover:text-zinc-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-cyan-500 px-5 py-2 text-[13px] font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}


export function IVRModal({ onClose, theme, onToggle}) {
  const [name, setName] = useState("press_digit");
  const [description, setDescription] = useState(
    "Press a digit to navigate the IVR menu"
  );
  const [pauseDetectionDelay, setPauseDetectionDelay] = useState(1000);

  const handleAddFunction = () => {
    if (!name.trim()) {
      toast.error("Please enter a function name.");
      return;
    }

    toast.success("IVR function added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-[560px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#18181b] shadow-2xl">

        {/* HEADER */}
        <div className="flex items-start justify-between px-5 pt-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-semibold text-zinc-100">
                IVR / Press Digit
              </h2>

              <span className="text-zinc-500">ⓘ</span>
            </div>

            <p className="mt-1 text-[13px] text-zinc-400">
              Configure the digit-press IVR navigation function.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-lg text-zinc-500 transition hover:text-zinc-200"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="px-5 py-5">

          {/* NAME */}
          <div className="mb-4">
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">
              Name <span className="text-red-400">*</span>
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-lg border border-white/[0.10] bg-[#0d0d0f] px-3 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-5">
            <label className="mb-2 block text-[12px] font-medium text-zinc-300">
              Description <span className="text-zinc-500">(Optional)</span>
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0d0d0f] px-3 py-2.5 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50"
            />
          </div>

          {/* PRESS DIGIT CONFIG */}
          <div className="rounded-lg border border-white/[0.08] bg-[#1b1b1e] p-4">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-wide text-zinc-400">
              Press Digit Config
            </p>

            <label className="mb-2 block text-[12px] font-medium text-zinc-300">
              Pause Detection Delay (ms)
            </label>

            <input
              type="number"
              min="0"
              value={pauseDetectionDelay}
              onChange={(e) =>
                setPauseDetectionDelay(Number(e.target.value))
              }
              className="h-11 w-full rounded-lg border border-white/[0.10] bg-[#0d0d0f] px-3 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50"
            />

            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
              How long the agent waits after speaking before pressing a digit.
              Default: 1000ms.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-2 border-t border-white/[0.08] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/[0.08] px-4 py-2 text-[13px] text-zinc-400 transition hover:bg-white/[0.05] hover:text-zinc-200"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAddFunction}
            className="rounded-lg bg-cyan-400 px-5 py-2 text-[13px] font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Add Function
          </button>
        </div>
      </div>
    </div>
  );
}


// =============================================================
//                 Custom Function Modal
// =============================================================

export function CustomFunctionModal({ onClose,theme, onToggle }) {
  const [functionType, setFunctionType] = useState("custom");

  const [method, setMethod] = useState("POST");
  const [curl, setCurl] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const [timeout, setTimeoutValue] = useState(120000);
  const [preCallWebhook, setPreCallWebhook] = useState(false);
  const [executionMessage, setExecutionMessage] = useState("");

  const [parameterMode, setParameterMode] = useState("form");
  const [payloadArgsOnly, setPayloadArgsOnly] = useState(true);

  const [jsonSchema, setJsonSchema] = useState("");

  const [headers, setHeaders] = useState([
    {
      key: "",
      value: "",
      mode: "Static",
      type: "String",
    },
  ]);

  const [queryParams, setQueryParams] = useState([
    {
      key: "",
      value: "",
      mode: "Static",
      type: "String",
    },
  ]);

  const [parameters, setParameters] = useState([
    {
      name: "field1",
      detail: "Description",
      detailType: "Description",
      type: "String",
      required: false,
    },
  ]);

  // =============================================================
  // HEADER FUNCTIONS
  // =============================================================

  const addHeader = () => {
    setHeaders([
      ...headers,
      {
        key: "",
        value: "",
        mode: "Static",
        type: "String",
      },
    ]);
  };

  const removeHeader = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (index, field, value) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  };

  // =============================================================
  // QUERY PARAM FUNCTIONS
  // =============================================================

  const addQueryParam = () => {
    setQueryParams([
      ...queryParams,
      {
        key: "",
        value: "",
        mode: "Static",
        type: "String",
      },
    ]);
  };

  const removeQueryParam = (index) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const updateQueryParam = (index, field, value) => {
    const updated = [...queryParams];
    updated[index][field] = value;
    setQueryParams(updated);
  };

  // =============================================================
  // PARAMETER FUNCTIONS
  // =============================================================

  const addParameter = () => {
    setParameters([
      ...parameters,
      {
        name: `field${parameters.length + 1}`,
        detail: "Description",
        detailType: "Description",
        type: "String",
        required: false,
      },
    ]);
  };

  const removeParameter = (index) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  const updateParameter = (index, field, value) => {
    const updated = [...parameters];
    updated[index][field] = value;
    setParameters(updated);
  };
  const handleFormatJson = () => {
  if (!jsonSchema.trim()) {
    toast.error("Please enter JSON first.");
    return;
  }

  try {
    const parsed = JSON.parse(jsonSchema);
    setJsonSchema(JSON.stringify(parsed, null, 2));
    toast.success("JSON formatted successfully!");
  } catch (error) {
    toast.error("Invalid JSON. Please check the format.");
  }
};

  // =============================================================
  // CURL AUTOFILL
  // =============================================================

  const handleAutofill = () => {
    if (!curl.trim()) {
      toast.error("Please paste a cURL command first.");
      return;
    }

    const urlMatch = curl.match(/https?:\/\/[^\s'"]+/);

    if (urlMatch) {
      setUrl(urlMatch[0]);
    }

    const methodMatch = curl.match(/-X\s+([A-Z]+)/);

    if (methodMatch) {
      setMethod(methodMatch[1]);
    }

    toast.success("Fields autofilled successfully!");
  };

  // =============================================================
  // SAVE
  // =============================================================

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Please enter the function name.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter the description.");
      return;
    }

    if (functionType === "custom" && !url.trim()) {
      toast.error("Please enter the API endpoint URL.");
      return;
    }

    toast.success("Custom function added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">

      <div className="flex max-h-[90vh] w-full max-w-[925px] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#101012] shadow-2xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex shrink-0 items-start justify-between border-b border-white/[0.08] px-6 py-5">

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[19px] font-semibold text-zinc-100">
                {functionType === "custom"
                  ? "Custom Function"
                  : "Client Function"}
              </h2>

              <span className="text-zinc-500">
                ⓘ
              </span>
            </div>

            <p className="mt-1 text-[12px] text-zinc-500">
              {functionType === "custom"
                ? "Configure endpoint details, schema, and execution options."
                : "Define a client-side function with name, description, and parameters."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-zinc-500 transition hover:text-zinc-200"
          >
            ×
          </button>

        </div>

        {/* =====================================================
            SCROLL BODY
        ===================================================== */}

        <div className="thin-scroll flex-1 overflow-y-auto px-6 py-4">

          {/* =================================================
              FUNCTION TYPE
          ================================================= */}

          <div className="mb-5">

            <label className="mb-2 block text-[12px] font-medium text-zinc-300">
              Function Type
            </label>

            <div className="flex gap-2">

              <button
                type="button"
                onClick={() => setFunctionType("custom")}
                className={`rounded-lg border px-4 py-2 text-[12px] font-semibold transition ${
                  functionType === "custom"
                    ? "border-cyan-400 bg-cyan-400 text-slate-950"
                    : "border-white/[0.10] text-zinc-400 hover:bg-white/[0.04]"
                }`}
              >
                Custom
              </button>

              <button
                type="button"
                onClick={() => setFunctionType("client")}
                className={`rounded-lg border px-4 py-2 text-[12px] font-semibold transition ${
                  functionType === "client"
                    ? "border-cyan-400 bg-cyan-400 text-slate-950"
                    : "border-white/[0.10] text-zinc-400 hover:bg-white/[0.04]"
                }`}
              >
                Client Function
              </button>

            </div>
          </div>

          {/* =================================================
              CLIENT FUNCTION
          ================================================= */}

          {functionType === "client" && (
            <>
              {/* NAME */}

              <div className="mb-4">
                <label className="mb-2 block text-[12px] font-medium text-zinc-300">
                  Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the name of the custom function"
                  className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
                />
              </div>

              {/* DESCRIPTION */}

              <div className="mb-5">
                <label className="mb-2 block text-[12px] font-medium text-zinc-300">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter the description of the custom function"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
                />
              </div>
            </>
          )}

          {/* =================================================
              IMPORT CURL
          ================================================= */}

          {functionType === "custom" && (
            <div className="mb-5 rounded-lg border border-white/[0.08] bg-[#151517] p-4">

              <h3 className="text-[13px] font-semibold text-zinc-200">
                Import from cURL
              </h3>

              <p className="mt-1 text-[11px] text-zinc-500">
                Paste the cURL command exactly as copied — the JSON body
                becomes the parameters schema.
              </p>

              <textarea
                value={curl}
                onChange={(e) => setCurl(e.target.value)}
                placeholder={`curl -X POST 'https://api.example.com/book' \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"Ana"}'`}
                rows={5}
                className="mt-3 w-full resize-none rounded-lg border border-white/[0.08] bg-[#0b0b0d] px-3 py-3 font-mono text-[12px] text-zinc-300 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
              />

              <button
                type="button"
                onClick={handleAutofill}
                className="mt-3 rounded-lg border border-white/[0.10] px-4 py-2 text-[12px] text-zinc-400 hover:bg-white/[0.04]"
              >
                Autofill fields
              </button>

            </div>
          )}

          {/* =================================================
              NAME
          ================================================= */}

          {functionType === "custom" && (
            <>
              <div className="mb-4">

                <label className="mb-2 block text-[12px] font-medium text-zinc-300">
                  Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the name of the custom function"
                  className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
                />

              </div>

              {/* DESCRIPTION */}

              <div className="mb-5">

                <label className="mb-2 block text-[12px] font-medium text-zinc-300">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter the description of the custom function"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 py-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
                />

              </div>
            </>
          )}

          {/* =================================================
              API ENDPOINT
          ================================================= */}

          {functionType === "custom" && (
            <div className="mb-5">

              <h3 className="mb-1 text-[13px] font-semibold text-zinc-200">
                API Endpoint
              </h3>

              <p className="mb-3 text-[11px] text-zinc-500">
                The endpoint URL should include https:// when the service
                supports HTTPS.
              </p>

              <div className="flex gap-2">

                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="h-10 w-[150px] rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>PATCH</option>
                  <option>DELETE</option>
                </select>

                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter the endpoint URL"
                  className="h-10 flex-1 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
                />

              </div>
            </div>
          )}

          {/* =================================================
              TIMEOUT
          ================================================= */}

          {functionType === "custom" && (
            <div className="mb-5">

              <label className="mb-2 block text-[12px] font-medium text-zinc-300">
                Timeout (ms)
              </label>

              <div className="relative">

                <input
                  type="number"
                  value={timeout}
                  onChange={(e) =>
                    setTimeoutValue(Number(e.target.value))
                  }
                  className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 pr-28 text-[13px] text-zinc-200 outline-none focus:border-cyan-500/50"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-zinc-500">
                  milliseconds
                </span>

              </div>
            </div>
          )}

          {/* =================================================
              PRE CALL WEBHOOK
          ================================================= */}

          {functionType === "custom" && (
            <div className="mb-5 flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#151517] px-4 py-4">

              <div>
                <p className="text-[12px] font-medium text-zinc-300">
                  Pre-call Webhook
                </p>

                <p className="mt-1 text-[11px] text-zinc-500">
                  Call this webhook before the call starts.
                </p>
              </div>

              <input
                type="checkbox"
                checked={preCallWebhook}
                onChange={(e) =>
                  setPreCallWebhook(e.target.checked)
                }
                className="h-4 w-4 accent-cyan-500"
              />

            </div>
          )}

          {/* =================================================
              EXECUTION MESSAGE
          ================================================= */}

          {functionType === "custom" && (
            <div className="mb-5">

              <label className="mb-2 block text-[12px] font-medium text-zinc-300">
                Execution Message
              </label>

              <input
                value={executionMessage}
                onChange={(e) =>
                  setExecutionMessage(e.target.value)
                }
                placeholder="Message spoken while this function executes"
                className="h-10 w-full rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[13px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
              />

            </div>
          )}

          {/* =================================================
              HEADERS
          ================================================= */}

          {functionType === "custom" && (
            <div className="mb-5">

              <h3 className="text-[13px] font-semibold text-zinc-200">
                Headers
              </h3>

              <p className="mb-3 mt-1 text-[11px] text-zinc-500">
                Specify the HTTP headers required for your API request.
                Use Static to send the value as-is, or Prompt to have
                the agent fill it in during the call.
              </p>

              {headers.map((header, index) => (
                <div
                  key={index}
                  className="mb-2 grid grid-cols-[1fr_1fr_110px_110px_40px] gap-2"
                >

                  <input
                    value={header.key}
                    onChange={(e) =>
                      updateHeader(index, "key", e.target.value)
                    }
                    placeholder="Key"
                    className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none"
                  />

                  <input
                    value={header.value}
                    onChange={(e) =>
                      updateHeader(index, "value", e.target.value)
                    }
                    placeholder="Value"
                    className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none"
                  />

                  <select
                    value={header.mode}
                    onChange={(e) =>
                      updateHeader(index, "mode", e.target.value)
                    }
                    className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-2 text-[12px] text-zinc-300 outline-none"
                  >
                    <option>Static</option>
                    <option>Prompt</option>
                  </select>

                  <select
                    value={header.type}
                    onChange={(e) =>
                      updateHeader(index, "type", e.target.value)
                    }
                    className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-2 text-[12px] text-zinc-300 outline-none"
                  >
                    <option>String</option>
                    <option>Integer</option>
                    <option>Number</option>
                    <option>Boolean</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => removeHeader(index)}
                    className="rounded-lg border border-white/[0.10] text-zinc-500 hover:text-red-400"
                  >
                    🗑
                  </button>

                </div>
              ))}

              <button
                type="button"
                onClick={addHeader}
                className="mt-2 rounded-lg border border-white/[0.10] px-4 py-2 text-[12px] text-zinc-400 hover:bg-white/[0.04]"
              >
                + New key value pair
              </button>

            </div>
          )}

          {/* =================================================
              QUERY PARAMETERS
          ================================================= */}

          {functionType === "custom" && (
            <div className="mb-5">

              <h3 className="text-[13px] font-semibold text-zinc-200">
                Query Parameters
              </h3>

              <p className="mb-3 mt-1 text-[11px] text-zinc-500">
                Query string parameters to append to the URL.
              </p>

              {queryParams.map((param, index) => (
                <div
                  key={index}
                  className="mb-2 grid grid-cols-[1fr_1fr_110px_110px_40px] gap-2"
                >

                  <input
                    value={param.key}
                    onChange={(e) =>
                      updateQueryParam(index, "key", e.target.value)
                    }
                    placeholder="Key"
                    className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none"
                  />

                  <input
                    value={param.value}
                    onChange={(e) =>
                      updateQueryParam(index, "value", e.target.value)
                    }
                    placeholder="Value"
                    className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none"
                  />

                  <select
                    value={param.mode}
                    onChange={(e) =>
                      updateQueryParam(index, "mode", e.target.value)
                    }
                    className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-2 text-[12px] text-zinc-300 outline-none"
                  >
                    <option>Static</option>
                    <option>Prompt</option>
                  </select>

                  <select
                    value={param.type}
                    onChange={(e) =>
                      updateQueryParam(index, "type", e.target.value)
                    }
                    className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-2 text-[12px] text-zinc-300 outline-none"
                  >
                    <option>String</option>
                    <option>Integer</option>
                    <option>Number</option>
                    <option>Boolean</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => removeQueryParam(index)}
                    className="rounded-lg border border-white/[0.10] text-zinc-500 hover:text-red-400"
                  >
                    🗑
                  </button>

                </div>
              ))}

              <button
                type="button"
                onClick={addQueryParam}
                className="mt-2 rounded-lg border border-white/[0.10] px-4 py-2 text-[12px] text-zinc-400 hover:bg-white/[0.04]"
              >
                + New key value pair
              </button>

            </div>
          )}

          {/* =================================================
              PARAMETERS
          ================================================= */}

          <div className="mb-5">

            <div className="mb-3 flex items-center justify-between">

              <div>
                <h3 className="text-[13px] font-semibold text-zinc-200">
                  Parameters (Optional)
                </h3>

                <p className="mt-1 text-[11px] text-zinc-500">
                  JSON schema that defines the parameters the LLM will
                  pass to this function.
                </p>
              </div>

              {functionType === "custom" && (
                <label className="flex items-center gap-2 text-[11px] text-zinc-400">
                  Payload: args only

                <button
                  type="button"
                  onClick={() => setPayloadArgsOnly((prev) => !prev)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    payloadArgsOnly ? "bg-cyan-400" : "bg-zinc-700"
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                      payloadArgsOnly
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
                </label>
              )}

            </div>

            {/* JSON / FORM */}

            <div className="rounded-lg border border-white/[0.08] bg-[#151517] p-3">

              <div className="mb-3 inline-flex rounded-lg border border-white/[0.08] bg-[#0b0b0d] p-0.5">

                <button
                  type="button"
                  onClick={() => setParameterMode("json")}
                  className={`rounded-md px-4 py-2 text-[12px] ${
                    parameterMode === "json"
                      ? "bg-[#252529] text-zinc-100"
                      : "text-zinc-500"
                  }`}
                >
                  JSON
                </button>

                <button
                  type="button"
                  onClick={() => setParameterMode("form")}
                  className={`rounded-md px-4 py-2 text-[12px] ${
                    parameterMode === "form"
                      ? "bg-[#252529] text-zinc-100"
                      : "text-zinc-500"
                  }`}
                >
                  Form
                </button>

              </div>

              {parameterMode === "form" ? (
                <>
                  <div className="mb-2 grid grid-cols-[1.2fr_1.3fr_130px_90px_40px] gap-2 text-[11px] text-zinc-500">

                    <span>Parameter Name</span>
                    <span>Detail</span>
                    <span>Type</span>
                    <span>Required</span>
                    <span></span>

                  </div>

                  {parameters.map((parameter, index) => (
                    <div
                      key={index}
                      className="mb-2 grid grid-cols-[1.2fr_1.3fr_130px_90px_40px] gap-2"
                    >

                      <input
                        value={parameter.name}
                        onChange={(e) =>
                          updateParameter(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-3 text-[12px] text-zinc-300 outline-none"
                      />

                      <div className="flex h-10 overflow-hidden rounded-lg border border-white/[0.10] bg-[#0b0b0d]">
                      <input
                        value={parameter.detail}
                        onChange={(e) =>
                          updateParameter(
                            index,
                            "detail",
                            e.target.value
                          )
                        }
                        placeholder="Description"
                        className="min-w-0 flex-1 bg-transparent px-3 text-[12px] text-zinc-300 outline-none"
                      />

                      <select
                        value={parameter.detailType}
                        onChange={(e) =>
                          updateParameter(
                            index,
                            "detailType",
                            e.target.value
                          )
                        }
                        className="w-[130px] border-l border-white/[0.10] bg-[#0b0b0d] px-2 text-[12px] text-zinc-300 outline-none"
                      >
                        <option value="Description">Description</option>
                        <option>Value</option>
                      </select>
                    </div>

                      <select
                        value={parameter.type}
                        onChange={(e) =>
                          updateParameter(
                            index,
                            "type",
                            e.target.value
                          )
                        }
                        className="h-10 rounded-lg border border-white/[0.10] bg-[#0b0b0d] px-2 text-[12px] text-zinc-300 outline-none"
                      >
                        <option>String</option>
                        <option>Number</option>
                        <option>Integer</option>
                        <option>Boolean</option>
                        <option>Object</option>
                        <option>Array</option>
                      </select>

                      <div className="flex items-center justify-center">

                        <input
                          type="checkbox"
                          checked={parameter.required}
                          onChange={(e) =>
                            updateParameter(
                              index,
                              "required",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 accent-cyan-500"
                        />

                      </div>

                      <button
                        type="button"
                        onClick={() => removeParameter(index)}
                        className="rounded-lg border border-white/[0.10] text-zinc-500 hover:text-red-400"
                      >
                        🗑
                      </button>

                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addParameter}
                    className="mt-2 rounded-lg border border-white/[0.10] px-4 py-2 text-[12px] text-zinc-400 hover:bg-white/[0.04]"
                  >
                    + Add
                  </button>
                </>
              ) : (
              <div>
                <textarea
                  value={jsonSchema}
                  onChange={(e) => setJsonSchema(e.target.value)}
                  placeholder="Enter JSON Schema here..."
                  rows={9}
                  className="w-full resize-none rounded-lg border border-white/[0.08] bg-[#0b0b0d] px-3 py-3 font-mono text-[12px] text-zinc-300 outline-none placeholder:text-zinc-600 focus:border-cyan-500/50"
                />

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setJsonSchema(
                        JSON.stringify(
                          {
                            name: "-----",
                          },
                          null,
                          2
                        )
                      )
                    }
                    className="rounded-full border border-white/[0.10] px-3 py-1.5 text-[11px] text-zinc-400 hover:bg-white/[0.04]"
                  >
                    example 1
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setJsonSchema(
                        JSON.stringify(
                          {
                            name: "----",
                            age: 25,
                          },
                          null,
                          2
                        )
                      )
                    }
                    className="rounded-full border border-white/[0.10] px-3 py-1.5 text-[11px] text-zinc-400 hover:bg-white/[0.04]"
                  >
                    example 2
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setJsonSchema(
                        JSON.stringify(
                          {
                            email: "example@gmail.com",
                            active: true,
                          },
                          null,
                          2
                        )
                      )
                    }
                    className="rounded-full border border-white/[0.10] px-3 py-1.5 text-[11px] text-zinc-400 hover:bg-white/[0.04]"
                  >
                    example 3
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleFormatJson}
                  className="mt-2 w-full rounded-lg border border-white/[0.10] bg-[#1b1b1e] py-2.5 text-[12px] font-medium text-zinc-300 hover:bg-white/[0.05]"
                >
                  Format JSON
                </button>
              </div>
              )}

            </div>
          </div>

        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="flex shrink-0 justify-end gap-2 border-t border-white/[0.08] px-6 py-3.5">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/[0.08] px-5 py-2 text-[13px] text-zinc-400 transition hover:bg-white/[0.05] hover:text-zinc-200"
          >
            Cancel
          </button>

          {functionType === "custom" && (
            <button
              type="button"
              className="rounded-lg border border-white/[0.08] px-5 py-2 text-[13px] text-zinc-400 transition hover:bg-white/[0.05]"
            >
              Test
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-cyan-500 px-6 py-2 text-[13px] font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}

