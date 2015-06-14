var clone = require('clone')
  , key = require('key')
  , by = require('by')

module.exports = function join(left, right){
  return function(d){
    right = right.split('.')
    var table = right.shift()
      , field = right.join('.')

    d[left] = ripple(right)
      .filter(by('id', clone(d[left])))
      .map(key(field))
      .pop() || {}

    return d
  }
}
