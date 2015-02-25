var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var routes = require('./routes/');
var bodyParser = require('body-parser');
var app = express();
var socketio = require('socket.io');
var server = app.listen(3001);
var io = socketio.listen(server);
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// //parse application/json
// app.use(bodyParser.json());

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// });

app.use('/', routes(io));
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname +'/views');

swig.setDefaults({ cache: false });