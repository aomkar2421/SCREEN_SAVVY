import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { ThreeDots } from 'react-loader-spinner';
import { getDocs } from 'firebase/firestore';
import { moviesRef } from './Firebase/firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDocs(moviesRef);

        const moviesData = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        
        setData(moviesData);
        } catch (error) { console.error('Error fetching data: ', error); }
        setLoading(false);
    };

    fetchData();

  }, []);

  return (
    <div className="flex flex-wrap min-h-screen justify-center md:justify-around p-3 m-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeDots height={40} color="white" />
        </div>
      ) : (
        data.map((movie, index) => (
          <div
            key={movie.id}
            className="text-white text-bold h-96 w-52 shadow-lg m-2 p-2 hover:scale-[1.03] ease-in-out transition-all duration-300 font-mono bg-gray-800 rounded-md"
          >
            <Link to={`/detail/${movie.id}`}>
              <img className="h-64 w-52 rounded-md" src={movie.image} alt={movie.title} />
              <h1>
                <span className="text-gray-500">Name :</span> {movie.title}
              </h1>
              <h1 className="flex items-center">
                <span className="text-gray-500 mr-1">Rating :</span>
                <ReactStars size={20} half={true} value={movie.rating/movie.rated} edit={false} />
              </h1>
              <h1>
                <span className="text-gray-500">Year :</span> {movie.year}
              </h1>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;
