import React, { useState, useEffect } from 'react';
import { CgClose, CgSpinner } from 'react-icons/cg';
import ReactModal from 'react-modal';
import { ClientInterface } from '../pages/Clients';

interface ClientModalProps extends ReactModal.Props {
  isOpen: boolean;
  closeModal: () => void;
  data?: ClientInterface | null;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, data, closeModal, ...props }) => {
  ReactModal.setAppElement('#root');
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    setId(data?._id ?? '');
    setNome(data?.nome ?? '');
    setEmail(data?.email ?? '');
    setEndereco(data?.endereco ?? '');
    setTelefone(data?.telefone ?? '');
    setCpf(data?.cpf ?? '');
    setLoading(false);
  }, [data]);

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('enviou');
  }
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center"
      {...props}>
      <div className="modal-container z-50 mx-auto w-11/12 overflow-y-auto rounded bg-white shadow-lg md:max-w-md">
        <div
          className="modal-close absolute top-0 right-0 z-50 mt-4 mr-4 flex cursor-pointer flex-col items-center text-sm text-gray-500"
          onClick={closeModal}>
          <CgClose className="fill-current text-gray-700" />
          <span className="text-sm">(Esc)</span>
        </div>

        <div className="modal-content px-6 py-4 text-left">
          <div className="flex items-center justify-between pb-3">
            <p className="text-2xl font-bold">{id ? 'Editar ' : ' Cadastrar novo '}cliente</p>
            <div className="z-50 cursor-pointer" onClick={closeModal}>
              <CgClose />
            </div>
          </div>
          {loading ? (
            <div className="mt-2 mb-6 grid place-items-center p-8">
              <CgSpinner className="h-12 w-12 animate-spin" color="#2da9a9" />
            </div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <fieldset className="form-control mt-2">
                <label htmlFor="nomeInput" className="text-sm italic opacity-75">
                  Nome:
                </label>
                <input
                  type="text"
                  name="nomeInput"
                  id="nomeInput"
                  className="w-full rounded-lg border border-cyan shadow-sm focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                  required
                />
              </fieldset>
              <fieldset className="form-control mt-2">
                <label htmlFor="emailInput" className="text-sm italic opacity-75">
                  E-mail:
                </label>
                <input
                  type="email"
                  name="emailInput"
                  id="emailInput"
                  className="w-full rounded-lg border border-cyan shadow-sm focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  required
                />
              </fieldset>
              <fieldset className="form-control mt-2">
                <label htmlFor="enderecoInput" className="text-sm italic opacity-75">
                  Endereço:
                </label>
                <input
                  type="text"
                  name="enderecoInput"
                  id="enderecoInput"
                  className="w-full rounded-lg border border-cyan shadow-sm focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Endereço"
                  required
                />
              </fieldset>
              <fieldset className="form-control mt-2">
                <label htmlFor="telefoneInput" className="text-sm italic opacity-75">
                  Telefone:
                </label>
                <input
                  type="tel"
                  name="telefoneInput"
                  id="telefoneInput"
                  className="w-full rounded-lg border border-cyan shadow-sm focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(XX) XXXXX-XXXX"
                  required
                />
              </fieldset>
              <fieldset className="form-control mt-2">
                <label htmlFor="cpfInput" className="text-sm italic opacity-75">
                  CPF:
                </label>
                <input
                  type="tel"
                  name="cpfInput"
                  id="cpfInput"
                  className="w-full rounded-lg border border-cyan shadow-sm focus:border-cyan focus:ring-1 focus:ring-cyan"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="XXX.XXX.XXX-XX"
                  required
                />
              </fieldset>
              <div className="flex justify-end pt-8">
                <button
                  className="hover:text-cyan-400 mr-2 rounded-lg bg-transparent p-3 px-4 text-cyan hover:bg-gray-100"
                  onClick={closeModal}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="modal-close rounded-lg bg-cyan p-3 px-4 text-white opacity-95 hover:opacity-100">
                  Salvar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </ReactModal>
  );
};

export default ClientModal;
