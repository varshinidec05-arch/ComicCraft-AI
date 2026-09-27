import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Wand2, User, LogOut, BookOpen, Layers, Zap } from 'lucide-react';

interface NavbarProps {
  onStartCreating: () => void;
  onOpenAuth: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onStartCreating,
  onOpenAuth,
  currentView,
  setCurrentView,
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0D14]/75 backdrop-blur-xl border-b border-purple-500/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* BRAND LOGO */}
        <div
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 p-[1.5px] shadow-glow-purple group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0F1420] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-comic text-2xl tracking-wider bg-gradient-to-r from-white via-purple-200 to-slate-300 bg-clip-text text-transparent">
                COMICCRAFT
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                STUDIO AI
              </span>
            </div>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-2xl border border-purple-500/10 backdrop-blur-md">
          {[
            { id: 'landing', label: 'Home' },
            { id: 'dashboard', label: 'Studio Dashboard' },
            { id: 'templates', label: 'Templates' },
            { id: 'characters', label: 'Characters' },
            { id: 'my-comics', label: 'Library' },
          ].map((nav) => {
            const isActive = currentView === nav.id;
            return (
              <button
                key={nav.id}
                onClick={() => setCurrentView(nav.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-white shadow-md border border-purple-400/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                {nav.label}
              </button>
            );
          })}
        </nav>

        {/* ACTIONS & PROFILE */}
        <div className="flex items-center gap-3">
          <button
            onClick={onStartCreating}
            className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-xs transition-all hover:scale-[1.02]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 rounded-xl group-hover:opacity-100 transition-opacity"></span>
            <div className="relative px-4 py-2 bg-[#0F1420] rounded-[11px] flex items-center gap-2 transition-colors group-hover:bg-transparent">
              <Wand2 className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white transition-colors" />
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-bold">
                Create Comic
              </span>
            </div>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <button
                onClick={() => setCurrentView('profile')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-purple-500/20 text-slate-200 text-xs hover:border-purple-500/50 transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 text-white font-bold text-[10px] flex items-center justify-center">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="hidden sm:inline font-medium text-slate-300">
                  {user?.name?.split(' ')[0] || 'Creator'}
                </span>
              </button>

              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 hover:border-purple-500/40 hover:text-white transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
