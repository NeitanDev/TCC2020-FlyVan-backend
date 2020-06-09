const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Passageiros = require('../models/Passageiros');
const Empresas = require('../models/Empresas');


const connection = new Sequelize(dbConfig);

Passageiros.init(connection);
Empresas.init(connection);

module.exports = connection;