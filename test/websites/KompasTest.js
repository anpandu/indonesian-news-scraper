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
        assert(true, result[0] == 'http://regional.kompas.com/read/2015/11/04/21040031/Polres.Lhokseumawe.Serahkan.Anggota.Di.Minimi.ke.Kejaksaan')
        assert(true, result[1] == 'http://regional.kompas.com/read/2015/11/04/20571381/Balutan.Galeri.Seni.di.Terminal.Baru.Bandara.Husein.Sastranegara')
        assert(true, result[2] == 'http://regional.kompas.com/read/2015/11/04/20510051/16.Orang.Tahanan.di.Polres.Kutai.Timur.Kabur')
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/kompas/kompas-singlepage.html')
      })
      .then(Kompas.getDataFromSinglePage)
      .then(function (result) {
        assert(true, result.hasOwnProperty('url'))
        assert(true, result.hasOwnProperty('title'))
        assert(true, result.hasOwnProperty('date'))
        assert(true, result.hasOwnProperty('img'))
        assert(true, result.hasOwnProperty('summary'))
        assert(true, result['url'] == 'http://regional.kompas.com/read/2015/11/04/21040031/Polres.Lhokseumawe.Serahkan.Anggota.Di.Minimi.ke.Kejaksaan')
        assert(true, result['title'] == 'Polres Lhokseumawe Serahkan Anggota Di Minimi ke Kejaksaan')
        assert(true, result['date'] == 'Rabu 4 November 2015  21:04 ')
        assert(true, result['img'] == 'http://assets.kompas.com/data/photo/2015/11/04/2050471Senjata-Komeng780x390.jpg')
        assert(true, result['summary'] == 'Penyidik Polres Lhokseumawe menyerahkan senjata AK 56 dan puluhan amunisi milik Komeng ke Kejaksaan Negeri Lhoksukon, Aceh Utara, Aceh, Rabu (4/11/2015)')
      })
  })

  // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Kompas.scrap)
  //     .then(function (result) {
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
