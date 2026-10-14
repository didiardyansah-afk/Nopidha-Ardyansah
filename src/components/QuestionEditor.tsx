import React, { useState } from 'react';
import { QuestionItem, QuestionType, CognitiveLevel, LearningExperience } from '../types';
import { QUESTION_TYPE_LABELS, VISUAL_STIMULI, balanceAndDiversifyAnswerKeys } from '../data/kurikulumMerdekaIps';

interface QuestionEditorProps {
  questions: QuestionItem[];
  onUpdateQuestions: (updated: QuestionItem[]) => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  questions,
  onUpdateQuestions,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const handleUpdateItem = (id: string, partial: Partial<QuestionItem>) => {
    const next = questions.map((q) => (q.id === id ? { ...q, ...partial } : q));
    onUpdateQuestions(next);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Yakin ingin menghapus butir soal ini?')) {
      const filtered = questions.filter((q) => q.id !== id);
      // Re-number questions
      const renumbered = filtered.map((q, idx) => ({ ...q, number: idx + 1 }));
      onUpdateQuestions(renumbered);
      if (editingId === id) setEditingId(null);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= questions.length) return;

    const copy = [...questions];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    // Re-number
    const renumbered = copy.map((q, idx) => ({ ...q, number: idx + 1 }));
    onUpdateQuestions(renumbered);
  };

  const handleShuffle = () => {
    if (confirm('Acak urutan nomor butir soal?')) {
      const copy = [...questions].sort(() => Math.random() - 0.5);
      const renumbered = copy.map((q, idx) => ({ ...q, number: idx + 1 }));
      onUpdateQuestions(renumbered);
    }
  };

  const handleDiversifyKeys = () => {
    const diversified = balanceAndDiversifyAnswerKeys(questions);
    onUpdateQuestions(diversified);
  };

  const handleAddNewQuestion = () => {
    const newNumber = questions.length + 1;
    const newItem: QuestionItem = {
      id: `q-custom-${Date.now()}`,
      number: newNumber,
      type: 'pilihan_ganda',
      cognitiveLevel: 'MOTS',
      learningExperience: 'Mengaplikasi',
      indicator: 'Menganalisis fenomena IPS terkait materi pembelajaran Kurikulum Merdeka.',
      questionText: 'Tuliskan rumusan pertanyaan butir soal di sini...',
      options: [
        'A. Pilihan jawaban A',
        'B. Pilihan jawaban B',
        'C. Pilihan jawaban C',
        'D. Pilihan jawaban D',
      ],
      answerKey: 'A',
      explanation: 'Tuliskan penjelasan dan pembahasan materi di sini...',
      rubric: 'Skor 1 untuk jawaban benar, skor 0 untuk salah.',
      maxScore: 2,
      sourceBook: 'Buku Siswa IPS SMP Kurikulum Merdeka Kemendikbudristek',
    };

    onUpdateQuestions([...questions, newItem]);
    setEditingId(newItem.id);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchSearch =
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.indicator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.number.toString() === searchQuery;
    const matchType = filterType === 'all' || q.type === filterType;
    const matchLevel = filterLevel === 'all' || q.cognitiveLevel === filterLevel;
    return matchSearch && matchType && matchLevel;
  });

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
      {/* Top Bar Dashboard */}
      <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">
            Dashboard Admin & Editor Soal
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
            Manajemen Naskah Butir Soal Asesmen IPS SMP
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Total {questions.length} butir soal · Dapat diedit langsung, ditambah, dihapus, atau diatur urutannya.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShuffle}
            className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Acak urutan seluruh butir soal"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Acak Nomor Soal</span>
          </button>

          <button
            type="button"
            onClick={handleDiversifyKeys}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-slate-800 hover:bg-slate-700 border border-emerald-700/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Pastikan kunci jawaban pilihan ganda tidak homogen (A, B, C, D tersebar seimbang)"
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Ratakan Kunci (A-B-C-D)</span>
          </button>

          <button
            type="button"
            onClick={handleAddNewQuestion}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Tambah Butir Soal Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 flex-1 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari teks soal atau indikator..."
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg flex-1 min-w-[180px] focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">Semua Bentuk Soal</option>
            <option value="pilihan_ganda">Pilihan Ganda</option>
            <option value="pilihan_ganda_kompleks">Pilihan Ganda Kompleks</option>
            <option value="isian_singkat">Isian Singkat</option>
            <option value="uraian">Uraian</option>
            <option value="menjodohkan">Menjodohkan</option>
            <option value="benar_salah">Benar-Salah</option>
          </select>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">Semua Level Kognitif</option>
            <option value="LOTS">LOTS</option>
            <option value="MOTS">MOTS</option>
            <option value="HOTS">HOTS</option>
          </select>
        </div>

        <div className="text-slate-500 font-medium">
          Menampilkan {filteredQuestions.length} dari {questions.length} butir
        </div>
      </div>

      {/* Questions List */}
      <div className="p-4 sm:p-6 space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Tidak ada butir soal yang sesuai filter.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isEditing = editingId === q.id;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-all ${
                  isEditing
                    ? 'border-indigo-400 bg-indigo-50/20 shadow-md ring-1 ring-indigo-400'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Header Row per item */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      {q.number}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      {QUESTION_TYPE_LABELS[q.type]}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        q.cognitiveLevel === 'HOTS'
                          ? 'bg-rose-100 text-rose-800'
                          : q.cognitiveLevel === 'MOTS'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {q.cognitiveLevel}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {q.learningExperience}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        q.competencyDomain === 'literasi'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : q.competencyDomain === 'numerasi'
                          ? 'bg-teal-100 text-teal-800 border border-teal-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {q.competencyDomain === 'literasi'
                        ? '📖 Literasi'
                        : q.competencyDomain === 'numerasi'
                        ? '📊 Numerasi'
                        : 'Konsep IPS'}
                    </span>
                    {q.stimulus && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 flex items-center gap-1">
                        <span>🖼️ Bergambar</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30"
                      title="Geser ke atas"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={idx === questions.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30"
                      title="Geser ke bawah"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(isEditing ? null : q.id)}
                      className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                        isEditing
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isEditing ? 'Selesai Edit' : 'Edit Soal'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(q.id)}
                      className="p-1 text-rose-400 hover:text-rose-700 transition-colors"
                      title="Hapus butir soal"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Edit Mode vs Read Mode */}
                {isEditing ? (
                  <div className="pt-3 space-y-4 text-xs">
                    {/* Level Kognitif & Pengalaman Belajar */}
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Bentuk Soal
                        </label>
                        <select
                          value={q.type}
                          onChange={(e) =>
                            handleUpdateItem(q.id, { type: e.target.value as QuestionType })
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="pilihan_ganda">Pilihan Ganda</option>
                          <option value="pilihan_ganda_kompleks">Pilihan Ganda Kompleks</option>
                          <option value="isian_singkat">Isian Singkat</option>
                          <option value="uraian">Uraian</option>
                          <option value="menjodohkan">Menjodohkan</option>
                          <option value="benar_salah">Benar - Salah</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Level Kognitif
                        </label>
                        <select
                          value={q.cognitiveLevel}
                          onChange={(e) =>
                            handleUpdateItem(q.id, {
                              cognitiveLevel: e.target.value as CognitiveLevel,
                            })
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="LOTS">LOTS (Rendah)</option>
                          <option value="MOTS">MOTS (Sedang)</option>
                          <option value="HOTS">HOTS (Sulit)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Domain AKM
                        </label>
                        <select
                          value={q.competencyDomain || 'umum'}
                          onChange={(e) =>
                            handleUpdateItem(q.id, {
                              competencyDomain: e.target.value as 'literasi' | 'numerasi' | 'umum',
                            })
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 font-medium"
                        >
                          <option value="literasi">Literasi Membaca</option>
                          <option value="numerasi">Numerasi Data/Grafik</option>
                          <option value="umum">Konseptual IPS</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Pengalaman Belajar
                        </label>
                        <select
                          value={q.learningExperience}
                          onChange={(e) =>
                            handleUpdateItem(q.id, {
                              learningExperience: e.target.value as LearningExperience,
                            })
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                        >
                          <option value="Memahami">Memahami (Dasar)</option>
                          <option value="Mengaplikasi">Mengaplikasi (Konteks)</option>
                          <option value="Merefleksi">Merefleksi (Kritis)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Skor Maksimal
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={q.maxScore}
                          onChange={(e) =>
                            handleUpdateItem(q.id, {
                              maxScore: parseInt(e.target.value, 10) || 1,
                            })
                          }
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Indikator Soal */}
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Indikator Soal
                      </label>
                      <input
                        type="text"
                        value={q.indicator}
                        onChange={(e) => handleUpdateItem(q.id, { indicator: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Teks Pertanyaan */}
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Teks Rumusan Soal
                      </label>
                      <textarea
                        rows={3}
                        value={q.questionText}
                        onChange={(e) =>
                          handleUpdateItem(q.id, { questionText: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 text-xs"
                      />
                    </div>

                    {/* Opsi Pilihan Ganda jika ada */}
                    {q.type === 'pilihan_ganda' && q.options && (
                      <div className="space-y-1.5">
                        <label className="block text-slate-700 font-semibold">
                          Opsi Jawaban (A, B, C, D)
                        </label>
                        {q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-2">
                            <span className="w-5 font-bold text-slate-600">
                              {['A', 'B', 'C', 'D'][optIdx]}
                            </span>
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...q.options!];
                                newOpts[optIdx] = e.target.value;
                                handleUpdateItem(q.id, { options: newOpts });
                              }}
                              className="flex-1 px-2.5 py-1 border border-slate-300 rounded text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Kunci Jawaban & Pembahasan */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Kunci Jawaban Resmi
                        </label>
                        <input
                          type="text"
                          value={q.answerKey}
                          onChange={(e) => handleUpdateItem(q.id, { answerKey: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-bold text-indigo-900"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Pedoman Penskoran (Rubrik)
                        </label>
                        <input
                          type="text"
                          value={q.rubric}
                          onChange={(e) => handleUpdateItem(q.id, { rubric: e.target.value })}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-slate-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Pembahasan & Analisis Materi
                      </label>
                      <textarea
                        rows={2}
                        value={q.explanation}
                        onChange={(e) => handleUpdateItem(q.id, { explanation: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                      />
                    </div>
                  </div>
                ) : (
                  /* Read Preview Mode */
                  <div className="pt-2 space-y-1.5 text-xs text-slate-800">
                    <p className="font-medium text-slate-900 leading-relaxed">
                      {q.questionText}
                    </p>

                    {q.options && q.options.length > 0 && (
                      <div className="space-y-1 pl-2 text-slate-700 text-[11px]">
                        {q.options.map((o, i) => (
                          <div key={i}>{o}</div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-600 border-t border-slate-100">
                      <div>
                        <span className="font-semibold text-slate-700">Kunci:</span>{' '}
                        <span className="font-bold text-indigo-700">{q.answerKey}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Skor:</span> {q.maxScore}
                      </div>
                      <div className="truncate max-w-md">
                        <span className="font-semibold text-slate-700">Indikator:</span> {q.indicator}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
