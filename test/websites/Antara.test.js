'use strict'

var Antara = require('../../lib/websites/Antara.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Antara', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/antara/antara-mainpage.html')
      })
      .then(Antara.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://www.antaranews.com/berita/527615/29-penerbangan-bandara-internasional-lombok-dibatalkan'))
        assert(_.isEqual(result[1], 'http://www.antaranews.com/berita/527614/mengatasi-kebuntuan-riset-pangan-indonesia'))
        assert(_.isEqual(result[2], 'http://www.antaranews.com/berita/527613/indonesia-akan-terima-kunjungan-presiden-italia'))
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/antara/antara-singlepage.html')
      })
      .then(Antara.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://www.antaranews.com/berita/527615/29-penerbangan-bandara-internasional-lombok-dibatalkan'))
        assert(_.isEqual(result['title'], '29 penerbangan Bandara Internasional Lombok dibatalkan'))
        // assert(_.isEqual(result['date'], '2015-11-05T14:56:43+07:00'))
        assert(_.isEqual(result['img'], 'http://img.antaranews.com/new/2015/11/ori/20151105antarafoto-pantau-semburan-gunung-rinjani-051115-bcs-2.jpg'))
        assert(_.isEqual(result['content'], 'Mataram, NTB (ANTARA News) - Sebanyak 29 penerbangan baik domestik dan internasional dari dan menuju Bandara Internasional Lombok harus dibatalkan menyusul ditutupnya operasional bandara akibat abu vulkanik erupsi Gunung Baru Jari, anak Gunung Rinjani. Kepala Seksi Urusan Umum dan Humas PT Angkasa I Bandara Internasional Lombok (BIL), Eka Asmadi, saat dihubungi melalui telepon dari Mataram, Kamis, mengatakan,pembatalan seluruh penerbangan itu dilakukan mulai tadi pagi pukul 08.00 Wita sampai Jumat (6/11) pukul 08.45 WITA. "Penutupan operasional bandara dan pembatalan penerbangan ini dilakukan demi keselamatan, mengingat abu vulkanik dari letusan Gunung Baru Jari sudah menyelimuti bandara, sehingga sangat membahayakan penerbangan," katanya. Menurut dia, akibat penutupan operasional bandara, sebanyak 27 penerbangan domestik dan dua internasional dari Malaysia harus dibatalkan dan dialihkan ke bandara lain. "Total ada 3.016 orang penumpang domestik dan 348 orang penumpang internasional yang harus tertunda dan menjadwal ulang keberangkatannya di BIL," katanya.'))
        assert(_.isEqual(result['source'], 'Antara'))
      })
  })

  // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Antara.scrap)
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

  // === this test do I/O
  // it('getURLs', function () {
  //   return Promise.resolve()
  //     .then(Antara.getURLs)
  //     .then(console.log)
  // })

})
