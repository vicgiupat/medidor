const express = require('express')
const Routes = express.Router()
const medicaoController = require('../controllers/medicaoController')

Routes.get('/medicao',  medicaoController.medicaoGetPageKwh)

//Routes.get('/consultakwh', medicaoController.medicaoGetConsultaKwh)

Routes.post('/medicao', medicaoController.medicaoPostKwh)


module.exports = Routes;