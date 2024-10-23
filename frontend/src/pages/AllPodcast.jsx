import React, { useEffect,useState } from 'react'
import axios from 'axios'
import PodcastCard from '../components/PodcastCard/PodcastCard'

const AllPodcast = () => {
  const [Podcasts, setPodcast] = useState([])
    useEffect(() => {
      const fetch = async () => {
        try {
          const res = await axios.get('http://localhost:1000/api/v1/podcast/get-podcasts')
          // setFirst(response.data.slice(0, 4))
          // setSecond(response.data.slice(4, 8))
          // setThird(response.data.slice(8, 12))
          setPodcast(res.data.data)
        } catch (error) {
          console.error(error)
        }
      }
      fetch()
    }, [])
    console.log(Podcasts)
    
  return (
    <div>
        <div className='w-full px-4 lg:px12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {Podcasts && Podcasts.map((items,i)=> 
            <div key={i}><PodcastCard items={items} /></div>
            )}
        </div>
    </div>
  )
}

export default AllPodcast