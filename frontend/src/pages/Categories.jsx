import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const cat = [
    {
      name: "Education",
      color: "bg-green-400",
      to: "/categories/Education",
      img: "https://cdn-icons-png.freepik.com/512/12641/12641372.png?ga=GA1.2.164066931.1719167165"
    },
    {
      name: "Technology",
      color: "bg-blue-400",
      to: "/categories/Technology",
      img: "https://cdn-icons-png.freepik.com/512/5401/5401301.png?ga=GA1.2.164066931.1719167165",
    },
    {
      name: "Health & Fitness",
      color: "bg-red-400",
      to: "/categories/HealthFitness",
      img: "https://cdn-icons-png.freepik.com/512/4480/4480087.png?ga=GA1.2.164066931.1719167165",
    },
    {
      name: "Business",
      color: "bg-yellow-400",
      to: "/categories/Business",
      img: "https://cdn-icons-png.freepik.com/512/4325/4325609.png?ga=GA1.2.164066931.1719167165",
    },
    {
      name: "Travel",
      color: "bg-purple-400",
      to: "/categories/Travel",
      img: "https://cdn-icons-png.freepik.com/512/17167/17167801.png?ga=GA1.2.164066931.1719167165",
    },
    {
      name: "Entertainment",
      color: "bg-pink-400",
      to: "/categories/Entertainment",
      img: "https://cdn-icons-png.freepik.com/512/2809/2809590.png?ga=GA1.2.164066931.1719167165",
    },
  ];

  const [Podcasts, setPodcast] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/podcast/get-user-podcasts",
          { withCredentials: true }
        );
        setPodcast(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="h-screen lg:h-[78vh]">
      <div className="px-4 lg:px-12 py-4 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-5">
        {cat.map((items, i) => (
          <Link
            to={items.to}
            key={i}
            className={`rounded px-8 py-4 text-xl font-semibold ${items.color} hover:scale-105 shadow-xl transition-all relative duration-500 h-[24vh] overflow-hidden`}
          >
            <div>{items.name}</div>

            <div className="w-[100%] flex items-center justify-end absolute -bottom-2 -right-2">
              <img
                src={items.img}
                alt={`${items.name} image`}
                className="rounded rotate-12 h-[15vh] md:h-[17vh] lg:h-[18vh]"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
