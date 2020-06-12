'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('list_paradas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      passageiro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'passageiros', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      viagem_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'viagens', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    return queryInterface.dropTable('list_paradas');
  }
};
