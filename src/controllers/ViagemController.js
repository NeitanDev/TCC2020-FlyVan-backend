const Passageiro = require('../models/Passageiros');
const Viagens = require('../models/Viagens');
const connection = require('../database/index');

module.exports = {
    async create(req, res) {
        const { cidade, partida, destino, horario, itinerario, motorista_id,casa_passageiro } = req.body;
        const viagem = await Viagens.create({
            motorista_id,
            cidade,
            partida,
            destino,
            itinerario,
            horario,
            casa_passageiro
        });
        return res.json(viagem);
    },

    async list(req, res) {
        const { motorista_id } = req.params;

        const viagens = await Viagens.findAll({
            order: [
                ['id', 'DESC'],
            ],
            where: {
                motorista_id,
            },
        });

        return res.json(viagens);
    },

    async delete(req, res) {
        const { id } = req.params;

        await Viagens.destroy({
            where: {
                id,
            }
        });

        return res.json({ sucesso: 'true' });
    },

    async passageirosViagem(req, res) {
        const { id } = req.params;

        const response = await connection.query(`SELECT list_paradas.id, passageiros.nome, passageiros.image, ` +
            ` paradas.cidade, paradas.bairro, paradas.logradouro, paradas.numero ` +
            ` FROM list_paradas,passageiros, paradas ` +
            ` WHERE viagem_id = ${id} ` +
            ` AND passageiros.id = list_paradas.passageiro_id AND paradas.id=passageiros.id ORDER BY id desc`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async addPassageiro(req, res) {
        const { id } = req.params;
        const { cod } = req.body;


        const passa = await Passageiro.findOne({
            attributes: ['id'],
            where: {
                cod,
            },
        });

        const sounou = await connection.query(`INSERT INTO list_paradas (passageiro_id, viagem_id, created_at, updated_at) ` +
            `VALUES (${passa.id},${id},NOW(),NOW());`,
            { type: connection.QueryTypes.INSERT });

        const response = await connection.query(`SELECT passageiros.nome,passageiros.image,paradas.cidade,paradas.numero,paradas.bairro,paradas.logradouro ` +
            `FROM passageiros,paradas ` +
            `WHERE passageiro_id = ${passa.id}  and passageiro_id=passageiros.id;`,
            { type: connection.QueryTypes.SELECT });

        const item = {
            id: sounou[0],
            nome: response[0].nome,
            image: response[0].image,
            cidade: response[0].cidade,
            bairro: response[0].bairro,
            logradouro: response[0].logradouro,
            numero: response[0].numero,
        };

        return res.json(item);
    },

    async removePassageiro(req, res) {
        const { id } = req.params;

        const response = await connection.query(`DELETE FROM list_paradas WHERE list_paradas.id=${id}`,
            { type: connection.QueryTypes.DELETE });

        return res.json(response);
    },

    async listViagens(req, res) {
        const { id } = req.params;


        const response = await connection.query(
            `SELECT viagens.id, viagens.cidade,viagens.partida,` +
            `viagens.destino,viagens.horario, viagens.itinerario ` +
            `FROM viagens, list_paradas ` +
            `WHERE list_paradas.passageiro_id = ${id} AND viagens.id = list_paradas.viagem_id;`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async listPassageirosViagem(req, res) {
        const { id } = req.params;

        const response = await connection.query(`SELECT list_paradas.id, passageiros.nome, passageiros.image, ` +
            ` paradas.cidade, paradas.bairro, paradas.logradouro, paradas.numero ` +
            ` FROM list_paradas,passageiros, paradas ` +
            ` WHERE viagem_id = ${id} ` +
            ` AND passageiros.id = list_paradas.passageiro_id AND paradas.id=passageiros.id ORDER BY id desc`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    }
};