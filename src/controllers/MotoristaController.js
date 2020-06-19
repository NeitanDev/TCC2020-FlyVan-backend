const Motoristas = require('../models/Motoristas');
const Empresas = require('../models/Empresas');
const Motorista_descricaos = require('../models/Motorista_descricaos');
const createId = require('../utils/createId');
const connection = require('../database/index');

module.exports = {
    async create(req, res) {
        const { empresa_id } = req.params;
        const { nome, sobrenome, email, senha, cnh, whatsapp } = req.body;
        const cod = createId();

        const empresa = await Empresas.findByPk(empresa_id);

        if (empresa) {
            const motorista = await Motoristas.create({
                nome,
                sobrenome,
                email,
                senha,
                cnh,
                whatsapp,
                cod,
                empresa_id,
            });

            const { id } = motorista;
            const description = await Motorista_descricaos.create({
                motorista_id: id,
                image: `uploads/motoristas/${req.file.filename}`,
                avaliacao: '5',
            });

            const { image, avaliação } = description;

            const result = { id, nome, sobrenome, email, senha, cnh, whatsapp, cod, empresa_id, image, avaliação };

            return res.json(result);
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