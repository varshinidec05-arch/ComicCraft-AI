import React, { useState } from 'react';
import { Sparkles, MessageCircle, Play, Wand2 } from 'lucide-react';

interface HeroComicPreviewProps {
  onOpenReader: () => void;
}

export const HeroComicPreview: React.FC<HeroComicPreviewProps> = ({ onOpenReader }) => {
  const [activePanel, setActivePanel] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-xl mx-auto group">
      {/* DECORATIVE AMBIENT GLOW */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-700"></div>

      {/* MAIN COMIC FRAME */}
      <div className="relative bg-[#0F1420] border border-purple-500/30 rounded-3xl p-5 shadow-glass-card overflow-hidden">
        {/* HALFTONE OVERLAY ACCENT */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-halftone-dots opacity-25 pointer-events-none"></div>

        {/* COMIC ISSUE HEADER */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/10 mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-purple-950 text-cyan-300 font-comic text-xs px-2.5 py-0.5 rounded-md border border-purple-500/40 uppercase tracking-wider">
              ISSUE #01
            </span>
            <span className="font-comic text-slate-100 text-sm tracking-wide">
              THE CHRONO PARADOX
            </span>
          </div>
          <span className="text-[10px] font-mono font-semibold text-cyan-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> GEMINI AI RENDERED
          </span>
        </div>

        {/* INTERACTIVE PANEL GRID */}
        <div className="grid grid-cols-2 gap-3.5 relative">
          {/* PANEL 1: Wide Discovery Scene */}
          <div
            onMouseEnter={() => setActivePanel(1)}
            onMouseLeave={() => setActivePanel(null)}
            className="col-span-2 relative min-h-[160px] rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-[#131A2B] via-[#0F1420] to-[#182238] p-4 transition-all duration-300 hover:border-purple-500/60 shadow-lg"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

            {/* Sound Burst Sticker */}
            <div className="absolute top-2 right-3 z-10 comic-burst text-xs">
              BZZZZT!
            </div>

            {/* Narration Box */}
            <div className="relative z-10 max-w-[85%] bg-purple-950/90 border border-cyan-400/40 p-2.5 rounded-xl shadow-md text-[11px] font-mono text-cyan-200 leading-tight">
              NEO-VERIDIA — 02:47 AM. QUANTUM SIGNAL DETECTED IN SECTOR 7.
            </div>

            {/* Speech Bubble */}
            <div className="absolute bottom-3 right-4 z-10 bg-white text-slate-950 px-3 py-1.5 rounded-2xl border-2 border-slate-900 shadow-comic max-w-[220px]">
              <p className="font-sans font-bold text-[11px] leading-tight">
                "Mira! Look at the scope... the transmission is coming from TOMORROW!"
              </p>
              <span className="block text-[9px] font-bold text-purple-700 mt-0.5">— Arun</span>
            </div>

            <div className="absolute bottom-2 left-4 text-[10px] font-mono text-slate-400">
              [ PANEL 01 // OVERVIEW ]
            </div>
          </div>

          {/* PANEL 2: Reaction Scene */}
          <div
            onMouseEnter={() => setActivePanel(2)}
            onMouseLeave={() => setActivePanel(null)}
            className="col-span-1 relative min-h-[150px] rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-tr from-[#0F1420] via-[#131A2B] to-[#182238] p-3.5 transition-all duration-300 hover:border-purple-500/60 shadow-lg"
          >
            <div className="absolute top-2 left-2 z-10 bg-cyan-950 text-cyan-300 font-comic text-[11px] px-2 py-0.5 rounded border border-cyan-500/40 transform -rotate-6">
              WHOOSH!
            </div>

            <div className="relative z-10 mt-6 bg-[#0A0D14]/90 border border-cyan-400/40 text-cyan-100 p-2.5 rounded-2xl text-[10px] leading-relaxed font-medium">
              <span className="text-purple-300 font-bold block mb-0.5">Mira (AI Researcher):</span>
              "If the feedback loop closes, city power will destabilize."
            </div>
          </div>

          {/* PANEL 3: Action Scene */}
          <div
            onMouseEnter={() => setActivePanel(3)}
            onMouseLeave={() => setActivePanel(null)}
            className="col-span-1 relative min-h-[150px] rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-bl from-[#182238] via-[#131A2B] to-[#0F1420] p-3.5 transition-all duration-300 hover:border-purple-500/60 shadow-lg"
          >
            <div className="absolute bottom-2 right-2 z-10 comic-burst text-xs">
              POW!
            </div>

            <div className="relative z-10 bg-amber-400 text-slate-950 p-2.5 rounded-xl border border-slate-900 font-black text-[11px] leading-tight uppercase tracking-wider transform rotate-1 shadow-md">
              "BRACE FOR IMPACT! THE REACTOR IS OVERLOADING!"
            </div>
          </div>

          {/* PANEL 4: Reader Trigger */}
          <div className="col-span-2 relative min-h-[120px] rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-[#131A2B] via-[#182238] to-[#0F1420] p-4 flex items-center justify-between shadow-lg">
            <div className="relative z-10 space-y-1">
              <span className="text-cyan-400 font-comic text-xs uppercase tracking-wider block">
                INTERACTIVE COMIC STUDIO
              </span>
              <p className="text-slate-300 text-xs max-w-xs font-sans">
                Edit panel frames, adjust speech tails, and refine story dialogues.
              </p>
            </div>

            <button
              onClick={onOpenReader}
              className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-glow-purple transition-transform border border-white/20"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Full Reader</span>
            </button>
          </div>
        </div>

        {/* FOOTER METADATA */}
        <div className="mt-3 pt-2 border-t border-purple-500/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>PAGE 01 / 04</span>
          <span>COMICCRAFT STUDIO ENGINE</span>
        </div>
      </div>
    </div>
  );
};
