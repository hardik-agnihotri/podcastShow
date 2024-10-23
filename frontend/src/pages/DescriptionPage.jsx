import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DescriptionPage = () => {
  const { id } = useParams();
  const [Podcasts, setPodcasts] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:1000/api/v1/podcast/get-podcasts/${id}`,
        { withCredentials: true }
      );
      setPodcasts(res.data.data);
    };
    fetch();
  }, []);

  return (
    <div
      className="px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start
     justify-between gap-4"
    >
      {Podcasts && (
        <>
          <div className="w-2/6 flex items-center justify-center md:justify-start md:items-start">
            <img
              src={`http://localhost:1000/${Podcasts.frontImage}`}
              className="rounded w-full h-fit object-cover"
              alt="/"
            />
          </div>
          <div className="w-4/6">
              <div className="text-4xl font-semibold">{Podcasts.title}</div>
              <h4 className="mt-4">{Podcasts.description}</h4>
              <div className="mt-2 w-fit bg-blue-100 border border-blue-700 rounded-full px-4 text-center py-4 ">
                {Podcasts.category.categoryName}
              </div>
            </div>
        </>
      )}
    </div>
  );
};

export default DescriptionPage;
