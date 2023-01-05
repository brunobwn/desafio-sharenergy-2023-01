import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { randomUserApi } from '../api';

interface randomUserInterface {
  name: {
    title: string;
    first: string;
    last: string;
    full?: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
  };
  picture: {
    medium: string;
    large: string;
    thumbnail: string;
  };
  dob: {
    age: number;
    date: Date;
  };
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<randomUserInterface[]>([]);
  const [usersFiltered, setUsersFiltered] = useState<randomUserInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    randomUserApi
      .get('?nat=br&inc=name,email,dob,login,picture&results=50')
      .then((res) => {
        const results: randomUserInterface[] = res.data.results;
        results.map((user: randomUserInterface) => {
          user.name.full = user.name.first + ' ' + user.name.last;
          return user;
        });
        setUsers(results);
        setUsersFiltered(results);
        setLoading(false);
      })
      .catch((error) => {
        setError(String(error));
      });
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const searchString = e.target.value;

    if (searchString === '') {
      setUsersFiltered(users);
      return;
    }

    const filtered = users.filter((user) => {
      if (user.name.full?.toLowerCase().includes(searchString.toLowerCase())) return true;
      if (user.email.toLowerCase().includes(searchString.toLowerCase())) return true;
      if (user.login.username.toLowerCase().includes(searchString.toLowerCase())) return true;
      return false;
    });

    setUsersFiltered(filtered);
  }
  return (
    <div className="min-h-screen pb-8 bg-gray-100">
      <Navbar />
      <main className="container min-h-full px-5 mx-auto mt-4">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <h1 className="mb-3 text-xl sm:mb-0 md:mb-0">Lista de usuários</h1>
          <fieldset className="relative w-full max-w-xs">
            <input
              type="text"
              name="searchUser"
              className="w-full pr-10 border rounded-lg shadow-sm border-cyan focus:border-cyan focus:ring-1 focus:ring-cyan"
              placeholder="Pesquisar"
              onChange={(e) => handleSearch(e)}
            />
            <FaSearch className="absolute -translate-y-1/2 right-4 top-1/2" color="#2da9a9" />
          </fieldset>
        </div>
        {loading ? (
          <div className="grid p-8 mt-4 place-items-center md:mt-12">
            <CgSpinner className="w-12 h-12 animate-spin" color="#2da9a9" />
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-4 mt-4 xxl:grid-cols-4 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
            {usersFiltered.map((user) => (
              <article
                className="flex items-center gap-2 p-4 transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-lg hover:shadow-xl md:gap-3"
                key={user.login.uuid}>
                <div className="w-16 h-16 overflow-hidden border-2 rounded-full shadow-sm">
                  <img
                    src={user.picture.large}
                    alt={user.name.first + ' ' + user.name.last + ' foto'}
                  />
                </div>
                <div className="flex flex-col justify-center w-2/3 break-words">
                  <p className="font-semibold">{user.name.first + ' ' + user.name.last}</p>
                  <p className="text-sm italic opacity-80">{user.dob.age + ' anos'}</p>
                  <p className="text-sm">
                    <span className="text-xs opacity-70">User: </span>
                    {user.login.username}
                  </p>
                  <p className="text-sm">{user.email}</p>
                </div>
              </article>
            ))}
            {/* Paginador */}
            <div className="flex flex-col items-center col-span-3 mt-2">
              <span className="text-sm text-gray-700">
                Visualizando <span className="font-semibold text-gray-900 ">1</span> a{' '}
                <span className="font-semibold text-gray-900 ">10</span> de{' '}
                <span className="font-semibold text-gray-900">{usersFiltered.length}</span>{' '}
                registros
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-l hover:bg-gray-100">
                  <FaArrowLeft className="mr-2 text-gray-600" />
                  Anterior
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border-0 border-l border-gray-400 rounded-r hover:bg-gray-200">
                  Próximo
                  <FaArrowRight className="ml-2 text-gray-600" />
                </button>
              </div>
            </div>
          </section>
        )}
        {error !== '' && (
          <div className="mt-4 text-sm text-center text-red-800">
            Não foi possível consultar API
          </div>
        )}
      </main>
    </div>
  );
};

export default Users;
