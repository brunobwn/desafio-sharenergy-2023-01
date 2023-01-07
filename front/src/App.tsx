import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './Context/AuthProvider';
import SignIn from './pages/SignIn';
import Status from './pages/Status';
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
          <Route
            path="/status"
            element={
              <RequireAuth>
                <Status />
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
