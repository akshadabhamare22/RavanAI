import React, { useState } from "react";
import {
  X,
  TriangleAlert,
  Lightbulb,
  MessageSquare,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";

export default function FeedbackModal({ onClose }) {
  const [type, setType] = useState("Bug");
  const [rating, setRating] = useState(3);
  const [message, setMessage] = useState(
    "Dashboard filters are confusing"
  );

  const feedbackTypes = [
    {
      name: "Bug",
      icon: TriangleAlert,
    },
    {
      name: "Feature",
      icon: Lightbulb,
    },
    {
      name: "General",
      icon: MessageSquare,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Please enter your feedback.");
      return;
    }

    console.log({
      type,
      rating,
      message,
    });

    toast.success("Thank you for your feedback!");

    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/70
        p-4
        backdrop-blur-[2px]
      "
    >
      <div
        className="
          relative
          w-full max-w-[480px]
          rounded-xl
          border border-white/[0.08]
          bg-[#18181b]
          p-6
          text-zinc-100
          shadow-2xl
        "
      >

        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            text-zinc-500
            transition
            hover:text-zinc-200
          "
        >
          <X size={20} />
        </button>

        {/* HEADER */}

        <div className="mb-6">
          <h2 className="text-[18px] font-bold">
            Send Feedback
          </h2>

          <p className="mt-2 text-[14px] text-zinc-400">
            Share a bug, idea, or note with the Agni team.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* TYPE */}

          <div className="mb-6">
            <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
              Type
            </label>

            <div className="grid grid-cols-3 gap-2">
              {feedbackTypes.map((item) => {
                const Icon = item.icon;
                const active = type === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setType(item.name)}
                    className={`
                      flex h-[86px]
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      transition
                      ${
                        active
                          ? "border-cyan-400 bg-cyan-400/[0.10] text-cyan-400"
                          : "border-white/[0.08] bg-[#111114] text-zinc-400 hover:border-white/[0.15] hover:text-zinc-200"
                      }
                    `}
                  >
                    <Icon size={19} />

                    <span className="text-[13px] font-semibold">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RATING */}

          <div className="mb-6">
            <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
              Rating
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`
                    flex h-10 w-10
                    items-center justify-center
                    rounded-lg
                    border
                    transition
                    ${
                      star <= rating
                        ? "border-cyan-400 bg-cyan-400/[0.10] text-cyan-400"
                        : "border-white/[0.08] bg-[#111114] text-zinc-500 hover:text-zinc-300"
                    }
                  `}
                >
                  <Star
                    size={19}
                    fill={
                      star <= rating
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* MESSAGE */}

          <div className="mb-5">
            <label className="mb-2 block text-[12px] font-semibold text-zinc-400">
              Message
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Tell us what you think..."
              className="
                w-full
                resize-none
                rounded-lg
                border border-white/[0.08]
                bg-[#111114]
                px-3 py-3
                text-[14px]
                text-zinc-200
                outline-none
                placeholder:text-zinc-600
                focus:border-cyan-400/60
              "
            />
          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                border border-white/[0.08]
                bg-[#111114]
                px-5 py-2.5
                text-[13px]
                font-medium
                text-zinc-300
                transition
                hover:bg-white/[0.05]
              "
            >
              Cancel
            </button>

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
              Submit
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}