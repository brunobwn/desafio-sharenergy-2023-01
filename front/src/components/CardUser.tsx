import React from 'react';

interface CardUserProps {
  fullName: string;
  picture: string;
  age: number;
  username: string;
  email: string;
}

const CardUser: React.FC<CardUserProps> = ({ picture, fullName, age, username, email }) => {
  return (
    <article className="flex items-center gap-2 p-4 transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-lg hover:shadow-xl md:gap-3">
      <div className="w-16 h-16 overflow-hidden border-2 rounded-full shadow-sm">
        <img src={picture} alt={fullName + ' foto'} />
      </div>
      <div className="flex flex-col justify-center w-2/3 break-words">
        <p className="font-semibold">{fullName}</p>
        <p className="text-sm italic opacity-80">{age + ' anos'}</p>
        <p className="text-sm">
          <span className="text-xs opacity-70">User: </span>
          {username}
        </p>
        <p className="text-sm">{email}</p>
      </div>
    </article>
  );
};

export default CardUser;
