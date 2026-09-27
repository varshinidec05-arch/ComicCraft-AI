"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_js_1 = require("../middleware/auth.js");
const geminiService_js_1 = require("../services/geminiService.js");
const router = (0, express_1.Router)();
// Generate Scene with AI
router.post('/generate', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const { topic, characters } = req.body;
        if (!topic)
            return res.status(400).json({ error: 'Scene topic required' });
        const scene = await geminiService_js_1.GeminiService.generateScene({
            topic,
            characters: characters || ['Hero', 'Ally']
        });
        res.json({ success: true, scene });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Scene generation failed' });
    }
});
exports.default = router;
