const Motoristas = require('../models/Motoristas');
const Empresas = require('../models/Empresas');
const createId = require('../utils/createId');
const connection = require('../database/index');
// const { perfil } = require('./PassageiroController');

module.exports = {
    async create(req, res) {
        const { empresa_id } = req.params;
        const { nome, sobrenome, email, senha, cnh, whatsapp, cep,
            lougradouro, bairro, cidade, uf, numero, pertence } = req.body;
        const cod = createId();

            const motorista = await Motoristas.create({
                empresa_id,
                nome,
                sobrenome,
                cod,
                email,
                senha,
                cnh,
                whatsapp,
                image: `uploads/passageiros/profile.jpg`,
                cep,
                lougradouro,
                bairro,
                cidade,
                uf,
                numero,
                pertence
            });


            return res.json(motorista);
        
    },

    async list(req, res) {
        const motorista = await connection.query(
            "SELECT motoristas.nome, empresas.nome AS empresa, " +
            "motoristas.sobrenome, motoristas.email, motoristas.whatsapp " +
            "FROM motoristas, empresas " +
            "WHERE empresas.id = motoristas.empresa_id",
            { type: connection.QueryTypes.SELECT });

        return res.json(motorista);
    },

    async perfil(req, res) {
        const { id } = req.params;
        const motorista = await Motoristas.findByPk(id);
        res.json(motorista);
    }
};