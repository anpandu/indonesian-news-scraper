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
        assert(_.isEqual(result['date'], 1455527700000))
        assert(_.isEqual(result['img'], 'http://static.republika.co.id/uploads/images/kanal_slide/marcella-zalianty-_130303012333-841.jpg'))
        assert(_.isEqual(result['content'], 'REPUBLIKA.CO.ID, JAKARTA - Aktris dan sutradara Marcella Zalianty mengaku selalu berusaha mempromosikan pesona wisata Indonesia dalam karya-karya filmnya. Cara itu dinilainya cukup kuat dalam mengenalkan lebih dekat potensi Tanah Air ke khalayak dunia.\n"Ada film saya yang tampil di Cannes Festival, dan mereka kaget melihat Indonesia yang modern karena mereka menganggap Indonesia sangat purba," kata Marcella seperti dikutip Antaranews, Senin (15/2).Menurut istri pebalap Ananda Mikola itu, film merupakan bagian dari industri kreatif yang punya posisi strategis dalam mempromosikan pariwisata Indonesia.Ia mencontohkan salah satu film "The Beach" yang dibintangi Leonardo di Caprio telah sukses membuat pariwisata Thailand, lokasi syuting film tersebut, melejit."Film ini sektor yang \'powerful\' (kuat) untuk promosi wisata," kata Marcella yang mengaku tengah menggarap film berlatar Pantai Santolo, Jawa Barat.'))
        assert(_.isEqual(result['source'], 'Republika'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/republika/republika-singlepage2.html')
      })
      .then(Republika.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://www.republika.co.id/berita/inpicture/nasional-inpicture/16/02/23/o2zwha283-kpk-periksa-pejabat-mahkamah-agung-yang-tertangkap-ott'))
        assert(_.isEqual(result['title'], 'In Picture: KPK Periksa Pejabat Mahkamah Agung yang Tertangkap OTT'))
        assert(_.isEqual(result['date'], 1456222500000))
        assert(_.isEqual(result['img'], 'http://static.republika.co.id/uploads/images/kanal_slide/kasubdit-kasasi-dan-peninjauan-kembali-perdata-khusus-mahkamah-agung-_160223151836-691.jpg'))
        assert(_.isEqual(result['content'], 'REPUBLIKA.CO.ID, JAKARTA - Kasubdit Kasasi dan Peninjauan Kembali Perdata Khusus Mahkamah Agung Andri Tristianto Sutrisna menjalani pemeriksaan perdana di Gedung KPK, Jakarta, Selasa (23/2).\nAndi yang ditangkap pada operasi tangkap tangan (OTT) dengan kasus dugaan menerima suap untuk penundaan pengiriman salinan putusan kasasi di MA itu dibawa ke KPK untuk mengkroscek sejumlah barang bukti yang didapatkan dari serangkaian penggeledahan.'))
        assert(_.isEqual(result['source'], 'Republika'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/republika/republika-singlepage3.html')
      })
      .then(Republika.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://www.republika.co.id/berita/jurnal-haji/berita-jurnal-haji/17/02/17/oli9fp396-jamaah-haji-ikuti-pemeriksaan-kesehatan-haji'))
        assert(_.isEqual(result['title'], 'Jamaah Haji Ikuti Pemeriksaan Kesehatan Haji'))
        assert(_.isEqual(result['date'], 1487312160000))
        assert(_.isEqual(result['img'], 'http://static.republika.co.id/uploads/images/headline_slide/pemeriksaan-kesehatan-jamaah-calon-haji-kloter-3-mengikuti-pemeriksaan-_160809163333-725.jpg'))
        assert(_.isEqual(result['content'], 'IHRAM.CO.ID, BANJARMASIH - Kepala Kantor Kementerian Agama Kota Banjarmasin H Sofrayani mengimbau, calon jamaah haji Kota Banjarmasin untuk mengikuti pemeriksaan kesehatan haji tahap pertama. Pemeriksaan ini sebagai bagian tahapan penting yang harus dilalui untuk keberangkatan haji tahun 2017.\n"Pemeriksaan kesehatan calon haji tahap pertama sangat penting dilakukan. Ini untuk mengetahui sejauhmana tingkat kesehatan mereka serta upaya penilaian status kesehatan pada seluruh jamaah haji," kata H Sofrayani saat meninjau pelaksanaan pemeriksaan kesehatan calon jamaah haji tahap pertama, di Puskesmas Cempaka Kota Banjarmasin, belum lama ini.Dikatakannya, data kesehatan calon jemaah haji yang didapatkan dengan menggunakan metode pemeriksaan medis yang dibakukan sebagai upaya perawatan dan pemeliharaan, serta pembinaan dan perlindungan terhadap calon jamaah haji. Kata dia, berdasarkan kouta tahun 2017, sebanyak 633 calon hamaah haji secara bertahap akan diperiksa kondisi kesehatanya oleh tim pemeriksa kesehatan di Puskesmas yang ditunjuk Kepala Dinas Kesehatan Kota Banjarmasin.Kepala Seksi Haji dan Umrah (Kasi PHU) H Burhan Noor saat mendampingi Kakankemenag dalam pemeriksanaan tersebut mengatakan, pemeriksaaan calon jamaah haji dilaksanakan guna menindak lanjuti Peraturan Menteri Kesehatan Nomor 15 tahun 2016 tentang Istithaah Kesehatan Jemaah Haji. dalam peraturan itu disebutkan jamah haji harus memenuhi syarat istithaah kesehatan haji, memenuhi syarat istithaah kesehatan dengan pendampingan atau tidak memenuhi istithaah kesehatan haji untuk sementara."Dalam pemeriksaan kesehatan pada tahap pertama ini meliputi pengambilan sampel darah, pemeriksaan kandungan urine, elektrokradiografi (EKG), radiologi dada dengan jumlah CJH yang diperiksa pada hari ini berjumlah lebih kurang 50 CJH," ujar dia.Kegiatan Pemeriksaan Kesehatan Calon Jamaah Haji tahap pertama tersebut direncanakan dilaksanakan sejak tanggal 13 sampai dengan 25 Pebruari 2017 dan diikuti seluruh Calon Jamaah Haji yang berasal dari Kota Banjarmasin.'))
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
