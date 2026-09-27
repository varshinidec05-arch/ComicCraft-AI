import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import { GeminiService } from '../services/geminiService.js';

const router = Router();

// Generate / Improve Dialogue
router.post('/generate', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { context, characters } = req.body;
    const result = await GeminiService.assistImprove('Write punchy comic dialogue for characters: ' + (characters || []).join(', '), context || 'Action scene');
    res.json({ success: true, dialogueText: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/improve', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { dialogue, emotion } = req.body;
    const result = await GeminiService.assistImprove(`Make dialogue reflect emotion: ${emotion || 'Dramatic'}`, dialogue || '');
    res.json({ success: true, improvedDialogue: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
