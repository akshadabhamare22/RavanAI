import { CheckCircle2, Clock, AlertCircle, Loader2 } from "lucide-react";

const VARIANTS = {
  READY: {
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400",
  },
  COMPLETE: {
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400",
  },
  PROCESSING: {
    icon: Loader2,
    className:
      "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400",
    spin: true,
  },
  PENDING: {
    icon: Clock,
    className:
      "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-400",
  },
  ERROR: {
    icon: AlertCircle,
    className:
      "border-red-200 bg-red-50 text-red-600 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-400",
  },
};

export default function StatusBadge({ status, size = "sm" }) {
  const variant = VARIANTS[status] || VARIANTS.PENDING;
  const Icon = variant.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide ${
        size === "sm" ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs"
      } ${variant.className}`}
    >
      <Icon size={size === "sm" ? 11 : 13} className={variant.spin ? "animate-spin" : ""} />
      {status}
    </span>
  );
}
