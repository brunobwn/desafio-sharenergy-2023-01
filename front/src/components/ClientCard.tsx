import React from 'react';
import { ClientInterface } from '../pages/Clients';
import { FiEdit } from 'react-icons/fi';

interface ClientCardProps {
  data: ClientInterface;
  click: (_id: string) => void;
}
const ClientCard: React.FC<ClientCardProps> = ({ data, click }) => {
  const { _id, nome, email, endereco, telefone, cpf } = data;

  return (
    <article
      className="g-2 relative flex cursor-pointer flex-col break-words rounded-lg bg-white p-4 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl md:gap-3"
      onClick={() => click(_id)}>
      <FiEdit className="absolute right-4 top-4" />
      <div>
        <p className="text-xs italic opacity-70">Nome:</p>
        <p className="font-semibold">{nome}</p>
      </div>
      <div>
        <p className="text-xs italic opacity-70">E-mail:</p>
        <p className="text-sm">{email}</p>
      </div>
      <div>
        <p className="text-xs italic opacity-70">Endereço:</p>
        <p className="text-sm">{endereco}</p>
      </div>
      <div className="flex">
        <div className="flex-1 pr-1">
          <p className="text-xs italic opacity-70">Telefone:</p>
          <p className="text-sm">{telefone}</p>
        </div>
        <div className="flex-1 pl-1">
          <p className="text-xs italic opacity-70">CPF:</p>
          <p className="text-sm">{cpf}</p>
        </div>
      </div>
    </article>
  );
};

export default ClientCard;
