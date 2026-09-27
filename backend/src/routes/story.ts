import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import { GeminiService } from '../services/geminiService.js';

const router = Router();

// Generate complete comic story
router.post('/generate', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { idea, genre, tone, style, length } = req.body;
    if (!idea) {
      return res.status(400).json({ error: 'Please provide a story idea.' });
    }

    const generatedStory = await GeminiService.generateStory({
      idea,
      genre: genre || 'Sci-Fi',
      tone: tone || 'Mysterious',
      style: style || 'Manga',
      length: length || 'Medium'
    });

    res.json({
      success: true,
      story: generatedStory
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate story' });
  }
});

// Improve story script
router.post('/improve', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { command, text } = req.body;
    if (!command || !text) {
      return res.status(400).json({ error: 'Command and text are required.' });
    }

    const improved = await GeminiService.assistImprove(command, text);
    res.json({ success: true, text: improved });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to improve story script' });
  }
});

export default router;
