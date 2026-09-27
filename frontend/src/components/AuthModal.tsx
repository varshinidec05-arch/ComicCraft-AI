import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, Lock, Mail, User, Zap, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('creator@comiccraft.ai');
  const [password, setPassword] = useState('password123');

  const { login, register, setDemoUser, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      await register(name || 'Comic Creator', email, password);
    } else {
      await login(email, password);
    }
    onClose();
  };

  const handleQuickDemo = () => {
    setDemoUser();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-[#0F172A] border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden">
        {/* Halftone Dot Overlay */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-halftone-dots opacity-20 pointer-events-none"></div>

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-comic text-2xl tracking-wider text-white">
              {isRegister ? 'JOIN COMICCRAFT' : 'STUDIO LOGIN'}
            </span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-CLICK DEMO ACCESS BUTTON */}
        <div className="bg-purple-950/60 border border-purple-500/40 p-3.5 rounded-2xl space-y-2 text-center">
          <p className="text-[11px] font-mono text-purple-300 font-semibold">
            ✦ INSTANT DEMO CREATOR ACCESS ✦
          </p>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg border border-black hover:scale-[1.02] transition-transform flex items-center justify-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Enter Studio as Alex Mercer</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full"></div>
          <span className="bg-[#0F172A] px-3 text-[10px] font-mono text-slate-500 uppercase">
            OR USE ACCOUNT
          </span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Email Address:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg border border-purple-400/30 hover:scale-[1.02] transition-transform"
          >
            {isRegister ? 'Create Account →' : 'Sign In to Studio →'}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-purple-400 hover:text-yellow-300 transition-colors"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};
