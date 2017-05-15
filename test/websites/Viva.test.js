'use strict'

var Viva = require('../../lib/websites/Viva.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Viva', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/viva/viva-mainpage.html')
      })
      .then(Viva.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://life.viva.co.id/style/read/736450-desain-tas-nyeleneh-dengan-bentuk-ikan-mas'))
        assert(_.isEqual(result[1], 'http://politik.news.viva.co.id/news/read/736458-soal-din-minimi-keputusan-ada-di-tangan-jokowi'))
        assert(_.isEqual(result[2], 'http://log.viva.co.id/news/read/736454-menikmati-4b-khas-manado-dari-bubur-hingga-bunaken'))
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/viva/viva-singlepage.html')
      })
      .then(Viva.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://life.viva.co.id/showbiz/read/736460-taylor-swift-standing-ovation-untuk-pianis-cilik-indonesia'))
        assert(_.isEqual(result['title'], 'Taylor Swift Standing Ovation untuk Pianis Cilik Indonesia'))
        assert(_.isEqual(result['date'], 1455602460000))
        assert(_.isEqual(result['img'], 'http://media.viva.co.id/thumbs2/2016/02/16/365745_joey-alexander-di-grammy-awards-ke-58_641_452.jpg'))
        assert(_.isEqual(result['content'], 'Pianis cilik Indonesia, Joey Alexander, boleh saja gagal meraih piala Grammy Awards tahun ini. Namun, Joey yang menyabet dua nominasi Grammy Awards tersebut sukses memukau seluruh hadirin yang memenuhi gedung Staples Center di Los Angeles, California, Senin malam, 15 Februari 2016 waktu setempat.\nSetelah tampil di Grammy Awards Premiere Ceremony, remaja berusia 12 tahun ini mendapat kesempatan tampil di atas panggung utama Grammy Awards. Tak tanggung-tanggung, CEO sekaligus Presiden Recording Academy Neil Portnow dan artis Common, naik ke atas panggung untuk memperkenalkan Joey kepada penonton.\n"Inilah nominasi Grammy termuda tahun ini, Joey Alexander yang berusia 12 tahun," ujar Common.\nPianis kelahiran Denpasar, Bali, itu pun langsung memperlihatkan kemahirannya memainkan musik jazz dengan piano. Meski tak lama, penampilan sang pianis mampu membetot perhatian para musisi dunia yang hadir malam itu.\nDalam tayangan langsung Grammy, penyanyi Taylor Swift, Selena Gomez, dan Bruno Mars beranjak dari tempat duduk mereka untuk memberikan standing ovation kepada Joey. Begitu pula dengan seluruh undangan Grammy Awards yang hadir.\nTaylor Swift memberikan standing ovation untuk Joey Alexander. Foto: Grammy\nBruno Mars memberikan standing ovation untuk Joey Alexander. Foto: Grammy\nMenutup penampilan Joey, Presiden Recording Academy Neil Portnow tak sungkan memuji sang pianis.\n"Joey sangat luar biasa. Saya ingat seusia Joey, pertama kali belajar gitar, meski bukan sekaliber Grammy tapi hasrat musik telah membawa saya pada tahap ini," kata Portnow.'))
        assert(_.isEqual(result['source'], 'Viva'))
      })
  })

  // // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Viva.scrap)
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
  //     .then(Viva.getURLs)
  //     .then(console.log)
  // })

})
