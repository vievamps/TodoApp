import { Usuario } from '../models/Usuario.js';

import jwt from 'jsonwebtoken';

export async function login(req, res, next) {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    console.log("Senha recebida:", senha);  // Verifique se a senha está sendo passada
    console.log("Hash da senha armazenada:", usuario.senha);  // Verifique o valor do hash armazenado

    const senhaValida = await usuario.validatePassword(senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { usuarioId: usuario._id },
      process.env.SECRET_KEY, 
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      isAdmin: usuario.isAdmin 
    });

  } catch (error) {
    next(error);
  }
}
