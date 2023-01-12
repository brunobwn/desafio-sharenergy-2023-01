import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import faustao from '../assets/faustao-errou.webp';

const httpStatusCodes = [
  100, 101, 200, 201, 202, 203, 204, 205, 206, 300, 301, 302, 303, 304, 305, 307, 400, 401, 402,
  403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 500, 501, 502, 503,
  504, 505,
];

const Status: React.FC = () => {
  const [errorCode, setErrorCode] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const [dica, setDica] = useState('');

  function getRandomStatus(num: number) {
    const randomStatus: Number[] = [];
    for (let i = 0; i < num; i++) {
      randomStatus.push(httpStatusCodes[Math.ceil(Math.random() * (httpStatusCodes.length - 1))]);
    }
    return randomStatus.sort();
  }

  function newDica() {
    const dicaString = `Alguns dos códigos possíveis são:${getRandomStatus(6).map(
      (code) => ' ' + code
    )}`;

    setDica(dicaString);
  }

  function setInvalidErrorCode() {
    setErrorCode('');
    setErrorImage(faustao);
    newDica();
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (errorCode === '' || !httpStatusCodes.includes(Number(errorCode))) {
      setInvalidErrorCode();
      return;
    }
    setErrorImage(`https://http.cat/${errorCode.toString()}.jpg`);
    newDica();
  }

  useEffect(() => {
    newDica();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <Navbar />
      <main className="container mx-auto mt-4 min-h-full px-5">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <h1 className="mb-3 text-xl sm:mb-0 md:mb-0">Status Code</h1>
          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => handleFormSubmit(e)}>
            <input
              type="text"
              name="searchUser"
              className="w-full rounded-lg border border-cyan shadow-sm focus:border-cyan focus:ring-1 focus:ring-cyan"
              placeholder={`Digite um status code HTTP. Ex: ${getRandomStatus(1)}`}
              onChange={(e) => setErrorCode(e.target.value)}
              value={errorCode}
            />
            <button
              type="submit"
              className="rounded-lg border bg-cyan px-3 py-2 font-bold tracking-wider text-white opacity-90 shadow-sm hover:opacity-100 hover:shadow-lg focus:border-cyan focus:ring-1 focus:ring-cyan">
              GO!
            </button>
          </form>
        </div>
        <div className="mt-12">
          {errorImage !== '' ? (
            <img src={errorImage} alt="A cat" className="mx-auto w-full max-w-lg" />
          ) : null}
          {dica && (
            <p className="mt-8 text-center text-sm opacity-75">
              <span className="font-semibold">Dica: </span>
              {dica}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Status;
