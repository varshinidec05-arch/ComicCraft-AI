"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_js_1 = require("../middleware/auth.js");
const geminiService_js_1 = require("../services/geminiService.js");
const Character_js_1 = __importDefault(require("../models/Character.js"));
const store_js_1 = require("../data/store.js");
const router = (0, express_1.Router)();
// Generate character with AI
router.post('/generate', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const { prompt, role, genre } = req.body;
        if (!prompt)
            return res.status(400).json({ error: 'Character prompt required' });
        const charData = await geminiService_js_1.GeminiService.generateCharacter({ prompt, role, genre });
        res.json({ success: true, character: charData });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Character generation failed' });
    }
});
// Get all characters for user
router.get('/', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.id || 'demo-user-1';
        let characters = [];
        if (mongoose_1.default.connection.readyState === 1) {
            try {
                characters = await Character_js_1.default.find({ userId });
            }
            catch (e) {
                characters = store_js_1.LocalStore.characters.filter(c => c.userId === userId || c.userId === 'demo-user-1');
            }
        }
        else {
            characters = store_js_1.LocalStore.characters.filter(c => c.userId === userId || c.userId === 'demo-user-1');
        }
        res.json({ characters });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Save new character
router.post('/', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.id || 'demo-user-1';
        const { name, role, personality, appearance, background, importance } = req.body;
        let created;
        if (mongoose_1.default.connection.readyState === 1) {
            try {
                created = await Character_js_1.default.create({
                    userId,
                    name,
                    role,
                    personality,
                    appearance,
                    background,
                    importance
                });
            }
            catch (e) {
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
                store_js_1.LocalStore.characters.push(created);
            }
        }
        else {
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
            store_js_1.LocalStore.characters.push(created);
        }
        res.json({ success: true, character: created });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
