import React from 'react';
import { ComicTemplate, ComicGenre, ComicStyle } from '../types';
import { Layout, Zap, Flame, Eye, Smile, BookOpen, ArrowRight } from 'lucide-react';

interface TemplatesPageProps {
  onSelectTemplate: (template: ComicTemplate) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelectTemplate }) => {
  const templates: ComicTemplate[] = [
    {
      id: 'template-superhero',
      name: 'Superhero Action',
      genre: 'Superhero',
      style: 'Western Comic',
      description: 'High-octane action layout with bold splash panels, explosion bursts, and dramatic hero poses.',
      bgGradient: 'from-amber-600 via-rose-600 to-purple-900',
      panelsCount: 4,
      iconName: 'Zap',
    },
    {
      id: 'template-manga',
      name: 'Manga Shonen',
      genre: 'Sci-Fi',
      style: 'Manga',
      description: 'Vertical speed-line layout focused on high tension, intense character eyes, and rapid battle sequences.',
      bgGradient: 'from-indigo-900 via-purple-900 to-slate-950',
      panelsCount: 4,
      iconName: 'Flame',
    },
    {
      id: 'template-mystery',
      name: 'Noir Mystery',
      genre: 'Mystery',
      style: 'Graphic Novel',
      description: 'Cinematic widescreen layout with shadow silhouetting, rain streaks, and slow-burn suspense captions.',
      bgGradient: 'from-slate-950 via-indigo-950 to-purple-950',
      panelsCount: 4,
      iconName: 'Eye',
    },
    {
      id: 'template-comedy',
      name: 'Dynamic Comedy',
      genre: 'Comedy',
      style: 'Cartoon',
      description: 'Playful multi-bubble layout with exaggerated character expressions, thought clouds, and comedic punchlines.',
      bgGradient: 'from-pink-600 via-purple-600 to-blue-600',
      panelsCount: 4,
      iconName: 'Smile',
    },
    {
      id: 'template-graphic-novel',
      name: 'Graphic Novel',
      genre: 'Fantasy',
      style: 'Graphic Novel',
      description: 'Professional cinematic layout featuring lush scenery establishers, deep character dialogue, and rich lore.',
      bgGradient: 'from-emerald-900 via-teal-950 to-slate-950',
      panelsCount: 4,
      iconName: 'BookOpen',
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h2 className="font-comic text-3xl tracking-wide text-white flex items-center gap-3">
          <Layout className="w-8 h-8 text-purple-400" />
          COMIC TEMPLATES STUDIO
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Pick a battle-tested comic panel template pre-configured for your favorite storytelling genre.
        </p>
      </div>

      {/* TEMPLATES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            onClick={() => onSelectTemplate(tpl)}
            className="group relative bg-[#0F172A] border-2 border-slate-800 hover:border-purple-500/60 rounded-2xl p-6 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
          >
            {/* Visual Header Banner */}
            <div className={`h-28 -mx-6 -mt-6 mb-5 bg-gradient-to-tr ${tpl.bgGradient} p-4 relative flex flex-col justify-between border-b-2 border-slate-950`}>
              <div className="flex items-center justify-between">
                <span className="bg-black/60 backdrop-blur-md text-yellow-300 font-comic text-xs px-2.5 py-0.5 rounded border border-yellow-400/40">
                  {tpl.genre.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-white bg-slate-950/80 px-2 py-0.5 rounded">
                  {tpl.style}
                </span>
              </div>

              <h3 className="font-comic text-2xl text-white tracking-wide drop-shadow-md">
                {tpl.name}
              </h3>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {tpl.description}
              </p>

              {/* Panel Layout Preview Mockup */}
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 grid grid-cols-2 gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="col-span-2 h-7 bg-purple-900/60 rounded border border-purple-500/30 flex items-center justify-center text-[9px] font-mono text-purple-300">
                  HERO PANORAMA
                </div>
                <div className="col-span-1 h-8 bg-slate-900 rounded border border-slate-700 flex items-center justify-center text-[9px] font-mono text-slate-400">
                  REACTION
                </div>
                <div className="col-span-1 h-8 bg-indigo-950 rounded border border-indigo-700 flex items-center justify-center text-[9px] font-mono text-indigo-300">
                  ACTION BURST
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-yellow-300 transition-colors">
              <span>Use Template →</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
