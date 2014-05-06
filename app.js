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
    res.render('frontpage');
});

app.get('/documentation', function(req, res) {
    res.render('documentation');
});

app.get('/create', function(req, res) {
    res.render('create');
});

app.post('/create', function(req, res) {
    var data = req.body;
    var meta = data.meta;
    var things = data.things;
    var gameloop = data.gameloop;

    var parsedMeta = PEG.parseMeta(meta);
    var parsedThings = PEG.parse(things);
    var parsedGameloop = PEG.parse(gameloop);

    if(data.interprete) {
        res.render('create', {
            meta:   meta || '', things:   things || '', gameloop:   gameloop || '',
            c_meta: parsedMeta, c_things: parsedThings, c_gameloop: parsedGameloop});
    } else if(data.compile) {
        res.render('game', { meta: parsedMeta, set: parsedThings, loop: parsedGameloop });
    }
});

// Launch the app
app.listen(port);
console.log('Server running on port %d', port);