/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function () {
	console.log("SERVIDOR ON")
})

var io = require('socket.io').listen(server);

app.set('io', io);

/*Criar a conexão por websocket */
io.on('connection', function (socket) {
	console.log('Usuario conectou');

	socket.on('disconnect', function () {
		console.log('Usuario desconectou');
	});

	socket.on('msgParaServidor', function (data) {

		

		/* dialogo */
		socket.emit(
			'msgParaCliente',
			{ apelido: data.apelido, mensagem: data.mensagem }
		);

		socket.broadcast.emit(
			'msgParaCliente',
			{ apelido: data.apelido, mensagem: data.mensagem }
		);


		/*Participantes */
		if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
			socket.emit(
				'participantesParaCliente',
				{ apelido: data.apelido }
			);

			socket.broadcast.emit(
				'participantesParaCliente',
				{ apelido: data.apelido }
			);
		}
	});

})