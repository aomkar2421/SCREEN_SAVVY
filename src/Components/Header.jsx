import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className="h-14 sticky top-0 z-10 bg-[#15161a] w-full text-white border-b-2 border-white text-2xl font-bold px-10 flex justify-between items-center " >
      
      <Link to={'/'}>
        <span>Filmy <span className="text-red-700 cursor-pointer  ">Verse</span></span>
      </Link>
     
      <Link to={'/addMovie'}>
        <h2 className='cursor-pointer text-red-600'> <AddIcon className='text-white text-lg'/> Add New </h2>
      </Link>

    </div>
  )
}

export default Header