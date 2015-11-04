'use strict'

var TempoEnglish = require('../../lib/websites/TempoEnglish.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('TempoEnglish', function () {

  it('getDataFromScrap()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/tempoen-scrap.html')
      })
      .then(TempoEnglish.getDataFromScrap)
      .then(function (result) {
        result.forEach(function (item) {
          assert(true, item.hasOwnProperty("url"))
          assert(true, item.hasOwnProperty("title"))
          assert(true, item.hasOwnProperty("date"))
          assert(true, item.hasOwnProperty("img"))
          assert(true, item.hasOwnProperty("summary"))
        })
      })
  })

})
