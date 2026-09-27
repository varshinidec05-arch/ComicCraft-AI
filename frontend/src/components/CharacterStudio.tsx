import React, { useState, useEffect } from 'react';
import { CharacterItem } from '../types';
import { CharacterService } from '../services/api';
import {
  UserCheck,
  Sparkles,
  Plus,
  Wand2,
  Trash2,
  Shield,
  Zap,
  BookOpen,
  User,
  Loader2,
} from 'lucide-react';

interface CharacterStudioProps {
  characters: CharacterItem[];
  onSaveCharacter: (char: CharacterItem) => void;
}

export const CharacterStudio: React.FC<CharacterStudioProps> = ({
  characters: initialCharacters,
  onSaveCharacter,
}) => {
  const [characterList, setCharacterList] = useState<CharacterItem[]>(initialCharacters);
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [form, setForm] = useState<CharacterItem>({
    name: '',
    role: 'Protagonist',
    personality: '',
    appearance: '',
    background: '',
    importance: 'Main Hero',
    age: '24',
    specialAbilities: '',
  });

  useEffect(() => {
    setCharacterList(initialCharacters);
  }, [initialCharacters]);

  const handleAIGenerate = async () => {
    if (!promptInput.trim()) return;
    setIsGenerating(true);
    try {
      const res = await CharacterService.generateCharacter(promptInput, form.role);
      if (res.character) {
        setForm({
          ...form,
          name: res.character.name || form.name || 'Hero',
          role: res.character.role || form.role,
          personality: res.character.personality || '',
          appearance: res.character.appearance || '',
          background: res.character.background || '',
          importance: res.character.importance || 'Main Hero',
        });
      }
    } catch (e) {
      // Fallback AI character creation
      setForm({
        ...form,
        name: promptInput.split(' ')[0] || 'Vesper',
        personality: 'Bold, highly intuitive, carrying a hidden timeline secret.',
        appearance: 'Cybernetic jacket, glowing optical visor, dark windblown hair.',
        background: 'Trained under Sector 9 rebels before uncovering forbidden signal logs.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newChar: CharacterItem = {
      ...form,
      id: `char-${Date.now()}`,
    };
    onSaveCharacter(newChar);
    setCharacterList([newChar, ...characterList]);
    setShowModal(false);
    // Reset Form
    setForm({
      name: '',
      role: 'Protagonist',
      personality: '',
      appearance: '',
      background: '',
      importance: 'Main Hero',
      age: '24',
      specialAbilities: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h2 className="font-comic text-3xl tracking-wide text-white flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-purple-400" />
            CHARACTER STUDIO
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build distinct comic heroes, rivals, and sidekicks powered by Gemini AI descriptions.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 border border-purple-400/30 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Create Character
        </button>
      </div>

      {/* CHARACTER CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characterList.map((char, i) => (
          <div
            key={char.id || i}
            className="group relative bg-[#0F172A] border-2 border-slate-800 hover:border-purple-500/60 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-halftone-dots opacity-15 pointer-events-none"></div>

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-950 border border-purple-500/40 text-purple-300 font-comic text-xs px-3 py-1 rounded-lg">
                  {char.role.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-yellow-400 bg-yellow-950/60 px-2 py-0.5 rounded border border-yellow-500/30">
                  {char.importance || 'Main Hero'}
                </span>
              </div>

              {/* Name & Avatar */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-600 flex items-center justify-center font-comic text-xl text-white shadow-lg border border-purple-300/30">
                  {char.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-comic text-2xl text-white tracking-wide group-hover:text-purple-300 transition-colors">
                    {char.name}
                  </h3>
                  {char.age && (
                    <span className="text-[11px] font-mono text-slate-400">AGE: {char.age}</span>
                  )}
                </div>
              </div>

              {/* Attributes Details */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <strong className="text-purple-400 block mb-0.5 font-mono text-[10px] uppercase">
                    Personality:
                  </strong>
                  <p className="leading-relaxed">{char.personality}</p>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <strong className="text-blue-400 block mb-0.5 font-mono text-[10px] uppercase">
                    Visual Appearance:
                  </strong>
                  <p className="leading-relaxed">{char.appearance}</p>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <strong className="text-yellow-400 block mb-0.5 font-mono text-[10px] uppercase">
                    Background Story:
                  </strong>
                  <p className="leading-relaxed">{char.background}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>READY FOR STORY PANELS</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>
          </div>
        ))}
      </div>

      {/* CREATE CHARACTER MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full bg-[#0F172A] border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-comic text-2xl text-white tracking-wide">
                CREATE NEW CHARACTER
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* AI GENERATOR TRIGGER */}
            <div className="bg-purple-950/50 border border-purple-500/40 p-4 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-yellow-300 flex items-center gap-1.5 font-mono">
                <Sparkles className="w-4 h-4" /> GENERATE CHARACTER DETAILS WITH GEMINI AI
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Describe concept (e.g. 'Rogue cybernetic hacker with a glowing eye')..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={isGenerating || !promptInput.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 disabled:opacity-40"
                >
                  {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                  Generate
                </button>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Character Name:</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="e.g. Arun Mercer"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Role:</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Protagonist">Protagonist</option>
                    <option value="Antagonist">Antagonist</option>
                    <option value="Deuteragonist">Deuteragonist / Rival</option>
                    <option value="Sidekick">Sidekick / Ally</option>
                    <option value="Mentor">Mentor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Personality Traits:</label>
                <textarea
                  value={form.personality}
                  onChange={(e) => setForm({ ...form, personality: e.target.value })}
                  rows={2}
                  placeholder="e.g. Quick-witted, stubborn, hyper-observant under pressure"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Visual Appearance:</label>
                <textarea
                  value={form.appearance}
                  onChange={(e) => setForm({ ...form, appearance: e.target.value })}
                  rows={2}
                  placeholder="e.g. Dark leather jacket, glowing blue tech goggles, wavy hair"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Background Lore:</label>
                <textarea
                  value={form.background}
                  onChange={(e) => setForm({ ...form, background: e.target.value })}
                  rows={2}
                  placeholder="e.g. Built an illegal signal scanner in a basement workshop..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg"
                >
                  Save Character
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
