// Setup
var PEG             = require('pegjs');
var sugar           = require('sugar');

// Grammar
var commonRule      = "                                                                                                                                                                                         \
    comment         = '☃' [^☃]* '☃' space                           { return }                                                                                                                                  \
                                                                                                                                                                                                                \
    value           = v:(literal / charmChain)                      { return '('+v+')' }    \
    charmChain      = p:charmPrefix? a:legalText b:('.' legalText)* { for(var i=0;i<(b.length);i++){b[i]=b[i].join('')} return (p?(p=='@'?'queryThings({'+a+':true})':p+a):a)+b.join('') }  \
    charmPrefix     = '.' { return 'this.' } / '~' { return 'sender.' } / '@'   \
    \
    block           = '(' space a:(block / value) b:(SPACE mathOp SPACE (block / value))* space ')' \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃').join('')} return a+b.join('') }  \
    mathOp          = [-+*/]    \
    queryOp         = o:('=' / '>=' / '<=' / '>' / '<' / '!=')      { return o=='='?'==':o }                                                                                                                    \
    \
    literal         = number / remove / bool / string                                                                                                                                                           \
                                                                                                                                                                                                                \
    string          = doubleQuot / singleQuot                                                                                                                                                                   \
    doubleQuot      = '\"' s:(looseLegalChar / \"'\")* '\"'         { return \"'\"+s.join('')+\"'\" }                                                                                                           \
    singleQuot      = \"'\" s:(looseLegalChar / '\"')* \"'\"        { return \"'\"+s.join('')+\"'\" }                                                                                                           \
    looseLegalChar  = c:[^'\"]                                      { return c.replace('\\r','\\\\') }                                                                                                          \
    legalChar       = c:[a-zA-Z0-9_-]                               { return c=='-'?'$':c }                                                                                                                     \
    legalText       = t:legalChar+                                  { return t.join('') }                                                                                                                       \
                                                                                                                                                                                                                \
    remove          = c:'remove'                                    { return 'undefined' }                                                                                                                      \
    bool            = 'true' / 'false'                                                                                                                                                                          \
                                                                                                                                                                                                                \
    number          = real / integer                                                                                                                                                                            \
    integer         = s:'-'? d:digit+                               { return parseInt(s?s:'' +d.join(''), 10) }                                                                                                 \
    real            = s:'-'? i:digit* '.' f:digit+                  { return parseFloat(s?s:'' +i.join('')+'.'+f.join(''), 10) }                                                                                \
    digit           = [0123456789]                                                                                                                                                                              \
                                                                                                                                                                                                                \
    delimiter       = ' '* [,\\n\\r]+                               { return '☃' }                                                                                                                              \
    space           = [ \\n\\r]*                                    { return '☃' }                                                                                                                              \
    SPACE           = [ \\n\\r]+ / !.                               { return '☃' }                                                                                                                              \
    linebreak       = [\\n\\r]+ / !.                                { return '☃' }                                                                                                                              \
";

var readyParser     = PEG.buildParser("                                                                                                                                                                         \
    start           = SPACE* p:(comment / metaCharms)*              { return p.join('') }                                                                                                                       \
                                                                                                                                                                                                                \
    metaCharms      = a:charming b:(delimiter space charming)* space                                                                                                                                            \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return 'queryThings({meta:true},function(sender){'+a+(b[0]?';':'')+b.join(';')+'});' } \
                                                                                                                                                                                                                \
    charming        = charmAssign / charmTag                                                                                                                                                                    \
    charmTag        = t:legalText                                   { return 'this.'+t+'=true' }                                                                                                                \
    charmAssign     = c:legalText space ':' space v:value           { return 'this.'+c+'='+v }                                                                                                                  \
"+commonRule);

var setParser       = PEG.buildParser(" \
    start           = SPACE* p:(comment / things)*                  { return p.join('') }   \
    \
    things          = p:thingDef+                                   { return p.join('') }   \
    thingDef        = '{' space a:charming b:(delimiter space charming)* space '}' space    \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return 'things.push({'+a+(b?',':'')+b.join(',')+'});' } \
    \
    charming        = charmAssign / charmTag    \
    charmTag        = t:legalText                                   { return t+':true' }    \
    charmAssign     = c:legalText space ':' space v:(block / value) { return c+':'+v }      \
"+commonRule);

var runParser       = PEG.buildParser(" \
    start           = SPACE* comment? p:doings+                     { for(var i=0;i<(p.length);i++){p[i]='queries.push(function(){'+p[i]+'});'} return p.join('') }   \
    dododo          = a:(doings / does) b:(delimiter space (doings / does))*                \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return a+b.join('') }   \
    doings          = a:(comment / remoteCharming / queryAndDo) b:(delimiter space (comment / remoteCharming / queryAndDo))*   \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return a+b.join('') }   \
    \
    queryAndDo      = q:queries space '{' space d:dododo space '}'   \
                                                                    { return 'queryThings.call(this,{'+q+'},function(sender){'+d+'},true);' }  \
    queries         = a:query b:(delimiter space query)*            { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return a+(b[0]?',':'')+b.join(',') }    \
    query           = queryQuery / tagQuery     \
    queryQuery      = c:legalText space o:queryOp space v:(block / value)     { return c+':function(a){return a'+o+v+'}' }    \
    tagQuery        = n:'!'? t:legalText                            { return n=='!'?(t+':undefined'):(t+':true') }  \
    \
    does            = a:(localDo / superDo) b:(delimiter space (localDo / superDo))*                                                                                                                            \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return a+b.join('') }                                                               \
                                                                                                                                                                                                                \
    localDo         = localAssign / localTag                                                                                                                                                                    \
    localTag        = '.' t:legalText                               { return 'this.'+t+'=true;' }                                                                                                               \
    localAssign     = '.' c:legalText space ':' space v:(block / value)       { return 'this.'+c+'='+v+';' }                                                                                                              \
                                                                                                                                                                                                                \
    superDo         = superAssign / superTag                                                                                                                                                                    \
    superTag        = '~' t:legalText                               { return 'sender.'+t+'=true;' }                                                                                                             \
    superAssign     = '~' c:legalText space ':' space v:(block / value)       { return 'sender.'+c+'='+v+';' }                                                                                                            \
    \
    remoteCharming  = q:queries space '<~' space '{' space d:dododo space '}'    \
                                                                    { return 'todo.push(queryThings.bind(this,{'+q+'},function(sender){'+d+'},true));' }                                                             \
"+commonRule)


// Export functions
exports.parseReady = function(code, callback) {
    try {
        if(callback) callback(undefined, readyParser.parse(code));
        else return readyParser.parse(code);
    } catch(err) {
        if(callback) callback(buildErrorMessage(err));
        else return buildErrorMessage(err);
    }
}

exports.parseSet = function(code, callback) {
    try {
        if(callback) callback(undefined, setParser.parse(code));
        else return setParser.parse(code);
    } catch(err) {
        if(callback) callback(buildErrorMessage(err));
        else return buildErrorMessage(err);
    }
}

exports.parseRun = function(code, callback) {
    try {
        if(callback) callback(undefined, runParser.parse(code));
        else return runParser.parse(code);
    } catch(err) {
        if(callback) callback({error: buildErrorMessage(err)});
        else return {error: buildErrorMessage(err)};
    }
}

// Build error message using html tag
function buildErrorMessage(e) {
    return '<span style="color:red">'+(e.line !== undefined && e.column !== undefined
        ? '[' + e.line + ':' + e.column + '] ' + e.message
        : e.message)+'</span>';
}