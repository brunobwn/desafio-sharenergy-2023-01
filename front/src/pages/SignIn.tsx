import React, { useState } from 'react';
import logo from '../assets/logo_color.png';
import { useAuth } from '../Context/AuthProvider/useAuth';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lembrar, setLembrar] = useState(true);
  const [error, setError] = useState('');
  const { authenticate } = useAuth();

  function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    authenticate(username, password, lembrar).then((data) => {
      if (typeof data !== 'string') setError('Usuário e/ou senha inválidos');
    });
  }

  return (
    <div className="bg-waves relative flex h-screen w-screen items-center justify-center bg-blobs bg-cover bg-right-top font-roboto">
      <div className="container-sm mx-4 w-96 rounded-lg bg-white p-4 shadow-lg">
        <img src={logo} alt="SharEnergy Logo" className="w-full" />
        <p className="mt-4 text-center text-lg">Faça login para continuar</p>
        <form onSubmit={handleSignIn} method="POST" className="mt-4 flex flex-col gap-4">
          {error ? <p className="text-center text-sm font-semibold text-red-600">{error}</p> : null}
          <input
            type="text"
            name="username"
            id="username"
            className="w-full rounded-lg border border-cyan px-4 py-2 shadow-sm"
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
            className="w-full rounded-lg border border-cyan px-4 py-2 shadow-sm"
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
            className="w-full rounded-lg border bg-cyan/90 px-4 py-2 font-roboto font-semibold text-white shadow-sm hover:bg-cyan">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
