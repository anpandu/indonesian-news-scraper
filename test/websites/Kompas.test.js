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
        assert(_.isEqual(result[0], 'http://bisniskeuangan.kompas.com/read/xml/2016/02/23/145448826/OJK.Pelemahan.Saham.Perbankan.Hanya.Temporer'))
        assert(_.isEqual(result[1], 'http://megapolitan.kompas.com/read/xml/2016/02/23/14514861/.Saya.Kayak.Anak.Tiri.Enggak.Punya.Pak.Lurah.dan.Pak.RT.'))
        assert(_.isEqual(result[2], 'http://regional.kompas.com/read/xml/2016/02/23/14505601/Pilkada.Kalteng.Diundur.Kandidat.yang.Kalah.Menggugat'))
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
        assert(_.isEqual(result['date'], 1446645840000))
        assert(_.isEqual(result['img'], 'http://assets.kompas.com/data/photo/2015/11/04/2050471Senjata-Komeng780x390.jpg'))
        assert(_.isEqual(result['content'], 'Penyidik Polres Lhokseumawe melimpahkan Faisal (37) alias Komeng anggota kelompok bersenjata Nurdin Ismail alias Din Minimi ke Kejari Lhoksukon, Rabu (4/11/205). Polisi menyerahkan Komeng bersama senjata api jenis AK-56. Pria asal Desa Seuneubok Aceh Kecamatan Paya Bakong, Aceh Utara itu ditangkap usai dilumpuhkan tim Polda Aceh pada 11 Juli 2015 di rumhanya, karena berusaha kabur ketika hendak ditangkap. Kasat Reskrim Polres Lhokseumawe AKP Yasir kepada menyebutkan, Komeng selain terlibat dalam kepemilikan senjata api ilegal juga terlibat dalam kasus penculikan Panglima Muda Komite Peralihan Aceh (KPA) Daerah II Aceh Utara Mahmudsyah alias Ayah Mud, pada 23 Maret lalu. "Dia juga terlibat dalam kasus pembunuhan dua anggota intel Kodim Aceh Utara pada 24 Maret lalu di Desa Alue Papeun Kecamatan Nisam Antara Aceh Utara. AK-56 yang kita limpahkan itu adalah barang bukti yang digunakan komeng dalam melakukan aksi kriminalitas," ujar Yasir. Selain senjata api, penyidik juga melimpahkan amunisi AK-56 sebanyak 90 butir dan amunisi senapan serbu SS1 sebanyak 58 butir. Sebelum dilimpahkan ke Kejari Lhoksukon, Komeng dibawa ke Pengadilan Negeri (PN) Lhoksukon, Aceh Utara untuk diperiksa sebagai saksi kasus terdakwa Zulkarnaini alias Glok (28), anggota Din Minimi asal Pulo Meuria, Aceh Utara. Pria itu menyerahkan diri ke Polres Lhokseumawe pada 28 Mei lalu. Glok didakwa terlibat penculikan Ayah Mud dan kepemilikan senjata api. Kajari Lhoksukon Teuku Rahmatsyah menyebutkan berkas perkara dan tersangka Komeng sudah diterima. Tersangka kini dititipkan ke cabang Rumah Tahanan Negara (Rutan) Lhoksukon. "Langkah selanjutnya kita menyusun materi dakwaan, jika sudah rampung, segera kita limpahkan ke pengadilan," ujar Teuku Rahmatsyah.'))
        assert(_.isEqual(result['source'], 'Kompas'))      
      })
      .then(function () {
        return getContent('test/fixtures/websites/kompas/kompas-singlepage2.html')
      })
      .then(Kompas.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://nasional.kompas.com/read/2016/02/16/14382361/Menteri.Yuddy.Ancam.PNS.yang.Rankingnya.Terendah.Akan.Dipangkas.'))
        assert(_.isEqual(result['title'], 'Menteri Yuddy Ancam PNS yang Rankingnya Terendah Akan "Dipangkas"'))
        assert(_.isEqual(result['date'], 1455608280000))
        assert(_.isEqual(result['img'], 'http://assets.kompas.com/data/photo/2016/02/16/135701420160216-130330-resized780x390.jpg'))
        assert(_.isEqual(result['content'], 'JAKARTA, KOMPAS.com - Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Yuddy Chrisnandi menginginkan adanya sistem untuk bisa memantau pegawai negeri sipil terbaik dalam sebuah instansi.\nTidak hanya yang terbaik, tetapi PNS yang asal kerja dan sekadar absen saja juga akan ditindaklanjuti.\n"Orang-orang yang tidak memiliki kinerja yang baik, sekadar absen saja, menunggu 30 hari untuk mengambil gaji, akan dirasionalisasi (diberhentikan)," tutur Yuddy dalam rapat koordinasi di kantor Kemenpan RB, Senayan, Jakarta Selatan, Selasa (16/2/2016).\nRasionalisasi atau pemberhentian tersebut dilakukan menyusul banyaknya kritik di masyarakat terkait banyaknya PNS di daerah yang tidak produktif. Tingkat absensinya bahkan terbilang tinggi.\nBahkan, beberapa di antaranya juga melakukan pelanggaran disiplin.\nYuddy mencontohkan instansinya yang memiliki 365 pegawai. Menurut dia, perlu dilakukan ranking dari satu hingga 365.\nDengan demikian, jika kebijakan rasionalisasinya 10 persen, misalnya, maka harus ada sekitar 36 orang yang siap dirasionalisasi.\n"Artinya, ranking 36 terbawah dirasionalisasi," ucapnya.\nNamun, pemangkasan tersebut bukan berarti asal memberhentikan saja. Yuddy mengatakan, nantinya Kemenpan RB akan meluncurkan kebijakan susulan yang seadil-adilnya dan sebaik-baiknya.\nSalah satunya dengan memberlakukan pensiun dini bagi mereka yang berada di kuadran keempat.\n"Siapa kuadran keempat? Mereka yang dianggap tidak produktif dan fungsinya tidak dibutuhkan dalam struktur tata kerja pemerintahan," kata politisi Partai Hanura itu.\nSeperti dikutip dari situs www.menpan.go.id, rencana rasionalisasi sejalan dengan kebijakan pemerintah untuk menciptakan birokrasi pemerintahan berkelas dunia, yakni birokrasi yang bersih dan akuntabel, efektif dan efisien, serta yang memiliki pelayanan publik yang berkualitas.\nDengan kebijakan rasionalisasi ini, diproyeksikan jumlah PNS empat tahun ke depan akan berkurang menembus rasio 1,5 persen.\nSaat ini rasionya masih sebesar 1,7 persen, yaitu setiap 100 orang penduduk dilayani oleh 1,7 pegawai.'))
        assert(_.isEqual(result['source'], 'Kompas'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/kompas/kompas-singlepage3.html')
      })
      .then(Kompas.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://internasional.kompas.com/read/2016/02/16/14115471/Diancam.Lewat.Dunia.Maya.Mark.Zuckerberg.Sewa.16.Tukang.Pukul.'))
        assert(_.isEqual(result['title'], 'Diancam Lewat Dunia Maya, Mark Zuckerberg Sewa 16 "Tukang Pukul"'))
        assert(_.isEqual(result['date'], 1455606660000))
        assert(_.isEqual(result['img'], 'http://assets.kompas.com/data/photo/2015/10/27/1658302Mark-Jadi780x390.jpg'))
        assert(_.isEqual(result['content'], 'Pendiri Facebook, Mark Zuckerberg dikabarkan menanggapi serius sebuah ancaman yang dilontarkan di dunia maya terhadap dirinya.\nReaksi Zuckerberg adalah menyewa 16 orang pengawal untuk menjaganya saat berada di kediamannya di California, AS. Zuckerberg adalah satu dari para miliarder muda di Silicon Valley yang meningkatkan pengamanan setelah menerima ancaman lewat dunia maya. "Dia menyewa 16 pengawal di kediamannya di Palo Alto," ujar seorang sumber kepada situs Page Six. "Anda menyentuh jutaan orang. Semua CEO menerima ancaman dan mereka menganggap ancaman itu sangat serius," tambah sumber itu. Sumber itu menambahkan, ancaman itu terkadang mengincar anggota keluarga para orang kaya ini. Biasanya ancaman itu terkait perselingkuhan atau rayuan lewat Facebook yang biasanya berujung pada putusnya hubungan asmara atau perceraian. Pada Agustus lalu, Facebook mengatakan, lebih dari 1 miliar orang menggunakan situs pertemanan itu dalam sehari. Angka itu mencetak rekor baru dalam penggunaan sebuah situs media sosial. Saat ini, kekayaan Zuckerberg tercatat mencapai 47,1 miliar dollar AS, empat kali lebih banyak dari orang kedua terkaya di AS yang berusia di bawah 40 tahun.'))
        assert(_.isEqual(result['source'], 'Kompas'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/kompas/kompas-singlepage4.html')
      })
      .then(Kompas.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://bola.kompas.com/read/2016/02/23/16374618/samsul.arif.tak.beban.lawan.persib'))
        assert(_.isEqual(result['title'], 'Samsul Arif Tak Beban Lawan Arema'))
        assert(_.isEqual(result['date'], 1456220220000))
        assert(_.isEqual(result['img'], 'http://assets.kompas.com/data/photo/2016/02/16/1703186samsul-arif-purwaka-yudi-dok-persibp.jpg'))
        assert(_.isEqual(result['content'], 'Penyerang anyar Persib Bandung, Samsul Arif, bertekad memberikan penampilan terbaiknya saat melawan Arema Cronus pada pertandingan terakhir Bali Island Cup di Stadion Kapten I Wayan Dipta, Gianyar, Bali, Selasa (23/2/2016) malam nanti.\nSamsul memilih meninggalkan Arema untuk memperkuat Persib pada turnamen Bali Island Cup. Penyerang berusia 31 tahun itu pun menandai debut gemilang bersama Persib seusai mencetak gol ke gawang PSS Sleman pada pertandingan perdana Bali Island Cup.\nPersib kemungkinan besar mengandalkan Samsul Arif saat melawan Arema. Selain penentuan gelar juara, laga ini juga menjadi pertandingan emosional bagi Samsul.\n"Hidup saya sudah di Persib dan akan berjuang buat tim ini. Bagi saya, setiap pertandingan tersebut harus kerja keras dan memberikan kemenangan buat tim. Saya merasa tidak ada beban dalam bertanding. Semua sama saja. Kami harus menang," kata Samsul seperti dikutip dari situs resmi Persib, Selasa (23/2/2016).\nTerkait kekuatan mantan timnya, Samsul mengaku tidak terlalu memusingkannya. Dia akan bermain sesuai dengan instruksi pelatih Dejan Antonic. Sebab, sejauh ini, Samsul belum mengetahui bagaimana karekter dan gaya bermain pelatih Arema, Milomir Seslija.\n"Saya kalau tidak salah baru lima kali berlatih bersama coach Milo (Milomir Seslija). Yang pasti, kami ingin menang pada pertandingan nanti dan kami ingin juara," ujarnya.'))
        assert(_.isEqual(result['source'], 'Kompas'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/kompas/kompas-singlepage5.html')
      })
      .then(Kompas.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://otomotif.kompas.com/read/2016/02/23/165200515/Merek.China.Serbu.Indonesia.Ini.Kata.Gaikindo'))
        assert(_.isEqual(result['title'], 'Merek China “Serbu” Indonesia, Ini Kata Gaikindo'))
        assert(_.isEqual(result['date'], 1456221120000))
        assert(_.isEqual(result['img'], 'http://assets.kompas.com/data/photo/2015/12/07/0322335Wuling-saleh-husinp.jpg'))
        assert(_.isEqual(result['content'], 'Tahun depan, dua produsen otomotif asal China, SAIC-GM-Wuling dan Sokonindo Indonesia (SI) mulai meramaikan industri otomotif Indonesia. Bahkan, Wuling berinvestasi Rp 9,2 triliun membangun pabrik di atas lahan seluas 30 hektar.\nMenanggapi kondisi itu, Ketua Umum Gaikindo periode 2016-2019 Johannes Nangoi, mengatakan, semakin banyak merek baru yang masuk, semakin bagus. Sebab, Indonesia dinilai sebagai pasar potensial.\n"Masyarakat menjadi punya banyak pilihan dalam membeli mobil. Apalagi mereka membangun pabrik dan harusnya ditiru oleh produsen lain yang belum punya pabrik di Indonesia," ungkap Nangoi saat berbincang dengan KompasOtomotif usai acara rapat umum anggota Gaikindo 2016, di hotel Pullman, Thamrin, Jakarta Pusat, Selasa (23/2/2016).\nMenurut Nangoi, produsen otomotif baru yang mendirikan pabrik di Indonesia itu sangat bagus. Sebab, selain menguntungkan bagi pabrikan itu sendiri, untung lainnya bisa menyerap tenaga kerja lokal.\n"Otomatis kalau membangun pabrik, mereka membutuhkan tenaga kerja lokal. Itu untungnya bagi masyarakat Indonesia," kata pria yang menjabat sebagai Presiden Direktur PT Isuzu Astra Motor Indonesia (IAMI) ini.\nNangoi melanjutkan, sukses atau tidaknya merek itu di Indonesia ditentukan oleh konsumen. Sehingga, masing-masing produsen harus memiliki cara bagaimana menggaet konsumen Indonesia membeli produknya.\n"Persaingan memang cukup ketat, oleh karena itu masing-masing produsen harus memiliki cara bagaimana bisa menarik minat masyarakat Indonesia untuk membeli produknya. Itu pekerjaan yang harus dilakukan oleh merek baru," ujar Nangoi.'))
        assert(_.isEqual(result['source'], 'Kompas'))
      })
  })

  // // === this test do I/O
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

  // // === this test do I/O
  // it('getURLs', function () {
  //   return Promise.resolve()
  //     .then(Kompas.getURLs)
  //     .then(console.log)
  // })

})
