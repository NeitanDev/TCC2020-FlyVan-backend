const { Model, DataTypes } = require('sequelize');

class Viagens extends Model {
    static init(connection) {
        super.init({
            cidade: DataTypes.STRING,
            partida: DataTypes.STRING,
            destino: DataTypes.STRING,
            horario: DataTypes.TIME,
        }, {
            sequelize: connection,
        })
    }
};

module.exports = Viagens;