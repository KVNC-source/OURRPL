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
  // Matematika (SMA level)
  {
    numb: 1,
    question: "Jika x = 3, berapa nilai dari 2x² - 5x + 4?",
    answer: "14",
    difficulty: "medium",
    category: "Matematika",
    options: ["14", "16", "18", "20"],
  },
  {
    numb: 2,
    question:
      "Sebuah segitiga memiliki panjang alas 12 cm dan tinggi 8 cm. Berapa luas segitiga tersebut?",
    answer: "48 cm²",
    difficulty: "medium",
    category: "Matematika",
    options: ["40 cm²", "48 cm²", "50 cm²", "56 cm²"],
  },
  {
    numb: 3,
    question: "Berapakah hasil dari (8 + 2) × 5 - 6 ÷ 3?",
    answer: "50",
    difficulty: "medium",
    category: "Matematika",
    options: ["48", "50", "52", "54"],
  },
  {
    numb: 4,
    question: "Jika 3x - 5 = 16, berapakah nilai x?",
    answer: "7",
    difficulty: "medium",
    category: "Matematika",
    options: ["5", "6", "7", "8"],
  },
  {
    numb: 5,
    question:
      "Jika jumlah dua bilangan adalah 30 dan selisihnya 6, berapakah kedua bilangan tersebut?",
    answer: "18 dan 12",
    difficulty: "medium",
    category: "Matematika",
    options: ["18 dan 12", "20 dan 10", "25 dan 5", "15 dan 15"],
  },
  {
    numb: 6,
    question: "Berapakah hasil dari 25% x 600?",
    answer: "150",
    difficulty: "medium",
    category: "Matematika",
    options: ["100", "150", "200", "250"],
  },
  {
    numb: 7,
    question:
      "Sebuah bola memiliki diameter 10 cm. Berapa panjang keliling bola tersebut?",
    answer: "31.4 cm",
    difficulty: "medium",
    category: "Matematika",
    options: ["31.4 cm", "32 cm", "30 cm", "35 cm"],
  },
  {
    numb: 8,
    question: "Berapa hasil dari 5³ - 4³?",
    answer: "61",
    difficulty: "medium",
    category: "Matematika",
    options: ["61", "64", "70", "75"],
  },
  {
    numb: 9,
    question:
      "Jika luas lingkaran adalah 154 cm², berapakah jari-jari lingkaran tersebut? (Gunakan π = 22/7)",
    answer: "7 cm",
    difficulty: "medium",
    category: "Matematika",
    options: ["5 cm", "6 cm", "7 cm", "8 cm"],
  },
  {
    numb: 10,
    question: "Berapa nilai dari 5! (faktorial 5)?",
    answer: "120",
    difficulty: "medium",
    category: "Matematika",
    options: ["100", "110", "120", "130"],
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
      "Bacalah kalimat berikut ini: 'Ibu pergi ke pasar untuk membeli sayuran.' Apa kata kerja dalam kalimat tersebut?",
    answer: "pergi",
    difficulty: "medium",
    category: "Bahasa",
    options: ["Ibu", "pergi", "pasar", "membeli"],
  },
  {
    numb: 42,
    question: "Manakah kalimat yang menggunakan kata depan dengan benar?",
    answer: "Adik bermain di taman.",
    difficulty: "medium",
    category: "Bahasa",
    options: [
      "Buku itu milik dari Andi.",
      "Adik bermain di taman.",
      "Ayah bekerja ke kantor.",
      "Kami datang pada malam hari.",
    ],
  },
  {
    numb: 43,
    question: "Apa sinonim dari kata 'besar'?",
    answer: "Gede",
    difficulty: "medium",
    category: "Bahasa",
    options: ["Kecil", "Tinggi", "Luas", "Gede"],
  },
  {
    numb: 44,
    question:
      "Bacalah paragraf berikut: 'Rina sangat senang bermain di taman. Setiap sore, ia bermain bersama teman-temannya. Mereka sering bermain bola dan ayunan.' Apa kegiatan yang dilakukan Rina di taman?",
    answer: "Bermain bola dan ayunan",
    difficulty: "medium",
    category: "Bahasa",
    options: [
      "Membaca buku",
      "Bermain bola dan ayunan",
      "Menyapu taman",
      "Membeli jajanan",
    ],
  },
  {
    numb: 45,
    question: "Manakah kata yang merupakan kata sifat?",
    answer: "Cepat",
    difficulty: "medium",
    category: "Bahasa",
    options: ["Rumah", "Cepat", "Lari", "Mereka"],
  },
  {
    numb: 46,
    question: "Apa makna dari peribahasa 'Seperti air di daun talas'?",
    answer: "Orang yang tidak tetap pendiriannya",
    difficulty: "medium",
    category: "Bahasa",
    options: [
      "Orang yang pandai berbohong",
      "Orang yang sulit diatur",
      "Orang yang tidak tetap pendiriannya",
      "Orang yang sangat rajin",
    ],
  },
  {
    numb: 47,
    question: "Pilihlah kalimat tanya yang tepat untuk menanyakan waktu:",
    answer: "Kapan kita akan berangkat ke sekolah?",
    difficulty: "medium",
    category: "Bahasa",
    options: [
      "Siapa yang datang ke rumahmu?",
      "Kapan kita akan berangkat ke sekolah?",
      "Di mana kamu tinggal?",
      "Mengapa kamu sedih?",
    ],
  },
  {
    numb: 48,
    question: "Manakah kalimat yang benar menurut ejaan bahasa Indonesia?",
    answer: "Ibu membeli buah-buahan di pasar.",
    difficulty: "medium",
    category: "Bahasa",
    options: [
      "Saya sedang belajar bahasa indonesia.",
      "Ibu membeli buah-buahan di pasar.",
      "Kucing itu berwarna hitam Putih.",
      "Buku ini milik adik saya.",
    ],
  },
  {
    numb: 49,
    question:
      "Bacalah kalimat berikut: 'Adi berangkat ke sekolah pukul 07.00 pagi.' Manakah kata keterangan dalam kalimat tersebut?",
    answer: "Pukul 07.00 pagi",
    difficulty: "medium",
    category: "Bahasa",
    options: ["Adi", "Berangkat", "Ke sekolah", "Pukul 07.00 pagi"],
  },
  {
    numb: 50,
    question:
      "Pilihlah kata yang tepat untuk melengkapi kalimat berikut: 'Ayah sedang ... mobil di garasi.'",
    answer: "Memperbaiki",
    difficulty: "medium",
    category: "Bahasa",
    options: ["Memperbaiki", "Membaca", "Menyiram", "Mencuci"],
  },

  //IPA (easy)
  {
    numb: 61,
    question: "Apa yang dimaksud dengan alat pernapasan pada manusia?",
    answer:
      "Sistem yang terdiri dari organ-organ yang berfungsi untuk bernapas dan menghirup oksigen.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Organ tubuh yang berfungsi untuk mencerna makanan.",
      "Sistem yang terdiri dari organ-organ yang berfungsi untuk bernapas dan menghirup oksigen.",
      "Jaringan yang berfungsi mengirimkan sinyal listrik ke otak.",
      "Bagian tubuh yang berfungsi untuk mengatur suhu tubuh.",
    ],
  },
  {
    numb: 62,
    question: "Sebutkan 3 jenis makanan yang mengandung protein!",
    answer: "Ayam, ikan, kacang-kacangan",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Apel, wortel, brokoli",
      "Ayam, ikan, kacang-kacangan",
      "Roti, pasta, nasi",
      "Kentang, ubi, jagung",
    ],
  },
  {
    numb: 63,
    question: "Apa fungsi mata dalam tubuh manusia?",
    answer: "Mengolah dan mengirimkan informasi visual ke otak.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Mengatur keseimbangan tubuh.",
      "Mengolah dan mengirimkan informasi visual ke otak.",
      "Mencerna makanan yang masuk ke dalam tubuh.",
      "Memompa darah ke seluruh tubuh.",
    ],
  },
  {
    numb: 64,
    question: "Sebutkan 5 jenis hewan yang hidup di darat!",
    answer: "Kucing, anjing, gajah, singa, harimau",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Ikan, paus, lumba-lumba, gurita, ubur-ubur",
      "Kucing, anjing, gajah, singa, harimau",
      "Burung, kelelawar, lebah, kupu-kupu, capung",
      "Kuda laut, bintang laut, kepiting, kerang, teripang",
    ],
  },
  {
    numb: 65,
    question: "Apa yang dimaksud dengan fotosintesis?",
    answer:
      "Proses di mana tumbuhan mengubah cahaya matahari menjadi energi kimia.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Proses di mana tumbuhan mengambil oksigen dari udara.",
      "Proses di mana tumbuhan menghasilkan energi melalui respirasi.",
      "Proses di mana tumbuhan mengubah cahaya matahari menjadi energi kimia.",
      "Proses di mana tumbuhan memproduksi bunga dan buah.",
    ],
  },
  {
    numb: 66,
    question: "Bagaimana cara kita merawat gigi agar tetap sehat?",
    answer: "Menggosok gigi dua kali sehari dan menghindari makanan manis.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Mengonsumsi banyak permen dan makanan manis.",
      "Menggosok gigi dua kali sehari dan menghindari makanan manis.",
      "Hanya mengunjungi dokter gigi saat gigi sakit.",
      "Tidak perlu menggosok gigi secara teratur.",
    ],
  },
  {
    numb: 67,
    question: "Apa yang dimaksud dengan polusi udara?",
    answer: "Udara yang terkontaminasi oleh zat-zat berbahaya bagi kesehatan.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Udara yang bersih dan sehat untuk dihirup.",
      "Udara yang terkontaminasi oleh zat-zat berbahaya bagi kesehatan.",
      "Proses alami di mana udara bergerak dari satu tempat ke tempat lain.",
      "Udara yang dihasilkan dari proses fotosintesis tumbuhan.",
    ],
  },
  {
    numb: 68,
    question: "Sebutkan 3 contoh benda yang dapat mengapung di air!",
    answer: "Kayu, bola plastik, gabus",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Batu, besi, karet",
      "Kayu, bola plastik, gabus",
      "Kaca, keramik, logam",
      "Pasir, kerikil, bata",
    ],
  },
  {
    numb: 69,
    question:
      "Bagaimana cara kita menjaga kebersihan lingkungan di sekitar kita?",
    answer: "Menanam pohon dan tidak membuang sampah ke sungai.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Membuang sampah sembarangan.",
      "Menanam pohon dan tidak membuang sampah ke sungai.",
      "Menggunakan plastik sekali pakai sebanyak mungkin.",
      "Membakar sampah di halaman rumah.",
    ],
  },
  {
    numb: 70,
    question: "Apa yang dimaksud dengan daur hidup serangga?",
    answer: "Proses pertumbuhan serangga dari telur hingga dewasa.",
    difficulty: "easy",
    category: "IPA",
    options: [
      "Proses pertumbuhan serangga dari telur hingga dewasa.",
      "Pergerakan serangga dari satu tempat ke tempat lain.",
      "Cara serangga mencari makanan di alam liar.",
      "Proses serangga berkomunikasi satu sama lain.",
    ],
  },

  //IPA (Medium)
  {
    numb: 71,
    question: "Apa yang dimaksud dengan fotosintesis?",
    answer: "Proses di mana tumbuhan mengubah cahaya matahari menjadi energi.",
    difficulty: "medium",
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
    difficulty: "medium",
    category: "IPA",
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
    difficulty: "medium",
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
    difficulty: "medium",
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
    difficulty: "medium",
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
    difficulty: "medium",
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
    difficulty: "medium",
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
    difficulty: "medium",
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
    difficulty: "medium",
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
    difficulty: "medium",
    category: "IPA",
    options: [
      "Perubahan yang menghasilkan zat baru dengan sifat yang berbeda.",
      "Perubahan yang hanya mengubah bentuk zat.",
      "Perubahan yang tidak mengubah sifat zat.",
      "Perubahan warna suatu zat.",
    ],
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
