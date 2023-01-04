import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './Context/AuthProvider';
import SignIn from './pages/SignIn';
import UsersList from './pages/UsersList';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/UsersList"
            element={
              <RequireAuth>
                <UsersList />
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
