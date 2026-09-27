import React, { useState } from 'react';
import {
  ComicGenre,
  ComicStyle,
  ComicTone,
  StoryLength,
  ComicProject,
} from '../types';
import { StoryService, ComicsService } from '../services/api';
import { AIGenerationOverlay } from './AIGenerationOverlay';
import { ComicPanelEditor } from './ComicPanelEditor';
import {
  Sparkles,
  Zap,
  BookOpen,
  UserCheck,
  Film,
  Play,
  Save,
  CheckCircle2,
  Wand2,
  ChevronRight,
  RefreshCw,
  Palette,
  Layout,
  MessageSquare,
} from 'lucide-react';

interface CreateComicWizardProps {
  onStoryCreated: (comic: ComicProject) => void;
  onOpenReader: (comic: ComicProject) => void;
  onOpenAssistant: () => void;
}

export const CreateComicWizard: React.FC<CreateComicWizardProps> = ({
  onStoryCreated,
  onOpenReader,
  onOpenAssistant,
}) => {
  // Wizard state
  const [step, setStep] = useState<'idea' | 'generating' | 'review' | 'editor'>('idea');

  // Input State
  const [ideaText, setIdeaText] = useState('');
  const [characterConcept, setCharacterConcept] = useState('Alex (Cyberpunk Hacker) & Maya (Tech Specialist)');
  const [genre, setGenre] = useState<ComicGenre>('Sci-Fi');
  const [tone, setTone] = useState<ComicTone>('Mysterious');
  const [style, setStyle] = useState<ComicStyle>('Manga');
  const [layoutStyle, setLayoutStyle] = useState<string>('Dynamic 4-Panel Grid');
  const [length, setLength] = useState<StoryLength>('Medium');

  // Generated Result
  const [activeComic, setActiveComic] = useState<ComicProject | null>(null);

  const genreOptions: ComicGenre[] = [
    'Sci-Fi',
    'Superhero',
    'Fantasy',
    'Mystery',
    'Adventure',
    'Comedy',
    'Horror',
  ];

  const styleOptions: ComicStyle[] = [
    'Manga',
    'Western Comic',
    'Graphic Novel',
    'Cartoon',
    'Minimal',
    'Superhero',
  ];

  const layoutOptions = [
    'Dynamic 4-Panel Grid',
    'Hero Splash + Row',
    'Widescreen Cinematic',
    'Vertical Scroll Layout',
  ];

  const sampleIdeas = [
    'A college student discovers a mysterious portal hidden inside the library stacks.',
    'An undercover detective gets trapped inside a retro arcade game controlling city power.',
    'A rogue inventor builds a frequency scanner picking up transmissions from tomorrow.',
  ];

  const handleGenerate = async () => {
    if (!ideaText.trim()) return;
    setStep('generating');

    try {
      const res = await StoryService.generateStory({
        idea: `${ideaText} (Characters: ${characterConcept})`,
        genre,
        tone,
        style,
        length,
      });

      const newComic: ComicProject = {
        id: `comic-${Date.now()}`,
        userId: 'demo-user-1',
        title: res.story.title || 'The Clock Beyond Tomorrow',
        tagline: res.story.tagline || 'Imagine. Create. Panel by Panel.',
        genre: res.story.genre || genre,
        style: res.story.style || style,
        tone: res.story.tone || tone,
        summary: res.story.summary || 'An epic story built by Gemini AI.',
        coverColor: 'from-purple-900 via-indigo-900 to-slate-950',
        characters: res.story.characters || [],
        scenes: res.story.scenes || [],
        panels: res.story.panels || [],
        ending: res.story.ending || '',
        status: 'Draft',
        pagesCount: Math.ceil((res.story.panels || []).length / 4) || 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to backend / local store
      try {
        await ComicsService.createComic(newComic);
      } catch (e) {
        console.warn('Comic saved locally');
      }

      setActiveComic(newComic);
      onStoryCreated(newComic);
      setStep('review');
    } catch (e) {
      console.error(e);
      setStep('idea');
    }
  };

  const handleSaveAndPublish = async () => {
    if (!activeComic) return;
    const updated = { ...activeComic, status: 'Completed' as const };
    setActiveComic(updated);
    try {
      await ComicsService.updateComic(activeComic.id, updated);
    } catch (e) {}
    onStoryCreated(updated);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* AI GENERATION ANIMATION OVERLAY */}
      {step === 'generating' && <AIGenerationOverlay />}

      {/* STEP 1: COMIC CREATOR STUDIO WORKSPACE */}
      {step === 'idea' && (
        <div className="space-y-8">
          {/* STUDIO HEADER */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-2 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131A2B] border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI CREATIVE WORKSPACE</span>
            </div>
            <h1 className="font-comic text-4xl text-white tracking-wide">COMIC CREATOR STUDIO</h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl font-sans">
              Configure your core narrative prompt, hero characters, artistic style, and grid layout.
            </p>
          </div>

          {/* 5 CLEAN STUDIO CARDS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CARD 1: STORY / PROMPT */}
            <div className="glass-panel rounded-3xl p-6 space-y-4 relative">
              <div className="flex items-center gap-3 border-b border-purple-500/10 pb-3">
                <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-comic text-2xl text-white tracking-wide">1. STORY / PROMPT</h3>
                  <p className="text-[11px] text-slate-400">Core narrative theme and plot synopsis</p>
                </div>
              </div>

              <textarea
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                rows={4}
                placeholder="Describe your story idea... (e.g. A college student discovers a mysterious portal inside the library stacks leading to a futuristic city)..."
                className="w-full bg-[#0A0D14]/80 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans leading-relaxed resize-none"
              />

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                  Prompt Seeds:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sampleIdeas.map((seed, i) => (
                    <button
                      key={i}
                      onClick={() => setIdeaText(seed)}
                      className="text-[10px] bg-slate-900/80 hover:bg-purple-950/60 text-slate-300 hover:text-purple-200 border border-slate-800 hover:border-purple-500/30 px-2.5 py-1 rounded-xl transition-all"
                    >
                      ✨ "{seed.slice(0, 38)}..."
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CARD 2: CHARACTER CONCEPT */}
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-purple-500/10 pb-3">
                <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-comic text-2xl text-white tracking-wide">2. CHARACTER CAST</h3>
                  <p className="text-[11px] text-slate-400">Protagonist, rival, or companion details</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">Cast & Protagonist Profiles:</label>
                <textarea
                  value={characterConcept}
                  onChange={(e) => setCharacterConcept(e.target.value)}
                  rows={3}
                  placeholder="e.g. Arun (24, rogue hacker with cyber visor), Mira (intel officer)..."
                  className="w-full bg-[#0A0D14]/80 border border-slate-800 rounded-2xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">Story Tone:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Mysterious', 'Epic', 'Funny', 'Dark', 'Emotional', 'Inspirational'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t as any)}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold border transition-all text-center ${
                        tone === t
                          ? 'bg-purple-600/90 text-white border-purple-400 font-bold'
                          : 'bg-[#0A0D14] text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CARD 3: ART STYLE */}
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-purple-500/10 pb-3">
                <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-300">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-comic text-2xl text-white tracking-wide">3. ART STYLE</h3>
                  <p className="text-[11px] text-slate-400">Visual aesthetic & rendering genre</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {styleOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`p-3 rounded-2xl text-xs font-semibold border transition-all text-center ${
                      style === s
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white border-purple-400 shadow-glow-purple font-bold'
                        : 'bg-[#0A0D14] text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CARD 4: COMIC LAYOUT */}
            <div className="glass-panel rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-purple-500/10 pb-3">
                <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-comic text-2xl text-white tracking-wide">4. COMIC LAYOUT</h3>
                  <p className="text-[11px] text-slate-400">Panel grid flow & row sequence</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {layoutOptions.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLayoutStyle(l)}
                    className={`p-3 rounded-2xl text-xs font-medium border text-left transition-all ${
                      layoutStyle === l
                        ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 font-bold'
                        : 'bg-[#0A0D14] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CARD 5: GENERATE COMIC PROMINENT BUTTON CARD */}
          <div className="glass-panel rounded-3xl p-8 border-2 border-purple-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
            <div className="max-w-md mx-auto space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                READY FOR GENERATION
              </span>
              <h3 className="font-comic text-2xl text-white">READY TO BUILD YOUR AI COMIC?</h3>
              <p className="text-xs text-slate-400 font-sans">
                Gemini AI will synthesize your prompt, characters, art style, and grid into complete panels.
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!ideaText.trim()}
              className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white shadow-glow-purple hover:shadow-glow-cyan hover:scale-105 active:scale-95 disabled:opacity-40 transition-all inline-flex items-center justify-center gap-3 border border-white/20"
            >
              <Zap className="w-5 h-5 text-cyan-200 animate-pulse" />
              <span>Generate Comic →</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: GENERATED STORY REVIEW & OVERVIEW */}
      {step === 'review' && activeComic && (
        <div className="space-y-8">
          {/* HEADER BAR */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/10 pb-4">
              <div className="space-y-1">
                <span className="bg-purple-950 text-cyan-400 font-comic text-xs px-3 py-1 rounded-lg border border-purple-500/30">
                  {activeComic.genre.toUpperCase()} • {activeComic.style}
                </span>
                <h1 className="font-comic text-4xl text-white tracking-wide">{activeComic.title}</h1>
                <p className="text-xs font-mono text-purple-300">{activeComic.tagline}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep('editor')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-purple flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Film className="w-4 h-4" /> Open Panel Editor →
                </button>
              </div>
            </div>

            {/* SYNOPSIS OVERVIEW */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase">
                AI STORY OVERVIEW:
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed font-sans bg-[#0A0D14] p-4 rounded-2xl border border-slate-800">
                {activeComic.summary}
              </p>
            </div>
          </div>

          {/* GENERATED CHARACTERS SECTION */}
          <div className="space-y-4">
            <h3 className="font-comic text-2xl text-white tracking-wide flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-purple-400" />
              GENERATED CHARACTERS ({activeComic.characters.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeComic.characters.map((char, i) => (
                <div key={i} className="glass-panel p-5 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-comic text-xl text-white">{char.name}</h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                      {char.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong className="text-purple-300">Personality:</strong> {char.personality}
                  </p>
                  <p className="text-xs text-slate-300">
                    <strong className="text-cyan-300">Appearance:</strong> {char.appearance}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* NEXT STEP CTA */}
          <div className="flex items-center justify-between pt-4 glass-panel p-5 rounded-2xl">
            <button
              onClick={() => setStep('idea')}
              className="text-xs font-semibold text-slate-400 hover:text-white"
            >
              ← Re-configure Story Prompt
            </button>

            <button
              onClick={() => setStep('editor')}
              className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-glow-purple hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Build Comic Panels →</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: VISUAL PANEL EDITOR */}
      {step === 'editor' && activeComic && (
        <div className="space-y-6">
          <div className="flex items-center justify-between glass-panel p-4 rounded-2xl">
            <button
              onClick={() => setStep('review')}
              className="text-xs font-semibold text-slate-400 hover:text-white"
            >
              ← Back to Story Overview
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenReader(activeComic)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-800"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Full Reader Preview
              </button>

              <button
                onClick={handleSaveAndPublish}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg"
              >
                <Save className="w-4 h-4" /> Save & Complete Comic
              </button>
            </div>
          </div>

          <ComicPanelEditor
            panels={activeComic.panels}
            onUpdatePanels={(updatedPanels) => {
              const updated = { ...activeComic, panels: updatedPanels };
              setActiveComic(updated);
              onStoryCreated(updated);
            }}
            onOpenAssistant={onOpenAssistant}
          />
        </div>
      )}
    </div>
  );
};
