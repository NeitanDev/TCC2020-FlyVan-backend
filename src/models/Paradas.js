const { Model, DataTypes } = require('sequelize');

class Paradas extends Model {
    static init(connection) {
        super.init({
            latitude: DataTypes.DOUBLE,
            longitude: DataTypes.DOUBLE,
            cep: DataTypes.INTEGER,
            logradouro: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cidade: DataTypes.STRING,
            uf: DataTypes.CHAR,
            numero: DataTypes.INTEGER,
            passageiro_id: DataTypes.INTEGER,
            passageiro_bool: DataTypes.INTEGER,
            descricao: DataTypes.STRING
        }, {
            sequelize: connection,
        })
    }

    // static associate(models) {
    //     this.belongsTo(models.Motoristas, { foreignKey: 'passageiro_id', as: 'mora' })
    // }
};

module.exports = Paradas;