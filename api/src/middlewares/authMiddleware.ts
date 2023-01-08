import { ObjectID } from 'typeorm';
import { userRepository } from './../app/repositories/UserRepository';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../helpers/api-errors';
import jwt from 'jsonwebtoken';

type JwtPayload = {
  _id: ObjectID;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Não autorizado');
  }

  const token = authorization.split(' ')[1];

  const { _id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

  const user = await userRepository.findOneBy({ _id });

  if (!user) {
    throw new UnauthorizedError('Não autorizado');
  }

  const { password: _, ...loggedUser } = user;

  req.body.user = loggedUser;

  next();
};
