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
Routes.get('/medicaoAgua', medicaoAguaController.medicaoGetPageAgua)
Routes.get('/consultaAgua', medicaoAguaController.medicaoGetConsultaAgua)
Routes.post('/medicaoAgua', medicaoAguaController.medicaoPostAgua)
////////////////////////////////////////////////////////////////////////////////////////////
//ROTAS PARA MEDI플O DE KWH DA ADM
Routes.get('/medicaoKwhAdm', medicaoKwhAdmController.medicaoGetPageKwhAdm)
Routes.get('/consultaKwhAdm', medicaoKwhAdmController.medicaoGetConsultaKwhAdm)
Routes.post('/medicaoKwhAdm', medicaoKwhAdmController.medicaoPostKwhAdm)
////////////////////////////////////////////////////////////////////////////////////////////
//ROTAS PARA MEDI플O DE TEMPERATURA PA
Routes.get('/medicaoTemperaturaPa', medicaoTemperaturaPaController.medicaoGetPageTemperaturaPa)
Routes.get('/consultaTemperaturaPa', medicaoTemperaturaPaController.medicaoGetConsultaTemperaturaPa)
Routes.post('/medicaoTemperaturaPa', medicaoTemperaturaPaController.medicaoPostTemperaturaPa)
////////////////////////////////////////////////////////////////////////////////////////////
//ROTAS PARA MEDI플O DE ENERGIA RENZ
Routes.get('/medicaoEnergiaRenz', medicaoEnergiaRenzController.medicaoGetPageEnergiaRenz)
Routes.get('/consultaEnergiaRenz', medicaoEnergiaRenzController.medicaoGetConsultaEnergiaRenz)
Routes.post('/medicaoEnergiaRenz', medicaoEnergiaRenzController.medicaoPostEnergiaRenz)


module.exports = Routes;