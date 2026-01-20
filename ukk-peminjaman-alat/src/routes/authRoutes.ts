import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validation';
import { loginSchema } from '../validators/userValidator';

const router = Router();

// Login endpoint - POST /api/auth/login
router.post('/login', validate(loginSchema), AuthController.login);

// Logout endpoint - POST /api/auth/logout
router.post('/logout', authenticate, AuthController.logout);

// Get current user - GET /api/auth/me
router.get('/me', authenticate, AuthController.me);

// Alias: GET /api/auth/user - for frontend compatibility
router.get('/user', authenticate, AuthController.me);

export default router;
