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
// const upload = multer(uploadConfig);

routes.post('/passageiro',multer(uploadConfigPassageiro).single('image'), PassageiroController.create);
routes.get('/passageiro', PassageiroController.list);

routes.post('/empresa', EmpresaController.create);

routes.post('/vans', VanController.create);
routes.get('/vans', VanController.list);

routes.post('/viagens', ViagemController.create);
routes.get('/viagens', ViagemController.list);

routes.post('/motoristas/:empresa_id', multer(uploadConfigMotorista).single('image'), MotoristaController.create);
routes.get('/motoristas', MotoristaController.list);

routes.post('/login', LoginController.login);

routes.post('/teste', multer(uploadConfigMotorista).single('image'), TesteController.sounou);
routes.post('/teste2', multer(uploadConfigVans).single('image'), TesteController.sounou);

module.exports = routes;