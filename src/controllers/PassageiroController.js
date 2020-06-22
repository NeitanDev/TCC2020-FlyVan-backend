const Passageiro = require('../models/Passageiros');
const Paradas = require('../models/Paradas');
const createId = require('../utils/createId');
// const connection = require('../database/index');

module.exports = {

    async list(req, res) {
        const passageiros = await Passageiro.findAll();
        // const passageiros = await connection.query("SELECT * FROM passageiros",
        //     { type: connection.QueryTypes.SELECT });

        return res.json(passageiros);
    },

    async create(req, res) {
        const { nome, sobrenome, email, senha, whatsapp, cep, lougradouro, bairro, cidade, uf, numero, latitude, longitude } = req.body;
        const cod = createId();

        const passageiro = await
            Passageiro.create({
                nome,
                sobrenome,
                image: `uploads/passageiros/${req.file.filename}`,
                cod,
                email,
                senha,
                whatsapp,
            });

        const { id } = passageiro;

        const parada = await
            Paradas.create({
                latitude,
                longitude,
                cep,
                lougradouro,
                bairro,
                cidade,
                uf,
                numero,
                passageiro_id: id,
            });

        return res.json({ passageiro, parada });
    }
}