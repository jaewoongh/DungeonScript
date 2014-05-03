// Setup express
var express         = require('express');
var app             = express();
var port            = process.env.PORT || 4444;
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
app.use(bodyParser());
app.use(cookieParser());

// Setup template engine
var expressHbs      = require('express3-handlebars');
var hbs             = expressHbs.create({
    defaultLayout:  'main',
    extname:        '.html',
    layoutsDir:     'views/layouts/',
    partialsDir:    'views/partials/'
});
app.engine('html', hbs.engine);
app.set('view engine', 'html');

// Setup pegjs
var PEG = require('./app/peg-parser.js');

// Static routes
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Manual routes
app.get('/', function(req, res) {
    res.redirect('/create');
});

app.get('/create', function(req, res) {
    res.render('create');
});

app.post('/create/interprete', function(req, res) {
    var data = req.body;
    var meta = data.meta;
    var things = data.things;
    var gameloop = data.gameloop;

    PEG.parseThings(things, function(parsed) {
        console.log(parsed);
    });
    res.redirect('/create');
});

// Launch the app
app.listen(port);
console.log('Server running on port %d', port);