import React, { useState } from 'react';
import { ComicProject } from '../types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface ComicReaderModalProps {
  comic: ComicProject;
  onClose: () => void;
}

export const ComicReaderModal: React.FC<ComicReaderModalProps> = ({ comic, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Group panels into pages (4 panels per page)
  const panelsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(comic.panels.length / panelsPerPage));
  const currentPanels = comic.panels.slice(currentPage * panelsPerPage, (currentPage + 1) * panelsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullScreen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0D14]/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden">
      {/* TOP HEADER CONTROLS */}
      <div className="bg-[#0F1420]/90 border-b border-purple-500/10 px-6 py-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="font-comic text-2xl tracking-wider text-white">
            {comic.title}
          </span>
          <span className="bg-purple-950 border border-purple-500/30 text-cyan-300 text-[11px] font-mono px-2.5 py-0.5 rounded">
            {comic.genre} • {comic.style}
          </span>
        </div>

        {/* CENTER PAGINATION */}
        <div className="flex items-center gap-4 bg-[#0A0D14] px-4 py-1.5 rounded-xl border border-purple-500/20 text-xs font-mono">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="p-1 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>
            PAGE <strong className="text-cyan-400">{currentPage + 1}</strong> OF {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className="p-1 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* RIGHT ACTION TOOLS */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#0A0D14] rounded-xl border border-purple-500/20 p-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              title="Zoom Out"
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 px-2">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              title="Zoom In"
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={toggleFullScreen}
            title="Toggle Fullscreen"
            className="p-2 bg-[#0A0D14] border border-purple-500/20 text-slate-300 hover:text-white rounded-xl"
          >
            {isFullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-950/80 border border-red-500/30 text-red-300 hover:bg-red-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
          >
            <X className="w-4 h-4" />
            <span>Exit Preview</span>
          </button>
        </div>
      </div>

      {/* MAIN READER DISPLAY CANVAS */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-6 relative">
        {/* Background Subtle Halftone */}
        <div className="absolute inset-0 bg-halftone-dots opacity-10 pointer-events-none"></div>

        {/* COMIC PAGE CONTAINER */}
        <div
          className="relative max-w-4xl w-full bg-[#0F1420] border border-purple-500/30 rounded-3xl p-6 shadow-2xl transition-transform duration-300 my-auto"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Comic Page Header */}
          <div className="flex items-center justify-between pb-3 border-b border-purple-500/10 mb-5 text-xs font-mono text-slate-400">
            <span className="font-comic text-slate-100 text-sm">{comic.title}</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> COMICCRAFT READER
            </span>
          </div>

          {/* PANELS DISPLAY */}
          <div className="grid grid-cols-2 gap-4">
            {currentPanels.map((panel) => {
              let colSpan = 'col-span-2';
              if (panel.layout === 'half-left' || panel.layout === 'half-right') colSpan = 'col-span-1';

              return (
                <div
                  key={panel.id}
                  className={`${colSpan} relative rounded-2xl border border-purple-500/20 bg-gradient-to-br from-[#131A2B] via-[#0F1420] to-[#182238] p-4 min-h-[170px] shadow-xl overflow-hidden`}
                >
                  {/* Action Sticker */}
                  {panel.actionSticker && (
                    <div className="absolute top-2 right-2 z-10 comic-burst text-xs transform rotate-6">
                      {panel.actionSticker}
                    </div>
                  )}

                  {/* Caption Box */}
                  {panel.caption && (
                    <div className="relative z-10 max-w-[85%] bg-purple-950/90 border border-cyan-400/40 p-1.5 rounded-lg text-[10px] font-mono text-cyan-200 mb-3">
                      {panel.caption}
                    </div>
                  )}

                  {/* Art Description Prompt */}
                  <p className="text-xs text-slate-300 font-sans italic opacity-85 mb-4 leading-relaxed">
                    🎨 "{panel.description}"
                  </p>

                  {/* Bubbles Render */}
                  <div className="space-y-2.5 z-10 relative">
                    {panel.bubbles.map((b) => (
                      <div
                        key={b.id}
                        className={`p-2.5 rounded-xl text-xs max-w-[240px] shadow-comic ${
                          b.type === 'shout'
                            ? 'bg-amber-300 text-black font-black uppercase'
                            : b.type === 'thought'
                            ? 'bg-white text-black font-medium border border-black'
                            : b.type === 'narration'
                            ? 'bg-purple-950 text-cyan-200 border border-cyan-400/40 font-mono'
                            : 'bg-white text-black font-bold border border-black'
                        }`}
                      >
                        {b.character && (
                          <span className="block text-[9px] uppercase font-bold text-purple-700">
                            {b.character}
                          </span>
                        )}
                        <p>{b.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comic Page Footer */}
          <div className="mt-5 pt-3 border-t border-purple-500/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>ISSUE PAGE #{currentPage + 1}</span>
            <span>END OF PAGE</span>
          </div>
        </div>
      </div>

      {/* FOOTER BAR NAVIGATION */}
      <div className="bg-[#0F1420]/90 border-t border-purple-500/10 px-6 py-3 flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A0D14] border border-purple-500/20 hover:bg-slate-900 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Page
        </button>

        <span>Use Left / Right Arrows to turn pages</span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold disabled:opacity-40"
        >
          Next Page <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
