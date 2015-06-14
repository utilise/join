var expect = require('chai').expect
  , ripple = global.ripple = mock
  , join = require('./')

describe('join', function() {

  it('should replace prop with details', function() {
    var o = { prop: 1 }
    join('prop', 'props')(o)
    expect(o).to.be.eql({ prop: { id: 1, name: 'foo' } })
  })

  it('should replace prop with deep detail', function() {
    var o = { prop: 1 }
    join('prop', 'props.name')(o)
    expect(o).to.be.eql({ prop: 'foo' })
  })

  it('should blank gracefully on missing detail', function() {
    var o = { prop: 3 }
    join('prop', 'props.name')(o)
    expect(o).to.be.eql({ prop: {} })
  })

})

function mock() {
  return [
    { id: 1, name: 'foo' }
  , { id: 2, name: 'bar' }
  ]
}