const express = require('express');
const path = require('path');
const routes = require('./routes');

require('./database/index');

const app = express();

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(process.env.PORT || 3333);