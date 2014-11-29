
# invalid

  Validate an object against a schema. This is the schema validation library you actually wanted.

  This library is only responsible for type-checking and leaves the requires, filtering, etc. to other libraries.

## install

    npm install invalid

## Example

```js
var isEmail = /\w+@\w+.com/;
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
  tasks: [String],
  langs: Array,
  email: isEmail
};

var obj = {
  name: 'matt',
  age: 25,
  created: new Date(),
  settings: {
    view: 'hi',
    theme: 'blue',
    facebook: true
  },
  tasks: [4],
  langs: [3, 'hi'],
  email: 'hi@lapwinglabs.com'
};

/**
 * Validate
 */

invalid(obj, schema)
// [TypeError: settings.facebook: true is not a object, tasks[0]: "hi" is not a number]

/**
 * Currying
 */

var errors = invalid(schema);
errors(obj)
// [TypeError: settings.facebook: true is not a object, tasks[0]: "hi" is not a number]

obj.settings.facebook = {};
tasks[0] = 5;
errors(obj) // false
```

## API

### `invalid(obj, schema) => boolean|typeerror`

Validate `obj` against a `schema`. If the object is invalid, `invalid` will return an error containing all the issues. If the object is valid, `invalid` will return `false`.

### `invalid(schema) => function`

If you just pass a schema in, you will get a function back that you can use to validate against any number of objects.

## Types

Most of the types are self-explanatory, but here are a few unique types:

### Objects

```js
Object: Object containing values of any type
Settings: Setting `object` that is recursively enforced by `invalid`
```

### Arrays

```js
[String]: Array of Strings
[Number]: Array of Numbers
[Settings]: Array of `Setting` objects that is recursively enforced by `invalid`.
...
Array: Array containing any type of value
```

## License

(The MIT License)

Copyright (c) 2014 Matthew Mueller &lt;matt@lapwinglabs.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
