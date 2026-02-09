
import { GoogleGenAI, Type } from "@google/genai";
import { RPPInput, RPPContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRPP = async (input: RPPInput): Promise<RPPContent> => {
  const prompt = `Buatkan RPP Kurikulum Merdeka lengkap dalam format JSON berdasarkan data berikut:
  Jenjang: ${input.jenjang}
  Mata Pelajaran: ${input.mataPelajaran}
  Kelas/Semester: ${input.kelas} / ${input.semester}
  Materi Pokok: ${input.materiPokok}
  Alokasi Waktu: ${input.alokasiWaktu}
  Capaian Pembelajaran (CP): ${input.cp}
  Catatan Tambahan: ${input.tujuanTambahan || '-'}

  RPP harus mencakup: Identitas, Tujuan Pembelajaran yang spesifik, Materi, Metode (misal: PBL, PJBL, Discovery), Media, Langkah-langkah (Pendahuluan, Inti, Penutup), dan Asesmen (Sikap, Pengetahuan, Keterampilan).`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          identitas: {
            type: Type.OBJECT,
            properties: {
              sekolah: { type: Type.STRING },
              mataPelajaran: { type: Type.STRING },
              kelasSemester: { type: Type.STRING },
              materiPokok: { type: Type.STRING },
              alokasiWaktu: { type: Type.STRING }
            },
            required: ["mataPelajaran", "kelasSemester", "materiPokok", "alokasiWaktu"]
          },
          tujuanPembelajaran: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          materiPembelajaran: { type: Type.STRING },
          metodePembelajaran: { type: Type.STRING },
          mediaPembelajaran: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          langkahPembelajaran: {
            type: Type.OBJECT,
            properties: {
              pendahuluan: { type: Type.ARRAY, items: { type: Type.STRING } },
              inti: { type: Type.ARRAY, items: { type: Type.STRING } },
              penutup: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["pendahuluan", "inti", "penutup"]
          },
          asesmen: {
            type: Type.OBJECT,
            properties: {
              sikap: { type: Type.STRING },
              pengetahuan: { type: Type.STRING },
              keterampilan: { type: Type.STRING }
            },
            required: ["sikap", "pengetahuan", "keterampilan"]
          }
        },
        required: ["identitas", "tujuanPembelajaran", "materiPembelajaran", "langkahPembelajaran", "asesmen"]
      }
    }
  });

  const text = response.text || '';
  return JSON.parse(text) as RPPContent;
};
