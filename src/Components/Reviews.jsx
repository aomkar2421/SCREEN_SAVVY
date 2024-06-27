import React from 'react'
import { useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from './Firebase/firebase'
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { TailSpin } from 'react-loader-spinner'
import swal from 'sweetalert'
import { useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Appstate } from '../App'
import { useContext } from 'react'


const Reviews = ({id, prevRating, userRated}) => {

    const useAppState = useContext(Appstate);

    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [form, setForm] = useState("");
    const [data, setData] = useState([]);

    const sendReview = async () => {
        setLoading(true);
        try {
            await addDoc(reviewsRef, {
                movieid: id,
                name: useAppState.userName,
                rating: rating,
                thought: form,
                timestamp: new Date().getTime()
            })

            const ref = doc(db, 'movies', id);
            await updateDoc(ref, {
                rating : prevRating + rating,
                rated : userRated + 1
            })

            setRating(0);
            setForm("");
            swal({
                title: "Review Sent",
                icon: "success",
                buttons: false,
                timer: 3000
            })

        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
              })
        }
        setLoading(false);
    }

    useEffect( () =>{
        async function getData(){
            setReviewsLoading(true);

            let quer = query(reviewsRef, where('movieid' , '==', id))
            const response = await getDocs(quer);
            
            const fetchedData = [];
            response.forEach((doc) => {
                fetchedData.push(doc.data());
            });
            setData(fetchedData);

            setReviewsLoading(false);
        }
        getData();
    },[] )

  return (
    <div className='w-full mt-3 border-t-2' >
        <ReactStars
            size={30}
            half={true}
            value={rating}
            onChange={ (rate) => setRating(rate) }
        />

        <input value={form} onChange={ (e) => setForm(e.target.value)}
        className='w-full bg-gray-600 h-9 rounded-sm px-3 text-white focus:bg-white focus:text-black ' type="text" placeholder='Share Your Thoughts' />
        
        <button onClick={sendReview} className='w-full flex justify-center items-center mt-2 h-9 bg-green-600 rounded-sm text-white hover:bg-green-800 ' >
            {loading ? <TailSpin height={20} color='white' /> : 'Share' }
        </button>

        {
            reviewsLoading ? 
            <div className='mt-6 flex justify-center' > <ThreeDots height={15} color='white' /> </div> 
            :
            <div className='mt-4'>
                {data.map((e, i) => {
                    return(
                        <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2' key={i}>
                            <div className='flex items-center'>
                                <p className='text-blue-500'>{e.name}</p>
                                <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                            </div>
                            <ReactStars
                                size={15}
                                half={true}
                                value={e.rating}
                                edit={false}
                            />

                            <p>{e.thought}</p>
                        </div>     
                    )
                })}
            </div>
            }
    </div>

  ) 
}

export default Reviews