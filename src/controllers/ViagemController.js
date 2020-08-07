const Viagens = require('../models/Viagens');


module.exports = {
    async create(req, res) {
        const { cidade, partida, destino, horario, motorista_id } = req.body;
        const viagem = await Viagens.create({
            motorista_id,
            cidade,
            partida,
            destino,
            horario
        });
        return res.json(viagem);
    },
    async list(req, res) {
        const {motorista_id} = req.params;

        const viagens = await Viagens.findAll({
            where: {
                motorista_id,
            },
        });

        return res.json(viagens);
    },
};