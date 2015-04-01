var invalid = require('../');

var Settings = {
  view: String,
  theme: String,
  facebook: Object
}

var schema = {
  name: String,
  age: Number,
  created: Date,
  settings: Settings,
  tasks: [Settings],
  langs: Array,
  test: Function,
  email: /\w+@\w+\.com/,
  alternative: function(actual, type) {
    return type == 'undefined' || type == 'string';
  }
};

var obj = {
  name: 'matt',
  age: 25,
  created: new Date(),
  settings: {
    view: 'hi',
    theme: 'blue',
    facebook: {}
  },
  tasks: [{
    view: 'hi',
    theme: 'blue',
    facebook: {}
  }],
  test: function(){},
  langs: [3, 'hi'],
  email: 'hi@gmail.com',
  alternative: 'hi'
};

var errs = invalid(obj, schema);
console.log(errs);
