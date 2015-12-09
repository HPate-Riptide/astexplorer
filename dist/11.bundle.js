webpackJsonp([11],{589:function(module,exports){module.exports=function(ast,comments,tokens){if(comments.length){var firstComment=comments[0],lastComment=comments[comments.length-1];if(tokens.length){if(firstComment.start<tokens[0].start){var token=tokens[0];if(ast.start=token.start,ast.loc.start.line=token.loc.start.line,ast.loc.start.column=token.loc.start.column,ast.body.length){var node=ast.body[0];node.leadingComments=[];for(var firstTokenStart=token.start,len=comments.length,i=0;len>i&&comments[i].start<firstTokenStart;i++)node.leadingComments.push(comments[i])}}}else ast.start=lastComment.end,ast.loc.start.line=lastComment.loc.end.line,ast.loc.start.column=lastComment.loc.end.column,null===ast.leadingComments&&ast.innerComments.length&&(ast.leadingComments=ast.innerComments);if(tokens.length){var lastToken=tokens[tokens.length-1];lastComment.end>lastToken.end&&(ast.end=lastToken.end,ast.loc.end.line=lastToken.loc.end.line,ast.loc.end.column=lastToken.loc.end.column)}}else tokens.length||(ast.loc.start.line=0,ast.loc.end.line=0);ast.body.length>0&&(ast.loc.start.line=ast.body[0].loc.start.line,ast.start=ast.body[0].start)}},590:function(module,exports){module.exports=function(tokens,tt){function isBackQuote(token){return tokens[token].type===tt.backQuote}function isTemplateStarter(token){return isBackQuote(token)||tokens[token].type===tt.braceR&&numBackQuotes>0}function isTemplateEnder(token){return isBackQuote(token)||tokens[token].type===tt.dollarBraceL}function createTemplateValue(start,end){for(var value="";end>=start;)tokens[start].value?value+=tokens[start].value:tokens[start].type!==tt.template&&(value+=tokens[start].type.label),start++;return value}function replaceWithTemplateType(start,end){var templateToken={type:"Template",value:createTemplateValue(start,end),start:tokens[start].start,end:tokens[end].end,loc:{start:tokens[start].loc.start,end:tokens[end].loc.end}};tokens.splice(start,end-start+1,templateToken)}function trackNumBraces(token){tokens[token].type===tt.braceL?numBraces++:tokens[token].type===tt.braceR&&numBraces--}for(var startingToken=0,currentToken=0,numBraces=0,numBackQuotes=0;startingToken<tokens.length;){if(isTemplateStarter(startingToken)&&0===numBraces){if(isBackQuote(startingToken)&&numBackQuotes++,currentToken=startingToken+1,currentToken>=tokens.length-1||tokens[currentToken].type!==tt.template)break;for(;!(isTemplateEnder(currentToken)||currentToken>=tokens.length-1);)currentToken++;isBackQuote(currentToken)&&numBackQuotes--,replaceWithTemplateType(startingToken,currentToken)}else numBackQuotes>0&&trackNumBraces(startingToken);startingToken++}}},591:function(module,exports,__webpack_require__){exports.attachComments=__webpack_require__(589),exports.toTokens=__webpack_require__(594),exports.toAST=__webpack_require__(592),exports.convertComments=function(comments){for(var i=0;i<comments.length;i++){var comment=comments[i];"CommentBlock"===comment.type?comment.type="Block":"CommentLine"===comment.type&&(comment.type="Line")}}},592:function(module,exports){module.exports=function(ast,traverse){ast.sourceType="module",ast.range=[ast.start,ast.end],traverse(ast,astTransformVisitor)};var astTransformVisitor={noScope:!0,enter:function(node){node.range=[node.start,node.end],node._babelType=node.type,node.innerComments&&(node.trailingComments=node.innerComments),Object.defineProperty(node,"_paths",{value:node._paths,writable:!0})},exit:function(node){if(this.isSpreadProperty()&&(node.type="SpreadProperty",node.key=node.value=node.argument),this.isQualifiedTypeIdentifier()&&delete node.id,this.isObjectTypeProperty()&&delete node.key,this.isObjectTypeIndexer()&&delete node.id,this.isFunctionTypeParam()&&delete node.name,this.isImportDeclaration()&&delete node.isType,this.isExportDeclaration()){var declar=this.get("declaration");declar.isClassExpression()?node.declaration.type="ClassDeclaration":declar.isFunctionExpression()&&(node.declaration.type="FunctionDeclaration")}this.isClassProperty()&&delete node.key,this.isFunction()&&node.async&&(node.generator=!0),this.isAwaitExpression()&&(node.type="YieldExpression",node.delegate=node.all,delete node.all),this.isTemplateLiteral()&&node.quasis.forEach(function(q){q.range[0]-=1,q.tail?q.range[1]+=1:q.range[1]+=2,q.loc.start.column-=1,q.tail?q.loc.end.column+=1:q.loc.end.column+=2})}}},593:function(module,exports){module.exports=function(token,tt){var type=token.type;return token.range=[token.start,token.end],type===tt.name?token.type="Identifier":type===tt.semi||type===tt.comma||type===tt.parenL||type===tt.parenR||type===tt.braceL||type===tt.braceR||type===tt.slash||type===tt.dot||type===tt.bracketL||type===tt.bracketR||type===tt.ellipsis||type===tt.arrow||type===tt.star||type===tt.incDec||type===tt.colon||type===tt.question||type===tt.template||type===tt.backQuote||type===tt.dollarBraceL||type===tt.at||type===tt.logicalOR||type===tt.logicalAND||type===tt.bitwiseOR||type===tt.bitwiseXOR||type===tt.bitwiseAND||type===tt.equality||type===tt.relational||type===tt.bitShift||type===tt.plusMin||type===tt.modulo||type===tt.exponent||type===tt.prefix||type===tt.doubleColon||type.isAssign?(token.type="Punctuator",token.value||(token.value=type.label)):type===tt.jsxTagStart?(token.type="Punctuator",token.value="<"):type===tt.jsxTagEnd?(token.type="Punctuator",token.value=">"):type===tt.jsxName?token.type="JSXIdentifier":type===tt.jsxText?token.type="JSXText":"null"===type.keyword?token.type="Null":"false"===type.keyword||"true"===type.keyword?token.type="Boolean":type.keyword?token.type="Keyword":type===tt.num?(token.type="Numeric",token.value=String(token.value)):type===tt.string?(token.type="String",token.value=JSON.stringify(token.value)):type===tt.regexp&&(token.type="RegularExpression",token.regex={pattern:token.value.pattern,flags:token.value.flags},token.value=String(token.value.value)),token}},594:function(module,exports,__webpack_require__){var convertTemplateType=__webpack_require__(590),toToken=__webpack_require__(593);module.exports=function(tokens,tt){convertTemplateType(tokens,tt);for(var transformedTokens=tokens.filter(function(token){return"CommentLine"!==token.type&&"CommentBlock"!==token.type}),i=0,l=transformedTokens.length;l>i;i++)transformedTokens[i]=toToken(transformedTokens[i],tt);return transformedTokens}}});