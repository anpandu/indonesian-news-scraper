'use strict'

var Liputan6 = require('../../lib/websites/Liputan6.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Liputan6', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/liputan6/liputan6-mainpage.html')
      })
      .then(Liputan6.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://showbiz.liputan6.com/read/2437019/london-love-story-tembus-800-ribu-penonton-ini-rahasianya'))
        assert(_.isEqual(result[1], 'http://tekno.liputan6.com/read/2436773/tri-indonesia-broadband-dorong-ekosistem-digital-dalam-negeri'))
        assert(_.isEqual(result[2], 'http://bola.liputan6.com/read/2437213/top-3-benarkah-van-gaal-segera-dipecat'))
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/liputan6/liputan6-singlepage.html')
      })
      .then(Liputan6.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://tekno.liputan6.com/read/2436773/tri-indonesia-broadband-dorong-ekosistem-digital-dalam-negeri'))
        assert(_.isEqual(result['title'], 'Tri Indonesia: Broadband Dorong Ekosistem Digital Dalam Negeri'))
        assert(_.isEqual(result['date'], 1455588656000))
        assert(_.isEqual(result['img'], 'http://cdn0-a.production.liputan6.static6.com/medias/1142370/big/084785500_1455527995-IMG_20160212_153944.jpg'))
        assert(_.isEqual(result['content'], 'Indonesia memasuki fase dinamis akan pertumbuhan ekosistem digital. Mulai dari kehadiran banyak layanan digital hingga aplikasi besutan dalam negeri. Belum lagi perakitan handset pasca penerapan Tingkat Aturan Dalam Negeri (TKDN).\nHal ini diungkapkan oleh Muhammad Buldansyah, Wakil Presiden Direktur PT Hutchison 3 Indonesia (Tri), saat melakukan media visit ke kantor redaksi Liputan6.com di SCTV Tower, Jakarta, Jumat (12/2/2016). Pria yang akrab disapa Dani ini mengatakan demikian mengingat Indonesia merupakan salah satu pasar layanan data yang cukup mengalami pertumbuhan signifikan. "Di jaringan kami, 60 persen dari total pelanggan adalah pengguna layanan data. Sebanyak 80 persen mengakses dari smartphone. Ini mengukuhkan Tri sebagai penyedia data terbesar kedua di Indonesia. Hampir 1/3 trafik di seluruh Indonesia berasal dari pengguna Tri," tuturnya.Tak heran, Dani optimistis layanan broadband akan semakin banyak diminati di Tanah Air, dan ini akan men-generate banyak layanan over the top (OTT) di dalam negeri. "Nah, tinggal bagaimana operator memberkan layanan dengan speed yang mencukupi. Layanan OTT nanti akan semakin banyak, e-Commerce akan semakin maju. Ekosistem saling mendukung operator menjadi sebuah ekosistem digital lifestyle, sehingga diminati pengguna," ucap Dani.Berdasarkan laporan keuangan Tri di kuartal III 2015 lalu, anak usaha Hutchison Asia Telecommunications Limited ini mencatat jumlah pelanggannya sebanyak 55,4 juta pengguna, dengan total BTS mencapai 38.900 unit BTS. Layanan 4G Menyusul operator seluler lainnya, Tri juga akan segera mengomersialisasikan layanan 4G mereka di Tanah Air pada tahun ini. Sayangnya, pihak Tri enggan membeberkan kapan layanan seluler generasi keempat ini diluncurkan."Kami akan meluncurkan layanan 4G di 5 kota besar di Tanah Air, antara lain Jakarta, Bandung, Denpasar, Pontianak, Makassar, dan Batam. Namun, layanan 4G kami akan menjangkau kota-kota lain nantinya," ungkap Dani.Tri tidak memilih pulau Sumatera sebagai target peluncuran 4G di tahap awal karena pihaknya memilih wilayah di mana masyarakatnya telah banyak memiliki handset 4G.Hingga saat ini, operator seluler yang sudah merilis menggelar jaringan dan merilis layanan 4G antara lain Telkomsel, XL Axiata, Indosat Ooredoo, dan Smartfren.(Cas/Isk)'))
        assert(_.isEqual(result['source'], 'Liputan6'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/liputan6/liputan6-singlepage2.html')
      })
      .then(Liputan6.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://showbiz.liputan6.com/read/2437019/london-love-story-tembus-800-ribu-penonton-ini-rahasianya'))
        assert(_.isEqual(result['title'], 'London Love Story Tembus 800 Ribu Penonton, Ini Rahasianya'))
        assert(_.isEqual(result['date'], 1455589200000))
        assert(_.isEqual(result['img'], 'http://cdn1-a.production.liputan6.static6.com/medias/1111119/big/069523800_1452762027-poster_london_love_story.jpg'))
        assert(_.isEqual(result['content'], 'London Love Story, film kedua dari Screenplay Production, berhasil menorehkan satu prestasi gemilang. Berdasarkan data dari filmindonesia.or.id, film yang dibintangi Dimas Anggara dan Michelle Zudith ini, berhasil meraih hingga 803.732 penonton di hari ke-11 penayangannya. Ini, adalah film dengan raihan penonton tertinggi tahun ini. Liputan6.com, menemui duo produser film ini, Sukhdev Singh dan Wicky V. Olindo, di kantornya yang terletak di kawasan Senayan, Senin (15/2/2016). Keduanya, berbagi sedikit rahasia soal kesuksesan film ini. "Kesuksesan film ini, tidak bisa berdiri sendiri. Namun juga didukung oleh promosi yang telah dilakukan dari jauh-jauh hari," ujar Sukhdev Singh. Promo yang dilakukan, termasuk melalui media sosial, hingga roadshow ke sejumlah wilayah di Indonesia. Tak hanya itu, Sukhdev menambahkan bahwa ada satu kunci lain yang mempengaruhi keberhasilan London Love Story, yakni kedekatan para bintang film ini, dengan para fansnya. "Para bintang ini rajin di sosial media, menjaga hubungan mereka dengan para fansnya," katanya. Wicky V. Olindo, menyebutkan bahwa jaringan bioskop domestik juga memiliki kesigapan besar dalam merespon animo penonton yang tinggi. XXI misalnya. Setelah melihat antusiasme penonton di hari pertama, jaringan bioskop terbesar ini langsung menjawabnya dengan menambah jumlah layar untuk London Love Story. "Di hari pertama jumlahnya 90 layar, di hari kedua naik menjadi 125 layar dan puncaknya mencapai 162 layar," kata Wicky. London Love Story bercerita tentang kisah cinta dua anak muda, yakni Dave yang diperankan Dimas Anggara dan Caramel yang dimainkan Michelle Ziudith. Film ini, sudah tayang sejak 4 Februari lalu.'))
        assert(_.isEqual(result['source'], 'Liputan6'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/liputan6/liputan6-singlepage3.html')
      })
      .then(Liputan6.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://photo.liputan6.com/musik/hadiri-grammy-awards-2016-taylor-swift-dan-selena-gomez-peluk-pelukan-2437247'))
        assert(_.isEqual(result['title'], 'Hadiri Grammy Awards 2016, Taylor Swift dan Selena Gomez Peluk-pelukan'))
        assert(_.isEqual(result['date'], 1455588567000))
        assert(_.isEqual(result['img'], 'http://cdn1-a.production.liputan6.static6.com/medias/1143078/big/042026000_1455589131-20160215-Selena-Gomez-dan-Taylor-Swift-di-Grammy-Awards-2016-Reuters-1.jpg'))
        assert(_.isEqual(result['content'], 'Penyanyi Taylor Swift (kanan) memeluk Selena Gomez saat berpose di karpet merah Grammy Awards ke-58 di Staples Center, Los Angeles, Senin (15/2). (REUTERS / Danny Moloshok) Penyanyi Taylor Swift (kanan) memeluk Selena Gomez saat berpose di karpet merah Grammy Awards ke-58 di Staples Center, Los Angeles, Senin (15/2). (REUTERS / Danny Moloshok) Penyanyi Taylor Swift (kanan) memeluk Selena Gomez saat berpose di karpet merah Grammy Awards ke-58 di Staples Center, Los Angeles, Senin (15/2). (REUTERS / Danny Moloshok) Penyanyi Taylor Swift (kanan) memeluk Selena Gomez saat berpose di karpet merah Grammy Awards ke-58 di Staples Center, Los Angeles, Senin (15/2). (REUTERS / Danny Moloshok) Penyanyi Taylor Swift (kanan) memeluk Selena Gomez saat berpose di karpet merah Grammy Awards ke-58 di Staples Center, Los Angeles, Senin (15/2). (REUTERS / Danny Moloshok)'))
        assert(_.isEqual(result['source'], 'Liputan6'))
      })
  })

  // // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Liputan6.scrap)
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
  //     .then(Liputan6.getURLs)
  //     .then(console.log)
  // })

})
