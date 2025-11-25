import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Emissions from './pages/Emissions';
import Sinks from './pages/Sinks';
import Neutralisation from './pages/Neutralisation';
import Reports from './pages/Reports';
import Login from './pages/Login';
import MapPage from './pages/MapPage';
import AmbeePage from './pages/AmbeePage';
import Dashboard from './pages/Dashboard';

import { EmissionsProvider } from './EmissionsContext';

function App() {
  return (
    <div className="min-h-screen">
      {/* Wrap inside provider */}
      <EmissionsProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/emissions" element={<Emissions />} />
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/sinks" element={<Sinks />} />
                  <Route path="/neutralisation" element={<Neutralisation />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/ambee" element={<AmbeePage />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </EmissionsProvider>
    </div>
  );
}

export default App;
