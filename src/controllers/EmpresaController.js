const connection = require('../database/index');
const Empresa = require('../models/Empresas');

module.exports = {
    async create(req, res) {
        const { nome, regiao, email, senha, cnpj, whatsapp } = req.body;

        const empresa = await
            Empresa.create({
                nome,
                regiao,
                email,
                senha,
                cnpj,
                whatsapp,
            });

        return res.json(empresa);
    },

    async searchCnpj(req, res) {
        const { cnpj } = req.body;

        const empresa = await connection.query(`SELECT * FROM empresas ` +
            `WHERE cnpj LIKE '${cnpj}%';`,
            { type: connection.QueryTypes.SELECT });

        return res.json(empresa);
    }
}