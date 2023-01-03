import React from 'react';
import logo from '../assets/logo_color.png';

const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-900 font-roboto">
      <div className="container-sm mx-4 w-96 rounded-lg bg-white p-4 shadow-lg">
        <img src={logo} alt="SharEnergy Logo" />
        <p className="mt-4 text-center text-lg">Faça login para continuar</p>
      </div>
    </div>
  );
};

export default SignIn;
