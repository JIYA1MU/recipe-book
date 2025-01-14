import axios from "axios";
import  { useEffect, useState } from "react";
import { useParams } from "react-router";

const FoodRecipe = () => {
  const foodId = useParams().id;
  const [detail, setDetail] = useState<any>();

  useEffect(() => {
    fetchRecipeDetail();
  }, [foodId]);

  const fetchRecipeDetail = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${foodId}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    setDetail(response.data);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 flex flex-col items-center bg-teal-200">
      <div className="w-full max-w-4xl p-4 md:p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 my-5 tracking-tighter text-center">
          {detail?.title}
        </h1>
        <p className="capitalize text-gray-600 font-semibold italic text-lg md:text-xl text-center">
          {detail?.diets.join(", ")}
        </p>
        <img
          src={detail?.image}
          alt={detail?.title}
          className="mt-5 w-full h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="mt-8">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tighter my-3">
            Ingredients
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-lg md:text-xl">
            {detail?.extendedIngredients.map((item: any) => (
              <li key={item.id}>
                <div>{item.original}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tighter my-5">
            Instructions
          </h3>
          <ol className="list-decimal pl-6 space-y-2 text-lg md:text-xl">
            {detail?.analyzedInstructions[0]?.steps.map((item: any) => (
              <li key={item.id}>
                <div>{item.step}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FoodRecipe;
