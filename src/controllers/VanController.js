const Vans = require('../models/Vans');
const Van_descricao = require('../models/Van_descricaos');
const connection = require('../database/index');

module.exports = {
    async create(req, res) {
        const { placa, modelo, marca, ano, proprietario, id_proprietario, title, descricao } = req.body;

        const van = await Vans.create({
            placa,
            modelo,
            ano,
            marca,
            proprietario,
            id_proprietario
        });

        const { id } = van;

        const vandescri = await Van_descricao.create({
            van_id: id,
            title,
            image: `uploads/vans/${req.file.filename}`,
            descricao
        });

        const { placar, modelor, anor, marcar, proprietarior, id_proprietarior } = van;
        const { van_idr, titler, imager, descricaor } = vandescri;

        return res.json({
            id, placar, modelor, anor, marcar, proprietarior, id_proprietarior,
            van_idr, titler, imager, descricaor
        });
    },

    async list(req, res) {
        const { proprietario, id_proprietario } = req.body;
        const response = await connection.query(`SELECT vans.id, placa, marca, modelo, ano, title, descricao FROM vans, van_descricaos ` +
            `WHERE proprietario = ${proprietario} AND id_proprietario = ${id_proprietario} AND van_id = vans.id;`,
            { type: connection.QueryTypes.SELECT });
        return res.json(response);
    }
};