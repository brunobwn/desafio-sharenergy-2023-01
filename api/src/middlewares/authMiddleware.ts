import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../helpers/api-errors';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

type JwtPayload = {
  _id: string;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Não autorizado');
  }

  const token = authorization.split(' ')[1];

  const { _id } = jwt.verify(token, process.env.JWT_SECRET || 'MUDAR_SECRET') as JwtPayload;

  const user = await User.findOne({ _id });

  if (!user) {
    throw new UnauthorizedError('Não autorizado');
  }

  const { password: _, ...loggedUser } = user;

  req.body.user = loggedUser;

  next();
};
