import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaSearch } from 'react-icons/fa';
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
  const [usersFiltred, setUsersFiltered] = useState<randomUserInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    randomUserApi.get('?nat=br&inc=name,email,dob,login,picture&results=50').then((res) => {
      const results = res.data.results;
      results.map((user: randomUserInterface) => {
        user.name.full = user.name.first + ' ' + user.name.last;
        return user;
      });
      setUsers(results);
      setUsersFiltered(results);
      setLoading(false);
    });
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const searchString = e.target.value;

    if (searchString === '') {
      setUsersFiltered(users);
      return;
    }

    const filtred = users.filter((user) => {
      if (user.name.full?.toLowerCase().includes(searchString.toLowerCase())) return true;
      if (user.email.toLowerCase().includes(searchString.toLowerCase())) return true;
      if (user.login.username.toLowerCase().includes(searchString.toLowerCase())) return true;
    });

    setUsersFiltered(filtred);
  }
  return (
    <div className="w-screen min-h-screen bg-gray-100">
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
          <section className="grid grid-cols-1 gap-4 mt-4 xxl:grid-cols-4 sm:grid-cols-2 lg:grid-cols-3">
            {usersFiltred.map((user) => (
              <article
                className="flex items-center gap-2 p-4 transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-lg hover:shadow-xl md:gap-4"
                key={user.login.uuid}>
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <img
                    src={user.picture.large}
                    alt={user.name.first + ' ' + user.name.last + ' foto'}
                  />
                </div>
                <div className="flex flex-col justify-center break-words">
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
          </section>
        )}
      </main>
    </div>
  );
};

export default Users;
