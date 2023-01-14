import { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import { CgClose, CgSpinner } from 'react-icons/cg';
import ReactModal from 'react-modal';
import { api } from '../api';
import { useAuth } from '../Context/AuthProvider/useAuth';
import { ClientInterface } from '../pages/Clients';

interface ClientModalProps extends ReactModal.Props {
  isOpen: boolean;
  updateClients: () => void;
  closeModal: () => void;
  data?: ClientInterface | null;
}

const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  data,
  closeModal,
  updateClients,
  ...props
}) => {
  const auth = useAuth();

  ReactModal.setAppElement('#root');
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const [deleteClient, setDeleteClient] = useState(false);

  useEffect(() => {
    setId(data?._id ?? '');
    setNome(data?.nome ?? '');
    setEmail(data?.email ?? '');
    setEndereco(data?.endereco ?? '');
    setTelefone(data?.telefone ?? '');
    setCpf(data?.cpf ?? '');
    setError('');
    setLoading(false);
  }, [data]);

  function resetForm() {
    setId('');
    setNome('');
    setEmail('');
    setEndereco('');
    setTelefone('');
    setCpf('');
    setError('');
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (!nome || !email || !telefone || !endereco || !cpf) {
      setError('Todos os campos devem ser preenchidos');
      setLoading(false);
      return;
    }

    const client = {
      _id: id,
      nome,
      email,
      endereco,
      telefone,
      cpf,
    };

    await api
      .post(
        'client',
        { ...client },
        {
          headers: { Authorization: 'Bearer ' + auth.token },
        }
      )
      .then((res: AxiosResponse) => {
        if (res.status === 201) {
          updateClients();
          closeModal();
          resetForm();
        }
      })
      .catch((error) => {
        const data = error.response.data;
        if (data?.status === 401) auth.logout();
        if (data?.message) {
          setError(data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // fallback if close modal while confirming a exclusion of client
  function handleCloseModal() {
    setDeleteClient(false);
    closeModal();
  }

  function confirmDeleteClient() {
    setDeleteClient(true);
  }

  async function handleDelete() {
    if (!id) return;
    await api
      .delete(encodeURI('client/' + id), {
        headers: { Authorization: 'Bearer ' + auth.token },
      })
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          resetForm();
          updateClients();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      })
      .finally(() => {
        setDeleteClient(false);
        closeModal();
      });
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      className="fixed top-0 left-0 flex items-center justify-center w-full h-full"
      {...props}>
      <div className="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
        <div
          className="absolute top-0 right-0 z-50 flex flex-col items-center mt-4 mr-4 text-sm text-gray-500 cursor-pointer modal-close"
          onClick={handleCloseModal}>
          <CgClose className="text-gray-700 fill-current" />
          <span className="text-sm">(Esc)</span>
        </div>

        <div className="relative px-6 py-4 text-left modal-content">
          {loading && (
            <div className="absolute inset-0 z-[100] grid place-items-center backdrop-blur-[3px] backdrop-filter">
              <CgSpinner className="w-12 h-12 animate-spin" color="#2da9a9" />
            </div>
          )}
          <div className="flex items-center justify-between pb-3">
            {deleteClient ? (
              <p className="text-2xl font-bold">Confirma exclusão de registro?</p>
            ) : (
              <p className="text-2xl font-bold">{id ? 'Editar ' : ' Cadastrar novo '}cliente</p>
            )}
            <div className="z-50 cursor-pointer" onClick={handleCloseModal}>
              <CgClose />
            </div>
          </div>
          {!deleteClient ? (
            <form onSubmit={handleFormSubmit}>
              <fieldset className="mt-2 form-control">
                <label htmlFor="nomeInput" className="text-sm italic opacity-75">
                  Nome:
                </label>
                <input
                  type="text"
                  name="nomeInput"
                  id="nomeInput"
                  className="w-full border rounded-lg shadow-sm border-cyan focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                  required
                />
              </fieldset>
              <fieldset className="mt-2 form-control">
                <label htmlFor="emailInput" className="text-sm italic opacity-75">
                  E-mail:
                </label>
                <input
                  type="email"
                  name="emailInput"
                  id="emailInput"
                  className="w-full border rounded-lg shadow-sm border-cyan focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  required
                />
              </fieldset>
              <fieldset className="mt-2 form-control">
                <label htmlFor="enderecoInput" className="text-sm italic opacity-75">
                  Endereço:
                </label>
                <input
                  type="text"
                  name="enderecoInput"
                  id="enderecoInput"
                  className="w-full border rounded-lg shadow-sm border-cyan focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Endereço"
                  required
                />
              </fieldset>
              <fieldset className="mt-2 form-control">
                <label htmlFor="telefoneInput" className="text-sm italic opacity-75">
                  Telefone:
                </label>
                <input
                  type="tel"
                  name="telefoneInput"
                  id="telefoneInput"
                  className="w-full border rounded-lg shadow-sm border-cyan focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(XX) XXXXX-XXXX"
                  required
                />
              </fieldset>
              <fieldset className="my-2 form-control">
                <label htmlFor="cpfInput" className="text-sm italic opacity-75">
                  CPF:
                </label>
                <input
                  type="tel"
                  name="cpfInput"
                  id="cpfInput"
                  className="w-full border rounded-lg shadow-sm border-cyan focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="XXX.XXX.XXX-XX"
                  required
                />
              </fieldset>
              {!!error && <p className="mt-4 text-center text-red-500">{error}</p>}
              <div className="flex justify-end pt-4">
                {!!id && (
                  <button
                    className="p-3 px-4 mr-2 mr-auto text-red-500 bg-transparent rounded-lg hover:bg-red-100 hover:text-red-600"
                    onClick={confirmDeleteClient}>
                    Deletar cliente
                  </button>
                )}
                <button
                  className="p-3 px-4 mr-2 bg-transparent rounded-lg hover:text-cyan-400 text-cyan hover:bg-gray-100"
                  onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="p-3 px-4 text-white rounded-lg modal-close bg-cyan opacity-95 hover:opacity-100">
                  Salvar
                </button>
              </div>
            </form>
          ) : (
            <div className="flex pt-4 justify-evenly">
              <button
                className="p-3 px-4 bg-transparent rounded-lg hover:text-cyan-400 text-cyan hover:bg-gray-100"
                onClick={() => setDeleteClient(false)}>
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="p-3 px-4 text-red-500 bg-transparent rounded-lg hover:bg-red-100 hover:text-red-600">
                Apagar registro
              </button>
            </div>
          )}
        </div>
      </div>
    </ReactModal>
  );
};

export default ClientModal;
