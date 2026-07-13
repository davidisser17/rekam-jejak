import { useEffect, useState } from 'react';
import { Check, Filter, Flame, Search, Users, X, Building2, UserCircle, Newspaper, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import OfficialCard from '../components/OfficialCard';
import { getOfficials, getMinistries, getHotFigures, getNewsByOfficialId } from '../firebase/services';

export default function Home() {
  const [officials, setOfficials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ministries, setMinistries] = useState([]);
  const [selectedMinistries, setSelectedMinistries] = useState([]);
  const [draftMinistries, setDraftMinistries] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hotFigures, setHotFigures] = useState([]);
  const [hotFigureNews, setHotFigureNews] = useState({});
  const [hotLoading, setHotLoading] = useState(true);

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const data = await getMinistries();
        setMinistries(data);
      } catch {
        // ministries gagal load, filter tidak akan muncul — tidak perlu error state terpisah
      }
    };

    fetchMinistries();
  }, []);

  useEffect(() => {
    const fetchHotFigures = async () => {
      setHotLoading(true);
      try {
        const figures = await getHotFigures();
        setHotFigures(figures);

        // Fetch latest news for each hot figure
        const newsMap = {};
        for (const figure of figures) {
          const news = await getNewsByOfficialId(figure.id);
          newsMap[figure.id] = news.slice(0, 2); // get top 2 latest news
        }
        setHotFigureNews(newsMap);
      } catch {
        // hot figures gagal load, section akan disembunyikan
      } finally {
        setHotLoading(false);
      }
    };

    fetchHotFigures();
  }, []);

  useEffect(() => {
    const fetchOfficials = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getOfficials(searchQuery, selectedMinistries);
        setOfficials(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchOfficials, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedMinistries]);

  const openFilter = () => {
    setDraftMinistries(selectedMinistries);
    setIsFilterOpen(true);
  };

  const toggleMinistry = (ministry) => {
    setDraftMinistries((current) => (
      current.includes(ministry)
        ? current.filter((item) => item !== ministry)
        : [...current, ministry]
    ));
  };

  const applyFilter = () => {
    setSelectedMinistries(draftMinistries);
    setIsFilterOpen(false);
  };

  const clearFilter = () => {
    setDraftMinistries([]);
    setSelectedMinistries([]);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = dateStr?.toDate ? dateStr.toDate() : new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200 pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Transparansi <span className="text-primary-600">Rekam Jejak</span> Pejabat
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Temukan profil, riwayat jabatan, dan berita terkini dari para pejabat pemerintahan di seluruh instansi Indonesia.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50 transition-all shadow-sm"
              placeholder="Cari nama pejabat atau instansi..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Hot Figure Section */}
      {!hotLoading && hotFigures.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-slate-900">Hot Figure</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotFigures.map((figure) => (
              <OfficialCard key={figure.id} official={figure} />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-slate-900">Direktori Pejabat</h2>
          </div>

          <button
            type="button"
            onClick={openFilter}
            className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-primary-100"
            aria-haspopup="dialog"
            aria-expanded={isFilterOpen}
          >
            <Filter className="h-5 w-5" />
            <span className="hidden sm:inline">Filter</span>
            {selectedMinistries.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1 text-xs font-bold text-white">
                {selectedMinistries.length}
              </span>
            )}
          </button>
        </div>

        {selectedMinistries.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-500">Filter aktif:</span>
            {selectedMinistries.map((ministry) => (
              <span key={ministry} className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                {ministry}
              </span>
            ))}
            <button type="button" onClick={clearFilter} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
              Hapus semua
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-red-200">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-slate-700 text-lg font-semibold mb-1">Gagal memuat data</p>
            <p className="text-slate-500 text-sm mb-6">Terjadi kesalahan saat mengambil data dari server. Silakan refresh halaman.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              Refresh Halaman
            </button>
          </div>
        ) : officials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officials.map((official) => <OfficialCard key={official.id} official={official} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
            <p className="text-slate-500 text-lg">Tidak ada pejabat yang ditemukan.</p>
          </div>
        )}
      </section>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" role="presentation" onMouseDown={() => setIsFilterOpen(false)}>
          <section
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
              <div>
                <h3 id="filter-title" className="text-lg font-bold text-slate-900">Filter instansi</h3>
                <p className="mt-1 text-sm text-slate-500">Pilih satu atau beberapa instansi.</p>
              </div>
              <button type="button" onClick={() => setIsFilterOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label="Tutup filter">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="max-h-[55vh] overflow-y-auto px-6 py-4">
              <div className="space-y-2">
                {ministries.map((ministry) => {
                  const checked = draftMinistries.includes(ministry);
                  return (
                    <label key={ministry} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-slate-50">
                      <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleMinistry(ministry)} />
                      <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${checked ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300 bg-white'}`}>
                        {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                      <span className="text-sm font-medium text-slate-700">{ministry}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <footer className="flex items-center justify-between gap-4 border-t border-slate-100 px-6 py-4">
              <button type="button" onClick={() => setDraftMinistries([])} className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                Reset
              </button>
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsFilterOpen(false)} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                  Batal
                </button>
                <button type="button" onClick={applyFilter} className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-100">
                  Terapkan{draftMinistries.length > 0 ? ` (${draftMinistries.length})` : ''}
                </button>
              </div>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
