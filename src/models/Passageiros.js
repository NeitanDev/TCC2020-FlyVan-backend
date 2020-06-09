const { Model, DataTypes } = require('sequelize');

class Passageiros extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            sobrenome: DataTypes.STRING,
            cod: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            RG: DataTypes.STRING,
            CPF: DataTypes.STRING,
            telefone: DataTypes.STRING,
            whatsapp: DataTypes.STRING,
            dated_at: DataTypes.DATE,
        }, {
            sequelize: connection,
        })
    }
};

module.exports = Passageiros;