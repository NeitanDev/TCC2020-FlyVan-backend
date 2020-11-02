const connection = require('../database/index');


module.exports = {
    async createEmbarque(req, res) {

        const { partida, partidaLatitude, partidaLongitude, destino, destinoLatitude, destinoLongitude,
            cidade, itinerario, horario, motorista_id, casa_passageiro, points
        } = req.body;

        const viagemID = await connection.query(`INSERT INTO viagens (motorista_id, casa_passageiro, cidade, partida,destino,itinerario,horario,created_at,updated_at)
        VALUES (${motorista_id}, 0,'${cidade}', '${partida}','${destino}','${itinerario}','${horario}',NOW(),NOW());`,
            { type: connection.QueryTypes.INSERT });

        let listParadasId = [];

        const partidaID = await connection.query(`INSERT INTO paradas (passageiro_id, descricao, latitude, longitude,created_at,updated_at)
        VALUES (0, 'partida',${partidaLatitude}, ${partidaLongitude},NOW(),NOW());`,
            { type: connection.QueryTypes.INSERT });

        const destinoID = await connection.query(`
        INSERT INTO paradas (passageiro_id, descricao, latitude, longitude,created_at,updated_at)
        VALUES (0, 'destino',${destinoLatitude}, ${destinoLongitude},NOW(),NOW());`,
            { type: connection.QueryTypes.INSERT });

        listParadasId.push(partidaID[0]
            , destinoID[0]
        );

        for (var i = 0; i < points.length; i++) {
            let newParada = await connection.query(`
            INSERT INTO paradas (passageiro_id, descricao, latitude, longitude,created_at,updated_at)
            VALUES (0, 'parada',${points[i].latitude}, ${points[i].longitude},NOW(),NOW());`,
                { type: connection.QueryTypes.INSERT });

            listParadasId.push(newParada[0]);

        }

        for (var i = 0; i < listParadasId.length; i++) {
            let itemlist = await connection.query(`
            INSERT INTO list_paradas (parada_id, viagem_id, created_at,updated_at)
            VALUES (${listParadasId[i]}, ${viagemID[0]},NOW(),NOW());`,
                { type: connection.QueryTypes.INSERT });
        }

        const data = await connection.query(`
                SELECT paradas.id,paradas.descricao,paradas.latitude,paradas.longitude FROM paradas, list_paradas 
                WHERE list_paradas.viagem_id = ${viagemID[0]} 
                AND list_paradas.parada_id = paradas.id;
            `,
            { type: connection.QueryTypes.SELECT });

        return res.json({ id: viagemID[0], points: data });
    },

    async createCreateCasa_passageiro(req, res) {
        const { partida, partidaLatitude, partidaLongitude, destino, destinoLatitude, destinoLongitude,
            cidade, itinerario, horario, motorista_id, casa_passageiro, points
        } = req.body;

        const viagemID = await connection.query(`INSERT INTO viagens (motorista_id, casa_passageiro, cidade, partida,destino,itinerario,horario,created_at,updated_at)
        VALUES (${motorista_id}, 1,'${cidade}', '${partida}','${destino}','${itinerario}','${horario}',NOW(),NOW());`,
            { type: connection.QueryTypes.INSERT });

        let listParadasId = [];

        const partidaID = await connection.query(`INSERT INTO paradas (passageiro_id, descricao, latitude, longitude,created_at,updated_at)
        VALUES (0, 'partida',${partidaLatitude}, ${partidaLongitude},NOW(),NOW());`,
            { type: connection.QueryTypes.INSERT });

        const destinoID = await connection.query(`
        INSERT INTO paradas (passageiro_id, descricao, latitude, longitude,created_at,updated_at)
        VALUES (0, 'destino',${destinoLatitude}, ${destinoLongitude},NOW(),NOW());`,
            { type: connection.QueryTypes.INSERT });

        listParadasId.push(partidaID[0]
            , destinoID[0]
        );

        // for (var i = 0; i < points.length; i++) {
        //     let newParada = await connection.query(`
        //     INSERT INTO paradas (passageiro_id, descricao, latitude, longitude,created_at,updated_at)
        //     VALUES (0, 'parada',${points[i].latitude}, ${points[i].longitude},NOW(),NOW());`,
        //         { type: connection.QueryTypes.INSERT });

        //     listParadasId.push(newParada[0]);

        // }

        for (var i = 0; i < listParadasId.length; i++) {
            let itemlist = await connection.query(`
            INSERT INTO list_paradas (parada_id, viagem_id, created_at,updated_at)
            VALUES (${listParadasId[i]}, ${viagemID[0]},NOW(),NOW());`,
                { type: connection.QueryTypes.INSERT });
        }

        const data = await connection.query(`
                SELECT paradas.id,paradas.descricao,paradas.latitude,paradas.longitude FROM paradas, list_paradas 
                WHERE list_paradas.viagem_id = ${viagemID[0]} 
                AND list_paradas.parada_id = paradas.id;
            `,
            { type: connection.QueryTypes.SELECT });

        return res.json({ id: viagemID[0], points: data });
    },

    async listViagensAppMotorista(req, res) {
        const { id } = req.body;
        let arrai = [];
        let arrai2 = [];
        let arrei = [];
        let arrei2 = [];
        let arraiFinal = [];

        let require = `SELECT * FROM viagens WHERE viagens.motorista_id = ${id} AND viagens.casa_passageiro = 0`;

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        let require2 = `SELECT * FROM viagens WHERE viagens.motorista_id = ${id} AND viagens.casa_passageiro = 1;`

        const response2 = await connection.query(`${require2}`,
            { type: connection.QueryTypes.SELECT });

        for (var i = 0; i < response2.length; i++) {
            let passageiros = await connection.query(`
            SELECT passageiros.id,paradas.descricao,paradas.latitude,paradas.longitude, paradas.logradouro AS rua,
            paradas.bairro, paradas.cidade, paradas.numero, passageiros.nome, passageiros.image 
            FROM paradas, list_paradas, passageiros 
            WHERE list_paradas.viagem_id = ${response2[i].id} 
            AND list_paradas.parada_id = paradas.id
            AND paradas.passageiro_id = passageiros.id;
            `,
                { type: connection.QueryTypes.SELECT });


            let partidaDestino = await connection.query(`
                SELECT paradas.id,paradas.descricao,paradas.latitude,paradas.longitude FROM paradas, list_paradas 
                WHERE list_paradas.viagem_id = ${response2[i].id} 
                AND list_paradas.parada_id = paradas.id 
                AND paradas.descricao != 'passageiro';
                `,
                { type: connection.QueryTypes.SELECT });

            let listPontos = [...passageiros, ...partidaDestino];


            let data = {
                id: response2[i].id,
                casa_passageiro: response2[i].casa_passageiro,
                cidade: response2[i].cidade,
                partida: response2[i].partida,
                destino: response2[i].destino,
                itinerario: response2[i].itinerario,
                horario: response2[i].horario,
                passageiros,
                points: listPontos
            }


            arrei.push(data);
        }

        for (var i = 0; i < response.length; i++) {
            let points = await connection.query(`
                SELECT paradas.id,paradas.descricao,paradas.latitude,paradas.longitude FROM paradas, list_paradas 
                WHERE list_paradas.viagem_id = ${response[i].id} 
                AND list_paradas.parada_id = paradas.id;
            `,
                { type: connection.QueryTypes.SELECT });

            let data = {
                id: response[i].id,
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


        for (var i = 0; i < arrei.length; i++) {
            let pontosSemSerODestinoEPartida = arrei[i].points.filter(inc => inc.descricao !== 'partida' && inc.descricao !== 'destino');
            let pontoPartida = arrei[i].points.filter(inc => inc.descricao == 'partida')[0];

            for (var j = 0; j < pontosSemSerODestinoEPartida.length; j++) {

                let distancia=Math.sqrt(
                    Math.pow(pontoPartida.latitude - pontosSemSerODestinoEPartida[j].latitude, 2)
                    +
                    Math.pow(pontoPartida.longitude - pontosSemSerODestinoEPartida[j].longitude, 2)
                );

                arrei[i].points[j]['distancia']=distancia;
            }


            arrei[i].points.sort(function compare(a,b) {
                if (a.distancia < b.distancia)
                   return -1;
                if (a.distancia > b.distancia)
                  return 1;
                return 0;
              })

        }

        arraiFinal = arrai2.concat(arrei);

        return res.json(arraiFinal);
    },

    async listViagensAppPassageiro(req, res) {

        const { id } = req.body;
        let arrai = [];
        let arrai2 = [];
        let arrei = [];
        let arrei2 = [];
        let arraiFinal = [];

        let require = `
        SELECT viagens.id,viagens.motorista_id,viagens.casa_passageiro,viagens.cidade,viagens.partida,viagens.destino,
        viagens.itinerario,viagens.horario
        FROM viagens,list_passageiros WHERE list_passageiros.passageiro_id=${id} AND viagens.id = list_passageiros.viagem_id`;

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

        return res.json(arrai2);
    },

    async cancelaViagem(req, res) {

        const { id_passageiro, id_viagem } = req.body;

        let require = `
        INSERT INTO cancelarviagem (id_passageiro, id_viagem, dia) 
        VALUES (${id_passageiro}, ${id_viagem}, NOW() );
        `;

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.INSERT });

        return res.json(response);
    },

    async listpessoasNaoIrao(req,res){
        const {id_viagem} = req.body

        let require = `
        SELECT cancelarviagem.id_passageiro 
        FROM cancelarviagem 
        WHERE cancelarviagem.id_viagem = ${id_viagem} 
        AND cancelarviagem.dia =  DATE(NOW())
        `;

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

            let newArrey = [];

            for (var i = 0; i < response.length; i++){
                newArrey[i] = response[i].id_passageiro;
            }

        return res.json(newArrey);
    }
}