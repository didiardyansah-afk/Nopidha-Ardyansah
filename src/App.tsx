import React, { useState, useEffect } from 'react';
import {
  SchoolProfile,
  ExamConfig,
  QuestionItem,
  ExamDocument,
} from './types';
import {
  DEFAULT_SCHOOL_PROFILE,
  IPS_PRESETS,
  generateSmartIpsQuestions,
  combineGradeThemes,
  DEVELOPER_INFO,
} from './data/kurikulumMerdekaIps';
import { Header, TabType } from './components/Header';
import { AssessmentForm } from './components/AssessmentForm';
import { QuestionEditor } from './components/QuestionEditor';
import { ExamSheetView } from './components/ExamSheetView';
import { KisiKisiView } from './components/KisiKisiView';
import { AnswerKeyView } from './components/AnswerKeyView';
import { KartuSoalView } from './components/KartuSoalView';
import { ScoringNormView } from './components/ScoringNormView';
import { SchoolSettingsModal } from './components/SchoolSettingsModal';
import { DeveloperModal } from './components/DeveloperModal';

export default function App() {
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(() => {
    const saved = localStorage.getItem('ips_school_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_SCHOOL_PROFILE;
  });

  const [examConfig, setExamConfig] = useState<ExamConfig>(() => {
    const initialThemes = ['tema-01', 'tema-02', 'tema-03', 'tema-04'];
    const { topic, learningGoal } = combineGradeThemes('7', initialThemes);
    return {
      grade: '7',
      subject: 'Ilmu Pengetahuan Sosial (IPS)',
      examTitle: 'Asesmen Sumatif Akhir Semester (ASAS)',
      topic,
      learningGoal,
      selectedThemes: initialThemes,
      timeAllocation: 90,
      questionTypeConfigs: {
        pilihan_ganda: { enabled: true, count: 10 },
        pilihan_ganda_kompleks: { enabled: true, count: 5 },
        isian_singkat: { enabled: true, count: 5 },
        uraian: { enabled: true, count: 5 },
        menjodohkan: { enabled: true, count: 5 },
        benar_salah: { enabled: true, count: 5 },
      },
      visualQuestionsCount: 4,
      literacyCount: 6,
      numeracyCount: 6,
      cognitiveLevels: ['LOTS', 'MOTS', 'HOTS'],
      learningExperiences: ['Memahami', 'Mengaplikasi', 'Merefleksi'],
      nonHomogeneousMode: true,
      distributeKeysEqually: true,
    };
  });

  const [questions, setQuestions] = useState<QuestionItem[]>(() => {
    // Generate initial authentic set so user immediately sees rich, functional documents
    return generateSmartIpsQuestions({
      grade: '7',
      topic: IPS_PRESETS[0].topic,
      learningGoal: IPS_PRESETS[0].learningGoal,
      typeConfigs: {
        pilihan_ganda: { enabled: true, count: 10 },
        pilihan_ganda_kompleks: { enabled: true, count: 5 },
        isian_singkat: { enabled: true, count: 5 },
        uraian: { enabled: true, count: 5 },
        menjodohkan: { enabled: true, count: 5 },
        benar_salah: { enabled: true, count: 5 },
      },
      visualCount: 4,
      literacyCount: 6,
      numeracyCount: 6,
      cognitiveLevels: ['LOTS', 'MOTS', 'HOTS'],
      learningExperiences: ['Memahami', 'Mengaplikasi', 'Merefleksi'],
      nonHomogeneousMode: true,
      distributeKeysEqually: true,
    });
  });

  const [activeTab, setActiveTab] = useState<TabType>('form');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isDevModalOpen, setIsDevModalOpen] = useState(false);

  // Save profile to localStorage when changed
  useEffect(() => {
    localStorage.setItem('ips_school_profile', JSON.stringify(schoolProfile));
  }, [schoolProfile]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleGenerateQuestions = async (mode: 'ai' | 'instant') => {
    setIsGenerating(true);

    if (mode === 'instant') {
      try {
        const generated = generateSmartIpsQuestions({
          grade: examConfig.grade,
          topic: examConfig.topic,
          learningGoal: examConfig.learningGoal,
          selectedThemes: examConfig.selectedThemes,
          typeConfigs: examConfig.questionTypeConfigs,
          visualCount: examConfig.visualQuestionsCount,
          literacyCount: examConfig.literacyCount,
          numeracyCount: examConfig.numeracyCount,
          cognitiveLevels: examConfig.cognitiveLevels,
          learningExperiences: examConfig.learningExperiences,
          nonHomogeneousMode: examConfig.nonHomogeneousMode,
          distributeKeysEqually: examConfig.distributeKeysEqually,
        });

        setQuestions(generated);
        setIsGenerating(false);
        showToast(
          `Berhasil men-generate ${generated.length} butir soal IPS Kelas ${examConfig.grade} (Literasi: ${examConfig.literacyCount}, Numerasi: ${examConfig.numeracyCount}, Non-Homogen Aktif)!`,
          'success'
        );
        setActiveTab('exam_sheet');
      } catch (err: any) {
        setIsGenerating(false);
        showToast('Gagal memproses soal: ' + err.message, 'error');
      }
      return;
    }

    // AI Generation via server.ts endpoint
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: examConfig.grade,
          topic: examConfig.topic,
          learningGoal: examConfig.learningGoal,
          selectedThemes: examConfig.selectedThemes,
          typeConfigs: examConfig.questionTypeConfigs,
          visualCount: examConfig.visualQuestionsCount,
          literacyCount: examConfig.literacyCount,
          numeracyCount: examConfig.numeracyCount,
          cognitiveLevels: examConfig.cognitiveLevels,
          learningExperiences: examConfig.learningExperiences,
          nonHomogeneousMode: examConfig.nonHomogeneousMode,
          distributeKeysEqually: examConfig.distributeKeysEqually,
          schoolProfile,
        }),
      });

      const data = await response.json();

      if (data.success && data.questions && data.questions.length > 0) {
        // Normalize returned questions with IDs
        const formatted: QuestionItem[] = data.questions.map((q: any, idx: number) => ({
          ...q,
          id: `q-ai-${idx + 1}-${Date.now()}`,
          number: idx + 1,
        }));
        setQuestions(formatted);
        showToast(
          `Berhasil men-generate ${formatted.length} butir soal kontekstual (Literasi: ${examConfig.literacyCount}, Numerasi: ${examConfig.numeracyCount}) dengan Gemini AI!`,
          'success'
        );
        setActiveTab('exam_sheet');
      } else {
        // Fallback to high quality offline generator
        const fallbackGenerated = generateSmartIpsQuestions({
          grade: examConfig.grade,
          topic: examConfig.topic,
          learningGoal: examConfig.learningGoal,
          selectedThemes: examConfig.selectedThemes,
          typeConfigs: examConfig.questionTypeConfigs,
          visualCount: examConfig.visualQuestionsCount,
          literacyCount: examConfig.literacyCount,
          numeracyCount: examConfig.numeracyCount,
          cognitiveLevels: examConfig.cognitiveLevels,
          learningExperiences: examConfig.learningExperiences,
          nonHomogeneousMode: examConfig.nonHomogeneousMode,
          distributeKeysEqually: examConfig.distributeKeysEqually,
        });
        setQuestions(fallbackGenerated);
        showToast(
          `Soal berhasil disusun dengan generator cerdas Kurikulum Merdeka (${fallbackGenerated.length} butir soal).`,
          'info'
        );
        setActiveTab('exam_sheet');
      }
    } catch (err) {
      // Local fallback on network error
      const fallbackGenerated = generateSmartIpsQuestions({
        grade: examConfig.grade,
        topic: examConfig.topic,
        learningGoal: examConfig.learningGoal,
        typeConfigs: examConfig.questionTypeConfigs,
        visualCount: examConfig.visualQuestionsCount,
        literacyCount: examConfig.literacyCount,
        numeracyCount: examConfig.numeracyCount,
        cognitiveLevels: examConfig.cognitiveLevels,
        learningExperiences: examConfig.learningExperiences,
        nonHomogeneousMode: examConfig.nonHomogeneousMode,
        distributeKeysEqually: examConfig.distributeKeysEqually,
      });
      setQuestions(fallbackGenerated);
      showToast(
        `Soal berhasil disusun melalui bank asesmen Kurikulum Merdeka (${fallbackGenerated.length} butir).`,
        'info'
      );
      setActiveTab('exam_sheet');
    } finally {
      setIsGenerating(false);
    }
  };

  const currentDocument: ExamDocument = {
    schoolProfile,
    examConfig,
    questions,
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      {/* Official Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSchoolSettings={() => setIsSchoolModalOpen(true)}
        onOpenDeveloperModal={() => setIsDevModalOpen(true)}
        document={currentDocument}
        onToast={showToast}
      />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-4 py-3 rounded-lg shadow-xl text-xs font-semibold text-white flex items-center gap-2 ${
              notification.type === 'error'
                ? 'bg-rose-600'
                : notification.type === 'info'
                ? 'bg-blue-600'
                : 'bg-emerald-600'
            }`}
          >
            <span>
              {notification.type === 'error'
                ? '⚠️'
                : notification.type === 'info'
                ? 'ℹ️'
                : '✅'}
            </span>
            <span>{notification.text}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Printable document wrapper */}
        <div id="printable-document-content">
          {activeTab === 'form' && (
            <AssessmentForm
              config={examConfig}
              onChange={setExamConfig}
              onGenerate={handleGenerateQuestions}
              isGenerating={isGenerating}
            />
          )}

          {activeTab === 'editor' && (
            <QuestionEditor
              questions={questions}
              onUpdateQuestions={setQuestions}
            />
          )}

          {activeTab === 'exam_sheet' && (
            <ExamSheetView document={currentDocument} />
          )}

          {activeTab === 'kisi_kisi' && (
            <KisiKisiView document={currentDocument} />
          )}

          {activeTab === 'answer_key' && (
            <AnswerKeyView document={currentDocument} />
          )}

          {activeTab === 'kartu_soal' && (
            <KartuSoalView document={currentDocument} />
          )}

          {activeTab === 'scoring_norm' && (
            <ScoringNormView document={currentDocument} />
          )}
        </div>
      </main>

      {/* Modals */}
      <SchoolSettingsModal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
        profile={schoolProfile}
        onSave={(updated) => {
          setSchoolProfile(updated);
          showToast('Identitas sekolah dan Kop Surat berhasil diperbarui!', 'success');
        }}
      />

      <DeveloperModal
        isOpen={isDevModalOpen}
        onClose={() => setIsDevModalOpen(false)}
      />

      {/* Footer */}
      <footer className="no-print bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-bold text-slate-200 text-sm">
              Generator Soal IPS SMP Kurikulum Merdeka
            </div>
            <p className="text-slate-400 text-xs mt-1">
              Instrumen Asesmen Pembelajaran Terpadu: Naskah Soal, Kisi-Kisi, Kunci Jawaban, Kartu Soal & Norma Penilaian Skor 100.
            </p>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 text-xs text-slate-300">
            <span className="block font-semibold text-indigo-300">
              Dikembangkan oleh: {DEVELOPER_INFO.name}
            </span>
            <span className="text-[11px] text-slate-400">
              {DEVELOPER_INFO.role} {DEVELOPER_INFO.regency} {DEVELOPER_INFO.province}
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <span>Hak Cipta © 2024–2026 {DEVELOPER_INFO.name}. Seluruh hak cipta dilindungi.</span>
          <span>SMP Negeri 2 Gumelar · Kabupaten Banyumas · Jawa Tengah</span>
        </div>
      </footer>
    </div>
  );
}
