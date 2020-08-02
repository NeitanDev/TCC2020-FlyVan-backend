const { Model, DataTypes } = require('sequelize');

class Van_descricao extends Model {
    static init(connection) {
        super.init({
            title: DataTypes.STRING,
            image: DataTypes.STRING,
            descricao: DataTypes.STRING,
        }, {
            sequelize: connection,
        })
    }

    static associate(models) {
        this.belongsTo(models.Vans, { foreignKey: 'van_id', as: 'descritivo' })
    }
};

module.exports = Van_descricao;