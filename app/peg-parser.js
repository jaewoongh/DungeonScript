// Setup
var PEG             = require('pegjs');

// Grammar
var mainParser      = PEG.buildParser("                                                                                                                                                     \
    start           = things / gameloop                                                                                                                                                     \
                                                                                                                                                                                            \
    things          = p:thingDef+                                   { return p.join('') }                                                                                                   \
                                                                                                                                                                                            \
    thingDef        = '{' space a:charming b:(delimiter space charming)* space '}' space                                                                                                    \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return 'things.push({'+a+(b?',':'')+b.join(',')+'});' }         \
                                                                                                                                                                                            \
    charming        = charmAssign / charmTag                                                                                                                                                \
    charmTag        = t:legalText                                   { return t+':true' }                                                                                                    \
    charmAssign     = c:legalText space ':' space v:value           { return c+':'+v }                                                                                                      \
                                                                                                                                                                                            \
    value           = literalChain / charmChain                                                                                                                                             \
    charmChain      = p:charmPrefix? a:legalText b:('.' legalText)* { for(var i=0;i<(b.length);i++){b[i]=b[i].join('')} return (p?(p=='@'?'queryThings({'+a+':true})':p+a):a)+b.join('') }  \
    charmPrefix     = '.' { return 'this.' } / '~' { return 'sender.' } / '@'                                                                                                               \
    literalChain    = a:(block / literal) b:(space mathOp space (block / literal))*                                                                                                         \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃').join('')} return a+b.join('') }                                  \
    block           = '(' space l:literalChain space ')'            { return '('+l+')' }                                                                                                    \
    mathOp          = [-+*/]                                                                                                                                                                \
                                                                                                                                                                                            \
    gameloop        = p:queryAndDo+                                 { return p.join('') }                                                                                                   \
                                                                                                                                                                                            \
    queryAndDo      = q:queries space '{' space d:does space '}'    { return 'queryThings.bind(this,{'+q+'},function(sender){'+d+'});' }                                                    \
                                                                                                                                                                                            \
    queries         = a:query b:(delimiter space query)*            { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return a+(b?',':'')+b.join(',') }                               \
    query           = queryQuery / tagQuery                                                                                                                                                 \
    tagQuery        = n:'!'? t:legalText                            { return n=='!'?(t+':undefined'):(t+':true') }                                                                          \
    queryQuery      = c:legalText space o:queryOp space v:value     { return c+':function(a){return a'+o+v+'}' }                                                                            \
    queryOp         = o:('=' / '>=' / '<=' / '>' / '<' / '!=')      { return o=='='?'==':o }                                                                                                \
                                                                                                                                                                                            \
    does            = a:(localDo / superDo / sendCharm) b:(delimiter space (localDo / superDo / sendCharm))*                                                                                \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return a+b.join('') }                                           \
                                                                                                                                                                                            \
    localDo         = localAssign / localTag                                                                                                                                                \
    localTag        = '.' t:legalText                               { return 'this.'+t+'=true;' }                                                                                           \
    localAssign     = '.' c:legalText space ':' space v:value       { return 'this.'+c+'='+v+';' }                                                                                          \
                                                                                                                                                                                            \
    superDo         = superAssign / superTag                                                                                                                                                \
    superTag        = '~' t:legalText                               { return 'sender.'+t+'=true;' }                                                                                         \
    superAssign     = '~' c:legalText space ':' space v:value       { return 'sender.'+c+'='+v+';' }                                                                                        \
                                                                                                                                                                                            \
    sendCharm       = q:queries space '<~' space '{' space d:does space '}'                                                                                                                 \
                                                                    { return 'todo.push(queryThings.bind(this,{'+q+'},function(sender){'+d+'}));' }                                         \
                                                                                                                                                                                            \
    literal         = number / remove / bool / string                                                                                                                                       \
                                                                                                                                                                                            \
    string          = doubleQuot / singleQuot                                                                                                                                               \
    doubleQuot      = '\"' s:(looseLegalChar / \"'\")* '\"'         { return \"'\"+s.join('')+\"'\" }                                                                                       \
    singleQuot      = \"'\" s:(looseLegalChar / '\"')* \"'\"        { return \"'\"+s.join('')+\"'\" }                                                                                       \
    looseLegalChar  = [^'\"]                                                                                                                                                                \
    legalChar       = c:[a-zA-Z0-9_-]                               { return c=='-'?'$':c }                                                                                                 \
    legalText       = t:legalChar+                                  { return t.join('') }                                                                                                   \
                                                                                                                                                                                            \
    remove          = c:'remove'                                    { return 'undefined' }                                                                                                  \
    bool            = 'true' / 'false'                                                                                                                                                      \
                                                                                                                                                                                            \
    number          = real / integer                                                                                                                                                        \
    integer         = s:'-'? d:digit+                               { return parseInt(s?s:'' +d.join(''), 10) }                                                                             \
    real            = s:'-'? i:digit* '.' f:digit+                  { return parseFloat(s?s:'' +i.join('')+'.'+f.join(''), 10) }                                                            \
    digit           = [0123456789]                                                                                                                                                          \
                                                                                                                                                                                            \
    delimiter       = ' '* [,\\n\\r]+                               { return '☃' }                                                                                                          \
    space           = [ \\n\\r]*                                    { return '☃' }                                                                                                          \
    SPACE           = [ \\n\\r]+ / !.                               { return '☃' }                                                                                                          \
");

var metaParser      = PEG.buildParser("                                                                                                                                                     \
    start           = p:metaCharms+                                 { return p.join('') }                                                                                                   \
                                                                                                                                                                                            \
    metaCharms      = '{' space a:charming b:(delimiter space charming)* space '}' space                                                                                                    \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃')} return 'things.push({'+a+(b?',':'')+b.join(',')+'});' }         \
                                                                                                                                                                                            \
    charming        = charmAssign / charmTag                                                                                                                                                \
    charmTag        = t:legalText                                   { return t+':true' }                                                                                                    \
    charmAssign     = c:legalText space ':' space v:value           { return c+':'+v }                                                                                                      \
                                                                                                                                                                                            \
    value           = literalChain / charmChain                                                                                                                                             \
    charmChain      = p:charmPrefix? a:legalText b:('.' legalText)* { for(var i=0;i<(b.length);i++){b[i]=b[i].join('')} return (p?(p=='@'?'queryThings({'+a+':true})':p+a):a)+b.join('') }  \
    charmPrefix     = '.' { return 'this.' } / '~' { return 'sender.' } / '@'                                                                                                               \
    literalChain    = a:(block / literal) b:(space mathOp space (block / literal))*                                                                                                         \
                                                                    { for(var i=0;i<(b.length);i++){b[i]=b[i].exclude('☃').join('')} return a+b.join('') }                                  \
    block           = '(' space l:literalChain space ')'            { return '('+l+')' }                                                                                                    \
    mathOp          = [-+*/]                                                                                                                                                                \
                                                                                                                                                                                            \
    literal         = number / remove / bool / string                                                                                                                                       \
                                                                                                                                                                                            \
    string          = doubleQuot / singleQuot                                                                                                                                               \
    doubleQuot      = '\"' s:(looseLegalChar / \"'\")* '\"'         { return \"'\"+s.join('')+\"'\" }                                                                                       \
    singleQuot      = \"'\" s:(looseLegalChar / '\"')* \"'\"        { return \"'\"+s.join('')+\"'\" }                                                                                       \
    looseLegalChar  = [^'\"]                                                                                                                                                                \
    legalChar       = c:[a-zA-Z0-9_-]                               { return c=='-'?'$':c }                                                                                                 \
    legalText       = t:legalChar+                                  { return t.join('') }                                                                                                   \
                                                                                                                                                                                            \
    remove          = c:'remove'                                    { return 'undefined' }                                                                                                  \
    bool            = 'true' / 'false'                                                                                                                                                      \
                                                                                                                                                                                            \
    number          = real / integer                                                                                                                                                        \
    integer         = s:'-'? d:digit+                               { return parseInt(s?s:'' +d.join(''), 10) }                                                                             \
    real            = s:'-'? i:digit* '.' f:digit+                  { return parseFloat(s?s:'' +i.join('')+'.'+f.join(''), 10) }                                                            \
    digit           = [0123456789]                                                                                                                                                          \
                                                                                                                                                                                            \
    delimiter       = ' '* [,\\n\\r]+                               { return '☃' }                                                                                                          \
    space           = [ \\n\\r]*                                    { return '☃' }                                                                                                          \
    SPACE           = [ \\n\\r]+ / !.                               { return '☃' }                                                                                                          \
");

// Export functions
exports.parseMeta = function(code, callback) {
    try {
        if(callback) callback(undefined, parser4meta.parse(code));
        else return parser4meta.parse(code);
    } catch(err) {
        if(callback) callback(buildErrorMessage(err));
        else return buildErrorMessage(err);
    }
};

exports.parse = function(code, callback) {
    try {
        if(callback) callback(undefined, mainParser.parse(code));
        else return mainParser.parse(code);
    } catch(err) {
        if(callback) callback(buildErrorMessage(err));
        else return buildErrorMessage(err);
    }
}

function buildErrorMessage(e) {
    return e.line !== undefined && e.column !== undefined
      ? "Line " + e.line + ", column " + e.column + ": " + e.message
      : e.message;
}