import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import { GeminiService } from '../services/geminiService.js';

const router = Router();

// Creative Writing Assistant Chat
router.post('/chat', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { message, context } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const reply = await GeminiService.assistImprove(message, context || 'Comic creation studio workspace.');
    res.json({
      success: true,
      reply,
      actionChips: [
        '✨ Add Plot Twist',
        '💬 Improve Dialogue',
        '🎭 Deepen Character',
        '⚡ Increase Action',
        '🌅 Enhance Setting'
      ]
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
