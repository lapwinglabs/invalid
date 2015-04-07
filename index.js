/**
 * Type
 */

try {
  var type = require('type');
} catch (e) {
  var type = require('component-type');
}

/**
 * Export `invalid`
 */

module.exports = invalid;

/**
 * Initialize `invalid`
 *
 * @param {Mixed} obj
 * @param {Mixed} schema
 * @return {Boolean|TypeError}
 * @api public
 */

function invalid(obj, schema) {
  return 1 == arguments.length
    ? function (o) { return check(valid(o, obj)); }
    : check(valid(obj, schema));

  // pass the errors through
  function check(errs) {
    return errs.length
      ? new TypeError(errs.join(', '))
      : false
  }
}

/**
 * Cast the string
 */

var cast = {
  'undefined': undefined,
  'function': Function,
  'boolean': Boolean,
  'number': Number,
  'string': String,
  'regexp': RegExp,
  'object': Object,
  'array': Array,
  'date': Date,
  'null': null,
  'nan': NaN
};

/**
 * Get the type
 *
 * @param {Mixed} val
 * @return {String}
 */

function typecheck(val) {
  switch(val) {
    case undefined: return 'undefined';
    case Function: return 'function';
    case Boolean: return 'boolean';
    case Number: return 'number';
    case String: return 'string';
    case RegExp: return 'regexp';
    case Object: return 'object';
    case Array: return 'Array';
    case Date: return 'date';
    case null: return 'null';
    case NaN: return 'nan';
    default: return type(val);
  }
}

/**
 * Validate `actual` against `expected`
 *
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @param {String} key (private)
 * @return {Array} errors
 * @api public
 */

function valid(actual, expected, key) {
  key = key || '';

  var et = typecheck(expected);
  var t = typecheck(actual);
  var errs = [];

  if ('object' == et && t == et) {
    for (var k in expected)
      errs = errs.concat(valid(actual[k], expected[k], key ? key + '.' + k : k));
  } else if ('array' == et && t == et) {
    for (var i = 0, v; v = actual[i]; i++)
      errs = errs.concat(valid(v, expected[0], key ? key + '[' + i + ']': i));
  } else if ('function' == et && !actual.prototype) {
    !expected(actual, t) && errs.push(error(t, key, actual, expected));
  } else if ('regexp' == et && expected instanceof RegExp) {
    !expected.test(actual) && errs.push(error(t, key, actual, expected));
  } else if (cast[t] != expected) {
    errs.push(error(t, key, actual, expected));
  }

  return errs;
}

/**
 * Format an error
 *
 * @param {String} type
 * @param {String} key (optional)
 * @param {Mixed} actual
 * @param {Mixed} expected
 * @return {String}
 * @api private
 */

function error(type, key, actual, expected) {
  var msg = key ? key + ': ' : '';
  if (expected instanceof RegExp) {
    msg += fmt(type, actual) + ' does not match regexp ' + expected;
  } else if ('function' == type && !actual.prototype) {
    msg += 'function(' + actual + ') returned false';
  } else {
    msg += fmt(type, actual) + ' is not a ' + typecheck(expected);
  }
  return msg;
}

/**
 * Format based on type
 *
 * @param {String} type
 * @param {Mixed} actual
 * @return {String}
 * @api private
 */

function fmt(type, actual) {
  switch(type) {
    case 'string': return actual = '"' + actual + '"';
    case 'object': return JSON.stringify(actual);
    case 'undefined':
    case 'number':
    case 'null':
      return actual;
    case 'function':
      return actual.toString().replace(/\{[^\}]+/, '{ ... ');
    default:
      return actual.toString();
  }
}
