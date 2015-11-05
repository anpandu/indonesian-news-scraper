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
        assert(result[0] == 'http://en.tempo.co/read/news/2015/11/04/055715866,uk.html/Three-Earthquakes-Hit-Alor-Damaging-Dozens-of-Homes')
        assert(result[1] == 'http://en.tempo.co/read/news/2015/11/04/057715859,uk.html/Police-Arrests-Fake-Stamp-Maker')
        assert(result[2] == 'http://en.tempo.co/read/news/2015/11/04/055715844,uk.html/Barujari-Volcanic-Ash-Disrupts-16-Flights-at-Juanda-Airport')
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/tempo-english/tempoen-singlepage.html')
      })
      .then(TempoEnglish.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty("url"))
        assert(result.hasOwnProperty("title"))
        assert(result.hasOwnProperty("date"))
        assert(result.hasOwnProperty("img"))
        assert(result.hasOwnProperty("summary"))
        assert(result['url'] == 'http://en.tempo.co/read/news/2015/11/04/055715684,uk.html/Indonesia-can-Learn-from-Finlands-Peatland-Fire-Case-Pratikno')
        assert(result['title'] == 'Indonesia can Learn from Finland`s Peatland Fire Case: Pratikno')
        assert(result['date'] == 'Wednesday 04 November, 2015   07:28 ')
        assert(result['img'] == 'http://cdn.tmpo.co/data/2015/09/15/id_437155/437155_620.jpg')
        assert(result['summary'] == 'Indonesia could learn from Finlands experience in handling peatlands as they cover about one-third of Finland`s territory.')
      })
  })

  // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(TempoEnglish.scrap)
  //     .then(function (result) {
  //       console.log(result)
  //       result.forEach(function (item) {
  //         assert(item.hasOwnProperty("url"))
  //         assert(item.hasOwnProperty("title"))
  //         assert(item.hasOwnProperty("date"))
  //         assert(item.hasOwnProperty("img"))
  //         assert(item.hasOwnProperty("summary"))
  //       })
  //     })
  // })

})
