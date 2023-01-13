import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UnauthorizedError } from './../helpers/api-errors';
import { User } from '../models/User';

export class AuthController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
      throw new UnauthorizedError('E-mail ou senha inválidos');
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new UnauthorizedError('E-mail ou senha inválidos');
    }

    const resUser = { _id: user._id, username: user.username };

    const token = jwt.sign(resUser, process.env.JWT_SECRET || 'MUDAR_SECRET', {
      expiresIn: '1d',
    });

    return res.status(200).json({ user: resUser, token });
  }

  async create(req: Request, res: Response) {
    const { username, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username, password: hashPassword });

    return res.status(201).json({ username });
  }
}
