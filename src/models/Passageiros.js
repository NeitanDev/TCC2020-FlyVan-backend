const { Model, DataTypes } = require('sequelize');

class Passageiros extends Model {
    static init(connection) {
        super.init({
            // id: DataTypes.INTEGER,
            nome: DataTypes.STRING,
            sobrenome: DataTypes.STRING,
            cod: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            whatsapp: DataTypes.STRING,
        }, {
            sequelize: connection,
        })
    }
};

module.exports = Passageiros;