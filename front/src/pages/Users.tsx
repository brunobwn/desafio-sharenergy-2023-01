import React from 'react';
import Navbar from '../components/Navbar';

const Users: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-100">
      <Navbar />
      <h1>Users List</h1>
    </div>
  );
};

export default Users;
