import React, { useState } from 'react';
import { DEVELOPER_INFO } from '../data/kurikulumMerdekaIps';
import { ExamDocument } from '../types';
import { printDocument, downloadPdfDocument, downloadWordDocument } from '../utils/exportUtils';

export type TabType =
  | 'form'
  | 'editor'
  | 'exam_sheet'
  | 'kisi_kisi'
  | 'answer_key'
  | 'kartu_soal'
  | 'scoring_norm';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenSchoolSettings: () => void;
  onOpenDeveloperModal: () => void;
  document: ExamDocument;
  onToast?: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenSchoolSettings,
  onOpenDeveloperModal,
  document: doc,
  onToast,
}) => {
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const getTabLabel = (t: TabType) => {
    switch (t) {
      case 'form':
        return 'Konfigurasi & Generate';
      case 'editor':
        return 'Editor Soal (Admin)';
      case 'exam_sheet':
        return '1. Naskah Soal Siswa';
      case 'kisi_kisi':
        return '2. Kisi-Kisi Soal';
      case 'answer_key':
        return '3. Kunci Jawaban';
      case 'kartu_soal':
        return '4. Kartu Soal';
      case 'scoring_norm':
        return '5. Norma Penilaian (100)';
    }
  };

  const handlePrint = () => {
    if (activeTab === 'form' || activeTab === 'editor') {
      onTabChange('exam_sheet');
      onToast?.('Membuka tampilan naskah soal siswa untuk dicetak...', 'info');
      setTimeout(() => {
        printDocument();
      }, 300);
    } else {
      printDocument();
    }
  };

  const handleDownloadPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      if (activeTab === 'form' || activeTab === 'editor') {
        onTabChange('exam_sheet');
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      const label =
        activeTab === 'form' || activeTab === 'editor'
          ? 'Naskah_Soal_Siswa'
          : getTabLabel(activeTab);

      await downloadPdfDocument(doc, label, (msg) => onToast?.(msg, 'info'));
      onToast?.('Dokumen PDF berhasil disimpan ke folder Downloads Anda!', 'success');
    } catch (err: any) {
      onToast?.('Kendala ekspor PDF: ' + (err?.message || 'Error'), 'error');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadWord = async () => {
    if (isExportingWord) return;
    setIsExportingWord(true);
    try {
      const label =
        activeTab === 'form' || activeTab === 'editor'
          ? 'Naskah_Soal_Siswa'
          : getTabLabel(activeTab);

      await downloadWordDocument(doc, label, (msg) => onToast?.(msg, 'info'));
      onToast?.('Dokumen Word (.doc) berhasil diunduh dengan kertas A4 dan margin rapi!', 'success');
    } catch (err: any) {
      onToast?.('Kendala ekspor Word: ' + (err?.message || 'Error'), 'error');
    } finally {
      setIsExportingWord(false);
    }
  };

  return (
    <header className="app-header bg-slate-900 text-white border-b border-slate-800 shadow-md sticky top-0 z-40">
      {/* Top Bar: Developer credit and school badge */}
      <div className="bg-indigo-950/80 px-4 py-2 border-b border-indigo-900/60 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-indigo-200">Aplikasi Asesmen Kurikulum Merdeka</span>
            <span className="text-indigo-400">·</span>
            <span className="text-white font-medium">
              Pengembang: <strong className="text-indigo-300 font-semibold">{DEVELOPER_INFO.name}</strong>
            </span>
            <span className="hidden sm:inline text-indigo-300/80">
              ({DEVELOPER_INFO.role} {DEVELOPER_INFO.regency} {DEVELOPER_INFO.province})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDeveloperModal}
              className="text-[11px] text-indigo-300 hover:text-white underline cursor-pointer"
            >
              Profil Pengembang
            </button>
            <span className="text-indigo-500">|</span>
            <span className="text-[11px] text-slate-300 font-semibold">
              {doc.schoolProfile.schoolName || 'SMPN 2 Gumelar'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar: Branding & Export Actions */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            IPS
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight">
              Generator Soal IPS SMP Kurikulum Merdeka
            </h1>
            <p className="text-[11px] text-slate-300">
              LOTS · MOTS · HOTS · Literasi & Numerasi · 5 Dokumen Standar Terkalibrasi Skor 100
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="action-buttons flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenSchoolSettings}
            className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Ubah logo, nama sekolah, NIP Kepala Sekolah, guru & alamat"
          >
            <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Kop & Sekolah</span>
          </button>

          <button
            type="button"
            disabled={isExportingWord}
            onClick={handleDownloadWord}
            className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Download file Word (.doc) rapi standar A4 dengan margin 2cm dan visual gambar tersemat"
          >
            {isExportingWord ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Menyiapkan Word...</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Ekspor Word (A4)</span>
              </>
            )}
          </button>

          <button
            type="button"
            disabled={isExportingPdf}
            onClick={handleDownloadPdf}
            className="px-3.5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Simpan PDF otomatis langsung ke folder download komputer Anda"
          >
            {isExportingPdf ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Merender PDF A4...</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Simpan PDF Otomatis</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Cetak langsung ke printer atau Simpan sebagai PDF via browser"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Cetak Dokumen</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-950/60 border-t border-slate-800 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 scrollbar-none text-xs font-medium">
          {(
            [
              'form',
              'editor',
              'exam_sheet',
              'kisi_kisi',
              'answer_key',
              'kartu_soal',
              'scoring_norm',
            ] as TabType[]
          ).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`px-3 py-2 rounded-md whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {getTabLabel(tab)}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
