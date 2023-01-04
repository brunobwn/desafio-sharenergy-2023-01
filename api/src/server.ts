import { Request, Response } from 'express';
import bodyParser from 'body-parser';

const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', (req: Request, res: Response) => {
  // Obtenha os dados de login do usuário aqui
  const username = req.body.username;
  const password = req.body.password;

  // Autentique o usuário aqui
  if (username === 'asd' && password === '123') {
    const jwt = require('jsonwebtoken');

    const payload = {
      // Inclua as informações de usuário que deseja incluir no token
      userId: 123,
      username: 'asd',
    };

    const secret = 'MINHACHAVESECRETA245111';

    // Gere o token com uma validade de 1 hora
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.send({ token, username });
  } else {
    res.send('Usuário não autenticado');
  }
});

app.listen(3333, () => {
  console.log('Servidor iniciado na porta 3333');
});
