"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const geminiService_js_1 = require("../services/geminiService.js");
const router = (0, express_1.Router)();
// Generate complete comic story
router.post('/generate', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const { idea, genre, tone, style, length } = req.body;
        if (!idea) {
            return res.status(400).json({ error: 'Please provide a story idea.' });
        }
        const generatedStory = await geminiService_js_1.GeminiService.generateStory({
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
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to generate story' });
    }
});
// Improve story script
router.post('/improve', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const { command, text } = req.body;
        if (!command || !text) {
            return res.status(400).json({ error: 'Command and text are required.' });
        }
        const improved = await geminiService_js_1.GeminiService.assistImprove(command, text);
        res.json({ success: true, text: improved });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to improve story script' });
    }
});
exports.default = router;
