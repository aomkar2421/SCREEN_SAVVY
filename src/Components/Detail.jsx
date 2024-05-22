import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { db } from './Firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import Reviews from './Reviews';
import { ThreeCircles } from 'react-loader-spinner';


const Detail = () => {

    const [data, setData] = useState({
        name : '',
        year : '',
        image : '',
        Description : '',
        rating : 0,
        rated : 0
    })
    const [loading, setLoading] = useState(true);

    const {id} = useParams();

    useEffect( () => {
        setLoading(true);
        async function getData() {
            const _doc = doc(db, 'movies', id);
            const response = await getDoc(_doc);
            setData(response.data());
        }
        getData();
        setLoading(false);
    },[] )


  return (
    <div>
        {
            loading ? <ThreeCircles/> :
            <div className='w-full min-h-screen items-center md:items-start text-white flex flex-col md:flex-row justify-center p-3 mt-4'>
                <img className='h-96 mr-5 md:sticky top-24 ' src={data.image} alt="" />
                <div className='md:w-1/2 p-3'>
                <h1 className='text-3xl font-bold font-sans pb-3 '>{data.title}</h1>
                <h1 className='text-xl font-bold font-sans pb-3 '>{data.year}</h1>
                <ReactStars
                size={25}
                half={true}
                value={data.rating/data.rated}
                edit={false}
                />
                <p className='text-lg'>{data.description}</p>
                <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
            </div>
    </div>
        }
    </div>
  )
}

export default Detail