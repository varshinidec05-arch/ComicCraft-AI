import React, { useState } from 'react';
import { SceneItem } from '../types';
import { SceneService } from '../services/api';
import {
  Film,
  Sparkles,
  Plus,
  Wand2,
  Trash2,
  Edit3,
  MapPin,
  Clock,
  Users,
  MessageSquare,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface SceneStudioProps {
  scenes: SceneItem[];
  availableCharacters: string[];
  onSaveScene: (scene: SceneItem) => void;
  onDeleteScene: (id: string) => void;
}

export const SceneStudio: React.FC<SceneStudioProps> = ({
  scenes: initialScenes,
  availableCharacters,
  onSaveScene,
  onDeleteScene,
}) => {
  const [scenes, setScenes] = useState<SceneItem[]>(initialScenes);
  const [topicInput, setTopicInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [form, setForm] = useState<SceneItem>({
    title: 'The Cyber Vault Breakthrough',
    location: 'Sector 9 Outer Substation',
    time: '03:15 AM',
    characters: availableCharacters.slice(0, 2),
    description: 'Enforcer drones sweep the courtyard with red searchlights while Arun hacks the security override terminal.',
    dialogue: [
      { character: availableCharacters[0] || 'Arun', text: 'We have 30 seconds before the security override kicks in!', emotion: 'Urgent' },
      { character: availableCharacters[1] || 'Mira', text: 'Hold them off! I am pulling the memory core now.', emotion: 'Focused' },
    ],
    actions: ['Drone alarm blares', 'Spark shockwave hits barrier', 'Core unlocked'],
  });

  const handleAIGenerate = async () => {
    if (!topicInput.trim()) return;
    setIsGenerating(true);
    try {
      const res = await SceneService.generateScene(topicInput, availableCharacters.slice(0, 2));
      if (res.scene) {
        setForm({
          ...form,
          title: res.scene.title || topicInput,
          location: res.scene.location || 'Unknown Location',
          time: res.scene.time || 'Midnight',
          characters: res.scene.characters || availableCharacters,
          description: res.scene.description || '',
          dialogue: res.scene.dialogue || form.dialogue,
          actions: res.scene.actions || form.actions,
        });
      }
    } catch (e) {
      setForm({
        ...form,
        title: `Scene: ${topicInput}`,
        location: 'Ancient Command Vault',
        time: '02:00 AM',
        description: `Atmospheric steam vents hiss as energy readings spike around ${topicInput}.`,
        dialogue: [
          { character: availableCharacters[0] || 'Hero', text: 'Did you see that reading on the primary monitor?', emotion: 'Tense' },
          { character: availableCharacters[1] || 'Ally', text: 'It is impossible... the server was disconnected an hour ago!', emotion: 'Shocked' },
        ],
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newScene: SceneItem = {
      ...form,
      id: `scene-${Date.now()}`,
    };
    onSaveScene(newScene);
    setScenes([newScene, ...scenes]);
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h2 className="font-comic text-3xl tracking-wide text-white flex items-center gap-3">
            <Film className="w-8 h-8 text-blue-400" />
            SCENE STUDIO
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate detailed scenes with locations, exact timestamps, character dialogues, and action beats.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 border border-purple-400/30 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Add Scene
        </button>
      </div>

      {/* SCENE CARDS LIST */}
      <div className="space-y-6">
        {scenes.map((scene, idx) => (
          <div
            key={scene.id || idx}
            className="relative bg-[#0F172A] border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 overflow-hidden"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-blue-600 text-white font-comic text-sm px-3 py-1 rounded-lg">
                  SCENE 0{idx + 1}
                </span>
                <h3 className="font-comic text-2xl text-white tracking-wide">{scene.title}</h3>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{scene.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{scene.time}</span>
                </div>
              </div>
            </div>

            {/* Description Prompt */}
            <p className="text-xs sm:text-sm text-slate-300 font-sans italic bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              🎬 "{scene.description}"
            </p>

            {/* Dialogue list */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Character Dialogue Script:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scene.dialogue.map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs space-y-1 shadow-md"
                  >
                    <div className="flex items-center justify-between font-bold text-purple-300">
                      <span>{d.character}:</span>
                      {d.emotion && (
                        <span className="text-[10px] font-mono text-yellow-400 bg-yellow-950/60 px-1.5 py-0.2 rounded">
                          [{d.emotion}]
                        </span>
                      )}
                    </div>
                    <p className="text-slate-200 font-medium">"{d.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions list & Card Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400 text-[10px]">ACTION BEATS:</span>
                {scene.actions.map((act, aIdx) => (
                  <span
                    key={aIdx}
                    className="bg-purple-950/80 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded text-[10px] font-semibold"
                  >
                    ⚡ {act}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDeleteScene(scene.id || `scene-${idx}`)}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
                  title="Delete Scene"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE SCENE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full bg-[#0F172A] border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-comic text-2xl text-white tracking-wide">ADD NEW SCENE</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            {/* AI Generator prompt */}
            <div className="bg-blue-950/50 border border-blue-500/40 p-4 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-yellow-300 flex items-center gap-1.5 font-mono">
                <Sparkles className="w-4 h-4" /> GENERATE SCENE WITH GEMINI AI
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="Scene topic (e.g. 'Midnight confrontation in the ancient library')..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={isGenerating || !topicInput.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 disabled:opacity-40"
                >
                  {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                  Generate
                </button>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Scene Title:</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location:</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Time:</label>
                  <input
                    type="text"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Scene Description:</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white resize-none"
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
                  Save Scene
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
