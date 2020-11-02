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
const PesquisarController = require('./controllers/PesquisarController');
const ResultsController = require('./controllers/ResultsController');
const Viagens2Controller = require('./controllers/Viagens2Controller');

const routes = express.Router();

/**
 * Passageiros Routes:
 */

routes.post('/passageiro', multer(uploadConfigPassageiro).single('image'), PassageiroController.create);
routes.get('/passageiro', PassageiroController.list);
routes.get('/passageiro/perfil/:id', PassageiroController.perfil);

/**
 * Pesquisar Routes:
 */
routes.post('/pesquisar/nome', PesquisarController.searchNome);
routes.post('/pesquisar/teste', PesquisarController.searchTeste);
routes.post('/pesquisas/result', ResultsController.resultAutonomo);
routes.post('/viagens/deteils',PesquisarController.viagemDeteils);

/**
 * Empresas Routes:
 */

routes.post('/empresa', EmpresaController.create);
routes.post('/empresa/pesquisar', EmpresaController.searchCnpj);
routes.get('/empresas/pesquisar/name', EmpresaController.searchName);
routes.get('/empresa/:empresa_id', EmpresaController.voltaEmpresa);


/**
 * Vans Routes:
 */

routes.post('/vans', multer(uploadConfigVans).single('image'), VanController.create);
routes.post('/vans/list', VanController.list);
routes.delete('/vans/:id/delete', VanController.removeVan);
routes.put('/van/:id/update', VanController.update);


/**
 * Viangesn Routes:
 */
//Viagens2
routes.post('/viagens2/create/pontos_de_embarque',Viagens2Controller.createEmbarque);
routes.post('/viagens2/create/casa_passageiro',Viagens2Controller.createCreateCasa_passageiro);
routes.post('/viagens2/list/appMotorista', Viagens2Controller.listViagensAppMotorista);
routes.post('/viagens2/list/appPassageiro',Viagens2Controller.listViagensAppPassageiro);
routes.post('/cancela/viagem',Viagens2Controller.cancelaViagem);
routes.post('/busca/quem/nao/vai',Viagens2Controller.listpessoasNaoIrao)

// end Viagens2
routes.post('/viagens', ViagemController.create);
routes.get('/viagens/:motorista_id', ViagemController.list);
routes.delete('/viagens/:id', ViagemController.delete);
routes.get('/viagens/:id/passageiros', ViagemController.passageirosViagem);
routes.post('/viagens/:id/add/passageiro', ViagemController.addPassageiro);
routes.delete('/viagens/:id/remove/passageiro', ViagemController.removePassageiro);
routes.get('/viagens/passageiros/:id/listPassageiros', ViagemController.listPassageirosViagem); //app do passageiro
routes.get('/viagens/:id/passageiro/listViagem', ViagemController.listViagens);

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