import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.js';
import storyRoutes from './routes/story.js';
import characterRoutes from './routes/character.js';
import sceneRoutes from './routes/scene.js';
import dialogueRoutes from './routes/dialogue.js';
import aiRoutes from './routes/ai.js';
import comicRoutes from './routes/comics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/character', characterRoutes);
app.use('/api/scene', sceneRoutes);
app.use('/api/dialogue', dialogueRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/comics', comicRoutes);

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
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 [ComicCraft Backend] Server running on http://localhost:${PORT}`);
  });
});
