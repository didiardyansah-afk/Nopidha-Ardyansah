import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { generateSmartIpsQuestions, balanceAndDiversifyAnswerKeys } from './src/data/kurikulumMerdekaIps.ts';
import { QuestionItem, QuestionType } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '15mb' }));

// Server-side Gemini initialization adhering strictly to Google GenAI Guidelines
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * Resilient JSON extractor that parses valid JSON or rescues fully-formed question
 * objects from a truncated/unterminated JSON string.
 */
function extractAndRepairQuestionsJson(rawText: string): any[] {
  if (!rawText || typeof rawText !== 'string') return [];
  const text = rawText.trim();

  // 1. Direct JSON parse
  try {
    const parsed = JSON.parse(text);
    if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
      return parsed.questions;
    }
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (e) {
    // Continue to repair
  }

  // 2. Truncation repair: Close truncated array after the last complete object '}'
  try {
    const arrayStart = text.indexOf('[');
    if (arrayStart !== -1) {
      const lastObjClose = text.lastIndexOf('}');
      if (lastObjClose > arrayStart) {
        const candidate = text.substring(0, lastObjClose + 1) + ']}';
        const parsed = JSON.parse(candidate);
        if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
          return parsed.questions;
        }
      }
    }
  } catch (e) {
    // Continue to scan
  }

  // 3. Robust bracket-depth scanner to salvage individual question objects
  const recovered: any[] = [];
  try {
    let depth = 0;
    let objStart = -1;
    let inString = false;
    let escape = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (escape) {
        escape = false;
        continue;
      }
      if (char === '\\') {
        escape = true;
        continue;
      }
      if (char === '"') {
        inString = !inString;
        continue;
      }
      if (!inString) {
        if (char === '{') {
          if (depth === 1) {
            objStart = i;
          }
          depth++;
        } else if (char === '}') {
          depth--;
          if (depth === 1 && objStart !== -1) {
            const block = text.substring(objStart, i + 1);
            try {
              const item = JSON.parse(block);
              if (item && item.questionText) {
                recovered.push(item);
              }
            } catch (err) {
              // Ignore single malformed block
            }
            objStart = -1;
          }
        }
      }
    }
  } catch (err) {
    // Fallback
  }

  return recovered;
}

// POST endpoint for AI generation of IPS questions
app.post('/api/generate-questions', async (req, res) => {
  try {
    const {
      grade,
      topic,
      learningGoal,
      typeConfigs,
      visualCount,
      literacyCount,
      numeracyCount,
      cognitiveLevels,
      learningExperiences,
      schoolProfile,
    } = req.body;

    const activeTypes = (Object.keys(typeConfigs || {}) as QuestionType[]).filter(
      (k) => typeConfigs[k]?.enabled && typeConfigs[k]?.count > 0
    );

    if (activeTypes.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Pilih minimal satu bentuk soal dan tentukan jumlahnya.',
      });
    }

    // If Gemini AI is not configured, seamlessly use the Kurikulum Merdeka smart engine
    if (!ai || !process.env.GEMINI_API_KEY) {
      const localQuestions = generateSmartIpsQuestions({
        grade: grade || '7',
        topic: topic || 'Materi IPS SMP Kurikulum Merdeka',
        learningGoal: learningGoal || 'Menganalisis konsep IPS.',
        typeConfigs: typeConfigs || {},
        visualCount: visualCount || 0,
        literacyCount: literacyCount ?? 6,
        numeracyCount: numeracyCount ?? 6,
        cognitiveLevels: cognitiveLevels || ['LOTS', 'MOTS', 'HOTS'],
        learningExperiences: learningExperiences || ['Memahami', 'Mengaplikasi', 'Merefleksi'],
      });

      return res.json({
        success: true,
        questions: localQuestions,
        source: 'smart-engine',
      });
    }

    // Determine safe AI batch size to avoid token limit cutoffs
    // Request up to 1-2 exemplary items per selected type, max 8 items total from AI
    const aiTargetCount = Math.min(activeTypes.length * 2, 8);
    const typeSummary = activeTypes
      .map((t) => `${t}: minimal 1 butir`)
      .join(', ');

    const prompt = `Anda adalah Tim Pengembang Asesmen Nasional Kemendikbudristek dan Guru Penggerak Ahli Mata Pelajaran IPS (Ilmu Pengetahuan Sosial) SMP Kurikulum Merdeka di bawah bimbingan Kepala Sekolah Nopidha Ardyansah, S.Pd., M.Pd. (SMP Negeri 2 Gumelar, Kabupaten Banyumas, Jawa Tengah).

Tugas Anda: Susunlah ${aiTargetCount} butir soal utama terbaik untuk asesmen IPS SMP Kurikulum Merdeka dengan spesifikasi:
- Jenjang Pendidikan: SMP (Sekolah Menengah Pertama)
- Kelas: ${grade}
- Mata Pelajaran: Ilmu Pengetahuan Sosial (IPS SMP)
- Topik / Materi: "${topic}"
- Tujuan Pembelajaran (TP): "${learningGoal}"
- Bentuk Soal: ${typeSummary}
- Target Literasi: ${literacyCount ?? 6} butir soal fokus literasi membaca (wacana artikel, narasi historis, dinamika sosial budaya)
- Target Numerasi: ${numeracyCount ?? 6} butir soal fokus numerasi data IPS (tabel statistik ekonomi pasar, grafik kurva harga, piramida demografi)
- Tingkat Kognitif: ${(cognitiveLevels || ['LOTS', 'MOTS', 'HOTS']).join(', ')}
- Pengalaman Belajar: ${(learningExperiences || ['Memahami', 'Mengaplikasi', 'Merefleksi']).join(', ')}

ATURAN WAJIB & PENTING (KAIDAH BUTIR SOAL & JAWABAN TIDAK HOMOGEN):
1. Setiap butir soal pertanyaan dan pilihan jawaban TIDAK BOLEH HOMOGEN!
2. Distribusi kunci jawaban pilihan ganda WAJIB ACAK & TERSEBAR MERATA antara A, B, C, dan D (dilarang keras menumpuk pada huruf yang sama).
3. Pokok soal (pertanyaan) harus heterogen: variasikan antara studi kasus, komparasi data, problem solving geografi, sosiologi, sejarah, dan ekonomi.
4. Opsi jawaban (distraktor) harus bervariasi panjang dan redaksinya, logis, dan tidak seragam.
5. Pada soal Benar-Salah dan PG Kompleks, kombinasi jawaban harus bervariasi dan tidak monoton.
6. Buat rumusan soal dan opsi jawaban yang padat, berbobot, dan kontekstual.
7. Penjelasan/Pembahasan MAKSIMAL 2 KALIMAT singkat agar tidak melebihi batas token output.
8. Pedoman penskoran/rubrik MAKSIMAL 1 KALIMAT singkat.
9. Hasilkan data JSON valid sesuai schema.`;

    let generatedAiQuestions: any[] = [];

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction:
            'Anda adalah pembuat soal asesmen IPS SMP Kurikulum Merdeka. Selalu buat rumusan soal dan pembahasan yang padat, singkat, ringkas, dan valid dalam format JSON tanpa markdown pembungkus.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    number: { type: Type.INTEGER },
                    type: {
                      type: Type.STRING,
                      description:
                        'One of: pilihan_ganda, pilihan_ganda_kompleks, isian_singkat, uraian, menjodohkan, benar_salah',
                    },
                    cognitiveLevel: {
                      type: Type.STRING,
                      description: 'LOTS, MOTS, or HOTS',
                    },
                    learningExperience: {
                      type: Type.STRING,
                      description: 'Memahami, Mengaplikasi, or Merefleksi',
                    },
                    indicator: {
                      type: Type.STRING,
                      description: 'Indikator ketercapaian soal',
                    },
                    stimulus: {
                      type: Type.OBJECT,
                      properties: {
                        type: { type: Type.STRING },
                        title: { type: Type.STRING },
                        caption: { type: Type.STRING },
                        text: { type: Type.STRING },
                      },
                    },
                    questionText: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: 'Opsi A, B, C, D untuk pilihan ganda',
                    },
                    complexOptions: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          text: { type: Type.STRING },
                          isCorrect: { type: Type.BOOLEAN },
                        },
                        required: ['text', 'isCorrect'],
                      },
                      description: 'Untuk pilihan ganda kompleks',
                    },
                    matchingPairs: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          left: { type: Type.STRING },
                          right: { type: Type.STRING },
                        },
                        required: ['left', 'right'],
                      },
                      description: 'Untuk soal menjodohkan',
                    },
                    trueFalseStatements: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          statement: { type: Type.STRING },
                          isTrue: { type: Type.BOOLEAN },
                        },
                        required: ['statement', 'isTrue'],
                      },
                      description: 'Untuk soal benar-salah',
                    },
                    answerKey: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    rubric: { type: Type.STRING },
                    maxScore: { type: Type.NUMBER },
                    sourceBook: { type: Type.STRING },
                  },
                  required: [
                    'number',
                    'type',
                    'cognitiveLevel',
                    'learningExperience',
                    'indicator',
                    'questionText',
                    'answerKey',
                    'explanation',
                    'rubric',
                    'maxScore',
                  ],
                },
              },
            },
            required: ['questions'],
          },
        },
      });

      const rawText = response.text || '';
      generatedAiQuestions = extractAndRepairQuestionsJson(rawText);
    } catch (aiErr: any) {
      console.warn('Gemini API call noticed an exception, activating resilient synthesis:', aiErr?.message);
    }

    // Now construct the complete set matching the exact counts requested by user
    // Generate baseline items using the smart engine
    const fullBaselineQuestions = generateSmartIpsQuestions({
      grade: grade || '7',
      topic: topic || 'Materi IPS SMP Kurikulum Merdeka',
      learningGoal: learningGoal || 'Menganalisis konsep IPS.',
      typeConfigs: typeConfigs || {},
      visualCount: visualCount || 0,
      literacyCount: literacyCount ?? 6,
      numeracyCount: numeracyCount ?? 6,
      cognitiveLevels: cognitiveLevels || ['LOTS', 'MOTS', 'HOTS'],
      learningExperiences: learningExperiences || ['Memahami', 'Mengaplikasi', 'Merefleksi'],
    });

    // If AI generated questions successfully, inject them seamlessly into the baseline
    let finalQuestions: QuestionItem[] = [...fullBaselineQuestions];

    if (generatedAiQuestions.length > 0) {
      // Map AI questions by type
      const aiByType: Record<string, any[]> = {};
      generatedAiQuestions.forEach((q) => {
        if (!aiByType[q.type]) aiByType[q.type] = [];
        aiByType[q.type].push(q);
      });

      // Replace corresponding baseline questions of each type with the AI-crafted questions
      finalQuestions = fullBaselineQuestions.map((baseQ) => {
        const pool = aiByType[baseQ.type];
        if (pool && pool.length > 0) {
          const aiItem = pool.shift();
          return {
            ...baseQ,
            questionText: aiItem.questionText || baseQ.questionText,
            indicator: aiItem.indicator || baseQ.indicator,
            options: aiItem.options || baseQ.options,
            complexOptions: aiItem.complexOptions || baseQ.complexOptions,
            matchingPairs: aiItem.matchingPairs || baseQ.matchingPairs,
            trueFalseStatements: aiItem.trueFalseStatements || baseQ.trueFalseStatements,
            answerKey: aiItem.answerKey || baseQ.answerKey,
            explanation: aiItem.explanation || baseQ.explanation,
            rubric: aiItem.rubric || baseQ.rubric,
            cognitiveLevel: aiItem.cognitiveLevel || baseQ.cognitiveLevel,
            learningExperience: aiItem.learningExperience || baseQ.learningExperience,
          };
        }
        return baseQ;
      });
    }

    const balancedFinalQuestions = balanceAndDiversifyAnswerKeys(finalQuestions);

    return res.json({
      success: true,
      questions: balancedFinalQuestions,
      source: generatedAiQuestions.length > 0 ? 'gemini-ai' : 'smart-engine',
    });
  } catch (error: any) {
    console.warn('Request handling triggered fallback mechanism:', error?.message);

    // Guaranteed safe fallback so user never experiences an error
    const fallbackQuestions = generateSmartIpsQuestions({
      grade: req.body?.grade || '7',
      topic: req.body?.topic || 'Materi IPS SMP Kurikulum Merdeka',
      learningGoal: req.body?.learningGoal || 'Menganalisis materi pembelajaran IPS SMP.',
      typeConfigs: req.body?.typeConfigs || {},
      visualCount: req.body?.visualCount || 0,
      cognitiveLevels: req.body?.cognitiveLevels || ['LOTS', 'MOTS', 'HOTS'],
      learningExperiences: req.body?.learningExperiences || ['Memahami', 'Mengaplikasi', 'Merefleksi'],
    });

    return res.json({
      success: true,
      questions: fallbackQuestions,
      source: 'smart-engine',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    developer: 'Nopidha Ardyansah, S.Pd., M.Pd. (Kepala SMP Negeri 2 Gumelar)',
  });
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server aktif pada http://0.0.0.0:${port}`);
  });
}

startServer();
