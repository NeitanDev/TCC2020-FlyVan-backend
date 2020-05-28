'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('passageiros',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        sobrenome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        senha: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        RG: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        CPF: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        telefone: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        whatsapp: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('passageiros');
  }
};