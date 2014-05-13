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

    var parsedReady = ready ? PEG.parseReady(ready) : '';
    var parsedSet = set ? PEG.parseSet(set) : '';
    var parsedRun = run ? PEG.parseRun(run) : '';

    if(parsedReady['error'] || parsedSet['error'] || parsedRun['error']) {
        res.render('game');
    }

    res.render('game', { ready: parsedReady, set: parsedSet, run: parsedRun });
});

app.post('/createAjax', function(req, res) {
    var data = req.body;
    var ready = data.ready;
    var set = data.set;
    var run = data.run;

    var parsedReady = ready ? PEG.parseReady(ready) : '';
    var parsedSet = set ? PEG.parseSet(set) : '';
    var parsedRun = run ? PEG.parseRun(run) : '';

    console.log('READY: ', parsedReady);
    console.log('SET: ', parsedSet);
    console.log('RUN: ', parsedRun);

    parsedReady = parsedReady['error'] ? parsedReady['error'] : '';
    parsedSet = parsedSet['error'] ? parsedSet['error'] : '';
    parsedRun = parsedRun['error'] ? parsedRun['error'] : '';

    res.send({cReady: parsedReady, cSet: parsedSet, cRun: parsedRun});
});

// Launch the app
app.listen(port);
console.log('Server running on port %d', port);