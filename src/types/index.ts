export type QuestionType =
  | 'pilihan_ganda'
  | 'pilihan_ganda_kompleks'
  | 'isian_singkat'
  | 'uraian'
  | 'menjodohkan'
  | 'benar_salah';

export type CognitiveLevel = 'LOTS' | 'MOTS' | 'HOTS';

export type LearningExperience = 'Memahami' | 'Mengaplikasi' | 'Merefleksi';

export interface SchoolProfile {
  schoolName: string;
  logoUrl: string;
  schoolAddress: string;
  principalName: string;
  principalNip: string;
  teacherName: string;
  teacherNip: string;
  academicYear: string;
  semester: 'Ganjil' | 'Genap';
  subdistrictCity: string;
  province: string;
}

export interface QuestionTypeConfig {
  enabled: boolean;
  count: number; // 5, 10, 15, 20, 25, 30, 35, 50, 75, 100
}

export interface ExamConfig {
  grade: '7' | '8' | '9';
  subject: string; // e.g. "Ilmu Pengetahuan Sosial (IPS)"
  examTitle: string; // e.g. "Asesmen Sumatif Akhir Semester (ASAS)"
  topic: string; // Topik / materi
  learningGoal: string; // Tujuan Pembelajaran
  timeAllocation: number; // Menit
  questionTypeConfigs: Record<QuestionType, QuestionTypeConfig>;
  visualQuestionsCount: number; // Jumlah soal yang memuat stimulus gambar
  literacyCount: number; // Jumlah soal fokus literasi membaca wacana/kasus
  numeracyCount: number; // Jumlah soal fokus numerasi data/tabel/grafik angka
  cognitiveLevels: CognitiveLevel[]; // LOTS, MOTS, HOTS
  learningExperiences: LearningExperience[]; // Memahami, Mengaplikasi, Merefleksi
  nonHomogeneousMode: boolean; // Karakteristik setiap butir soal pertanyaan & jawaban tidak homogen
  distributeKeysEqually: boolean; // Distribusi kunci jawaban A, B, C, D acak dan merata
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface TrueFalseStatement {
  statement: string;
  isTrue: boolean;
}

export interface ComplexMultipleChoiceOption {
  text: string;
  isCorrect: boolean;
}

export interface Stimulus {
  type: 'image' | 'text' | 'table' | 'case';
  title?: string;
  caption?: string;
  imageUrl?: string;
  svgIcon?: string;
  text?: string;
}

export interface QuestionItem {
  id: string;
  number: number;
  type: QuestionType;
  cognitiveLevel: CognitiveLevel;
  learningExperience: LearningExperience;
  competencyDomain?: 'literasi' | 'numerasi' | 'umum'; // Domain Asesmen: Literasi Membaca atau Numerasi IPS
  indicator: string;
  questionText: string;
  stimulus?: Stimulus;
  options?: string[]; // for standard multiple choice: A, B, C, D
  complexOptions?: ComplexMultipleChoiceOption[]; // for complex multiple choice
  matchingPairs?: MatchingPair[]; // for matching questions
  trueFalseStatements?: TrueFalseStatement[]; // for benar-salah questions
  answerKey: string; // concise answer string or explanation
  explanation: string; // Pembahasan lengkap
  rubric: string; // Pedoman penilaian / kriteria penskoran
  maxScore: number; // Skor mentah
  sourceBook?: string; // Buku siswa/panduan Kemdikbud
}

export interface ScoringNorm {
  type: QuestionType;
  typeName: string;
  count: number;
  pointsPerItem: number;
  totalTypeScore: number;
  weightPercentage: number;
}

export interface ExamDocument {
  schoolProfile: SchoolProfile;
  examConfig: ExamConfig;
  questions: QuestionItem[];
  createdAt: string;
}
