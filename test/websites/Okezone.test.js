'use strict'

var Okezone = require('../../lib/websites/Okezone.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Okezone', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/okezone/okezone-mainpage.html')
      })
      .then(Okezone.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://news.okezone.com/read/2015/11/05/15/1244290/perangkat-unit-kontrol-airbag-rusak-126-ribu-mercy-di-recall'))
        assert(_.isEqual(result[1], 'http://news.okezone.com/read/2015/11/05/65/1244288/tangani-kabut-asap-perguruan-tinggi-tak-kompak'))
        assert(_.isEqual(result[2], 'http://news.okezone.com/read/2015/11/05/519/1244289/penerbangan-ke-bali-dan-lombok-dari-surabaya-belum-normal'))
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
        assert(_.isEqual(result['url'], 'http://lifestyle.okezone.com/read/2015/11/05/481/1244264/sering-depresi-berat-hati-hati-diabetes'))
        assert(_.isEqual(result['title'], 'Sering Depresi Berat, Hati-Hati Diabetes!'))
        assert(_.isEqual(result['date'], 1446713760000))
        assert(_.isEqual(result['img'], 'https://img.okezone.com//content/2015/11/05/481/1244264/sering-depresi-berat-hati-hati-diabetes-4iGLnhEgWh.jpg'))
        assert(_.isEqual(result['content'], 'DEPRESI jadi satu momok yang wajib diwaspadai siapa saja. Karena gangguan kesehatan mental berisiko mengidap diabetes. Lantas apa sih kaitannya?\nStaf Divisi Metabolik Endokrin Fakultas Kedokteran Universitas Indonesia-Rumah Sakit Cipto Mangunkusumo dr Wismandari Wisnu SpPD-KEMD mengungkap, seorang yang mengalami depresi berat akan berisiko mengidap diabetes. Juga hal ini berlaku bagi si pengidap penyakit gula yang sedang menjalani masa terapi.\n"Depresi adalah suatu kondisi yang memengaruhi hormon serotonin di dalam tubuh kita jadi meningkat," ujar dr Wisman saat Press Conference Jakarta Diabetes Meeting 2015 di Pearl Restaurant Hotel JW Marriot, kawasan Mega Kuningan, Jakarta Selatan, kemarin.\nApabila produksi serotonin meningkat, tambah dr Wisman, gula darah di dalam tubuh si pengidap diabetes pun ikut-ikutan naik. Proses ini juga akan mudah terjadi, apabila sepanjang hidupnya tak menjaga pola makan dan olahraga teratur.\n"Gula darah meningkat secara otomatis, berat badan juga bertambah. Dengan begitu kaitan antara diabetes dan dspresi sangat erat dan memiliki risiko dalam jangka panjang," tukasnya.'))
        assert(_.isEqual(result['source'], 'Okezone'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/okezone/okezone-singlepage2.html')
      })
      .then(Okezone.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://celebrity.okezone.com/read/2017/02/17/33/1620900/cara-indra-birowo-jaga-keromantisan-dengan-istri'))
        assert(_.isEqual(result['title'], 'Cara Indra Birowo Jaga Keromantisan dengan Istri'))
        assert(_.isEqual(result['date'], 1487313000000))
        assert(_.isEqual(result['img'], 'https://img.okezone.com//content/2017/02/17/33/1620900/cara-indra-birowo-jaga-keromantisan-dengan-istri-UWr3JLezl2.jpg'))
        assert(_.isEqual(result['content'], 'JAKARTA - Memiliki segudang kesibukan di dunia entertainment, tidak membuat aktor sekaligus komedian, Indra Birowo lupa dengan sang istri. Pria berusia 44 tahun ini bahkan menyatakan bahwa ia selalu mencoba peka terhadap situasi saat sedang bersama sang istri untuk tetap romantis.\nHal-hal sederhana selalu ia tunjukkan kepada sang istri demi menjaga keromantisan hubungan rumah tangganya. Bahkan Indra mengaku sering membelikan sang istri bunga untuk membuat hubungan keduanya semakin mesra.\n"Ya harus bisa lebih peka terhadap situasi saja sih, kalau misalnya lama berdua enggak ngobrol misalnya, ya sekali waktu malam bawa bunga, atau ajak pergi dinner atau nonton," kata Indra Birowo kepada Okezone, Jumat (17/2/2017).\n"Kadang dengan hal yang simple, dia belanja dan aku jemput. Yang dia pikir aku enggak akan jemput. Ya hal-hal simple, tapi kadang kalau di dalam keseharian jadi penting," sambungnya.\nUlang tahun pernikahan bagi Indra Birowo merupakan sebuah momen istrimewa yang hampir tidak pernah luput dari pandangannya. Ia bahkan mengaku bingung untuk memberikan kejutan apalagi untuk sang istri, lantaran setiap tahunnya ia selalu memberikan hal yang istimewa kepada ibu dari kedua anaknya tersebut.\n"Tanggal 21 besok kan ulang tahun pernikahan, tapi enggak ada rencana apa-apa. Tapi aku sih ingin membuat sesuatu itu, tapi apa masih belum tahu," tuturnya.\n"Enggak tahunya karena setiap tahun selalu begitu, jadi bingung mau buat sesuatu yang beda. Ya biasanya sih pasti ada sesuatu yang dibawa, apakah hadiah, ya gitu-gitulah," tandasnya. (FHM)\n0 Komentar'))
        assert(_.isEqual(result['source'], 'Okezone'))
      })
  })

  // // === this test do I/O
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

  // // === this test do I/O
  // it('getURLs', function () {
  //   return Promise.resolve()
  //     .then(Okezone.getURLs)
  //     .then(console.log)
  // })

})
