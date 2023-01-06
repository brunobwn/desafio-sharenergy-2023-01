import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginadorProps {
  qtdPorPagina: number;
  qtdRegistros: number;
  paginaAtual: number;
  inicioIndex: number;
  fimIndex: number;
  handlePaginaAnterior: () => void;
  handlePaginaSeguinte: () => void;
}

const Paginador: React.FC<PaginadorProps> = ({
  qtdPorPagina,
  qtdRegistros,
  paginaAtual,
  inicioIndex,
  fimIndex,
  handlePaginaAnterior,
  handlePaginaSeguinte,
}) => {
  const ultimaPagina = Math.ceil(qtdRegistros / qtdPorPagina);

  return (
    <div className="flex flex-col items-center mt-2 sm:col-span-2 lg:col-span-3 xl:col-span-4">
      {qtdRegistros > 0 ? (
        <span className="text-sm text-gray-700">
          Visualizando <span className="font-semibold text-gray-900 ">{inicioIndex + 1}</span> a{' '}
          <span className="font-semibold text-gray-900 ">
            {fimIndex <= qtdRegistros ? fimIndex : qtdRegistros}
          </span>{' '}
          de <span className="font-semibold text-gray-900">{qtdRegistros}</span> registros
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
          disabled={paginaAtual === ultimaPagina || !qtdRegistros}
          onClick={() => handlePaginaSeguinte()}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border-0 border-l border-gray-400 rounded-r hover:bg-gray-200 focus:outline-none">
          Próximo
          <FaArrowRight className="ml-2 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Paginador;
