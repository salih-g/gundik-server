const compress = require('compression');
const volleyball = require('volleyball');
const express = require('express');
const cors = require('cors');

const app = express();

//Services
const { list } = require('./services');

app.use(volleyball);
// app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('etag');

//Public
app.use('/list', list);

module.exports = app;
