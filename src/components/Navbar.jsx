import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
              R
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              Rekam<span className="text-primary-600">Pejabat</span>
            </span>
          </Link>
          
          <div className="hidden md:block">
            <Link to="/" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
              Beranda
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
