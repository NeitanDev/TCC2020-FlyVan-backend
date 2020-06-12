const { Model, DataTypes } = require('sequelize');

class Motoristas extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            sobrenome: DataTypes.STRING,
            cod: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            cnh: DataTypes.BIGINT,
            whatsapp: DataTypes.STRING,
        }, {
            sequelize: connection,
        })
    }

    static associate(models) {
        this.belongsTo(models.Empresas, { foreignKey: 'empresa_id', as: 'funcionario' })
    }
};

module.exports = Motoristas;