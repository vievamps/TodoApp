import { Tarefa } from "../models/Tarefa.js"

export async function criarTarefa(req, res) {
  try {


    if (!req.body.titulo ) {
        return res.status(400).json({ message: "Título  é obrigatório" });
      }
      
    const tarefa = await Tarefa.create({ ...req.body, autor: req.usuario.id })

    return res.status(201).json(tarefa)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'A tarefa não pode ser criada...' })
  }
}

export async function mostrarTarefa(req, res) {
  try {
    console.log("ID do usuário:", req.usuario.id); 
    const tarefa = await Tarefa.find({ autor: req.usuario.id });

    return res.status(200).json(tarefa)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Erro ao buscar tarefas' })
  }
}

export async function atualizarTarefa(req, res) {
  try {
    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    return res.status(200).json(tarefaAtualizada)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Erro ao atualizar essa tarefa' })
  }
}

export async function deletarTarefa(req, res) {
  try {
    await Tarefa.findByIdAndDelete(req.params.id)

    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Erro ao remover tarefa' })
  }
}