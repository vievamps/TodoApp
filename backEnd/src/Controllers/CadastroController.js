import { Usuario } from '../models/Usuario.js';


export async function cadastro(req, res, next) {
  const { email } = req.body

  const checarUsuario = await Usuario.findOne({ email })

  if (checarUsuario) {
    return res.status(409).send('O usuário já existe')
  }

  try {
    const usuario = await Usuario.create(req.body)

    res.status(201).json(usuario)
  } catch (error) {
    next(error)
  }
}
export async function listarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.find({}, '-senha'); 
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar usuários.' });
  }
}