'use strict'

var TempoEnglish = require('../../lib/websites/TempoEnglish.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('TempoEnglish', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/tempo-english/tempoen-mainpage.html')
      })
      .then(TempoEnglish.getURLsFromMainPage)
      .then(function (result) {
        assert(true, result[0] == 'http://en.tempo.co/read/news/2015/11/04/055715866,uk.html/Three-Earthquakes-Hit-Alor-Damaging-Dozens-of-Homes')
        assert(true, result[1] == 'http://en.tempo.co/read/news/2015/11/04/057715859,uk.html/Police-Arrests-Fake-Stamp-Maker')
        assert(true, result[2] == 'http://en.tempo.co/read/news/2015/11/04/055715844,uk.html/Barujari-Volcanic-Ash-Disrupts-16-Flights-at-Juanda-Airport')
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/tempo-english/tempoen-singlepage.html')
      })
      .then(TempoEnglish.getDataFromSinglePage)
      .then(function (result) {
        assert(true, result.hasOwnProperty("url"))
        assert(true, result.hasOwnProperty("title"))
        assert(true, result.hasOwnProperty("date"))
        assert(true, result.hasOwnProperty("img"))
        assert(true, result.hasOwnProperty("summary"))
      })
  })

  // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(TempoEnglish.scrap)
  //     .then(function (result) {
  //       console.log(result)
  //       result.forEach(function (item) {
  //         assert(true, item.hasOwnProperty("url"))
  //         assert(true, item.hasOwnProperty("title"))
  //         assert(true, item.hasOwnProperty("date"))
  //         assert(true, item.hasOwnProperty("img"))
  //         assert(true, item.hasOwnProperty("summary"))
  //       })
  //     })
  // })

})
