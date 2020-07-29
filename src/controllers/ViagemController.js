const Viagens = require('../models/Viagens');


module.exports = {
    async create(req, res) {
        const { cidade, partida, destino, horario } = req.body;
        const viagem = await Viagens.create({
            cidade,
            partida,
            destino,
            horario
        });
        return res.json(viagem);
    },
    async list(req, res) {
        return res.json({ Hello: "Viagem" });
    },
};