"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const geminiService_js_1 = require("../services/geminiService.js");
const router = (0, express_1.Router)();
// Generate / Improve Dialogue
router.post('/generate', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const { context, characters } = req.body;
        const result = await geminiService_js_1.GeminiService.assistImprove('Write punchy comic dialogue for characters: ' + (characters || []).join(', '), context || 'Action scene');
        res.json({ success: true, dialogueText: result });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/improve', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const { dialogue, emotion } = req.body;
        const result = await geminiService_js_1.GeminiService.assistImprove(`Make dialogue reflect emotion: ${emotion || 'Dramatic'}`, dialogue || '');
        res.json({ success: true, improvedDialogue: result });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
