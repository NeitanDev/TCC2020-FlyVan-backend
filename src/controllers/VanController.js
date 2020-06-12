const Vans = require('../models/Vans');
const connection = require('../database/index');

module.exports = {
    async create(req, res) {
        const { placa, modelo, marca, ano, proprietario, id_proprietario } = req.body;

        const van = await Vans.create({
            placa,
            modelo,
            ano,
            marca,
            proprietario,
            id_proprietario
        });
        return res.json(van);
    },

    async list(req, res) {
        const vans = await Vans.findAll();

        return res.json(vans);
    }
};