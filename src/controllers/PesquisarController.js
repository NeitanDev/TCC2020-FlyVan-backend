const Passageiro = require('../models/Passageiros');
const Viagens = require('../models/Viagens');
const connection = require('../database/index');
const Vans = require('../models/Vans');
const Van_descricao = require('../models/Van_descricaos');
const { Op, QueryInterface } = require("sequelize");

module.exports = {
    async searchDestino(req, res) {
        const { search } = req.body;

        const arei = search.split(" ");

        let require = `SELECT id, cidade , partida, destino, horario, motorista_id ` +
            `FROM viagens AS Viagens WHERE destino LIKE `;
        if (arei.length == 1) {
            require = require + `'%${arei[0]}%'`;
        } else if (arei.length > 1) {
            require = require + `'%${arei[0]}%' `;
            let cont = 1;
            while (cont < arei.length) {
                require = require + `AND destino LIKE '%${arei[cont]}%' `;
                cont++;
            }
        }

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async searchPartidaDestino(req, res) {
        const { partida, destino } = req.body;

        const arei = partida.split(" ");
        const arrai = destino.split(" ");

        let require = `SELECT * ` +
            `FROM viagens WHERE partida LIKE `;
        if (arei.length == 1) {
            require = require + `'%${arei[0]}%'`;
        } else if (arei.length > 1) {
            require = require + `'%${arei[0]}%' `;
            let cont = 1;
            while (cont < arei.length) {
                require = require + `AND partida LIKE '%${arei[cont]}%' `;
                cont++;
            }
        }

        if (arrai.length == 1) {
            require = require + ` AND destino LIKE '%${arrai[0]}%'`;
        } else if (arrai.length > 1) {
            require = require + ` AND destino LIKE '%${arrai[0]}%' `;
            let cont = 1;
            while (cont < arrai.length) {
                require = require + `AND destino LIKE '%${arrai[cont]}%' `;
                cont++;
            }
        }

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async searchNome(req, res) {
        const { search } = req.body;

        const arei = search.split(" ");

        let require = `SELECT * ` +
            `FROM van_descricaos, vans WHERE vans.id = van_id AND title LIKE `;
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

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async searchMotorista(req, res) {
        const { search } = req.body;

        const arei = search.split(" ");

        let require = `SELECT * ` +
            `FROM van_descricaos WHERE title LIKE `;
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

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async searchCidade(req, res) {
        const { search } = req.body;

        const arei = search.split(" ");

        let require = `SELECT id, cidade , partida, destino, horario, itinerario, motorista_id ` +
            `FROM viagens AS Viagens WHERE cidade LIKE `;
        if (arei.length == 1) {
            require = require + `'%${arei[0]}%'`;
        } else if (arei.length > 1) {
            require = require + `'%${arei[0]}%' `;
            let cont = 1;
            while (cont < arei.length) {
                require = require + `AND cidade LIKE '%${arei[cont]}%' `;
                cont++;
            }
        }

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async searchItinerario(req, res) {
        const { search } = req.body;

        const arei = search.split(" ");

        let require = `SELECT * ` +
            `FROM viagens WHERE partida LIKE `;
        if (arei.length == 1) {
            require = require + `'%${arei[0]}%'`;
        } else if (arei.length > 1) {
            require = require + `'%${arei[0]}%' `;
            let cont = 1;
            while (cont < arei.length) {
                require = require + `AND itinerario LIKE '%${arei[cont]}%' `;
                cont++;
            }
        }

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },

    async searchTeste(req,res){
        const { partida,destino,cidade,itinerario } = req.body;

        var arei = partida.split(" ");
        const arei2 = destino.split(" ");
        const arei3 = cidade.split(" ");
        const arei4 = itinerario.split(" ");

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

        return res.json(response);
    }

};