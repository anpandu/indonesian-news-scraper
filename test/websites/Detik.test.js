'use strict'

var Detik = require('../../lib/websites/Detik.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Detik', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/detik/detik-mainpage.html')
      })
      .then(Detik.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://detik.feedsportal.com/c/33613/f/656082/s/4b3f909e/sc/3/l/0Linet0Bdetik0N0Cread0C20A150C110C0A50C10A0A0A260C30A626230C3230Cgoogle0Eumbar0Ekelemahan0Egalaxy0Es60Eedge/story01.htm'))
        assert(_.isEqual(result[1], 'http://detik.feedsportal.com/c/33613/f/656082/s/4b3f909f/sc/3/l/0Lhot0Bdetik0N0Cread0C20A150C110C0A50C0A955550C30A626190C230A0Cririn0Edwi0Eariyanti0Ekurangi0Esyuting0Edemi0Eurus0Eanak/story01.htm'))
        assert(_.isEqual(result[2], 'http://detik.feedsportal.com/c/33613/f/656082/s/4b3f909d/sc/21/l/0Lnews0Bdetik0N0Cread0C20A150C110C0A50C10A0A2430C30A62620A0C10A0Cpan0Emasuk0Ekabinet0Ereshuffle0Ejilid0Eii0Ediisukan0Esetelah0Epilkada/story01.htm'))
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/detik/detik-singlepage.html')
      })
      .then(Detik.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://inet.detik.com/read/2015/11/05/100026/3062623/323/google-umbar-kelemahan-galaxy-s6-edge'))
        assert(_.isEqual(result['title'], 'Google Umbar Kelemahan Galaxy S6 Edge'))
        assert(_.isEqual(result['date'], '2015-11-05 T10:08:58Z'))
        assert(_.isEqual(result['img'], 'http://images.detik.com/content/2015/11/05/323/100204_anda.jpg'))
        assert(_.isEqual(result['content'], 'Jakarta - Galaxy S6 Edge, dengan material premium dan layar lengkung inovatif di kedua sisinya, adalah smartphone jagoan Samsung. Tapi menurut Google, S6 Edge tidak luput dari kelemahan, khususnya di sisi sekuriti. Dikutip detikINET dari BBC, Kamis (5/11/2015), Google menyatakan jika Galaxy S6 Edge memiliki 11 celah keamanan. Google melalui tim Project Zero mengujicoba tingkat keamanan S6 Edge karena diniliai banyak orang yang memilikinya. Beberapa celah keamanan itu memungkinkan hacker mengambil alih perangkat dan mencuri data pribadi. Google sudah memberitahu Samsung mengenai celah keamanan itu dan sebagian besar sudah diperbaiki. Namun ada beberapa yang belum. "Mayoritas masalah sudah diperbaiki dalam update over the air , meskipun masih ada tiga masalah keamanan kecil yang belum," demikian pernyataan tim Project Zero. Samsung menyatakan bahwa tiga celah keamanan yang masih ada akan diperbaiki dalam update sekuriti yang rencananya dilakukan bulan ini. "Menjaga kepercayaan konsumen adalah prioritas top kami," kata Samsung. Samsung menyarankan agar pengguna selalu update software jika telah tersedia. "Samsung mengharapkan user untuk selalu menjaga agar software dan aplikasi mereka selalu update ," tambah raksasa elektronik asal Korea Selatan ini. (fyk/ash)'))
        assert(_.isEqual(result['source'], 'Detik'))
      })
  })

  // // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Detik.scrap)
  //     .then(function (result) {
  //       console.log(result)
  //       result.forEach(function (item) {
  //         assert(true, item.hasOwnProperty("url"))
  //         assert(true, item.hasOwnProperty("title"))
  //         assert(true, item.hasOwnProperty("date"))
  //         assert(true, item.hasOwnProperty("img"))
  //         assert(true, item.hasOwnProperty("content"))
  //       })
  //     })
  // })

  // // === this test do I/O
  // it('getURLs', function () {
  //   return Promise.resolve()
  //     .then(Detik.getURLs)
  //     .then(console.log)
  // })

})
