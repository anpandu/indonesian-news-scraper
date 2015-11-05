'use strict'

var Kompas = require('../../lib/websites/Kompas.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Kompas', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/kompas/kompas-mainpage.html')
      })
      .then(Kompas.getURLsFromMainPage)
      .then(function (result) {
        assert(result[0] == 'http://regional.kompas.com/read/2015/11/04/21040031/Polres.Lhokseumawe.Serahkan.Anggota.Di.Minimi.ke.Kejaksaan')
        assert(result[1] == 'http://regional.kompas.com/read/2015/11/04/20571381/Balutan.Galeri.Seni.di.Terminal.Baru.Bandara.Husein.Sastranegara')
        assert(result[2] == 'http://regional.kompas.com/read/2015/11/04/20510051/16.Orang.Tahanan.di.Polres.Kutai.Timur.Kabur')
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/kompas/kompas-singlepage.html')
      })
      .then(Kompas.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('summary'))
        assert(result['url'] == 'http://regional.kompas.com/read/2015/11/04/21040031/Polres.Lhokseumawe.Serahkan.Anggota.Di.Minimi.ke.Kejaksaan')
        assert(result['title'] == 'Polres Lhokseumawe Serahkan Anggota Di Minimi ke Kejaksaan')
        assert(result['date'] == 'Rabu 4 November 2015  21:04 ')
        assert(result['img'] == 'http://assets.kompas.com/data/photo/2015/11/04/2050471Senjata-Komeng780x390.jpg')
        assert(result['summary'] == 'Penyidik Polres Lhokseumawe menyerahkan senjata AK 56 dan puluhan amunisi milik Komeng ke Kejaksaan Negeri Lhoksukon, Aceh Utara, Aceh, Rabu (4/11/2015)')
      })
  })

  // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Kompas.scrap)
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
