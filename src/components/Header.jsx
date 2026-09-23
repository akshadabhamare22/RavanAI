import { Bell, Moon, Plus, Search, Copy } from 'lucide-react';

export default function Header({ onThemeToggle }) {
  return <header className="sticky top-0 z-30 flex min-h-[94px] items-center justify-between gap-4 border-b border-white/10 bg-[#080a0d]/95 px-6 backdrop-blur-xl">
    <div className="min-w-0"><h2 className="text-xl font-bold">Dashboard <span className="ml-2 text-sm text-zinc-500">ⓘ</span></h2><div className="mt-1 flex items-center gap-2 text-xs text-zinc-500"><span>Overview of your voice AI platform</span><span>•</span><span># 012854ee...681e</span><Copy size={13}/></div></div>
    <div className="flex items-center gap-2 sm:gap-3"><div className="hidden h-10 w-60 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 text-sm text-zinc-500 md:flex"><Search size={17}/><span>Search...</span><kbd className="ml-auto rounded border border-white/10 px-1.5 text-[10px]">⌘K</kbd></div><div className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm sm:flex"><span className="text-cyan-300">♧</span>10 credits</div><button onClick={onThemeToggle} className="rounded-xl border border-white/10 p-3 text-zinc-400 hover:bg-white/10"><Moon size={17}/></button><button className="hidden rounded-xl p-3 text-zinc-400 hover:bg-white/10 sm:block"><Bell size={18}/></button><button className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"><Plus size={17}/> <span className="hidden sm:inline">New Agent</span></button></div>
  </header>;
}
