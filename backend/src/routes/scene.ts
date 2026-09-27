import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import { GeminiService } from '../services/geminiService.js';

const router = Router();

// Generate Scene with AI
router.post('/generate', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { topic, characters } = req.body;
    if (!topic) return res.status(400).json({ error: 'Scene topic required' });

    const scene = await GeminiService.generateScene({
      topic,
      characters: characters || ['Hero', 'Ally']
    });

    res.json({ success: true, scene });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Scene generation failed' });
  }
});

export default router;
