import axios from 'axios';
import { ComicProject, CharacterItem, SceneItem, ComicGenre, ComicStyle, ComicTone, StoryLength } from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject JWT token into headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('comiccraft_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthService = {
  login: async (email: string, password?: string) => {
    const res = await api.post('/auth/login', { email, password: password || 'demo' });
    return res.data;
  },
  register: async (name: string, email: string, password?: string) => {
    const res = await api.post('/auth/register', { name, email, password: password || 'demo' });
    return res.data;
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },
};

export const StoryService = {
  generateStory: async (params: {
    idea: string;
    genre: ComicGenre;
    tone: ComicTone;
    style: ComicStyle;
    length: StoryLength;
  }) => {
    const res = await api.post('/story/generate', params);
    return res.data;
  },
  improveStory: async (command: string, text: string) => {
    const res = await api.post('/story/improve', { command, text });
    return res.data;
  },
};

export const CharacterService = {
  generateCharacter: async (prompt: string, role?: string, genre?: string) => {
    const res = await api.post('/character/generate', { prompt, role, genre });
    return res.data;
  },
  getCharacters: async () => {
    const res = await api.get('/character');
    return res.data;
  },
  saveCharacter: async (character: CharacterItem) => {
    const res = await api.post('/character', character);
    return res.data;
  },
};

export const SceneService = {
  generateScene: async (topic: string, characters: string[]) => {
    const res = await api.post('/scene/generate', { topic, characters });
    return res.data;
  },
};

export const AIService = {
  chat: async (message: string, context?: string) => {
    const res = await api.post('/ai/chat', { message, context });
    return res.data;
  },
};

export const ComicsService = {
  getComics: async () => {
    const res = await api.get('/comics');
    return res.data;
  },
  getComicById: async (id: string) => {
    const res = await api.get(`/comics/${id}`);
    return res.data;
  },
  createComic: async (comic: Partial<ComicProject>) => {
    const res = await api.post('/comics', comic);
    return res.data;
  },
  updateComic: async (id: string, updates: Partial<ComicProject>) => {
    const res = await api.put(`/comics/${id}`, updates);
    return res.data;
  },
  deleteComic: async (id: string) => {
    const res = await api.delete(`/comics/${id}`);
    return res.data;
  },
};

export default api;
