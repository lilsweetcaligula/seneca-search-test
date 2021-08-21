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


function add(args = {}) {
  const { seneca } = args
  Assert(null != seneca, 'The "seneca" argument is required')
  Assert(seneca.isSeneca, 'The "seneca" argument must be a Seneca instance')


  describe('addition of documents to the search pool', () => {
    /*
     * NOTE: We cannot reliably tell whether the addition API works or not,
     * until we test the searching API. Thus, our best bet is to ensure, that
     * the addition API completes without errors under normal circumstances.
     */
    it('completes without errors', done => {
      seneca.test(done)

      const new_doc = {
        id: 'aaaa',
        lorem: 'lorem',
        ipsum: 'ipsum'
      }

      seneca.act('sys:search,cmd:add', { doc: new_doc }, function (err, out) {
        if (err) {
          return done(err)
        }

        expect(out).toEqual(jasmine.objectContaining({ ok: true }))


        seneca.act('sys:search,cmd:remove', { id: 'aaaa' }, function (err, out) {
          if (err) {
            return done(err)
          }

          Assert(out && out.ok)

          return done()
        })
      })
    })
  })
}


function remove(args = {}) {
  const { seneca } = args
  Assert(null != seneca, 'The "seneca" argument is required')
  Assert(seneca.isSeneca, 'The "seneca" argument must be a Seneca instance')


  describe('deletion of documents to the search pool', () => {
    /*
     * NOTE: We cannot reliably tell whether the deletion API works or not,
     * until we test the searching API. Thus, our best bet is to ensure, that
     * the deletion API completes without errors under normal circumstances.
     */
    it('completes without errors', done => {
      seneca.test(done)

      const new_doc = {
        id: 'aaaa',
        lorem: 'lorem',
        ipsum: 'ipsum'
      }

      seneca.act('sys:search,cmd:add', { doc: new_doc }, function (err, out) {
        if (err) {
          return done(err)
        }

        Assert(out && out.ok)

        seneca.act('sys:search,cmd:remove', { id: 'aaaa' }, function (err, out) {
          if (err) {
            return done(err)
          }

          expect(out).toEqual(jasmine.objectContaining({ ok: true }))

          return done()
        })
      })
    })
  })
}


function search(args = {}) {
  const { seneca } = args
  Assert(null != seneca, 'The "seneca" argument is required')
  Assert(seneca.isSeneca, 'The "seneca" argument must be a Seneca instance')


  describe('searching for a value', () => {
    it('finds a document with a field equal to the value', done => {
      seneca.test(done)

      const doc = {
        id: 'aaaa',
        lorem: 'lorem',
        ipsum: 'ipsum'
      }

      seneca.act('sys:search,cmd:add', { doc }, function (err, out) {
        if (err) {
          return done(err)
        }

        Assert(out && out.ok)


        const search_args = { query: 'lorem' }

        seneca.act('sys:search,cmd:search', search_args, function (err, search) {
          if (err) {
            return done(err)
          }

          seneca.act('sys:search,cmd:remove', { id: 'aaaa' }, function (err, del) {
            expect(search).toEqual(jasmine.objectContaining({
              ok: true,
              data: {
                hits: [
                  { id: 'aaaa', doc }
                ]
              }
            }))

            Assert(del && del.ok)

            return done()
          })
        })
      })
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
  supports_remove,
  add,
  remove,
  search
}
