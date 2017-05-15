'use strict'

var Antara = require('../../lib/websites/Antara.js')
var assert = require('assert')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require("fs"))
var _ = require('lodash')

var getContent = function (filename) { return fs.readFileAsync(filename, "utf8")}

describe('Antara', function () {

  it('getURLsFromMainPage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/antara/antara-mainpage.html')
      })
      .then(Antara.getURLsFromMainPage)
      .then(function (result) {
        assert(_.isEqual(result[0], 'http://www.antaranews.com/berita/527615/29-penerbangan-bandara-internasional-lombok-dibatalkan'))
        assert(_.isEqual(result[1], 'http://www.antaranews.com/berita/527614/mengatasi-kebuntuan-riset-pangan-indonesia'))
        assert(_.isEqual(result[2], 'http://www.antaranews.com/berita/527613/indonesia-akan-terima-kunjungan-presiden-italia'))
      })
  })

  it('getDataFromSinglePage()', function () {
    return Promise.resolve()
      .then(function () {
        return getContent('test/fixtures/websites/antara/antara-singlepage.html')
      })
      .then(Antara.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://www.antaranews.com/berita/527615/29-penerbangan-bandara-internasional-lombok-dibatalkan'))
        assert(_.isEqual(result['title'], '29 penerbangan Bandara Internasional Lombok dibatalkan'))
        assert(_.isEqual(result['date'], 1446710203000))
        assert(_.isEqual(result['img'], 'http://img.antaranews.com/new/2015/11/ori/20151105antarafoto-pantau-semburan-gunung-rinjani-051115-bcs-2.jpg'))
        assert(_.isEqual(result['content'], 'Mataram, NTB (ANTARA News) - Sebanyak 29 penerbangan baik domestik dan internasional dari dan menuju Bandara Internasional Lombok harus dibatalkan menyusul ditutupnya operasional bandara akibat abu vulkanik erupsi Gunung Baru Jari, anak Gunung Rinjani. Kepala Seksi Urusan Umum dan Humas PT Angkasa I Bandara Internasional Lombok (BIL), Eka Asmadi, saat dihubungi melalui telepon dari Mataram, Kamis, mengatakan,pembatalan seluruh penerbangan itu dilakukan mulai tadi pagi pukul 08.00 Wita sampai Jumat (6/11) pukul 08.45 WITA. "Penutupan operasional bandara dan pembatalan penerbangan ini dilakukan demi keselamatan, mengingat abu vulkanik dari letusan Gunung Baru Jari sudah menyelimuti bandara, sehingga sangat membahayakan penerbangan," katanya. Menurut dia, akibat penutupan operasional bandara, sebanyak 27 penerbangan domestik dan dua internasional dari Malaysia harus dibatalkan dan dialihkan ke bandara lain. "Total ada 3.016 orang penumpang domestik dan 348 orang penumpang internasional yang harus tertunda dan menjadwal ulang keberangkatannya di BIL," katanya.'))
        assert(_.isEqual(result['source'], 'Antara'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/antara/antara-singlepage2.html')
      })
      .then(Antara.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://www.antaranews.com/berita/546643/prostitusi-ditenggarai-sudah-merambah-ke-pelajar-lampung'))
        assert(_.isEqual(result['title'], 'Prostitusi ditenggarai sudah merambah ke pelajar Lampung'))
        assert(_.isEqual(result['date'], 1456213770000))
        assert(_.isEqual(result['img'], 'http://img.antaranews.com/new/2015/12/ori/20151202antarafoto-satpol-pp-razia-wisma-021215-smt-2.jpg'))
        assert(_.isEqual(result['content'], 'Bandarlampung, Lampung (ANTARA News) - Petugas Polda Lampung menenggarai pelajar di Lampung sudah mengenal dunia prostitusi. "Dari kasus yang belum lama ini terjadi sebagian pelaku praktik prostitusi merupakan pelajar atau masih berumur di bawah 18 tahun," kata Kasubdit IV Renakta Ditreskrimum Polda Lampung, AKBP Ferdiyan Fahmi, di Bandarlampung, Selasa. Menurut dia, para mucikari atau orang yang mempromosikan hingga mengeksploitasi pekerja seks komersial (PSK) itu, mampu menyediakan wanita dengan berbagai tipe dan usia, bahkan termasuk para remaja usia sekolah hingga kalangan artis. "Indikasi kuat akan masih marak praktik prostitusi ini, mengingat dari sejumlah korban tertangkap tangan beroperasi di hotel merupakan remaja yang masih muda bahkan ada yang masih di bawah umur," ujarnya lagi. Bukan mustahil, ia melanjutkan, apabila praktik prostitusi itu memang benar terjadi membuat korban akan terus menjalankan aktivitas yang dilarang tersebut.Dia menjelaskan sebagian modus menjaring mereka."Tawaran mereka dilakukan seperti membujuk apakah mereka tidak ingin memiliki HP baru dan bisa membeli baju baru dan sebagainya, dan baru kemudian diberitahukan bahwa pekerjaannya adalah melayani pria hidung belang," kata dia lagi. Namun, ia menerangkan lagi, para mucikari meminta agar para pelaku prostitusi itu siap melayani pria hidung belang atas dasar permintaannya. Dia menyebutkan, faktor minim pengawasan dari orangtua akan memperburuk kejadian atau semakin tinggi praktik prostitusi di kalangan remaja maupun pelajar itu. "Praktik prostitusi yang melibatkan anak-anak dan kalangan artis di Lampung masih sangat tinggi," kata dia.'))
        assert(_.isEqual(result['source'], 'Antara'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/antara/antara-singlepage3.html')
      })
      .then(Antara.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://www.antaranews.com/berita/546640/bantu-pulihkan-perdamaian-dunia-turki-selenggarakan-kontes-film-pendek-internasional'))
        assert(_.isEqual(result['title'], 'Bantu pulihkan perdamaian dunia, Turki selenggarakan kontes film pendek internasional'))
        assert(_.isEqual(result['date'], 1456213182000))
        assert(_.isEqual(result['img'], 'http://img.antaranews.com/new'))
        assert(_.isEqual(result['content'], 'ISTANBUL, 23 Februari 2016 (Antara/PRNewswire) - Pemerintah kota Cekmekoy, Istanbul, Turki, meresmikan kontes film pendek internasional bertema rasa belas kasihan dan keadilan. Kontes ini ditujukkan untuk memperkenalkan keragaman aspek ketauladanan hidup Nabi Muhammad yang membawa perdamaian pada umat manusia. Kontes film ini terbuka bagi para kontestan profesional dan amatir, dan batas waktu pendaftaran adalah tanggal 8 April 2016. Video: https://www.youtube.com/watch?v=nM3ze35m5mc (Foto: http://photos.prnewswire.com/prnh/20160219/335111-INFO) Untuk dorong terciptanya perdamaian dan keadilan di dunia Kejahatan dan ketidakadilan adalah sebab fundamental yang mengakibatkan munculnya kehancuran di muka bumi. Hilangnya rasa belas kasihan dan keadilan dari kehidupan sehari-hari membawa dunia ini terjerumus ke jurang kenestapaan setiap harinya. Untuk menjadikan dua konsep ini sebagai hal yang tak terpisahkan di dalam kehidupan kita, maka kita perlu mengorientasikan segala sesuatu yang kita lakukan sehari-harinya pada kedua hal tersebut. Hal ini lah yang menjadi dasar pemikiran dari digelarnya kontes ini, yaitu untuk mengajak orang-orang mempelajari dan mengamalkan moral-moral dari nabi besar Nabi Muhammad, yang menjadikan rasa belas kasihan dan keadilan sebagai dasar hidupnya, melalui sudut pandang sinematografi. Kontes ini terbuka untuk siapa saja, dari wilayah mana pun, agama apapun, bahasa apapun, dan ras apapun, sehingga memberikan kesempatan bagi siapa saja untuk berkontribusi terhadap perdamaian dan upaya untuk wujudkan rasa belas kasih dan keadlian untuk seluruh umat manusia. Mulai diluncurkan pada tanggal 10 Desember 2015, Walikota Cekmekoy, Ahmet Poyraz, menyatakan kalau kontes ini terbuka untuk sluruh dunia. Ketua penyelenggara kontes ini, Faysal Soysal, mengajak semua orang untuk berpartisipasi di dalam kontes ini untuk membantu merestorasi rasa belas kasihan dan keadilan di seluruh dunia. "Mercy and Justice" International Short Film Video: https://www.youtube.com/watch?v=nM3ze35m5mc Dewan juri akan dipimpin oleh sutradara film asing peraih nominasi Oscar, Children of Heaven, Majid Majidi dari Iran. Berikut adalah jajaran dewan juri:Osman Sınav, Hasanali Yildirim, Faysal Soysal, dan Mehmet Ozgur dari Turki; Sahin Sisic dari Bosnia, dan Rashid Masharawi dari Palestina. Sedangkan dewan juri babak seleksi meliputi Cihan Aktas, Mustafa Kara, Kalandar Sogogu, Bünyamin Yilmaz, dan Ferhat Essiz. Didukung sepenuhnya oleh President Turki Mengingat kontes ini melibatkan seluruh spektrum perdamaian, demoktrasi, nasionalisme, spirtual, dan kemanusiaan, Presiden Turki, Recep Tayyip Erdogan memberikan dukungan dibawah sponsorship dari Kepresidenan Turki. 20 film memperebutkan total hadiah senilai 99.000 lira (sekira Rp.400 juta) Kontes ini akan memilih 20 film terbaik. Juara pertama akan mendapatkan uang senilai 30.000 lira; runner-up memperoleh 20.000 lira; dan pemenang ketiga mendapatkan 15.000 lira. Sedangkan para peraih honorable mentions yang berada di ranking empat hingga 20 masing-masing akan mendapatkan 2.000 lira. KONTAK: info@merhametveadalet.com http://en.merhametveadalet.com/ http://www.facebook.com/cekmekoyshortfilm www.twitter.com/AdaletMerhamet Sumber: Pemerintah Kota Cekmekoy'))
        assert(_.isEqual(result['source'], 'Antara'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/antara/antara-singlepage4.html')
      })
      .then(Antara.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://otomotif.antaranews.com/berita/546646/prototype'))
        assert(_.isEqual(result['title'], 'Astra Otoparts luncurkan ban motor terbaru Aspira Premio '))
        assert(_.isEqual(result['date'], 1456214760000))
        assert(_.isEqual(result['img'], 'http://img.antaranews.com/new/2016/02/ori/20160223photo_2-7.jpg'))
        assert(_.isEqual(result['content'], 'Jakarta (ANTARA News) - PT Astra Otoparts Tbk meluncurkan rangkaian jenis ban sepeda motor terbaru dengan merek Aspira Premio.Untuk memproduksi ban yang diklaim berkualitas premium itu, Astra Otoparts bekerja sama dengan pabrikan ban terkemuka di dunia asal Italia, Pirelli dengan mendirikan perusahaan patungan (Astra Otoparts 40 persen, Pirelli 60 persen), yakni PT Evoluzione Tyres untuk memproduksi ban tersebut."Kami siap bersaing untuk menjadi pilihan utama para pengendara sepeda motor di Indonesia dalam memberikan pengalaman berkendara dengan performa dan kualitas kelas dunia karena seluruh proses produksi ban akan dikontrol secara penuh oleh Pirelli baik dari sisi teknologi, pengadaan, kualitas bahan, dan juga tenaga ahli," kata Direktur PT Astra Otoparts Tbk Yusak Kristian, di Jakarta, Selasa.Ban yang diluncurkan Aspira Premio dengan teknologi Italia itu meliputi tiga tipe Urbano, Sportivo, dan Sportivo RS. "Urbano yang merupakan ban urban commuting untuk melakukan aktivitas sehari-hari yang sesuai dengan medan jalan perkotaan dengan aus yang merata, nyaman di jalan kering, dan aman di medan basah," jelas R&D PR PT Evoluzione Alessandro Monzani.Sementara Sportivo, lanjutnya, merupakan ban sporty touring bagi pengendara yang suka berpetualang atau melakukan perjalanan jarak jauh dengan performa manuver yang lebih baik. Sedangkan Sportivo RS, ban racing street, yang diciptakan untuk memberikan performa berkendara maksimal di jalan raya maupun lintasan balap. Sportivo RS menggunakan komponen silika yang memberikan traksi maksimal di kecepatan tinggi, cengkeraman kuat pada saat manuver dan keamanan dalam pengereman dan jalan basah.Alessandro menambahkan ban tersebut telah menjalani proses tes yang ketat baik tes dalam jangka waktu pendek maupun tes dengan proses waktu yang panjang. Namun, ia menolak membeberkan secara detail mengenai proses pengetesan."Yang pasti tes dilakukan di Indonesia karena disesuaikan dengan jalan di Indonesia. Dan mulai dari proses merancang hingga masuk produksi memakan waktu setahun. Kami sangat detail dan menggunakan material yang terbaik dengan harga yang kompetitif," jelas Alessandro.'))
        assert(_.isEqual(result['source'], 'Antara'))
      })
      .then(function () {
        return getContent('test/fixtures/websites/antara/antara-singlepage5.html')
      })
      .then(Antara.getDataFromSinglePage)
      .then(function (result) {
        assert(result.hasOwnProperty('url'))
        assert(result.hasOwnProperty('title'))
        assert(result.hasOwnProperty('date'))
        assert(result.hasOwnProperty('img'))
        assert(result.hasOwnProperty('content'))
        assert(_.isEqual(result['url'], 'http://www.antaranews.com/berita/629369/saat-pengadilan-pertemukan-brotoseno-dan-angelina-sondakh'))
        assert(_.isEqual(result['title'], 'Saat pengadilan pertemukan Brotoseno dan Angelina Sondakh'))
        assert(_.isEqual(result['date'], 1494848636000))
        assert(_.isEqual(result['img'], 'http://img.antaranews.com/new/2017/02/ori/201702080081.jpg'))
        assert(_.isEqual(result['content'], 'Jakarta (ANTARA News) - Peribahasa garam di laut, asam di gunung bertemu di belanga jua yang artinya biarpun tempat tinggal terpaut jauh, kalau memang sudah jodoh akan bertemu, tampak tepat disematkan ke pasangan Raden Brotoseno dan Angelina Patricia Pinkan Sondakh yang tanpa direncanakan bertemu di Pengadilan Tindak Pidana Korupsi (Tipikor) Jakarta. Setidaknya mereka sudah 6 bulan tidak bertemu yaitu setelah 11 November 2016 ketika Brotoseno terjaring operasi tangkap tangan (OTT) Tim Saber Pungli. Brotoseno pun ditahan di rumah tahanan Cipinang sedangkan Angie sedang menjalani masa tahanan selama 10 tahun penjara di lembaga pemasyarakan (lapas) Pondok Bambu. "Ini cerita saya sudah bisa ditulis jadi novel," kata Brotoseno bergurau. Hari ini, Brotoseno dijadwalkan mendengarkan sidang pembacaan tuntutan dalam kasus dugaan penerimaan suap terkait penundaan pemanggilan Dahlan Iskan dalam kasus korupsi cetak sawah. Sedangkan istrinya, Angie menjadi saksi untuk Andi Zulkarnaen Mallarangeng alias Choel Mallarangeng yang didakwa mendapat keuntungan Rp4 miliar dan 550 ribu dolar AS bersama-sama dengan abangnya, mantan Menteri Pemuda dan Olahraga Andi Alifian Mallarangeng dari proyek P3SON Hambalang. Awalnya, Brotoseno tampak malu-malu dan menghindar untuk duduk bersama Angie. Angie yang mengenakan kerudung warna "peach" dan kemeja warna senada dibalut bawahan hitam sudah lebih dulu masuk ke ruang sidang Cakra 2 tempat kasus Choel disidangkan. Brotoseno pun mengambil siasat dengan menghampiri ibunya yang juga menunggu di ruang sama. Sebagai anak bungsu, ia memang kerap ditemani sang ibu saat bersidang. Brotoseno yang tampak gagah malah enggan duduk bersama dengan Angie dan memilih posisi duduk di kursi paling belakang. Ia tampak tekun menunggu sidang sambil dengan mengobrol dengan rekan-rekannya. Senyum tak lepas dari wajah Brotoseno yang kali ini mengenakan kemeja batik bercorak cokelat lengkap memakai kacamata dengan "frame" tebal. Rambutnya tetap disisir rapi ke belakang dan kedua bola matanya tentu berbinar karena ia akhirnya berhasil menuntaskan rindu dengan pasangan yang tidak ia lihat setengah tahun lamanya. Meski sering tersenyum, Brotoseno mengaku khawatir bila ia duduk bersama Angie maka wartawan akan sigap mengambil gambar keduanya dan akan mempersulit posisinya yang memang sedang sulit. Ia cukup puas dengan melihat Angie dari jauh dan mengamati istrinya bersaksi saat itu. "Untung sidang (Choel) ini duluan, kalau saya duluan bisa-bisa saya harus pulang duluan dan malah tidak bisa lihat (Angie)," ungkap Brotoseno. Sidang yang memang biasa molor dari jamnya itu akhirnya dimulai sekitar pukul 11.30, Angie pun maju menjadi saksi. Namun tidak sampai selesai Angie bersaksi, Brotoseno sudah keluar ruang sidang, mungkin agar dapat tersenyum lebih lapang. Awal Cerita Brotoseno yang saat ini berpangkat Ajung Komisaris Besar Polisi (AKBP) itu sesungguhnya pernah menjadi penyidik di KPK. Pada 21 April 2011, ia ikut OTT terhadap Sekretaris Menteri Pemuda dan Olah Raga, Wafid Muharram dan dua pemberi suap yaitu Mindo Rosalina Manulang dan Mohammad El Idris di kantor Kemenpora. Kasus bergulir, KPK pun menetapkan Bendahara Partai Demokrat dan anggota DPR Muhammad Nazarudin sebagai tersangka. Angie sebagai rekan satu partai Nazaruddin sekaligus anggota awalnya menjadi saksi dan beberapa kali diperiksa Brotoseno yang ketika itu berpangkat Komisaris Polisi (Kompol). Rangkaian pertemuan itu berbuah asmara dan menjadi bahan pembicaraan di KPK sehingga KPK pun memeriksa Brotoseno dan tidak menemukan pelanggaran kode etik. Setelah itu Brotoseno ditarik ke Mabes Polri karena KPK khawatir ada konflik kepentingan dalam penyidikan kasus Wisma Atlet. Angie yang semula menutup-nutupi hubungannya dengan Brotoseno lama-kelamaan mulai terbuka. Pada 27 Desember 2011, Angie mengajak Brotoseno melakukan kunjungan kerja DPR ke daerah pemilihannya di Wonosobo, Jawa Tengah. Setelah itu, foto-foto mesra keduanya tersebar. Namun tak berapa lama, Angie pun ditetapkan sebagai tersangka kasus suap pembahasan anggaran di Kemenpora dan Kementerian Pendidikan dan Kebudayaan (Kemendikbud) sebesar Rp2,5 miliar dan 1,2 juta dolar AS. Angie pada pengadilan tingkat pertama divonis 4,5 tahun dan denda Rp250 juta subsider 6 bulan kurungan pada 10 Januari 2013. Mantan Putri Indonesia itu pun melawan dan mengajukan banding hingga Pengadilan Tinggi DKI Jakarta memperkuat vonis itu, namun kali ini KPK yang tidak terima sehingga mengajukan kasasi. Pada 20 November 2013, majelis kasasi MA menjatuhkan hukuman 12 tahun penjara dan hukuman denda Rp500 juta ditambah kewajiban membayar uang pengganti senilai Rp12,58 miliar dan 2,35 juta dolar AS (sekitar Rp27,4 miliar). Putusan yang jauh lebih berat itu membuat Angie mengajukan Peninjauan Kembali (PK) sehingga majelis PK pun pada 30 Desember 2015 mengurangi vonis menjadi pidana penjara 10 tahun ditambah denda Rp500 juta subsider 6 bulan kurungan. Akhir Cerita? Artinya Angie baru menjalani 5 tahun masa hukumannya pada tahun inin dan masih ada sisa 5 tahun lagi atau bisa berkurang bila mendapat remisi. Namun Brotoseno sebaliknya, ia masih menunggu pembacaan tuntutan yang ternyata kembali ditunda pada hari ini. "Jaksa minta ditunda lagi karena jaksa penuntut umum belum siap dengan tuntutannya, jadi 18 Mei (sidang tuntutan). Kalau tidak bisa juga tanggal itu silakan buat surat pernyataan supaya saya tidak disalahkan pimpinan. Saya rasa demikian Pak, sidang ditutup," kata ketua majelis hakim Baslin Sinaga. Brotoseno didakwa menerima Rp1,9 miliar ditambah 5 tiket pesawat kelas bisnis Yogya-Jakarta senilai Rp10 juta terkait penundaan pemanggilan Dahlan Iskan dalam kasus korupsi cetak sawah. Uang itu berasal dari PT Kaltim Elektrik Power dimana Dahlan memiliki saham di sebagian besar perusahan itu dengan alasan untuk operasional perusahaan antara lain dan untuk membayar jasa pengacara perusahaan Jawa Pos Grup/JPPN. Brotoseno bahkan menjelaskan penanganan perkara cetak sawah, antara lain pemanggilan Dahlan Iskan untuk pemeriksaan oleh penyidik dan ketidakjelasan kehadiran Dahlan. Brotoseno juga menyarankan agar surat pemberitahuan Dahlan untuk penundaan pemeriksaan dikirim ke kantor. Ia menyampaikan bahwa membutuhkan biaya milyaran untuk berobat orang-tuanya yang sakit ginjal. Brotoseno diancam pidana dalam Pasal 12 huruf a atau pasal 12 huruf b atau pasal 11 atau 5 ayat 2 UU No 31 Tahun 1999 yang diubah dengan UU No. 20 Tahun 2001 tentang Pemberantasan Tindak Pidana Korupsi jo Pasal 64 ayat (1) KUHP jo pasal 55 ayat (1) ke-1 KUHP mengenai penerimaan suap oleh penyelenggara negara dengan maksimal ancaman hukuman 20 tahun penjara. Bila jaksa penuntut umum Kejaksaan Agung menuntut dengan hukuman maksimal, artinya masih lama Brotoseno dan Angie dipertemukan dalam satu atap. Lantas bagaimana akhir cerita kedua sejoli ini?'))
        assert(_.isEqual(result['source'], 'Antara'))
      })
  })

  // // === this test do I/O
  // it('scrap', function () {
  //   return Promise.resolve()
  //     .then(Antara.scrap)
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
  //     .then(Antara.getURLs)
  //     .then(console.log)
  // })

})
