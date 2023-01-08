import { AppDataSource } from './../../data-source';
import { userRepository } from './../repositories/UserRepository';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export class AuthController {
  async login(req: Request, res: Response) {
    return res.status(201).json({ message: 'bateu' });
  }

  async create(req: Request, res: Response) {
    const { username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    // const { password: _, ...user } = newUser;

    return res.status(201).json({ username, password: hashPassword });
  }
}
