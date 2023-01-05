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
    <header className="text-gray-600 body-font">
      <div className="container flex flex-wrap items-center p-5 mx-auto">
        <Link to="/" className="flex items-center w-1/2 md:w-auto">
          <img src={logo} alt="SharEnergy logo" className="w-32" />
        </Link>
        <nav className="flex flex-wrap items-center justify-center order-2 w-full mt-4 text-base md:mt-0 md:mr-auto md:ml-4 md:w-auto md:border-l md:border-gray-400 md:py-1 md:pl-4">
          {pages.map((page) => (
            <NavLink
              to={page.link}
              className={({ isActive }) =>
                isActive ? 'mr-5 font-semibold hover:text-gray-900' : 'mr-5 hover:text-gray-900'
              }>
              {page.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center justify-end order-1 w-1/2 md:order-3 md:w-auto">
          <button
            onClick={() => auth.logout()}
            className="inline-flex items-center px-3 py-1 text-base bg-gray-100 border-0 rounded shadow-sm hover:bg-gray-200 focus:outline-none">
            Sair
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
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