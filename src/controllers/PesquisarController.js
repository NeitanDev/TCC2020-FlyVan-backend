const Passageiro = require('../models/Passageiros');
const Viagens = require('../models/Viagens');
const connection = require('../database/index');
const Vans = require('../models/Vans');
const Van_descricao = require('../models/Van_descricaos');
const { Op, QueryInterface } = require("sequelize");

module.exports = {

    async searchNome(req, res) {
        const { search } = req.body;

        const arei = search.split(" ");

        let require =
        `
            SELECT vans.id, van_descricaos.title, van_descricaos.image, 
            van_descricaos.descricao, vans.marca, vans.modelo, vans.ano,
            motoristas.nome, motoristas.cidade, vans.proprietario, 
            vans.id_proprietario, motoristas.image AS motoimage,
            motoristas.email, motoristas.whatsapp,
            (SELECT AVG(avaliacoes.avaliacao) FROM avaliacoes WHERE vans.id_proprietario=avaliacoes.motorista_id) AS media
            
            FROM vans, van_descricaos, motoristas, avaliacoes
            
            WHERE vans.id = van_descricaos.van_id
            AND vans.proprietario = 0
            AND vans.id_proprietario = motoristas.id
            AND vans.id_proprietario=avaliacoes.motorista_id
            AND van_descricaos.title LIKE 
        `;


        if (arei.length == 1) {
            require = require + `'%${arei[0]}%'`;
        } else if (arei.length > 1) {
            require = require + `'%${arei[0]}%' `;
            let cont = 1;
            while (cont < arei.length) {
                require = require + `AND title LIKE '%${arei[cont]}%' `;
                cont++;
            }
        }

        let require2 = `
            SELECT vans.id, van_descricaos.title, van_descricaos.image,
            van_descricaos.descricao, vans.marca, vans.modelo, vans.ano,
            empresas.nome,empresas.cidade, empresas.email,empresas.whatsapp, 
            vans.proprietario, vans.id_proprietario,
            (SELECT AVG(avaliacoes.avaliacao) FROM avaliacoes WHERE vans.id_proprietario=avaliacoes.motorista_id) AS media

            FROM vans, van_descricaos, empresas, avaliacoes

            WHERE vans.id = van_descricaos.van_id
            AND vans.proprietario = 1
            AND vans.id_proprietario = empresas.id
            AND vans.id_proprietario=avaliacoes.motorista_id
            AND van_descricaos.title LIKE 
        `;

        if (arei.length == 1) {
            require2 = require2 + `'%${arei[0]}%'`;
        } else if (arei.length > 1) {
            require2 = require2 + `'%${arei[0]}%' `;
            let cont = 1;
            while (cont < arei.length) {
                require2 = require2 + `AND title LIKE '%${arei[cont]}%' `;
                cont++;
            }
        }

        const response = await connection.query(`${require} ORDER BY media`,
            { type: connection.QueryTypes.SELECT });

        const response2 = await connection.query(`${require2} ORDER BY media`,
            { type: connection.QueryTypes.SELECT });

        const result = response.concat(response2);

        const values = result.filter(function (a) {
            return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
        }, Object.create(null));

        var cont2 = 0;
        while (cont2 < values.length) {
            // console.log(values[cont2].media);
            var seila = parseFloat(values[cont2].media);
            values[cont2].media = seila.toFixed(1);
            cont2++;
        }


        return res.json(values);
    },


    async searchTeste(req, res) {
        const { partida, destino, cidade, itinerario } = req.body;

        var arei = partida.split(" ");
        const arei2 = destino.split(" ");
        const arei3 = cidade.split(" ");
        const arei4 = itinerario.split(" ");
        let arrai = [];

        let require = `SELECT * ` +
            `FROM viagens WHERE id>0 `;

        if (partida == '');
        else if (partida != '') {
            let cont = 0;
            while (cont < arei.length) {
                require = require + `AND partida LIKE '%${arei[cont]}%' `;
                cont++;
            }
        }
        if (destino == '');
        else if (destino != '') {
            let cont = 0;
            while (cont < arei2.length) {
                require = require + `AND destino LIKE '%${arei2[cont]}%' `;
                cont++;
            }
        }
        if (cidade == '');
        else if (cidade != '') {
            let cont = 0;
            while (cont < arei3.length) {
                require = require + `AND cidade LIKE '%${arei3[cont]}%' `;
                cont++;
            }
        }
        if (itinerario == '');
        else if (itinerario != '') {
            let cont = 0;
            while (cont < arei4.length) {
                require = require + `AND itinerario LIKE '%${arei4[cont]}%' `;
                cont++;
            }
        }

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

        return res.json(arrai);
    },

    async viagemDeteils(req,res){
        const { id_viagem } = req.body;

        let require = `
        SELECT paradas.id,paradas.descricao,paradas.latitude,paradas.longitude FROM paradas, list_paradas 
        WHERE list_paradas.viagem_id = ${id_viagem} 
        AND list_paradas.parada_id = paradas.id
        `
        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);

    }

};