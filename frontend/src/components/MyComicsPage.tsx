import React from 'react';
import { ComicProject } from '../types';
import {
  BookOpen,
  Plus,
  Play,
  Edit3,
  Copy,
  Trash2,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface MyComicsPageProps {
  comics: ComicProject[];
  onOpenComic: (comic: ComicProject) => void;
  onEditComic: (comic: ComicProject) => void;
  onDuplicateComic: (comic: ComicProject) => void;
  onDeleteComic: (id: string) => void;
  onCreateNew: () => void;
}

export const MyComicsPage: React.FC<MyComicsPageProps> = ({
  comics,
  onOpenComic,
  onEditComic,
  onDuplicateComic,
  onDeleteComic,
  onCreateNew,
}) => {
  if (comics.length === 0) {
    return (
      <div className="glass-panel border-dashed border-purple-500/30 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 my-12 shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600/30 to-cyan-500/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-300">
          <BookOpen className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h3 className="font-comic text-3xl text-white">Your story shelf is empty.</h3>
          <p className="text-slate-400 text-sm font-sans">Every great comic starts with one prompt.</p>
        </div>

        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white shadow-glow-purple hover:scale-105 transition-all border border-white/20"
        >
          <span>Create Your First Comic →</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div>
          <h2 className="font-comic text-3xl tracking-wide text-white flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-400" />
            MY COMIC LIBRARY
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Manage your saved comic projects, edit panel scripts, and launch full-screen reader previews.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-purple border border-white/20 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Create New Comic
        </button>
      </div>

      {/* COMICS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comics.map((comic) => {
          const getStatusStyle = () => {
            switch (comic.status) {
              case 'Published':
                return 'bg-emerald-950 text-emerald-300 border-emerald-500/40';
              case 'Completed':
                return 'bg-cyan-950 text-cyan-300 border-cyan-500/40';
              case 'Draft':
              default:
                return 'bg-purple-950 text-purple-300 border-purple-500/40';
            }
          };

          return (
            <div
              key={comic.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              {/* Cover Gradient Header */}
              <div
                className={`h-36 p-5 bg-gradient-to-tr ${
                  comic.coverColor || 'from-[#182238] via-[#131A2B] to-[#0A0D14]'
                } relative flex flex-col justify-between border-b border-purple-500/20`}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="bg-[#0A0D14]/80 backdrop-blur-md font-comic text-xs text-cyan-300 px-2.5 py-0.5 rounded border border-purple-500/30">
                    {comic.genre.toUpperCase()}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getStatusStyle()}`}>
                    {comic.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-comic text-2xl text-white tracking-wide drop-shadow-md z-10 line-clamp-1">
                  {comic.title}
                </h3>
              </div>

              {/* Body summary */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans font-normal">
                  {comic.summary}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-purple-500/10">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    {comic.panels.length} Panels ({comic.pagesCount || 1} Pages)
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {new Date(comic.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-[#0A0D14]/80 border-t border-purple-500/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenComic(comic)}
                  className="flex-1 py-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Reader</span>
                </button>

                <button
                  onClick={() => onEditComic(comic)}
                  className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 rounded-xl"
                  title="Edit Panels"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDuplicateComic(comic)}
                  className="p-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 rounded-xl"
                  title="Duplicate Comic"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDeleteComic(comic.id)}
                  className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/50 rounded-xl"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
