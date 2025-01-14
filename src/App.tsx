import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import FoodRecipe from "./pages/FoodRecipe";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<FoodRecipe />} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
