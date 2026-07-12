import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              Rekam<span className="text-primary-600">Pejabat</span>
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
}
