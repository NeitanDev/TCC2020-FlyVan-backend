const express = require('express');

const app = express();

app.use(express.json());

app.get('/driver', (req, res) => {
    res.json({ hello: "Word" });
});

app.listen(3333);