var PEG             = require('pegjs');
var commonGrammar   = "\
value       = color / string / const / bool / number    \
\
color       = '#' c:(sixColor / threeColor) space   { return '#'+c }    \
threeColor  = a:colChar b:colChar c:colChar         { return a+b+c }    \
sixColor    = a:threeColor b:threeColor             { return a+b }      \
colChar     = [a-fA-F0-9]   \
\
string      = doubleQuot / singleQuot   \
doubleQuot  = '\"' s:(text / dqText)+ '\"' space      { return \"'\"+s+\"'\" }    \
singleQuot  = \"'\" s:(text / sqText)+ \"'\" space      { return \"'\"+s+\"'\" }    \
text        = t:legalChar+ space                    { return t.join('') }   \
legalChar   = [a-zA-Z0-9_\-]    \
dqText      = t:textCharDbl+ space                  { return t.join('') }   \
sqText      = t:textCharSgl+ space                  { return t.join('') }   \
textCharDbl = [^\\n\\r\"]   \
textCharSgl = [^\\n\\r']   \
\
const       = c:'remove'                            { return \"'__\"+c+\"__'\" }    \
\
bool        = 'true' / 'false'  \
\
number      = real / integer    \
integer     = s:'-'? d:digit+ space                 { return parseInt(s + d.join(''), 10) } \
real        = s:'-'? i:digit* '.' f:digit+ space    { return parseFloat(s + i.join('') + '.' + f.join(''), 10) }    \
digit       = [0123456789]  \
space       = [ ,\\n\\r]*       \
SPACE       = [ ,\\n\\r]+ / !.  \
"

var parser4things   = PEG.buildParser(" \
start       = p:thingDef+                           { return p.join('') }   \
thingDef    = '{' space def:(charmAssign / charmTag)+ '}' space \
                                                    { return 'things.push({'+def.join(',')+'});' }  \
charmTag    = t:text space                          { return t+':true' }    \
charmAssign = t:text space ':' space v:(atRefer/value) space    \
                                                    { return t+':'+v }  \
atRefer     = '@' t:text                            { return 'something({'+t+'})' } \
"+commonGrammar);

exports.parseThings = function(code, callback) {
    callback(parser4things.parse(code));
}