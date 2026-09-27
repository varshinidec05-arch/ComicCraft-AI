export type ComicGenre = 'Adventure' | 'Fantasy' | 'Sci-Fi' | 'Mystery' | 'Comedy' | 'Superhero' | 'Horror' | 'Romance' | 'Slice of Life';

export type ComicTone = 'Funny' | 'Dark' | 'Emotional' | 'Inspirational' | 'Mysterious' | 'Epic';

export type ComicStyle = 'Manga' | 'Western Comic' | 'Cartoon' | 'Graphic Novel' | 'Minimal' | 'Superhero';

export type StoryLength = 'Short' | 'Medium' | 'Long';

export interface SpeechBubble {
  id: string;
  type: 'speech' | 'thought' | 'shout' | 'whisper' | 'narration';
  text: string;
  character: string;
  x: number; // percentage offset
  y: number; // percentage offset
  width?: number;
}

export interface ComicPanel {
  id: string;
  panelNumber: number;
  layout: 'full' | 'half-left' | 'half-right' | 'third' | 'hero-wide' | 'split-top' | 'split-bottom';
  description: string;
  imagePrompt?: string;
  bgColor?: string;
  bubbles: SpeechBubble[];
  caption?: string;
  actionSticker?: string;
  visualDetails?: string;
}

export interface CharacterItem {
  id?: string;
  name: string;
  role: string;
  personality: string;
  appearance: string;
  background: string;
  importance?: string;
  age?: string;
  specialAbilities?: string;
}

export interface SceneItem {
  id?: string;
  title: string;
  location: string;
  time: string;
  characters: string[];
  description: string;
  dialogue: Array<{
    character: string;
    text: string;
    emotion?: string;
  }>;
  actions: string[];
}

export interface ComicProject {
  id: string;
  userId: string;
  title: string;
  tagline?: string;
  genre: ComicGenre;
  style: ComicStyle;
  tone?: ComicTone;
  summary: string;
  coverColor?: string;
  coverImage?: string;
  characters: CharacterItem[];
  scenes: SceneItem[];
  panels: ComicPanel[];
  ending?: string;
  status: 'Draft' | 'Completed' | 'Published';
  pagesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ComicTemplate {
  id: string;
  name: string;
  genre: ComicGenre;
  style: ComicStyle;
  description: string;
  bgGradient: string;
  panelsCount: number;
  iconName: string;
}
