import { Link } from 'react-router-dom';
import { Building2, UserCircle, Flag } from 'lucide-react';
import { toOfficialParam } from '../utils/slug';

export default function OfficialCard({ official }) {
  return (
    <Link 
      to={`/pejabat/${toOfficialParam(official.name, official.id)}`}
      className="group block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:border-primary-200 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 ring-4 ring-slate-50 group-hover:ring-primary-50 transition-all">
            {official.photoUrl ? (
              <img 
                src={official.photoUrl} 
                alt={official.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
            ) : (
              <UserCircle className="w-full h-full text-slate-400 p-2" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
              {official.name}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span className="truncate">{official.currentAgency}</span>
            </p>
            <p className="text-sm text-slate-600 mt-2 bg-slate-50 inline-block px-2.5 py-1 rounded-md border border-slate-100">
              {official.currentPosition}
            </p>
            {official.party && (
              <p className="text-xs font-semibold text-slate-500 mt-2 flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 shrink-0" />
                <span>{official.party}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
