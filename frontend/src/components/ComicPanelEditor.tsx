import React, { useState } from 'react';
import { ComicPanel, SpeechBubble } from '../types';
import { SpeechBubbleComponent } from './SpeechBubbleComponent';
import {
  Plus,
  Trash2,
  Copy,
  MoveUp,
  MoveDown,
  Sparkles,
  MessageSquare,
  Zap,
  Layout,
  Maximize2,
  Wand2,
} from 'lucide-react';

interface ComicPanelEditorProps {
  panels: ComicPanel[];
  onUpdatePanels: (panels: ComicPanel[]) => void;
  onOpenAssistant?: () => void;
}

export const ComicPanelEditor: React.FC<ComicPanelEditorProps> = ({
  panels,
  onUpdatePanels,
  onOpenAssistant,
}) => {
  const [selectedPanelId, setSelectedPanelId] = useState<string>(panels[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'bubbles' | 'layout' | 'stickers'>('bubbles');

  const selectedPanel = panels.find((p) => p.id === selectedPanelId) || panels[0];

  const actionStickers = ['POW!', 'WHOOSH!', 'BZZZZT!', 'BOOM!', 'CLICK!', 'KABOOM!', 'ZAP!'];
  const layoutOptions: Array<{ id: ComicPanel['layout']; label: string }> = [
    { id: 'hero-wide', label: 'Hero Wide (Full Row)' },
    { id: 'full', label: 'Full Panel Splash' },
    { id: 'half-left', label: 'Half Row (Left)' },
    { id: 'half-right', label: 'Half Row (Right)' },
    { id: 'third', label: 'One-Third Column' },
  ];

  // Panel Management Functions
  const handleAddPanel = () => {
    const newPanel: ComicPanel = {
      id: `panel-${Date.now()}`,
      panelNumber: panels.length + 1,
      layout: 'hero-wide',
      description: 'New comic panel scene description.',
      bgColor: 'bg-slate-900',
      bubbles: [
        {
          id: `bubble-${Date.now()}`,
          type: 'speech',
          text: 'Enter dialogue here...',
          character: 'Hero',
          x: 10,
          y: 20,
        },
      ],
      caption: 'CAPTION TEXT',
      actionSticker: 'POW!',
    };
    const updated = [...panels, newPanel];
    onUpdatePanels(updated);
    setSelectedPanelId(newPanel.id);
  };

  const handleDeletePanel = (id: string) => {
    if (panels.length <= 1) return;
    const filtered = panels.filter((p) => p.id !== id);
    onUpdatePanels(filtered);
    if (selectedPanelId === id) {
      setSelectedPanelId(filtered[0]?.id || '');
    }
  };

  const handleDuplicatePanel = (panel: ComicPanel) => {
    const dup: ComicPanel = {
      ...panel,
      id: `panel-${Date.now()}`,
      panelNumber: panels.length + 1,
      bubbles: panel.bubbles.map((b) => ({ ...b, id: `bubble-${Date.now()}-${Math.random()}` })),
    };
    onUpdatePanels([...panels, dup]);
    setSelectedPanelId(dup.id);
  };

  const handleMovePanel = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === panels.length - 1)
    )
      return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...panels];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    reordered.forEach((p, idx) => (p.panelNumber = idx + 1));
    onUpdatePanels(reordered);
  };

  // Bubble Functions
  const handleAddBubble = (type: SpeechBubble['type']) => {
    if (!selectedPanel) return;
    const newBubble: SpeechBubble = {
      id: `b-${Date.now()}`,
      type,
      text: type === 'narration' ? 'LATER THAT EVENING...' : 'New text dialogue...',
      character: type === 'narration' ? 'Narrator' : 'Character',
      x: 15,
      y: 30,
    };
    const updatedPanels = panels.map((p) => {
      if (p.id === selectedPanel.id) {
        return { ...p, bubbles: [...p.bubbles, newBubble] };
      }
      return p;
    });
    onUpdatePanels(updatedPanels);
  };

  const handleUpdateBubbleText = (bubbleId: string, text: string) => {
    const updatedPanels = panels.map((p) => {
      if (p.id === selectedPanel.id) {
        return {
          ...p,
          bubbles: p.bubbles.map((b) => (b.id === bubbleId ? { ...b, text } : b)),
        };
      }
      return p;
    });
    onUpdatePanels(updatedPanels);
  };

  const handleDeleteBubble = (bubbleId: string) => {
    const updatedPanels = panels.map((p) => {
      if (p.id === selectedPanel.id) {
        return {
          ...p,
          bubbles: p.bubbles.filter((b) => b.id !== bubbleId),
        };
      }
      return p;
    });
    onUpdatePanels(updatedPanels);
  };

  const handleSelectSticker = (sticker: string) => {
    if (!selectedPanel) return;
    const updatedPanels = panels.map((p) =>
      p.id === selectedPanel.id ? { ...p, actionSticker: sticker } : p
    );
    onUpdatePanels(updatedPanels);
  };

  const handleUpdateCaption = (caption: string) => {
    if (!selectedPanel) return;
    const updatedPanels = panels.map((p) =>
      p.id === selectedPanel.id ? { ...p, caption } : p
    );
    onUpdatePanels(updatedPanels);
  };

  const handleUpdateLayout = (layout: ComicPanel['layout']) => {
    if (!selectedPanel) return;
    const updatedPanels = panels.map((p) =>
      p.id === selectedPanel.id ? { ...p, layout } : p
    );
    onUpdatePanels(updatedPanels);
  };

  const handleUpdateDescription = (description: string) => {
    if (!selectedPanel) return;
    const updatedPanels = panels.map((p) =>
      p.id === selectedPanel.id ? { ...p, description } : p
    );
    onUpdatePanels(updatedPanels);
  };

  return (
    <div className="space-y-6">
      {/* HEADER TOOLBAR */}
      <div className="glass-panel p-5 rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-comic text-2xl tracking-wide text-white flex items-center gap-2">
            <Layout className="w-6 h-6 text-purple-400" />
            COMIC PANEL BUILDER
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Organize panels, customize speech bubbles, add action stickers & tweak scene layout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onOpenAssistant && (
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-900/60 transition-all"
            >
              <Wand2 className="w-4 h-4 text-cyan-400" />
              <span>AI Script Doctor</span>
            </button>
          )}

          <button
            onClick={handleAddPanel}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-purple hover:scale-105 transition-all border border-white/20"
          >
            <Plus className="w-4 h-4" />
            Add Panel
          </button>
        </div>
      </div>

      {/* MAIN WORKSPACE SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: VISUAL COMIC PAGE PREVIEW & PANEL LIST */}
        <div className="lg:col-span-8 space-y-6">
          {/* COMIC PAGE CANVAS */}
          <div className="bg-[#0F1420] border border-purple-500/20 rounded-3xl p-6 shadow-glass-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-halftone-dots opacity-20 pointer-events-none"></div>

            <div className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest pb-3 mb-4 border-b border-purple-500/10 flex items-center justify-between">
              <span>PAGE OVERVIEW ({panels.length} PANELS)</span>
              <span className="text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> STUDIO CANVAS
              </span>
            </div>

            {/* PANELS GRID */}
            <div className="grid grid-cols-2 gap-4">
              {panels.map((panel, idx) => {
                const isSelected = panel.id === selectedPanelId;
                let colSpan = 'col-span-2';
                if (panel.layout === 'half-left' || panel.layout === 'half-right') colSpan = 'col-span-1';
                if (panel.layout === 'third') colSpan = 'col-span-1 md:col-span-1';

                return (
                  <div
                    key={panel.id}
                    onClick={() => setSelectedPanelId(panel.id)}
                    className={`${colSpan} relative rounded-2xl overflow-hidden border transition-all duration-300 ${
                      isSelected
                        ? 'border-purple-400 ring-2 ring-purple-500/50 shadow-glow-purple scale-[1.01]'
                        : 'border-slate-800 hover:border-purple-500/40'
                    } bg-gradient-to-br from-[#131A2B] via-[#0F1420] to-[#182238] p-4 min-h-[180px] cursor-pointer group/panel`}
                  >
                    {/* Panel Header Bar */}
                    <div className="flex items-center justify-between mb-3 z-20 relative">
                      <span className="bg-purple-950 text-cyan-300 font-comic text-xs px-2.5 py-0.5 rounded border border-purple-500/30">
                        PANEL #{panel.panelNumber}
                      </span>

                      {/* Action Stickers */}
                      {panel.actionSticker && (
                        <span className="comic-burst text-xs transform rotate-6">
                          {panel.actionSticker}
                        </span>
                      )}

                      {/* Panel Quick Tools */}
                      <div className="flex items-center gap-1 opacity-0 group-hover/panel:opacity-100 transition-opacity bg-[#0A0D14]/90 p-1 rounded-lg border border-slate-800">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMovePanel(idx, 'up');
                          }}
                          title="Move Up"
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMovePanel(idx, 'down');
                          }}
                          title="Move Down"
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicatePanel(panel);
                          }}
                          title="Duplicate Panel"
                          className="p-1 text-slate-400 hover:text-cyan-400"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePanel(panel.id);
                          }}
                          title="Delete Panel"
                          className="p-1 text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Caption Box */}
                    {panel.caption && (
                      <div className="relative z-10 max-w-[85%] bg-purple-950/90 border border-cyan-400/40 p-1.5 rounded-lg text-[10px] font-mono text-cyan-200 mb-3">
                        {panel.caption}
                      </div>
                    )}

                    {/* Visual Scene Description Prompt */}
                    <p className="text-xs text-slate-300 font-sans italic opacity-85 mb-4 leading-relaxed">
                      🎨 "{panel.description}"
                    </p>

                    {/* Speech Bubbles Stack */}
                    <div className="space-y-3 z-10 relative">
                      {panel.bubbles.map((b) => (
                        <SpeechBubbleComponent
                          key={b.id}
                          bubble={b}
                          onUpdateText={handleUpdateBubbleText}
                          onDelete={handleDeleteBubble}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: PANEL INSPECTOR & CONTROLS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-5 rounded-3xl space-y-5">
            {/* INSPECTOR HEADER */}
            <div className="border-b border-purple-500/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-comic text-xl text-white">
                  INSPECT PANEL #{selectedPanel?.panelNumber || 1}
                </h3>
                <span className="text-[10px] font-mono text-purple-400">
                  LAYOUT: {selectedPanel?.layout.toUpperCase()}
                </span>
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex bg-[#0A0D14] p-1 rounded-2xl border border-purple-500/10">
              {[
                { id: 'bubbles', label: 'Bubbles', icon: MessageSquare },
                { id: 'layout', label: 'Layout', icon: Layout },
                { id: 'stickers', label: 'Stickers', icon: Zap },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-glow-purple'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* BUBBLE CONTROLS */}
            {activeTab === 'bubbles' && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-300 block">
                  Add Speech Bubble Type:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'speech', label: 'Speech Bubble', color: 'bg-white text-black font-bold' },
                    { type: 'thought', label: 'Thought Cloud', color: 'bg-slate-200 text-black font-medium' },
                    { type: 'shout', label: 'Shout Burst', color: 'bg-amber-300 text-black font-black' },
                    { type: 'whisper', label: 'Whisper Frame', color: 'bg-slate-900 text-slate-200 border border-slate-700' },
                    { type: 'narration', label: 'Narration Box', color: 'bg-purple-950 text-cyan-200 border border-cyan-400/40' },
                  ].map((bType) => (
                    <button
                      key={bType.type}
                      onClick={() => handleAddBubble(bType.type as any)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border border-slate-800 hover:scale-[1.02] transition-transform text-left ${bType.color}`}
                    >
                      + {bType.label}
                    </button>
                  ))}
                </div>

                {/* Caption Text Input */}
                <div className="pt-3 border-t border-slate-800 space-y-1.5">
                  <label className="text-xs font-semibold text-cyan-400 block">
                    Caption Box Header:
                  </label>
                  <input
                    type="text"
                    value={selectedPanel?.caption || ''}
                    onChange={(e) => handleUpdateCaption(e.target.value)}
                    placeholder="e.g. MEANWHILE IN SECTOR 4..."
                    className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-200 focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>
            )}

            {/* LAYOUT CONTROLS */}
            {activeTab === 'layout' && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-300 block">
                  Select Panel Grid Layout:
                </label>
                <div className="space-y-2">
                  {layoutOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleUpdateLayout(opt.id)}
                      className={`w-full p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                        selectedPanel?.layout === opt.id
                          ? 'bg-purple-950/80 border-purple-500 text-purple-200 font-bold'
                          : 'bg-[#0A0D14] border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selectedPanel?.layout === opt.id && (
                        <span className="text-cyan-400 font-comic text-xs">SELECTED</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Scene Visual Description */}
                <div className="pt-3 border-t border-slate-800 space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Scene Art Prompt Description:
                  </label>
                  <textarea
                    value={selectedPanel?.description || ''}
                    onChange={(e) => handleUpdateDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-[#0A0D14] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500 resize-none font-sans"
                  />
                </div>
              </div>
            )}

            {/* STICKER CONTROLS */}
            {activeTab === 'stickers' && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-slate-300 block">
                  Add Action Sound Effect Sticker:
                </label>
                <div className="flex flex-wrap gap-2">
                  {actionStickers.map((sticker) => (
                    <button
                      key={sticker}
                      onClick={() => handleSelectSticker(sticker)}
                      className={`comic-burst text-xs cursor-pointer hover:scale-110 transition-transform ${
                        selectedPanel?.actionSticker === sticker ? 'ring-2 ring-cyan-400' : ''
                      }`}
                    >
                      {sticker}
                    </button>
                  ))}
                  <button
                    onClick={() => handleSelectSticker('')}
                    className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-400 hover:text-white"
                  >
                    Clear Sticker
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
