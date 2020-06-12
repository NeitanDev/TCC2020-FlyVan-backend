'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('viagens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      motorista_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'motoristas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      partida: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destino: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      horario: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('viagens');
  }
};
