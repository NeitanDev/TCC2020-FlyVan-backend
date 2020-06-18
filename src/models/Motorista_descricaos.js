const { Model, DataTypes } = require('sequelize');

class Motorista_descricaos extends Model {
    static init(connection) {
        super.init({
            image: DataTypes.STRING,
            avaliacao: DataTypes.STRING,
        }, {
            sequelize: connection,
        })
    }

    static associate(models) {
        this.belongsTo(models.Motoristas, { foreignKey: 'motorista_id', as: 'pertence' })
    }
};

module.exports = Motorista_descricaos;