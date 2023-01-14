import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaSearch } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';
import Paginador from '../components/Paginador';
import { useAuth } from '../Context/AuthProvider/useAuth';
import { api } from '../api';
import { AxiosError, AxiosResponse } from 'axios';
import ClientCard from '../components/ClientCard';
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
    updateClients();
  }, []);

  function updateClients() {
    api
      .get('client', {
        headers: { Authorization: 'Bearer ' + auth.token },
      })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setClients(res.data);
          setClientsFiltered(res.data);
        }
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) auth.logout();
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const searchString = e.target.value;

    if (searchString === '') {
      setClientsFiltered(clients);
      return;
    }

    // compare if string2 exists in string1
    function includesSearchString(string1: string, string2: string) {
      return string1.toLowerCase().includes(string2.toLowerCase());
    }

    const filtered = clients.filter(
      (client) =>
        includesSearchString(client.nome, searchString) ||
        includesSearchString(client.email, searchString) ||
        includesSearchString(client.cpf, searchString)
    );

    setClientsFiltered(filtered);
    setPaginaAtual(1);
  }

  function handleClickCard(id: string) {
    const client = clients.find((client) => client._id === id);
    if (client) {
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
    setClientEdit(null);
  }

  function handlePaginaAnterior() {
    if (paginaAtual === 1) return;
    setPaginaAtual(paginaAtual - 1);
  }

  function handlePaginaSeguinte() {
    const ultimaPagina = Math.ceil(clientsFiltered.length / NUM_REGISTRO_POR_PAGINA);
    if (paginaAtual === ultimaPagina) return;
    setPaginaAtual(paginaAtual + 1);
  }

  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-100 pb-8">
        <Navbar />
        <main className="container mx-auto mt-4 min-h-full px-5">
          <div className="flex flex-col sm:flex-row">
            <h1 className="mb-3 w-full text-xl sm:mb-0 md:mb-0 md:w-fit">Lista de clientes</h1>
            <fieldset className="relative ml-auto mr-4 h-fit w-full md:max-w-xs">
              <input
                type="text"
                name="searchUser"
                className="w-full rounded-lg border border-cyan shadow-sm focus:border-cyan focus:ring-1 focus:ring-cyan"
                placeholder="Pesquisar (Nome/E-mail/CPF)"
                onChange={(e) => handleSearch(e)}
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2" color="#2da9a9" />
            </fieldset>
            <button
              type="button"
              className="mt-4 rounded-lg border bg-cyan px-3 py-2 text-white opacity-90 shadow-sm hover:opacity-100 hover:shadow-lg focus:border-cyan focus:ring-1 focus:ring-cyan md:mt-0"
              onClick={handleClickCadastro}>
              Cadastrar novo
            </button>
          </div>
          {loading ? (
            <div className="mt-4 grid place-items-center p-8 md:mt-12">
              <CgSpinner className="h-12 w-12 animate-spin" color="#2da9a9" />
            </div>
          ) : (
            <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3 xl:grid-cols-4">
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
                handlePaginaAnterior={handlePaginaAnterior}
                handlePaginaSeguinte={handlePaginaSeguinte}
              />
            </section>
          )}
          {error !== '' && (
            <div className="mt-4 text-center text-sm text-red-800">
              <p>Erro de servidor, tente novamente</p>
              <p>{error}</p>
            </div>
          )}
        </main>
      </div>
      <ClientModal
        isOpen={modalOpen}
        data={clientEdit}
        updateClients={updateClients}
        closeModal={handleModalClose}
        preventScroll={true}
        shouldCloseOnOverlayClick={true}
        contentLabel="Formulário edição de conteúdo"
      />
    </React.Fragment>
  );
};

export default Clients;
