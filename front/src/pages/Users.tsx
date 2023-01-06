import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import { randomUserApi } from '../api';

const NUM_REGISTRO_POR_PAGINA = 12;
const NUM_REGISTRO_CONSULTA_API = 150;

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

  const [paginaAtual, setPaginaAtual] = useState(1);

  const inicioIndex = (paginaAtual - 1) * NUM_REGISTRO_POR_PAGINA;
  const fimIndex = paginaAtual * NUM_REGISTRO_POR_PAGINA;

  const pageItems = usersFiltered.slice(inicioIndex, fimIndex);

  useEffect(() => {
    randomUserApi
      .get(`?nat=br&inc=name,email,dob,login,picture&results=${NUM_REGISTRO_CONSULTA_API}`)
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

    function includesSearchString(string1: string, string2: string) {
      return string1.toLowerCase().includes(string2.toLowerCase());
    }

    const filtered = users.filter(
      (user) =>
        includesSearchString(user.name.full!, searchString) ||
        includesSearchString(user.email, searchString) ||
        includesSearchString(user.login.username, searchString)
    );

    setUsersFiltered(filtered);
    setPaginaAtual(1);
  }

  function handlePaginaAnterior() {
    if (paginaAtual === 1) return;
    setPaginaAtual(paginaAtual - 1);
  }

  const ultimaPagina = Math.ceil(usersFiltered.length / NUM_REGISTRO_POR_PAGINA);

  function handlePaginaSeguinte() {
    if (paginaAtual === ultimaPagina) return;
    setPaginaAtual(paginaAtual + 1);
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
          <section className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 xl:grid-cols-4">
            {pageItems.map((user) => (
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
                  <p className="font-semibold">{user.name.full}</p>
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
            <div className="flex flex-col items-center mt-2 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              {usersFiltered.length > 0 ? (
                <span className="text-sm text-gray-700">
                  Visualizando{' '}
                  <span className="font-semibold text-gray-900 ">{inicioIndex + 1}</span> a{' '}
                  <span className="font-semibold text-gray-900 ">
                    {fimIndex <= usersFiltered.length ? fimIndex : usersFiltered.length}
                  </span>{' '}
                  de <span className="font-semibold text-gray-900">{usersFiltered.length}</span>{' '}
                  registros
                </span>
              ) : (
                <span className="text-sm text-gray-700">Nenhum registro encontrado</span>
              )}
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  disabled={paginaAtual === 1}
                  onClick={() => handlePaginaAnterior()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-l hover:bg-gray-200 focus:outline-none">
                  <FaArrowLeft className="mr-2 text-gray-600" />
                  Anterior
                </button>
                <button
                  disabled={paginaAtual === ultimaPagina || !usersFiltered.length}
                  onClick={() => handlePaginaSeguinte()}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border-0 border-l border-gray-400 rounded-r hover:bg-gray-200 focus:outline-none">
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
