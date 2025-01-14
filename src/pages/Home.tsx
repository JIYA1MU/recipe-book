import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Home = () => {
  const [recipes, setRecipes] = useState<any>([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const num = 20;
      const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=${num}`
      );
      setRecipes(response.data.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-200">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 my-10 tracking-tighter">
        Recipe Book
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recipes?.map((item: any) => (
          <Link
            to={`/details/${item.id}`}
            key={item?.id}
            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform duration-300 hover:scale-105 flex flex-col items-center"
          >
            <img
              src={item?.image}
              alt={item?.title}
              className="rounded-md shadow-lg w-full h-56 object-cover mb-4"
            />
            <div className="text-2xl font-semibold text-gray-900 p-2">
              {item?.title}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: item?.summary }}
              className="mt-2 text-gray-600 line-clamp-3 text-sm"
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
