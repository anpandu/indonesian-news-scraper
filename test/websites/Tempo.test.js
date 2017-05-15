// 'use strict'

var Tempo = require('../../lib/websites/Tempo.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Tempo', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/tempo/tempo-mainpage.html')
      })
      .then(Tempo.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://nasional.tempo.co/read/news/2015/11/05/058716101/abu-gunung-barujari-ganggu-37-penerbangan-di-bandara-juanda'))
        assert(_.isEqual(result[1], 'http://seleb.tempo.co/read/news/2015/11/05/219716100/sebelum-meninggal-misye-arsita-dirawat-di-kediri'))
        assert(_.isEqual(result[2], 'http://dunia.tempo.co/read/news/2015/11/05/116716099/pasca-merger-produsen-keju-ini-menutup-tujuh-pabriknya'))
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/tempo/tempo-singlepage.html')
      })
      .then(Tempo.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://gaya.tempo.co/read/news/2015/11/05/060716092/ini-7-alasan-mengapa-orang-malas-bergerak'))
        assert(_.isEqual(result['title'], 'Ini 7 Alasan Mengapa Orang Malas Bergerak'))
        assert(_.isEqual(result['date'], 1446696780000))
        assert(_.isEqual(result['img'], 'http://cdn.tmpo.co/data/2015/10/29/id_449444/449444_620.jpg'))
        assert(_.isEqual(result['content'], 'TEMPO.CO, Jakarta - Organisasi Kesehatan Dunia (WHO) menyebutkan, kurangnya aktivitas fisik termasuk dalam atribut peringkat keempat tertinggi setelah hipertensi, diabetes, dan merokok. Namun sayangnya, tidak semua orang sadar akan pentingnya melakukan aktivitas fisik tersebut.\nDokter spesialis olahraga Andi Kurniawan menyebutkan ada delapan faktor mengapa seseorang malas bergerak dalam kampanye BRRRGERAK 30 di Jakarta, Rabu, 4 November 2015. Andi Kurniawan menerangkan faktor cuaca dan takut cedera menjadi dua di antara faktor yang menyebabkan seseorang malas beraktivitas fisik. Tak hanya dua faktor tersebut, ia juga menyebutkan lima faktor lainnya, di antaranya sebagai berikut: Kurang Motivasi Kurangnya motivasi dari dalam diri seseorang untuk melakukan aktivitas fisik menjadi hal pertama mengapa seseorang malas untuk bergerak. "Mereka enggak tahu manfaatnya," kata dia. Andi menjelaskan, seseorang dapat dikatakan aktif jika sudah melakukan 10 ribu langkah setiap harinya. "Jadi untuk memotivasi, sebaiknya beli activity checker supaya bisa mengecek berapa langkah yang Anda lakukan hari ini, kalau kurang, Anda bisa termotivasi untuk mencapai target," lanjut Andi. Tidak Punya Waktu Rutinitas padat yang dimiliki sebagian banyak orang membuat seseorang hampir tidak memiliki waktu untuk melakukan aktivitas fisik. Namun, menurut Andi, jika seseorang ingin memulai gaya hidup sehat sebenarnya dia bisa melakukan hal sederhana seperti mulai menggunakan kendaraan umum daripada kendaraan pribadi. "Dengan begitu, kan kita berjalan ke halte busway dan biasakan berhenti sebelum halte dekat kantor supaya membiasakan diri jalan cepat karena diburu waktu, contohnya," kata Andi. Pengaruh Media Sosial Tak dipungkiri lagi, media sosial menjadi salah satu faktor yang membuat orang malas bahkan lupa. Bagaimana tidak, tanpa sadar banyak orang bisa menghabiskan waktu hanya dengan melakukan aktivitas di dunia maya tanpa bergerak. Kurang Berenergi Padatnya aktivitas sehari-hari yang dilakukan membuat seseorang malas untuk bergerak dengan alasan kurang memiliki energi. "Padahal, justru dengan melakukan aktivitas fisik, kita jadi punya energi," ucap Andi. Kurangnya Fasilitas Olahraga "Sebenarnya kita bisa melakukan aktivitas di mana saja," tutur Andi. "Misalnya angkat beban bisa manfaatkan berat badan tubuh kita sendiri." Ia juga menjelaskan, sebenarnya jika seseorang ingin sehat, aktivitas sederhana seperti jalan saja bisa dilakukan. DINI TEJA'))
        assert(_.isEqual(result['source'], 'Tempo'))
      })
  })

  // // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Tempo.scrap)
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
  //     .then(Tempo.getURLs)
  //     .then(console.log)
  // })

})
