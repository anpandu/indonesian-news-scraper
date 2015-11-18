'use strict'

var Republika = require('../../lib/websites/Republika.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Republika', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/republika/republika-mainpage.html')
      })
      .then(Republika.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://nasional.republika.co.id/berita/nasional/hukum/15/11/05/nxc181330-sejak-jadi-tersangka-ketua-dprd-sumut-tak-masuk-kerja'))
        assert(_.isEqual(result[1], 'http://khazanah.republika.co.id/berita/dunia-islam/islam-nusantara/15/11/05/nxc0yg313-wapres-gelar-pahlawan-suatu-kepantasan'))
        assert(_.isEqual(result[2], 'http://khazanah.republika.co.id/berita/dunia-islam/islam-nusantara/15/11/05/nxc00q313-tak-sekedar-wisuda-wa-upaya-bumikan-alquran'))
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/republika/republika-singlepage.html')
      })
      .then(Republika.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://bola.republika.co.id/berita/sepakbola/liga-inggris/15/11/18/nxzqjd348-city-siap-tawarkan-kontrak-baru-untuk-fernandinho'))
        assert(_.isEqual(result['title'], 'City Siap Tawarkan Kontrak Baru untuk Fernandinho'))
        // assert(_.isEqual(result['date'], '2015-11-17T17:00:00.000Z'))
        assert(_.isEqual(result['img'], 'http://static.republika.co.id/uploads/images/kanal_slide/fernandinho-_140913100056-179.jpg'))
        assert(_.isEqual(result['content'], 'REPUBLIKA.CO.ID,  MANCHESTER— Sebelum menjadi gelandang Manchester City, Fernandinho adalah pemain Shakhtar Donetsk. City lalu membelinya senilai 30 juta poundsterling untuk diboyong ke Etihad Stadium pada 2013. City bersiap menawarkan kesepakatan baru pada Fernandinho usai tampil brilian musim ini. City akan membuka pembicaraan dengan agen pemain asal Brasil ini meskipun kontraknya baru akan berakhir pada 2017. Menurut laporan Manchester Evening News, Rabu (18/11), musim lalu Fernandinho tampak seperti pemain yang berjuang untuk menemukan kembali bentuknya. Pasalnya, fisiknya terkuras dan memiliki ketegangan emosional karena Piala Dunia Brasil. Musim ini ia telah bangkit lebih baik dari sebelumnya. Rekan satu skuatnya, Fernando disebut ikut andil dalam upaya peningkatan Fernandiho. Ia membantu tugas defensif Fernandinho dan Yaya Toure bebas untuk mengambil alih pertandingan dari lawan. Namun, cedera paha yang dialami oleh Fernando di musim lalu mempengaruhi peformanya dan akhirnya harus membiarkan Fernandinho bekerja sendiri. Tetapi, sekembalinya Fernando dari cedera dan bermain dengan baik, suporter bisa melihat bagaimana Fernandinho bergabung dalam serangan bebas. Ia kemudian mencetak gol saat melawan Sevilla.  '))
        assert(_.isEqual(result['source'], 'Republika'))
      })
  })

  // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Republika.scrap)
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
  //     .then(Republika.getURLs)
  //     .then(console.log)
  // })

})
