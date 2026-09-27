import { Router, Response } from 'express';
import mongoose from 'mongoose';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import { GeminiService } from '../services/geminiService.js';
import Character from '../models/Character.js';
import { LocalStore } from '../data/store.js';

const router = Router();

// Generate character with AI
router.post('/generate', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { prompt, role, genre } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Character prompt required' });

    const charData = await GeminiService.generateCharacter({ prompt, role, genre });
    res.json({ success: true, character: charData });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Character generation failed' });
  }
});

// Get all characters for user
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user-1';
    let characters: any[] = [];
    if (mongoose.connection.readyState === 1) {
      try {
        characters = await Character.find({ userId });
      } catch (e) {
        characters = LocalStore.characters.filter(c => c.userId === userId || c.userId === 'demo-user-1');
      }
    } else {
      characters = LocalStore.characters.filter(c => c.userId === userId || c.userId === 'demo-user-1');
    }
    res.json({ characters });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Save new character
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'demo-user-1';
    const { name, role, personality, appearance, background, importance } = req.body;

    let created;
    if (mongoose.connection.readyState === 1) {
      try {
        created = await Character.create({
          userId,
          name,
          role,
          personality,
          appearance,
          background,
          importance
        });
      } catch (e) {
        created = {
          id: `char-${Date.now()}`,
          userId,
          name,
          role,
          personality,
          appearance,
          background,
          importance: importance || 'Supporting',
          createdAt: new Date().toISOString()
        };
        LocalStore.characters.push(created as any);
      }
    } else {
      created = {
        id: `char-${Date.now()}`,
        userId,
        name,
        role,
        personality,
        appearance,
        background,
        importance: importance || 'Supporting',
        createdAt: new Date().toISOString()
      };
      LocalStore.characters.push(created as any);
    }
    res.json({ success: true, character: created });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
