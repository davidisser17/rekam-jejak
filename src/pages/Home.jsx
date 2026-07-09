import { useState, useEffect } from 'react';
import { Search, Users } from 'lucide-react';
import OfficialCard from '../components/OfficialCard';
import { getOfficials, getMinistries } from '../firebase/services';

export default function Home() {
  const [officials, setOfficials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [ministries, setMinistries] = useState([]);
  const [selectedMinistry, setSelectedMinistry] = useState('');

  // Fetch daftar kementerian saat komponen dimuat
  useEffect(() => {
    const fetchMinistries = async () => {
      const data = await getMinistries();
      setMinistries(data);
    };

    fetchMinistries();
  }, []);

  useEffect(() => {
    const fetchOfficials = async () => {
      setLoading(true);
      const data = await getOfficials(searchQuery, selectedMinistry);
      setOfficials(data);
      setLoading(false);
    };

    // Debounce search slightly
    const timer = setTimeout(() => {
      fetchOfficials();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedMinistry]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-slate-900">Direktori Pejabat</h2>
        </div>

        {/* Tab Filter Kementerian */}
        <div className="mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedMinistry('')}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedMinistry === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Semua
            </button>
            {ministries.map((ministry) => (
              <button
                key={ministry}
                onClick={() => setSelectedMinistry(ministry)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedMinistry === ministry
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {ministry}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : officials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officials.map(official => (
              <OfficialCard key={official.id} official={official} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
            <p className="text-slate-500 text-lg">Tidak ada pejabat yang ditemukan.</p>
          </div>
        )}
      </section>
    </div>
  );
}
