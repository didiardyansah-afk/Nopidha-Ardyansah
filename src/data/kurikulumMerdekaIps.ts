import { QuestionType, CognitiveLevel, LearningExperience, SchoolProfile, QuestionItem } from '../types';

export const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 50, 75, 100];

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  pilihan_ganda: 'Pilihan Ganda',
  pilihan_ganda_kompleks: 'Pilihan Ganda Kompleks',
  isian_singkat: 'Isian Singkat',
  uraian: 'Uraian / Esai',
  menjodohkan: 'Menjodohkan',
  benar_salah: 'Benar – Salah',
};

export const DEFAULT_SCHOOL_PROFILE: SchoolProfile = {
  schoolName: 'SMP NEGERI 2 GUMELAR',
  logoUrl: '', // uses SVG default if empty
  schoolAddress: 'Jl. Raya Gumelar No. 12, Kecamatan Gumelar, Kabupaten Banyumas, Jawa Tengah 53165',
  principalName: 'Nopidha Ardyansah, S.Pd., M.Pd.',
  principalNip: '19780512 200501 1 008',
  teacherName: 'Budi Santoso, S.Pd.',
  teacherNip: '19840214 200902 1 003',
  academicYear: '2024/2025',
  semester: 'Ganjil',
  subdistrictCity: 'Banyumas',
  province: 'Jawa Tengah',
};

export const DEVELOPER_INFO = {
  name: 'Nopidha Ardyansah, S.Pd., M.Pd.',
  role: 'Kepala SMP Negeri 2 Gumelar',
  regency: 'Kabupaten Banyumas',
  province: 'Propinsi Jawa Tengah',
  bio: 'Pendidik dan Kepala Sekolah berdedikasi tinggi dalam transformasi pembelajaran Kurikulum Merdeka, perancangan asesmen bermutu, digitalisasi pendidikan, serta penguatan literasi dan numerasi IPS SMP.',
};

export interface TopicPreset {
  grade: '7' | '8' | '9';
  theme: string;
  topic: string;
  learningGoal: string;
  element: string; // Elemen CP IPS: Pemahaman Konsep / Keterampilan Proses
}

export const IPS_PRESETS: TopicPreset[] = [
  // KELAS 7
  {
    grade: '7',
    theme: 'Tema 01: Kehidupan Sosial dan Kondisi Lingkungan Sekitar',
    topic: 'Konektivitas Antar Ruang, Letak Astronomis Indonesia, dan Pemahaman Peta',
    learningGoal: 'Peserta didik mampu menganalisis letak geografis dan astronomis Indonesia serta pengaruhnya terhadap potensi alam dan iklim melalui interpretasi peta.',
    element: 'Pemahaman Konsep (Keruangan & Konektivitas Ruang)',
  },
  {
    grade: '7',
    theme: 'Tema 01: Kehidupan Sosial dan Kondisi Lingkungan Sekitar',
    topic: 'Sosialisasi dalam Masyarakat, Norma Sosial, dan Interaksi Antarmanusia',
    learningGoal: 'Peserta didik mampu mengidentifikasi proses sosialisasi, peran agen sosialisasi, serta fungsi nilai dan norma dalam menciptakan keteraturan sosial.',
    element: 'Pemahaman Konsep (Dinamika Sosial)',
  },
  {
    grade: '7',
    theme: 'Tema 02: Keberagaman Lingkungan Sekitar',
    topic: 'Corak Kehidupan Masyarakat Praaksara dan Peninggalan Kebudayaan',
    learningGoal: 'Peserta didik mampu membandingkan corak kehidupan masa berburu, bercocok tanam, dan perundagian serta nilai kearifan peninggalan budayanya.',
    element: 'Pemahaman Konsep (Sejarah Lokal dan Nasional)',
  },
  {
    grade: '7',
    theme: 'Tema 03: Potensi Ekonomi Lingkungan',
    topic: 'Kelangkaan Sumber Daya, Kebutuhan Manusia, dan Peran Pelaku Ekonomi',
    learningGoal: 'Peserta didik mampu menganalisis konsep kelangkaan sebagai inti masalah ekonomi serta merumuskan skala prioritas kebutuhan keluarga.',
    element: 'Pemahaman Konsep (Kegiatan & Pelaku Ekonomi)',
  },
  {
    grade: '7',
    theme: 'Tema 04: Pemberdayaan Masyarakat',
    topic: 'Keragaman Sosial Budaya Indonesia dan Pengelolaan Lembaga Keuangan',
    learningGoal: 'Peserta didik mampu mengevaluasi peran komunitas lokal dan lembaga keuangan dalam memberdayakan ekonomi masyarakat sekitar.',
    element: 'Pemahaman Konsep (Pemberdayaan Masyarakat)',
  },

  // KELAS 8
  {
    grade: '8',
    theme: 'Tema 01: Kondisi Geografis dan Pelestarian Sumber Daya Alam',
    topic: 'Dinamika Letak Geografis, Geologis, dan Pemanfaatan Sumber Daya Kemaritiman',
    learningGoal: 'Peserta didik mampu mengevaluasi posisi strategis Indonesia dalam jalur perdagangan internasional serta upaya konservasi SDA laut dan hutan.',
    element: 'Pemahaman Konsep (Keruangan & Konektivitas Ruang)',
  },
  {
    grade: '8',
    theme: 'Tema 02: Kemajemukan Masyarakat Indonesia',
    topic: 'Keragaman Budaya, Saluran Mobilitas Sosial, dan Integrasi Bangsa',
    learningGoal: 'Peserta didik mampu menganalisis faktor pendorong dan penghambat mobilitas sosial serta peran pluralitas dalam memperkokoh integrasi nasional.',
    element: 'Pemahaman Konsep (Dinamika Sosial & Budaya)',
  },
  {
    grade: '8',
    theme: 'Tema 03: Nasionalisme dan Pengembangan Ekonomi',
    topic: 'Latar Belakang Kolonialisme, Kebangkitan Nasional 1908, dan Perdagangan Antardaerah',
    learningGoal: 'Peserta didik mampu merefleksikan semangat pergerakan nasional dan menganalisis peran perdagangan antarpulau dalam perekonomian nusantara.',
    element: 'Pemahaman Konsep (Sejarah & Ekonomi Kerakyatan)',
  },
  {
    grade: '8',
    theme: 'Tema 04: Pembangunan Perekonomian Indonesia',
    topic: 'Pemerataan Pembangunan, Kepadatan Penduduk, dan Resolusi Konflik Sosial',
    learningGoal: 'Peserta didik mampu merumuskan alternatif solusi pemecahan konflik sosial dan ketimpangan pembangunan antardaerah di Indonesia.',
    element: 'Pemahaman Konsep (Pembangunan & Ketahanan Sosial)',
  },

  // KELAS 9
  {
    grade: '9',
    theme: 'Tema 01: Manusia dan Perubahan',
    topic: 'Dampak Modernisasi, Globalisasi, dan Ketahanan Kearifan Lokal',
    learningGoal: 'Peserta didik mampu mengkritisi perubahan sosial budaya akibat arus globalisasi serta merancang strategi pelestarian kearifan lokal.',
    element: 'Pemahaman Konsep & Refleksi Kritis',
  },
  {
    grade: '9',
    theme: 'Tema 02: Perkembangan Ekonomi Digital',
    topic: 'Transformasi Transaksi Keuangan Digital, E-Commerce, dan Literasi Finansial Remaja',
    learningGoal: 'Peserta didik mampu menganalisis manfaat dan risiko sistem pembayaran non-tunai serta menunjukkan sikap cerdas berliterasi finansial digital.',
    element: 'Pemahaman Konsep (Ekonomi Digital)',
  },
  {
    grade: '9',
    theme: 'Tema 03: Tantangan Pembangunan Indonesia',
    topic: 'Peluang Bonus Demografi, Pengentasan Kemiskinan, dan Tujuan Pembangunan Berkelanjutan (SDGs)',
    learningGoal: 'Peserta didik mampu mengevaluasi kesiapan Indonesia menyambut bonus demografi tahun 2030-2045 dan perwujudan 17 pilar SDGs.',
    element: 'Pemahaman Konsep & Analisis Kritis',
  },
  {
    grade: '9',
    theme: 'Tema 04: Kerja Sama Dunia',
    topic: 'Peran Aktif Indonesia di ASEAN, PBB, Kerja Sama Bilateral & Multilateral',
    learningGoal: 'Peserta didik mampu menganalisis diplomasi politik luar negeri bebas aktif Indonesia dalam menjaga perdamaian dan stabilitas kawasan global.',
    element: 'Pemahaman Konsep (Geopolitik & Kerja Sama Dunia)',
  },
];

export interface ThemeInfo {
  id: string; // 'tema-01', 'tema-02', 'tema-03', 'tema-04'
  grade: '7' | '8' | '9';
  code: string; // 'Tema 01'
  themeTitle: string; // 'Kehidupan Sosial dan Kondisi Lingkungan Sekitar'
  fullTheme: string; // 'Tema 01: Kehidupan Sosial dan Kondisi Lingkungan Sekitar'
  discipline: string; // 'Geografi & Sosiologi'
  subtopics: string; // 'Konektivitas Antar Ruang, Letak Astronomis Indonesia, Pemahaman Peta, Sosialisasi, Nilai & Norma'
  learningGoal: string; // Rumusan TP kurikulum merdeka
  element: string;
}

export const GRADE_THEMES: Record<'7' | '8' | '9', ThemeInfo[]> = {
  '7': [
    {
      id: 'tema-01',
      grade: '7',
      code: 'Tema 01',
      themeTitle: 'Kehidupan Sosial dan Kondisi Lingkungan Sekitar',
      fullTheme: 'Tema 01: Kehidupan Sosial dan Kondisi Lingkungan Sekitar',
      discipline: 'Geografi & Sosiologi Dasar',
      subtopics: 'Konektivitas Antar Ruang, Letak Astronomis & Geografis Indonesia, Pemahaman Peta, Proses Sosialisasi, Nilai dan Norma Sosial',
      learningGoal: 'Peserta didik mampu menganalisis letak geografis dan astronomis Indonesia serta pengaruhnya terhadap iklim dan potensi alam, serta mengidentifikasi pembentukan karakter melalui sosialisasi dan norma sosial.',
      element: 'Pemahaman Konsep (Keruangan & Dinamika Sosial)',
    },
    {
      id: 'tema-02',
      grade: '7',
      code: 'Tema 02',
      themeTitle: 'Keberagaman Lingkungan Sekitar',
      fullTheme: 'Tema 02: Keberagaman Lingkungan Sekitar',
      discipline: 'Sejarah & Kebudayaan Nusantara',
      subtopics: 'Corak Kehidupan Masyarakat Praaksara, Kebudayaan Paleolitikum hingga Logam, Nilai Kearifan Megalitikum, serta Pembentukan Nilai Leluhur',
      learningGoal: 'Peserta didik mampu membandingkan corak kehidupan masa berburu, bercocok tanam, dan perundagian serta nilai kearifan peninggalan budayanya bagi kehidupan masa kini.',
      element: 'Pemahaman Konsep (Sejarah Lokal dan Nasional)',
    },
    {
      id: 'tema-03',
      grade: '7',
      code: 'Tema 03',
      themeTitle: 'Potensi Ekonomi Lingkungan',
      fullTheme: 'Tema 03: Potensi Ekonomi Lingkungan',
      discipline: 'Ekonomi Kerakyatan & Lingkungan',
      subtopics: 'Kelangkaan Sumber Daya, Kebutuhan Manusia, Skala Prioritas Anggaran Keluarga, dan Peran Pelaku Ekonomi Masyarakat',
      learningGoal: 'Peserta didik mampu menganalisis konsep kelangkaan sebagai inti persoalan ekonomi serta merumuskan skala prioritas kebutuhan dan etika konsumsi bertanggung jawab.',
      element: 'Pemahaman Konsep (Kegiatan & Pelaku Ekonomi)',
    },
    {
      id: 'tema-04',
      grade: '7',
      code: 'Tema 04',
      themeTitle: 'Pemberdayaan Masyarakat',
      fullTheme: 'Tema 04: Pemberdayaan Masyarakat',
      discipline: 'Sosiologi & Pemberdayaan Ekonomi',
      subtopics: 'Keragaman Sosial Budaya Nusantara, Lembaga Keuangan Bank & Non-Bank, serta Peran Komunitas Lokal dalam Meningkatkan Kesejahteraan',
      learningGoal: 'Peserta didik mampu mengevaluasi peran komunitas lokal dan lembaga keuangan dalam memberdayakan ekonomi masyarakat sekitar serta menjaga harmoni kemajemukan.',
      element: 'Pemahaman Konsep (Pemberdayaan Masyarakat)',
    },
  ],
  '8': [
    {
      id: 'tema-01',
      grade: '8',
      code: 'Tema 01',
      themeTitle: 'Kondisi Geografis dan Pelestarian Sumber Daya Alam',
      fullTheme: 'Tema 01: Kondisi Geografis dan Pelestarian Sumber Daya Alam',
      discipline: 'Geografi Maritim & Konservasi',
      subtopics: 'Posisi Silang Maritim ALKI, Iklim Tropis Muson, Potensi Sumber Daya Kemaritiman, Hutan Lindung, dan Konservasi Energi',
      learningGoal: 'Peserta didik mampu mengevaluasi posisi strategis Indonesia dalam jalur perdagangan internasional maritim serta merancang upaya konservasi sumber daya alam secara berkelanjutan.',
      element: 'Pemahaman Konsep (Keruangan & Konektivitas Maritim)',
    },
    {
      id: 'tema-02',
      grade: '8',
      code: 'Tema 02',
      themeTitle: 'Kemajemukan Masyarakat Indonesia',
      fullTheme: 'Tema 02: Kemajemukan Masyarakat Indonesia',
      discipline: 'Sosiologi & Integrasi Bangsa',
      subtopics: 'Keragaman Budaya Nusantara, Saluran dan Bentuk Mobilitas Sosial, Faktor Pluralitas, dan Penguatan Integrasi Nasional',
      learningGoal: 'Peserta didik mampu menganalisis faktor pendorong dan penghambat mobilitas sosial serta peran pluralitas masyarakat dalam memperkokoh integrasi dan kohesi sosial.',
      element: 'Pemahaman Konsep (Dinamika Sosial & Budaya)',
    },
    {
      id: 'tema-03',
      grade: '8',
      code: 'Tema 03',
      themeTitle: 'Nasionalisme dan Pengembangan Ekonomi',
      fullTheme: 'Tema 03: Nasionalisme dan Pengembangan Ekonomi',
      discipline: 'Sejarah Pergerakan & Ekonomi',
      subtopics: 'Latar Belakang Kolonialisme & Monopoli VOC, Tonggak Kebangkitan Nasional 1908, serta Potensi Perdagangan Antardaerah/Antarpulau',
      learningGoal: 'Peserta didik mampu merefleksikan semangat pergerakan nasional dan menganalisis peran perdagangan antarpulau dalam mempererat persatuan ekonomi nusantara.',
      element: 'Pemahaman Konsep (Sejarah & Ekonomi Antarpulau)',
    },
    {
      id: 'tema-04',
      grade: '8',
      code: 'Tema 04',
      themeTitle: 'Pembangunan Perekonomian Indonesia',
      fullTheme: 'Tema 04: Pembangunan Perekonomian Indonesia',
      discipline: 'Ekonomi Pembangunan & Kependudukan',
      subtopics: 'Pemerataan Pembangunan Wilayah, Kepadatan & Kualitas Penduduk, Ketimpangan Antardaerah, dan Mediasi Resolusi Konflik Sosial',
      learningGoal: 'Peserta didik mampu merumuskan alternatif solusi pemecahan konflik sosial dan ketimpangan pembangunan antardaerah demi ketahanan nasional.',
      element: 'Pemahaman Konsep (Pembangunan & Ketahanan Sosial)',
    },
  ],
  '9': [
    {
      id: 'tema-01',
      grade: '9',
      code: 'Tema 01',
      themeTitle: 'Manusia dan Perubahan',
      fullTheme: 'Tema 01: Manusia dan Perubahan',
      discipline: 'Sosiologi Perubahan & Kebudayaan',
      subtopics: 'Dampak Modernisasi & Westernisasi, Arus Globalisasi Budaya, Ketahanan Kearifan Lokal, dan Sikap Adaptif Generasi Muda',
      learningGoal: 'Peserta didik mampu mengkritisi dinamika perubahan sosial budaya akibat arus globalisasi serta merancang strategi pelestarian kearifan lokal di tengah modernisasi.',
      element: 'Pemahaman Konsep & Refleksi Kritis',
    },
    {
      id: 'tema-02',
      grade: '9',
      code: 'Tema 02',
      themeTitle: 'Perkembangan Ekonomi Digital',
      fullTheme: 'Tema 02: Perkembangan Ekonomi Digital',
      discipline: 'Ekonomi Digital & Literasi Finansial',
      subtopics: 'Sistem Pembayaran Digital QRIS, E-Commerce, Financial Technology (Fintech), Keamanan Siber Finansial, dan Perilaku Belanja Cerdas Remaja',
      learningGoal: 'Peserta didik mampu menganalisis manfaat dan risiko sistem transaksi keuangan non-tunai serta menunjukkan sikap cerdas berliterasi finansial digital.',
      element: 'Pemahaman Konsep (Ekonomi Digital)',
    },
    {
      id: 'tema-03',
      grade: '9',
      code: 'Tema 03',
      themeTitle: 'Tantangan Pembangunan Indonesia',
      fullTheme: 'Tema 03: Tantangan Pembangunan Indonesia',
      discipline: 'Demografi & SDGs Berkelanjutan',
      subtopics: 'Peluang dan Tantangan Bonus Demografi 2030-2045, Pengentasan Kemiskinan Ekstrem, dan 17 Pilar Tujuan Pembangunan Berkelanjutan (SDGs)',
      learningGoal: 'Peserta didik mampu mengevaluasi kesiapan generasi muda menyambut jendela bonus demografi dan berkontribusi pada pencapaian 17 pilar SDGs.',
      element: 'Pemahaman Konsep & Analisis Kritis',
    },
    {
      id: 'tema-04',
      grade: '9',
      code: 'Tema 04',
      themeTitle: 'Kerja Sama Dunia',
      fullTheme: 'Tema 04: Kerja Sama Dunia',
      discipline: 'Geopolitik & Perdagangan Internasional',
      subtopics: 'Diplomasi Politik Luar Negeri Bebas-Aktif, Peran Indonesia di ASEAN & PBB, Pasar Bebas Global, dan Kerja Sama Bilateral-Multilateral',
      learningGoal: 'Peserta didik mampu menganalisis diplomasi politik luar negeri bebas aktif Indonesia dalam menjaga stabilitas geopolitik dan kerja sama ekonomi dunia.',
      element: 'Pemahaman Konsep (Geopolitik & Kerja Sama Dunia)',
    },
  ],
};

export function getGradeThemes(grade: '7' | '8' | '9'): ThemeInfo[] {
  return GRADE_THEMES[grade] || GRADE_THEMES['7'];
}

export function combineGradeThemes(
  grade: '7' | '8' | '9',
  selectedThemeIds: string[]
): { topic: string; learningGoal: string } {
  const allThemes = getGradeThemes(grade);
  const activeThemes = allThemes.filter((t) => selectedThemeIds.includes(t.id));

  if (activeThemes.length === 0) {
    return {
      topic: `Materi Pokok IPS SMP Kelas ${grade} Kurikulum Merdeka`,
      learningGoal: `Peserta didik mampu menganalisis materi dan konsep esensial IPS SMP Kelas ${grade}.`,
    };
  }

  if (activeThemes.length === allThemes.length) {
    // All themes selected (Ujian Komprehensif Seluruh Materi)
    const combinedTopics = activeThemes
      .map((t) => `${t.code}: ${t.themeTitle} (${t.subtopics})`)
      .join(' · ');

    const combinedGoals = `Peserta didik mampu menguasai kompetensi esensial IPS SMP Kelas ${grade} Kurikulum Merdeka yang mencakup: ` +
      activeThemes.map((t, idx) => `(${idx + 1}) ${t.learningGoal}`).join(' ');

    return {
      topic: combinedTopics,
      learningGoal: combinedGoals,
    };
  }

  // Subset of themes selected
  const combinedTopics = activeThemes
    .map((t) => `${t.code}: ${t.themeTitle}`)
    .join(' · ');

  const combinedGoals = activeThemes
    .map((t, idx) => `(${idx + 1}) ${t.learningGoal}`)
    .join(' ');

  return {
    topic: combinedTopics,
    learningGoal: combinedGoals,
  };
}

// Rich visual SVG illustrations for "Soal Bergambar"
export const VISUAL_STIMULI = {
  petaIndonesia: {
    type: 'image' as const,
    title: 'Stimulus Peta: Jalur ALKI dan Posisi Silang Indonesia',
    caption: 'Gambar 1: Peta Alur Laut Kepulauan Indonesia (ALKI) dan Jalur Maritim Dunia',
    svgIcon: 'map-indonesia',
    text: 'Indonesia terletak di antara dua benua (Asia dan Australia) dan dua samudera (Hindia dan Pasifik). Tiga Alur Laut Kepulauan Indonesia (ALKI I, II, dan III) dilewati ribuan kapal niaga internasional setiap tahunnya.',
  },
  kurvaPasar: {
    type: 'image' as const,
    title: 'Stimulus Grafik: Keseimbangan Pasar Beras Pasca Musim Panen',
    caption: 'Gambar 2: Grafik Pergeseran Kurva Permintaan dan Penawaran Komoditas Pokok',
    svgIcon: 'market-curve',
    text: 'Grafik menunjukkan saat panen raya tiba di sentra pertanian padi, jumlah penawaran beras meningkat tajam dari S0 ke S1, menyebabkan harga keseimbangan mengalami penyesuaian di tingkat konsumen.',
  },
  piramidaPenduduk: {
    type: 'image' as const,
    title: 'Stimulus Infografis: Komposisi Usia Penduduk dan Bonus Demografi',
    caption: 'Gambar 3: Piramida Penduduk Ekspansif Indonesia Berdasarkan Sensus Penduduk',
    svgIcon: 'population-pyramid',
    text: 'Piramida penduduk menunjukkan kelompok usia produktif (15-64 tahun) mencapai lebih dari 68% dari total populasi. Fenomena ini menjadi jendela peluang bonus demografi hingga dasawarsa mendatang.',
  },
  candiBorobudur: {
    type: 'image' as const,
    title: 'Stimulus Gambar Artefak: Peninggalan Masa Hindu-Buddha',
    caption: 'Gambar 4: Relief Perahu Bercadik pada Dinding Candi Borobudur Abad VIII',
    svgIcon: 'ship-relief',
    text: 'Relief candi memperlihatkan teknologi kemaritiman nenek moyang bangsa Indonesia yang tangguh, membuktikan adanya pelayaran lintas samudera sejak masa Dinasti Syailendra.',
  },
  ekonomiDigital: {
    type: 'image' as const,
    title: 'Stimulus Bagan: Alur Transaksi Dompet Digital & QRIS',
    caption: 'Gambar 5: Diagram Interkoneksi Transaksi Pembayaran Cepat QRIS Antara Konsumen dan UMKM',
    svgIcon: 'digital-payment',
    text: 'Standarisasi pembayaran dengan QRIS mempercepat penyelesaian transaksi keuangan dari rekening konsumen langsung masuk ke dompet pedagang tanpa perantara uang tunai fisik.',
  },
  lingkunganSampah: {
    type: 'image' as const,
    title: 'Stimulus Diagram: Sumber Emisi Karbon dan Jejak Ekologis Rumah Tangga',
    caption: 'Gambar 6: Diagram Lingkaran Distribusi Limbah Rumah Tangga Perkotaan',
    svgIcon: 'eco-chart',
    text: 'Sebanyak 54% timbulan sampah perkotaan didominasi sisa organik makanan, disusul limbah plastik anorganik sebesar 22%. Perilaku konsumtif memicu degradasi daya dukung lingkungan.',
  },
};

// Rich Question Template Bank for fallback & instant generation
export const QUESTION_BANK: Omit<QuestionItem, 'id' | 'number'>[] = [
  // PILIHAN GANDA (LOTS) - Memahami
  {
    type: 'pilihan_ganda',
    cognitiveLevel: 'LOTS',
    learningExperience: 'Memahami',
    indicator: 'Mengidentifikasi batas wilayah dan letak astronomis kepulauan Indonesia secara tepat.',
    questionText: 'Berdasarkan letak astronomisnya, wilayah Indonesia terletak pada koordinat 6°LU – 11°LS dan 95°BT – 141°BT. Salah satu dampak langsung dari posisi garis lintang tersebut bagi Indonesia adalah ...',
    options: [
      'A. Memiliki tiga pembagian daerah waktu yaitu WIB, WITA, dan WIT',
      'B. Beriklim tropis dengan curah hujan dan penyinaran matahari tinggi sepanjang tahun',
      'C. Rawan mengalami gempa bumi tektonik karena dilewati jalur cincin api pasifik',
      'D. Menjadi jalur pelayaran transit perdagangan internasional terpadat di Asia',
    ],
    answerKey: 'B',
    explanation: 'Garis lintang (6°LU – 11°LS) berada di zona tropis khatulistiwa, menyebabkan Indonesia menerima penyinaran matahari sepanjang tahun dan beriklim tropis. Sementara garis bujur mempengaruhi pembagian zona waktu.',
    rubric: 'Skor 1 untuk jawaban benar (B), Skor 0 untuk jawaban salah.',
    maxScore: 2,
    sourceBook: 'Buku Siswa IPS SMP Kelas VII/VIII Kurikulum Merdeka Kemendikbudristek',
  },

  // PILIHAN GANDA (MOTS) - Mengaplikasi (BERGAMBAR)
  {
    type: 'pilihan_ganda',
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    indicator: 'Menganalisis keuntungan posisi silang strategis Indonesia dalam bidang ekonomi kemaritiman berdasarkan peta jalur pelayaran.',
    stimulus: VISUAL_STIMULI.petaIndonesia,
    questionText: 'Perhatikan stimulus Peta ALKI di atas. Selat Malaka dan Selat Sunda merupakan jalur pelayaran strategis penghubung Samudra Hindia dan Laut Natuna Utara. Upaya nyata yang paling tepat dilakukan pemerintah daerah pesisir Indonesia untuk mengoptimalkan potensi strategis tersebut adalah ...',
    options: [
      'A. Menutup akses perairan bagi kapal asing guna melindungi kelestarian biota laut terumbu karang',
      'B. Membangun infrastruktur pelabuhan modern terpadu, pusat logistik bongkar muat, dan industri galangan kapal',
      'C. Membatasi perdagangan hasil laut antardaerah agar harga komoditas lokal tetap stabil',
      'D. Mengalihkan jalur transportasi kapal internasional ke jalur darat demi keamanan teritorial',
    ],
    answerKey: 'B',
    explanation: 'Posisi silang ALKI dapat menghasilkan nilai tambah ekonomi tinggi (multiplier effect) jika didukung pelabuhan singgah berstandar internasional, depo logistik, dan industri perbaikan kapal laut.',
    rubric: 'Skor 1 untuk pilihan jawaban B, Skor 0 untuk pilihan lainnya.',
    maxScore: 2,
    sourceBook: 'Buku Siswa IPS SMP Kelas VIII Tema 01 Kemendikbudristek',
  },

  // PILIHAN GANDA (HOTS) - Merefleksi
  {
    type: 'pilihan_ganda',
    cognitiveLevel: 'HOTS',
    learningExperience: 'Merefleksi',
    indicator: 'Mengevaluasi dampak ketimpangan sosial akibat percepatan ekonomi digital serta merumuskan sikap solutif.',
    questionText: 'Pesatnya ekspansi belanja daring (e-commerce) memudahkan masyarakat perkotaan memperoleh barang murah. Namun di sisi lain, pedagang tradisional di pasar lokal pedesaan mengalami penurunan omzet drastis karena keterbatasan literasi digital. Sikap kritis dan solusi pemberdayaan yang paling bijak untuk mengatasi dilema tersebut adalah ...',
    options: [
      'A. Memboikot seluruh aplikasi niaga elektronik demi melindungi eksistensi pedagang pasar tradisional',
      'B. Menyerahkan sepenuhnya kepada mekanisme pasar bebas tanpa campur tangan kebijakan pemerintah daerah',
      'C. Memberikan pendampingan digitalisasi produk lokal, pelatihan foto produk, dan pemanfaatan promosi media sosial bagi paguyuban pedagang pasar tradisional',
      'D. Melarang generasi muda berbelanja secara daring agar perputaran uang hanya terjadi di toko kelontong sekitar',
    ],
    answerKey: 'C',
    explanation: 'Era digital harus disikapi secara adaptif dan inklusif. Solusi terbaik adalah pemberdayaan (empowerment) melalui literasi digital dan pendampingan UMKM tradisional agar mampu bersaing di ekosistem omni-channel (Opsi C).',
    rubric: 'Skor 1 untuk pilihan C (jawaban analitis solutif).',
    maxScore: 2,
    sourceBook: 'Buku Siswa IPS SMP Kelas IX Tema 02 Kemendikbudristek',
  },

  // PILIHAN GANDA KOMPLEKS (MOTS) - Mengaplikasi
  {
    type: 'pilihan_ganda_kompleks',
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    indicator: 'Mengidentifikasi tindakan rasional konsumen dalam mengelola anggaran keuangan keluarga berdasarkan skala prioritas.',
    questionText: 'Keluarga Pak Ardi memiliki penghasilan bulanan terbatas. Menjelang tahun ajaran baru, terdapat beberapa pos pengeluaran yang harus dibayarkan. Manakah pernyataan berikut yang mencerminkan penerapan prinsip ekonomi dan skala prioritas yang tepat? (Pilihlah DUA atau TIGA pernyataan yang benar)',
    complexOptions: [
      { text: '1. Membayar biaya pendaftaran dan seragam sekolah anak terlebih dahulu sebelum kebutuhan hiburan keluarga', isCorrect: true },
      { text: '2. Mengajukan pinjaman konsumtif berbunga tinggi untuk membeli gadget keluaran terbaru demi gengsi sosial', isCorrect: false },
      { text: '3. Menyisihkan 10% pendapatan untuk dana darurat dan tabungan sebelum membelanjakan sisa uang', isCorrect: true },
      { text: '4. Mengutamakan pemenuhan kebutuhan pokok pangan bergizi seimbang dibanding barang tersier', isCorrect: true },
    ],
    answerKey: 'Pernyataan 1, 3, dan 4 Benar (Pernyataan 2 Salah)',
    explanation: 'Prinsip ekonomi konsumen mengedepankan pemenuhan kebutuhan primer (pangan, pendidikan anak) dan tabungan masa depan, serta menghindari utang konsumtif untuk barang tersier yang tidak produktif.',
    rubric: 'Skor 3 jika memilih seluruh opsi benar (1, 3, 4); Skor 2 jika benar 2 opsi; Skor 1 jika benar 1 opsi; Skor 0 jika salah semua.',
    maxScore: 3,
    sourceBook: 'Buku Siswa IPS SMP Kelas VII Tema 03 Kemendikbudristek',
  },

  // PILIHAN GANDA KOMPLEKS (HOTS) - Merefleksi (BERGAMBAR)
  {
    type: 'pilihan_ganda_kompleks',
    cognitiveLevel: 'HOTS',
    learningExperience: 'Merefleksi',
    indicator: 'Menganalisis peluang dan tantangan bonus demografi 2030-2045 bagi kemajuan pembangunan nasional.',
    stimulus: VISUAL_STIMULI.piramidaPenduduk,
    questionText: 'Cermati Gambar Piramida Penduduk di atas. Kondisi di mana persentase penduduk usia produktif (15-64 tahun) lebih banyak dibanding usia non-produktif disebut Bonus Demografi. Berilah tanda centang pada pernyataan yang TEPAT mengenai prasyarat keberhasilan memanfaatkan bonus demografi tersebut!',
    complexOptions: [
      { text: 'A. Peningkatan mutu pendidikan vokasi dan keterampilan kerja berbasis teknologi kecerdasan buatan', isCorrect: true },
      { text: 'B. Penurunan angka stunting balita agar tercipta generasi muda yang sehat fisik dan cerdas kognitif', isCorrect: true },
      { text: 'C. Mengurangi pembukaan lapangan kerja baru demi menjaga efisiensi anggaran negara', isCorrect: false },
      { text: 'D. Penyediaan iklim investasi yang sehat untuk menyerap jutaan tenaga kerja produktif dalam negeri', isCorrect: true },
    ],
    answerKey: 'Pernyataan A, B, dan D Benar',
    explanation: 'Bonus demografi hanya akan menjadi berkah jika penduduk usia kerja memiliki pendidikan berkualitas, gizi sehat (bebas stunting), dan tersedianya lapangan kerja produktif. Jika tidak, akan menjadi beban demografi.',
    rubric: 'Skor 3 jika menjawab 3 pilihan benar (A, B, D); Skor 2 jika menjawab 2 benar; Skor 0 jika salah.',
    maxScore: 3,
    sourceBook: 'Buku Siswa IPS SMP Kelas IX Tema 03 Kemendikbudristek',
  },

  // MENJODOHKAN (LOTS & MOTS) - Memahami
  {
    type: 'menjodohkan',
    cognitiveLevel: 'LOTS',
    learningExperience: 'Memahami',
    indicator: 'Menjodohkan istilah mobilitas sosial dengan contoh kasus yang terjadi dalam kehidupan masyarakat.',
    questionText: 'Pasangkanlah bentuk mobilitas sosial pada Kolom Kiri dengan contoh peristiwa yang sesuai pada Kolom Kanan secara tepat!',
    matchingPairs: [
      { left: '1. Mobilitas Sosial Vertikal Naik (Social Climbing)', right: 'A. Seorang guru honorer berprestasi diangkat menjadi Kepala Sekolah' },
      { left: '2. Mobilitas Sosial Vertikal Turun (Social Sinking)', right: 'B. Seorang manajer perusahaan dipecat karena melanggar kode etik dan menjadi pengangguran' },
      { left: '3. Mobilitas Sosial Horizontal', right: 'C. Dokter berpindah tugas dari Puskesmas Gumelar ke Puskesmas Ajibarang dengan jabatan tetap sama' },
      { left: '4. Mobilitas Sosial Antargenerasi', right: 'D. Anak dari seorang buruh tani berhasil menyelesaikan kuliah kedokteran dan membuka klinik kesehatan' },
    ],
    answerKey: '1 - A | 2 - B | 3 - C | 4 - D',
    explanation: 'Social climbing = peningkatan status sosial; Social sinking = penurunan derajat sosial; Horizontal = perpindahan tanpa perubahan kedudukan derajat; Antargenerasi = perubahan derajat status yang melibatkan dua generasi atau lebih.',
    rubric: 'Setiap pasangan benar mendapat skor 1. Maksimal skor 4.',
    maxScore: 4,
    sourceBook: 'Buku Siswa IPS SMP Kelas VIII Tema 02 Kemendikbudristek',
  },

  // MENJODOHKAN (MOTS) - Mengaplikasi (BERGAMBAR)
  {
    type: 'menjodohkan',
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    indicator: 'Menjodohkan jenis interaksi dan peninggalan sejarah kemaritiman nusantara dengan makna kulturalnya.',
    stimulus: VISUAL_STIMULI.candiBorobudur,
    questionText: 'Berdasarkan pengamatan relief perahu bercadik pada dinding Candi Borobudur dan catatan sejarah maritim Nusantara, jodohkanlah peninggalan/fakta sejarah pada Kolom Kiri dengan makna fungsi yang relevan pada Kolom Kanan!',
    matchingPairs: [
      { left: '1. Relief Perahu Bercadik Borobudur', right: 'A. Bukti ketangguhan teknologi navigasi maritim nenek moyang melintasi Samudra Hindia hingga Madagaskar' },
      { left: '2. Prasasti Nalanda di India', right: 'B. Catatan kerja sama pendidikan dan keagamaan Raja Balaputradewa dari Sriwijaya dengan Kerajaan Pala' },
      { left: '3. Pelabuhan Banten dan Sunda Kelapa', right: 'C. Pusat emporium niaga komoditas lada dan rempah-rempah nusantara yang disinggahi saudagar mancanegara' },
      { left: '4. Kitab Negarakertagama', right: 'D. Sumber sejarah yang memuat konsep persatuan wilayah kepulauan Nusantara di bawah Kerajaan Majapahit' },
    ],
    answerKey: '1 - A | 2 - B | 3 - C | 4 - D',
    explanation: 'Peninggalan sejarah maritim membuktikan interaksi antarbangsa telah berlangsung intensif dengan nilai toleransi, diplomasi, dan perdagangan terbuka.',
    rubric: 'Skor 1 per item pasangan benar. Total skor 4.',
    maxScore: 4,
    sourceBook: 'Buku Siswa IPS SMP Kelas VII & VIII Kemendikbudristek',
  },

  // BENAR - SALAH (LOTS) - Memahami
  {
    type: 'benar_salah',
    cognitiveLevel: 'LOTS',
    learningExperience: 'Memahami',
    indicator: 'Menilai kebenaran pernyataan mengenai interaksi manusia dengan lingkungan alam dan sosial.',
    questionText: 'Tentukan apakah pernyataan-pernyataan di bawah ini BENAR (B) atau SALAH (S) terkait interaksi manusia dengan lingkungan menurut kajian IPS Kurikulum Merdeka!',
    trueFalseStatements: [
      { statement: '1. Sosialisasi primer berlangsung di lingkungan keluarga sejak anak masih berusia balita.', isTrue: true },
      { statement: '2. Interaksi disosiatif seperti akomodasi dan asimilasi selalu mengarah pada perpecahan sosial dalam masyarakat.', isTrue: false },
      { statement: '3. Garis Wallace dan Garis Weber memisahkan persebaran fauna Indonesia menjadi tipe Asiatis, Peralihan, dan Australis.', isTrue: true },
      { statement: '4. Barter adalah sistem perdagangan modern yang menggunakan uang elektronik berbasis kartu chip.', isTrue: false },
    ],
    answerKey: '1: Benar | 2: Salah | 3: Benar | 4: Salah',
    explanation: 'Pernyataan 2 salah karena akomodasi dan asimilasi adalah bentuk interaksi asosiatif (mempersatukan). Pernyataan 4 salah karena barter adalah tukar-menukar barang secara tradisional sebelum ditemukannya uang.',
    rubric: 'Tiap butir benar bernilai 1 poin. Skor maksimal 4.',
    maxScore: 4,
    sourceBook: 'Buku Siswa IPS SMP Kelas VII Kemendikbudristek',
  },

  // BENAR - SALAH (HOTS) - Merefleksi (BERGAMBAR)
  {
    type: 'benar_salah',
    cognitiveLevel: 'HOTS',
    learningExperience: 'Merefleksi',
    indicator: 'Mengevaluasi fenomena degradasi lingkungan dan peran kearifan lokal dalam mitigasi bencana ekologis.',
    stimulus: VISUAL_STIMULI.lingkunganSampah,
    questionText: 'Cermati diagram jejak ekologis dan timbulan limbah sampah perkotaan di atas. Tentukan status Benar atau Salah untuk setiap kesimpulan analisis berikut ini!',
    trueFalseStatements: [
      { statement: '1. Pengelolaan sampah organik melalui pembuatan pupuk kompos dan budidaya maggot dapat mereduksi lebih dari 50% beban tempat pembuangan akhir (TPA).', isTrue: true },
      { statement: '2. Perubahan perilaku masyarakat dari kantong plastik sekali pakai menuju wadah pakai-ulang (reusable bag) merupakan wujud aksi nyata gaya hidup berkelanjutan.', isTrue: true },
      { statement: '3. Pembakaran sampah plastik di pekarangan rumah secara terbuka merupakan solusi terbaik yang aman bagi kesehatan paru-paru warga sekitar.', isTrue: false },
      { statement: '4. Penerapan prinsip 3R (Reduce, Reuse, Recycle) di lingkungan sekolah dapat menumbuhkan dimensi Profil Pelajar Pancasila Bergotong Royong dan Beriman Bertakwa.', isTrue: true },
    ],
    answerKey: '1: Benar | 2: Benar | 3: Salah | 4: Benar',
    explanation: 'Pembakaran plastik terbuka melepas zat karsinogenik dioksin yang sangat berbahaya. Pengurangan timbulan sampah di hulu jauh lebih efektif daripada pembakaran terbuka.',
    rubric: 'Skor 1 per pernyataan benar. Total skor 4.',
    maxScore: 4,
    sourceBook: 'Buku Siswa IPS SMP Tema Pembangunan Berkelanjutan Kemendikbudristek',
  },

  // ISIAN SINGKAT (LOTS) - Memahami
  {
    type: 'isian_singkat',
    cognitiveLevel: 'LOTS',
    learningExperience: 'Memahami',
    indicator: 'Menyebutkan istilah lembaga keuangan dan instrumen ekonomi secara tepat.',
    questionText: 'Lembaga negara independen yang bertugas mengatur, mengawasi, memeriksa, dan menyidik industri jasa keuangan di Indonesia (perbankan, pasar modal, dan asuransi) adalah singkatan dari lembaga ...',
    answerKey: 'OJK (Otoritas Jasa Keuangan)',
    explanation: 'OJK (Otoritas Jasa Keuangan) dibentuk berdasarkan UU No. 21 Tahun 2011 untuk mengawasi seluruh kegiatan di sektor jasa keuangan nasional secara terintegrasi.',
    rubric: 'Jawaban "OJK" atau "Otoritas Jasa Keuangan" mendapat skor penuh 2. Jawaban salah bernilai 0.',
    maxScore: 2,
    sourceBook: 'Buku Siswa IPS SMP Kelas VII & IX Kemendikbudristek',
  },

  // ISIAN SINGKAT (MOTS) - Mengaplikasi (BERGAMBAR)
  {
    type: 'isian_singkat',
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    indicator: 'Menganalisis hukum permintaan dan penawaran berdasarkan stimulus grafik ekonomi.',
    stimulus: VISUAL_STIMULI.kurvaPasar,
    questionText: 'Perhatikan grafik keseimbangan pasar di atas. Ketika jumlah barang yang ditawarkan oleh penjual melimpah ruah di pasar sementara jumlah pembeli tetap, maka kecenderungan yang akan terjadi pada harga barang tersebut adalah mengalami ...',
    answerKey: 'Penurunan (Turun / Menjadi Lebih Murah)',
    explanation: 'Sesuai hukum penawaran dan permintaan: jika penawaran meningkat melampaui permintaan (excess supply), produsen akan menurunkan harga jual agar barang dagangan dapat terserap konsumen.',
    rubric: 'Menjawab "turun" / "penurunan" / "merosot" mendapat skor 2. Menjawab salah mendapat skor 0.',
    maxScore: 2,
    sourceBook: 'Buku Siswa IPS SMP Kelas VII Tema 03 Kemendikbudristek',
  },

  // ISIAN SINGKAT (HOTS) - Merefleksi
  {
    type: 'isian_singkat',
    cognitiveLevel: 'HOTS',
    learningExperience: 'Merefleksi',
    indicator: 'Merumuskan istilah sistem integrasi sosial yang menghargai keberagaman budaya tanpa menghilangkan ciri khas masing-masing.',
    questionText: 'Sikap keterbukaan masyarakat Indonesia yang mampu menerima dan menghormati berbagai latar belakang suku, agama, dan adat istiadat yang berbeda-beda dalam satu kesatuan bangsa dikenal dengan istilah semboyan ...',
    answerKey: 'Bhinneka Tunggal Ika (atau Pluralisme / Toleransi)',
    explanation: 'Bhinneka Tunggal Ika (Berbeda-beda tetapi tetap satu jua) adalah semboyan pemersatu bangsa Indonesia yang tertuang dalam lambang Garuda Pancasila.',
    rubric: 'Jawaban "Bhinneka Tunggal Ika" atau "Pluralisme" / "Toleransi" bernilai 2. Salah = 0.',
    maxScore: 2,
    sourceBook: 'Buku Siswa IPS SMP Kelas VIII Tema 02 Kemendikbudristek',
  },

  // URAIAN / ESAI (MOTS) - Mengaplikasi
  {
    type: 'uraian',
    cognitiveLevel: 'MOTS',
    learningExperience: 'Mengaplikasi',
    indicator: 'Menguraikan saluran mobilitas sosial dan memberikan contoh nyata implementasinya di masyarakat pedesaan.',
    questionText: 'Pendidikan sering disebut sebagai "Social Elevator" (saluran mobilitas sosial paling efektif) bagi anak-anak dari keluarga kurang mampu. Jelaskan 3 (tiga) alasan mengapa jalur pendidikan formal mampu mengubah status sosial ekonomi seseorang dalam masyarakat, sertakan contoh konkretnya!',
    answerKey: 'Kunci Pokok Jawaban: 1) Memberikan bekal keahlian dan kompetensi kerja; 2) Membuka akses jaringan pertemanan dan kesempatan kerja profesional; 3) Mengubah pola pikir rasional dan daya adaptasi. Contoh: Anak petani yang menjadi sarjana guru atau insinyur.',
    explanation: 'Pendidikan formal membekali peserta didik dengan human capital (modal manusia) yang dihargai tinggi di pasar tenaga kerja, sehingga memutus rantai kemiskinan antargenerasi.',
    rubric: 'Kriteria Penskoran (Skor Maks 5): Memberikan 3 penjelasan logis dan contoh konkret = skor 5. Memberikan 2 penjelasan relevan = skor 3-4. Memberikan 1 penjelasan tanpa contoh = skor 1-2. Tidak menjawab = 0.',
    maxScore: 5,
    sourceBook: 'Buku Siswa IPS SMP Kelas VIII Tema 02 Kemendikbudristek',
  },

  // URAIAN / ESAI (HOTS) - Merefleksi (BERGAMBAR)
  {
    type: 'uraian',
    cognitiveLevel: 'HOTS',
    learningExperience: 'Merefleksi',
    indicator: 'Menganalisis dampak etis dan keamanan digital penggunaan sistem pembayaran nontunai serta merumuskan tips pencegahannya bagi pelajar SMP.',
    stimulus: VISUAL_STIMULI.ekonomiDigital,
    questionText: 'Berdasarkan alur transaksi sistem pembayaran digital QRIS pada gambar di atas, sistem pembayaran nontunai telah mempermudah transaksi jual beli sehari-hari. Akan tetapi, marak terjadi kejahatan siber seperti penipuan link phishing, QRIS palsu yang ditempel di kotak amal, serta perilaku konsumtif (fear of missing out/FOMO) di kalangan remaja. Analisislah mengapa hal tersebut dapat terjadi, dan rumuskanlah 3 (tiga) langkah preventif cerdas yang wajib dilakukan pelajar SMP agar terhindar dari bahaya finansial digital!',
    answerKey: 'Kunci Pokok Jawaban: Analisis: Rendahnya literasi keamanan digital dan dorongan psikologis konsumtif. 3 Langkah Cerdas: 1) Selalu memverifikasi nama merchant penerima QRIS sebelum konfirmasi transfer; 2) Mengamankan PIN/kata sandi dan tidak mengklik sembarang tautan dari orang tak dikenal; 3) Menyusun anggaran belanja mingguan yang disiplin agar tidak impulsif.',
    explanation: 'Literasi finansial digital tidak hanya mencakup cara bertransaksi, melainkan juga proteksi data pribadi (cyber security hygiene) dan kontrol diri rasional.',
    rubric: 'Kriteria Penskoran (Skor Maks 5): Analisis mendalam + 3 langkah pencegahan tepat = skor 5. Analisis cukup + 2 langkah = skor 3-4. Jawaban singkat kurang spesifik = skor 1-2. Tidak ada jawaban = 0.',
    maxScore: 5,
    sourceBook: 'Buku Siswa IPS SMP Kelas IX Tema 02 Kemendikbudristek',
  },
];

// Helper to calculate calibrated scoring norms where total final score is strictly 100
export function calculateScoringNorms(questions: QuestionItem[]): {
  norms: Array<{
    type: QuestionType;
    typeName: string;
    count: number;
    rawScorePerItem: number;
    totalRawScore: number;
    weightPercentage: number;
    contributionTo100: number;
  }>;
  totalRawScore: number;
  totalScore: number;
} {
  const groups: Record<QuestionType, QuestionItem[]> = {
    pilihan_ganda: [],
    pilihan_ganda_kompleks: [],
    isian_singkat: [],
    uraian: [],
    menjodohkan: [],
    benar_salah: [],
  };

  questions.forEach((q) => {
    if (groups[q.type]) {
      groups[q.type].push(q);
    }
  });

  const activeTypes = (Object.keys(groups) as QuestionType[]).filter(
    (t) => groups[t].length > 0
  );

  if (activeTypes.length === 0) {
    return { norms: [], totalRawScore: 0, totalScore: 100 };
  }

  // Raw score weights per question type
  const defaultRawWeights: Record<QuestionType, number> = {
    pilihan_ganda: 1,
    pilihan_ganda_kompleks: 2,
    isian_singkat: 2,
    uraian: 5,
    menjodohkan: 3,
    benar_salah: 2,
  };

  let totalWeightedUnits = 0;
  activeTypes.forEach((t) => {
    const count = groups[t].length;
    const unit = defaultRawWeights[t] * count;
    totalWeightedUnits += unit;
  });

  let allocated = 0;
  const norms = activeTypes.map((t, idx) => {
    const count = groups[t].length;
    const rawScorePerItem = defaultRawWeights[t];
    const totalRawScore = count * rawScorePerItem;

    let contribution = Math.round((totalRawScore / totalWeightedUnits) * 100);
    if (idx === activeTypes.length - 1) {
      contribution = 100 - allocated;
    } else {
      allocated += contribution;
    }

    const weightPercentage = contribution;

    return {
      type: t,
      typeName: QUESTION_TYPE_LABELS[t],
      count,
      rawScorePerItem,
      totalRawScore,
      weightPercentage,
      contributionTo100: contribution,
    };
  });

  const totalRaw = norms.reduce((acc, curr) => acc + curr.totalRawScore, 0);

  return {
    norms,
    totalRawScore: totalRaw,
    totalScore: 100,
  };
}

// Helper to balance and diversify answer keys so questions and answers are NOT homogeneous
export function balanceAndDiversifyAnswerKeys(questions: QuestionItem[]): QuestionItem[] {
  const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  let mcIndex = 0;

  return questions.map((q) => {
    if (q.type !== 'pilihan_ganda' || !q.options || q.options.length !== 4) {
      return q;
    }

    const targetKey = letters[mcIndex % 4];
    mcIndex++;

    const currentKey = (q.answerKey.trim().toUpperCase().charAt(0) || 'A') as 'A' | 'B' | 'C' | 'D';
    if (currentKey === targetKey) {
      return q;
    }

    const rawOptions = q.options.map((opt) => opt.replace(/^[A-D]\.\s*/i, '').trim());
    const currentIndex = letters.indexOf(currentKey);
    const targetIndex = letters.indexOf(targetKey);

    if (currentIndex === -1 || targetIndex === -1) return q;

    // Swap the correct option to the target slot
    const correctText = rawOptions[currentIndex];
    rawOptions[currentIndex] = rawOptions[targetIndex];
    rawOptions[targetIndex] = correctText;

    const newOptions = rawOptions.map((txt, idx) => `${letters[idx]}. ${txt}`);

    return {
      ...q,
      options: newOptions,
      answerKey: targetKey,
      explanation: q.explanation.replace(
        new RegExp(`(Opsi|pilihan|jawaban)\\s+[A-D]`, 'gi'),
        `Opsi ${targetKey}`
      ),
    };
  });
}

// Generates rich IPS SMP questions based on user input with non-homogeneous settings, literacy, and numeracy
export function generateSmartIpsQuestions(params: {
  grade: '7' | '8' | '9';
  topic: string;
  learningGoal: string;
  typeConfigs: Record<QuestionType, { enabled: boolean; count: number }>;
  visualCount: number;
  cognitiveLevels: CognitiveLevel[];
  learningExperiences: LearningExperience[];
  nonHomogeneousMode?: boolean;
  distributeKeysEqually?: boolean;
  literacyCount?: number;
  numeracyCount?: number;
  selectedThemes?: string[];
}): QuestionItem[] {
  const result: QuestionItem[] = [];
  let currentNumber = 1;

  const activeCognitive = params.cognitiveLevels.length > 0 ? params.cognitiveLevels : (['LOTS', 'MOTS', 'HOTS'] as CognitiveLevel[]);
  const activeExp = params.learningExperiences.length > 0 ? params.learningExperiences : (['Memahami', 'Mengaplikasi', 'Merefleksi'] as LearningExperience[]);

  // Resolve active themes to proportionally distribute questions
  const availableThemes = getGradeThemes(params.grade);
  const activeThemes = params.selectedThemes && params.selectedThemes.length > 0
    ? availableThemes.filter((t) => params.selectedThemes?.includes(t.id))
    : availableThemes;

  const availableStimuli = Object.values(VISUAL_STIMULI);
  let visualAssigned = 0;
  const targetVisual = Math.max(0, params.visualCount);

  let literacyAssigned = 0;
  let numeracyAssigned = 0;
  const targetLiteracy = params.literacyCount !== undefined ? Math.max(0, params.literacyCount) : 4;
  const targetNumeracy = params.numeracyCount !== undefined ? Math.max(0, params.numeracyCount) : 4;

  const activeTypes = (Object.keys(params.typeConfigs) as QuestionType[]).filter(
    (t) => params.typeConfigs[t]?.enabled && params.typeConfigs[t]?.count > 0
  );

  activeTypes.forEach((qType) => {
    const targetCount = params.typeConfigs[qType].count;
    const bankMatching = QUESTION_BANK.filter((b) => b.type === qType);

    for (let i = 0; i < targetCount; i++) {
      const cog = activeCognitive[i % activeCognitive.length];
      const exp = activeExp[i % activeExp.length];
      const activeTheme = activeThemes[i % activeThemes.length] || activeThemes[0];

      // Determine competency domain (Literasi vs Numerasi vs Umum)
      let domain: 'literasi' | 'numerasi' | 'umum' = 'umum';
      if (numeracyAssigned < targetNumeracy && (i % 2 === 1 || literacyAssigned >= targetLiteracy)) {
        domain = 'numerasi';
        numeracyAssigned++;
      } else if (literacyAssigned < targetLiteracy) {
        domain = 'literasi';
        literacyAssigned++;
      }

      // Determine if this item should have visual stimulus
      const shouldHaveVisual = visualAssigned < targetVisual && (i % 2 === 0 || i === 0 || visualAssigned < targetVisual);
      let stimulus = undefined;
      if (shouldHaveVisual) {
        stimulus = availableStimuli[visualAssigned % availableStimuli.length];
        visualAssigned++;
      }

      // Check if we have a direct template from bank
      const bankItem = bankMatching[i % (bankMatching.length || 1)];

      if (bankItem && i < bankMatching.length && !stimulus && bankItem.stimulus) {
        stimulus = bankItem.stimulus;
      }

      const qId = `q-${qType}-${currentNumber}-${Date.now()}`;

      if (bankItem && i < bankMatching.length && (!params.selectedThemes || params.selectedThemes.length === 0)) {
        result.push({
          ...bankItem,
          id: qId,
          number: currentNumber,
          cognitiveLevel: cog,
          learningExperience: exp,
          competencyDomain: domain,
          stimulus: stimulus || bankItem.stimulus,
        });
      } else {
        // Construct contextual synthetic question for the chosen topic & Kurikulum Merdeka grade
        const synthetic = createSyntheticIpsQuestion({
          number: currentNumber,
          type: qType,
          cognitiveLevel: cog,
          learningExperience: exp,
          grade: params.grade,
          topic: activeTheme ? `${activeTheme.code}: ${activeTheme.themeTitle}` : (params.topic || `Materi IPS Kelas ${params.grade} Kurikulum Merdeka`),
          learningGoal: activeTheme ? activeTheme.learningGoal : (params.learningGoal || 'Peserta didik mampu menganalisis konsep IPS secara mendalam.'),
          index: i,
          stimulus,
          domain,
          activeTheme,
        });
        result.push(synthetic);
      }

      currentNumber++;
    }
  });

  // Apply automatic non-homogeneous answer key balancing (A, B, C, D distributed evenly)
  if (params.nonHomogeneousMode !== false || params.distributeKeysEqually !== false) {
    return balanceAndDiversifyAnswerKeys(result);
  }

  return result;
}

function createSyntheticIpsQuestion(args: {
  number: number;
  type: QuestionType;
  cognitiveLevel: CognitiveLevel;
  learningExperience: LearningExperience;
  grade: '7' | '8' | '9';
  topic: string;
  learningGoal: string;
  index: number;
  stimulus?: any;
  domain?: 'literasi' | 'numerasi' | 'umum';
  activeTheme?: ThemeInfo;
}): QuestionItem {
  const { number, type, cognitiveLevel, learningExperience, grade, topic, index, stimulus, domain, activeTheme } = args;

  // Diverse subtopic lenses across geography, sociology, economics, history, and anthropology
  const disciplinaryLenses = [
    { domain: activeTheme?.discipline || 'Geografi & Lingkungan', theme: activeTheme?.subtopics || 'Konektivitas Wilayah, Iklim, dan Daya Dukung Alam' },
    { domain: 'Sosiologi & Interaksi', theme: 'Stratifikasi, Norma Sosial, dan Dinamika Komunitas' },
    { domain: 'Ekonomi Kerakyatan', theme: 'Mekanisme Pasar, Kelangkaan, dan Literasi Finansial' },
    { domain: 'Sejarah & Kebangsaan', theme: 'Pergerakan Nasional, Kolonialisme, dan Integrasi Bangsa' },
    { domain: 'Pemberdayaan & Kearifan Lokal', theme: 'Mitigasi Bencana, SDGs, dan Pelestarian Budaya Tradisi' },
  ];
  const lens = disciplinaryLenses[index % disciplinaryLenses.length];

  let indicator = `Menganalisis ${lens.theme.toLowerCase()} pada ${topic} untuk jenjang SMP Kelas ${grade}.`;
  if (domain === 'numerasi') {
    indicator = `[Numerasi IPS] Menelaah dan menginterpretasikan data angka/statistik ${lens.theme.toLowerCase()} pada materi ${topic}.`;
  } else if (domain === 'literasi') {
    indicator = `[Literasi Membaca] Menganalisis wacana tekstual dan dinamika kontekstual ${lens.theme.toLowerCase()} pada materi ${topic}.`;
  } else if (cognitiveLevel === 'LOTS') {
    indicator = `Mengidentifikasi konsep dasar ${lens.domain.toLowerCase()} terkait materi ${topic}.`;
  } else if (cognitiveLevel === 'HOTS') {
    indicator = `Mengevaluasi dan merefleksikan solusi permasalahan ${lens.theme.toLowerCase()} secara kritis dalam konteks nyata.`;
  }

  // Rotate correct answer key across A, B, C, D so keys are never homogeneous
  const keyRotation: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const targetKey = keyRotation[index % 4];

  if (type === 'pilihan_ganda') {
    // 5 Distinct question stems for non-homogeneity
    const questionStems = [
      `Di suatu daerah berkembang pesat aktivitas masyarakat terkait "${topic}". Dalam tinjauan ${lens.domain}, fenomena ketimpangan atau perubahan yang paling mungkin terjadi di lapangan adalah ...`,
      `Perhatikan fenomena ${lens.theme.toLowerCase()} pada topik "${topic}". Apabila terjadi dinamika sosial-ekonomi yang tidak terencana di lingkungan sekitar, tindakan rasional yang mencerminkan pemahaman IPS terpadu adalah ...`,
      `Terkait dengan pokok bahasan "${topic}" (${lens.domain}), salah satu tantangan mendasar yang dihadapi masyarakat dalam menjaga keseimbangan alam dan interaksi sosial adalah ...`,
      `Sebagai generasi muda yang mempelajari IPS Kurikulum Merdeka topik "${topic}", sikap kritis dan berdaya saing yang patut ditunjukkan dalam menghadapi fenomena ${lens.theme.toLowerCase()} adalah ...`,
      `Hubungan timbal balik antara manusia dan ruang hidupnya pada materi "${topic}" membuktikan bahwa pembangunan berkelanjutan dapat terwujud apabila ...`,
    ];
    const qStem = questionStems[index % questionStems.length];

    // Create 4 distinct options with diverse length and depth
    const optionsPool = [
      'Terjalinnya sinergi kolaboratif antara pelestarian potensi lokal dengan peningkatan taraf hidup masyarakat secara berkeadilan',
      'Meningkatnya ketergantungan sepihak pada komoditas luar daerah yang mengakibatkan melemahnya ketahanan ekonomi kerakyatan',
      'Terjadinya pergeseran nilai-nilai kearifan lokal yang digantikan oleh pola konsumerisme instan tanpa pertimbangan jangka panjang',
      'Terbentuknya regulasi partisipatif yang melibatkan warga komunitas dalam pemantauan lingkungan dan pengelolaan sumber daya',
    ];

    // Rearrange so targetKey holds the primary correct assertion
    const targetIdx = keyRotation.indexOf(targetKey);
    const correctStatement = optionsPool[0];
    const arrangedOptions: string[] = [];

    let poolPointer = 1;
    for (let i = 0; i < 4; i++) {
      if (i === targetIdx) {
        arrangedOptions.push(`${keyRotation[i]}. ${correctStatement}`);
      } else {
        arrangedOptions.push(`${keyRotation[i]}. ${optionsPool[poolPointer % optionsPool.length]}`);
        poolPointer++;
      }
    }

    return {
      id: `q-syn-${number}`,
      number,
      type,
      cognitiveLevel,
      learningExperience,
      competencyDomain: domain || 'umum',
      indicator,
      stimulus,
      questionText: qStem,
      options: arrangedOptions,
      answerKey: targetKey,
      explanation: `Dalam kajian ${lens.domain} materi "${topic}", kunci yang paling solutif dan tepat sesuai prinsip Kurikulum Merdeka adalah Opsi ${targetKey}, karena menekankan pada keberlanjutan dan keadilan sosial.`,
      rubric: `Skor 2 untuk pilihan ${targetKey}, Skor 0 untuk pilihan lainnya.`,
      maxScore: 2,
      sourceBook: `Buku Siswa IPS SMP Kelas ${grade} Kurikulum Merdeka Kemendikbudristek`,
    };
  }

  if (type === 'pilihan_ganda_kompleks') {
    // 4 distinct combinations of correct statements for non-homogeneity
    const complexVariants = [
      {
        text1: '1. Memperkuat gotong royong warga dalam mengelola kearifan lingkungan hidup',
        is1: true,
        text2: '2. Memprioritaskan keuntungan pribadi di atas kelestarian daya dukung alam',
        is2: false,
        text3: '3. Mengembangkan literasi kritis dalam menyaring arus disrupsi sosial budaya',
        is3: true,
        text4: '4. Menolak segala bentuk kerja sama lintas wilayah demi menjaga isolasi tradisional',
        is4: false,
        key: 'Pernyataan 1 dan 3 Benar (Pernyataan 2 dan 4 Salah)',
        rule: 'Skor 3 jika menjawab 1 & 3; Skor 1.5 jika menjawab salah satu; 0 jika salah.',
      },
      {
        text1: '1. Mengabaikan dampak limbah produksi demi percepatan kuantitas barang',
        is1: false,
        text2: '2. Menyusun skala prioritas kebutuhan keluarga berdasarkan prinsip efisiensi ekonomi',
        is2: true,
        text3: '3. Memanfaatkan saluran pendidikan formal sebagai sarana mobilitas sosial vertikal naik',
        is3: true,
        text4: '4. Menumbuhkan toleransi aktif dalam merawat keberagaman multikultural bangsa',
        is4: true,
        key: 'Pernyataan 2, 3, dan 4 Benar (Pernyataan 1 Salah)',
        rule: 'Skor 3 jika menjawab 2, 3, dan 4; Skor 2 jika menjawab 2 benar; 0 jika salah.',
      },
      {
        text1: '1. Melindungi hak-hak masyarakat adat dalam tata kelola hutan adat berkelanjutan',
        is1: true,
        text2: '2. Menyerahkan seluruh mekanisme penentuan harga pasar kepada monopoli spekulan',
        is2: false,
        text3: '3. Membangun infrastruktur konektivitas antarpulau guna pemerataan distribusi komoditas',
        is3: true,
        text4: '4. Menolak keterbukaan sistem pembayaran digital demi mempertahankan sistem tunai murni',
        is4: false,
        key: 'Pernyataan 1 dan 3 Benar',
        rule: 'Skor 3 jika memilih 1 dan 3; Skor 1.5 jika memilih 1.',
      },
      {
        text1: '1. Menumbuhkan kesadaran bela negara dan integrasi nasional di kalangan pelajar',
        is1: true,
        text2: '2. Mengoptimalkan peluang bonus demografi dengan peningkatan mutu pendidikan vokasi',
        is2: true,
        text3: '3. Melestarikan warisan peradaban kemaritiman sebagai identitas jati diri bangsa',
        is3: true,
        text4: '4. Membiarkan terjadinya eksploitasi berlebihan pada sumber daya laut tanpa konservasi',
        is4: false,
        key: 'Pernyataan 1, 2, dan 3 Benar',
        rule: 'Skor 3 jika memilih 1, 2, dan 3; Skor 2 jika memilih 2; 0 jika salah.',
      },
    ];

    const chosenVar = complexVariants[index % complexVariants.length];

    return {
      id: `q-syn-${number}`,
      number,
      type,
      cognitiveLevel,
      learningExperience,
      competencyDomain: domain || 'umum',
      indicator,
      stimulus,
      questionText: `Cermati pernyataan-pernyataan berikut mengenai materi "${topic}" dalam domain ${lens.domain}! Pilihlah pernyataan yang TEPAT dan bernilai benar sesuai kaidah Kurikulum Merdeka!`,
      complexOptions: [
        { text: chosenVar.text1, isCorrect: chosenVar.is1 },
        { text: chosenVar.text2, isCorrect: chosenVar.is2 },
        { text: chosenVar.text3, isCorrect: chosenVar.is3 },
        { text: chosenVar.text4, isCorrect: chosenVar.is4 },
      ],
      answerKey: chosenVar.key,
      explanation: `Pemahaman kontekstual ${lens.theme} menghendaki tindakan yang selaras dengan nilai Profil Pelajar Pancasila dan kelestarian ekonomi kerakyatan.`,
      rubric: chosenVar.rule,
      maxScore: 3,
      sourceBook: `Buku Panduan Guru IPS SMP Kelas ${grade} Kemendikbudristek`,
    };
  }

  if (type === 'isian_singkat') {
    const terms = [
      {
        q: `Pada pembelajaran "${topic}", proses penyesuaian sosial di mana seseorang atau kelompok menerima unsur budaya baru tanpa menghilangkan kebudayaan aslinya disebut proses ...`,
        key: 'Akulturasi (atau Akomodasi Budaya)',
        exp: 'Akulturasi adalah percampuran dua kebudayaan atau lebih yang melebur tanpa melenyapkan kepribadian masing-masing.',
      },
      {
        q: `Dalam aktivitas ekonomi "${topic}", kondisi ketidakseimbangan saat kebutuhan manusia tidak terbatas sedangkan alat pemuas kebutuhan bersifat langka dinamakan ...`,
        key: 'Kelangkaan (Scarcity)',
        exp: 'Kelangkaan merupakan inti permasalahan pokok ekonomi yang menuntut penetapan skala prioritas.',
      },
      {
        q: `Garis khayal yang membatasi persebaran fauna tipe Asiatis dengan fauna tipe Peralihan di wilayah kepulauan Indonesia dikenal sebagai Garis ...`,
        key: 'Garis Wallace',
        exp: 'Garis Wallace memisahkan biogeografi fauna Indonesia bagian barat dengan bagian tengah.',
      },
      {
        q: `Peristiwa bersejarah pada 28 Oktober 1928 yang menjadi tonggak ikrar persatuan tanah air, bangsa, dan bahasa Indonesia adalah peristiwa ...`,
        key: 'Sumpah Pemuda',
        exp: 'Sumpah Pemuda mengukuhkan ikrar kesatuan kebangsaan melintasi sekat kedaerahan primordial.',
      },
      {
        q: `Instrumen standarisasi kode pembayaran digital berbasis barcode dua dimensi yang diluncurkan Bank Indonesia untuk mempermudah transaksi UMKM adalah ...`,
        key: 'QRIS (Quick Response Code Indonesian Standard)',
        exp: 'QRIS mengintegrasikan seluruh aplikasi pembayaran digital perbankan dan dompet digital di Indonesia.',
      },
    ];

    const chosenTerm = terms[index % terms.length];

    return {
      id: `q-syn-${number}`,
      number,
      type,
      cognitiveLevel,
      learningExperience,
      competencyDomain: domain || 'umum',
      indicator,
      stimulus,
      questionText: chosenTerm.q,
      answerKey: chosenTerm.key,
      explanation: chosenTerm.exp,
      rubric: 'Jawaban tepat bernilai 2 poin. Jawaban salah atau kosong bernilai 0.',
      maxScore: 2,
      sourceBook: `Buku Siswa IPS SMP Kelas ${grade} Kemendikbudristek`,
    };
  }

  if (type === 'menjodohkan') {
    const matchingVariants = [
      {
        pairs: [
          { left: '1. Diferensiasi Sosial', right: 'A. Pembedaan masyarakat secara horizontal berdasarkan suku atau agama' },
          { left: '2. Stratifikasi Sosial', right: 'B. Pelapisan sosial masyarakat secara vertikal berdasarkan kedudukan/ekonomi' },
          { left: '3. Integrasi Sosial', right: 'C. Proses penyesuaian unsur berbeda membentuk kesatuan bangsa yang padu' },
          { left: '4. Asimilasi Budaya', right: 'D. Peleburan kebudayaan yang melahirkan kebudayaan baru yang khas' },
        ],
        key: '1 - A | 2 - B | 3 - C | 4 - D',
      },
      {
        pairs: [
          { left: '1. Rumah Tangga Konsumen (RTK)', right: 'A. Penyedia faktor produksi dan pengguna barang/jasa' },
          { left: '2. Rumah Tangga Produsen (RTP)', right: 'B. Pengguna faktor produksi dan penghasil barang/jasa' },
          { left: '3. Rumah Tangga Pemerintah', right: 'C. Regulator pembuat kebijakan dan penarik pajak' },
          { left: '4. Masyarakat Luar Negeri', right: 'D. Pelaku kegiatan ekspor dan impor antarbangsa' },
        ],
        key: '1 - A | 2 - B | 3 - C | 4 - D',
      },
      {
        pairs: [
          { left: '1. Letak Astronomis Indonesia', right: 'A. Mempengaruhi iklim tropis dan tiga pembagian zona waktu' },
          { left: '2. Letak Geografis Silang', right: 'B. Menjadi poros jalur maritim perdagangan dua samudera dan dua benua' },
          { left: '3. Letak Geologis Ring of Fire', right: 'C. Menyebabkan tanah subur vulkanik namun rawan bencana gempa' },
          { left: '4. Posisi Wilayah ALKI', right: 'D. Menyediakan koridor perlintasan kapal niaga internasional' },
        ],
        key: '1 - A | 2 - B | 3 - C | 4 - D',
      },
    ];

    const chosenMatch = matchingVariants[index % matchingVariants.length];

    return {
      id: `q-syn-${number}`,
      number,
      type,
      cognitiveLevel,
      learningExperience,
      competencyDomain: domain || 'umum',
      indicator,
      stimulus,
      questionText: `Pasangkanlah konsep/istilah pada Kolom Kiri dengan makna penerapannya pada Kolom Kanan terkait bahasan "${topic}" (${lens.domain})!`,
      matchingPairs: chosenMatch.pairs,
      answerKey: chosenMatch.key,
      explanation: `Pemetaan konsep dasar ${lens.domain} menuntut pemahaman klasifikasi secara presisi.`,
      rubric: 'Skor 1 per pasangan yang dijawab tepat. Skor maksimal 4.',
      maxScore: 4,
      sourceBook: `Buku Siswa IPS SMP Kelas ${grade} Kemendikbudristek`,
    };
  }

  if (type === 'benar_salah') {
    const tfVariants = [
      {
        stmts: [
          { statement: `1. Sumber daya alam biotik seperti hutan dan perikanan dapat pulih kembali jika dimanfaatkan dengan konservasi berkelanjutan.`, isTrue: true },
          { statement: `2. Penurunan harga barang secara terus-menerus selalu menunjukkan tingginya kesejahteraan daya beli seluruh masyarakat.`, isTrue: false },
          { statement: `3. Nilai kearifan lokal seperti tradisi Subak di Bali terbukti ampuh mendistribusikan air irigasi secara adil.`, isTrue: true },
          { statement: `4. Arus modernisasi dan teknologi informasi mengharuskan kita meninggalkan seluruh kebudayaan adat istiadat leluhur.`, isTrue: false },
        ],
        key: '1: Benar | 2: Salah | 3: Benar | 4: Salah',
      },
      {
        stmts: [
          { statement: `1. Konflik sosial antarkelompok dapat diselesaikan secara damai melalui mediasi dan musyawarah mufakat.`, isTrue: true },
          { statement: `2. Transaksi keuangan digital tidak memerlukan literasi keamanan karena sistem perbankan tidak memiliki celah kejahatan siber.`, isTrue: false },
          { statement: `3. Perdagangan antardaerah di Indonesia berfungsi menyeimbangkan surplus komoditas antarpulau.`, isTrue: true },
          { statement: `4. Pembakaran hutan secara terbuka untuk pembukaan ladang merupakan tindakan ramah lingkungan yang dianjurkan pemerintah.`, isTrue: false },
        ],
        key: '1: Benar | 2: Salah | 3: Benar | 4: Salah',
      },
      {
        stmts: [
          { statement: `1. Kebijakan proteksi perdagangan internasional bertujuan melindungi industri dalam negeri dari serbuan produk luar negeri.`, isTrue: true },
          { statement: `2. Mobilitas sosial antargenerasi tidak dapat terjadi apabila orang tua berasal dari golongan ekonomi kurang mampu.`, isTrue: false },
          { statement: `3. Letak geologis Indonesia pada pertemuan tiga lempeng tektonik membentuk deretan gunung api yang menyuburkan tanah pertanian.`, isTrue: true },
          { statement: `4. Kearifan lokal pranata mangsa masyarakat Jawa mengatur pola tanam pertanian berdasarkan peredaran musim alam.`, isTrue: true },
        ],
        key: '1: Benar | 2: Salah | 3: Benar | 4: Benar',
      },
    ];

    const chosenTF = tfVariants[index % tfVariants.length];

    return {
      id: `q-syn-${number}`,
      number,
      type,
      cognitiveLevel,
      learningExperience,
      competencyDomain: domain || 'umum',
      indicator,
      stimulus,
      questionText: `Tentukan apakah pernyataan berikut BENAR (B) atau SALAH (S) dalam kaitannya dengan materi "${topic}" (${lens.domain})!`,
      trueFalseStatements: chosenTF.stmts,
      answerKey: chosenTF.key,
      explanation: `Evaluasi kebenaran pernyataan melatih daya nalar kritis peserta didik terhadap fenomena alam, sosial, dan ekonomi.`,
      rubric: 'Setiap butir benar mendapat 1 poin. Skor total 4.',
      maxScore: 4,
      sourceBook: `Buku Siswa IPS SMP Kelas ${grade} Kemendikbudristek`,
    };
  }

  // Uraian
  const essayPrompts = [
    `Pada pembahasan materi "${topic}" (${lens.domain}), peserta didik dituntut memahami keterkaitan manusia dengan lingkungannya. Analisislah 3 (tiga) faktor pendorong terjadinya perubahan sosial-ekonomi di masyarakat sekitar Anda, serta berikan 2 (dua) contoh konkret dampaknya!`,
    `Terkait fenomena ${lens.theme.toLowerCase()} dalam pokok bahasan "${topic}", rumuskanlah 3 (tiga) langkah solusi preventif dan edukatif yang dapat dilakukan pelajar SMP untuk mencegah degradasi nilai toleransi dan menjaga kelestarian lingkungan!`,
    `Bandingkanlah 2 (dua) bentuk strategi adaptasi masyarakat dalam menghadapi tantangan globalisasi pada topik "${topic}", serta jelaskan mengapa pelestarian kearifan lokal tetap menjadi benteng pertahanan karakter bangsa!`,
  ];
  const chosenEssay = essayPrompts[index % essayPrompts.length];

  return {
    id: `q-syn-${number}`,
    number,
    type,
    cognitiveLevel,
    learningExperience,
    competencyDomain: domain || 'umum',
    indicator,
    stimulus,
    questionText: chosenEssay,
    answerKey: 'Kunci Pokok: Menjelaskan 3 faktor pendorong/solusi/perbandingan secara logis + memberikan 2 contoh konkret terapan kehidupan nyata.',
    explanation: `Soal uraian HOTS menguji sintesis pemahaman lintas disiplin, penalaran kritis, dan kemampuan transfer ilmu pada kehidupan nyata.`,
    rubric: 'Skor 5: Analisis mendalam, lengkap 3 faktor/solusi dan contoh konkret. Skor 3-4: Cukup lengkap. Skor 1-2: Jawaban minim. Skor 0: Kosong.',
    maxScore: 5,
    sourceBook: `Buku Siswa IPS SMP Kelas ${grade} Kemendikbudristek`,
  };
}

