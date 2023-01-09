import { Client } from './../models/Client';
import { BadRequestError, ConflictError } from './../helpers/api-errors';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { looksLikeMail } from '../util/util';

export class ClientController {
  async getAll(req: Request, res: Response) {
    const clients = await Client.find();
    return res.status(200).json(clients);
  }

  async getOne(req: Request, res: Response) {
    return res.status(200).json({ bateu: 'voltou' });
  }

  async create(req: Request, res: Response) {
    const { nome, email, telefone, endereco, cpf } = req.body;

    if (nome.length < 3) {
      throw new BadRequestError('O campo Nome precisa ter no mínimo 3 letras');
    }

    if (!looksLikeMail(email)) {
      throw new BadRequestError('Campo E-mail inválido');
    }

    const existClient = await Client.findOne({ email });
    if (existClient) {
      throw new ConflictError('Já existe um cliente cadastrado neste e-mail!');
    }

    if (!telefone) throw new BadRequestError('O campo telefone é obrigatório');
    if (!endereco) throw new BadRequestError('O campo endereço é obrigatório');
    if (!cpf) throw new BadRequestError('O campo telefone é obrigatório');

    const newClient = await Client.create({ nome, email, telefone, endereco, cpf });

    return res.status(201).json(newClient);
  }
}
