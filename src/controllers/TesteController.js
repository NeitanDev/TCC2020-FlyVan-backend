const { json } = require("sequelize");

module.exports = {
    async sounou(req, res) {
        // console.log(req.file);
        const { filename } = req.file;
        return res.json(req.body);
    },
    async desespero(req, res) {
        // console.log(req.file);
        const { cnpj } = req.body;
        return res.json(cnpj);
    },
};