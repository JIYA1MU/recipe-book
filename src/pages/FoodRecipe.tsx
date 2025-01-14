import axios from "axios";
import React, { useEffect, useState } from "react";
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
    <div className="min-h-screen p-6 flex flex-col items-center bg-teal-200">
      <div className="w-[800px] p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold text-gray-800 my-5 tracking-tighter">
          {detail?.title}
        </h1>
        <p className="capitalize text-gray-600 font-semibold italic text-xl">
          {detail?.diets + ""}
        </p>
        <img
          src={detail?.image}
          alt={detail?.title}
          className="mt-5 flex-shrink-0 w-[50vw] h-[350px] object-cover rounded-lg shadow-lg"
        />
        <div className="">
          <h3 className=" text-3xl font-extrabold text-gray-800 tracking-tighter my-3">
            Ingredients
          </h3>
          <ul className="list-disc px-6 space-y-2 text-xl">
            {detail?.extendedIngredients.map((item: any) => (
              <li key={item.id}>
                <div>{item.original}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-gray-800 tracking-tighter my-5">
            Instructions
          </h3>
          <ol className="list-decimal px-6 space-y-2 text-xl">
            {detail?.analyzedInstructions[0].steps.map((item: any) => (
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
