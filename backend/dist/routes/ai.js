"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const geminiService_js_1 = require("../services/geminiService.js");
const router = (0, express_1.Router)();
// Creative Writing Assistant Chat
router.post('/chat', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const { message, context } = req.body;
        if (!message)
            return res.status(400).json({ error: 'Message required' });
        const reply = await geminiService_js_1.GeminiService.assistImprove(message, context || 'Comic creation studio workspace.');
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
