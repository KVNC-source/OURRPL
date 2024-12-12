const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#num-questions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

let allQuestions = [
  // Matematika (easy)
  {
    numb: 1,
    question: "(12² ÷ 6) + 5 = ?",
    answer: "25",
    difficulty: "easy",
    category: "Matematika",
    options: ["23", "25", "27", "29"],
  },
  {
    numb: 2,
    question: "(15 - 9)² ÷ 3 = ?",
    answer: "16",
    difficulty: "easy",
    category: "Matematika",
    options: ["10", "12", "14", "16"],
  },
  {
    numb: 3,
    question: "√(144) + (3 × 5) = ?",
    answer: "24",
    difficulty: "easy",
    category: "Matematika",
    options: ["22", "24", "26", "28"],
  },
  {
    numb: 4,
    question: "(48 ÷ 8)² - 4 = ?",
    answer: "36",
    difficulty: "easy",
    category: "Matematika",
    options: ["32", "36", "40", "44"],
  },
  {
    numb: 5,
    question: "10 × (2² + 3) = ?",
    answer: "90",
    difficulty: "easy",
    category: "Matematika",
    options: ["70", "80", "90", "100"],
  },
  {
    numb: 6,
    question: "(25² ÷ 5) + 12 = ?",
    answer: "137",
    difficulty: "easy",
    category: "Matematika",
    options: ["137", "152", "157", "162"],
  },
  {
    numb: 7,
    question: "(30 - 18) × √(49) = ?",
    answer: "84",
    difficulty: "easy",
    category: "Matematika",
    options: ["60", "72", "84", "96"],
  },
  {
    numb: 8,
    question: "(9 × 5²) - (7 × 2) = ?",
    answer: "225",
    difficulty: "easy",
    category: "Matematika",
    options: ["215", "220", "225", "230"],
  },
  {
    numb: 9,
    question: "(56 ÷ √(64)) + (12² ÷ 6) = ?",
    answer: "37",
    difficulty: "easy",
    category: "Matematika",
    options: ["25", "29", "33", "37"],
  },
  {
    numb: 10,
    question: "7 × (3² + 4) - 10 = ?",
    answer: "127",
    difficulty: "easy",
    category: "Matematika",
    options: ["123", "125", "127", "129"],
  },

  //Matematika Hard
  {
    numb: 20,
    question: "Berapa nilai dari 5! (faktorial 5)?",
    answer: "120",
    difficulty: "hard",
    category: "Matematika",
    options: ["100", "110", "120", "130"],
  },
  {
    numb: 21,
    question: "Jika x² + 6x + 9 = 0, berapakah nilai dari 2x + 5?",
    answer: "-1",
    difficulty: "hard",
    category: "Matematika",
    options: ["-3", "-1", "0", "1"],
  },
  {
    numb: 22,
    question: "Berapakah nilai dari (√(625) + 12) × (15 ÷ 3)?",
    answer: "155",
    difficulty: "hard",
    category: "Matematika",
    options: ["145", "150", "155", "160"],
  },
  {
    numb: 23,
    question: "Jika f(x) = 2x³ - x² + 3x - 5, berapakah nilai f(-2)?",
    answer: "-27",
    difficulty: "hard",
    category: "Matematika",
    options: ["-25", "-27", "-29", "-31"],
  },
  {
    numb: 24,
    question: "Jika 2 log(3x) = log(81), berapakah nilai x?",
    answer: "9",
    difficulty: "hard",
    category: "Matematika",
    options: ["3", "6", "9", "12"],
  },
  {
    numb: 25,
    question: "Berapakah hasil dari (7² - 5³) × (√(49) - 2)?",
    answer: "-294",
    difficulty: "hard",
    category: "Matematika",
    options: ["-300", "-294", "-288", "-282"],
  },
  {
    numb: 26,
    question: "Jika x² - 5x + 6 = 0, berapakah nilai dari x² + x - 1?",
    answer: "0",
    difficulty: "hard",
    category: "Matematika",
    options: ["0", "1", "2", "3"],
  },
  {
    numb: 27,
    question:
      "Sebuah bola memiliki volume 523.6 cm³. Berapakah jari-jarinya? (Gunakan π = 3.14)",
    answer: "5 cm",
    difficulty: "hard",
    category: "Matematika",
    options: ["4 cm", "5 cm", "6 cm", "7 cm"],
  },
  {
    numb: 28,
    question: "Jika (x - 3)² = 25, berapakah nilai dari x² - 6x?",
    answer: "-16",
    difficulty: "hard",
    category: "Matematika",
    options: ["-20", "-18", "-16", "-14"],
  },
  {
    numb: 29,
    question: "Berapakah hasil dari [(5³ × 2) - (4² × 3)] ÷ √(81)?",
    answer: "23",
    difficulty: "hard",
    category: "Matematika",
    options: ["21", "23", "25", "27"],
  },
  {
    numb: 30,
    question: "Jika a + b = 10 dan ab = 21, berapakah nilai dari a² + b²?",
    answer: "58",
    difficulty: "hard",
    category: "Matematika",
    options: ["56", "58", "60", "62"],
  },

  //Bahasa Indonesia (easy)
  {
    numb: 31,
    question: "Apa yang dimaksud dengan kata 'meja'?",
    answer: "Perabotan untuk meletakkan barang",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Alat untuk menulis",
      "Tempat untuk tidur",
      "Perabotan untuk meletakkan barang",
      "Alat untuk memasak",
    ],
  },
  {
    numb: 32,
    question: "Sebutkan 5 benda yang biasa ditemukan di dapur!",
    answer: "Pisau, garpu, piring, kompor, panci",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Meja, kursi, sofa, lemari, tempat tidur",
      "Pisau, garpu, piring, kompor, panci",
      "Buku, pensil, kertas, penghapus, papan tulis",
      "Televisi, radio, komputer, printer, kamera",
    ],
  },
  {
    numb: 33,
    question: "Jelaskan apa yang dimaksud dengan 'pohon'.",
    answer: "Tumbuhan besar yang memiliki batang, cabang, dan daun",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Hewan yang hidup di hutan",
      "Tumbuhan besar yang memiliki batang, cabang, dan daun",
      "Tempat tinggal manusia",
      "Alat transportasi",
    ],
  },
  {
    numb: 34,
    question: "Buatlah kalimat menggunakan kata 'buku'!",
    answer: "Buku itu sangat menarik untuk dibaca.",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Saya suka menonton televisi.",
      "Buku itu sangat menarik untuk dibaca.",
      "Dia berlari dengan cepat.",
      "Kami pergi ke pasar kemarin.",
    ],
  },
  {
    numb: 35,
    question: "Apa arti dari kata 'makan'?",
    answer: "Mengkonsumsi makanan",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Proses minum air",
      "Kegiatan tidur di malam hari",
      "Mengkonsumsi makanan",
      "Kegiatan berolahraga",
    ],
  },
  {
    numb: 36,
    question: "Sebutkan 3 jenis buah-buahan yang sering kita makan!",
    answer: "Pisang, apel, jeruk",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Meja, kursi, lemari",
      "Pisang, apel, jeruk",
      "Kertas, buku, pensil",
      "Mobil, motor, sepeda",
    ],
  },
  {
    numb: 37,
    question: "Buatlah kalimat menggunakan kata 'rumah'!",
    answer: "Kami tinggal di rumah yang nyaman.",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Dia bermain bola di lapangan.",
      "Kami tinggal di rumah yang nyaman.",
      "Mereka pergi ke pantai.",
      "Ayah membaca koran di pagi hari.",
    ],
  },
  {
    numb: 38,
    question: "Apakah yang dimaksud dengan 'mobil'?",
    answer: "Kendaraan beroda empat",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Alat untuk menulis",
      "Kendaraan beroda empat",
      "Peralatan dapur",
      "Alat untuk memasak",
    ],
  },
  {
    numb: 39,
    question: "Sebutkan 3 warna yang sering kita lihat!",
    answer: "Merah, biru, kuning",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Merah, biru, kuning",
      "Hijau, ungu, oranye",
      "Hitam, putih, abu-abu",
      "Merah muda, coklat, perak",
    ],
  },
  {
    numb: 40,
    question: " Manakah kalimat yang menggunakan kata 'sekolah'!",
    answer: "Kami pergi ke sekolah setiap hari Senin sampai Jumat.",
    difficulty: "easy",
    category: "Bahasa",
    options: [
      "Saya menyiram tanaman di halaman.",
      "Kami pergi ke sekolah setiap hari Senin sampai Jumat.",
      "Mereka berenang di kolam renang.",
      "Dia menyapu lantai setiap pagi.",
    ],

    //Bahasa Indonesia (medium)
  },
  {
    numb: 41,
    question:
      "Bacalah puisi di bawah ini! Sarang garuda di bawah pohon beringin\nBuah kemuning di dalam puan\nSepucuk surat di layangkan angin Putih kuning sambutlah tuan Puisi di atas dikategorikan sebagai pantun karena…",
    answer: "E",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Berima a-a-a-a",
      "B. Mengandung nasihat",
      "C. Memiliki sampiriran dan isi",
      "D. Terdiri atas empat baris",
      "E. Memiliki ketentuan baku",
    ],
  },
  {
    numb: 42,
    question:
      "Bacalah Gurindam di bawah ini! Sudah gaharu, cendana pula Sudah tau, bertanya pula\nNasihat yang terkandung di dalam gurindam di atas adalah...",
    answer: "E",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Banyak bertanya itu baik",
      "B. Bertanya sewaktu-waktu saja",
      "C. Sebaiknya bisa menahan diri kalau sudah banyak tahu.",
      "D. Jangan angkuh dengan banyaknya pengetahuan.",
      "E. Bertanya itu penting kalau memang tidak tahu.",
    ],
  },
  {
    numb: 43,
    question:
      "Bacalah puisi di bawah ini! Tak ada yang lebih tabah Dari hujan bulan Juni Di rahasiakannya rintik rindunya Dari pada pohon berbunga itu Penandaan cetak miring di atas berkenaan dengan aspek...",
    answer: "C",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Lafal",
      "B. Intonasi",
      "C. Tekanan",
      "D. Jeda",
      "E. Ekspresi",
    ],
  },
  {
    numb: 44,
    question:
      "Di bawah ini yang bukan merupakan sikap yang dimiliki saat bernegosiasi adalah...",
    answer: "B",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Menggunakan bahasa yang santun.",
      "B. Memonopoli pembicaraan.",
      "C. Menghargai mitra bicara.",
      "D. Arah pembicaraan tidak keluar dari pokok pembicaraan.",
      "E. Bersikap sopan.",
    ],
  },
  {
    numb: 45,
    question:
      "Berikut ini hal yang tidak perlu dilakukan saat menceritakan kembali teks anekdot adalah...",
    answer: "D",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Tetap mempertahankan bagian anekdotnya",
      "B. Menggunakan ekspresi yang tepat sesuai isi teks",
      "C. Disampaikan dengan bahasa yang mudah dipahami",
      "D. Selalu menggunakan intonasi tinggi agar pendengar menyimak dengan baik",
      "E. Memahami karakter pendengar agar tidak menimbulkan kesalahpahaman",
    ],
  },
  {
    numb: 46,
    question:
      "Perhatikan kalimat berikut! 'Buku yang tergeletak di meja itu adalah milikku.' Kata yang bercetak miring merupakan jenis kata...",
    answer: "D",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Adjektiva",
      "B. Adverbia",
      "C. Verba",
      "D. Pronomina",
      "E. Konjungsi",
    ],
  },
  {
    numb: 47,
    question:
      "Bacalah teks berikut! Di zaman modern ini, banyak orang lebih memilih makanan cepat saji dibandingkan makanan tradisional. Akibatnya, makanan tradisional mulai ditinggalkan. Namun, makanan tradisional memiliki nilai budaya yang penting dan bergizi tinggi. Ide pokok paragraf di atas adalah...",
    answer: "B",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Modernisasi merubah pola makan masyarakat.",
      "B. Makanan tradisional mulai ditinggalkan.",
      "C. Makanan cepat saji lebih digemari masyarakat.",
      "D. Budaya masyarakat berubah akibat zaman modern.",
      "E. Makanan cepat saji tidak bergizi.",
    ],
  },
  {
    numb: 48,
    question:
      "Manakah pasangan kata di bawah ini yang memiliki hubungan sinonim?",
    answer: "C",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Lari - Duduk",
      "B. Cepat - Lambat",
      "C. Cantik - Indah",
      "D. Panjang - Pendek",
      "E. Jatuh - Bangun",
    ],
  },
  {
    numb: 49,
    question:
      "Perhatikan kalimat berikut! 'Kami semua belajar dengan sungguh-sungguh agar dapat menguasai pelajaran dengan baik.' Kata 'sungguh-sungguh' pada kalimat tersebut termasuk ke dalam jenis kata...",
    answer: "B",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Nomina",
      "B. Adverbia",
      "C. Verba",
      "D. Adjektiva",
      "E. Pronomina",
    ],
  },
  {
    numb: 50,
    question:
      "Bacalah kutipan berikut! 'Ketika mentari mulai tenggelam di ufuk barat, seorang anak kecil berlari menyusuri pantai dengan tawa ceria.' Gaya bahasa yang digunakan dalam kalimat di atas adalah...",
    answer: "A",
    difficulty: "hard",
    category: "Bahasa",
    options: [
      "A. Deskriptif",
      "B. Metafora",
      "C. Alegori",
      "D. Simile",
      "E. Personifikasi",
    ],
  },

  //IPA (easy)

  {
    numb: 71,
    question: "Apa yang dimaksud dengan fotosintesis?",
    answer: "Proses di mana tumbuhan mengubah cahaya matahari menjadi energi.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Proses di mana tumbuhan mengambil oksigen dari udara.",
      "Proses di mana tumbuhan mengubah cahaya matahari menjadi energi.",
      "Proses di mana tumbuhan menghasilkan bunga dan buah.",
      "Proses di mana tumbuhan beristirahat di malam hari.",
    ],
  },
  {
    numb: 72,
    question: "Bagaimana cara kerja jantung dalam tubuh manusia?",
    answer: "Jantung memompa darah ke seluruh tubuh.",
    difficulty: "easy",
    options: [
      "Jantung menyaring darah untuk menghilangkan kotoran.",
      "Jantung memompa darah ke seluruh tubuh.",
      "Jantung mengubah oksigen menjadi karbon dioksida.",
      "Jantung memproduksi sel darah merah.",
    ],
  },
  {
    numb: 73,
    question: "Apa yang terjadi pada es saat dipanaskan?",
    answer: "Es mencair menjadi air.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Es mencair menjadi air.",
      "Es menguap menjadi gas.",
      "Es berubah menjadi salju.",
      "Es tetap dalam bentuk padat.",
    ],
  },
  {
    numb: 74,
    question: "Apa yang dimaksud dengan daur hidup kupu-kupu?",
    answer:
      "Proses perubahan dari telur menjadi ulat, kepompong, dan akhirnya kupu-kupu.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Proses perubahan dari telur menjadi ulat, kepompong, dan akhirnya kupu-kupu.",
      "Proses di mana kupu-kupu berubah warna setiap musim.",
      "Proses di mana kupu-kupu mencari makan setiap hari.",
      "Proses di mana kupu-kupu berpindah tempat untuk bertelur.",
    ],
  },
  {
    numb: 75,
    question: "Apa fungsi akar pada tumbuhan?",
    answer: "Menyerap air dan nutrisi dari tanah.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Menyerap air dan nutrisi dari tanah.",
      "Menghasilkan makanan bagi tumbuhan.",
      "Mengubah cahaya matahari menjadi energi.",
      "Melindungi tumbuhan dari hama.",
    ],
  },
  {
    numb: 76,
    question: "Mengapa langit berwarna biru pada siang hari?",
    answer: "Karena cahaya matahari dihamburkan oleh molekul udara.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Karena cahaya matahari dihamburkan oleh molekul udara.",
      "Karena lautan memantulkan warna biru.",
      "Karena langit terbuat dari materi biru.",
      "Karena cahaya matahari berubah warna di siang hari.",
    ],
  },
  {
    numb: 77,
    question: "Apa yang dimaksud dengan gaya gravitasi?",
    answer: "Gaya yang menarik benda ke arah pusat bumi.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Gaya yang menarik benda ke arah pusat bumi.",
      "Gaya yang mendorong benda menjauh dari bumi.",
      "Gaya yang membuat benda mengapung di udara.",
      "Gaya yang hanya bekerja di luar angkasa.",
    ],
  },
  {
    numb: 78,
    question: "Bagaimana cara menghemat energi listrik di rumah?",
    answer: "Mematikan lampu dan peralatan listrik saat tidak digunakan.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Mematikan lampu dan peralatan listrik saat tidak digunakan.",
      "Membiarkan lampu menyala sepanjang hari.",
      "Menggunakan lebih banyak peralatan listrik.",
      "Membeli peralatan listrik baru setiap bulan.",
    ],
  },
  {
    numb: 79,
    question: "Apa yang dimaksud dengan ekosistem?",
    answer:
      "Interaksi antara makhluk hidup dan lingkungan tempat mereka tinggal.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Interaksi antara makhluk hidup dan lingkungan tempat mereka tinggal.",
      "Hanya kumpulan tumbuhan di suatu area.",
      "Tempat tinggal hewan-hewan buas.",
      "Kumpulan batu dan mineral di alam.",
    ],
  },
  {
    numb: 80,
    question: "Apa yang dimaksud dengan perubahan kimia?",
    answer: "Perubahan yang menghasilkan zat baru dengan sifat yang berbeda.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Perubahan yang menghasilkan zat baru dengan sifat yang berbeda.",
      "Perubahan yang hanya mengubah bentuk zat.",
      "Perubahan yang tidak mengubah sifat zat.",
      "Perubahan warna suatu zat.",
    ],
  },
  {
    numb: 1,
    question:
      "Sebuah benda bergerak dengan kecepatan 30 m/s. Jika gaya yang bekerja pada benda tersebut adalah 60 N, berapakah percepatan yang dialami oleh benda tersebut?",
    answer: "B",
    difficulty: "hard",
    category: "IPA",
    options: ["A. 2 m/s²", "B. 3 m/s²", "C. 4 m/s²", "D. 5 m/s²"],
  },
  {
    numb: 2,
    question:
      "Sebuah bola dilempar vertikal ke atas dengan kecepatan awal 20 m/s. Berapa waktu yang dibutuhkan bola untuk mencapai ketinggian maksimum? (g = 10 m/s²)",
    answer: "B",
    difficulty: "hard",
    category: "IPA",
    options: ["A. 1 detik", "B. 2 detik", "C. 3 detik", "D. 4 detik"],
  },
  {
    numb: 3,
    question:
      "Dua buah benda yang memiliki massa 5 kg dan 10 kg diletakkan pada jarak 2 meter. Hitunglah besar gaya gravitasi yang bekerja antara kedua benda tersebut. (G = 6.67 × 10⁻¹¹ N·m²/kg²)",
    answer: "A",
    difficulty: "hard",
    category: "IPA",
    options: [
      "A. 8.35 × 10⁻¹¹ N",
      "B. 1.67 × 10⁻¹¹ N",
      "C. 2.67 × 10⁻¹¹ N",
      "D. 4.67 × 10⁻¹¹ N",
    ],
  },
  {
    numb: 4,
    question:
      "Suatu benda bermassa 10 kg bergerak dengan kecepatan 5 m/s. Berapakah energi kinetik benda tersebut?",
    answer: "C",
    difficulty: "hard",
    category: "IPA",
    options: ["A. 50 J", "B. 75 J", "C. 100 J", "D. 125 J"],
  },
  {
    numb: 5,
    question:
      "Sebuah rangkaian listrik terdiri dari dua buah resistor, 4 Ω dan 6 Ω, yang disusun secara paralel. Berapakah resistansi total rangkaian tersebut?",
    answer: "B",
    difficulty: "hard",
    category: "IPA",
    options: ["A. 2 Ω", "B. 2.4 Ω", "C. 3 Ω", "D. 3.2 Ω"],
  },
  {
    numb: 6,
    question:
      "Sebuah mobil bergerak dengan kecepatan 20 m/s. Jika mobil tersebut berhenti dalam waktu 5 detik, berapakah percepatan negatif yang dialami mobil?",
    answer: "A",
    difficulty: "hard",
    category: "IPA",
    options: ["A. -4 m/s²", "B. -3 m/s²", "C. -2 m/s²", "D. -1 m/s²"],
  },
  {
    numb: 7,
    question:
      "Sebuah bola dijatuhkan dari ketinggian 45 meter. Berapa waktu yang dibutuhkan bola untuk mencapai tanah? (g = 9.8 m/s²)",
    answer: "C",
    difficulty: "hard",
    category: "IPA",
    options: ["A. 3 detik", "B. 4 detik", "C. 5 detik", "D. 6 detik"],
  },
  {
    numb: 8,
    question:
      "Sebuah benda yang bergerak dengan kecepatan 10 m/s berhenti setelah melintasi jarak 50 m. Berapakah gaya yang bekerja pada benda tersebut jika massanya 5 kg?",
    answer: "B",
    difficulty: "hard",
    category: "IPA",
    options: ["A. 10 N", "B. 20 N", "C. 25 N", "D. 50 N"],
  },
  {
    numb: 9,
    question:
      "Sebuah bola dipantulkan dari permukaan keras dengan kecepatan 12 m/s. Jika bola tersebut memantul kembali dengan kecepatan 10 m/s, berapa perubahan momentum bola? (Massa bola = 0.5 kg)",
    answer: "A",
    difficulty: "hard",
    category: "IPA",
    options: ["A. 11 kg·m/s", "B. 9 kg·m/s", "C. 7 kg·m/s", "D. 5 kg·m/s"],
  },
  {
    numb: 10,
    question:
      "Sebuah kapal bergerak dengan kecepatan 25 m/s. Jika massa kapal adalah 2000 kg, berapa energi kinetik kapal tersebut?",
    answer: "C",
    difficulty: "hard",
    category: "IPA",
    options: ["A. 50000 J", "B. 60000 J", "C. 625000 J", "D. 750000 J"],
  },
];

let questions = [],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

const startQuiz = () => {
  const numQues = parseInt(numQuestions.value);
  const selectedDifficulty = difficulty.value;
  const selectedCategory = category.value;

  questions = allQuestions
    .filter(
      (question) =>
        question.difficulty === selectedDifficulty &&
        question.category === selectedCategory
    )
    .slice(0, numQues);

  if (questions.length === 0) {
    alert("No questions available for the selected category and difficulty.");
    return;
  }

  startScreen.classList.add("hide");
  quiz.classList.remove("hide");
  currentQuestion = 1;
  showQuestion(questions[0]);
};

startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper"),
    questionNumber = document.querySelector(".number");

  questionText.innerHTML = question.question;

  const answers = [...question.options];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
      <div class="answer">
        <span class="text">${answer}</span>
        <span class="checkbox">
          <i class="fas fa-check"></i>
        </span>
      </div>
    `;
  });

  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
    <span class="total">/${questions.length}</span>`;

  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  time = parseInt(timePerQuestion.value);
  startTimer(time);
};

const startTimer = (time) => {
  let currentTime = time;
  clearInterval(timer);

  timer = setInterval(() => {
    if (currentTime >= 0) {
      progress(currentTime);
      currentTime--;
    } else {
      clearInterval(timer);
      checkAnswer();
    }
  }, 1000);
};

const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");

submitBtn.addEventListener("click", () => {
  checkAnswer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    if (answer === questions[currentQuestion - 1].answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      document.querySelectorAll(".answer").forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].answer
        ) {
          answer.classList.add("correct");
        }
      });
    }
  } else {
    document.querySelectorAll(".answer").forEach((answer) => {
      if (
        answer.querySelector(".text").innerHTML ===
        questions[currentQuestion - 1].answer
      ) {
        answer.classList.add("correct");
      }
    });
  }
  document.querySelectorAll(".answer").forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");

const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  window.location.reload();
});
