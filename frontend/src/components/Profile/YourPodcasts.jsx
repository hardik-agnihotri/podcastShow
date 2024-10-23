import React, { useEffect,useState } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios';
import PodcastCard from '../PodcastCard/PodcastCard';

const YourPodcasts = () => {
  const [Podcasts, setPodcast] = useState([])
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:1000/api/v1/podcast/get-user-podcasts',
          {withCredentials:true}
        )
         setPodcast(res.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetch()
  }, [])
  return (
    <div className="px-4 lg:px-12 my-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold md:font-bold">Your Podcasts</h1>
        <Link to="/add-podcast" className="px-4 py-2 bg-zinc-800 text-white rounded font-semibold">Add Podcast</Link>
      </div>
      <div className='w-full px-4 lg:px12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {Podcasts && Podcasts.map((items,i)=> 
            <div key={i}><PodcastCard items={items} /></div>
            )}
        </div>
      
    </div>
    
  );
};

export default YourPodcasts;
