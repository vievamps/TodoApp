import jwt from 'jsonwebtoken'
import { Usuario } from '../models/Usuario.js'

export async function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Autenticação requerida' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

    const usuario = await Usuario.findById(decodedToken.usuarioId)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    req.usuario = usuario;


    next()
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' })
  }
  
}
export function verificarAdmin(req, res, next) {
  if (!req.usuario.isAdmin) {
    return res.status(403).json({ message: 'Acesso negado: apenas administradores podem acessar esta rota.' });
  }
  next();
}