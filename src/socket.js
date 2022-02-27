const socketIO = require('socket.io');

const server = require('./server');
const { CLIENT_URL } = require('./config');

const io = socketIO(server, {
	cors: {
		origin: CLIENT_URL,
		methods: ['GET', 'POST', 'DELETE'],
		credentials: true,
	},
	allowEIO3: true,
});

let cacheWatchId = '';

io.on('connection', (socket) => {
	socket.on('play', () => {
		socket.broadcast.emit('start_playing');
	});

	socket.on('pause', () => {
		socket.broadcast.emit('stop_playing');
	});

	socket.on('video_change', (watchId) => {
		cacheWatchId = watchId;
		socket.broadcast.emit('watchId', watchId);
	});

	socket.on('get_watchId', () => {
		console.log(cacheWatchId != ' ' ? 'bos' : 'dolu');

		socket.broadcast.emit('watchId', cacheWatchId);
	});
});

module.exports = io;
