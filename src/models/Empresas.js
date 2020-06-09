const { Model, DataTypes } = require('sequelize');

class Empresas extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            regiao: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            cnpj: DataTypes.STRING,
            whatsapp: DataTypes.STRING,
        }, {
            sequelize: connection,
        })
    }
};

module.exports = Empresas;