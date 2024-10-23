import React from 'react'
import {Link} from "react-router-dom"
import { FaPlayCircle } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux"
import { playerActions } from '../../store/player';

const PodcastCard = ({items}) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state => state.auth.isLoggedIn))
    const handlePlay = (e)=>{
        if(isLoggedIn){
            e.preventDefault()
            dispatch(playerActions.setDiv());
            dispatch(playerActions.changeImage(`http://localhost:1000/${items.frontImage}`))
            dispatch(playerActions.changeSong(`http://localhost:1000/${items.audioFile}`))
    
        }
    }
    return (
    <div>
        <Link to={`/description/${items._id}`} 
        className='border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300'  >
            <div>
            <img src={`http://localhost:1000/${items.frontImage}`} className='rounded size-[42vh] object-cover' alt="" />
            </div>
            <div>
                <h2 className='text-xl mt-4 font-bold'>{items.title}</h2>
                <p className='text-gray-600'>{items.description.substring(0, 50)}...</p>
            </div>
            <div className='mt-2 bg-blue-100 border border-blue-700 rounded-full px-4 text-center py-4 '>
                {items.category.categoryName}
            </div>
            <div className='mt-2'>
                <Link onClick={handlePlay} to={isLoggedIn ? "#": "/signup"} className='bg-blue-900 text-white px-4 py-2 rounded mt-2 flex items-center justify-center
                hover:bg-blue-600 transition-all duration-300 '>
                Play <FaPlayCircle className='ms-2' />
                </Link>
            </div>
        </Link>
    </div>
  )
}

export default PodcastCard