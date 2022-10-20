const compress = require('compression');
const volleyball = require('volleyball');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization',
	);
	next();
});

//Services
const { list, user } = require('./services');

app.use(volleyball);
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('etag');

//Public
app.use('/list', list);
app.use('/user', user);

module.exports = app;
