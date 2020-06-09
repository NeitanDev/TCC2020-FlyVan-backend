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
    }
}