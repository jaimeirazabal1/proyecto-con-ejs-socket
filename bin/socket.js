module.exports = function(io,app){
	const KEY = 'nome-do-cookie';
	const SECRET = 'llave-secreta-aqui!';

	var store = app.get("store");
	var cookie = app.get("cookie");

	io.use(function(socket, next) {
		var data = socket.request;

		cookie(data, {}, function(err) {
		    var sessionID = data.signedCookies[KEY];
		    store.get(sessionID, function(err, session) {
		    	//console.log(err,session)
		    	if (err || !session) {
		    		console.log("Acceso negado")
		    		return next(new Error('Acesso negado!'));
		    	} else {
		    		socket.handshake.session = session;
		    		return next();
		    	}
			});
		});
	});

	io.on('connection', function (socket) {
		var session = socket.handshake.session;
		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
			console.log(data);
		});
	});
}