import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/DashBoard';
import Emissions from './pages/Emissions';
import Sinks from './pages/Sinks';
import Neutralisation from './pages/Neutralisation';
import Reports from './pages/Reports';
import Login from './pages/Login';
import MapPage from './pages/MapPage';
import ClimatiqPage from './pages/ClimatiqPage';
import AmbeePage from './pages/AmbeePage';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/emissions" element={<Emissions />} />
                <Route path="/sinks" element={<Sinks />} />
                <Route path="/neutralisation" element={<Neutralisation />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/climatiq" element={<ClimatiqPage />} />
                <Route path="/ambee" element={<AmbeePage />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;