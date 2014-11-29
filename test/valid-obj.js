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
  email: /\w+@\w+\.com/
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
  langs: [3, 'hi'],
  email: 'hi'
};

var errs = invalid(obj, schema);
console.log(errs);
