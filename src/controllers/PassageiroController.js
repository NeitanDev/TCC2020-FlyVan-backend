const Passageiro = require('../models/Passageiros');
const Paradas = require('../models/Paradas');
const createId = require('../utils/createId');
const connection = require('../database/index');

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
                // image: `uploads/passageiros/${req.file.filename}`,
                image: 'uploads/passageiros/profile.jpg',
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
                descricao: 'passageiro',
                passageiro_id: id,
            });

        return res.json({
            passageiro, parada
        });
    },

    async perfil(req, res) {
        const { id } = req.params;

        const response = await connection.query(`SELECT * FROM passageiros, paradas ` +
            `WHERE paradas.passageiro_id = passageiros.id AND passageiros.id = ` + id,
            { type: connection.QueryTypes.SELECT });

        return res.json(response[0]);
    },

    async solicitacao(req, res) {
        const { viagem_id, motorista_id, passageiro_id, dia, nome, viagem_partida, viagem_destino } = req.body;

        const response1 = await connection.query(`
        SELECT * FROM solicitacoes WHERE viagem_id = ${viagem_id} AND motorista_id = ${motorista_id} AND passageiro_id = ${passageiro_id}
        `,
            { type: connection.QueryTypes.SELECT });

        if(response1[0] == null){
            const response = await connection.query(`
        select nome,image,whatsapp,paradas.cidade as cidadePassageiro from passageiros,paradas where passageiros.id = ${passageiro_id} and paradas.passageiro_id = ${passageiro_id}
        `,
            { type: connection.QueryTypes.SELECT });

        const solicitacao = await connection.query(`
        INSERT INTO solicitacoes (viagem_id,motorista_id,passageiro_id,image,dia,nome,status,viagem_partida,viagem_destino,whatsapp, cidadePassageiro) 
        VALUES (${viagem_id}, ${motorista_id}, ${passageiro_id},'${response[0].image}',NOW(),'${response[0].nome}','solicitado','${viagem_partida}',
        '${viagem_destino}','${response[0].whatsapp}','${response[0].cidadePassageiro}');
        `,
            { type: connection.QueryTypes.INSERT });

        let sounou = {
            id:solicitacao[0],viagem_id, motorista_id, passageiro_id, dia, nome, viagem_partida, viagem_destino,
            image:response[0].image,nome:response[0].nome,whatsapp:response[0].whatsapp,
            cidadePassageiro:response[0].cidadePassageiro,status:'solicitado'
        }

        return res.json(sounou);
        } else if (response1[0] != null){
            return res.json({id:false});
        }
// return res.json({sounou:true})

    }
    
}