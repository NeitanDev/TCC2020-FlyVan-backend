const Motoristas = require('../models/Motoristas');
const Passageiros = require('../models/Passageiros');

module.exports = {
    async login(req, res) {
        const { email, senha } = req.body;
        const motorista = await Motoristas.findOne({
            attributes: ['id', 'nome'],
            where: {
                email,
                senha
            },
        });
        const passageiro = await Passageiros.findOne({
            attributes: ['id', 'nome'],
            where: {
                email: 'abnerpedroso@gmail.com',
                senha: 'bnão_arrasa_quarteirão'
            },
        });

        if (!motorista && !passageiro) {
            return res.status(400).json({ error: "Usuario não encontrado na base de dados" });
        } else if (motorista) {
            return res.json({ id: motorista.id, user: "motorista", nome: motorista.nome });
        } else if (passageiro) {
            return res.json({ id: passageiro.id, user: "passageiro", nome: passageiro.nome });
        }
    }
}