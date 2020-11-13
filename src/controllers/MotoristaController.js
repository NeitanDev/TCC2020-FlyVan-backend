const Motoristas = require('../models/Motoristas');
const Empresas = require('../models/Empresas');
const createId = require('../utils/createId');
const connection = require('../database/index');
const { solicitacao } = require('./PassageiroController');
const { addPassageiro } = require('./ViagemController');
// const { perfil } = require('./PassageiroController');

module.exports = {
    async creates(req, res) {
        // const { empresa_id } = req.params;
        const { nome, sobrenome, email, senha, cnh, whatsapp, cep,
            lougradouro, bairro, cidade, uf, numero, pertence, empresa_id } = req.body;
        const cod = createId();

        const motorista = await Motoristas.create({
            empresa_id,
            nome,
            sobrenome,
            cod,
            email,
            senha,
            cnh,
            whatsapp,
            image: `uploads/passageiros/profile.jpg`,
            cep,
            lougradouro,
            bairro,
            cidade,
            uf,
            numero,
            pertence
        });

        await connection.query(`
        INSERT INTO avaliacoes (avaliacao,motorista_id,passageiro_id) 
        VALUES (3, ${motorista.id}, 1);
        `, { type: connection.QueryTypes.INSERT });

        return res.json(motorista);
    },

    async list(req, res) {
        const motorista = await connection.query(
            "SELECT motoristas.nome, empresas.nome AS empresa, " +
            "motoristas.sobrenome, motoristas.email, motoristas.whatsapp " +
            "FROM motoristas, empresas " +
            "WHERE empresas.id = motoristas.empresa_id",
            { type: connection.QueryTypes.SELECT });

        return res.json(motorista);
    },

    async perfil(req, res) {
        const { id } = req.params;
        console.log("chamei essa bagaça")
        const motorista = await connection.query(`
        SELECT id,nome,sobrenome,cod,email,senha,cnh,whatsapp,image,cep,lougradouro,bairro,cidade,
        uf,numero,pertence,empresa_id,             
        (SELECT AVG(avaliacoes.avaliacao) FROM avaliacoes WHERE avaliacoes.motorista_id=${id}) AS nota  
        FROM motoristas WHERE motoristas.id = ${id}
        `,
            { type: connection.QueryTypes.SELECT });

        return res.json(motorista[0]);
    },

    async avaliar(req, res) {
        const { avaliacao, motorista_id, passageiro_id } = req.body;
        const nota = await connection.query(`
        INSERT INTO avaliacoes (avaliacao,motorista_id,passageiro_id) 
        VALUES (${avaliacao}, ${motorista_id}, ${passageiro_id});
        `,
            { type: connection.QueryTypes.INSERT });

        return res.json(nota);
    },

    async solicitacao(req, res) {
        const { motorista_id } = req.body;

        const solicitacao = await connection.query(`
        SELECT * FROM solicitacoes WHERE solicitacoes.motorista_id = ${motorista_id} AND solicitacoes.status != 'aceito'
        `,
            { type: connection.QueryTypes.SELECT });

        return res.json(solicitacao);
    },

    async mudaStatus(req, res) {
        const { id_solicitacao, status } = req.body;
        const solicitacao = await connection.query(`
        UPDATE solicitacoes SET status = '${status}' WHERE id = ${id_solicitacao}
        `,
            { type: connection.QueryTypes.UPDATE });

        return res.json({ Sounou: "teste" })
    },

    async solicitacaoDeteils(req, res) {
        const { viagem_id } = req.body;
        const solicitacao = await connection.query(`
        SELECT * FROM viagens WHERE id = ${viagem_id}
        `,
            { type: connection.QueryTypes.SELECT });

        return res.json(solicitacao[0]);
    },

    async incluirPassageiro(req, res) {
        const { viagem_id, passageiro_id } = req.body;
        const solicitacao = await connection.query(`
        INSERT INTO list_passageiros (viagem_id,passageiro_id,created_at,updated_at) 
        VALUES (${viagem_id}, ${passageiro_id},NOW(),NOW());
        `,
            { type: connection.QueryTypes.INSERT });

        await connection.query(`
        UPDATE solicitacoes 
        SET status = 'aceito' WHERE viagem_id= ${viagem_id} AND  passageiro_id=${passageiro_id};
        `,
            { type: connection.QueryTypes.UPDATE });

        return res.json(solicitacao);
    },

    async addPassageiroForCod(req,res){

        const { viagem_id,casa_passageiro,cod } = req.body;

        const passageiro_id = await connection.query(`
        SELECT * FROM passageiros WHERE cod = '${cod}'
    `,
        { type: connection.QueryTypes.SELECT });

        if (casa_passageiro == 0) {

            await connection.query(`
            INSERT INTO list_passageiros (viagem_id, passageiro_id, created_at, updated_at) 
            VALUES (${viagem_id}, ${passageiro_id[0].id}, NOW(), NOW());
        `,
                { type: connection.QueryTypes.INSERT });

        } else if (casa_passageiro == 1) {

            const paradaid = await connection.query(`
            SELECT * FROM paradas WHERE passageiro_id= ${passageiro_id[0].id}
        `,
            { type: connection.QueryTypes.SELECT });

            await connection.query(`
            INSERT INTO list_paradas (viagem_id, parada_id, created_at, updated_at) 
            VALUES (${viagem_id}, ${passageiro_id[0].id}, NOW(), NOW());
        `,
                { type: connection.QueryTypes.INSERT });

                await connection.query(`
            INSERT INTO list_passageiros (viagem_id, passageiro_id, created_at, updated_at) 
            VALUES (${viagem_id}, ${passageiro_id[0].id}, NOW(), NOW());
        `,
                { type: connection.QueryTypes.INSERT });
        }


        return res.json(passageiro_id[0])
    }
};