'use strict'

var KapanLagi = require('../../lib/websites/KapanLagi.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('KapanLagi', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/kapanlagi/kapanlagi-mainpage.html')
      })
      .then(KapanLagi.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://www.kapanlagi.com/showbiz/asian-star/drama-adaptasi-webtoon-cheese-in-trap-rilis-teaser-perdana-eeddf5.html'))
        assert(_.isEqual(result[1], 'http://www.kapanlagi.com/showbiz/bollywood/berantem-di-bar-shahrukh-khan-pamer-luka-memar-di-lengannya-bb4ee8.html'))
        assert(_.isEqual(result[2], 'http://www.kapanlagi.com/showbiz/film/indonesia/video-si-kocak-mamet-aadc-tirukan-goyangan-penyanyi-dangdut-e1056a.html'))
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/kapanlagi/kapanlagi-singlepage.html')
      })
      .then(KapanLagi.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://www.kapanlagi.com/showbiz/film/indonesia/brandon-salim-makin-dekat-dengan-sivia-blink-di-heart-beat-82f43b.html'))
        assert(_.isEqual(result['title'], 'Brandon Salim Makin Dekat Dengan Sivia Blink di \'HEART BEAT\''))
        // assert(_.isEqual(result['date'], '2015-11-05T04:52:00.000Z'))
        assert(_.isEqual(result['img'], 'http://cdn.klimg.com/kapanlagi.com/p/headline/476x238/brandon-salim-makin-dekat-dengan-sivia--e8991e.jpg'))
        assert(_.isEqual(result['content'], 'Kapanlagi.com - Brandon Nicholas Salim , putra sulung aktor Fery Salim , rupanya semakin mantap menekuni dunia hiburan tanah air. Setelah jadi pemeran utama dalam webseries #AnakArtis, kini ia juga bakal muncul di film pertama Blink , HEART BEAT . "Di sini sebagai Lido. Sebagai temen baik dari Sivia Blink yang berperan sebagai Lexa. Kami itu ceritanya dari luar kota dan sekolah di sekolah yang sama. Karakternya lebih dewasa dibanding peran-peran personil Blink. Saya sama Lexa itu main musik juga di kafe," jelasnya saat bertandang ke kantor KapanLagi.com® , Tebet, Jakarta Selatan, Rabu (4/11). HEART BEAT adalah film kedua Brandon setelah 7 HARI MENEMBUS WAKTU yang dibintanginya bareng Anjani Dina dan Teuku Rasya . Kakak Raoul Salim ini jatuh cinta dan akhirnya mau bermain dalam film ini. "Bagus karena positif. Genre filmnya drama dan musikal, dua genre itu saya suka banget," tuturnya. Heart Beat bikin Brandon terpukau oleh ceritanya yang positif dalam balutan drama musikal/©KapanLagi.com®/M. Akrom Sukarya Namun, meski bergenre drama musikal, dirinya tak punya banyak porsi untuk bernyanyi. "Lebih banyak personil Blink yang nyanyi kalau saya main gitar aja. Di sini saya beneran main gitar. Jadi ceritanya saya dan Lexa itu sidejob nya main di kafe gitu," ungkapnya. HEART BEAT ternyata jalani proses syuting yang cukup singkat, lho. "Sekitar 2 minggu. Lokasi juga gak banyak. Kebanyakan ceritanya ambil set di sekolah," bongkarnya. Lalu, sebenarnya apa sih kerennya HEART BEAT dibanding film lain? "Film tentang persahabatan. Jadi bagaimana kita sebagai manusia harus bisa bersatu dengan orang yang baru kita kenal. Di film ini mengajarkan kita untuk bersatu, kompak, dan belajar mengalah. Tag line filmnya sendiri Sahabat adalah Keluarga Yang Kita Pilih," tandasnya. Wah, makin nggak sabar nonton HEART BEAT mulai 12 November 2015. Jangan Lewatkan \'HEART BEAT\' buat Brandon Nicholas Salim Terjebak Cinta Segitiga \'HEART BEAT\' Bukan Hanya Sekedar Cerita Tentang Karir Girlgroup \'HEART BEAT\', Nada Cinta & Persahabatan Yang Menjadi Pilihan Hati Beri Pujian Buat Blink, Fedi Nuril Kangen Tampil Bareng Garasi Jadi Bagian \'HEART BEAT\', Impian Blink Sukses Jadi Kenyataan (kpl/pur/tch)'))
      })
  })

  // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(KapanLagi.scrap)
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
  //     .then(KapanLagi.getURLs)
  //     .then(console.log)
  // })

})
