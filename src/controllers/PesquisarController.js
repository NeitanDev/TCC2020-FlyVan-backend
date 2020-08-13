const Passageiro = require('../models/Passageiros');
const Viagens = require('../models/Viagens');
const connection = require('../database/index');
const { Op } = require("sequelize");

module.exports = {
    async searchDestino(req, res) {
        const { search } = req.body;

        const arei = search.split(" ");

        let require = `SELECT id, cidade , partida, destino, horario, motorista_id ` +
            `FROM viagens AS Viagens WHERE destino LIKE `;
        if (arei.length == 1) {
            require = require + `'%${arei[0]}%'`;
        } else if (arei.length > 1) {
            require = require + `'%${arei[0]}%' `;
            let cont = 1;
            while (cont < arei.length) {
                require = require + `AND destino LIKE '%${arei[cont]}%' `;
                cont++;
            }
        }

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async searchPartida(req, res) {
        const { search } = req.body;

        const arei = search.split(" ");

        let require = `SELECT id, cidade , partida, destino, horario, motorista_id ` +
            `FROM viagens AS Viagens WHERE partida LIKE `;
        if (arei.length == 1) {
            require = require + `'%${arei[0]}%'`;
        } else if (arei.length > 1) {
            require = require + `'%${arei[0]}%' `;
            let cont = 1;
            while (cont < arei.length) {
                require = require + `AND partida LIKE '%${arei[cont]}%' `;
                cont++;
            }
        }

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async searchNome(req, res) {
        const { id } = req.params;

        const response = await connection.query(`SELECT list_paradas.id, passageiros.nome, passageiros.image, ` +
            ` paradas.cidade, paradas.bairro, paradas.logradouro, paradas.numero ` +
            ` FROM list_paradas,passageiros, paradas ` +
            ` WHERE viagem_id = ${id} ` +
            ` AND passageiros.id = list_paradas.passageiro_id AND paradas.id=passageiros.id ORDER BY id desc`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async searchMotorista(req, res) {
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

};