import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaSearch } from 'react-icons/fa';
import { CgSpinner, CgClose } from 'react-icons/cg';
import Paginador from '../components/Paginador';
import { useAuth } from '../Context/AuthProvider/useAuth';
import { api } from '../api';
import { AxiosError, AxiosResponse } from 'axios';
import ClientCard from '../components/ClientCard';
import Modal from 'react-modal';
import ClientModal from '../components/ClientModal';

const NUM_REGISTRO_POR_PAGINA = 12;

export interface ClientInterface {
  _id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
  createdAt: Date;
  __v: number;
  editedAt?: Date;
}

const Clients: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [clients, setClients] = useState<ClientInterface[]>([]);
  const [clientsFiltered, setClientsFiltered] = useState<ClientInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clientEdit, setClientEdit] = useState<ClientInterface | null>(null);

  const [paginaAtual, setPaginaAtual] = useState(1);

  const inicioIndex = (paginaAtual - 1) * NUM_REGISTRO_POR_PAGINA;
  const fimIndex = paginaAtual * NUM_REGISTRO_POR_PAGINA;
  const pageItems = clientsFiltered.slice(inicioIndex, fimIndex);

  const auth = useAuth();

  useEffect(() => {
    api
      .get('client', {
        headers: { Authorization: 'Bearer ' + auth.token },
      })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setClients(res.data);
          setClientsFiltered(res.data);
          setLoading(false);
        }
      })
      .catch((error: AxiosError) => {
        setError(error.name);
      });
  }, []);

  function handleSearch() {}

  function handleClickCard(id: string) {
    const client = clients.find((client) => client._id === id);
    if (client) {
      console.log(client);
      setClientEdit(client);
      setModalOpen(true);
    }
  }

  function handleClickCadastro() {
    setClientEdit(null);
    setModalOpen(true);
  }

  function handleModalClose() {
    if (!modalOpen) return;
    setModalOpen(false);
  }

  return (
    <React.Fragment>
      <div className="min-h-screen pb-8 bg-gray-100">
        <Navbar />
        <main className="container min-h-full px-5 mx-auto mt-4">
          <div className="flex flex-col sm:flex-row">
            <h1 className="w-full mb-3 text-xl sm:mb-0 md:mb-0 md:w-fit">Lista de clientes</h1>
            <fieldset className="relative w-full ml-auto mr-4 h-fit md:max-w-xs">
              <input
                type="text"
                name="searchUser"
                className="w-full border rounded-lg shadow-sm border-cyan focus:border-cyan focus:ring-1 focus:ring-cyan"
                placeholder="Pesquisar"
                onChange={() => handleSearch()}
              />
              <FaSearch className="absolute -translate-y-1/2 right-4 top-1/2" color="#2da9a9" />
            </fieldset>
            <button
              type="button"
              className="px-3 py-2 mt-4 text-white border rounded-lg shadow-sm bg-cyan opacity-90 hover:opacity-100 hover:shadow-lg focus:border-cyan focus:ring-1 focus:ring-cyan md:mt-0"
              onClick={handleClickCadastro}>
              Cadastrar novo
            </button>
          </div>
          {loading ? (
            <div className="grid p-8 mt-4 place-items-center md:mt-12">
              <CgSpinner className="w-12 h-12 animate-spin" color="#2da9a9" />
            </div>
          ) : (
            <section className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 xl:grid-cols-4">
              {pageItems.map((client) => (
                <ClientCard
                  key={client._id}
                  data={client}
                  click={() => handleClickCard(client._id)}
                />
              ))}
              <Paginador
                qtdPorPagina={NUM_REGISTRO_POR_PAGINA}
                qtdRegistros={clientsFiltered.length}
                paginaAtual={paginaAtual}
                inicioIndex={inicioIndex}
                fimIndex={fimIndex}
                handlePaginaAnterior={() => {}}
                handlePaginaSeguinte={() => {}}
              />
            </section>
          )}
          {error !== '' && (
            <div className="mt-4 text-sm text-center text-red-800">
              <p>Erro de servidor, tente novamente</p>
              <p>{error}</p>
            </div>
          )}
        </main>
      </div>
      <ClientModal
        isOpen={modalOpen}
        data={clientEdit}
        closeModal={handleModalClose}
        preventScroll={true}
        shouldCloseOnOverlayClick={true}
        contentLabel="Formulário edição de conteúdo"
      />
    </React.Fragment>
  );
};

export default Clients;
