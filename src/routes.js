const express = require('express');

const PassageiroController = require('./controllers/PassageiroController');
const EmpresaController = require('./controllers/EmpresaController');

const routes = express.Router();

routes.post('/passageiro', PassageiroController.create);
routes.get('/passageiro', PassageiroController.list);
routes.post('/empresa', EmpresaController.create);

module.exports = routes;