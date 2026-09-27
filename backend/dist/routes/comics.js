"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_js_1 = require("../middleware/auth.js");
const Comic_js_1 = __importDefault(require("../models/Comic.js"));
const store_js_1 = require("../data/store.js");
const router = (0, express_1.Router)();
// GET all comics for current user
router.get('/', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.id || 'demo-user-1';
        let comics = [];
        if (mongoose_1.default.connection.readyState === 1) {
            try {
                comics = await Comic_js_1.default.find({ userId }).sort({ updatedAt: -1 });
            }
            catch (e) {
                comics = store_js_1.LocalStore.comics.filter(c => c.userId === userId || c.userId === 'demo-user-1');
            }
        }
        else {
            comics = store_js_1.LocalStore.comics.filter(c => c.userId === userId || c.userId === 'demo-user-1');
        }
        res.json({ comics });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET comic by ID
router.get('/:id', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        let comic = null;
        if (mongoose_1.default.connection.readyState === 1) {
            try {
                comic = await Comic_js_1.default.findById(id);
            }
            catch (e) {
                comic = store_js_1.LocalStore.comics.find(c => c.id === id);
            }
        }
        else {
            comic = store_js_1.LocalStore.comics.find(c => c.id === id);
        }
        if (!comic) {
            comic = store_js_1.LocalStore.comics.find(c => c.id === id) || store_js_1.LocalStore.comics[0];
        }
        res.json({ comic });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// POST create new comic project
router.post('/', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.id || 'demo-user-1';
        const { title, tagline, genre, style, tone, summary, characters, scenes, panels, ending, status } = req.body;
        let newComic;
        if (mongoose_1.default.connection.readyState === 1) {
            try {
                newComic = await Comic_js_1.default.create({
                    userId,
                    title: title || 'Untitled Comic',
                    tagline: tagline || '',
                    genre: genre || 'Sci-Fi',
                    style: style || 'Manga',
                    tone: tone || 'Mysterious',
                    summary: summary || '',
                    characters: characters || [],
                    scenes: scenes || [],
                    panels: panels || [],
                    ending: ending || '',
                    status: status || 'Draft',
                    pagesCount: Math.ceil((panels || []).length / 4) || 1
                });
            }
            catch (e) {
                newComic = {
                    id: `comic-${Date.now()}`,
                    userId,
                    title: title || 'Untitled Comic',
                    tagline: tagline || '',
                    genre: genre || 'Sci-Fi',
                    style: style || 'Manga',
                    tone: tone || 'Mysterious',
                    summary: summary || '',
                    coverColor: 'from-purple-900 via-indigo-900 to-slate-950',
                    characters: characters || [],
                    scenes: scenes || [],
                    panels: panels || [],
                    ending: ending || '',
                    status: status || 'Draft',
                    pagesCount: Math.ceil((panels || []).length / 4) || 1,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                store_js_1.LocalStore.comics.unshift(newComic);
            }
        }
        else {
            newComic = {
                id: `comic-${Date.now()}`,
                userId,
                title: title || 'Untitled Comic',
                tagline: tagline || '',
                genre: genre || 'Sci-Fi',
                style: style || 'Manga',
                tone: tone || 'Mysterious',
                summary: summary || '',
                coverColor: 'from-purple-900 via-indigo-900 to-slate-950',
                characters: characters || [],
                scenes: scenes || [],
                panels: panels || [],
                ending: ending || '',
                status: status || 'Draft',
                pagesCount: Math.ceil((panels || []).length / 4) || 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            store_js_1.LocalStore.comics.unshift(newComic);
        }
        res.json({ success: true, comic: newComic });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// PUT update comic
router.put('/:id', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        let updatedComic;
        if (mongoose_1.default.connection.readyState === 1) {
            try {
                updatedComic = await Comic_js_1.default.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true });
            }
            catch (e) {
                const idx = store_js_1.LocalStore.comics.findIndex(c => c.id === id);
                if (idx !== -1) {
                    store_js_1.LocalStore.comics[idx] = {
                        ...store_js_1.LocalStore.comics[idx],
                        ...updates,
                        updatedAt: new Date().toISOString()
                    };
                    updatedComic = store_js_1.LocalStore.comics[idx];
                }
            }
        }
        else {
            const idx = store_js_1.LocalStore.comics.findIndex(c => c.id === id);
            if (idx !== -1) {
                store_js_1.LocalStore.comics[idx] = {
                    ...store_js_1.LocalStore.comics[idx],
                    ...updates,
                    updatedAt: new Date().toISOString()
                };
                updatedComic = store_js_1.LocalStore.comics[idx];
            }
        }
        if (!updatedComic) {
            const idx = store_js_1.LocalStore.comics.findIndex(c => c.id === id);
            if (idx !== -1) {
                store_js_1.LocalStore.comics[idx] = { ...store_js_1.LocalStore.comics[idx], ...updates, updatedAt: new Date().toISOString() };
                updatedComic = store_js_1.LocalStore.comics[idx];
            }
        }
        res.json({ success: true, comic: updatedComic });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// DELETE comic
router.delete('/:id', auth_js_1.authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        if (mongoose_1.default.connection.readyState === 1) {
            try {
                await Comic_js_1.default.findByIdAndDelete(id);
            }
            catch (e) {
                store_js_1.LocalStore.comics = store_js_1.LocalStore.comics.filter(c => c.id !== id);
            }
        }
        store_js_1.LocalStore.comics = store_js_1.LocalStore.comics.filter(c => c.id !== id);
        res.json({ success: true, message: 'Comic deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
