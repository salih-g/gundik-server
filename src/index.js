const socketIO = require('socket.io');

const logger = require('./logger');
const server = require('./server');
const { PORT, CLIENT_URL } = require('./config');

const io = socketIO(server, {
	cors: {
		origin: CLIENT_URL,
		methods: ['GET', 'POST'],
		credentials: true,
	},
	allowEIO3: true,
});

process.on('unhandledRejection', (reason, p) =>
	logger.error('Unhandled Rejection at: Promise ', p, reason),
);

server.on('listening', () =>
	logger.info(`App started on:http://localhost:${PORT}`),
);

io.on('connection', (socket) => {
	socket.on('play', () => {
		socket.broadcast.emit('start_playing');
	});

	socket.on('pause', () => {
		socket.broadcast.emit('stop_playing');
	});

	socket.on('video_change', (watchId) => {
		socket.broadcast.emit('watchId', watchId);
	});
	// socket.on('timestamp', (timestamp) => {
	// 	socket.broadcast.to(socket.curRoom).emit('timestamp', timestamp);
	// });
});
