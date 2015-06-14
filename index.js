var clone = require('clone')
  , key = require('key')
  , by = require('by')

module.exports = function join(left, right){
  return function(d){
    var array = right.split('.')
      , table = array.shift()
      , field = array.join('.')

    d[left] = ripple(table)
      .filter(by('id', clone(d[left])))
      .map(key(field))
      .pop() || {}

    return d
  }
}
