import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/User';
import { LogService } from '../services/logService';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      // Build a safe where clause: prefer username, otherwise use email
      const whereClause: any = {};
      if (username) whereClause.username = username;
      else if (email) whereClause.email = email;

      const user = await User.findOne({ where: whereClause });
      
      if (!user || !user.is_active) {
        res.status(401).json({ message: 'Username atau password salah' });
        return;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        res.status(401).json({ message: 'Username atau password salah' });
        return;
      }

      // ✅ Fix: kasih tipe eksplisit biar TypeScript nggak bingung
      const jwtSecret: string = process.env.JWT_SECRET || 'secret';
      const rawExpiresIn = process.env.JWT_EXPIRES_IN || '24h';

      const options: SignOptions = {
        expiresIn: rawExpiresIn as SignOptions['expiresIn'], // ✅ cast ke tipe yang benar
      };

      const payload = { id: user.id, username: user.username, role: user.role };
      const token = jwt.sign(payload, jwtSecret, options);

      await LogService.createLog(
        user.id,
        'LOGIN',
        'users',
        user.id,
        `User ${user.username} berhasil login`,
        req
      );

      res.json({
        success: true,
        message: 'Login berhasil',
        data: {
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            nama_lengkap: user.nama_lengkap,
            role: user.role,
          },
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      if (req.user) {
        await LogService.createLog(
          req.user.id,
          'LOGOUT',
          'users',
          req.user.id,
          `User ${req.user.username} logout`,
          req
        );
      }

      res.json({ success: true, message: 'Logout berhasil' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async me(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findByPk(req.user!.id, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        res.status(404).json({ success: false, message: 'User tidak ditemukan' });
        return;
      }

      // Response format compatible with frontend: {id, username, role}
      res.json({
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          nama_lengkap: user.nama_lengkap,
          role: user.role,
          is_active: user.is_active,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}