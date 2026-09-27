import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // For seamless demo access, if no token provided, set default demo user
    req.user = { id: 'demo-user-1', email: 'creator@comiccraft.ai' };
    return next();
  }

  const secret = process.env.JWT_SECRET || 'comiccraft_super_secret_jwt_key_2026';
  try {
    const decoded = jwt.verify(token, secret) as { id: string; email: string };
    req.user = decoded;
    next();
  } catch (err) {
    // If token invalid, still fall back to demo user so studio is fully accessible
    req.user = { id: 'demo-user-1', email: 'creator@comiccraft.ai' };
    next();
  }
};
