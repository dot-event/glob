/* eslint-env jest */

var dot,
  glob = require("./glob")

beforeEach(function() {
  dot = require("dot-event")()
  glob(dot)
})

test("globs", function() {
  expect.assertions(1)
  return dot
    .glob({ pattern: "*.js" })
    .then(function(paths) {
      expect(paths).toEqual(["glob.js", "globTest.js"])
    })
})
