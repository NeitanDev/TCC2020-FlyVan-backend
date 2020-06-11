const express = require('express');

const PassageiroController = require('./controllers/PassageiroController');
const EmpresaController = require('./controllers/EmpresaController');
const VanController = require('./controllers/VanController');
const ViagemController = require('./controllers/ViagemController');

const routes = express.Router();

routes.post('/passageiro', PassageiroController.create);
routes.get('/passageiro', PassageiroController.list);

routes.post('/empresa', EmpresaController.create);

routes.post('/vans', VanController.create);
routes.get('/vans', VanController.list);

routes.post('/viagens', ViagemController.create);
routes.get('/viagens', ViagemController.list);

module.exports = routes;