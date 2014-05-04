// Setup
var PEG             = require('pegjs');

// Grammar
var commonGrammar   = " \
query       = conditionQ / tagQ / notTagQ                                                                           \
conditionQ  = t:text space s:compareSign space v:value space                                                        \
                                                    { return t+':function(a){return a'+s+v+';}' }                   \
tagQ        = t:text space                          { return t+':true' }                                            \
notTagQ     = '!' t:text space                      { return t+':undefined'}                                        \
value       = a:(literal / block) space b:(mathSign space (literal / block))*                                       \
                                                    { return a+b.join('').replace(/,/g, '') }                       \
block       = '(' v:value ')'                       { return '('+v+')' }                                            \
literal     = color / string / const / bool / number                                                                \
mathSign    = [-+*/]                                                                                                \
compareSign = s:('=' / '!=' / '>=' / '<=' / '>' / '<')                                                              \
                                                    { return s=='='?'==':s }                                        \
color       = '#' c:(sixColor / threeColor) space   { return '#'+c }                                                \
threeColor  = a:colChar b:colChar c:colChar         { return a+b+c }                                                \
sixColor    = a:threeColor b:threeColor             { return a+b }                                                  \
colChar     = [a-fA-F0-9]                                                                                           \
string      = doubleQuot / singleQuot                                                                               \
doubleQuot  = '\"' s:(text / dqText)+ '\"' space    { return \"'\"+s+\"'\" }                                        \
singleQuot  = \"'\" s:(text / sqText)+ \"'\" space  { return \"'\"+s+\"'\" }                                        \
text        = t:legalChar+ space                    { return t.join('') }                                           \
legalChar   = [a-zA-Z0-9_\]                                                                                         \
dqText      = t:textCharDbl+ space                  { return t.join('') }                                           \
sqText      = t:textCharSgl+ space                  { return t.join('') }                                           \
textCharDbl = [^\\r\\n\"]                                                                                           \
textCharSgl = [^\\r\\n']                                                                                            \
const       = c:'remove'                            { return 'undefined' }                                          \
bool        = 'true' / 'false'                                                                                      \
number      = real / integer                                                                                        \
integer     = s:'-'? d:digit+ space                 { return parseInt(s?s:'' +d.join(''), 10) }                     \
real        = s:'-'? i:digit* '.' f:digit+ space    { return parseFloat(s?s:'' +i.join('')+'.'+f.join(''), 10) }    \
digit       = [0123456789]                                                                                          \
space       = [ ,\\r\\n]*                                                                                           \
SPACE       = [ ,\\r\\n]+ / !.                                                                                      \
";

var parser4meta     = PEG.buildParser(" \
start       = def:(charmAssign / charmTag)+ space   { return 'queryThings(this,{meta:true},function(there){'+def.join(';')+';});' }     \
charmTag    = t:text space                          { return 'there.'+t+'=true' }                                                       \
charmAssign = t:text space ':' space v:value space  { return 'there.'+t+'='+v }                                                         \
"+commonGrammar);

var parser4things   = PEG.buildParser(" \
start       = p:thingDef*                           { return p.join('') }                                   \
thingDef    = '{' space def:(charmAssign / charmTag)+ '}' space                                             \
                                                    { return 'things.push({'+def.join(',')+'});' }          \
charmTag    = t:text space                          { return t+':true' }                                    \
charmAssign = t:text space ':' space v:(atRefer/value) space                                                \
                                                    { return t+':'+v }                                      \
atRefer     = '@' q:query                           { return 'function(){return queryThings({'+q+'});}' }   \
"+commonGrammar);

var parser4gameloop = PEG.buildParser(" \
start       = p:queryAndDo*                         { return p.join('') }                                                                       \
queryAndDo  = q:query+ '{' space d:(putCharm / modify)+ '}' space                                                                               \
                                                    { return 'queryThings({'+q+'},function(){'+d.join(';')+'});' }                              \
modify      = charmModify / tagModify                                                                                                           \
tagModify   = r:dotRefer space                      { return r+'=true' }                                                                        \
charmModify = r:dotRefer space ':' space v:(value / dotRefer) space                                                                             \
                                                    { return r+'='+v }                                                                          \
putCharm    = q:query+ '<-' space d:thingPass       { return 'todo.push(queryThings.bind(this,this,{'+q+'},function(there){'+d+'}));' }    \
thingPass   = '{' space def:(charmPass / tagPass)+ '}' space                                                                                    \
                                                    { return '{'+def.join(';')+'}' }                                                            \
tagPass     = r:(dotRefer / localRefer) space       { return r+'=true' }                                                                        \
charmPass   = r:(dotRefer / localRefer) space ':' space v:(value / dotRefer / localRefer) space                                                 \
                                                    { return r+'='+v }                                                                          \
dotRefer    = '.' t:text                            { return 'this.'+t }                                                                        \
localRefer  = t:text                                { return 'there.'+t }                                                                       \
"+commonGrammar);

// Export functions
exports.parseMeta = function(code, callback) {
    try {
        if(callback) callback(undefined, parser4meta.parse(code));
        else return parser4meta.parse(code);
    } catch(err) {
        if(callback) callback(buildErrorMessage(err));
        else return err;
    }
};

exports.parseThings = function(code, callback) {
    try {
        if(callback) callback(undefined, parser4things.parse(code));
        else return parser4things.parse(code);
    } catch(err) {
        if(callback) callback(buildErrorMessage(err));
        else return err;
    }
};

exports.parseGameloop = function(code, callback) {
    try {
        if(callback) callback(undefined, parser4gameloop.parse(code));
        else return parser4gameloop.parse(code);
    } catch(err) {
        if(callback) callback(buildErrorMessage(err));
        else return err;
    }
};

function buildErrorMessage(e) {
    return e.line !== undefined && e.column !== undefined
      ? "Line " + e.line + ", column " + e.column + ": " + e.message
      : e.message;
}