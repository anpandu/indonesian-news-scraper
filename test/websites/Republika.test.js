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
        assert(_.isEqual(result['url'], 'http://nasional.republika.co.id/berita/nasional/daerah/16/02/15/o2l07x284-marcella-zalianty-promo-pariwisata-indonesia-lewat-film'))
        assert(_.isEqual(result['title'], 'Marcella Zalianty Promo Pariwisata Indonesia Lewat Film'))
        // assert(_.isEqual(result['date'], '2016-02-15T09:15:00.000Z'))
        assert(_.isEqual(result['img'], 'http://static.republika.co.id/uploads/images/kanal_slide/marcella-zalianty-_130303012333-841.jpg'))
        assert(_.isEqual(result['content'], 'REPUBLIKA.CO.ID, JAKARTA - Aktris dan sutradara Marcella Zalianty mengaku selalu berusaha mempromosikan pesona wisata Indonesia dalam karya-karya filmnya. Cara itu dinilainya cukup kuat dalam mengenalkan lebih dekat potensi Tanah Air ke khalayak dunia. "Ada film saya yang tampil di Cannes Festival, dan mereka kaget melihat Indonesia yang modern karena mereka menganggap Indonesia sangat purba," kata Marcella seperti dikutip Antaranews, Senin (15/2).Menurut istri pebalap Ananda Mikola itu, film merupakan bagian dari industri kreatif yang punya posisi strategis dalam mempromosikan pariwisata Indonesia.Ia mencontohkan salah satu film "The Beach" yang dibintangi Leonardo di Caprio telah sukses membuat pariwisata Thailand, lokasi syuting film tersebut, melejit."Film ini sektor yang \'powerful\' (kuat) untuk promosi wisata," kata Marcella yang mengaku tengah menggarap film berlatar Pantai Santolo, Jawa Barat.'))
        assert(_.isEqual(result['source'], 'Republika'))
      })
  })

  // // === this test do I/O
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

  // // === this test do I/O
  // it('getURLs', function () {
  //   return Promise.resolve()
  //     .then(Republika.getURLs)
  //     .then(console.log)
  // })

})
