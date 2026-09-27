import { Router, Response } from 'express';
import mongoose from 'mongoose';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import Comic from '../models/Comic.js';
import { LocalStore } from '../data/store.js';

const router = Router();

// GET all comics for current user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user-1';
    let comics: any[] = [];
    if (mongoose.connection.readyState === 1) {
      try {
        comics = await Comic.find({ userId }).sort({ updatedAt: -1 });
      } catch (e) {
        comics = LocalStore.comics.filter(c => c.userId === userId || c.userId === 'demo-user-1');
      }
    } else {
      comics = LocalStore.comics.filter(c => c.userId === userId || c.userId === 'demo-user-1');
    }
    res.json({ comics });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET comic by ID
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;
    let comic: any = null;
    if (mongoose.connection.readyState === 1) {
      try {
        comic = await Comic.findById(id);
      } catch (e) {
        comic = LocalStore.comics.find(c => c.id === id);
      }
    } else {
      comic = LocalStore.comics.find(c => c.id === id);
    }

    if (!comic) {
      comic = LocalStore.comics.find(c => c.id === id) || LocalStore.comics[0];
    }

    res.json({ comic });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new comic project
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user-1';
    const { title, tagline, genre, style, tone, summary, characters, scenes, panels, ending, status } = req.body;

    let newComic: any;
    if (mongoose.connection.readyState === 1) {
      try {
        newComic = await Comic.create({
          userId,
          title: title || 'Untitled Comic',
          tagline: tagline || '',
          genre: genre || 'Sci-Fi',
          style: style || 'Manga',
          tone: tone || 'Mysterious',
          summary: summary || '',
          characters: characters || [],
          scenes: scenes || [],
          panels: panels || [],
          ending: ending || '',
          status: status || 'Draft',
          pagesCount: Math.ceil((panels || []).length / 4) || 1
        });
      } catch (e) {
        newComic = {
          id: `comic-${Date.now()}`,
          userId,
          title: title || 'Untitled Comic',
          tagline: tagline || '',
          genre: genre || 'Sci-Fi',
          style: style || 'Manga',
          tone: tone || 'Mysterious',
          summary: summary || '',
          coverColor: 'from-purple-900 via-indigo-900 to-slate-950',
          characters: characters || [],
          scenes: scenes || [],
          panels: panels || [],
          ending: ending || '',
          status: status || 'Draft',
          pagesCount: Math.ceil((panels || []).length / 4) || 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        LocalStore.comics.unshift(newComic);
      }
    } else {
      newComic = {
        id: `comic-${Date.now()}`,
        userId,
        title: title || 'Untitled Comic',
        tagline: tagline || '',
        genre: genre || 'Sci-Fi',
        style: style || 'Manga',
        tone: tone || 'Mysterious',
        summary: summary || '',
        coverColor: 'from-purple-900 via-indigo-900 to-slate-950',
        characters: characters || [],
        scenes: scenes || [],
        panels: panels || [],
        ending: ending || '',
        status: status || 'Draft',
        pagesCount: Math.ceil((panels || []).length / 4) || 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      LocalStore.comics.unshift(newComic);
    }

    res.json({ success: true, comic: newComic });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update comic
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    let updatedComic: any;
    if (mongoose.connection.readyState === 1) {
      try {
        updatedComic = await Comic.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true });
      } catch (e) {
        const idx = LocalStore.comics.findIndex(c => c.id === id);
        if (idx !== -1) {
          LocalStore.comics[idx] = {
            ...LocalStore.comics[idx],
            ...updates,
            updatedAt: new Date().toISOString()
          };
          updatedComic = LocalStore.comics[idx];
        }
      }
    } else {
      const idx = LocalStore.comics.findIndex(c => c.id === id);
      if (idx !== -1) {
        LocalStore.comics[idx] = {
          ...LocalStore.comics[idx],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        updatedComic = LocalStore.comics[idx];
      }
    }

    if (!updatedComic) {
      const idx = LocalStore.comics.findIndex(c => c.id === id);
      if (idx !== -1) {
        LocalStore.comics[idx] = { ...LocalStore.comics[idx], ...updates, updatedAt: new Date().toISOString() };
        updatedComic = LocalStore.comics[idx];
      }
    }

    res.json({ success: true, comic: updatedComic });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE comic
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id;
    if (mongoose.connection.readyState === 1) {
      try {
        await Comic.findByIdAndDelete(id);
      } catch (e) {
        LocalStore.comics = LocalStore.comics.filter(c => c.id !== id);
      }
    }
    LocalStore.comics = LocalStore.comics.filter(c => c.id !== id);
    res.json({ success: true, message: 'Comic deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
