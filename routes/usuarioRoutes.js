const express           = require('express')
const Routes            = express.Router()
const usuarioController = require('../controllers/usuarioController')
//usuarioCadastro, usuarioLogin, usuarioDelete, usuarioAtualizarDados, usuarioDetalhes
//////////////////////SE��O DE GETS////////////////////////////////////////////////////////////////////////////////

Routes.get('/login', usuarioController.usuarioGetLogin)
//Routes.get('/selec', usuarioController.medicaoGetSelecModulos)
//Routes.get('/', usuarioController.usuarioGetIndex)

///////////////////////SE��O DE POSTS////////////////////////////////////////////////////////////////////////////////

Routes.post('/login',       usuarioController.usuarioPostLogin   )
Routes.post('/cadastro',    usuarioController.usuarioPostCadastro)

module.exports = Routes;



