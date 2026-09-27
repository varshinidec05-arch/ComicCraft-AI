import React from 'react';
import { HeroComicPreview } from './HeroComicPreview';
import {
  Sparkles,
  Wand2,
  Zap,
  BookOpen,
  UserCheck,
  Film,
  Layout,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface LandingPageProps {
  onStartCreating: () => void;
  onExploreClick: () => void;
  onOpenPreview: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCreating,
  onExploreClick,
  onOpenPreview,
}) => {
  const features = [
    {
      icon: Sparkles,
      title: 'Gemini Story Generator',
      description: 'Transform raw story ideas into full multi-scene narrative scripts, chapter beats, and character dialogue.',
    },
    {
      icon: UserCheck,
      title: 'Character Design Studio',
      description: 'Generate rich character lore, distinct visual descriptions, personalities, and consistent cast dynamics.',
    },
    {
      icon: Layout,
      title: 'Drag & Drop Panel Builder',
      description: 'Choose from professional layouts, customize speech bubble tails, narration headers, and sound effect stickers.',
    },
    {
      icon: Film,
      title: 'Cinematic Scene Studio',
      description: 'Structure panels with location tags, timestamps, mood lighting, camera framing, and action callouts.',
    },
    {
      icon: MessageSquare,
      title: 'AI Script Doctor',
      description: 'Refine dialogue in real-time. Instantly inject plot twists, emotional climaxes, comedy, or high-octane action.',
    },
    {
      icon: BookOpen,
      title: 'Interactive Comic Reader',
      description: 'Preview and publish your finished comic issues in a sleek fullscreen reader mode with zoom & page turning.',
    },
  ];

  const workflowSteps = [
    {
      num: '01',
      title: 'Enter Story Prompt',
      desc: 'Type a story idea seed or prompt. Select your target genre, tone, and visual comic style.',
    },
    {
      num: '02',
      title: 'AI Story & Character Crafting',
      desc: 'Gemini AI constructs your plot arc, establishes character profiles, and drafts full dialogue lines.',
    },
    {
      num: '03',
      title: 'Panel & Dialogue Studio',
      desc: 'Organize panels into page grids, place custom speech bubbles, and style action stickers.',
    },
    {
      num: '04',
      title: 'Preview & Export',
      desc: 'Read through your finished digital comic in reader mode and export your creation to share.',
    },
  ];

  return (
    <div className="relative overflow-hidden space-y-24 py-8 sm:py-16">
      {/* AMBIENT BACKGROUND GLOW METRICS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-2/3 right-10 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT HERO CONTENT */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131A2B] border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>POWERED BY GEMINI 1.5 PRO & FLASH</span>
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-comic tracking-wider text-white leading-tight">
              Create Amazing Comics{' '}
              <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="text-slate-300 text-base sm:text-lg font-sans font-normal leading-relaxed max-w-xl">
              Turn your story ideas into full comic scripts, character profiles, dramatic scenes, and interactive panel layouts in seconds.
            </p>

            {/* HERO CTA BUTTONS */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartCreating}
                className="group relative px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white shadow-glow-purple hover:shadow-glow-cyan hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 border border-white/20"
              >
                <Wand2 className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
                <span>Create Comic</span>
                <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="px-6 py-4 rounded-2xl font-semibold text-xs text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 hover:text-white transition-all shadow-lg backdrop-blur-md"
              >
                Explore Studio Dashboard
              </button>
            </div>

            {/* SMALL TRUST STATS */}
            <div className="pt-6 border-t border-slate-800/80 flex items-center gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Full Dialogue Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Panel Grid Editor</span>
              </div>
            </div>
          </div>

          {/* RIGHT HERO COMIC GRAPHIC / PREVIEW */}
          <div className="lg:col-span-6">
            <HeroComicPreview onOpenReader={onOpenPreview} />
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            COMPREHENSIVE SAAS SUITE
          </span>
          <h2 className="text-3xl sm:text-4xl font-comic text-white tracking-wide">
            DESIGNED FOR DIGITAL COMIC CREATORS
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need from initial story prompt seed to finished comic page publication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:text-cyan-300 transition-colors">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="font-comic text-2xl text-white tracking-wide group-hover:text-purple-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW TIMELINE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
            CREATIVE WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-comic text-white tracking-wide">
            FROM PROMPT TO COMIC PAGE IN 4 STEPS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, i) => (
            <div
              key={i}
              className="glass-panel rounded-2xl p-6 space-y-3 relative overflow-hidden"
            >
              <span className="font-comic text-4xl text-purple-500/30 absolute top-4 right-4 font-bold">
                {step.num}
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xs font-bold font-mono">
                {step.num}
              </div>
              <h4 className="font-comic text-xl text-white tracking-wide">{step.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BOTTOM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#131A2B] via-[#182238] to-[#0F1420] border border-purple-500/30 p-8 sm:p-12 text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-halftone-dots opacity-10 pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-comic text-white tracking-wide">
              READY TO BRING YOUR STORY TO LIFE?
            </h2>
            <p className="text-slate-300 text-sm font-sans">
              Launch the ComicCraft studio now to experience AI-powered story script generation and comic panel composition.
            </p>

            <div className="pt-2">
              <button
                onClick={onStartCreating}
                className="px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white shadow-glow-purple hover:scale-105 transition-all inline-flex items-center gap-2 border border-white/20"
              >
                <Wand2 className="w-4 h-4 text-cyan-200" />
                <span>Launch Comic Creator Studio →</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
