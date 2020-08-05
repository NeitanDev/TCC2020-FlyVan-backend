const { Model, DataTypes } = require('sequelize');

class Vans extends Model {
    static init(connection) {
        super.init({
            placa: DataTypes.STRING,
            renavam: DataTypes.INTEGER,
            modelo: DataTypes.STRING,
            marca: DataTypes.STRING,
            ano: DataTypes.INTEGER,
            proprietario: DataTypes.INTEGER,
            id_proprietario: DataTypes.INTEGER,
        }, {
            sequelize: connection,
        })
    }
};

module.exports = Vans;