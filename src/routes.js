const express = require('express');
const multer = require('multer');

const uploadConfigMotorista = require('./config/upload_motorista');
const uploadConfigVans = require('./config/upload_vans');
const uploadConfigPassageiro = require('./config/upload_passageiro');

const PassageiroController = require('./controllers/PassageiroController');
const EmpresaController = require('./controllers/EmpresaController');
const VanController = require('./controllers/VanController');
const ViagemController = require('./controllers/ViagemController');
const MotoristaController = require('./controllers/MotoristaController');
const LoginController = require('./controllers/LoginController');
const TesteController = require('./controllers/TesteController');

const routes = express.Router();

/**
 * Passageiros Routes:
 */

routes.post('/passageiro', multer(uploadConfigPassageiro).single('image'), PassageiroController.create);
routes.get('/passageiro', PassageiroController.list);
routes.get('/passageiro/perfil/:id', PassageiroController.perfil);


/**
 * Empresas Routes:
 */

routes.post('/empresa', EmpresaController.create);
routes.post('/empresa/pesquisar', EmpresaController.searchCnpj);
routes.get('/empresas/pesquisar/name', EmpresaController.searchName);


/**
 * Vans Routes:
 */

routes.post('/vans', multer(uploadConfigVans).single('image'), VanController.create);
routes.get('/vans', VanController.list);


/**
 * Viangesn Routes:
 */

routes.post('/viagens', ViagemController.create);
routes.get('/viagens', ViagemController.list);


/**
 * Motorista Routes:
 */

routes.post('/motoristas/:empresa_id', multer(uploadConfigMotorista).single('image'), MotoristaController.create);
routes.get('/motoristas', MotoristaController.list);
routes.get('/motoristas/perfil/:id', MotoristaController.perfil);


/**
 * Login Route:
 */

routes.post('/login', LoginController.login);


/**
 * Testes:
 */

routes.post('/teste', multer(uploadConfigMotorista).single('image'), TesteController.sounou);
routes.post('/teste2', multer(uploadConfigVans).single('image'), TesteController.sounou);
routes.post('/desespero', TesteController.desespero);

module.exports = routes;