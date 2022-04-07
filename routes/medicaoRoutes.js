const express = require('express')
const Routes = express.Router()
const medicaoController = require('../controllers/medicaoKwhController')
const medicaoAguaController = require('../controllers/medicaoAguaController')
const medicaoKwhAdmController = require('../controllers/medicaoKwhAdmController')
const medicaoTemperaturaPaController = require('../controllers/medicaoTemperaturaPaController')
const medicaoEnergiaRenzController = require('../controllers/medicaoEnergiaRenzController')

/* medicaoGetPageAgua,
    medicaoGetConsultaAgua,
    medicaoPostAgua*/

//ROTAS PARA MEDI플O DE KWh DO SHOPPING
Routes.get('/medicao', medicaoController.medicaoGetPageKwh)
Routes.get('/consultakwh', medicaoController.medicaoGetConsultaKwh)
Routes.post('/medicao', medicaoController.medicaoPostKwh)
////////////////////////////////////////////////////////////////////////////////////////////
//ROTAS PARA MEDI플O DE AGUA
Routes.get('/medicao', medicaoAguaController.medicaoGetPageAgua)
Routes.get('/consultakwh', medicaoAguaController.medicaoGetConsultaAgua)
Routes.post('/medicao', medicaoAguaController.medicaoPostAgua)
////////////////////////////////////////////////////////////////////////////////////////////
//ROTAS PARA MEDI플O DE KWH DA ADM
Routes.get('/medicao', medicaoKwhAdmController.medicaoGetPageKwhAdm)
Routes.get('/consultakwh', medicaoKwhAdmController.medicaoGetConsultaKwhAdm)
Routes.post('/medicao', medicaoKwhAdmController.medicaoPostKwhAdm)
////////////////////////////////////////////////////////////////////////////////////////////
//ROTAS PARA MEDI플O DE TEMPERATURA PA
Routes.get('/medicao', medicaoTemperaturaPaController.medicaoGetPageKwh)
Routes.get('/consultakwh', medicaoTemperaturaPaController.medicaoGetConsultaKwh)
Routes.post('/medicao', medicaoTemperaturaPaController.medicaoPostKwh)
////////////////////////////////////////////////////////////////////////////////////////////
//ROTAS PARA MEDI플O DE ENERGIA RENZ
Routes.get('/medicao', medicaoEnergiaRenzController.medicaoGetPageKwh)
Routes.get('/consultakwh', medicaoEnergiaRenzController.medicaoGetConsultaKwh)
Routes.post('/medicao', medicaoEnergiaRenzController.medicaoPostKwh)


module.exports = Routes;