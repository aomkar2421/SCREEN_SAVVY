import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { db } from './Firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import Reviews from './Reviews';


const Detail = () => {

    const [data, setData] = useState({
        name : '',
        year : '',
        image : '',
        Description : '',
        rating : 0
    })

    const {id} = useParams();

    useEffect( () => {
        async function getData() {
            const _doc = doc(db, 'movies', id);
            const response = await getDoc(_doc);
            setData(response.data());
        }
        getData();
    },[] )


  return (
    <div className='w-full min-h-screen items-center md:items-start text-white flex flex-col md:flex-row justify-center p-3 mt-4'>
        <img className='h-96 mr-5 md:sticky top-24 ' src={data.image} alt="" />
        <div className='md:w-1/2 p-3'>
        <h1 className='text-3xl font-bold font-sans pb-3 '>{data.title}</h1>
        <h1 className='text-xl font-bold font-sans pb-3 '>{data.year}</h1>
            <ReactStars
            size={20}
            half={true}
            value={4.5}
            edit={false}
            />
            <p className='text-lg'>{data.description}</p>
            <Reviews id={id} />
        </div>
    </div>
  )
}

export default Detail