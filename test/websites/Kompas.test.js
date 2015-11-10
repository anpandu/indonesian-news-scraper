'use strict'

var Kompas = require('../../lib/websites/Kompas.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Kompas', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/kompas/kompas-mainpage.html')
      })
      .then(Kompas.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://regional.kompas.com/read/2015/11/04/21040031/Polres.Lhokseumawe.Serahkan.Anggota.Di.Minimi.ke.Kejaksaan'))
        assert(_.isEqual(result[1], 'http://regional.kompas.com/read/2015/11/04/20571381/Balutan.Galeri.Seni.di.Terminal.Baru.Bandara.Husein.Sastranegara'))
        assert(_.isEqual(result[2], 'http://regional.kompas.com/read/2015/11/04/20510051/16.Orang.Tahanan.di.Polres.Kutai.Timur.Kabur'))
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/kompas/kompas-singlepage.html')
      })
      .then(Kompas.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://regional.kompas.com/read/2015/11/04/21040031/Polres.Lhokseumawe.Serahkan.Anggota.Di.Minimi.ke.Kejaksaan'))
        assert(_.isEqual(result['title'], 'Polres Lhokseumawe Serahkan Anggota Di Minimi ke Kejaksaan'))
        // assert(_.isEqual(result['date'], '2015-11-04T14:04:00.000Z'))
        assert(_.isEqual(result['img'], 'http://assets.kompas.com/data/photo/2015/11/04/2050471Senjata-Komeng780x390.jpg'))
        assert(_.isEqual(result['content'], 'LHOKSEUMAWE, KOMPAS.com – Penyidik Polres Lhokseumawe melimpahkan Faisal (37) alias Komeng anggota kelompok bersenjata Nurdin Ismail alias Din Minimi ke Kejari Lhoksukon, Rabu (4/11/205).Polisi menyerahkan Komeng bersama senjata api jenis AK-56. Pria asal Desa Seuneubok Aceh Kecamatan Paya Bakong, Aceh Utara itu ditangkap usai dilumpuhkan tim Polda Aceh pada 11 Juli 2015 di rumhanya, karena berusaha kabur ketika hendak ditangkap. Kasat Reskrim Polres Lhokseumawe AKP Yasir kepada Kompas.com, menyebutkan, Komeng selain terlibat dalam kepemilikan senjata api ilegal juga terlibat dalam kasus penculikan Panglima Muda Komite Peralihan Aceh (KPA) Daerah II Aceh Utara Mahmudsyah alias Ayah Mud, pada 23 Maret lalu. “Dia juga terlibat dalam kasus pembunuhan dua anggota intel Kodim Aceh Utara pada 24 Maret lalu di Desa Alue Papeun Kecamatan Nisam Antara Aceh Utara. AK-56 yang kita limpahkan itu adalah barang bukti yang digunakan komeng dalam melakukan aksi kriminalitas," ujar Yasir. Selain senjata api, penyidik juga melimpahkan amunisi AK-56 sebanyak 90 butir dan amunisi senapan serbu SS1 sebanyak 58 butir. Sebelum dilimpahkan ke Kejari Lhoksukon, Komeng dibawa ke Pengadilan Negeri (PN) Lhoksukon, Aceh Utara untuk diperiksa sebagai saksi kasus terdakwa Zulkarnaini alias Glok (28), anggota Din Minimi asal Pulo Meuria, Aceh Utara. Pria itu menyerahkan diri ke Polres Lhokseumawe pada 28 Mei lalu. Glok didakwa terlibat penculikan Ayah Mud dan kepemilikan senjata api. Kajari Lhoksukon Teuku Rahmatsyah menyebutkan berkas perkara dan tersangka Komeng sudah diterima. Tersangka kini dititipkan ke cabang Rumah Tahanan Negara (Rutan) Lhoksukon. “Langkah selanjutnya kita menyusun materi dakwaan, jika sudah rampung, segera kita limpahkan ke pengadilan," ujar Teuku Rahmatsyah.'))
        assert(_.isEqual(result['source'], 'Kompas'))      
      })
  })

  // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Kompas.scrap)
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
  //     .then(Kompas.getURLs)
  //     .then(console.log)
  // })

})
