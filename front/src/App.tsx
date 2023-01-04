import { AuthProvider } from './Context/AuthProvider';
import SignIn from './pages/SignIn';

function App() {
  return (
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  );
}

export default App;
