import mongoose from 'mongoose'

const { Schema } = mongoose

const tarefaSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  situacao: {
    type: Boolean,
    required: true,
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  dataCricao: {
    type: Date,
    default: Date.now,
  },
})

export const Tarefa = mongoose.model('Tarefa', tarefaSchema)