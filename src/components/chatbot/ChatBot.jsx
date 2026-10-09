import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Trash2,
  FileText,
  MessageSquarePlus,
} from "lucide-react";

// ============================================================
// CONFIG
// ============================================================
const DEFAULT_LOGO = "/jeeva-logo.png";

const EMOJIS = [
  "😀", "😊", "👍", "🙏", "🎉", "❤️", "😂", "🤝", "🔥", "✅",
  "😍", "😎", "🤔", "😅", "🙌", "👏", "💡", "🚀", "✨", "🎯"
];

const INITIAL_MESSAGES = [
  { id: "d1", type: "date", label: "Today" },
  { id: "m1", type: "message", from: "user", text: "I'd like to book a demo.", time: "12:23 PM" },
  {
    id: "m2",
    type: "message",
    from: "agent",
    name: "Jeeva",
    text: "Sure, please share your preferred date and time, and we'll schedule the call accordingly.",
    time: "12:23 PM",
  },
];

const nowTime = () =>
  new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });

// ============================================================
// STANDARD ANIMATION VARIANTS
// ============================================================
const chatWindowVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.97,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const messageVariants = {
  hidden: (isUser) => ({
    opacity: 0,
    x: isUser ? 16 : -16,
    y: 8,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
};

const emojiTrayVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.97, transformOrigin: "bottom center" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
  exit: { opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.15 } },
};

const emojiItemVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.012, type: "spring", stiffness: 400, damping: 25 },
  }),
  hover: { scale: 1.2, transition: { duration: 0.15 } },
  tap: { scale: 0.9 },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.97, transformOrigin: "top right" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
  exit: { opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.14 } },
};

const typingDotVariants = {
  initial: { y: 0, opacity: 0.4 },
  animate: (i) => ({
    y: [0, -4, 0],
    opacity: [0.4, 1, 0.4],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.15,
    },
  }),
};

const fileChipVariants = {
  hidden: { opacity: 0, y: -6, height: 0, marginBottom: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    marginBottom: 8,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
  exit: { opacity: 0, y: -6, height: 0, marginBottom: 0, transition: { duration: 0.15 } },
};

const statusDotVariants = {
  animate: {
    opacity: [1, 0.6, 1],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

// ⭐ Circular motion variant for the launcher
const launcherOrbitVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,           // full circle in 20s — smooth, continuous
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ⭐ Counter-rotate so the icon stays upright inside the orbiting wrapper
const launcherIconCounterVariants = {
  animate: {
    rotate: -360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// ============================================================
// LOGO
// ============================================================
function Logo({ src, size = 48, ring = true }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-[#1a0d06]"
      style={{
        width: size,
        height: size,
        boxShadow: ring ? "0 0 0 2px rgba(255,255,255,0.35)" : undefined,
      }}
    >
      {!failed && src ? (
        <img
          src={src}
          alt="Jeeva"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-red-700 text-white">
          <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} fill="currentColor">
            <path d="M12 2s1 3.5-1.5 6C8 10.5 6 12.5 6 15.5A6 6 0 0 0 18 15c0-2-1-3.5-2-5 0 0-.5 2-2 2.5C15 9 12 2 12 2z" />
          </svg>
          <span style={{ fontSize: size * 0.18 }} className="-mt-0.5 font-extrabold tracking-wider">
            JEEVA
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CHATBOT
// ============================================================
export default function ChatBot({
  logoSrc = DEFAULT_LOGO,
  agentName = "Jeeva",
  userInitials = "AB",
  defaultOpen = false,
  onSendMessage,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [typing, setTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const endRef = useRef(null);
  const fileRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      window.setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
      setEmojiOpen(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const pushAgent = (text, name = "Jeeva") => {
    setMessages((prev) => [
      ...prev,
      { id: `a-${Date.now()}`, type: "message", from: "agent", name, text, time: nowTime() },
    ]);
    if (!open) setUnread((n) => n + 1);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text && !file) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `u-${Date.now()}`,
        type: "message",
        from: "user",
        text,
        fileName: file?.name,
        time: nowTime(),
      },
    ]);

    const sentFile = file;
    setInput("");
    setFile(null);
    setEmojiOpen(false);
    setTyping(true);

    try {
      let reply;
      if (onSendMessage) {
        reply = await onSendMessage(text, sentFile);
      } else {
        await new Promise((r) => setTimeout(r, 900));
        reply = "Thanks for your message! Our team will get back to you shortly.";
      }
      if (reply) {
        if (typeof reply === "string") pushAgent(reply);
        else pushAgent(reply.text, reply.name);
      }
    } catch (err) {
      console.error("Chat error:", err);
      pushAgent("Sorry, something went wrong. Please try again.");
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setMenuOpen(false);
  };

  const canSend = input.trim().length > 0 || !!file;

  return (
    <div className="fixed bottom-3 right-5 z-[250] flex flex-col items-end gap-3 font-sans">
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="chat-window"
            variants={chatWindowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin: "bottom right" }}
            className="flex h-[min(670px,calc(90vh-6rem))] w-[410px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:border-white/10 dark:bg-[#121214]"
          >
            {/* HEADER */}
            <div className="relative flex items-center gap-3 bg-gradient-to-r from-orange-600 to-orange-500 px-5 py-4 text-white">
              <div className="relative">
                <Logo src={logoSrc} size={46} />
                <motion.span
                  variants={statusDotVariants}
                  animate="animate"
                  className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-orange-500 bg-emerald-400"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[16px] font-semibold leading-tight">{agentName}</p>
                <p className="text-[12.5px] text-white/90">Online now</p>
              </div>

              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <motion.button
                  type="button"
                  aria-label="More options"
                  onClick={() => {
                    setMenuOpen((v) => !v);
                    setEmojiOpen(false);
                  }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="rounded-full p-2 transition hover:bg-white/15"
                >
                  <MoreVertical size={19} />
                </motion.button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 top-full z-10 mt-2 w-56 overflow-hidden rounded-xl border border-black/5 bg-white py-1 text-sm text-zinc-700 shadow-xl dark:border-white/10 dark:bg-[#1a1a1d] dark:text-zinc-200"
                    >
                      <motion.button
                        type="button"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                        onClick={clearChat}
                        className="flex w-full items-center gap-2 px-4 py-2.5 dark:hover:bg-white/5"
                      >
                        <MessageSquarePlus size={15} /> Start new conversation
                      </motion.button>
                      <motion.button
                        type="button"
                        whileHover={{ backgroundColor: "rgba(239,68,68,0.06)" }}
                        onClick={clearChat}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-red-500"
                      >
                        <Trash2 size={15} /> Clear chat
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="rounded-full p-2 transition hover:bg-white/15"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* MESSAGES AREA */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-white px-5 py-5 dark:bg-[#0e0e10]">
              {messages.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-16 text-center text-sm text-zinc-400"
                >
                  No messages yet. Say hello 👋
                </motion.p>
              )}

              <AnimatePresence initial={false}>
                {messages.map((m) => {
                  if (m.type === "date") {
                    return (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 py-1"
                      >
                        <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
                        <span className="text-[12px] text-zinc-400">{m.label}</span>
                        <div className="h-px flex-1 bg-zinc-200 dark:bg-white/10" />
                      </motion.div>
                    );
                  }

                  if (m.type === "system") {
                    return (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center"
                      >
                        <span className="rounded-full bg-zinc-200/70 px-4 py-1.5 text-[12.5px] text-zinc-500 dark:bg-white/10 dark:text-zinc-400">
                          {m.text}
                        </span>
                      </motion.div>
                    );
                  }

                  const isUser = m.from === "user";

                  return (
                    <motion.div
                      key={m.id}
                      layout
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      custom={isUser}
                      className={`flex items-start gap-2 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isUser && (
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[12px] font-semibold text-white dark:bg-zinc-700">
                          {(m.name || "J").charAt(0)}
                        </div>
                      )}

                      <div className={`flex max-w-[78%] flex-col ${isUser ? "items-end" : "items-start"}`}>
                        <motion.div
                          whileHover={{ scale: 1.015 }}
                          transition={{ duration: 0.15 }}
                          className={`rounded-[20px] px-4 py-2.5 text-[14px] leading-snug shadow-sm ${
                            isUser
                              ? "bg-[#e67e22] text-white"
                              : "border border-zinc-200 bg-white text-zinc-800 dark:border-white/10 dark:bg-[#18181b] dark:text-zinc-100"
                          }`}
                        >
                          {m.fileName && (
                            <div className="mb-1 flex items-center gap-1.5 text-[12px] text-white/85">
                              <FileText size={13} />
                              <span className="max-w-[200px] truncate">{m.fileName}</span>
                            </div>
                          )}
                          {m.text}
                        </motion.div>
                        <span className="mt-1.5 text-[11px] text-zinc-400">{m.time}</span>
                      </div>

                      {isUser && (
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e67e22] text-[11px] font-semibold text-white">
                          {userInitials}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-end gap-2"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[12px] font-semibold text-white">
                      J
                    </div>
                    <div className="flex items-center gap-1 rounded-[20px] border border-zinc-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#18181b]">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          custom={i}
                          variants={typingDotVariants}
                          initial="initial"
                          animate="animate"
                          className="h-1.5 w-1.5 rounded-full bg-zinc-400"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={endRef} />
            </div>

            {/* FOOTER */}
            <div className="relative border-t border-zinc-100 bg-white px-4 pb-3 pt-3 dark:border-white/10 dark:bg-[#121214]">
              <AnimatePresence>
                {file && (
                  <motion.div
                    variants={fileChipVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center gap-2 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                  >
                    <FileText size={13} />
                    <span className="flex-1 truncate">{file.name}</span>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setFile(null)}
                      aria-label="Remove file"
                    >
                      <X size={13} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {emojiOpen && (
                  <motion.div
                    variants={emojiTrayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-full left-4 right-4 mb-2 grid grid-cols-10 gap-1 rounded-xl border border-zinc-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-[#1a1a1d]"
                  >
                    {EMOJIS.map((emoji, i) => (
                      <motion.button
                        key={emoji}
                        custom={i}
                        variants={emojiItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        type="button"
                        onClick={() => {
                          setInput((v) => v + emoji);
                          inputRef.current?.focus();
                        }}
                        className="rounded-md p-1.5 text-lg transition hover:bg-zinc-100 dark:hover:bg-white/10"
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2">
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files?.[0] || null);
                    e.target.value = "";
                  }}
                />

                <motion.button
                  type="button"
                  aria-label="Attach file"
                  onClick={() => fileRef.current?.click()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-white/10"
                >
                  <Paperclip size={19} />
                </motion.button>

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="min-w-0 flex-1 bg-transparent px-1 py-2 text-[14px] text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                />

                <motion.button
                  type="button"
                  aria-label="Emoji"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEmojiOpen((v) => !v);
                    setMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-white/10"
                >
                  <Smile size={19} />
                </motion.button>

                <motion.button
                  type="button"
                  aria-label="Send message"
                  onClick={handleSend}
                  disabled={!canSend || typing}
                  whileHover={canSend ? { scale: 1.06 } : {}}
                  whileTap={canSend ? { scale: 0.92 } : {}}
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    canSend && !typing
                      ? "bg-[#e67e22] text-white hover:bg-[#d35400]"
                      : "bg-zinc-100 text-zinc-400 dark:bg-white/10"
                  }`}
                >
                  <Send size={17} />
                </motion.button>
              </div>

              <p className="mt-2 text-center text-[11px] text-zinc-400">
                Powered by <span className="font-semibold text-zinc-500">Ravan</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    {/* ====================================================
    LAUNCHER BUTTON — SPINNER STYLE (गोल फिरणारा)
==================================================== */}
<motion.button
  type="button"
  aria-label={open ? "Close chat" : "Open chat"}
  onClick={() => setOpen((v) => !v)}
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 }}
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.94 }}
  className="relative h-[60px] w-[60px] rounded-full border-[3px] border-orange-500 bg-[#1a0d06] p-0 shadow-[0_8px_24px_rgba(234,88,12,0.4)]"
>
  {/* 🌀 SPINNER — logo सतत गोल फिरत राहील */}
  <motion.div
    className="flex h-full w-full items-center justify-center"
    animate={{ rotate: 360 }}
    transition={{
      duration: 3,        // ⬅️ 3 सेकंदात एक पूर्ण फेर — कमी कर = जास्त वेग
      repeat: Infinity,
      ease: "linear",
    }}
    style={{ transformOrigin: "center center" }}
  >
    <Logo src={logoSrc} size={54} ring={false} />
  </motion.div>

  <AnimatePresence>
    {unread > 0 && !open && (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 22 }}
        className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white"
      >
        {unread}
      </motion.span>
    )}
  </AnimatePresence>
</motion.button>
    </div>
  );
}