"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = require("./config/db.js");
const auth_js_1 = __importDefault(require("./routes/auth.js"));
const story_js_1 = __importDefault(require("./routes/story.js"));
const character_js_1 = __importDefault(require("./routes/character.js"));
const scene_js_1 = __importDefault(require("./routes/scene.js"));
const dialogue_js_1 = __importDefault(require("./routes/dialogue.js"));
const ai_js_1 = __importDefault(require("./routes/ai.js"));
const comics_js_1 = __importDefault(require("./routes/comics.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_js_1.default);
app.use('/api/story', story_js_1.default);
app.use('/api/character', character_js_1.default);
app.use('/api/scene', scene_js_1.default);
app.use('/api/dialogue', dialogue_js_1.default);
app.use('/api/ai', ai_js_1.default);
app.use('/api/comics', comics_js_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        app: 'ComicCraft API Studio',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});
// Connect DB & Start Server
(0, db_js_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 [ComicCraft Backend] Server running on http://localhost:${PORT}`);
    });
});
