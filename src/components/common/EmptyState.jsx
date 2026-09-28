export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
      {Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.03]">
          <Icon size={30} strokeWidth={1.5} className="text-zinc-400 dark:text-zinc-500" />
        </div>
      )}

      {title && (
        <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-white">
          {title}
        </h3>
      )}

      {description && (
        <p className="mt-2 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
