import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ExamDocument, QuestionType, QuestionItem } from '../types';
import { QUESTION_TYPE_LABELS, calculateScoringNorms } from '../data/kurikulumMerdekaIps';

export function printDocument() {
  window.print();
}

/**
 * Creates an embedded default school logo badge as a PNG data URL
 */
function createDefaultLogoPngDataUrl(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background circle
  ctx.fillStyle = '#1e1b4b'; // indigo-950
  ctx.beginPath();
  ctx.arc(80, 80, 75, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#e0e7ff';
  ctx.stroke();

  // Outer ring
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(80, 80, 68, 0, Math.PI * 2);
  ctx.stroke();

  // Emblem center
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(80, 30);
  ctx.lineTo(125, 115);
  ctx.lineTo(35, 115);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.moveTo(80, 52);
  ctx.lineTo(108, 105);
  ctx.lineTo(52, 105);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('IPS', 80, 95);

  return canvas.toDataURL('image/png');
}

/**
 * Converts an SVG string or DOM SVG node into a high-resolution Base64 PNG data URL
 */
export async function rasterizeSvgToPngDataUrl(
  svgString: string,
  width = 450,
  height = 160
): Promise<string> {
  return new Promise((resolve) => {
    try {
      const svgWithXmlns = svgString.includes('xmlns')
        ? svgString
        : svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');

      const blob = new Blob([svgWithXmlns], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = width * 2;
          canvas.height = height * 2;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.scale(2, 2);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            const png = canvas.toDataURL('image/png');
            URL.revokeObjectURL(url);
            resolve(png);
            return;
          }
        } catch {
          // ignore
        }
        URL.revokeObjectURL(url);
        resolve('');
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve('');
      };

      img.src = url;
    } catch {
      resolve('');
    }
  });
}

/**
 * Returns a high-res PNG Data URL for standard visual stimuli
 */
async function getStimulusPngDataUrl(q: QuestionItem): Promise<string> {
  if (!q.stimulus) return '';

  if (q.stimulus.imageUrl && q.stimulus.imageUrl.startsWith('data:image')) {
    return q.stimulus.imageUrl;
  }

  // 1. Try to capture directly from live DOM if rendered on screen
  try {
    const liveEl = document.querySelector(`[data-stimulus-id="${q.stimulus.svgIcon}"]`) as HTMLElement;
    if (liveEl) {
      const canvas = await html2canvas(liveEl, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/png');
      if (dataUrl && dataUrl.length > 500) {
        return dataUrl;
      }
    }
  } catch {
    // continue to fallback
  }

  // 2. Fallback to pre-built clean SVG vector drawing for known icons
  if (q.stimulus.svgIcon === 'map-indonesia') {
    const svgStr = `
      <svg width="450" height="150" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="120" fill="#e0f2fe" rx="4" />
        <path d="M20,60 Q35,45 60,65 T100,55 T120,70 L115,80 Q70,75 25,75 Z" fill="#0284c7" />
        <path d="M140,50 Q160,35 180,55 T210,65 L200,85 Q160,80 140,75 Z" fill="#0369a1" />
        <path d="M170,88 Q190,82 220,86 T260,88 L255,95 Q210,95 170,92 Z" fill="#0284c7" />
        <path d="M230,45 Q250,30 270,50 T300,55 L290,75 Q260,70 230,65 Z" fill="#0284c7" />
        <path d="M310,60 Q340,40 375,65 T390,80 L380,95 Q340,85 315,80 Z" fill="#0369a1" />
        <line x1="80" y1="20" x2="160" y2="105" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="4" />
        <line x1="200" y1="15" x2="215" y2="105" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="4" />
        <line x1="290" y1="15" x2="280" y2="105" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="4" />
        <text x="145" y="112" fill="#dc2626" font-size="10" font-weight="bold">ALKI I</text>
        <text x="218" y="112" fill="#dc2626" font-size="10" font-weight="bold">ALKI II</text>
        <text x="282" y="112" fill="#dc2626" font-size="10" font-weight="bold">ALKI III</text>
        <text x="20" y="22" fill="#0369a1" font-size="9" font-weight="bold">SAMUDRA HINDIA</text>
        <text x="260" y="25" fill="#0369a1" font-size="9" font-weight="bold">SAMUDRA PASIFIK</text>
      </svg>`;
    return await rasterizeSvgToPngDataUrl(svgStr, 450, 150);
  }

  if (q.stimulus.svgIcon === 'market-curve') {
    const svgStr = `
      <svg width="350" height="150" viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="120" fill="#fffbeb" rx="4" />
        <line x1="30" y1="10" x2="30" y2="100" stroke="#334155" stroke-width="2" />
        <line x1="30" y1="100" x2="220" y2="100" stroke="#334155" stroke-width="2" />
        <text x="8" y="20" fill="#1e293b" font-size="9" font-weight="bold">Harga (P)</text>
        <text x="165" y="114" fill="#1e293b" font-size="9" font-weight="bold">Kuantitas (Q)</text>
        <line x1="45" y1="25" x2="185" y2="90" stroke="#2563eb" stroke-width="2.5" />
        <text x="188" y="93" fill="#2563eb" font-size="10" font-weight="bold">D</text>
        <line x1="45" y1="90" x2="185" y2="25" stroke="#16a34a" stroke-width="2.5" />
        <text x="188" y="27" fill="#16a34a" font-size="10" font-weight="bold">S0</text>
        <line x1="85" y1="90" x2="225" y2="25" stroke="#059669" stroke-width="2" stroke-dasharray="4" />
        <text x="226" y="27" fill="#059669" font-size="10" font-weight="bold">S1</text>
        <line x1="120" y1="55" x2="150" y2="55" stroke="#dc2626" stroke-width="2" />
        <polygon points="152,55 146,51 146,59" fill="#dc2626" />
      </svg>`;
    return await rasterizeSvgToPngDataUrl(svgStr, 350, 150);
  }

  if (q.stimulus.svgIcon === 'population-pyramid') {
    const svgStr = `
      <svg width="350" height="150" viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="120" fill="#ecfdf5" rx="4" />
        <line x1="120" y1="10" x2="120" y2="105" stroke="#64748b" stroke-width="1.5" />
        <rect x="95" y="15" width="25" height="10" fill="#93c5fd" />
        <rect x="70" y="30" width="50" height="10" fill="#60a5fa" />
        <rect x="40" y="45" width="80" height="12" fill="#3b82f6" />
        <rect x="35" y="60" width="85" height="12" fill="#2563eb" />
        <rect x="50" y="75" width="70" height="10" fill="#60a5fa" />
        <rect x="65" y="90" width="55" height="10" fill="#93c5fd" />
        <rect x="120" y="15" width="25" height="10" fill="#f9a8d4" />
        <rect x="120" y="30" width="50" height="10" fill="#f472b6" />
        <rect x="120" y="45" width="80" height="12" fill="#ec4899" />
        <rect x="120" y="60" width="85" height="12" fill="#db2777" />
        <rect x="120" y="75" width="70" height="10" fill="#f472b6" />
        <rect x="120" y="90" width="55" height="10" fill="#f9a8d4" />
        <text x="12" y="55" fill="#1e3a8a" font-size="8" font-weight="bold">Usia Produktif (15-64)</text>
        <text x="12" y="24" fill="#64748b" font-size="8">65+ th</text>
        <text x="12" y="98" fill="#64748b" font-size="8">0-14 th</text>
      </svg>`;
    return await rasterizeSvgToPngDataUrl(svgStr, 350, 150);
  }

  if (q.stimulus.svgIcon === 'digital-payment') {
    const svgStr = `
      <svg width="350" height="140" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="100" fill="#f5f3ff" rx="4" />
        <rect x="10" y="25" width="55" height="50" rx="4" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1.5" />
        <text x="17" y="45" fill="#6d28d9" font-size="8" font-weight="bold">Konsumen</text>
        <text x="14" y="58" fill="#6d28d9" font-size="7">Smartphone</text>
        <line x1="70" y1="50" x2="105" y2="50" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="3" />
        <polygon points="107,50 102,47 102,53" fill="#8b5cf6" />
        <rect x="108" y="20" width="45" height="60" rx="6" fill="#7c3aed" />
        <text x="117" y="45" fill="#ffffff" font-size="9" font-weight="bold">QRIS</text>
        <text x="112" y="60" fill="#e9d5ff" font-size="7">GPN / BI</text>
        <line x1="156" y1="50" x2="185" y2="50" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="3" />
        <polygon points="187,50 182,47 182,53" fill="#8b5cf6" />
        <rect x="188" y="25" width="50" height="50" rx="4" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1.5" />
        <text x="195" y="45" fill="#6d28d9" font-size="8" font-weight="bold">Merchant</text>
        <text x="198" y="58" fill="#6d28d9" font-size="7">UMKM</text>
      </svg>`;
    return await rasterizeSvgToPngDataUrl(svgStr, 350, 140);
  }

  if (q.stimulus.svgIcon === 'ship-relief') {
    const svgStr = `
      <svg width="350" height="140" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="100" fill="#f5f5f4" rx="4" />
        <path d="M20,65 Q120,95 220,65 L190,85 Q120,95 50,85 Z" fill="#78716c" />
        <line x1="30" y1="80" x2="210" y2="80" stroke="#44403c" stroke-width="3" />
        <line x1="120" y1="20" x2="120" y2="70" stroke="#44403c" stroke-width="2.5" />
        <path d="M120,25 Q170,40 160,65 L120,60 Z" fill="#d6d3d1" stroke="#57534e" stroke-width="1.5" />
        <path d="M10,88 Q30,82 50,88 T90,88 T130,88 T170,88 T210,88 T240,88" fill="none" stroke="#0284c7" stroke-width="2" />
      </svg>`;
    return await rasterizeSvgToPngDataUrl(svgStr, 350, 140);
  }

  if (q.stimulus.svgIcon === 'eco-chart') {
    const svgStr = `
      <svg width="350" height="140" viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="240" height="100" fill="#f0fdfa" rx="4" />
        <circle cx="70" cy="50" r="35" fill="#f43f5e" />
        <path d="M70,50 L70,15 A35,35 0 1,1 55,82 Z" fill="#10b981" />
        <path d="M70,50 L55,82 A35,35 0 0,1 36,40 Z" fill="#3b82f6" />
        <rect x="130" y="25" width="10" height="10" fill="#10b981" />
        <text x="145" y="34" fill="#334155" font-size="8" font-weight="bold">Organik: 54%</text>
        <rect x="130" y="45" width="10" height="10" fill="#3b82f6" />
        <text x="145" y="54" fill="#334155" font-size="8" font-weight="bold">Plastik: 22%</text>
        <rect x="130" y="65" width="10" height="10" fill="#f43f5e" />
        <text x="145" y="74" fill="#334155" font-size="8" font-weight="bold">Lainnya: 24%</text>
      </svg>`;
    return await rasterizeSvgToPngDataUrl(svgStr, 350, 140);
  }

  return '';
}

/**
 * Builds standard Kop Surat table for Microsoft Word
 */
function buildWordKopSurat(doc: ExamDocument, logoPngUrl: string): string {
  const { schoolProfile } = doc;
  return `
    <table style="width: 100%; border: none; border-bottom: 3.0pt double #000000; padding-bottom: 6pt; margin-bottom: 12pt;">
      <tr>
        <td style="width: 75pt; text-align: center; vertical-align: middle; border: none; padding: 2pt;">
          <img src="${logoPngUrl}" width="70" height="70" style="display: block; margin: 0 auto; width: 70pt; height: 70pt;" alt="Logo Sekolah" />
        </td>
        <td style="text-align: center; vertical-align: middle; border: none; padding: 2pt;">
          <div style="font-family: 'Times New Roman', serif; font-size: 11pt; font-weight: bold; text-transform: uppercase; line-height: 1.2;">
            PEMERINTAH KABUPATEN ${(schoolProfile.subdistrictCity || 'BANYUMAS').toUpperCase()}
          </div>
          <div style="font-family: 'Times New Roman', serif; font-size: 11pt; font-weight: bold; text-transform: uppercase; line-height: 1.2;">
            DINAS PENDIDIKAN DAN KEBUDAYAAN
          </div>
          <div style="font-family: 'Times New Roman', serif; font-size: 14pt; font-weight: bold; text-transform: uppercase; margin: 2pt 0; line-height: 1.2;">
            ${schoolProfile.schoolName || 'SMP NEGERI 2 GUMELAR'}
          </div>
          <div style="font-family: 'Times New Roman', serif; font-size: 9pt; line-height: 1.2; color: #333333;">
            ${schoolProfile.schoolAddress || 'Jl. Raya Gumelar, Kec. Gumelar, Kab. Banyumas, Jawa Tengah'}
          </div>
        </td>
      </tr>
    </table>
  `;
}

/**
 * Builds validation signature table for Microsoft Word
 */
function buildWordSignatures(doc: ExamDocument): string {
  const { schoolProfile } = doc;
  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `
    <table style="width: 100%; border: none; margin-top: 24pt; page-break-inside: avoid;">
      <tr>
        <td style="width: 50%; text-align: center; border: none; vertical-align: top; font-size: 10.5pt; font-family: 'Times New Roman', serif;">
          Mengetahui,<br/>
          Kepala ${schoolProfile.schoolName || 'SMP Negeri 2 Gumelar'}<br/><br/><br/><br/><br/>
          <b><u>${schoolProfile.principalName || 'Nopidha Ardyansah, S.Pd., M.Pd.'}</u></b><br/>
          NIP. ${schoolProfile.principalNip || '19780512 200501 1 008'}
        </td>
        <td style="width: 50%; text-align: center; border: none; vertical-align: top; font-size: 10.5pt; font-family: 'Times New Roman', serif;">
          ${schoolProfile.subdistrictCity || 'Banyumas'}, ${todayStr}<br/>
          Guru Mata Pelajaran IPS<br/><br/><br/><br/><br/>
          <b><u>${schoolProfile.teacherName || 'Budi Santoso, S.Pd.'}</u></b><br/>
          NIP. ${schoolProfile.teacherNip || '19840214 200902 1 003'}
        </td>
      </tr>
    </table>
  `;
}

/**
 * Builds high-fidelity HTML document tailored for Microsoft Word (.doc)
 * - Strict A4 dimensions and 2.0cm margins (Top, Bottom, Left, Right)
 * - All visual stimuli embedded as sharp Base64 PNG images
 * - Multiple choice options arranged strictly vertically: A, B, C, D
 * - Table layouts for Kop Surat, Student Identity, and Signatures
 */
export async function downloadWordDocument(
  doc: ExamDocument,
  activeTabTitle: string,
  onProgress?: (status: string) => void
): Promise<void> {
  onProgress?.('Mempersiapkan visual stimulus dan Kop Surat untuk Word...');

  // Prepare school logo PNG
  let logoPngUrl = doc.schoolProfile.logoUrl;
  if (!logoPngUrl || !logoPngUrl.startsWith('data:image')) {
    logoPngUrl = createDefaultLogoPngDataUrl();
  }

  // Pre-rasterize all visual stimuli so Microsoft Word displays 100% of images
  const stimulusImages: Record<string, string> = {};
  for (const q of doc.questions) {
    if (q.stimulus) {
      onProgress?.(`Memproses stimulus visual butir soal No. ${q.number}...`);
      const imgData = await getStimulusPngDataUrl(q);
      if (imgData) {
        stimulusImages[q.id] = imgData;
      }
    }
  }

  onProgress?.('Menyusun format naskah standar A4 Microsoft Word...');

  const { examConfig, schoolProfile, questions } = doc;

  // Group questions by type
  const order: QuestionType[] = [
    'pilihan_ganda',
    'pilihan_ganda_kompleks',
    'menjodohkan',
    'benar_salah',
    'isian_singkat',
    'uraian',
  ];

  let bodyContent = '';

  // Determine if active tab is Kisi-Kisi, Answer Key, Kartu Soal, or Scoring Norm
  if (activeTabTitle.includes('Kisi-Kisi')) {
    // KISI-KISI TABLE VIEW
    bodyContent = `
      <div style="text-align: center; margin-bottom: 12pt;">
        <h3 style="font-size: 13pt; font-weight: bold; margin: 0; text-transform: uppercase;">KISI-KISI PENULISAN SOAL ASESMEN</h3>
        <h4 style="font-size: 11pt; font-weight: bold; margin: 3pt 0 0 0;">MATA PELAJARAN: ILMU PENGETAHUAN SOSIAL (IPS) · SMP KELAS ${examConfig.grade}</h4>
        <div style="font-size: 10pt; color: #333333; margin-top: 2pt;">Tahun Pelajaran: ${schoolProfile.academicYear} · Semester: ${schoolProfile.semester} · Kurikulum Merdeka</div>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 8pt; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
            <th style="border: 1pt solid #000; padding: 4pt; width: 25pt;">No</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 140pt;">Tujuan Pembelajaran (TP)</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 110pt;">Materi Pokok</th>
            <th style="border: 1pt solid #000; padding: 4pt;">Indikator Soal & Stimulus</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 50pt;">Level</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 65pt;">Domain AKM</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 70pt;">Bentuk</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 30pt;">No.</th>
          </tr>
        </thead>
        <tbody>
          ${questions
            .map(
              (q, idx) => `
            <tr>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center;">${idx + 1}</td>
              <td style="border: 1pt solid #000; padding: 4pt;">${examConfig.learningGoal}</td>
              <td style="border: 1pt solid #000; padding: 4pt;">${examConfig.topic}</td>
              <td style="border: 1pt solid #000; padding: 4pt;">
                ${q.indicator}
                ${q.stimulus ? `<br/><i style="font-size: 8.5pt; color: #2563eb;">[Stimulus: ${q.stimulus.title || 'Visual Gambar/Grafik'}]</i>` : ''}
              </td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center; font-weight: bold;">${q.cognitiveLevel}</td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center; font-weight: bold; font-size: 8.5pt;">
                ${q.competencyDomain === 'literasi' ? 'Literasi Membaca' : q.competencyDomain === 'numerasi' ? 'Numerasi Data' : 'Konsep IPS'}
              </td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center;">${QUESTION_TYPE_LABELS[q.type]}</td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center; font-weight: bold;">${q.number}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
  } else if (activeTabTitle.includes('Kunci Jawaban')) {
    // ANSWER KEY & RUBRICS
    bodyContent = `
      <div style="text-align: center; margin-bottom: 12pt;">
        <h3 style="font-size: 13pt; font-weight: bold; margin: 0; text-transform: uppercase;">KUNCI JAWABAN & PEDOMAN PENSKORAN ASESMEN</h3>
        <h4 style="font-size: 11pt; font-weight: bold; margin: 3pt 0 0 0;">MATA PELAJARAN: ILMU PENGETAHUAN SOSIAL (IPS) · SMP KELAS ${examConfig.grade}</h4>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 8pt; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
            <th style="border: 1pt solid #000; padding: 4pt; width: 30pt;">No</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 85pt;">Bentuk Soal</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 50pt;">Level</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 120pt;">Kunci Jawaban</th>
            <th style="border: 1pt solid #000; padding: 4pt;">Pembahasan Lengkap & Kaidah IPS</th>
            <th style="border: 1pt solid #000; padding: 4pt; width: 45pt;">Skor</th>
          </tr>
        </thead>
        <tbody>
          ${questions
            .map(
              (q) => `
            <tr>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center; font-weight: bold;">${q.number}</td>
              <td style="border: 1pt solid #000; padding: 4pt;">${QUESTION_TYPE_LABELS[q.type]}</td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center; font-weight: bold;">${q.cognitiveLevel}</td>
              <td style="border: 1pt solid #000; padding: 4pt; font-weight: bold; color: #1e3a8a;">${q.answerKey}</td>
              <td style="border: 1pt solid #000; padding: 4pt;">
                <div>${q.explanation}</div>
                <div style="font-size: 8.5pt; color: #475569; margin-top: 2pt;"><b>Rubrik:</b> ${q.rubric}</div>
              </td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center; font-weight: bold;">${q.maxScore}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
  } else if (activeTabTitle.includes('Norma Penilaian')) {
    // SCORING NORMS & KKTP (CALIBRATED TO 100)
    const { norms } = calculateScoringNorms(questions);
    bodyContent = `
      <div style="text-align: center; margin-bottom: 12pt;">
        <h3 style="font-size: 13pt; font-weight: bold; margin: 0; text-transform: uppercase;">NORMA PENILAIAN & KONVERSI SKOR AKHIR 100</h3>
        <h4 style="font-size: 11pt; font-weight: bold; margin: 3pt 0 0 0;">STANDAR ASESMEN KURIKULUM MERDEKA FASE D</h4>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 8pt; font-size: 10pt;">
        <thead>
          <tr style="background-color: #f1f5f9; text-align: center; font-weight: bold;">
            <th style="border: 1pt solid #000; padding: 4pt;">Bentuk Soal</th>
            <th style="border: 1pt solid #000; padding: 4pt;">Jumlah Butir</th>
            <th style="border: 1pt solid #000; padding: 4pt;">Bobot per Soal</th>
            <th style="border: 1pt solid #000; padding: 4pt;">Total Skor Mentah</th>
            <th style="border: 1pt solid #000; padding: 4pt;">Kontribusi Skor (Skala 100)</th>
          </tr>
        </thead>
        <tbody>
          ${norms
            .map(
              (n) => `
            <tr>
              <td style="border: 1pt solid #000; padding: 4pt; font-weight: bold;">${n.typeName}</td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center;">${n.count} Soal</td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center;">${n.rawScorePerItem}</td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center;">${n.totalRawScore}</td>
              <td style="border: 1pt solid #000; padding: 4pt; text-align: center; font-weight: bold;">${n.contributionTo100} Poin</td>
            </tr>
          `
            )
            .join('')}
          <tr style="background-color: #f8fafc; font-weight: bold;">
            <td style="border: 1pt solid #000; padding: 6pt;" colspan="4">TOTAL SKOR MAKSIMAL KELULUSAN ASESMEN</td>
            <td style="border: 1pt solid #000; padding: 6pt; text-align: center; font-size: 11pt; color: #166534;">100 POIN</td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top: 14pt; padding: 8pt; border: 1pt solid #cbd5e1; background-color: #f8fafc; font-size: 9.5pt;">
        <b>Rumus Perhitungan Nilai Akhir (NA):</b><br/>
        <i>Nilai Akhir (NA) = (Skor Perolehan Peserta Didik / Total Skor Maksimal) x 100</i>
      </div>
    `;
  } else {
    // DEFAULT: NASKAH SOAL SISWA STANDAR RESMI
    bodyContent = `
      <!-- JUDUL NASKAH SOAL -->
      <div style="text-align: center; margin-bottom: 12pt;">
        <h3 style="font-size: 12pt; font-weight: bold; margin: 0; text-transform: uppercase;">
          NASKAH SOAL ${(examConfig.examTitle || 'ASESMEN SUMATIF').toUpperCase()}
        </h3>
        <h4 style="font-size: 10.5pt; font-weight: bold; margin: 2pt 0; text-transform: uppercase;">
          MATA PELAJARAN: ILMU PENGETAHUAN SOSIAL (IPS SMP) · KURIKULUM MERDEKA
        </h4>
        <div style="font-size: 9.5pt; color: #333333;">
          Tahun Pelajaran: ${schoolProfile.academicYear || '2024/2025'} · Semester: ${schoolProfile.semester || 'Ganjil'}
        </div>
      </div>

      <!-- KARTU IDENTITAS SISWA -->
      <table style="width: 100%; border: 1pt solid #000000; border-collapse: collapse; margin-bottom: 12pt; font-size: 9.5pt;">
        <tr>
          <td style="border: 1pt solid #000000; padding: 3pt 6pt; width: 50%;"><b>Mata Pelajaran:</b> IPS SMP</td>
          <td style="border: 1pt solid #000000; padding: 3pt 6pt; width: 50%;"><b>Hari, Tanggal:</b> .....................................................</td>
        </tr>
        <tr>
          <td style="border: 1pt solid #000000; padding: 3pt 6pt;"><b>Kelas / Fase:</b> Kelas ${examConfig.grade} (Fase D)</td>
          <td style="border: 1pt solid #000000; padding: 3pt 6pt;"><b>Alokasi Waktu:</b> ${examConfig.timeAllocation || 90} Menit</td>
        </tr>
        <tr>
          <td style="border: 1pt solid #000000; padding: 3pt 6pt;"><b>Nama Peserta:</b> .....................................................</td>
          <td style="border: 1pt solid #000000; padding: 3pt 6pt;"><b>Nomor Peserta:</b> .....................................................</td>
        </tr>
      </table>

      <!-- PETUNJUK UMUM -->
      <div style="margin-bottom: 12pt; padding: 5pt 8pt; border: 1pt solid #94a3b8; background-color: #f8fafc; font-size: 9pt;">
        <b>PETUNJUK UMUM:</b>
        <ol style="margin: 2pt 0 0 14pt; padding: 0;">
          <li>Tulislah nama dan nomor peserta Anda pada lembar jawaban yang telah disediakan.</li>
          <li>Periksa dan bacalah setiap butir soal dengan teliti sebelum menjawabnya.</li>
          <li>Dahulukan menjawab butir-butir soal yang Anda anggap mudah.</li>
          <li>Periksalah kembali seluruh pekerjaan Anda sebelum diserahkan kepada pengawas.</li>
        </ol>
      </div>

      <!-- DAFTAR BUTIR SOAL PER BAGIAN -->
      <div>
    `;

    let sectionLetter = 'A';
    for (const t of order) {
      const secQuestions = questions.filter((q) => q.type === t);
      if (secQuestions.length === 0) continue;

      bodyContent += `
        <div style="margin-top: 14pt; margin-bottom: 6pt; font-weight: bold; font-size: 10.5pt; text-transform: uppercase; border-bottom: 1.5pt solid #000000; padding-bottom: 2pt;">
          BAGIAN ${sectionLetter}: ${QUESTION_TYPE_LABELS[t].toUpperCase()} (${secQuestions.length} BUTIR)
        </div>
      `;

      for (const q of secQuestions) {
        const stimulusImg = stimulusImages[q.id];

        bodyContent += `
          <div style="margin-top: 8pt; margin-bottom: 10pt; page-break-inside: avoid; font-size: 10.5pt;">
            <table style="width: 100%; border: none;">
              <tr>
                <td style="width: 22pt; vertical-align: top; border: none; font-weight: bold; font-size: 10.5pt;">
                  ${q.number}.
                </td>
                <td style="vertical-align: top; border: none; font-size: 10.5pt;">
                  <!-- Stimulus Gambar / Visual jika ada -->
                  ${
                    stimulusImg
                      ? `
                    <div style="margin: 4pt 0 8pt 0; text-align: center;">
                      <img src="${stimulusImg}" width="420" style="display: block; margin: 0 auto; max-width: 95%; height: auto; border: 1pt solid #94a3b8; border-radius: 4px;" alt="Stimulus Visual" />
                      ${
                        q.stimulus?.caption
                          ? `<div style="font-size: 8.5pt; font-style: italic; color: #475569; margin-top: 3pt;">${q.stimulus.caption}</div>`
                          : ''
                      }
                    </div>`
                      : ''
                  }

                  <!-- Stimulus Teks wacana jika ada -->
                  ${
                    q.stimulus?.text
                      ? `
                    <div style="margin: 4pt 0 6pt 0; padding: 4pt 6pt; background-color: #f1f5f9; border-left: 3pt solid #2563eb; font-size: 9.5pt; font-style: italic;">
                      "${q.stimulus.text}"
                    </div>`
                      : ''
                  }

                  <!-- Teks Pertanyaan -->
                  <div style="line-height: 1.35; margin-bottom: 4pt; font-weight: 500;">
                    ${q.questionText}
                  </div>

                  <!-- Pilihan Ganda: A, B, C, D Disusun Menurun Rapi -->
                  ${
                    q.type === 'pilihan_ganda' && q.options
                      ? `
                    <div style="margin-top: 3pt; margin-left: 6pt;">
                      ${q.options
                        .map(
                          (opt) => `
                        <div style="margin-bottom: 2pt; line-height: 1.3;">
                          ${opt}
                        </div>
                      `
                        )
                        .join('')}
                    </div>`
                      : ''
                  }

                  <!-- Pilihan Ganda Kompleks -->
                  ${
                    q.type === 'pilihan_ganda_kompleks' && q.complexOptions
                      ? `
                    <div style="margin-top: 3pt; margin-left: 6pt;">
                      ${q.complexOptions
                        .map(
                          (cOpt) => `
                        <div style="margin-bottom: 3pt;">
                          <span style="font-family: 'Courier New', monospace; font-size: 11pt;">[ &nbsp; ]</span> ${cOpt.text}
                        </div>
                      `
                        )
                        .join('')}
                    </div>`
                      : ''
                  }

                  <!-- Isian Singkat -->
                  ${
                    q.type === 'isian_singkat'
                      ? `
                    <div style="margin-top: 6pt; margin-bottom: 6pt; font-style: italic; color: #475569;">
                      Jawaban: ...................................................................................................................................................................
                    </div>`
                      : ''
                  }

                  <!-- Menjodohkan -->
                  ${
                    q.type === 'menjodohkan' && q.matchingPairs
                      ? `
                    <table style="width: 100%; border-collapse: collapse; margin-top: 4pt; font-size: 9.5pt;">
                      <tr style="background-color: #f1f5f9; font-weight: bold;">
                        <th style="border: 1pt solid #000; padding: 3pt 6pt; width: 50%;">Kolom Pernyataan / Konsep</th>
                        <th style="border: 1pt solid #000; padding: 3pt 6pt; width: 50%;">Kolom Pasangan / Definisi</th>
                      </tr>
                      ${q.matchingPairs
                        .map(
                          (pair) => `
                        <tr>
                          <td style="border: 1pt solid #000; padding: 3pt 6pt;">${pair.left}</td>
                          <td style="border: 1pt solid #000; padding: 3pt 6pt;">${pair.right}</td>
                        </tr>
                      `
                        )
                        .join('')}
                    </table>`
                      : ''
                  }

                  <!-- Benar - Salah -->
                  ${
                    q.type === 'benar_salah' && q.trueFalseStatements
                      ? `
                    <table style="width: 100%; border-collapse: collapse; margin-top: 4pt; font-size: 9.5pt;">
                      <tr style="background-color: #f1f5f9; font-weight: bold; text-align: center;">
                        <th style="border: 1pt solid #000; padding: 3pt 6pt; text-align: left;">Pernyataan</th>
                        <th style="border: 1pt solid #000; padding: 3pt 6pt; width: 50pt;">Benar (B)</th>
                        <th style="border: 1pt solid #000; padding: 3pt 6pt; width: 50pt;">Salah (S)</th>
                      </tr>
                      ${q.trueFalseStatements
                        .map(
                          (st) => `
                        <tr>
                          <td style="border: 1pt solid #000; padding: 3pt 6pt;">${st.statement}</td>
                          <td style="border: 1pt solid #000; padding: 3pt 6pt; text-align: center;">[ &nbsp; ]</td>
                          <td style="border: 1pt solid #000; padding: 3pt 6pt; text-align: center;">[ &nbsp; ]</td>
                        </tr>
                      `
                        )
                        .join('')}
                    </table>`
                      : ''
                  }

                  <!-- Uraian -->
                  ${
                    q.type === 'uraian'
                      ? `
                    <div style="margin-top: 8pt; margin-bottom: 8pt; border-bottom: 1pt dotted #94a3b8; height: 18pt;"></div>
                    <div style="margin-top: 4pt; margin-bottom: 8pt; border-bottom: 1pt dotted #94a3b8; height: 18pt;"></div>
                    <div style="margin-top: 4pt; margin-bottom: 8pt; border-bottom: 1pt dotted #94a3b8; height: 18pt;"></div>`
                      : ''
                  }
                </td>
              </tr>
            </table>
          </div>
        `;
      }

      sectionLetter = String.fromCharCode(sectionLetter.charCodeAt(0) + 1);
    }

    bodyContent += `</div>`;
  }

  // Construct complete Microsoft Word (.doc) HTML envelope
  const wordHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${examConfig.examTitle} - ${schoolProfile.schoolName}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        @page {
          size: 21.0cm 29.7cm; /* Exact A4 dimensions */
          margin: 2.0cm 2.0cm 2.0cm 2.0cm; /* Margins 2cm Top, Right, Bottom, Left */
          mso-page-orientation: portrait;
          mso-header-margin: 1.0cm;
          mso-footer-margin: 1.0cm;
        }
        @page Section1 {
          size: 595.3pt 841.9pt; /* A4 */
          margin: 56.7pt 56.7pt 56.7pt 56.7pt; /* 2.0cm exact margins */
          mso-header-margin: 28.3pt;
          mso-footer-margin: 28.3pt;
          mso-paper-source: 0;
        }
        div.Section1 {
          page: Section1;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 11pt;
          line-height: 1.35;
          color: #000000;
          background: #ffffff;
        }
        h1, h2, h3, h4 {
          font-family: 'Times New Roman', Times, serif;
          margin-top: 2pt;
          margin-bottom: 2pt;
          text-align: center;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="Section1">
        ${buildWordKopSurat(doc, logoPngUrl)}
        ${bodyContent}
        ${buildWordSignatures(doc)}
      </div>
    </body>
    </html>
  `;

  onProgress?.('Mengunduh file Microsoft Word (.doc)...');

  const blob = new Blob(['\ufeff' + wordHtml], {
    type: 'application/msword;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeSchool = (doc.schoolProfile.schoolName || 'SMP').replace(/[\s\W]+/g, '_');
  const safeTab = activeTabTitle.replace(/[\s\W]+/g, '_');
  a.download = `Naskah_Soal_IPS_SMP_Kelas${doc.examConfig.grade}_${safeSchool}_${safeTab}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports pixel-perfect multi-page A4 PDF using html2canvas and jsPDF
 * - Captures full visual stimuli at 2x resolution
 * - Adds running header, footer, and page numbers
 * - Downloads automatically to Downloads folder
 */
export async function downloadPdfDocument(
  doc: ExamDocument,
  activeTabTitle: string,
  onProgress?: (status: string) => void
): Promise<void> {
  const contentEl = document.getElementById('printable-document-content');
  if (!contentEl) {
    alert('Konten dokumen tidak ditemukan.');
    return;
  }

  onProgress?.('Mempersiapkan render visual resolusi tinggi (2x DPI)...');

  try {
    const canvas = await html2canvas(contentEl, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
    });

    onProgress?.('Menyusun halaman dokumen standar A4...');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfPageWidth = 210;
    const pdfPageHeight = 297;
    const marginSide = 12; // 12mm
    const marginTop = 12;
    const marginBottom = 12;

    const printableWidth = pdfPageWidth - marginSide * 2;
    const printableHeight = pdfPageHeight - marginTop - marginBottom;

    const pxPerMm = canvas.width / printableWidth;
    const pagePixelHeight = Math.floor(printableHeight * pxPerMm);
    const totalPages = Math.ceil(canvas.height / pagePixelHeight);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }

      onProgress?.(`Memproses halaman ${page + 1} dari ${totalPages}...`);

      const sourceY = page * pagePixelHeight;
      const sourceHeight = Math.min(pagePixelHeight, canvas.height - sourceY);

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sourceHeight;

      const pageCtx = pageCanvas.getContext('2d');
      if (pageCtx) {
        pageCtx.fillStyle = '#ffffff';
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        pageCtx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          canvas.width,
          sourceHeight
        );

        const pageDataUrl = pageCanvas.toDataURL('image/jpeg', 0.95);
        const renderedHeightMm = sourceHeight / pxPerMm;

        pdf.addImage(
          pageDataUrl,
          'JPEG',
          marginSide,
          marginTop,
          printableWidth,
          renderedHeightMm,
          undefined,
          'FAST'
        );
      }

      // Add running footer
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        `Asesmen IPS SMP Kurikulum Merdeka - ${doc.schoolProfile.schoolName || 'SMPN 2 Gumelar'} | Pengembang: Nopidha Ardyansah, S.Pd., M.Pd.`,
        marginSide,
        pdfPageHeight - 5
      );
      pdf.text(
        `Hal. ${page + 1} dari ${totalPages}`,
        pdfPageWidth - marginSide,
        pdfPageHeight - 5,
        { align: 'right' }
      );
    }

    onProgress?.('Mengunduh file PDF...');

    const safeSchool = (doc.schoolProfile.schoolName || 'SMP').replace(/[\s\W]+/g, '_');
    const safeTab = activeTabTitle.replace(/[\s\W]+/g, '_');
    pdf.save(`Soal_IPS_SMP_Kelas${doc.examConfig.grade}_${safeSchool}_${safeTab}.pdf`);
  } catch (error: any) {
    console.error('Gagal menghasilkan PDF via canvas:', error);
    alert('Terjadi kendala saat mengekspor PDF: ' + (error?.message || 'Error tidak diketahui'));
  }
}
