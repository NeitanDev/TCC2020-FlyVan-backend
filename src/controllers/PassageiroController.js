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
        const { nome, sobrenome, email, senha, whatsapp, cep, logradouro, bairro, cidade, uf, numero, latitude, longitude } = req.body;
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
                logradouro,
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

        if (response1[0] == null) {
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
                id: solicitacao[0], viagem_id, motorista_id, passageiro_id, dia, nome, viagem_partida, viagem_destino,
                image: response[0].image, nome: response[0].nome, whatsapp: response[0].whatsapp,
                cidadePassageiro: response[0].cidadePassageiro, status: 'solicitado'
            }

            return res.json(sounou);
        } else if (response1[0] != null) {
            return res.json({ id: false });
        }
        // return res.json({sounou:true})

    },

    async entrarViagem(req, res) {
        const { viagem_id, passageiro_id } = req.body;

        console.log(`viagem_id: "${viagem_id}" e ${passageiro_id}`)

        let sounou = viagem_id.split("-");
        let idViagem = sounou[0];
        let casa_passageiro = sounou[1];

        if (casa_passageiro == 0) {

            await connection.query(`
            INSERT INTO list_passageiros (viagem_id, passageiro_id, created_at, updated_at) 
            VALUES (${idViagem}, ${passageiro_id}, NOW(), NOW());
        `,
                { type: connection.QueryTypes.INSERT });

        } else if (casa_passageiro == 1) {

            const paradaid = await connection.query(`
            SELECT * FROM paradas WHERE passageiro_id= ${passageiro_id}
        `,
            { type: connection.QueryTypes.SELECT });

            await connection.query(`
            INSERT INTO list_paradas (viagem_id, parada_id, created_at, updated_at) 
            VALUES (${idViagem}, ${paradaid[0].id}, NOW(), NOW());
        `,
                { type: connection.QueryTypes.INSERT });

                await connection.query(`
            INSERT INTO list_passageiros (viagem_id, passageiro_id, created_at, updated_at) 
            VALUES (${idViagem}, ${passageiro_id}, NOW(), NOW());
        `,
                { type: connection.QueryTypes.INSERT });
        }

        let arrai = [];
        let arrai2 = [];

        let require = `
        SELECT viagens.id,viagens.motorista_id,viagens.casa_passageiro,viagens.cidade,viagens.partida,viagens.destino,
        viagens.itinerario,viagens.horario
        FROM viagens,list_passageiros 
        WHERE viagens.id=${idViagem} AND viagens.id = list_passageiros.viagem_id`;

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });


        for (var i = 0; i < response.length; i++) {
            let points = await connection.query(`
                SELECT paradas.id,paradas.descricao,paradas.latitude,paradas.longitude FROM paradas, list_paradas 
                WHERE list_paradas.viagem_id = ${response[i].id} 
                AND list_paradas.parada_id = paradas.id;
            `,
                { type: connection.QueryTypes.SELECT });

            let data = {
                id: response[i].id,
                motorista_id: response[i].motorista_id,
                casa_passageiro: response[i].casa_passageiro,
                cidade: response[i].cidade,
                partida: response[i].partida,
                destino: response[i].destino,
                itinerario: response[i].itinerario,
                horario: response[i].horario,
                points
            }
            arrai.push(data);
        }

        for (var i = 0; i < arrai.length; i++) {
            let passageiros = await connection.query(`
            SELECT passageiros.id, passageiros.nome, passageiros.image, paradas.cidade FROM passageiros, list_passageiros, paradas 
            WHERE list_passageiros.viagem_id = ${arrai[i].id}
            AND list_passageiros.passageiro_id = passageiros.id
            AND paradas.id = passageiros.id
        `,
                { type: connection.QueryTypes.SELECT });

            let data = {
                id: arrai[i].id,
                motorista_id: response[i].motorista_id,
                casa_passageiro: arrai[i].casa_passageiro,
                cidade: arrai[i].cidade,
                partida: arrai[i].partida,
                destino: arrai[i].destino,
                itinerario: arrai[i].itinerario,
                horario: arrai[i].horario,
                points: arrai[i].points,
                passageiros
            }

            arrai2.push(data);

        }

        return res.json(arrai2[0]);
    }

}