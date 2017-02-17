// 'use strict'

var TempoEnglish = require('../../lib/websites/TempoEnglish.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('TempoEnglish', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/tempo-english/tempoen-mainpage.html')
      })
      .then(TempoEnglish.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://en.tempo.co/read/news/2015/11/04/055715866,uk.html/Three-Earthquakes-Hit-Alor-Damaging-Dozens-of-Homes'))
        assert(_.isEqual(result[1], 'http://en.tempo.co/read/news/2015/11/04/057715859,uk.html/Police-Arrests-Fake-Stamp-Maker'))
        assert(_.isEqual(result[2], 'http://en.tempo.co/read/news/2015/11/04/055715844,uk.html/Barujari-Volcanic-Ash-Disrupts-16-Flights-at-Juanda-Airport'))
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
        assert(result.hasOwnProperty("content"))
        assert(_.isEqual(result['url'], 'http://en.tempo.co/read/news/2015/11/04/055715684,uk.html/Indonesia-can-Learn-from-Finlands-Peatland-Fire-Case-Pratikno'))
        assert(_.isEqual(result['title'], 'Indonesia can Learn from Finland`s Peatland Fire Case: Pratikno'))
        assert(_.isEqual(result['date'], 1446596880000))
        assert(_.isEqual(result['img'], 'http://cdn.tmpo.co/data/2015/09/15/id_437155/437155_620.jpg'))
        assert(_.isEqual(result['content'], 'Indonesia could learn from Finlands experience in handling peatlands as they cover about one-third of Finland`s territory. "Peatlands cover about one-third of Finlands territory. We should manage the peatland areas properly," Secretary of State Pratikno stated on Tuesday. Pratikno noted that Finland and Canada have managed to utilize the peatland areas as a source of renewable energy. "We must improve the management of peatlands," he emphasized. "The peatland areas are not just an Indonesian problem. Other countries too faced similar problems, and they managed to deal with them. We too have to succeed," he affirmed. In response to an image depicting Jokowi with the indigenous tribe, Pratikno claimed that the Ministry of Social Affairs knew more about the meeting. "Jambi`s indigenous tribe Suku Anak Dalam has several groups. Some of them live in houses, while others lead a nomadic life," he remarked. Pratikno emphasized that the meeting was intended to address the aspirations of the indigenous people and remote tribes in Indonesia. Earlier, Indonesian Foreign Minister Retno L.P. Marsudi and her Finnish counterpart Timo Soini had held a bilateral meeting on Monday, during which both sides agreed to explore cooperation in the field of renewable energy. "Indonesia and Finland agreed to explore cooperation in the fields of renewable energy and information technology. In terms of renewable energy, we will utilize the peatland areas," Marsudi stated on Monday. According to Marsudi, peatlands cover about one-third of Finlands territory. The peatlands are utilized by the state as a source of renewable energy through the use of technology. "The country has utilized peatlands as a source of renewable energy through the use of technology. About five to seven percent of energy is sourced from peatlands," she pointed out. Therefore, Indonesia is keen to explore cooperation in the field of renewable energy in order to benefit from Finland`s technology. "Indonesia has numerous peatlands in several provinces," she remarked. Therefore, the Minister of Energy and Mineral Resources Sudirman Said will hold a meeting with Soini on Tuesday (November 3). Meanwhile, Soini expressed concern over the land and forest fires in several provinces across Sumatra and Kalimantan islands. "I would like to express deep sorrow over the haze crisis in Indonesia," Soini affirmed. During the bilateral meeting, the two ministers also discussed several bilateral issues, especially cooperation in the fields of renewable energy and information technology. "During the visit, the foreign minister of Finland is accompanied by 11 companies representing the sectors of clean and efficient energy, infrastructure, and port management, as well as information and communication technology," Soini stated.'))
        assert(_.isEqual(result['source'], 'TempoEnglish'))
      })
  })

  // // === this test do I/O
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
  //         assert(item.hasOwnProperty("content"))
  //       })
  //     })
  // })

  // // === this test do I/O
  // it('getURLs', function () {
  //   return Promise.resolve()
  //     .then(TempoEnglish.getURLs)
  //     .then(console.log)
  // })

})
