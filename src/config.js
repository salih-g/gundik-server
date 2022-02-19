require('dotenv').config();

exports.MONGO_URL = process.env.MONGO_URL;
exports.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8080';
exports.PORT = process.env.PORT || 8081;
