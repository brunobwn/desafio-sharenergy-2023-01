import { Router } from 'express';

const router = Router();

// router.post('/login', (req: Request, res: Response) => {
//   // Obtenha os dados de login do usuário aqui
//   const username = req.body.username;
//   const password = req.body.password;

//   console.debug('Rota /login: ', `recebido user: ${username} e pass: ${password}`);
//   // Autentique o usuário aqui
//   if (username === 'asd' && password === '123') {
//     const jwt = require('jsonwebtoken');

//     const payload = {
//       // Inclua as informações de usuário que deseja incluir no token
//       userId: 123,
//       username: 'asd',
//     };

//     const secret = 'pr1v4t3k3yy';

//     // Gere o token com uma validade de 1 hora
//     const token = jwt.sign(payload, secret, { expiresIn: '1h' });

//     res.send({ token, username });
//   } else {
//     res.send('Usuário não autenticado');
//   }
// });

export default router;
