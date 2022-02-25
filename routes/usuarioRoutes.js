const express           = require('express')
const Routes            = express.Router()
const usuarioController = require('../controllers/usuarioController')
//usuarioCadastro, usuarioLogin, usuarioDelete, usuarioAtualizarDados, usuarioDetalhes
//////////////////////SEÇÃO DE GETS////////////////////////////////////////////////////////////////////////////////

Routes.get('/login', usuarioController.usuarioGetLogin)
//Routes.get('/selec', usuarioController.medicaoGetSelecModulos)
//Routes.get('/', usuarioController.usuarioGetIndex)

///////////////////////SEÇÃO DE POSTS////////////////////////////////////////////////////////////////////////////////

Routes.post('/login',       usuarioController.usuarioPostLogin   )
Routes.post('/cadastro',    usuarioController.usuarioPostCadastro)

module.exports = Routes;



