const express = require('express');

const PassageiroController = require('./controllers/PassageiroController');
const EmpresaController = require('./controllers/EmpresaController');
const VanController = require('./controllers/VanController');

const routes = express.Router();

routes.post('/passageiro', PassageiroController.create);
routes.get('/passageiro', PassageiroController.list);
routes.post('/empresa', EmpresaController.create);
routes.post('/vans', VanController.create);
routes.get('/vans', VanController.list);

module.exports = routes;