import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { Toaster } from './components/ui/toaster';
import { AppProvider } from './context/AppState';
import { ColorPickerProvider } from './context/ColorPicker';
import Auth from './pages/Auth';
import ColorPicker from './pages/ColorPicker';
import Dashboard from './pages/Dashboard';
import GradientGenerator from './pages/GradientGenerator';
import Home from './pages/Home';
import PaletteGenerator from './pages/PaletteGenerator';
import ProfilePage from './pages/ProfilePage';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${ token }` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className='flex-1 flex'>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/auth"
                  element={<Auth />}
                />
                <Route
                  path="/profile"
                  element={<ProfilePage />}
                />
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />
                <Route
                  path="/color-picker"
                  element={
                    <ColorPickerProvider>
                      <ColorPicker />
                    </ColorPickerProvider>
                  }
                />
                <Route
                  path="/palette-generator"
                  element={<PaletteGenerator />}
                />
                <Route
                  path="/gradient-generator"
                  element={<GradientGenerator />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
        <Toaster />
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
