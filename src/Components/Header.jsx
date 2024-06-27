import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Appstate } from '../App';


const Header = () => {

  const useAppstate = useContext(Appstate)

  return (
    <div className="h-14 sticky top-0 z-10 bg-[#15161a] w-full text-white border-b-2 border-white text-2xl font-bold px-10 flex justify-between items-center " >
      
      <Link to={'/'}>
        <span>Screen <span className="text-red-700 cursor-pointer  ">Savvy</span></span>
      </Link>
     
      { useAppstate.login ? 
        <Link to={'/addMovie'}>
        <h2 className='cursor-pointer text-xl text-red-600'> <AddIcon className='text-white text-lg'/> Add Movie </h2>
        </Link>
        :
        <Link to={'/login'}>
        <h2 className='cursor-pointer bg-green-500 rounded-sm w-16 text-center pt-1 font-semibold h-8 text-white text-sm'> Login</h2>
        </Link>
      }

    </div>
  )
}

export default Header