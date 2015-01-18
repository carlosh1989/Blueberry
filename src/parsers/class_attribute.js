/*
 * A class attribute
 */

var identifierParser = require('./identifier.js');
var expressionParser = require('./expression.js');
var commentParser    = require('./comment.js');
var state            = require('../state.js');

module.exports = function(obj, access) {
  var output;

  switch(obj.type) {
    case 'CLASS_ATTRIBUTE':
      if(obj.value !== null) {
        output = access + ' $' + identifierParser(obj.name) + ' = ' + expressionParser(obj.value) + ';';
      } else {
        output = access + ' $' + identifierParser(obj.name) + ';';
      }
      break;
    case 'CLASS_STATIC_ATTRIBUTE':
      output = 'public static $' + identifierParser(obj.name) + ' = ' + expressionParser(obj.value) + ';';
      break;
    case 'COMMENT':
      output = commentParser(obj);
      break;
    default:
      throw "Invalid type: " + obj.type;
      break;
  }

  return state.indentate() + output;
};
