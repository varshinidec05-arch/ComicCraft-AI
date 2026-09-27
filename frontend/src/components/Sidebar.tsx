import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  UserCheck,
  Film,
  Bot,
  Layout,
  Settings,
  LogOut,
  Sparkles,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onLogout: () => void;
  compact?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  onLogout,
}) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-comic', label: 'Create Comic', icon: PlusCircle, highlight: true },
    { id: 'my-comics', label: 'My Comics', icon: BookOpen },
    { id: 'characters', label: 'Characters', icon: UserCheck },
    { id: 'scenes', label: 'Scene Studio', icon: Film },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'profile', label: 'Profile & Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0A0D14]/90 border-r border-purple-500/10 flex flex-col justify-between min-h-screen sticky top-0 z-40 backdrop-blur-xl">
      {/* TOP BRAND HEADER */}
      <div className="p-5">
        <div
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-3 cursor-pointer group mb-6"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 p-[1.5px] shadow-glow-purple group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0F1420] rounded-[10px] flex items-center justify-center relative">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <Sparkles className="w-3 h-3 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-comic text-xl tracking-wider bg-gradient-to-r from-white via-purple-200 to-cyan-400 bg-clip-text text-transparent">
              COMICCRAFT
            </span>
            <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-400 uppercase -mt-0.5">
              STUDIO AI
            </span>
          </div>
        </div>

        {/* NAVIGATION LIST */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-glow-purple border border-purple-400/30 font-semibold'
                    : item.highlight
                    ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/40'
                    : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && !isActive && (
                  <span className="text-[9px] font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded">
                    NEW
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM USER PROFILE */}
      <div className="p-4 border-t border-purple-500/10 bg-[#0F1420]/60">
        <div className="flex items-center justify-between">
          <div
            onClick={() => setCurrentView('profile')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white border border-purple-400/40 shadow-md">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div className="flex flex-col max-w-[110px] overflow-hidden">
              <span className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'Alex Mercer'}</span>
              <span className="text-[10px] text-slate-400 truncate">{user?.email || 'creator@comiccraft.ai'}</span>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
