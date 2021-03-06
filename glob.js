/*prettier-ignore*/
"use strict"

var globWithCallback = require("glob"),
  promisify = require("util").promisify

var globLib = promisify(globWithCallback)

module.exports = function(dot) {
  if (dot.glob) {
    return
  }

  dot.any("glob", glob)
}

function glob(prop, arg, dot) {
  var opts = Object.assign({}, arg),
    pattern = arg.pattern

  if (Array.isArray(arg.pattern)) {
    if (arg.pattern.length > 1) {
      pattern = "{" + arg.pattern.join(",") + "}"
    } else {
      pattern = arg.pattern[0]
    }
  }

  return globLib(pattern, opts).then(function(out) {
    if (arg.save) {
      return dot.set(prop, "glob", { arg: out })
    } else {
      return out
    }
  })
}
