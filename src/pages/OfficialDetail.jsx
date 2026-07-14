import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Briefcase, Newspaper, ThumbsUp, ThumbsDown, Calendar, Link as LinkIcon, AlertCircle, ShieldAlert } from 'lucide-react';
import { getOfficialById, getTrackRecordsByOfficialId, getNewsByOfficialId, getCriminalRecordsByOfficialId } from '../firebase/services';

export default function OfficialDetail() {
  const { id } = useParams();
  const [official, setOfficial] = useState(null);
  const [trackRecords, setTrackRecords] = useState([]);
  const [criminalRecords, setCriminalRecords] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedCrimes, setExpandedCrimes] = useState({});

  const toggleCrime = (idx) => {
    setExpandedCrimes(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      setLoading(true);
      setError(false);
      try {
        const [officialData, recordsData, newsData, criminalData] = await Promise.all([
          getOfficialById(id),
          getTrackRecordsByOfficialId(id),
          getNewsByOfficialId(id),
          getCriminalRecordsByOfficialId(id)
        ]);
        setOfficial(officialData);
        setTrackRecords(recordsData);
        setNews(newsData);
        setCriminalRecords(criminalData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Gagal memuat data</h2>
        <p className="text-slate-500 text-sm mb-6">Terjadi kesalahan saat mengambil data dari server. Silakan refresh halaman.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          Refresh Halaman
        </button>
      </div>
    );
  }

  if (!official) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-slate-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Pejabat tidak ditemukan</h2>
        <Link to="/" className="text-primary-600 font-medium hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali ke beranda
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Sekarang';
    const date = dateStr?.toDate ? dateStr.toDate() : new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <Helmet>
        <title>{`Profil ${official.name} — ${official.currentPosition} | Rekam Jejak Digital`}</title>
        <meta
          name="description"
          content={`Rekam jejak lengkap ${official.name} sebagai ${official.currentPosition} di ${official.currentAgency}. Lihat riwayat jabatan, berita terkini, dan catatan publik.`}
        />
        <meta property="og:title" content={`Profil ${official.name} — ${official.currentPosition} | Rekam Jejak Digital`} />
        <meta
          property="og:description"
          content={`Rekam jejak lengkap ${official.name} sebagai ${official.currentPosition} di ${official.currentAgency}. Lihat riwayat jabatan, berita terkini, dan catatan publik.`}
        />
        <meta property="og:url" content={`https://www.rekamjejak.digital/pejabat/${id}`} />
        {official.photoUrl && <meta property="og:image" content={official.photoUrl} />}
        <link rel="canonical" href={`https://www.rekamjejak.digital/pejabat/${id}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": official.name,
          "jobTitle": official.currentPosition,
          "worksFor": {
            "@type": "Organization",
            "name": official.currentAgency
          },
          "url": `https://www.rekamjejak.digital/pejabat/${id}`,
          ...(official.photoUrl && { "image": official.photoUrl })
        })}</script>
      </Helmet>

      {/* Header/Profile Banner */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-medium mb-8">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-slate-100 shrink-0 ring-4 ring-primary-50">
              <img
                src={official.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(official.name)}&size=160&background=DBEAFE&color=1D4ED8&bold=true`}
                alt={official.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(official.name)}&size=160&background=DBEAFE&color=1D4ED8&bold=true`;
                }}
              />
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
                {official.name}
              </h1>
              <div className="inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-full font-medium mb-4">
                {official.currentPosition} di {official.currentAgency}
              </div>
              <p className="text-slate-600 max-w-2xl">
                Profil ini menampilkan rekam jejak jabatan dan pemberitaan terkait pejabat yang bersangkutan berdasarkan data publik.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Track Records & Criminal Records */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900">Riwayat Jabatan</h3>
            </div>

            <div className="space-y-6">
              {trackRecords.map((record, idx) => (
                <div key={record.id} className="relative pl-6 border-l-2 border-slate-200 last:border-0 pb-6 last:pb-0">
                  <div className="absolute w-3 h-3 bg-white border-2 border-primary-500 rounded-full -left-[7.5px] top-1"></div>
                  <h4 className="font-bold text-slate-900 leading-tight">{record.position}</h4>
                  <p className="text-sm font-medium text-slate-600 mt-1">{record.agency}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(record.startDate)} - {formatDate(record.endDate)}</span>
                  </div>
                </div>
              ))}
              {trackRecords.length === 0 && (
                <p className="text-sm text-slate-500 italic">Belum ada data riwayat jabatan.</p>
              )}
            </div>
          </div>

          {/* Criminal Records Section */}
          {criminalRecords.length > 0 && (
            <div className="bg-red-50 rounded-2xl shadow-sm border border-red-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-red-900">Catatan Kriminal</h3>
              </div>

              <div className="space-y-6">
                {criminalRecords.map((record, idx) => (
                  <div key={record.id} className="relative pl-6 border-l-2 border-red-200 last:border-0 pb-6 last:pb-0">
                    <div className="absolute w-3 h-3 bg-red-50 border-2 border-red-500 rounded-full -left-[7.5px] top-1"></div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-red-900 leading-tight">{record.type}</h4>
                      <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full whitespace-nowrap">{record.status}</span>
                    </div>
                    <p className={`text-sm font-medium text-red-800 mt-1 ${!expandedCrimes[idx] ? 'line-clamp-2' : ''}`}>
                      {record.description}
                    </p>
                    <button
                      onClick={() => toggleCrime(idx)}
                      className="text-xs font-semibold text-red-600 hover:text-red-800 mt-1 underline underline-offset-2 transition-colors"
                    >
                      {expandedCrimes[idx] ? 'Hide' : 'See more'}
                    </button>
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-red-700">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(record.date)}</span>
                    </div>
                    {record.sourceUrl && (
                      <div className="mt-2 pt-2 border-t border-red-100 flex items-center gap-1.5 text-xs font-medium">
                        <LinkIcon className="w-3 h-3 text-red-600" />
                        <a href={record.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-red-900 hover:underline">
                          Sumber: {record.sourceName || 'Tautan Eksternal'}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: News */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="w-6 h-6 text-primary-600" />
            <h3 className="text-2xl font-bold text-slate-900">Sorotan Berita</h3>
          </div>

          <div className="space-y-4">
            {news.map(item => (
              <a
                key={item.id}
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-primary-200 transition-all group"
              >
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h4>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1
                    ${item.sentiment === 'Positif' ? 'bg-green-100 text-green-700' :
                      item.sentiment === 'Negatif' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'}`}
                  >
                    {item.sentiment === 'Positif' ? <ThumbsUp className="w-3 h-3" /> :
                      item.sentiment === 'Negatif' ? <ThumbsDown className="w-3 h-3" /> : null}
                    {item.sentiment}
                  </span>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {item.content}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.date)}
                    </span>
                    <span className="flex items-center gap-1.5 text-primary-600">
                      <LinkIcon className="w-3.5 h-3.5" />
                      {item.sourceName}
                    </span>
                  </div>
                </div>
              </a>
            ))}

            {news.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center text-slate-500">
                Belum ada berita terkait pejabat ini.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
