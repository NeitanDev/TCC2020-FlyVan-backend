module.exports = {
    async sounou(req, res) {
        console.log(req.file);
        return res.json(req.body);
    },
};