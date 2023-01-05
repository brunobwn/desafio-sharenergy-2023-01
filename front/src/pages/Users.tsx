import React from 'react';
import Navbar from '../components/Navbar';
import { FaSearch } from 'react-icons/fa';

const Users: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <Navbar />
      <main className="container px-5 mx-auto mt-4">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <h1 className="mb-3 text-xl sm:mb-0 md:mb-0">Lista de usuários</h1>
          <fieldset className="relative w-full max-w-xs">
            <input
              type="text"
              name="searchUser"
              className="w-full pr-10 border rounded-lg shadow-sm border-cyan focus:border-cyan focus:ring-1 focus:ring-cyan"
              placeholder="Pesquisar"
            />
            <FaSearch className="absolute -translate-y-1/2 right-4 top-1/2" color="#2da9a9" />
          </fieldset>
        </div>
        <section className="grid grid-cols-1 gap-4 mt-4 xxl:grid-cols-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="flex p-4 transition-shadow duration-300 ease-in-out bg-white rounded rounded-lg shadow-lg hover:shadow-xl">
            <img
              src="https://randomuser.me/api/portraits/med/men/35.jpg"
              alt="fulano"
              className="w-32 rounded-full"
            />
            <div className="flex flex-col justify-center ml-4">
              <p className="font-semibold">Carter Lo</p>
              <p className="text-sm italic opacity-80">50 anos</p>
              <p className="text-sm">yellowkoala207</p>
              <p className="text-sm">carter.lo@example.com</p>
            </div>
          </article>
          <article className="flex p-4 transition-shadow duration-300 ease-in-out bg-white rounded rounded-lg shadow-lg hover:shadow-xl">
            <img
              src="https://randomuser.me/api/portraits/med/men/35.jpg"
              alt="fulano"
              className="w-32 rounded-full"
            />
            <div className="flex flex-col justify-center ml-4">
              <p className="font-semibold">Carter Lo</p>
              <p className="text-sm italic opacity-80">50 anos</p>
              <p className="text-sm">yellowkoala207</p>
              <p className="text-sm">carter.lo@example.com</p>
            </div>
          </article>
          <article className="flex p-4 transition-shadow duration-300 ease-in-out bg-white rounded rounded-lg shadow-lg hover:shadow-xl">
            <img
              src="https://randomuser.me/api/portraits/med/men/35.jpg"
              alt="fulano"
              className="w-32 rounded-full"
            />
            <div className="flex flex-col justify-center ml-4">
              <p className="font-semibold">Carter Lo</p>
              <p className="text-sm italic opacity-80">50 anos</p>
              <p className="text-sm">yellowkoala207</p>
              <p className="text-sm">carter.lo@example.com</p>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Users;
