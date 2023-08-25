import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <div className="">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
