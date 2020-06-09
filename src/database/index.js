const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Passageiros = require('../models/Passageiros');


const connection = new Sequelize(dbConfig);

Passageiros.init(connection);

module.exports = connection;