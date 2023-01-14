import { Client } from './../models/Client';
import { BadRequestError, ConflictError } from './../helpers/api-errors';
import 'dotenv/config';
import { Request, Response } from 'express';
import { looksLikeMail } from '../util/util';

export class ClientController {
  async getAll(req: Request, res: Response) {
    const clients = await Client.find();
    return res.status(200).json(clients);
  }

  async getOne(req: Request, res: Response) {
    const id = req.params.id;
    const client = await Client.findById(id);

    if (!client) return res.status(404).json({ message: 'Registro não existe' });

    return res.status(200).json(client);
  }

  async delete(req: Request, res: Response) {
    const _id = req.params.id;
    if (!_id) return res.status(400);
    try {
      const client = await Client.findByIdAndDelete(_id);
      if (client) {
        return res.status(200).json({ message: 'Registro deletado' });
      }
      return res.status(404).json({ message: 'Registro não existe' });
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async create(req: Request, res: Response) {
    const { _id, nome, email, telefone, endereco, cpf } = req.body;

    if (nome.length < 3) {
      throw new BadRequestError('O campo Nome precisa ter no mínimo 3 letras');
    }

    if (!looksLikeMail(email)) {
      throw new BadRequestError('Campo E-mail inválido');
    }

    if (!telefone) throw new BadRequestError('O campo telefone é obrigatório');
    if (!endereco) throw new BadRequestError('O campo endereço é obrigatório');
    if (!cpf) throw new BadRequestError('O campo telefone é obrigatório');

    const existClient = await Client.findOne({ email });

    if (existClient && existClient._id !== _id) {
      throw new ConflictError('Já existe um cliente cadastrado neste e-mail!');
    }

    if (_id) {
      const updatedClient = await Client.findOneAndUpdate(
        { _id },
        { nome, email, telefone, endereco, cpf, editedAt: Date.now() }
      );
      updatedClient?.save();
      return res.status(201).json(updatedClient);
    }

    const newClient = await Client.create({ nome, email, telefone, endereco, cpf });

    return res.status(201).json(newClient);
  }
}
