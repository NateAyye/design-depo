import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import { Toaster } from './components/ui/toaster';
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className='flex-1'>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/auth"
                element={<Auth />}
              />
            </Routes>
          </main>
        </div>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
