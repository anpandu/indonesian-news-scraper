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
        assert(_.isEqual(result['date'], 1446699120000))
        assert(_.isEqual(result['img'], 'http://cdn.klimg.com/kapanlagi.com/p/headline/476x238/brandon-salim-makin-dekat-dengan-sivia--e8991e.jpg'))
        assert(_.isEqual(result['content'], 'Brandon Nicholas Salim , putra sulung aktor Fery Salim , rupanya semakin mantap menekuni dunia hiburan tanah air. Setelah jadi pemeran utama dalam webseries #AnakArtis, kini ia juga bakal muncul di film pertama Blink , HEART BEAT .\n"Di sini sebagai Lido. Sebagai temen baik dari Sivia Blink yang berperan sebagai Lexa. Kami itu ceritanya dari luar kota dan sekolah di sekolah yang sama. Karakternya lebih dewasa dibanding peran-peran personil Blink. Saya sama Lexa itu main musik juga di kafe," jelasnya saat bertandang ke kantor KapanLagi.com® , Tebet, Jakarta Selatan, Rabu (4/11).\nHEART BEAT adalah film kedua Brandon setelah 7 HARI MENEMBUS WAKTU yang dibintanginya bareng Anjani Dina dan Teuku Rasya . Kakak Raoul Salim ini jatuh cinta dan akhirnya mau bermain dalam film ini. "Bagus karena positif. Genre filmnya drama dan musikal, dua genre itu saya suka banget," tuturnya.\nNamun, meski bergenre drama musikal, dirinya tak punya banyak porsi untuk bernyanyi. "Lebih banyak personil Blink yang nyanyi kalau saya main gitar aja. Di sini saya beneran main gitar. Jadi ceritanya saya dan Lexa itu sidejob nya main di kafe gitu," ungkapnya.\nHEART BEAT ternyata jalani proses syuting yang cukup singkat, lho. "Sekitar 2 minggu. Lokasi juga gak banyak. Kebanyakan ceritanya ambil set di sekolah," bongkarnya.\nLalu, sebenarnya apa sih kerennya HEART BEAT dibanding film lain? "Film tentang persahabatan. Jadi bagaimana kita sebagai manusia harus bisa bersatu dengan orang yang baru kita kenal. Di film ini mengajarkan kita untuk bersatu, kompak, dan belajar mengalah. Tag line filmnya sendiri Sahabat adalah Keluarga Yang Kita Pilih," tandasnya. Wah, makin nggak sabar nonton HEART BEAT mulai 12 November 2015.\n(kpl/pur/tch)'))
        assert(_.isEqual(result['source'], 'KapanLagi'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/kapanlagi/kapanlagi-singlepage2.html')
      })
      .then(KapanLagi.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://www.kapanlagi.com/showbiz/selebriti/foto-dian-sastrowardoyo-saat-masih-13-tahun-masih-cantik-1b2294.html'))
        assert(_.isEqual(result['title'], 'FOTO: Dian Sastrowardoyo Saat Berusia 13 Tahun, Masih Cantik?'))
        assert(_.isEqual(result['date'], 1455416100000))
        assert(_.isEqual(result['img'], 'http://cdn.klimg.com/kapanlagi.com/p/headline/476x238/foto-dian-sastrowardoyo-saat-masih-13-t-5a5392.jpg'))
        assert(_.isEqual(result['content'], 'Pesona kecantikan yang dimiliki Dian Sastrowardoyo memang sudah tak diragukan lagi. Tak hanya dianugerahi dengan wajah sempurna, bintang ADA APA DENGAN CINTA? ini juga punya bakat akting yang mampu menghipnotis setiap fansnya.\nSelalu dipuja pria dan wanita, tahukah kamu jika ternyata Dian di masa lalu adalah gadis yang sangat berbeda? Pemandangan itulah yang bisa terlihat jelas dalam postingan foto terbaru Dian di Instagram .\nYup, aktris cantik asal Jakarta ini baru saja memperlihatkan seperti apa foto masa kecilnya saat masih berusia 13 tahun. Di sanalah kamu bisa melihat bagaimana gadis mungil yang masih sangat polos dan jauh dari penampilannya yang sekarang.\nMengenakan seragam sekolahnya, Dian tampak seperti pelajar biasa. Ia bahkan menghiasi wajah mungilnya dengan kacamata. Sosoknya tentu sangat berbeda jika dibandingkan dengan seorang Dian Sastro di usianya yang kini telah menginjak 33 tahun.\nBersamaan dengan diunggahnya foto ini, Dian pun menuliskan caption yang berbunyi, "Inilah aku saat masih berusia 13 tahun. Sekian. Makasih untuk teman-teman yang sudah mengenalku sejak aku masih bukan siapa-siapa. Makasih untuk persahabatan sejati kalian selama ini. Kangen rapat APEC (versi lain dari \'sidang buku curhat\' di hidupku)."\nTak pelak lagi, hal ini langsung sukses mencuri perhatian para follower -nya di Instagram . Tak ada yang menyangka jika gadis polos yang dulunya bukan siapa-siapa itu telah menjadi salah satu wanita tercantik dan berbakat di tanah air.\n(kpl/sry)'))
        assert(_.isEqual(result['source'], 'KapanLagi'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/kapanlagi/kapanlagi-singlepage3.html')
      })
      .then(KapanLagi.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://musik.kapanlagi.com/berita/bikin-gaduh-kota-rumah-penyanyi-ini-digrebek-polisi-c1994d.html'))
        assert(_.isEqual(result['title'], 'Bikin Gaduh Kota, Rumah Penyanyi Ini Digrebek Polisi'))
        assert(_.isEqual(result['date'], 1456201320000))
        assert(_.isEqual(result['img'], 'http://cdn.klimg.com/kapanlagi.com/p/headline/476x238/bikin-gaduh-kota-rumah-penyanyi-ini-dig-c1994d.jpg'))
        assert(_.isEqual(result['content'], 'Apa yang kalian pikirkan tentang pesta? Tentu saja hal yang menggembirakan dan menyengangkan semua. Namun, sadarkah kalian terkadang apa yang kita lakukan tersebut bisa mengganggu orang lain? Satu kisah datang dari penyanyi asal Wales, Charlotte Chruch. Polisi lokal dikomplain banyak warga karena suara yang ditimbulkan dari rumah Charlotte. Mencengangkannya lagi, suara itu bisa didengar hingga jarak 5 kilometer jauhnya. Lebih dari 100 tamu diundang ke dalam rumah mewah penyanyi tersebut yang seharga Rp 28,8 miliar tersebut. Para tamu diundang untuk memeriahkan acara ulang tahunnya yang ke 30.\nPihak Kepolisian Wales Selatan mengatakan bahwa tak ada penangkapan dalam pengamanan yang dilakukan mereka. Namun, penyani tersebut harus menangungg malu karena namanya menjadi miring di dunia maya. Salah satu tetangganya mengatakan, "Kami melihat sebuah tenda besar akan didiriakan, jadi kami berasumsi bahwa akan ada pesta yang dihelat. Tapi juga tak menyangkan pestanya akan berakhir pada pukul setengah 6 pagi. Itu benar-benar mengerikan."\nTetangga lain yang bernama Dewi Jones mengatakan bahwa seharusnya tinggal di pedesaan harus bisa menghargai masyarakat yang tinggal di sana. "Jika anda tinggal di desa, tentunya anda harus menghargai para tetangga." Satu komplain pun datang dari Helen Bond, wanita yang cukup jauh tinggal dari kediaman Charlotte. "Ini sebuah mimpi buruk. Aku kira keributan ini terjadi di tetanggaku namun aku sadar bahwa suara itu datang dari rumah yang nun jauh di sana."\nMengadakan party sih oke-oke aja ya? Tapi selama masih ada aturan tertulis maupun tidak di masyarakat, kita seharusnya menghargai hal tersebut. Respect is a must , KLovers. If you wanna some respect anyway .\n(kpl/otx)'))
        assert(_.isEqual(result['source'], 'KapanLagi'))
      })
  })

  // // === this test do I/O
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

  // // === this test do I/O
  // it('getURLs', function () {
  //   return Promise.resolve()
  //     .then(KapanLagi.getURLs)
  //     .then(console.log)
  // })

})
