import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/DashBoard';
import Emissions from './pages/Emissions';
import Sinks from './pages/Sinks';
import Neutralisation from './pages/Neutralisation';
import Reports from './pages/Reports';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard />;
      case 'emissions':
        return <Emissions />;
      case 'sinks':
        return <Sinks />;
      case 'neutralisation':
        return <Neutralisation />;
      case 'reports':
        return <Reports />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default App;