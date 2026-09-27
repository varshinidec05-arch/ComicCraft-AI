import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ComicProject, CharacterItem, SceneItem, ComicTemplate } from './types';
import { ComicsService, CharacterService } from './services/api';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { CreateComicWizard } from './components/CreateComicWizard';
import { ComicPanelEditor } from './components/ComicPanelEditor';
import { CharacterStudio } from './components/CharacterStudio';
import { SceneStudio } from './components/SceneStudio';
import { TemplatesPage } from './components/TemplatesPage';
import { MyComicsPage } from './components/MyComicsPage';
import { ProfilePage } from './components/ProfilePage';
import { ComicReaderModal } from './components/ComicReaderModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { AuthModal } from './components/AuthModal';

import {
  Sparkles,
  Zap,
  PlusCircle,
  BookOpen,
  UserCheck,
  Film,
  Bot,
  Layout,
  Play,
  ArrowRight,
  Clock,
  Layers,
  Wand2,
} from 'lucide-react';

const DashboardContent: React.FC<{
  comics: ComicProject[];
  onStartCreate: () => void;
  onOpenReader: (comic: ComicProject) => void;
  onOpenView: (view: string) => void;
}> = ({ comics, onStartCreate, onOpenReader, onOpenView }) => {
  const { user } = useAuth();
  const activeName = user?.name || 'Alex Mercer';

  return (
    <div className="space-y-8">
      {/* WELCOME BANNER */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-4 border border-purple-500/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-halftone-dots opacity-15 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>COMICCRAFT AI CREATIVE STUDIO WORKSPACE</span>
          </div>

          <h1 className="font-comic text-4xl sm:text-5xl text-white tracking-wide">
            Welcome back, {activeName} 👋
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-sans">
            Ready to create your next story? Turn your simple idea into AI-generated characters, scenes, and full comic panels.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartCreate}
              className="px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white shadow-glow-purple hover:shadow-glow-cyan hover:scale-105 transition-all flex items-center gap-2 border border-white/20"
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>+ Create New Comic →</span>
            </button>

            <button
              onClick={() => onOpenView('characters')}
              className="px-5 py-3.5 rounded-2xl font-semibold text-xs text-slate-200 bg-[#0F1420] border border-slate-800 hover:border-purple-500/40 hover:text-white transition-all flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-purple-400" />
              <span>Character Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Projects', val: comics.length, icon: BookOpen, color: 'text-purple-400' },
          { label: 'Total Pages Built', val: comics.reduce((acc, c) => acc + (c.pagesCount || 1), 0), icon: Layers, color: 'text-cyan-400' },
          { label: 'AI Characters', val: comics.reduce((acc, c) => acc + (c.characters || []).length, 0), icon: UserCheck, color: 'text-purple-300' },
          { label: 'Gemini Engine', val: 'Online', icon: Sparkles, color: 'text-emerald-400' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-panel glass-panel-hover rounded-2xl p-4 flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-[#0A0D14] border border-purple-500/20 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="font-comic text-2xl text-white block">{stat.val}</span>
              <span className="text-[11px] font-medium text-slate-400">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT COMICS GALLERY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-comic text-2xl text-white tracking-wide flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            RECENT COMIC PROJECTS
          </h2>
          <button
            onClick={() => onOpenView('my-comics')}
            className="text-xs font-semibold text-purple-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Comics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comics.slice(0, 3).map((comic) => (
            <div
              key={comic.id}
              className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-purple-950 border border-purple-500/30 text-cyan-300 font-comic text-xs px-2.5 py-0.5 rounded">
                    {comic.genre.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(comic.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-comic text-2xl text-white tracking-wide group-hover:text-purple-300 transition-colors mb-2">
                  {comic.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans mb-4">
                  {comic.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-purple-500/10 flex items-center justify-between">
                <button
                  onClick={() => onOpenReader(comic)}
                  className="px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Open Reader
                </button>
                <span className="text-[10px] font-mono text-purple-300">
                  {comic.panels.length} PANELS
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AppMain: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [comics, setComics] = useState<ComicProject[]>([]);
  const [characters, setCharacters] = useState<CharacterItem[]>([]);
  const [activeComicForReader, setActiveComicForReader] = useState<ComicProject | null>(null);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Initial Data Fetching
  useEffect(() => {
    const loadData = async () => {
      try {
        const comicRes = await ComicsService.getComics();
        if (comicRes.comics && comicRes.comics.length > 0) {
          setComics(comicRes.comics);
        }
        const charRes = await CharacterService.getCharacters();
        if (charRes.characters && charRes.characters.length > 0) {
          setCharacters(charRes.characters);
        }
      } catch (e) {
        console.warn('Backend connection fallback for local store data.');
      }
    };
    loadData();
  }, []);

  // Update comic list state
  const handleSaveComic = (comic: ComicProject) => {
    setComics((prev) => {
      const idx = prev.findIndex((c) => c.id === comic.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = comic;
        return updated;
      }
      return [comic, ...prev];
    });
  };

  const handleDeleteComic = async (id: string) => {
    setComics((prev) => prev.filter((c) => c.id !== id));
    try {
      await ComicsService.deleteComic(id);
    } catch (e) {}
  };

  const handleDuplicateComic = (comic: ComicProject) => {
    const dup: ComicProject = {
      ...comic,
      id: `comic-${Date.now()}`,
      title: `${comic.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setComics([dup, ...comics]);
  };

  const handleSaveCharacter = (char: CharacterItem) => {
    setCharacters((prev) => [char, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col font-sans">
      {/* NAVBAR FOR LANDING PAGE */}
      {currentView === 'landing' && (
        <Navbar
          onStartCreating={() => setCurrentView('create-comic')}
          onOpenAuth={() => setIsAuthOpen(true)}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
      )}

      {/* MAIN LAYOUT WRAPPER */}
      {currentView === 'landing' ? (
        <LandingPage
          onStartCreating={() => setCurrentView('create-comic')}
          onExploreClick={() => setCurrentView('dashboard')}
          onOpenPreview={() => {
            if (comics[0]) setActiveComicForReader(comics[0]);
            else setCurrentView('create-comic');
          }}
        />
      ) : (
        <div className="flex flex-1 min-h-screen">
          {/* SIDEBAR FOR STUDIO VIEWS */}
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onLogout={() => setCurrentView('landing')}
          />

          {/* MAIN WORKSPACE CONTENT AREA */}
          <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto overflow-y-auto">
            {currentView === 'dashboard' && (
              <DashboardContent
                comics={comics}
                onStartCreate={() => setCurrentView('create-comic')}
                onOpenReader={(c) => setActiveComicForReader(c)}
                onOpenView={(v) => setCurrentView(v)}
              />
            )}

            {currentView === 'create-comic' && (
              <CreateComicWizard
                onStoryCreated={handleSaveComic}
                onOpenReader={(c) => setActiveComicForReader(c)}
                onOpenAssistant={() => setIsAssistantOpen(true)}
              />
            )}

            {currentView === 'my-comics' && (
              <MyComicsPage
                comics={comics}
                onOpenComic={(c) => setActiveComicForReader(c)}
                onEditComic={(c) => setCurrentView('create-comic')}
                onDuplicateComic={handleDuplicateComic}
                onDeleteComic={handleDeleteComic}
                onCreateNew={() => setCurrentView('create-comic')}
              />
            )}

            {currentView === 'characters' && (
              <CharacterStudio
                characters={characters}
                onSaveCharacter={handleSaveCharacter}
              />
            )}

            {currentView === 'scenes' && (
              <SceneStudio
                scenes={comics[0]?.scenes || []}
                availableCharacters={characters.map((c) => c.name)}
                onSaveScene={(sc) => console.log('Saved scene', sc)}
                onDeleteScene={(id) => console.log('Deleted scene', id)}
              />
            )}

            {currentView === 'ai-assistant' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-3">
                  <h2 className="font-comic text-3xl text-white flex items-center gap-3">
                    <Bot className="w-8 h-8 text-cyan-400" />
                    COMICCRAFT AI CREATIVE SCRIPT DOCTOR
                  </h2>
                  <p className="text-xs text-slate-300">
                    Use AI assistant to rewrite dialogue, add plot twists, or deepen character arcs.
                  </p>
                  <button
                    onClick={() => setIsAssistantOpen(true)}
                    className="mt-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-glow-purple"
                  >
                    Launch Assistant Drawer
                  </button>
                </div>
              </div>
            )}

            {currentView === 'templates' && (
              <TemplatesPage
                onSelectTemplate={(tpl) => {
                  setCurrentView('create-comic');
                }}
              />
            )}

            {currentView === 'profile' && (
              <ProfilePage
                totalComicsCount={comics.length}
                charactersCount={characters.length}
              />
            )}
          </main>
        </div>
      )}

      {/* FULLSCREEN COMIC READER MODAL */}
      {activeComicForReader && (
        <ComicReaderModal
          comic={activeComicForReader}
          onClose={() => setActiveComicForReader(null)}
        />
      )}

      {/* AI SCRIPT DOCTOR ASSISTANT DRAWER */}
      <AIAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      {/* AUTHENTICATION MODAL */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppMain />
    </AuthProvider>
  );
}
