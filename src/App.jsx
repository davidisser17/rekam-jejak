import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import OfficialDetail from './pages/OfficialDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pejabat/:id" element={<OfficialDetail />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} RekamPejabat. Portal informasi transparansi rekam jejak pejabat Indonesia.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
