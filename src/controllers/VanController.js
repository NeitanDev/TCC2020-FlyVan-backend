const Vans = require('../models/Vans');
const Van_descricao = require('../models/Van_descricaos');
const connection = require('../database/index');

module.exports = {
    async create(req, res) {
        const { placa, modelo, marca, ano, proprietario, id_proprietario, title, descricao, renavam } = req.body;

        const van = await Vans.create({
            placa,
            modelo,
            ano,
            marca,
            renavam,
            proprietario,
            id_proprietario
        });

        const { id } = van;

        const vandescri = await Van_descricao.create({
            van_id: id,
            title,
            image: `uploads/vans/van.jpg`,
            descricao
        });


        return res.json({
            id: van.id,
            placa: van.placa,
            modelo: van.modelo,
            ano: van.ano,
            renavam: van.renavam,
            marca: van.marca,
            title: vandescri.title,
            image: vandescri.image,
            descricao: vandescri.descricao
        });
    },

    async list(req, res) {
        // proprietario = 0, é proprietario = motorista
        // proprietario = 1, é proprietario = empresa
        const { proprietario, id_proprietario } = req.body;
        const response = await connection.query(`SELECT vans.id, image, renavam, placa, marca, modelo, ano, title, descricao FROM vans, van_descricaos ` +
            `WHERE proprietario = ${proprietario} AND id_proprietario = ${id_proprietario} AND van_id = vans.id ORDER BY id desc;`,
            { type: connection.QueryTypes.SELECT });
        return res.json(response);
    },

    async removeVan(req, res) {
        const { id } = req.params;

        await Vans.destroy({
            where: {
                id,
            }
        });

        return res.json({ sucesso: 'true' });
    },

    async update(req, res) {
        const { id } = req.params;

        const { placa, modelo, marca, ano, title, descricao, renavam } = req.body;

        await connection.query(
            `UPDATE vans SET
                placa = '${placa}',
                renavam = ${renavam},
                marca = '${marca}',
                modelo = '${modelo}',
                ano = ${ano} 
             WHERE id = ${id};`,
            { type: connection.QueryTypes.UPDATE });
        await connection.query(
            `UPDATE van_descricaos SET
                title = '${title}',
                descricao = '${descricao}'
             WHERE van_id = ${id};`,
            { type: connection.QueryTypes.UPDATE });

        res.json({ sucess: true });
    }
};