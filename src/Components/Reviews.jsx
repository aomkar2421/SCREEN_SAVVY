import React from 'react'
import { useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from './Firebase/firebase'
import { addDoc, doc, updateDoc } from 'firebase/firestore'
import { TailSpin } from 'react-loader-spinner'
import swal from 'sweetalert'


const Reviews = ({id}) => {

    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState("");

    const sendReview = async () => {
        setLoading(true);
        try {
            await addDoc(reviewsRef, {
                movieid: id,
                name: 'Omkar Jagtap',
                rating: rating,
                thought: form,
                timestamp: new Date().getTime()
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

  return (
    <div className='w-full mt-3 border-t-2' >
        <ReactStars
            size={35}
            half={true}
            value={rating}
            onChange={ (rate) => setRating(rate) }
        />

        <input value={form} onChange={ (e) => setForm(e.target.value)}
        className='w-full bg-gray-600 h-9 rounded-sm px-3 text-white focus:bg-white focus:text-black ' type="text" placeholder='Share Your Thoughts' />
        
        <button onClick={sendReview} className='w-full flex justify-center items-center mt-2 h-9 bg-green-600 rounded-sm text-white hover:bg-green-800 ' >
            {loading ? <TailSpin height={20} color='white' /> : 'Share' }
        </button>
    </div>
  ) 
}

export default Reviews