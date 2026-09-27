"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        // For seamless demo access, if no token provided, set default demo user
        req.user = { id: 'demo-user-1', email: 'creator@comiccraft.ai' };
        return next();
    }
    const secret = process.env.JWT_SECRET || 'comiccraft_super_secret_jwt_key_2026';
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (err) {
        // If token invalid, still fall back to demo user so studio is fully accessible
        req.user = { id: 'demo-user-1', email: 'creator@comiccraft.ai' };
        next();
    }
};
exports.authenticateToken = authenticateToken;
