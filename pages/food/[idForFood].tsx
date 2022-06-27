import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FoodDetail, NutrientConversionFactors } from "../api/food";

const FoodDetail: NextPage = () => {
  const { idForFood } = useRouter()?.query;
  const [foodData, setFoodData] = useState<FoodDetail | null>(null);


  const fetchData = async () => {
    const food = await (await fetch(`/api/food?fdcId=${idForFood}`)).json();
    console.log(food);
    setFoodData(food)
  }

  // Effects ---> 
  useEffect(() => {
    if (idForFood) fetchData();
  }, [idForFood]);

  if (!foodData) return <h1>Loading...</h1>
  return (
    <section className='wrapper page-section--large'>
      <Link className="FoodDetail__link" href="/">
        <a className="FoodDetail__link">← Back to home</a>
      </Link>
      <h1 className='FoodDetail__title'>{foodData.description}</h1>

      <div className="FoodDetail__statsList">
        <div className="FoodDetail__stat">
          <label>Carbs</label>
          <p>{getCalories(foodData.nutrientConversionFactors)?.carbohydrateValue || foodData?.labelNutrients?.carbohydrates?.value  || `N/A`}</p>
        </div>

        <div className="FoodDetail__stat">
          <label>Fats</label>
          <p>{getCalories(foodData.nutrientConversionFactors)?.fatValue || foodData?.labelNutrients?.fat?.value  || `N/A`}</p>
        </div>

        <div className="FoodDetail__stat">
          <label>Proteins</label>
          <p>{getCalories(foodData.nutrientConversionFactors)?.proteinValue || foodData?.labelNutrients?.protein?.value || `N/A`}</p>
        </div>
      </div>

      <button className="FoodDetail__button">Add to Cart</button>


    </section>
  )
}



const getCalories = (arr: { type: string }[]): NutrientConversionFactors  => {
  if(!arr) return arr; 
  let val; 
  arr.forEach(data => {
    if (data?.type === ".CalorieConversionFactor") {
      val =  data;
    }
  })

  return val? val: arr[0];
}

export default FoodDetail