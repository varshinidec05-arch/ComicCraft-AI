import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, Circle } from 'lucide-react';

interface AIGenerationOverlayProps {
  onComplete?: () => void;
}

export const AIGenerationOverlay: React.FC<AIGenerationOverlayProps> = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    { label: 'Understanding your idea', detail: 'Parsing themes, genre tone, and narrative seeds' },
    { label: 'Creating characters', detail: 'Generating distinct traits, roles, and visuals' },
    { label: 'Building the plot', detail: 'Structuring scene progression and climax beats' },
    { label: 'Writing dialogue', detail: 'Formulating character dialogue and emotion cues' },
    { label: 'Preparing comic panels', detail: 'Arranging panel grid layouts and speech bubble tails' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < stages.length - 1) return prev + 1;
        return prev;
      });
    }, 900);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F19]/95 backdrop-blur-xl flex items-center justify-center p-4">
      {/* Ambient Pulsing Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-purple-600/30 via-pink-500/20 to-blue-600/30 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

      <div className="relative max-w-lg w-full bg-[#0F172A] border-2 border-purple-500/40 rounded-3xl p-8 shadow-2xl text-center space-y-6 overflow-hidden">
        {/* Halftone Top Corner */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-halftone-dots opacity-20 pointer-events-none"></div>

        {/* AI SPARKLE PULSE ANIMATION ICON */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-ping opacity-30"></div>
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-600 p-[3px] shadow-glow-purple">
            <div className="w-full h-full bg-[#0F172A] rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-yellow-400 animate-spin" />
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className="space-y-1">
          <h3 className="font-comic text-2xl tracking-wider text-white">
            COMICCRAFT AI IS BUILDING YOUR STORY...
          </h3>
          <p className="text-xs text-purple-300 font-mono">
            ENGINE: GEMINI 1.5 PRO / FLASH MULTI-MODAL PIPELINE
          </p>
        </div>

        {/* ANIMATED STAGES LIST */}
        <div className="space-y-3 text-left bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
          {stages.map((stage, idx) => {
            const isDone = idx < currentStage;
            const isCurrent = idx === currentStage;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 transition-all duration-300 ${
                  isDone
                    ? 'text-emerald-400'
                    : isCurrent
                    ? 'text-yellow-300 font-semibold scale-[1.01]'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>
                      {isDone ? '✓' : isCurrent ? '●' : '○'} {stage.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-mono bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded border border-yellow-500/30">
                        PROCESSING
                      </span>
                    )}
                  </div>
                  {isCurrent && (
                    <p className="text-[10px] text-slate-400 font-normal mt-0.5 animate-pulse">
                      {stage.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 h-full transition-all duration-500"
              style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            {Math.round(((currentStage + 1) / stages.length) * 100)}% COMPLETE
          </p>
        </div>
      </div>
    </div>
  );
};
