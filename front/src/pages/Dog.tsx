import axios from 'axios';
import React, { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import Navbar from '../components/Navbar';

const API_RANDOM_DOG = 'https://random.dog/woof.json/?filter=mp4,webm';

const Dog: React.FC = () => {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleNewDog() {
    setLoading(true);
    await axios(API_RANDOM_DOG).then((res) => {
      setDogImage(res.data.url);
      setLoading(false);
    });
  }

  return (
    <div className="min-h-screen pb-8 bg-gray-100">
      <Navbar />
      <main className="container min-h-full px-5 mx-auto mt-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="w-full mb-3 text-xl sm:mb-0 md:mb-0">Random Dog</h1>
          <button
            type="submit"
            className="px-3 py-2 mt-4 font-bold tracking-wider text-white border rounded-lg shadow-sm bg-cyan opacity-90 hover:opacity-100 hover:shadow-lg focus:border-cyan focus:ring-1 focus:ring-cyan"
            onClick={handleNewDog}>
            Gimme a new Dog!!!
          </button>
          {loading ? (
            <div className="grid p-8 mt-8 place-items-center md:mt-12">
              <CgSpinner className="w-12 h-12 animate-spin" color="#2da9a9" />
            </div>
          ) : (
            !!dogImage && (
              <img
                src={dogImage}
                alt="A random dog"
                className="w-full max-w-md mt-8 border-4 border-white rounded-lg shadow-lg"
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Dog;
