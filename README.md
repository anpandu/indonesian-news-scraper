# indonesian-news-scrapper [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> news scrapper


## Install

```sh
$ npm install --save indonesian-news-scrapper
```


## Usage

Scrap all news in the website's main page. The number of news scrapped varies according to website.

```js
var kompas = require('indonesian-news-scrapper').Kompas;

kompas.scrap()
  .then(function (scraps) {
    console.log(scraps[0])
  })

/***
{ url: 'http://megapolitan.kompas.com/read/2015/11/05/13554811/DKI.Akan.Tambah.Dana.Hibah.untuk.Wilayah.yang.Dilintasi.Truk.Sampah',
  title: 'DKI Akan Tambah Dana Hibah untuk Wilayah yang Dilintasi Truk Sampah',
  date: 'Kamis 5 November 2015  13:55 ',
  img: 'http://assets.kompas.com/data/photo/2015/05/14/173048120150507-140842780x390.JPG',
  summary: 'Sekretaris Daerah (Sekda) DKI Saefullah' }
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

## Available Scrappers

```
var kompas = require('indonesian-news-scrapper').Kompas;
var detik = require('indonesian-news-scrapper').Detik;
var tempo = require('indonesian-news-scrapper').Tempo;
var kapanLagi = require('indonesian-news-scrapper').KapanLagi;
var tempoEnglish = require('indonesian-news-scrapper').TempoEnglish;
```

## License

MIT © [Ananta Pandu](pandu.ml)


[npm-image]: https://badge.fury.io/js/indonesian-news-scrapper.svg
[npm-url]: https://npmjs.org/package/indonesian-news-scrapper
[travis-image]: https://travis-ci.org/anpandu/indonesian-news-scrapper.svg?branch=master
[travis-url]: https://travis-ci.org/anpandu/indonesian-news-scrapper
[daviddm-image]: https://david-dm.org/anpandu/indonesian-news-scrapper.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/anpandu/indonesian-news-scrapper
