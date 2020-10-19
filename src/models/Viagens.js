const { Model, DataTypes, DATE } = require('sequelize');

class Viagens extends Model {
    static init(connection) {
        super.init({
            cidade: DataTypes.STRING,
            partida: DataTypes.STRING,
            destino: DataTypes.STRING,
            itinerario: DataTypes.STRING,
            horario: DataTypes.TIME,
            casa_passageiro: DataTypes.INTEGER
        }, {
            sequelize: connection,
        })
    }
    static associate(models) {
        this.belongsTo(models.Vans, { foreignKey: 'motorista_id', as: 'viaja' })
    }
};

module.exports = Viagens;