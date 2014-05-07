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
    var ready = data.ready;
    var set = data.set;
    var run = data.run;

    var parsedReady = PEG.parseMeta(ready);
    var parsedSet = PEG.parse(set);
    var parsedRun = PEG.parse(run);

    if(data.interprete) {
        res.render('create', {
            ready:  ready || '', set:      set || '', run:        run || '',
            c_meta: parsedReady, c_things: parsedSet, c_gameloop: parsedRun});
    } else if(data.compile) {
        res.render('game', { ready: parsedReady, set: parsedSet, run: parsedRun });
    }
});

// Launch the app
app.listen(port);
console.log('Server running on port %d', port);