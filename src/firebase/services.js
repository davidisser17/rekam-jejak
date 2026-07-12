import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "./config";

// --- Dummy Data Fallbacks ---
const dummyOfficials = [
  {
    id: "1",
    name: "Purbaya Yudhi Sadewa",
    currentAgency: "Kementerian Keuangan",
    currentPosition: "Menteri Keuangan",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Purbaya_Yudhi_Sadewa%2C_Menteri_Keuangan_%282026%29.jpg"
  },
  {
    id: "2",
    name: "Siti Aminah",
    currentAgency: "Kementerian Kesehatan",
    currentPosition: "Menteri Kesehatan",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
  },
  {
    id: "3",
    name: "Ahmad Yani",
    currentAgency: "Kementerian Pendidikan",
    currentPosition: "Direktur Pendidikan Dasar",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"
  },
  {
    id: "4",
    name: "Sugiono",
    currentAgency: "Kementerian Luar Negeri",
    currentPosition: "Menteri Luar Negeri Indonesia ke-18",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Menteri_Luar_Negeri_Sugiono.jpg"
  },
  {
    id: "5",
    name: "Sjafrie Sjamsoeddin",
    currentAgency: "Kementerian Pertahanan",
    currentPosition: "Menteri Pertahanan Indonesia ke-27",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Sjafrie_Sjamsoeddin%2C_Menteri_Pertahanan_Indonesia_%282025%29.png"
  },
  {
    id: "6",
    name: "Meutya Hafid",
    currentAgency: "Kementerian Komunikasi dan Digital",
    currentPosition: "Menteri Komunikasi dan Digital Indonesia ke-8",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Menteri_Komunikasi_dan_Digital_Indonesia_Meutya_Viada_Hafid.jpg"
  },
  {
    id: "7",
    name: "Fadli Zon",
    currentAgency: "Kementerian Kebudayaan",
    currentPosition: "Menteri Kebudayaan Indonesia ke-4",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Fadli_Zon%2C_Menteri_Kebudayaan_Indonesia.jpg"
  },
  {
    id: "8",
    name: "Abdul Mu'ti",
    currentAgency: "Kementerian Pendidikan Dasar dan Menengah",
    currentPosition: "Menteri Pendidikan Dasar dan Menengah Indonesia ke-30",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Menteri_pendidikan_indonesia.jpg"
  },
  {
    id: "9",
    name: "ST Burhanuddin",
    currentAgency: "Kejaksaan Agung Republik Indonesia",
    currentPosition: "Jaksa Agung RI",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/JAKSAAGUNG%2CSanitiar_Burhanuddin.jpg"
  },
  {
    id: "10",
    name: "Febrie Adriansyah",
    currentAgency: "Kejaksaan Agung Republik Indonesia",
    currentPosition: "Jaksa Agung Muda Bidang Tindak Pidana Khusus (Jampidsus)",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Febrie_Adriansyah.jpg",
    isHotFigure: true
  }
];

const dummyTrackRecords = [
  { id: "t1", officialId: "1", agency: "Kementerian Keuangan", position: "Menteri Keuangan", startDate: "2025-09-08", endDate: null },
  { id: "t2", officialId: "1", agency: "Lembaga Penjamin Simpanan", position: "Ketua Dewan Komisioner LPS", startDate: "2020-09-03", endDate: "2025-09-08" },
  { id: "t3", officialId: "1", agency: "PT Danareksa Sekuritas", position: "Direktur Utama Danareksa Sekuritas", startDate: "2006-04-01", endDate: "2008-10-31" },
  { id: "t4", officialId: "2", agency: "Kementerian Kesehatan", position: "Menteri Kesehatan", startDate: "2024-10-20", endDate: null },
  { id: "t5", officialId: "4", agency: "Partai Gerakan Indonesia Raya", position: "Sekretaris Jenderal Partai Gerindra", startDate: "2025-08-01", endDate: null },
  { id: "t6", officialId: "4", agency: "Kementerian Luar Negeri", position: "Menteri Luar Negeri", startDate: "2024-10-21", endDate: null },
  { id: "t7", officialId: "4", agency: "Dewan Perwakilan Rakyat RI", position: "Wakil Ketua Komisi I DPR RI", startDate: "2019-10-01", endDate: "2024-10-21" },
  { id: "t8", officialId: "4", agency: "Dewan Perwakilan Rakyat RI", position: "Anggota DPR RI Dapil Jawa Tengah I", startDate: "2019-10-01", endDate: "2024-10-21" },
  { id: "t9", officialId: "4", agency: "TNI Angkatan Darat", position: "Letnan Satu Infanteri Kopassus", startDate: "2002", endDate: "2004" },
  { id: "t10", officialId: "5", agency: "Kementerian Pertahanan", position: "Menteri Pertahanan", startDate: "2024-10-21", endDate: null },
  { id: "t11", officialId: "5", agency: "Kementerian Pertahanan", position: "Wakil Menteri Pertahanan", startDate: "2010-01-06", endDate: "2014-10-20" },
  { id: "t12", officialId: "5", agency: "Kementerian Pertahanan", position: "Sekretaris Jenderal Kementerian Pertahanan", startDate: "2005-04-15", endDate: "2010-05-21" },
  { id: "t13", officialId: "5", agency: "Markas Besar TNI", position: "Kepala Pusat Penerangan TNI", startDate: "2002", endDate: "2005" },
  { id: "t14", officialId: "5", agency: "TNI Angkatan Darat", position: "Panglima Kodam Jaya", startDate: "1997", endDate: "1998" },
  { id: "t15", officialId: "6", agency: "Kementerian Komunikasi dan Digital", position: "Menteri Komunikasi dan Digital", startDate: "2024-10-21", endDate: null },
  { id: "t16", officialId: "6", agency: "Dewan Perwakilan Rakyat RI", position: "Ketua Komisi I DPR RI", startDate: "2019-10-01", endDate: "2024-10-21" },
  { id: "t17", officialId: "6", agency: "Dewan Perwakilan Rakyat RI", position: "Anggota DPR RI Dapil Sumatera Utara I", startDate: "2010-08-30", endDate: "2024-10-21" },
  { id: "t18", officialId: "6", agency: "Metro TV", position: "Wartawan dan Presenter", startDate: "2005", endDate: "2010" },
  { id: "t19", officialId: "7", agency: "Kementerian Kebudayaan", position: "Menteri Kebudayaan", startDate: "2024-10-21", endDate: null },
  { id: "t20", officialId: "7", agency: "Dewan Perwakilan Rakyat RI", position: "Ketua BKSAP DPR RI", startDate: "2019-11-04", endDate: "2024-10-21" },
  { id: "t21", officialId: "7", agency: "Dewan Perwakilan Rakyat RI", position: "Wakil Ketua DPR RI Bidang Politik dan Keamanan", startDate: "2014-10-02", endDate: "2019-10-01" },
  { id: "t22", officialId: "7", agency: "Dewan Perwakilan Rakyat RI", position: "Anggota DPR RI Dapil Jawa Barat V", startDate: "2014-10-01", endDate: "2024-10-21" },
  { id: "t23", officialId: "7", agency: "GOPAC International", position: "President GOPAC (Global Organization of Parliamentarians Against Corruption)", startDate: "2015-10-08", endDate: "2019-10-21" },
  { id: "t24", officialId: "7", agency: "Majelis Permusyawaratan Rakyat RI", position: "Anggota MPR RI", startDate: "1997", endDate: "1999" },
  { id: "t25", officialId: "8", agency: "Kementerian Pendidikan Dasar dan Menengah", position: "Menteri Pendidikan Dasar dan Menengah", startDate: "2024-10-21", endDate: null },
  { id: "t26", officialId: "8", agency: "Pimpinan Pusat Muhammadiyah", position: "Sekretaris Umum Pimpinan Pusat Muhammadiyah", startDate: "2022-11-20", endDate: null },
  { id: "t27", officialId: "8", agency: "UIN Syarif Hidayatullah Jakarta", position: "Guru Besar Bidang Pendidikan Agama Islam", startDate: "2020-09-02", endDate: null },
  { id: "t28", officialId: "8", agency: "BSNP", position: "Ketua Badan Standar Nasional Pendidikan", startDate: "2019", endDate: "2021" },
  { id: "t29", officialId: "8", agency: "BAN-S/M", position: "Ketua Badan Akreditasi Nasional Sekolah/Madrasah", startDate: "2011", endDate: "2017" },
  { id: "t30", officialId: "8", agency: "IAIN Walisongo Semarang", position: "Dosen", startDate: "1993", endDate: "2013" },
  { id: "t31", officialId: "9", agency: "Kejaksaan Agung Republik Indonesia", position: "Jaksa Agung RI", startDate: "2019-10-23", endDate: null },
  { id: "t32", officialId: "9", agency: "Kejaksaan Agung RI", position: "Jaksa Agung Muda Perdata dan Tata Usaha Negara", startDate: "2011-01-01", endDate: "2014-12-31" },
  { id: "t33", officialId: "9", agency: "Kejaksaan Agung RI", position: "Kepala Kejaksaan Tinggi Sulawesi Selatan dan Barat", startDate: "2010-01-01", endDate: "2011-01-01" },
  { id: "t34", officialId: "9", agency: "Kejaksaan Agung RI", position: "Kepala Kejaksaan Tinggi Maluku Utara", startDate: "2008-01-01", endDate: "2009-12-31" },
  { id: "t35", officialId: "9", agency: "Kejaksaan Agung RI", position: "Direktur Eksekusi dan Eksaminasi", startDate: "2007-01-01", endDate: "2008-01-01" },
  { id: "t36", officialId: "9", agency: "Kejaksaan Agung RI", position: "Staf Kejaksaan Tinggi Jambi", startDate: "1989-01-01", endDate: null },
  { id: "t37", officialId: "10", agency: "Kejaksaan Agung Republik Indonesia", position: "Jaksa Agung Muda Bidang Tindak Pidana Khusus (Jampidsus)", startDate: "2022-01-10", endDate: "2026-07-11" },
  { id: "t38", officialId: "10", agency: "Kejaksaan Agung Republik Indonesia", position: "Kepala Kejaksaan Tinggi DKI Jakarta", startDate: "2021-07-29", endDate: "2022-01-10" },
  { id: "t39", officialId: "10", agency: "Kejaksaan Agung Republik Indonesia", position: "Direktur Penyidikan Jampidsus", startDate: "2019-01-01", endDate: "2021-07-29" },
  { id: "t40", officialId: "10", agency: "Kejaksaan Agung Republik Indonesia", position: "Kepala Kejaksaan Tinggi Nusa Tenggara Timur", startDate: "2018-01-01", endDate: "2019-01-01" },
  { id: "t41", officialId: "10", agency: "Kejaksaan Agung Republik Indonesia", position: "Wakil Kepala Kejaksaan Tinggi DKI Jakarta", startDate: "2017-01-01", endDate: "2018-01-01" },
  { id: "t42", officialId: "10", agency: "Kejaksaan Agung Republik Indonesia", position: "Wakil Kepala Kejaksaan Tinggi DI Yogyakarta", startDate: "2015-01-01", endDate: "2017-01-01" },
  { id: "t43", officialId: "10", agency: "Kejaksaan Agung Republik Indonesia", position: "Kepala Kejaksaan Negeri Bandung", startDate: "2013-01-01", endDate: "2015-01-01" },
  { id: "t44", officialId: "10", agency: "Kejaksaan Agung Republik Indonesia", position: "Asisten Tindak Pidana Khusus Kejaksaan Tinggi Jawa Timur", startDate: "2010-01-01", endDate: "2013-01-01" },
  { id: "t45", officialId: "10", agency: "Kejaksaan Agung Republik Indonesia", position: "Kepala Seksi Intelijen Kejaksaan Negeri Sungai Penuh", startDate: "1996-01-01", endDate: "2010-01-01" }
];

const dummyCriminalRecords = [
  { id: "c1", officialId: "10", type: "Tersangka Korupsi dan TPPU", description: "Ditetapkan sebagai tersangka oleh Kortastipidkor Polri atas dugaan tindak pidana korupsi dan tindak pidana pencucian uang (TPPU) terkait penanganan perkara PT Asabri, pengadaan batu bara PLN, dan PT Krakatau Steel. Barang bukti yang disita meliputi 74 kg emas batangan dan uang tunai senilai ratusan miliar rupiah.", status: "Tersangka", date: "2026-07-11", sourceName: "Kompas", sourceUrl: "https://nasional.kompas.com/read/2026/07/11/febrie-adriansyah-ditetapkan-tersangka-korupsi-tppu" },
  { id: "c2", officialId: "10", type: "Dugaan Penerimaan Suap Penanganan Perkara", description: "Diduga menerima suap dan gratifikasi dalam penanganan sejumlah perkara korupsi besar selama menjabat sebagai Jampidsus. Perkara ini sedang dalam proses penyidikan oleh Kortastipidkor Polri dan telah dilimpahkan ke Kejaksaan Agung.", status: "Dalam Penyidikan", date: "2026-07-08", sourceName: "Detik", sourceUrl: "https://news.detik.com/berita/d-7890123/polri-geledah-rumah-jampidsus-sita-74-kg-emas" }
];

const dummyNews = [
  { id: "n1", officialId: "1", title: "Menkeu Purbaya Tegaskan Tidak Toleransi Korupsi di Kemenkeu", content: "Menteri Keuangan Purbaya Yudhi Sadewa memberikan peringatan keras kepada jajaran Kementerian Keuangan setelah KPK menangkap pegawai terkait dugaan korupsi. Ia menegaskan tidak akan ada toleransi terhadap tindak pidana korupsi di lingkungan Kemenkeu.", sentiment: "Positif", date: "2025-10-22", sourceName: "MetroTV", sourceUrl: "https://www.youtube.com/watch?v=hjQTchPiXiM" },
  { id: "n2", officialId: "1", title: "Kontroversi Patriot Merah Putih Bond, Menkeu Purbaya Tanggapi Risiko Pencucian Uang", content: "Kontroversi muncul karena pemerintah menyatakan bahwa sumber dana yang digunakan untuk membeli instrumen Patriot Merah Putih Bond tidak akan ditelusuri. Purbaya mengakui pemerintah memahami adanya kritik bahwa perlindungan hukum dalam instrumen tersebut berpotensi membuka celah penyalahgunaan.", sentiment: "Negatif", date: "2025-12-01", sourceName: "IKPI", sourceUrl: "https://ikpi.or.id/en/menkeu-purbaya-tanggapi-kekhawatiran-risiko-pencucian-uang-di-patriot-merah-putih-bond/" },
  { id: "n3", officialId: "1", title: "Menkeu Purbaya Sebut Singapura Tempat Penyimpanan Dana Hasil Korupsi Indonesia", content: "Menteri Keuangan Purbaya Yudhi Sadewa menyinggung Singapura sebagai tempat penyimpanan dana hasil korupsi dari Indonesia, menegaskan pentingnya repatriasi aset korupsi yang disimpan di luar negeri.", sentiment: "Positif", date: "2025-11-15", sourceName: "Detik", sourceUrl: "https://www.tiktok.com/@detikcom/video/7565004648860454152" },
  { id: "n4", officialId: "2", title: "Peresmian Rumah Sakit Baru di Daerah Terpencil", content: "Menteri meresmikan fasilitas kesehatan baru untuk menjangkau masyarakat pelosok.", sentiment: "Positif", date: "2025-05-10", sourceName: "Medis Update", sourceUrl: "#" },
  { id: "n5", officialId: "4", title: "Profil Sugiono, Anak Ideologis Prabowo yang Digadang-gadang Jadi Menlu", content: "Sugiono, kader awal Partai Gerindra sejak 2008 dan lulusan Norwich University Amerika Serikat, digadang menjadi Menteri Luar Negeri. Sebelumnya ia menjabat Wakil Ketua Komisi I DPR RI yang membidangi pertahanan, luar negeri, dan intelijen, serta merupakan Direktur Kampanye Badan Pemenangan Nasional Prabowo-Sandiaga pada Pemilu 2019.", sentiment: "Positif", date: "2024-09-14", sourceName: "Tempo.co", sourceUrl: "https://nasional.tempo.co/read/1916225/profil-sugiono-anak-ideologis-prabowo-yang-digadang-gadang-jadi-menlu" },
  { id: "n6", officialId: "4", title: "Sosok Menteri Luar Negeri Sugiono, Alumnus Berprestasi SMA Taruna Nusantara", content: "Sugiono resmi dilantik menjadi Menteri Luar Negeri ke-18 pada Kabinet Merah Putih. Ia merupakan alumni SMA Taruna Nusantara angkatan V bersama Agus Harimurti Yudhoyono dan memiliki latar belakang militer sebagai mantan perwira Kopassus serta pendidikan di Norwich University bidang Teknik Komputer.", sentiment: "Positif", date: "2024-10-26", sourceName: "Kompas.com", sourceUrl: "https://www.kompas.com/edu/read/2024/10/26/135256871/sosok-menteri-luar-negeri-sugiono-alumnus-berprestasi-sma-taruna-nusantara" },
  { id: "n7", officialId: "5", title: "Sjafrie Sjamsoeddin, Ajudan Soeharto Kini Gantikan Prabowo di Kemenhan", content: "Sjafrie Sjamsoeddin resmi dilantik sebagai Menteri Pertahanan pada 21 Oktober 2024, menggantikan Prabowo Subianto. Ia merupakan teman seangkatan Prabowo di Akmil 1974 dan mantan ajudan Presiden Soeharto.", sentiment: "Netral", date: "2024-10-21", sourceName: "CNN Indonesia", sourceUrl: "https://www.cnnindonesia.com/nasional/20241021110721-32-1157860/sjafrie-sjamsoeddin-ajudan-soeharto-kini-gantikan-prabowo-di-kemenhan" },
  { id: "n8", officialId: "6", title: "Komdigi blokir konten Magdalene, serupa pembredelan era Orde Baru", content: "Kementerian Komunikasi dan Digital di bawah Meutya Hafid menuai kritik setelah melakukan pemblokiran terhadap konten Magdalene. Organisasi masyarakat sipil menilai langkah ini berpotensi melanggar UU Pers.", sentiment: "Negatif", date: "2026-04-09", sourceName: "BBC News Indonesia", sourceUrl: "https://www.bbc.com/indonesia/articles/c0mjx7l781go" },
  { id: "n9", officialId: "7", title: "Fadli Zon Jadi Menteri Kebudayaan, Bawa Misi Penulisan Ulang Sejarah Indonesia", content: "Fadli Zon dilantik sebagai Menteri Kebudayaan pada 21 Oktober 2024. Ia merupakan sejarawan yang meraih gelar doktor Ilmu Sejarah dari Universitas Indonesia.", sentiment: "Netral", date: "2024-10-21", sourceName: "Detik.com", sourceUrl: "https://news.detik.com/berita/d-7762339/dpr-lantik-anggota-paw-pengganti-fadli-zon-sugiono-ada-jamal-mirdad" },
  { id: "n10", officialId: "8", title: "Mendikdasmen Abdul Mu'ti: Pendekatan Deep Learning Akan Diterapkan di Kurikulum Nasional", content: "Menteri Pendidikan Dasar dan Menengah Abdul Mu'ti menegaskan bahwa pendekatan deep learning melalui tiga prinsip utama yaitu mindfulness, meaningful, dan joyful akan diterapkan dalam sistem pendidikan nasional.", sentiment: "Positif", date: "2024-12-31", sourceName: "Tempo.co", sourceUrl: "https://www.tempo.co/politik/mendikdasmen-abdul-mu-ti-pendekatan-deep-learning-akan-diterapkan-di-kurikulum-nasional-1188242" },
  { id: "n11", officialId: "9", title: "Jaksa Agung ST Burhanuddin Serahkan Rp11,42 Triliun Hasil Penyelamatan Negara ke Presiden Prabowo", content: "Presiden Prabowo Subianto menyaksikan penyerahan dana hasil penyelamatan keuangan negara sebesar Rp11,42 triliun oleh Jaksa Agung ST Burhanuddin. Penyerahan tersebut merupakan hasil penagihan denda tindak pidana korupsi yang berhasil dikumpulkan Kejaksaan Agung.", sentiment: "Positif", date: "2026-04-10", sourceName: "Setneg", sourceUrl: "https://www.setneg.go.id/baca/index/presiden_prabowo_saksikan_penyerahan_rp1142_triliun_dan_ratusan_ribu_hektare_lahan_hasil_penyelamatan_ke_negara" },
  { id: "n12", officialId: "9", title: "ST Burhanuddin Ungkap Mega Korupsi Jiwasraya dan Pertamina, Sempat Diancam", content: "Jaksa Agung ST Burhanuddin memimpin pengungkapan kasus mega korupsi Jiwasraya dan Pertamina. Dalam penanganan kasus tersebut, ia sempat mendapat ancaman dan ditawari uang namun tetap menegakkan hukum.", sentiment: "Positif", date: "2025-06-15", sourceName: "Kejaksaan Agung", sourceUrl: "https://story.kejaksaan.go.id/profil/inilah-sosok-jaksa-agung-st-burhanuddin-yang-tak-banyak-diketahui-mvk.html" },
  { id: "n13", officialId: "9", title: "Jaksa Agung ST Burhanuddin Tuntut Kasus Suap Vonis Ronald Tannur", content: "Tim di bawah pimpinan ST Burhanuddin berhasil mengungkap kasus suap terhadap peradilan kontroversial Ronald Tannur, yang melibatkan hakim yang diduga disuap untuk memutuskan vonis bebas terhadap tersangka.", sentiment: "Positif", date: "2024-11-20", sourceName: "CNN Indonesia", sourceUrl: "https://www.cnnindonesia.com/nasional/20241120123456/jaksa-agung-tuntut-kasus-suap-ronald-tannur" },
  { id: "n14", officialId: "10", title: "Febrie Adriansyah Ditetapkan Tersangka Korupsi dan TPPU oleh Polri", content: "Kortastipidkor Polri resmi menetapkan mantan Jampidsus Febrie Adriansyah sebagai tersangka dugaan tindak pidana korupsi dan pencucian uang (TPPU) terkait penanganan perkara Asabri, pengadaan batu bara PLN, dan PT Krakatau Steel.", sentiment: "Negatif", date: "2026-07-11", sourceName: "Kompas", sourceUrl: "https://nasional.kompas.com/read/2026/07/11/febrie-adriansyah-ditetapkan-tersangka-korupsi-tppu" },
  { id: "n15", officialId: "10", title: "Polri Geledah Rumah Jampidsus, Sita 74 Kg Emas dan Uang Ratusan Miliar", content: "Kortastipidkor Polri menggeledah kediaman pribadi Febrie Adriansyah di Sentul, Bogor. Penyidik menemukan brankas berisi 74 kilogram emas batangan serta uang tunai senilai ratusan miliar rupiah.", sentiment: "Negatif", date: "2026-07-08", sourceName: "Detik", sourceUrl: "https://news.detik.com/berita/d-7890123/polri-geledah-rumah-jampidsus-sita-74-kg-emas" },
  { id: "n16", officialId: "10", title: "Jampidsus Febrie Adriansyah Diuntit Densus 88, Picu Ketegangan Antar-Lembaga", content: "Nama Febrie Adriansyah menjadi sorotan publik setelah beredar laporan bahwa ia diuntit oleh anggota Densus 88 Antiteror Polri. Peristiwa ini memicu ketegangan antar-lembaga penegak hukum.", sentiment: "Negatif", date: "2024-05-15", sourceName: "Tempo", sourceUrl: "https://nasional.tempo.co/read/1878901/jampidsus-febrie-adriansyah-diuntit-densus-88" }
];

const isFirebaseConfigured = () => {
  return db !== undefined;
};

// --- API Functions ---

export const getOfficials = async (searchQuery = "", ministryFilter = []) => {
  const selectedMinistries = Array.isArray(ministryFilter)
    ? ministryFilter
    : ministryFilter ? [ministryFilter] : [];

  const matchesFilters = (official) => (
    selectedMinistries.length === 0 || selectedMinistries.includes(official.currentAgency)
  );

  if (!isFirebaseConfigured()) {
    const results = dummyOfficials.filter((official) => (
      (official.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        official.currentAgency.toLowerCase().includes(searchQuery.toLowerCase())) &&
      matchesFilters(official)
    ));
    return results;
  }

  try {
    const officialsCol = collection(db, 'officials');
    const snapshot = await getDocs(officialsCol);
    let officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (searchQuery) {
      officials = officials.filter(o => 
        o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        o.currentAgency.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedMinistries.length > 0) {
      officials = officials.filter(matchesFilters);
    }
    return officials;
  } catch (error) {
    console.error("Error fetching officials:", error);
    return [];
  }
};

export const getMinistries = async () => {
  if (!isFirebaseConfigured()) {
    return [...new Set(dummyOfficials.map(o => o.currentAgency))];
  }

  try {
    const officialsCol = collection(db, 'officials');
    const snapshot = await getDocs(officialsCol);
    const officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return [...new Set(officials.map(o => o.currentAgency))].sort();
  } catch (error) {
    console.error("Error fetching ministries:", error);
    return [];
  }
};

export const getHotFigures = async () => {
  if (!isFirebaseConfigured()) {
    return dummyOfficials.filter(o => o.isHotFigure === true);
  }

  try {
    const officialsCol = collection(db, 'officials');
    const snapshot = await getDocs(officialsCol);
    const officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return officials.filter(o => o.isHotFigure === true);
  } catch (error) {
    console.error("Error fetching hot figures:", error);
    return [];
  }
};

export const getOfficialById = async (id) => {
  if (!isFirebaseConfigured()) {
    return dummyOfficials.find(o => o.id === id) || null;
  }

  try {
    const docRef = doc(db, "officials", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error fetching official:", error);
    return null;
  }
};

export const getTrackRecordsByOfficialId = async (officialId) => {
  if (!isFirebaseConfigured()) {
    return dummyTrackRecords
      .filter(t => t.officialId === officialId)
      .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  }

  try {
    const q = query(
      collection(db, "track_records"), 
      where("officialId", "==", officialId),
    );
    const snapshot = await getDocs(q);
    const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return records.sort((a, b) => {
      const dateA = a.startDate?.toDate ? a.startDate.toDate() : new Date(a.startDate);
      const dateB = b.startDate?.toDate ? b.startDate.toDate() : new Date(b.startDate);
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching track records:", error);
    return [];
  }
};

export const getNewsByOfficialId = async (officialId) => {
  if (!isFirebaseConfigured()) {
    return dummyNews
      .filter(n => n.officialId === officialId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  try {
    const q = query(
      collection(db, "news"), 
      where("officialId", "==", officialId)
    );
    const snapshot = await getDocs(q);
    const news = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return news.sort((a, b) => {
      const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const getCriminalRecordsByOfficialId = async (officialId) => {
  if (!isFirebaseConfigured()) {
    return dummyCriminalRecords
      .filter(c => c.officialId === officialId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  try {
    const q = query(
      collection(db, "criminal_records"), 
      where("officialId", "==", officialId)
    );
    const snapshot = await getDocs(q);
    const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return records.sort((a, b) => {
      const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching criminal records:", error);
    return [];
  }
};