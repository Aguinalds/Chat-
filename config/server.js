/* importar o módulo framework express */

var express = require('express');

/* importar o módulo do consing */

var consing = require('consign');

/*importar o módulo body-parser */

var bodyParser = require('body-parser');

/* importar o módulo express-validator */

var expressValidator = require('express-validator');

/* iniciar o objeto do express */

var app = express();

/* setar as variaveis 'view engine' e 'views' do express */

app.set('view engine', 'ejs');
app.set('views', './app/views');

/*configurar o middleware express.static */

app.use(express.static('./app/public'));

/* configurar o middleware bodyparser */

app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */

app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para objeto app */

consing()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* exportar o objeto app */

module.exports = app;