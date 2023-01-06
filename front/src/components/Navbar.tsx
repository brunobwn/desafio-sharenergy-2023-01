import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo_color.png';
import { useAuth } from '../Context/AuthProvider/useAuth';

const pages = [
  { name: 'Users List', link: '/' },
  { name: 'Status Code', link: '/status' },
  { name: 'Random Dog', link: '/dog' },
];

const Navbar: React.FC = () => {
  const auth = useAuth();

  return (
    <header className="body-font text-gray-600">
      <div className="container mx-auto flex flex-wrap items-center p-5">
        <Link to="/" className="flex w-1/2 items-center md:w-auto">
          <img src={logo} alt="SharEnergy logo" className="w-32" />
        </Link>
        <nav className="order-2 mt-4 flex w-full flex-wrap items-center justify-center text-base md:mt-0 md:mr-auto md:ml-4 md:w-auto md:border-l md:border-gray-400 md:py-1 md:pl-4">
          {pages.map((page, index) => (
            <NavLink
              key={index}
              to={page.link}
              className={({ isActive }) =>
                isActive ? 'mr-5 font-semibold hover:text-gray-900' : 'mr-5 hover:text-gray-900'
              }>
              {page.name}
            </NavLink>
          ))}
        </nav>
        <div className="order-1 flex w-1/2 items-center justify-end md:order-3 md:w-auto">
          <button
            onClick={() => auth.logout()}
            className="inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base shadow-sm hover:bg-gray-200 focus:outline-none">
            Sair
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="ml-1 h-4 w-4"
              viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
