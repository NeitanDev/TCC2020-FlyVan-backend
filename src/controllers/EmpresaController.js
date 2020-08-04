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
        let { cnpj } = req.body;

        console.log(req.body);
        if (cnpj == '') {
            cnpj = 'nnjnjdnks';
        }
        const empresa = await connection.query(`SELECT * FROM empresas ` +
            `WHERE cnpj LIKE '${cnpj}%';`,
            { type: connection.QueryTypes.SELECT });
        return res.json(empresa);
    },

    async searchName(req, res) {
        const { name } = req.body;

        const empresa = await connection.query(`SELECT * FROM empresas ` +
            `WHERE nome LIKE '%${name}%';`,
            { type: connection.QueryTypes.SELECT });

        return res.json(empresa);
    },

    async addFuncionario(req, res) {
        const { id_empresa } = req.body;

        const empresa = await connection.query(`SELECT * FROM empresas ` +
            `WHERE nome LIKE '%${name}%';`,
            { type: connection.QueryTypes.SELECT });

        return res.json(empresa);
    }
}