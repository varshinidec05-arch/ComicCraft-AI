import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, BookOpen, CheckCircle2, UserCheck, Sparkles, Shield, Key } from 'lucide-react';

interface ProfilePageProps {
  totalComicsCount: number;
  charactersCount: number;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  totalComicsCount,
  charactersCount,
}) => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* PROFILE HEADER CARD */}
      <div className="relative bg-[#0F172A] border-2 border-purple-500/40 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-halftone-dots opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex flex-wrap items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-600 flex items-center justify-center font-comic text-4xl text-white shadow-xl border-2 border-purple-300">
            {user?.name ? user.name.charAt(0) : 'A'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-comic text-3xl text-white tracking-wide">{user?.name || 'Alex Mercer'}</h2>
              <span className="bg-yellow-400 text-slate-950 font-comic text-xs px-2.5 py-0.5 rounded border border-black">
                PRO CREATOR
              </span>
            </div>
            <p className="text-sm font-mono text-purple-300">{user?.email || 'creator@comiccraft.ai'}</p>
            <p className="text-xs text-slate-400 font-sans">
              Member since September 2026 • Gemini Pro Multi-Modal Plan Active
            </p>
          </div>
        </div>
      </div>

      {/* STATS METRICS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Comics', val: totalComicsCount, icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-500/30' },
          { label: 'Completed Comics', val: Math.max(1, totalComicsCount - 1), icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/30' },
          { label: 'Characters Built', val: charactersCount, icon: UserCheck, color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-500/30' },
          { label: 'AI Stories Drafted', val: totalComicsCount + 3, icon: Sparkles, color: 'text-yellow-400', bg: 'bg-yellow-950/40 border-yellow-500/30' },
        ].map((stat, i) => (
          <div
            key={i}
            className={`bg-slate-900/90 border ${stat.bg} rounded-2xl p-5 shadow-lg flex flex-col justify-between`}
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
            <div>
              <span className={`font-comic text-3xl ${stat.color} block`}>{stat.val}</span>
              <span className="text-xs font-semibold text-slate-400">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ACCOUNT SETTINGS DETAILS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <h3 className="font-comic text-xl text-white tracking-wide border-b border-slate-800 pb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          STUDIO PREFERENCES & SECURITY
        </h3>

        <div className="space-y-4 text-xs text-slate-300">
          <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <p className="font-bold text-white mb-0.5">Gemini AI Model Engine</p>
              <p className="text-slate-400">Gemini 1.5 Flash / Pro Structured JSON Pipeline</p>
            </div>
            <span className="bg-emerald-950 text-emerald-400 font-mono text-[10px] px-2.5 py-1 rounded border border-emerald-500/40">
              ACTIVE & CONNECTED
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div>
              <p className="font-bold text-white mb-0.5">Default Export Quality</p>
              <p className="text-slate-400">High Resolution Vector Panel Renderings</p>
            </div>
            <span className="bg-purple-950 text-purple-300 font-mono text-[10px] px-2.5 py-1 rounded border border-purple-500/40">
              ULTRA HD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
