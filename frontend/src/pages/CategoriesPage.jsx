import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PodcastCard from '../components/PodcastCard/PodcastCard';

const CategoriesPage = () => {
  const { cat } = useParams();
  const [Podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/podcast/category/${cat}`, {
          withCredentials: true,
        });
        setPodcasts(res.data.data);
      } catch (err) {
        console.error(err);
        setError('No podcasts found in this category');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPodcasts();
  }, [cat]); // Add cat to the dependency array to refetch when the category changes

  if (loading) {
    return (
      <div className="text-3xl font-bold h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-3xl font-bold h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-4 lg:px-12">
      <h1 className="font-semibold text-xl capitalize">{cat}</h1>
      <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Podcasts && Podcasts.length > 0 ? (
          Podcasts.map((item, i) => (
            <div key={i}>
              <PodcastCard items={item} />
            </div>
          ))
        ) : (
          <div className="text-3xl font-bold h-screen w-[100%] flex items-center justify-center">
            No Podcasts right now
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
