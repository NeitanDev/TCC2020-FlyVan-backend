const connection = require('../database/index');

module.exports = {
    async resultAutonomo(req, res) {
        const {motoID}=req.body;

        console.log(motoID);

        let require = 
        `
            SELECT * FROM viagens WHERE viagens.motorista_id = ${motoID}
        `;

        const response = await connection.query(`${require}`,
            { type: connection.QueryTypes.SELECT });

        return res.json(response);
    },
    async resultEmpresa(req,res){

    }
};