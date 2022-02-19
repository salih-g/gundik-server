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
	console.log(socket.id);

	// socket.on('pause', () => {
	// 	socket.broadcast.to(socket.curRoom).emit('pause');
	// });
	// socket.on('play', () => {
	// 	socket.broadcast.to(socket.curRoom).emit('play');
	// });
	// socket.on('video id', (videoId) => {
	// 	socket.broadcast.to(socket.curRoom).emit('video id', videoId);
	// });
	// socket.on('timestamp', (timestamp) => {
	// 	socket.broadcast.to(socket.curRoom).emit('timestamp', timestamp);
	// });
});
