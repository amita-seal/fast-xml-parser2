var parser =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/parser.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/json2xml.js":
/*!*************************!*\
  !*** ./src/json2xml.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//parse Empty Node as self closing node
var buildOptions=__webpack_require__(/*! ./util */ "./src/util.js").buildOptions;var defaultOptions={attributeNamePrefix:'@_',attrNodeName:false,textNodeName:'#text',ignoreAttributes:true,cdataTagName:false,cdataPositionChar:'\\c',format:false,indentBy:'  ',supressEmptyNode:false,tagValueProcessor:function tagValueProcessor(a){return a;},attrValueProcessor:function attrValueProcessor(a){return a;}};var props=['attributeNamePrefix','attrNodeName','textNodeName','ignoreAttributes','cdataTagName','cdataPositionChar','format','indentBy','supressEmptyNode','tagValueProcessor','attrValueProcessor'];function Parser(options){this.options=buildOptions(options,defaultOptions,props);if(this.options.ignoreAttributes||this.options.attrNodeName){this.isAttribute=function()/*a*/{return false;};}else{this.attrPrefixLen=this.options.attributeNamePrefix.length;this.isAttribute=isAttribute;}if(this.options.cdataTagName){this.isCDATA=isCDATA;}else{this.isCDATA=function()/*a*/{return false;};}this.replaceCDATAstr=replaceCDATAstr;this.replaceCDATAarr=replaceCDATAarr;if(this.options.format){this.indentate=indentate;this.tagEndChar='>\n';this.newLine='\n';}else{this.indentate=function(){return'';};this.tagEndChar='>';this.newLine='';}if(this.options.supressEmptyNode){this.buildTextNode=buildEmptyTextNode;this.buildObjNode=buildEmptyObjNode;}else{this.buildTextNode=buildTextValNode;this.buildObjNode=buildObjectNode;}this.buildTextValNode=buildTextValNode;this.buildObjectNode=buildObjectNode;}Parser.prototype.parse=function(jObj){return this.j2x(jObj,0).val;};Parser.prototype.j2x=function(jObj,level){var attrStr='';var val='';var keys=Object.keys(jObj);var len=keys.length;for(var i=0;i<len;i++){var key=keys[i];if(typeof jObj[key]==='undefined'){// supress undefined node
}else if(jObj[key]===null){val+=this.indentate(level)+'<'+key+'/'+this.tagEndChar;}else if(jObj[key]instanceof Date){val+=this.buildTextNode(jObj[key],key,'',level);}else if(typeof jObj[key]!=='object'){//premitive type
var attr=this.isAttribute(key);if(attr){attrStr+=' '+attr+'="'+this.options.attrValueProcessor(''+jObj[key])+'"';}else if(this.isCDATA(key)){if(jObj[this.options.textNodeName]){val+=this.replaceCDATAstr(jObj[this.options.textNodeName],jObj[key]);}else{val+=this.replaceCDATAstr('',jObj[key]);}}else{//tag value
if(key===this.options.textNodeName){if(jObj[this.options.cdataTagName]){//value will added while processing cdata
}else{val+=this.options.tagValueProcessor(''+jObj[key]);}}else{val+=this.buildTextNode(jObj[key],key,'',level);}}}else if(Array.isArray(jObj[key])){//repeated nodes
if(this.isCDATA(key)){val+=this.indentate(level);if(jObj[this.options.textNodeName]){val+=this.replaceCDATAarr(jObj[this.options.textNodeName],jObj[key]);}else{val+=this.replaceCDATAarr('',jObj[key]);}}else{//nested nodes
var arrLen=jObj[key].length;for(var j=0;j<arrLen;j++){var item=jObj[key][j];if(typeof item==='undefined'){// supress undefined node
}else if(item===null){val+=this.indentate(level)+'<'+key+'/'+this.tagEndChar;}else if(typeof item==='object'){var result=this.j2x(item,level+1);val+=this.buildObjNode(result.val,key,result.attrStr,level);}else{val+=this.buildTextNode(item,key,'',level);}}}}else{//nested node
if(this.options.attrNodeName&&key===this.options.attrNodeName){var Ks=Object.keys(jObj[key]);var L=Ks.length;for(var _j=0;_j<L;_j++){attrStr+=' '+Ks[_j]+'="'+this.options.attrValueProcessor(''+jObj[key][Ks[_j]])+'"';}}else{var _result=this.j2x(jObj[key],level+1);val+=this.buildObjNode(_result.val,key,_result.attrStr,level);}}}return{attrStr:attrStr,val:val};};function replaceCDATAstr(str,cdata){str=this.options.tagValueProcessor(''+str);if(this.options.cdataPositionChar===''||str===''){return str+'<![CDATA['+cdata+']]'+this.tagEndChar;}else{return str.replace(this.options.cdataPositionChar,'<![CDATA['+cdata+']]'+this.tagEndChar);}}function replaceCDATAarr(str,cdata){str=this.options.tagValueProcessor(''+str);if(this.options.cdataPositionChar===''||str===''){return str+'<![CDATA['+cdata.join(']]><![CDATA[')+']]'+this.tagEndChar;}else{for(var v in cdata){str=str.replace(this.options.cdataPositionChar,'<![CDATA['+cdata[v]+']]>');}return str+this.newLine;}}function buildObjectNode(val,key,attrStr,level){if(attrStr&&!val.includes('<')){return this.indentate(level)+'<'+key+attrStr+'>'+val+//+ this.newLine
// + this.indentate(level)
'</'+key+this.tagEndChar;}else{return this.indentate(level)+'<'+key+attrStr+this.tagEndChar+val+//+ this.newLine
this.indentate(level)+'</'+key+this.tagEndChar;}}function buildEmptyObjNode(val,key,attrStr,level){if(val!==''){return this.buildObjectNode(val,key,attrStr,level);}else{return this.indentate(level)+'<'+key+attrStr+'/'+this.tagEndChar;//+ this.newLine
}}function buildTextValNode(val,key,attrStr,level){return this.indentate(level)+'<'+key+attrStr+'>'+this.options.tagValueProcessor(val)+'</'+key+this.tagEndChar;}function buildEmptyTextNode(val,key,attrStr,level){if(val!==''){return this.buildTextValNode(val,key,attrStr,level);}else{return this.indentate(level)+'<'+key+attrStr+'/'+this.tagEndChar;}}function indentate(level){return this.options.indentBy.repeat(level);}function isAttribute(name/*, options*/){if(name.startsWith(this.options.attributeNamePrefix)){return name.substr(this.attrPrefixLen);}else{return false;}}function isCDATA(name){return name===this.options.cdataTagName;}//formatting
//indentation
//\n after each closing or self closing tag
module.exports=Parser;

/***/ }),

/***/ "./src/nimndata.js":
/*!*************************!*\
  !*** ./src/nimndata.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _char=function _char(a){return String.fromCharCode(a);};var chars={nilChar:_char(176),missingChar:_char(201),nilPremitive:_char(175),missingPremitive:_char(200),emptyChar:_char(178),emptyValue:_char(177),//empty Premitive
boundryChar:_char(179),objStart:_char(198),arrStart:_char(204),arrayEnd:_char(185)};var charsArr=[chars.nilChar,chars.nilPremitive,chars.missingChar,chars.missingPremitive,chars.boundryChar,chars.emptyChar,chars.emptyValue,chars.arrayEnd,chars.objStart,chars.arrStart];var _e=function _e(node,e_schema,options){if(typeof e_schema==='string'){//premitive
if(node&&node[0]&&node[0].val!==undefined){return getValue(node[0].val,e_schema);}else{return getValue(node,e_schema);}}else{var hasValidData=hasData(node);if(hasValidData===true){var str='';if(Array.isArray(e_schema)){//attributes can't be repeated. hence check in children tags only
str+=chars.arrStart;var itemSchema=e_schema[0];//var itemSchemaType = itemSchema;
var arr_len=node.length;if(typeof itemSchema==='string'){for(var arr_i=0;arr_i<arr_len;arr_i++){var r=getValue(node[arr_i].val,itemSchema);str=processValue(str,r);}}else{for(var _arr_i=0;_arr_i<arr_len;_arr_i++){var _r=_e(node[_arr_i],itemSchema,options);str=processValue(str,_r);}}str+=chars.arrayEnd;//indicates that next item is not array item
}else{//object
str+=chars.objStart;var keys=Object.keys(e_schema);if(Array.isArray(node)){node=node[0];}for(var i in keys){var key=keys[i];//a property defined in schema can be present either in attrsMap or children tags
//options.textNodeName will not present in both maps, take it's value from val
//options.attrNodeName will be present in attrsMap
var _r2=void 0;if(!options.ignoreAttributes&&node.attrsMap&&node.attrsMap[key]){_r2=_e(node.attrsMap[key],e_schema[key],options);}else if(key===options.textNodeName){_r2=_e(node.val,e_schema[key],options);}else{_r2=_e(node.child[key],e_schema[key],options);}str=processValue(str,_r2);}}return str;}else{return hasValidData;}}};var getValue=function getValue(a/*, type*/){switch(a){case undefined:return chars.missingPremitive;case null:return chars.nilPremitive;case'':return chars.emptyValue;default:return a;}};var processValue=function processValue(str,r){if(!isAppChar(r[0])&&!isAppChar(str[str.length-1])){str+=chars.boundryChar;}return str+r;};var isAppChar=function isAppChar(ch){return charsArr.indexOf(ch)!==-1;};function hasData(jObj){if(jObj===undefined){return chars.missingChar;}else if(jObj===null){return chars.nilChar;}else if(jObj.child&&Object.keys(jObj.child).length===0&&(!jObj.attrsMap||Object.keys(jObj.attrsMap).length===0)){return chars.emptyChar;}else{return true;}}var x2j=__webpack_require__(/*! ./xmlstr2xmlnode */ "./src/xmlstr2xmlnode.js");var buildOptions=__webpack_require__(/*! ./util */ "./src/util.js").buildOptions;var convert2nimn=function convert2nimn(node,e_schema,options){options=buildOptions(options,x2j.defaultOptions,x2j.props);return _e(node,e_schema,options);};exports.convert2nimn=convert2nimn;

/***/ }),

/***/ "./src/node2json.js":
/*!**************************!*\
  !*** ./src/node2json.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var util=__webpack_require__(/*! ./util */ "./src/util.js");var convertToJson=function convertToJson(node,options,parentTagName){var jObj={};// when no child node or attr is present
if((!node.child||util.isEmptyObject(node.child))&&(!node.attrsMap||util.isEmptyObject(node.attrsMap))){return util.isExist(node.val)?node.val:'';}// otherwise create a textnode if node has some text
if(util.isExist(node.val)&&!(typeof node.val==='string'&&(node.val===''||node.val===options.cdataPositionChar))){var asArray=util.isTagNameInArrayMode(node.tagname,options.arrayMode,parentTagName);jObj[options.textNodeName]=asArray?[node.val]:node.val;}util.merge(jObj,node.attrsMap,options.arrayMode);var keys=Object.keys(node.child);for(var index=0;index<keys.length;index++){var tagName=keys[index];if(node.child[tagName]&&node.child[tagName].length>1){jObj[tagName]=[];for(var tag in node.child[tagName]){if(node.child[tagName].hasOwnProperty(tag)){jObj[tagName].push(convertToJson(node.child[tagName][tag],options,tagName));}}}else{var result=convertToJson(node.child[tagName][0],options,tagName);var _asArray=options.arrayMode===true&&typeof result==='object'||util.isTagNameInArrayMode(tagName,options.arrayMode,parentTagName);jObj[tagName]=_asArray?[result]:result;}}//add value
return jObj;};exports.convertToJson=convertToJson;

/***/ }),

/***/ "./src/node2json_str.js":
/*!******************************!*\
  !*** ./src/node2json_str.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var util=__webpack_require__(/*! ./util */ "./src/util.js");var buildOptions=__webpack_require__(/*! ./util */ "./src/util.js").buildOptions;var x2j=__webpack_require__(/*! ./xmlstr2xmlnode */ "./src/xmlstr2xmlnode.js");//TODO: do it later
var convertToJsonString=function convertToJsonString(node,options){options=buildOptions(options,x2j.defaultOptions,x2j.props);options.indentBy=options.indentBy||'';return _cToJsonStr(node,options,0);};var _cToJsonStr=function _cToJsonStr(node,options,level){var jObj='{';//traver through all the children
var keys=Object.keys(node.child);for(var index=0;index<keys.length;index++){var tagname=keys[index];if(node.child[tagname]&&node.child[tagname].length>1){jObj+='"'+tagname+'" : [ ';for(var tag in node.child[tagname]){jObj+=_cToJsonStr(node.child[tagname][tag],options)+' , ';}jObj=jObj.substr(0,jObj.length-1)+' ] ';//remove extra comma in last
}else{jObj+='"'+tagname+'" : '+_cToJsonStr(node.child[tagname][0],options)+' ,';}}util.merge(jObj,node.attrsMap);//add attrsMap as new children
if(util.isEmptyObject(jObj)){return util.isExist(node.val)?node.val:'';}else{if(util.isExist(node.val)){if(!(typeof node.val==='string'&&(node.val===''||node.val===options.cdataPositionChar))){jObj+='"'+options.textNodeName+'" : '+stringval(node.val);}}}//add value
if(jObj[jObj.length-1]===','){jObj=jObj.substr(0,jObj.length-2);}return jObj+'}';};function stringval(v){if(v===true||v===false||!isNaN(v)){return v;}else{return'"'+v+'"';}}function indentate(options,level){return options.indentBy.repeat(level);}exports.convertToJsonString=convertToJsonString;

/***/ }),

/***/ "./src/parser.js":
/*!***********************!*\
  !*** ./src/parser.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var nodeToJson=__webpack_require__(/*! ./node2json */ "./src/node2json.js");var xmlToNodeobj=__webpack_require__(/*! ./xmlstr2xmlnode */ "./src/xmlstr2xmlnode.js");var x2xmlnode=__webpack_require__(/*! ./xmlstr2xmlnode */ "./src/xmlstr2xmlnode.js");var buildOptions=__webpack_require__(/*! ./util */ "./src/util.js").buildOptions;var validator=__webpack_require__(/*! ./validator */ "./src/validator.js");exports.parse=function(xmlData,options,validationOption){if(validationOption){if(validationOption===true)validationOption={};var result=validator.validate(xmlData,validationOption);if(result!==true){throw Error(result.err.msg);}}options=buildOptions(options,x2xmlnode.defaultOptions,x2xmlnode.props);var traversableObj=xmlToNodeobj.getTraversalObj(xmlData,options);//print(traversableObj, "  ");
return nodeToJson.convertToJson(traversableObj,options);};exports.convertTonimn=__webpack_require__(/*! ./nimndata */ "./src/nimndata.js").convert2nimn;exports.getTraversalObj=xmlToNodeobj.getTraversalObj;exports.convertToJson=nodeToJson.convertToJson;exports.convertToJsonString=__webpack_require__(/*! ./node2json_str */ "./src/node2json_str.js").convertToJsonString;exports.validate=validator.validate;exports.j2xParser=__webpack_require__(/*! ./json2xml */ "./src/json2xml.js");exports.parseToNimn=function(xmlData,schema,options){return exports.convertTonimn(exports.getTraversalObj(xmlData,options),schema,options);};function print(xmlNode,indentation){if(xmlNode){console.log(indentation+"{");console.log(indentation+"  \"tagName\": \""+xmlNode.tagname+"\", ");if(xmlNode.parent){console.log(indentation+"  \"parent\": \""+xmlNode.parent.tagname+"\", ");}console.log(indentation+"  \"val\": \""+xmlNode.val+"\", ");console.log(indentation+"  \"attrs\": "+JSON.stringify(xmlNode.attrsMap,null,4)+", ");if(xmlNode.child){console.log(indentation+"\"child\": {");var indentation2=indentation+indentation;Object.keys(xmlNode.child).forEach(function(key){var node=xmlNode.child[key];if(Array.isArray(node)){console.log(indentation+"\""+key+"\" :[");node.forEach(function(item,index){//console.log(indentation + " \""+index+"\" : [")
print(item,indentation2);});console.log(indentation+"],");}else{console.log(indentation+" \""+key+"\" : {");print(node,indentation2);console.log(indentation+"},");}});console.log(indentation+"},");}console.log(indentation+"},");}}

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var nameStartChar=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";var nameChar=nameStartChar+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";var nameRegexp='['+nameStartChar+']['+nameChar+']*';var regexName=new RegExp('^'+nameRegexp+'$');var getAllMatches=function getAllMatches(string,regex){var matches=[];var match=regex.exec(string);while(match){var allmatches=[];var len=match.length;for(var index=0;index<len;index++){allmatches.push(match[index]);}matches.push(allmatches);match=regex.exec(string);}return matches;};var isName=function isName(string){var match=regexName.exec(string);return!(match===null||typeof match==='undefined');};exports.isExist=function(v){return typeof v!=='undefined';};exports.isEmptyObject=function(obj){return Object.keys(obj).length===0;};/**
 * Copy all the properties of a into b.
 * @param {*} target
 * @param {*} a
 */exports.merge=function(target,a,arrayMode){if(a){var keys=Object.keys(a);// will return an array of own properties
var len=keys.length;//don't make it inline
for(var i=0;i<len;i++){if(arrayMode==='strict'){target[keys[i]]=[a[keys[i]]];}else{target[keys[i]]=a[keys[i]];}}}};/* exports.merge =function (b,a){
  return Object.assign(b,a);
} */exports.getValue=function(v){if(exports.isExist(v)){return v;}else{return'';}};// const fakeCall = function(a) {return a;};
// const fakeCallNoReturn = function() {};
exports.buildOptions=function(options,defaultOptions,props){var newOptions={};if(!options){return defaultOptions;//if there are not options
}for(var i=0;i<props.length;i++){if(options[props[i]]!==undefined){newOptions[props[i]]=options[props[i]];}else{newOptions[props[i]]=defaultOptions[props[i]];}}return newOptions;};/**
 * Check if a tag name should be treated as array
 *
 * @param tagName the node tagname
 * @param arrayMode the array mode option
 * @param parentTagName the parent tag name
 * @returns {boolean} true if node should be parsed as array
 */exports.isTagNameInArrayMode=function(tagName,arrayMode,parentTagName){if(arrayMode===false){return false;}else if(arrayMode instanceof RegExp){return arrayMode.test(tagName);}else if(typeof arrayMode==='function'){return!!arrayMode(tagName,parentTagName);}return arrayMode==="strict";};exports.isName=isName;exports.getAllMatches=getAllMatches;exports.nameRegexp=nameRegexp;

/***/ }),

/***/ "./src/validator.js":
/*!**************************!*\
  !*** ./src/validator.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var util=__webpack_require__(/*! ./util */ "./src/util.js");var defaultOptions={allowBooleanAttributes:false//A tag can have attributes without any value
};var props=['allowBooleanAttributes'];//const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
exports.validate=function(xmlData,options){options=util.buildOptions(options,defaultOptions,props);//xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
//xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
//xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
var tags=[];var tagFound=false;//indicates that the root tag has been closed (aka. depth 0 has been reached)
var reachedRoot=false;if(xmlData[0]==="\uFEFF"){// check for byte order mark (BOM)
xmlData=xmlData.substr(1);}for(var i=0;i<xmlData.length;i++){if(xmlData[i]==='<'&&xmlData[i+1]==='?'){i+=2;i=readPI(xmlData,i);if(i.err)return i;}else if(xmlData[i]==='<'){//starting of tag
//read until you reach to '>' avoiding any '>' in attribute value
i++;if(xmlData[i]==='!'){i=readCommentAndCDATA(xmlData,i);continue;}else{var closingTag=false;if(xmlData[i]==='/'){//closing tag
closingTag=true;i++;}//read tagname
var tagName='';for(;i<xmlData.length&&xmlData[i]!=='>'&&xmlData[i]!==' '&&xmlData[i]!=='\t'&&xmlData[i]!=='\n'&&xmlData[i]!=='\r';i++){tagName+=xmlData[i];}tagName=tagName.trim();//console.log(tagName);
if(tagName[tagName.length-1]==='/'){//self closing tag without attributes
tagName=tagName.substring(0,tagName.length-1);//continue;
i--;}if(!validateTagName(tagName)){var msg=void 0;if(tagName.trim().length===0){msg="There is an unnecessary space between tag name and backward slash '</ ..'.";}else{msg="Tag '"+tagName+"' is an invalid name.";}return getErrorObject('InvalidTag',msg,getLineNumberForPosition(xmlData,i));}var result=readAttributeStr(xmlData,i);if(result===false){return getErrorObject('InvalidAttr',"Attributes for '"+tagName+"' have open quote.",getLineNumberForPosition(xmlData,i));}var attrStr=result.value;i=result.index;if(attrStr[attrStr.length-1]==='/'){//self closing tag
attrStr=attrStr.substring(0,attrStr.length-1);var isValid=validateAttributeString(attrStr,options);if(isValid===true){tagFound=true;//continue; //text may presents after self closing tag
}else{//the result from the nested function returns the position of the error within the attribute
//in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
//this gives us the absolute index in the entire xml, which we can use to find the line at last
return getErrorObject(isValid.err.code,isValid.err.msg,getLineNumberForPosition(xmlData,i-attrStr.length+isValid.err.line));}}else if(closingTag){if(!result.tagClosed){return getErrorObject('InvalidTag',"Closing tag '"+tagName+"' doesn't have proper closing.",getLineNumberForPosition(xmlData,i));}else if(attrStr.trim().length>0){return getErrorObject('InvalidTag',"Closing tag '"+tagName+"' can't have attributes or invalid starting.",getLineNumberForPosition(xmlData,i));}else{var otg=tags.pop();if(tagName!==otg){return getErrorObject('InvalidTag',"Closing tag '"+otg+"' is expected inplace of '"+tagName+"'.",getLineNumberForPosition(xmlData,i));}//when there are no more tags, we reached the root level.
if(tags.length==0){reachedRoot=true;}}}else{var _isValid=validateAttributeString(attrStr,options);if(_isValid!==true){//the result from the nested function returns the position of the error within the attribute
//in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
//this gives us the absolute index in the entire xml, which we can use to find the line at last
return getErrorObject(_isValid.err.code,_isValid.err.msg,getLineNumberForPosition(xmlData,i-attrStr.length+_isValid.err.line));}//if the root level has been reached before ...
if(reachedRoot===true){return getErrorObject('InvalidXml','Multiple possible root nodes found.',getLineNumberForPosition(xmlData,i));}else{tags.push(tagName);}tagFound=true;}//skip tag text value
//It may include comments and CDATA value
for(i++;i<xmlData.length;i++){if(xmlData[i]==='<'){if(xmlData[i+1]==='!'){//comment or CADATA
i++;i=readCommentAndCDATA(xmlData,i);continue;}else if(xmlData[i+1]==='?'){i=readPI(xmlData,++i);if(i.err)return i;}else{break;}}else if(xmlData[i]==='&'){var afterAmp=validateAmpersand(xmlData,i);if(afterAmp==-1)return getErrorObject('InvalidChar',"char '&' is not expected.",getLineNumberForPosition(xmlData,i));i=afterAmp;}}//end of reading tag text value
if(xmlData[i]==='<'){i--;}}}else{if(xmlData[i]===' '||xmlData[i]==='\t'||xmlData[i]==='\n'||xmlData[i]==='\r'){continue;}return getErrorObject('InvalidChar',"char '"+xmlData[i]+"' is not expected.",getLineNumberForPosition(xmlData,i));}}if(!tagFound){return getErrorObject('InvalidXml','Start tag expected.',1);}else if(tags.length>0){return getErrorObject('InvalidXml',"Invalid '"+JSON.stringify(tags,null,4).replace(/\r?\n/g,'')+"' found.",1);}return true;};/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */function readPI(xmlData,i){var start=i;for(;i<xmlData.length;i++){if(xmlData[i]=='?'||xmlData[i]==' '){//tagname
var tagname=xmlData.substr(start,i-start);if(i>5&&tagname==='xml'){return getErrorObject('InvalidXml','XML declaration allowed only at the start of the document.',getLineNumberForPosition(xmlData,i));}else if(xmlData[i]=='?'&&xmlData[i+1]=='>'){//check if valid attribut string
i++;break;}else{continue;}}}return i;}function readCommentAndCDATA(xmlData,i){if(xmlData.length>i+5&&xmlData[i+1]==='-'&&xmlData[i+2]==='-'){//comment
for(i+=3;i<xmlData.length;i++){if(xmlData[i]==='-'&&xmlData[i+1]==='-'&&xmlData[i+2]==='>'){i+=2;break;}}}else if(xmlData.length>i+8&&xmlData[i+1]==='D'&&xmlData[i+2]==='O'&&xmlData[i+3]==='C'&&xmlData[i+4]==='T'&&xmlData[i+5]==='Y'&&xmlData[i+6]==='P'&&xmlData[i+7]==='E'){var angleBracketsCount=1;for(i+=8;i<xmlData.length;i++){if(xmlData[i]==='<'){angleBracketsCount++;}else if(xmlData[i]==='>'){angleBracketsCount--;if(angleBracketsCount===0){break;}}}}else if(xmlData.length>i+9&&xmlData[i+1]==='['&&xmlData[i+2]==='C'&&xmlData[i+3]==='D'&&xmlData[i+4]==='A'&&xmlData[i+5]==='T'&&xmlData[i+6]==='A'&&xmlData[i+7]==='['){for(i+=8;i<xmlData.length;i++){if(xmlData[i]===']'&&xmlData[i+1]===']'&&xmlData[i+2]==='>'){i+=2;break;}}}return i;}var doubleQuote='"';var singleQuote="'";/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */function readAttributeStr(xmlData,i){var attrStr='';var startChar='';var tagClosed=false;for(;i<xmlData.length;i++){if(xmlData[i]===doubleQuote||xmlData[i]===singleQuote){if(startChar===''){startChar=xmlData[i];}else if(startChar!==xmlData[i]){//if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
continue;}else{startChar='';}}else if(xmlData[i]==='>'){if(startChar===''){tagClosed=true;break;}}attrStr+=xmlData[i];}if(startChar!==''){return false;}return{value:attrStr,index:i,tagClosed:tagClosed};}/**
 * Select all the attributes whether valid or invalid.
 */var validAttrStrRegxp=new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?','g');//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""
function validateAttributeString(attrStr,options){//console.log("start:"+attrStr+":end");
//if(attrStr.trim().length === 0) return true; //empty string
var matches=util.getAllMatches(attrStr,validAttrStrRegxp);var attrNames={};for(var i=0;i<matches.length;i++){if(matches[i][1].length===0){//nospace before attribute name: a="sd"b="saf"
return getErrorObject('InvalidAttr',"Attribute '"+matches[i][2]+"' has no space in starting.",getPositionFromMatch(attrStr,matches[i][0]));}else if(matches[i][3]===undefined&&!options.allowBooleanAttributes){//independent attribute: ab
return getErrorObject('InvalidAttr',"boolean attribute '"+matches[i][2]+"' is not allowed.",getPositionFromMatch(attrStr,matches[i][0]));}/* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */var attrName=matches[i][2];if(!validateAttrName(attrName)){return getErrorObject('InvalidAttr',"Attribute '"+attrName+"' is an invalid name.",getPositionFromMatch(attrStr,matches[i][0]));}if(!attrNames.hasOwnProperty(attrName)){//check for duplicate attribute.
attrNames[attrName]=1;}else{return getErrorObject('InvalidAttr',"Attribute '"+attrName+"' is repeated.",getPositionFromMatch(attrStr,matches[i][0]));}}return true;}function validateNumberAmpersand(xmlData,i){var re=/\d/;if(xmlData[i]==='x'){i++;re=/[\da-fA-F]/;}for(;i<xmlData.length;i++){if(xmlData[i]===';')return i;if(!xmlData[i].match(re))break;}return-1;}function validateAmpersand(xmlData,i){// https://www.w3.org/TR/xml/#dt-charref
i++;if(xmlData[i]===';')return-1;if(xmlData[i]==='#'){i++;return validateNumberAmpersand(xmlData,i);}var count=0;for(;i<xmlData.length;i++,count++){if(xmlData[i].match(/\w/)&&count<20)continue;if(xmlData[i]===';')break;return-1;}return i;}function getErrorObject(code,message,lineNumber){return{err:{code:code,msg:message,line:lineNumber}};}function validateAttrName(attrName){return util.isName(attrName);}// const startsWithXML = /^xml/i;
function validateTagName(tagname){return util.isName(tagname)/* && !tagname.match(startsWithXML) */;}//this function returns the line number for the character at the given index
function getLineNumberForPosition(xmlData,index){var lines=xmlData.substring(0,index).split(/\r?\n/);return lines.length;}//this function returns the position of the last character of match within attrStr
function getPositionFromMatch(attrStr,match){return attrStr.indexOf(match)+match.length;}

/***/ }),

/***/ "./src/xmlNode.js":
/*!************************!*\
  !*** ./src/xmlNode.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
module.exports=function(tagname,parent,val){this.tagname=tagname;this.parent=parent;this.child={};//child tags
this.attrsMap={};//attributes map
this.val=val;//text only
this.addChild=function(child){if(Array.isArray(this.child[child.tagname])){//already presents
this.child[child.tagname].push(child);}else{this.child[child.tagname]=[child];}};};

/***/ }),

/***/ "./src/xmlstr2xmlnode.js":
/*!*******************************!*\
  !*** ./src/xmlstr2xmlnode.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var util=__webpack_require__(/*! ./util */ "./src/util.js");var buildOptions=__webpack_require__(/*! ./util */ "./src/util.js").buildOptions;var xmlNode=__webpack_require__(/*! ./xmlNode */ "./src/xmlNode.js");var regx='<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'.replace(/NAME/g,util.nameRegexp);//const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
//const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");
//polyfill
if(!Number.parseInt&&window.parseInt){Number.parseInt=window.parseInt;}if(!Number.parseFloat&&window.parseFloat){Number.parseFloat=window.parseFloat;}var defaultOptions={attributeNamePrefix:'@_',attrNodeName:false,textNodeName:'#text',ignoreAttributes:true,ignoreNameSpace:false,allowBooleanAttributes:false,//a tag can have attributes without any value
//ignoreRootElement : false,
parseNodeValue:true,parseAttributeValue:false,arrayMode:false,trimValues:true,//Trim string values of tag and attributes
cdataTagName:false,cdataPositionChar:'\\c',tagValueProcessor:function tagValueProcessor(a,tagName){return a;},attrValueProcessor:function attrValueProcessor(a,attrName){return a;},stopNodes:[]//decodeStrict: false,
};exports.defaultOptions=defaultOptions;var props=['attributeNamePrefix','attrNodeName','textNodeName','ignoreAttributes','ignoreNameSpace','allowBooleanAttributes','parseNodeValue','parseAttributeValue','arrayMode','trimValues','cdataTagName','cdataPositionChar','tagValueProcessor','attrValueProcessor','parseTrueNumberOnly','stopNodes'];exports.props=props;/**
 * Trim -> valueProcessor -> parse value
 * @param {string} tagName
 * @param {string} val
 * @param {object} options
 */function processTagValue(tagName,val,options){if(val){if(options.trimValues){val=val.trim();}val=options.tagValueProcessor(val,tagName);val=parseValue(val,options.parseNodeValue,options.parseTrueNumberOnly);}return val;}function resolveNameSpace(tagname,options){if(options.ignoreNameSpace){var tags=tagname.split(':');var prefix=tagname.charAt(0)==='/'?'/':'';if(tags[0]==='xmlns'){return'';}if(tags.length===2){tagname=prefix+tags[1];}}return tagname;}function parseValue(val,shouldParse,parseTrueNumberOnly){if(shouldParse&&typeof val==='string'){var parsed;if(val.trim()===''||isNaN(val)){parsed=val==='true'?true:val==='false'?false:val;}else{if(val.indexOf('0x')!==-1){//support hexa decimal
parsed=Number.parseInt(val,16);}else if(val.indexOf('.')!==-1){parsed=Number.parseFloat(val);val=val.replace(/\.?0+$/,"");}else{parsed=Number.parseInt(val,10);}if(parseTrueNumberOnly){parsed=String(parsed)===val?parsed:val;}}return parsed;}else{if(util.isExist(val)){return val;}else{return'';}}}//TODO: change regex to capture NS
//const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
var attrsRegx=new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])(.*?)\\3)?','g');function buildAttributesMap(attrStr,options){if(!options.ignoreAttributes&&typeof attrStr==='string'){attrStr=attrStr.replace(/\r?\n/g,' ');//attrStr = attrStr || attrStr.trim();
var matches=util.getAllMatches(attrStr,attrsRegx);var len=matches.length;//don't make it inline
var attrs={};for(var i=0;i<len;i++){var attrName=resolveNameSpace(matches[i][1],options);if(attrName.length){if(matches[i][4]!==undefined){if(options.trimValues){matches[i][4]=matches[i][4].trim();}matches[i][4]=options.attrValueProcessor(matches[i][4],attrName);attrs[options.attributeNamePrefix+attrName]=parseValue(matches[i][4],options.parseAttributeValue,options.parseTrueNumberOnly);}else if(options.allowBooleanAttributes){attrs[options.attributeNamePrefix+attrName]=true;}}}if(!Object.keys(attrs).length){return;}if(options.attrNodeName){var attrCollection={};attrCollection[options.attrNodeName]=attrs;return attrCollection;}return attrs;}}var getTraversalObj=function getTraversalObj(xmlData,options){xmlData=xmlData.replace(/\r\n?/g,"\n");options=buildOptions(options,defaultOptions,props);var xmlObj=new xmlNode('!xml');var currentNode=xmlObj;var textData="";//function match(xmlData){
for(var i=0;i<xmlData.length;i++){var ch=xmlData[i];if(ch==='<'){if(xmlData[i+1]==='/'){//Closing Tag
var closeIndex=findClosingIndex(xmlData,">",i,"Closing Tag is not closed.");var tagName=xmlData.substring(i+2,closeIndex).trim();if(options.ignoreNameSpace){var colonIndex=tagName.indexOf(":");if(colonIndex!==-1){tagName=tagName.substr(colonIndex+1);}}/* if (currentNode.parent) {
          currentNode.parent.val = util.getValue(currentNode.parent.val) + '' + processTagValue2(tagName, textData , options);
        } */if(currentNode){if(currentNode.val){currentNode.val=util.getValue(currentNode.val)+''+processTagValue(tagName,textData,options);}else{currentNode.val=processTagValue(tagName,textData,options);}}if(options.stopNodes.length&&options.stopNodes.includes(currentNode.tagname)){currentNode.child=[];if(currentNode.attrsMap==undefined){currentNode.attrsMap={};}currentNode.val=xmlData.substr(currentNode.startIndex+1,i-currentNode.startIndex-1);}currentNode=currentNode.parent;textData="";i=closeIndex;}else if(xmlData[i+1]==='?'){i=findClosingIndex(xmlData,"?>",i,"Pi Tag is not closed.");}else if(xmlData.substr(i+1,3)==='!--'){i=findClosingIndex(xmlData,"-->",i,"Comment is not closed.");}else if(xmlData.substr(i+1,2)==='!D'){var _closeIndex=findClosingIndex(xmlData,">",i,"DOCTYPE is not closed.");var tagExp=xmlData.substring(i,_closeIndex);if(tagExp.indexOf("[")>=0){i=xmlData.indexOf("]>",i)+1;}else{i=_closeIndex;}}else if(xmlData.substr(i+1,2)==='!['){var _closeIndex2=findClosingIndex(xmlData,"]]>",i,"CDATA is not closed.")-2;var _tagExp=xmlData.substring(i+9,_closeIndex2);//considerations
//1. CDATA will always have parent node
//2. A tag with CDATA is not a leaf node so it's value would be string type.
if(textData){currentNode.val=util.getValue(currentNode.val)+''+processTagValue(currentNode.tagname,textData,options);textData="";}if(options.cdataTagName){//add cdata node
var childNode=new xmlNode(options.cdataTagName,currentNode,_tagExp);currentNode.addChild(childNode);//for backtracking
currentNode.val=util.getValue(currentNode.val)+options.cdataPositionChar;//add rest value to parent node
if(_tagExp){childNode.val=_tagExp;}}else{currentNode.val=(currentNode.val||'')+(_tagExp||'');}i=_closeIndex2+2;}else{//Opening tag
var result=closingIndexForOpeningTag(xmlData,i+1);var _tagExp2=result.data;var _closeIndex3=result.index;var separatorIndex=_tagExp2.indexOf(" ");var _tagName=_tagExp2;var shouldBuildAttributesMap=true;if(separatorIndex!==-1){_tagName=_tagExp2.substr(0,separatorIndex).replace(/\s\s*$/,'');_tagExp2=_tagExp2.substr(separatorIndex+1);}if(options.ignoreNameSpace){var _colonIndex=_tagName.indexOf(":");if(_colonIndex!==-1){_tagName=_tagName.substr(_colonIndex+1);shouldBuildAttributesMap=_tagName!==result.data.substr(_colonIndex+1);}}//save text to parent node
if(currentNode&&textData){if(currentNode.tagname!=='!xml'){currentNode.val=util.getValue(currentNode.val)+''+processTagValue(currentNode.tagname,textData,options);}}if(_tagExp2.length>0&&_tagExp2.lastIndexOf("/")===_tagExp2.length-1){//selfClosing tag
if(_tagName[_tagName.length-1]==="/"){//remove trailing '/'
_tagName=_tagName.substr(0,_tagName.length-1);_tagExp2=_tagName;}else{_tagExp2=_tagExp2.substr(0,_tagExp2.length-1);}var _childNode=new xmlNode(_tagName,currentNode,'');if(_tagName!==_tagExp2){_childNode.attrsMap=buildAttributesMap(_tagExp2,options);}currentNode.addChild(_childNode);}else{//opening tag
var _childNode2=new xmlNode(_tagName,currentNode);if(options.stopNodes.length&&options.stopNodes.includes(_childNode2.tagname)){_childNode2.startIndex=_closeIndex3;}if(_tagName!==_tagExp2&&shouldBuildAttributesMap){_childNode2.attrsMap=buildAttributesMap(_tagExp2,options);}currentNode.addChild(_childNode2);currentNode=_childNode2;}textData="";i=_closeIndex3;}}else{textData+=xmlData[i];}}return xmlObj;};function closingIndexForOpeningTag(data,i){var attrBoundary;var tagExp="";for(var index=i;index<data.length;index++){var ch=data[index];if(attrBoundary){if(ch===attrBoundary)attrBoundary="";//reset
}else if(ch==='"'||ch==="'"){attrBoundary=ch;}else if(ch==='>'){return{data:tagExp,index:index};}else if(ch==='\t'){ch=" ";}tagExp+=ch;}}function findClosingIndex(xmlData,str,i,errMsg){var closingIndex=xmlData.indexOf(str,i);if(closingIndex===-1){throw new Error(errMsg);}else{return closingIndex+str.length-1;}}exports.getTraversalObj=getTraversalObj;

/***/ })

/******/ });
//# sourceMappingURL=parser.js.map