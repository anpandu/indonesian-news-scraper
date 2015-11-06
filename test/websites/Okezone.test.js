'use strict'

var Okezone = require('../../lib/websites/Okezone.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Okezone', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/okezone/okezone-mainpage.html')
      })
      .then(Okezone.getURLsFromMainPage)
      .then(function (result) {
        assert(result[0] == 'http://news.okezone.com/read/2015/11/05/15/1244290/perangkat-unit-kontrol-airbag-rusak-126-ribu-mercy-di-recall')
        assert(result[1] == 'http://news.okezone.com/read/2015/11/05/65/1244288/tangani-kabut-asap-perguruan-tinggi-tak-kompak')
        assert(result[2] == 'http://news.okezone.com/read/2015/11/05/519/1244289/penerbangan-ke-bali-dan-lombok-dari-surabaya-belum-normal')
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/okezone/okezone-singlepage.html')
      })
      .then(Okezone.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(result['url'] == 'http://lifestyle.okezone.com/read/2015/11/05/481/1244264/sering-depresi-berat-hati-hati-diabetes')
        assert(result['title'] == 'Sering Depresi Berat, Hati-Hati Diabetes!')
        assert(result['date'] == 'Kamis, 5 November 2015 - 15:56 wib')
        assert(result['img'] == 'https://img.okezone.com//content/2015/11/05/481/1244264/sering-depresi-berat-hati-hati-diabetes-4iGLnhEgWh.jpg')
        assert(result['content'] == 'DEPRESI jadi satu momok yang wajib diwaspadai siapa saja. Karena gangguan kesehatan mental berisiko mengidap diabetes. Lantas apa sih kaitannya? Staf Divisi Metabolik Endokrin Fakultas Kedokteran Universitas Indonesia-Rumah Sakit Cipto Mangunkusumo dr Wismandari Wisnu SpPD-KEMD mengungkap, seorang yang mengalami depresi berat akan berisiko mengidap diabetes. Juga hal ini berlaku bagi si pengidap penyakit gula yang sedang menjalani masa terapi. "Depresi adalah suatu kondisi yang memengaruhi hormon serotonin di dalam tubuh kita jadi meningkat," ujar dr Wisman saat Press Conference Jakarta Diabetes Meeting 2015 di Pearl Restaurant Hotel JW Marriot, kawasan Mega Kuningan, Jakarta Selatan, kemarin. Apabila produksi serotonin meningkat, tambah dr Wisman, gula darah di dalam tubuh si pengidap diabetes pun ikut-ikutan naik. Proses ini juga akan mudah terjadi, apabila sepanjang hidupnya tak menjaga pola makan dan olahraga teratur. "Gula darah meningkat secara otomatis, berat badan juga bertambah. Dengan begitu kaitan antara diabetes dan dspresi sangat erat dan memiliki risiko dalam jangka panjang," tukasnya.')
      })
  })

  // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Okezone.scrap)
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

})
