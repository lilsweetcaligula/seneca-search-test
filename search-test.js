const Assert = require('assert')


function supports_add(args = {}) {
  const { seneca } = args
  Assert(null != seneca, 'The "seneca" argument is required')
  Assert(seneca.isSeneca, 'The "seneca" argument must be a Seneca instance')


  describe('support for adding documents to the search pool', () => {
    it('should provide the API', done => {
      seneca.test(done)

      const routes = seneca.list('sys:search,cmd:add')
      expect(routes).toContain({ sys: 'search', cmd: 'add' })

      return done()
    })
  })
}


function supports_search(args = {}) {
  const { seneca } = args
  Assert(null != seneca, 'The "seneca" argument is required')
  Assert(seneca.isSeneca, 'The "seneca" argument must be a Seneca instance')


  describe('support for searching', () => {
    it('should provide the API', done => {
      seneca.test(done)

      const routes = seneca.list('sys:search,cmd:search')
      expect(routes).toContain({ sys: 'search', cmd: 'search' })

      return done()
    })
  })
}


function supports_remove(args = {}) {
  const { seneca } = args
  Assert(null != seneca, 'The "seneca" argument is required')
  Assert(seneca.isSeneca, 'The "seneca" argument must be a Seneca instance')


  describe('support for removal of documents from the search pool', () => {
    it('should provide the API', done => {
      seneca.test(done)

      const routes = seneca.list('sys:search,cmd:remove')
      expect(routes).toContain({ sys: 'search', cmd: 'remove' })

      return done()
    })
  })
}


module.exports = {
  supports_add,
  supports_search,
  supports_remove
}
