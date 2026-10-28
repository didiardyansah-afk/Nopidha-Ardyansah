import React, { useState } from 'react';
import {
  ExamConfig,
  QuestionType,
  CognitiveLevel,
  LearningExperience,
  QuestionTypeConfig,
} from '../types';
import {
  QUESTION_COUNT_OPTIONS,
  QUESTION_TYPE_LABELS,
  IPS_PRESETS,
  TopicPreset,
  getGradeThemes,
  combineGradeThemes,
  ThemeInfo,
} from '../data/kurikulumMerdekaIps';

interface AssessmentFormProps {
  config: ExamConfig;
  onChange: (updated: ExamConfig) => void;
  onGenerate: (mode: 'ai' | 'instant') => void;
  isGenerating: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  config,
  onChange,
  onGenerate,
  isGenerating,
}) => {
  const gradeThemes = getGradeThemes(config.grade);
  const selectedThemeIds = config.selectedThemes !== undefined
    ? config.selectedThemes
    : gradeThemes.map((t) => t.id);

  const isAllThemesSelected =
    gradeThemes.length > 0 && selectedThemeIds.length === gradeThemes.length;

  const handleGradeChange = (grade: '7' | '8' | '9') => {
    const newGradeThemes = getGradeThemes(grade);
    const allIds = newGradeThemes.map((t) => t.id);
    const { topic, learningGoal } = combineGradeThemes(grade, allIds);
    onChange({
      ...config,
      grade,
      selectedThemes: allIds,
      topic,
      learningGoal,
    });
  };

  const handleSelectAllThemes = () => {
    const allIds = gradeThemes.map((t) => t.id);
    const { topic, learningGoal } = combineGradeThemes(config.grade, allIds);
    onChange({
      ...config,
      selectedThemes: allIds,
      topic,
      learningGoal,
    });
  };

  const handleClearThemes = () => {
    onChange({
      ...config,
      selectedThemes: [],
    });
  };

  const handleToggleTheme = (themeId: string) => {
    let nextIds: string[];
    if (selectedThemeIds.includes(themeId)) {
      nextIds = selectedThemeIds.filter((id) => id !== themeId);
    } else {
      nextIds = [...selectedThemeIds, themeId];
    }
    const { topic, learningGoal } = combineGradeThemes(config.grade, nextIds);
    onChange({
      ...config,
      selectedThemes: nextIds,
      topic,
      learningGoal,
    });
  };

  const handleToggleQuestionType = (type: QuestionType) => {
    const current = config.questionTypeConfigs[type];
    const updated: QuestionTypeConfig = {
      enabled: !current.enabled,
      count: current.count || 5,
    };

    onChange({
      ...config,
      questionTypeConfigs: {
        ...config.questionTypeConfigs,
        [type]: updated,
      },
    });
  };

  const handleCountChange = (type: QuestionType, countVal: number) => {
    onChange({
      ...config,
      questionTypeConfigs: {
        ...config.questionTypeConfigs,
        [type]: {
          ...config.questionTypeConfigs[type],
          count: countVal,
        },
      },
    });
  };

  const handleToggleCognitive = (level: CognitiveLevel) => {
    const exists = config.cognitiveLevels.includes(level);
    let next: CognitiveLevel[];
    if (exists) {
      if (config.cognitiveLevels.length === 1) return; // Keep at least one
      next = config.cognitiveLevels.filter((l) => l !== level);
    } else {
      next = [...config.cognitiveLevels, level];
    }
    onChange({ ...config, cognitiveLevels: next });
  };

  const handleToggleExperience = (exp: LearningExperience) => {
    const exists = config.learningExperiences.includes(exp);
    let next: LearningExperience[];
    if (exists) {
      if (config.learningExperiences.length === 1) return; // Keep at least one
      next = config.learningExperiences.filter((e) => e !== exp);
    } else {
      next = [...config.learningExperiences, exp];
    }
    onChange({ ...config, learningExperiences: next });
  };

  // Calculate total items
  const totalQuestions = (Object.keys(config.questionTypeConfigs) as QuestionType[])
    .filter((t) => config.questionTypeConfigs[t]?.enabled)
    .reduce((sum, t) => sum + (config.questionTypeConfigs[t]?.count || 0), 0);

  const availablePresets = IPS_PRESETS.filter((p) => p.grade === config.grade);

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
            Formulir Konfigurasi Asesmen
          </div>
          <h2 className="text-lg font-bold text-white mt-0.5">
            Penyusunan Naskah & Kisi-Kisi Soal IPS SMP
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="bg-indigo-600/60 px-2.5 py-1 rounded border border-indigo-400/40 text-white font-medium">
            Jenjang: SMP
          </span>
          <span className="bg-indigo-600/60 px-2.5 py-1 rounded border border-indigo-400/40 text-white font-medium">
            Kurikulum Merdeka (Fase D)
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Row 1: Jenjang, Kelas, Jenis Soal, Judul Asesmen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Jenjang Pendidikan
            </label>
            <div className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 flex items-center justify-between">
              <span>SMP (Sekolah Menengah Pertama)</span>
              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">Terkunci</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Khusus jenjang pendidikan SMP</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Jenis Mata Pelajaran
            </label>
            <div className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800">
              Ilmu Pengetahuan Sosial (IPS)
            </div>
            <p className="text-[11px] text-slate-500 mt-1">IPS Terpadu Kurikulum Merdeka</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Pilihan Kelas (Fase D) <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['7', '8', '9'] as const).map((gr) => (
                <button
                  key={gr}
                  type="button"
                  onClick={() => handleGradeChange(gr)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    config.grade === gr
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Kelas {gr}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Fase D: SMP Kelas 7, 8, dan 9</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Bentuk Asesmen / Ujian
            </label>
            <input
              type="text"
              value={config.examTitle}
              onChange={(e) => onChange({ ...config, examTitle: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              placeholder="Asesmen Sumatif Akhir Semester (ASAS)"
            />
            <p className="text-[11px] text-slate-500 mt-1">Misal: ASAS, STS, Asesmen Formatif</p>
          </div>
        </div>

        {/* Row 2: Rekomendasi Tema Multi-Select & Topik Materi */}
        <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Rekomendasi Tema IPS Kurikulum Merdeka (Kelas {config.grade})</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pilih satu tema, beberapa tema, atau pilih semua tema untuk ujian semester gabungan.
              </p>
            </div>

            {/* Action buttons: Pilih Semua Tema & Reset */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAllThemes}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAllThemesSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50'
                }`}
                title="Pilih seluruh tema materi IPS SMP Kelas ini sekaligus untuk ujian semester komprehensif"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>{isAllThemesSelected ? '✓ Semua Tema Terpilih' : 'Pilih Semua Tema (Gabungan)'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearThemes}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                title="Kosongkan pilihan tema untuk input kustom mandiri"
              >
                Kosongkan
              </button>
            </div>
          </div>

          {/* Interactive Multi-Select Theme Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {gradeThemes.map((t) => {
              const isChecked = selectedThemeIds.includes(t.id);
              return (
                <div
                  key={t.id}
                  onClick={() => handleToggleTheme(t.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isChecked
                      ? 'bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        {t.code}
                      </span>
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] font-bold ${
                          isChecked
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white border-slate-300 text-transparent'
                        }`}
                      >
                        ✓
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-900 leading-tight mb-1">
                      {t.themeTitle}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 mb-1.5">
                      {t.discipline}
                    </div>
                  </div>
                  <div className="text-[10.5px] text-slate-600 line-clamp-2 leading-relaxed">
                    {t.subtopics}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active selection summary badge */}
          <div className="flex items-center justify-between text-xs px-3 py-2 bg-slate-100 rounded-lg text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span>
                <strong>{selectedThemeIds.length} dari {gradeThemes.length} Tema Terpilih</strong>{' '}
                {isAllThemesSelected && '(Cakupan Ujian Sumatif Komprehensif Semester)'}
              </span>
            </div>
            <span className="text-[11px] text-slate-500">
              Pertanyaan & kunci akan tersebar merata ke seluruh tema aktif
            </span>
          </div>

          {/* Topik & Tujuan Pembelajaran Text Areas (Editable) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Topik / Materi yang Diinginkan <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={config.topic}
                onChange={(e) => onChange({ ...config, topic: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                placeholder="Tuliskan topik atau materi pokok IPS yang ingin dibuatkan soal..."
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Tersinkronisasi otomatis dari tema yang dicentang di atas. Anda tetap dapat mengedit atau menambahkan materi khusus sekolah Anda.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tujuan Pembelajaran (TP) <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={config.learningGoal}
                onChange={(e) => onChange({ ...config, learningGoal: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                placeholder="Tuliskan tujuan pembelajaran yang ingin diukur melalui butir-butir soal ini..."
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Rumusan kompetensi yang ditargetkan untuk dicapai peserta didik sesuai Kurikulum Merdeka.
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: Bentuk Soal Multi-Select & Jumlah Soal Dinamis */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Bentuk Soal & Jumlah Soal
              </h3>
              <p className="text-xs text-slate-500">
                Pilih satu atau lebih bentuk soal. Pilihan dropdown jumlah soal (5, 10, 15, 20, 25, 30, 35, 50, 75, 100) akan muncul otomatis pada setiap bentuk soal yang dipilih.
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg">
              Total Butir Soal Terpilih: {totalQuestions} Soal
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(
              [
                'pilihan_ganda',
                'pilihan_ganda_kompleks',
                'isian_singkat',
                'uraian',
                'menjodohkan',
                'benar_salah',
              ] as QuestionType[]
            ).map((type) => {
              const itemConfig = config.questionTypeConfigs[type];
              const isEnabled = itemConfig.enabled;

              return (
                <div
                  key={type}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isEnabled
                      ? 'bg-indigo-50/40 border-indigo-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => handleToggleQuestionType(type)}
                        className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-sm font-semibold ${isEnabled ? 'text-indigo-950' : 'text-slate-700'}`}>
                        {QUESTION_TYPE_LABELS[type]}
                      </span>
                    </label>
                  </div>

                  {/* Dropdown Jumlah Soal (muncul otomatis jika dipilih) */}
                  {isEnabled && (
                    <div className="mt-3 pt-3 border-t border-indigo-200/60 flex items-center justify-between gap-2 animate-fadeIn">
                      <label className="text-xs font-medium text-slate-600">
                        Jumlah Soal:
                      </label>
                      <select
                        value={itemConfig.count}
                        onChange={(e) => handleCountChange(type, parseInt(e.target.value, 10))}
                        className="text-xs font-semibold bg-white border border-indigo-300 text-indigo-900 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer"
                      >
                        {QUESTION_COUNT_OPTIONS.map((num) => (
                          <option key={num} value={num}>
                            {num} Soal
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 4: Target Asesmen Literasi, Numerasi, Soal Bergambar & Alokasi Waktu */}
        <div className="p-5 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 border border-slate-200 rounded-xl space-y-4 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-indigo-600 text-white">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Target Asesmen: Literasi Membaca, Numerasi IPS & Stimulus Visual
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Standar Asesmen Kompetensi Minimum (AKM) & Kurikulum Merdeka Fase D (Jumlah soal dapat diisi bebas oleh guru)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded border border-blue-200">
                Literasi: {config.literacyCount || 0}
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                Numerasi: {config.numeracyCount || 0}
              </span>
              <span className="bg-indigo-100 text-indigo-800 font-semibold px-2 py-0.5 rounded border border-indigo-200">
                Bergambar: {config.visualQuestionsCount || 0}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Setting 1: Jumlah Soal Literasi */}
            <div className="bg-white p-3.5 rounded-lg border border-blue-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-blue-950 uppercase tracking-wide">
                  Jumlah Soal Literasi
                </label>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.5 rounded">
                  Membaca
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={Math.max(10, totalQuestions)}
                  value={config.literacyCount ?? 6}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      literacyCount: Math.max(0, parseInt(e.target.value, 10) || 0),
                    })
                  }
                  className="w-20 px-3 py-1.5 text-sm bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center font-bold text-blue-900"
                />
                <div className="flex items-center gap-1">
                  {[2, 4, 6, 8].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => onChange({ ...config, literacyCount: n })}
                      className="text-[10px] font-semibold px-1.5 py-1 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-900 rounded border border-slate-200 cursor-pointer"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">
                Soal dengan stimulus wacana tekstual, narasi historis, artikel berita, telaah dinamika sosial & budaya.
              </p>
            </div>

            {/* Setting 2: Jumlah Soal Numerasi */}
            <div className="bg-white p-3.5 rounded-lg border border-emerald-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  Jumlah Soal Numerasi
                </label>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.5 rounded">
                  Data/Grafik
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={Math.max(10, totalQuestions)}
                  value={config.numeracyCount ?? 6}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      numeracyCount: Math.max(0, parseInt(e.target.value, 10) || 0),
                    })
                  }
                  className="w-20 px-3 py-1.5 text-sm bg-white border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-center font-bold text-emerald-900"
                />
                <div className="flex items-center gap-1">
                  {[2, 4, 6, 8].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => onChange({ ...config, numeracyCount: n })}
                      className="text-[10px] font-semibold px-1.5 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 rounded border border-slate-200 cursor-pointer"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">
                Soal dengan stimulus data tabel statistik, kurva harga pasar, piramida penduduk, kalkulasi skala & rasio.
              </p>
            </div>

            {/* Setting 3: Soal Bergambar (Stimulus Visual) */}
            <div className="bg-white p-3.5 rounded-lg border border-indigo-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                  Soal Bergambar
                </label>
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-1.5 py-0.5 rounded">
                  Visual
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max={Math.max(10, totalQuestions)}
                  value={config.visualQuestionsCount ?? 4}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      visualQuestionsCount: Math.max(0, parseInt(e.target.value, 10) || 0),
                    })
                  }
                  className="w-20 px-3 py-1.5 text-sm bg-white border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-center font-bold text-indigo-900"
                />
                <div className="flex items-center gap-1">
                  {[2, 4, 6].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => onChange({ ...config, visualQuestionsCount: n })}
                      className="text-[10px] font-semibold px-1.5 py-1 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-900 rounded border border-slate-200 cursor-pointer"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">
                Dilengkapi gambar peta ALKI, kurva penawaran beras, diagram QRIS, artefak relief candi, infografis.
              </p>
            </div>

            {/* Setting 4: Alokasi Waktu */}
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Alokasi Waktu
                </label>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-1.5 py-0.5 rounded">
                  Durasi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="30"
                  max="180"
                  step="10"
                  value={config.timeAllocation || 90}
                  onChange={(e) =>
                    onChange({
                      ...config,
                      timeAllocation: parseInt(e.target.value, 10) || 90,
                    })
                  }
                  className="w-20 px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-center font-bold text-slate-800"
                />
                <span className="text-xs font-semibold text-slate-600">Menit</span>
              </div>
              <div className="flex items-center gap-1">
                {[60, 90, 120].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onChange({ ...config, timeAllocation: m })}
                    className="text-[10px] font-semibold px-1.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 cursor-pointer"
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 5: Tingkat Kognitif (LOTS, MOTS, HOTS) & Pengalaman Belajar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tingkat Kognitif */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Tingkat Kesukaran Kognitif (Dapat Dipilih Ketiganya)
              </label>
            </div>
            <p className="text-xs text-slate-500">
              Pilih proporsi tingkat berpikir yang ingin disajikan dalam butir soal:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(
                [
                  { key: 'LOTS', label: 'LOTS (Rendah)', desc: 'C1 - C2: Mengingat & Memahami Fakta Dasar' },
                  { key: 'MOTS', label: 'MOTS (Sedang)', desc: 'C3 - C4: Mengaplikasi & Menganalisis Konsep' },
                  { key: 'HOTS', label: 'HOTS (Sulit)', desc: 'C5 - C6: Mengevaluasi & Mengkreasi Solutif' },
                ] as const
              ).map(({ key, label, desc }) => {
                const isSelected = config.cognitiveLevels.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleToggleCognitive(key)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-400 text-blue-950 ring-1 ring-blue-400'
                        : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{label}</span>
                      {isSelected && <span className="text-blue-600 text-xs">✓</span>}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-snug">{desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pengalaman Belajar */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Pengalaman Belajar yang Ditargetkan (Dapat Dipilih Ketiganya)
              </label>
            </div>
            <p className="text-xs text-slate-500">
              Pilih target pengalaman belajar peserta didik dalam menyelesaikan asesmen:
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(
                [
                  {
                    key: 'Memahami',
                    label: 'Memahami',
                    desc: 'Menguji pemahaman dasar konsep, istilah, dan prinsip IPS',
                  },
                  {
                    key: 'Mengaplikasi',
                    label: 'Mengaplikasi',
                    desc: 'Aplikasi konsep dalam konteks nyata geografi, sosial, dan ekonomi',
                  },
                  {
                    key: 'Merefleksi',
                    label: 'Merefleksi',
                    desc: 'Refleksi kritis, problem-solving, evaluasi nilai & dampak',
                  },
                ] as const
              ).map(({ key, label, desc }) => {
                const isSelected = config.learningExperiences.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleToggleExperience(key)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 ring-1 ring-emerald-400'
                        : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{label}</span>
                      {isSelected && <span className="text-emerald-600 text-xs">✓</span>}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-snug">{desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 6: Setting Karakteristik Soal & Jawaban Tidak Homogen */}
        <div className="p-4 bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 border border-indigo-200 rounded-xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-indigo-600 text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Setting Karakteristik Soal & Jawaban Tidak Homogen
                </h4>
                <p className="text-[11px] text-slate-500">
                  Standar kaidah asesmen Kurikulum Merdeka agar setiap butir soal bervariasi dan tidak monoton
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-indigo-300 shadow-xs">
                <input
                  type="checkbox"
                  checked={config.nonHomogeneousMode}
                  onChange={(e) => onChange({ ...config, nonHomogeneousMode: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-indigo-950">
                  Mode Anti-Homogen Aktif
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="text-emerald-600">✓</span>
                <span>Kunci Jawaban Heterogen</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Distribusi kunci jawaban pilihan ganda terbagi acak merata antara A, B, C, dan D tanpa penumpukan opsi yang sama.
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="text-emerald-600">✓</span>
                <span>Konteks Pertanyaan Beragam</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Setiap butir soal mengangkat sudut pandang berbeda: studi kasus nyata, data statistik, dinamika sosial, ekonomi pasar, dan sejarah.
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="text-emerald-600">✓</span>
                <span>Pengecoh (Distraktor) Variatif</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Panjang kalimat dan struktur opsi jawaban tidak seragam, menguji penalaran dan daya berpikir kritis peserta didik.
              </p>
            </div>
          </div>
        </div>

        {/* Generate Action Buttons */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Total Konfigurasi: <span className="font-semibold text-slate-800">{totalQuestions} butir soal</span> | Literasi: <span className="font-semibold text-blue-700">{config.literacyCount || 0}</span> | Numerasi: <span className="font-semibold text-emerald-700">{config.numeracyCount || 0}</span> | Bergambar: <span className="font-semibold text-indigo-700">{config.visualQuestionsCount || 0}</span> | Kelas {config.grade} SMP ({config.timeAllocation || 90}m).
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isGenerating || totalQuestions === 0}
              onClick={() => onGenerate('instant')}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Instan (Bank Standar)</span>
            </button>

            <button
              type="button"
              disabled={isGenerating || totalQuestions === 0}
              onClick={() => onGenerate('ai')}
              className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-md transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Menyusun Soal Kurikulum Merdeka...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Buat & Generate Soal Lengkap Sekarang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
