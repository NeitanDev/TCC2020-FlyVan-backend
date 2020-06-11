const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Passageiros = require('../models/Passageiros');
const Empresas = require('../models/Empresas');
const Vans = require('../models/Vans');
const Viagens = require('../models/Viagens');


const connection = new Sequelize(dbConfig);

Passageiros.init(connection);
Empresas.init(connection);
Vans.init(connection);
Viagens.init(connection);

module.exports = connection;