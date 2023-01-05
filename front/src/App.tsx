import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './Context/AuthProvider';
import SignIn from './pages/SignIn';
import Users from './pages/Users';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
