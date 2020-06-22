const Motoristas = require('../models/Motoristas');
const Empresas = require('../models/Empresas');
const createId = require('../utils/createId');
const connection = require('../database/index');

module.exports = {
    async create(req, res) {
        const { empresa_id } = req.params;
        const { nome, sobrenome, email, senha, cnh, whatsapp, cep, lougradouro, bairro, cidade, uf, numero } = req.body;
        const cod = createId();

        const empresa = await Empresas.findByPk(empresa_id);

        if (empresa) {
            const motorista = await Motoristas.create({
                empresa_id,
                nome,
                sobrenome,
                cod,
                email,
                senha,
                cnh,
                whatsapp,
                image: `uploads/motoristas/${req.file.filename}`,
                cep,
                lougradouro,
                bairro,
                cidade,
                uf,
                numero
            });


            return res.json(motorista);
        } else if (!empresa) {
            return res.status(400).json({ Mensage: "Erro!, empresa não existente" })
        }
    },

    async list(req, res) {
        const motorista = await connection.query(
            "SELECT motoristas.nome, empresas.nome AS empresa, " +
            "motoristas.sobrenome, motoristas.email, motoristas.whatsapp " +
            "FROM motoristas, empresas " +
            "WHERE empresas.id = motoristas.empresa_id",
            { type: connection.QueryTypes.SELECT });

        return res.json(motorista);
    }
};