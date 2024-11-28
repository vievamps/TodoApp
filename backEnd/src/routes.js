import express from 'express'
import cors from 'cors'
import { autenticar, verificarAdmin} from './middlewares/autenticacao.js'
import { login } from './Controllers/LoginController.js'
import { cadastro, listarUsuarios} from './Controllers/CadastroController.js'
import { criarTarefa, deletarTarefa, mostrarTarefa, atualizarTarefa} from './Controllers/TarefaController.js'
export const routes = express.Router()

routes.use(cors())

// Autenticação
routes.post('/cadastro', cadastro)
routes.post('/login', login)

// Verifica se usuário está autenticado
routes.use(autenticar)

// Tasks
routes.get('/tarefa', mostrarTarefa)
routes.post('/tarefa', criarTarefa)
routes.put('/tarefa/:id', atualizarTarefa)
routes.delete('/tarefa/:id', deletarTarefa)

routes.get('/usuarios', verificarAdmin, listarUsuarios);