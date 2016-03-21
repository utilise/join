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

  it('should lookup array items', function() {
    var a = [1,2]
    a = a.map(join('props'))
    expect(a).to.be.eql([{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }])
  })

  it('should lookup array items and replace with deep detail', function() {
    var a = [1,2]
    a = a.map(join('props.name'))
    expect(a).to.be.eql(['foo', 'bar'])
  })

  it('should work on plain objects without ripple', function() {
    var o = { prop: 1 }
    join('prop', mock())(o)
    expect(o).to.be.eql({ prop: { id: 1, name: 'foo' } })
  })

  it('should work on plain objects without prop', function() {
    expect(join(mock())(1)).to.be.eql({ id: 1, name: 'foo' })
  })

  it('should work on falsy', function() {
    expect(join(null)(1)).to.be.eql({})
  })

  it('should allow joing by any column', function() {
    expect(join(mock())('foo', 'name')).to.be.eql({ id: 1, name: 'foo' })
    expect(join('prop', 'props')({ prop: 1 })).to.be.eql({ prop: { id: 1, name: 'foo' } })
  })

  it('should return gracefully with null/undefined id', function() {
    expect(join(mock())(undefined)).to.be.eql(undefined)
    expect(join(mock())(null)).to.be.eql(undefined)
  })

})

function mock() {
  return [
    { id: 1, name: 'foo' }
  , { id: 2, name: 'bar' }
  ]
}