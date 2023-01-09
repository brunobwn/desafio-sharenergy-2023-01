import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_color.png';
import { useAuth } from '../Context/AuthProvider/useAuth';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lembrar, setLembrar] = useState(true);
  const [error, setError] = useState('');
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    authenticate(username, password, lembrar)
      .then(() => {
        navigate('/');
      })
      .catch((error: Error) => {
        setError(error.message);
      });
  }

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-right-top bg-cover bg-waves bg-blobs font-roboto">
      <div className="p-4 mx-4 bg-white rounded-lg shadow-lg container-sm w-96">
        <img src={logo} alt="SharEnergy Logo" className="w-full" />
        <p className="mt-4 text-lg text-center">Faça login para continuar</p>
        <form onSubmit={handleSignIn} method="POST" className="flex flex-col gap-4 mt-4">
          {error ? <p className="text-sm font-semibold text-center text-red-600">{error}</p> : null}
          <input
            type="text"
            name="username"
            id="username"
            className="w-full px-4 py-2 border rounded-lg shadow-sm border-cyan"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            className="w-full px-4 py-2 border rounded-lg shadow-sm border-cyan"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <fieldset>
            <input
              type="checkbox"
              name="lembrar"
              id="lembrar"
              className="rounded text-cyan focus:ring-cyan"
              checked={lembrar}
              onChange={() => setLembrar(!lembrar)}
            />
            <label htmlFor="lembrar" className="ml-2">
              Lembrar-me
            </label>
          </fieldset>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white border rounded-lg shadow-sm bg-cyan/90 font-roboto hover:bg-cyan">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
