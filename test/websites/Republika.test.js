'use strict'

var Republika = require('../../lib/websites/Republika.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Republika', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/republika/republika-mainpage.html')
      })
      .then(Republika.getURLsFromMainPage)
      .then(function (result) {
        assert(result[0] == 'http://nasional.republika.co.id/berita/nasional/hukum/15/11/05/nxc181330-sejak-jadi-tersangka-ketua-dprd-sumut-tak-masuk-kerja')
        assert(result[1] == 'http://khazanah.republika.co.id/berita/dunia-islam/islam-nusantara/15/11/05/nxc0yg313-wapres-gelar-pahlawan-suatu-kepantasan')
        assert(result[2] == 'http://khazanah.republika.co.id/berita/dunia-islam/islam-nusantara/15/11/05/nxc00q313-tak-sekedar-wisuda-wa-upaya-bumikan-alquran')
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
        assert(result.hasOwnProperty('summary'))
        assert(result['url'] == 'http://nasional.republika.co.id/berita/nasional/hukum/15/11/05/nxc181330-sejak-jadi-tersangka-ketua-dprd-sumut-tak-masuk-kerja')
        assert(result['title'] == 'Sejak Jadi Tersangka, Ketua DPRD Sumut tak Masuk Kerja')
        assert(result['date'] == 'Kamis 05 November 2015, 15:07 ')
        assert(result['img'] == 'http://static.republika.co.id/uploads/images/detailnews/tersangka-kasus-dugaan-suap-bantuan-perkara-bansos-kejati-sumatera-_151022193327-351.jpg')
        assert(result['summary'] == ' REPUBLIKA.CO.ID, MEDAN -- Dua hari pasca ditetapkan sebagai tersangka oleh Komisi Pemberantasan Korupsi (KPK) pada Selasa (3/11), Ketua DPRD Sumut Ajib Shah belum juga tampak di gedung DPRD Sumatera Utara hari ini, Kamis (5/11). Saat Republika menyambangi ruang kerjanya di lantai dua gedung DPRD Sumut, ruang kerja Ajib tampak sepi. "Belum pulang dari Jakarta. Belum tahu kapan pulangnya," kata staf Ajib, Vivi saat ditemui Republika. Vivi mengaku tidak mengetahui alasan belum pulangnya Ajib dari Jakarta. Padahal, menurutnya, agenda yang didatangi Ajib sudah lewat. Ia pun menyebut, Ajib memang sudah beberapa hari tidak berada di Medan. "Kemarin sih untuk datang ke agenda Golkar itu. Dari Senin belum pulang," ujarnya. Selain Plt Gubernur Sumut Gatot Pujo Negoro, KPK menetapkan lima tersangka lain dalam kasus dugaan suap terkait persetujuan laporan pertanggungjawaban APBD Provinsi Sumut tahun 2012, persetujuan perubahan APBD tahun 2013, pengesahan APBD tahun 2014, pengesahan APBD tahun 2015, persetujuan laporan pertanggungjawaban anggaran tahun 2014, dan penolakan penggunaan hak interpelasi oleh anggota DPRD. Kelima orang tersangka tersebut, yakni Saleh Bangun selaku Ketua DPRD Sumut periode 2009-2014, Chaidir Ritonga selaku Wakil Ketua DPRD Periode 2009-2014, dan Ajib Shah selaku Anggota DPRD periode 2009-2014. Saat ini Ajib Shah menjabat sebagai Ketua DPRD Sumut 2014-2019. Selain itu Wakil Ketua DPRD periode 2009-2014 Kamaludin Harahap dan Wakil Ketua DPRD 2009-2014 Sigit Pramono Asri, juga ditetapkan menjadi tersangka. ')
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
  //         assert(item.hasOwnProperty("summary"))
  //       })
  //     })
  // })

})
