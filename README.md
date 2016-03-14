# indonesian-news-scraper
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

NodeJS module for scraping Indonesian news site.
Websites available:
+ Kompas
+ Detik
+ Tempo
+ KapanLagi
+ TempoEnglish
+ Antara
+ Republika
+ Okezone
+ Liputan6
+ Viva


## Install

```sh
$ npm install --save indonesian-news-scraper
```


## Usage

### Scrap

Scrap all news in the website's main page. The number of news scraped varies according to website.

```js
var kompas = require('indonesian-news-scraper').Kompas;

kompas.scrap()
  .then(function (scraps) {
    console.log(scraps[0])
  })

/***
{ url: 'http://megapolitan.kompas.com/read/2015/11/05/13554811/DKI.Akan.Tambah.Dana.Hibah.untuk.Wilayah.yang.Dilintasi.Truk.Sampah',
  title: 'DKI Akan Tambah Dana Hibah untuk Wilayah yang Dilintasi Truk Sampah',
  date: '2015-11-05 T10:08:55Z',
  img: 'http://assets.kompas.com/data/photo/2015/05/14/173048120150507-140842780x390.JPG',
  content: 'Sekretaris Daerah (Sekda) DKI Saefullah ..... ',
  source: 'Kompas' }
***/

kompas.scrap()
  .then(function (scraps) {
    var titles = scraps.map(function (news) {return news.title})
    console.log(titles)
  })

/***
[ 'DKI Akan Tambah Dana Hibah untuk Wilayah yang Dilintasi Truk Sampah',
  'Sanusi Anggap Sikap Ahok Picu Aksi Warga Tolak Truk Sampah DKI',
  'Persiapan Daerah Menghadapi MEA',
  'Tangani Kasus Kebakaran Lahan, Kejagung Bantu Kejaksaan di Daerah',
  '"Tak Perlu Khawatir dengan Letusan Gunung Rinjani"',
  'Ini 5 Menteri Terbaik Jokowi-JK Versi Survei LSJ',
  'Warga Siap Demo Lebih Besar jika Truk DKI Langgar Kesepakatan',
  'Kumpul di Istana, Ini yang Dibahas Jokowi dan Pimpinan DPR',
  'Yusril Ajak DKI Selesaikan Masalah Sampah dengan Damai',
  'Kisruh Sampah DKI, Polisi Minta Pemprov dan Pengelola Lakukan Mediasi',
  'Dipecat, Buruh Bawa Anak Istri Mengadu ke DPRD',
  'Bahas Beberapa Kasus Korupsi, Kabareskrim Temui Pimpinan KPK' ]
***/
```

### Get URLs

Get all URLs in the website's main page

```js
var kompas = require('indonesian-news-scraper').Kompas;

kompas.getURLs()
  .then(function (urls) {
    console.log(urls)
  })

/***
[ 'http://megapolitan.kompas.com/read/2015/11/09/12372421/Wakil.Wali.Kota.Bekasi.Izin.Melintas.24.Jam.Truk.Sampah.DKI.Hanya.Sementara',
  'http://regional.kompas.com/read/2015/11/09/12305981/Terduga.Teroris.yang.Tewas.di.Sulteng.Belum.Teridentifikasi',
  'http://megapolitan.kompas.com/read/2015/11/09/12103131/Bicarakan.Kisruh.Sampah.Ahok.Akan.Bertemu.Wali.Kota.Bekasi.',
  'http://nasional.kompas.com/read/2015/11/09/11555121/Masa.Peminjaman.Gedung.BNN.Milik.Polri.Habis.Desember.2015',
  'http://megapolitan.kompas.com/read/2015/11/09/11543021/Truk.Sampah.DKI.Diizinkan.Melintas.24.Jam.DPRD.Bekasi.Tetap.Ingin.Evaluasi.MoU.',
  'http://nasional.kompas.com/read/2015/11/09/11434001/Sore.Ini.Presiden.Italia.Akan.Temui.Jokowi.di.Istana.Merdeka',
  'http://megapolitan.kompas.com/read/2015/11/09/11425941/Kampung.Pulo.Masih.Kebanjiran.Warga.Minta.Ahok.Buat.Gorong-gorong',
  'http://megapolitan.kompas.com/read/2015/11/09/11395131/Organda.Jangan.Selalu.Salahkan.Sopir.',
  'http://internasional.kompas.com/read/2015/11/09/11372961/Kerusuhan.Pecah.di.Pusat.Tahanan.Imigrasi.Australia.di.Christmas.Island',
  'http://nasional.kompas.com/read/2015/11/09/11363951/Fahri.Hamzah.Sebut.Soeharto.Layak.Dapat.Gelar.Pahlawan',
  'http://nasional.kompas.com/read/2015/11/09/11354671/Kasus.Suap.APBD.KPK.Panggil.9.Anggota.DPRD.Sumut.2009-2014',
  'http://regional.kompas.com/read/2015/11/09/11294151/Antisipasi.Ancaman.Teroris.Petugas.Keamanan.Khusus.Disiagakan.di.Candi' ]
***/
```

## Available Scrappers

```js
var kompas = require('indonesian-news-scraper').Kompas;
var detik = require('indonesian-news-scraper').Detik;
var tempo = require('indonesian-news-scraper').Tempo;
var kapanLagi = require('indonesian-news-scraper').KapanLagi;
var tempoEnglish = require('indonesian-news-scraper').TempoEnglish;
var antara = require('indonesian-news-scraper').Antara;
var republika = require('indonesian-news-scraper').Republika;
var okezone = require('indonesian-news-scraper').Okezone;
var liputan6 = require('indonesian-news-scraper').Liputan6;
var viva = require('indonesian-news-scraper').Viva;
```

## License

MIT © [Ananta Pandu](anpandu.com)


[npm-image]: https://badge.fury.io/js/indonesian-news-scraper.svg
[npm-url]: https://npmjs.org/package/indonesian-news-scraper
[travis-image]: https://travis-ci.org/anpandu/indonesian-news-scraper.svg?branch=master
[travis-url]: https://travis-ci.org/anpandu/indonesian-news-scraper
[daviddm-image]: https://david-dm.org/anpandu/indonesian-news-scraper.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/anpandu/indonesian-news-scraper
