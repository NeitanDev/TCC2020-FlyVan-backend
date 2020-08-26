const { Model, DataTypes } = require('sequelize');

class Viagens extends Model {
    static init(connection) {
        super.init({
            cidade: DataTypes.STRING,
            partida: DataTypes.STRING,
            destino: DataTypes.STRING,
            itinerario: DataTypes.STRING,
            horario: DataTypes.TIME,
        }, {
            sequelize: connection,
        })
    }
    static associate(models) {
        this.belongsTo(models.Vans, { foreignKey: 'motorista_id', as: 'viaja' })
    }
};

module.exports = Viagens;