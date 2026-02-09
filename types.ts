
export type Jenjang = 'TK' | 'SD' | 'SMP' | 'SMA' | 'SMK';

export interface RPPInput {
  jenjang: Jenjang;
  mataPelajaran: string;
  kelas: string;
  semester: string;
  materiPokok: string;
  alokasiWaktu: string;
  cp: string; // Capaian Pembelajaran
  tujuanTambahan?: string;
}

export interface RPPContent {
  identitas: {
    sekolah: string;
    mataPelajaran: string;
    kelasSemester: string;
    materiPokok: string;
    alokasiWaktu: string;
  };
  tujuanPembelajaran: string[];
  materiPembelajaran: string;
  metodePembelajaran: string;
  mediaPembelajaran: string[];
  langkahPembelajaran: {
    pendahuluan: string[];
    inti: string[];
    penutup: string[];
  };
  asesmen: {
    sikap: string;
    pengetahuan: string;
    keterampilan: string;
  };
}

export interface SavedRPP {
  id: string;
  createdAt: number;
  input: RPPInput;
  content: RPPContent;
}

export type View = 'dashboard' | 'create' | 'history' | 'detail';
