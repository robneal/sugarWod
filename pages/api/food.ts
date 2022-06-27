// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Food } from '../../components/FoodCard/FoodCard';


export type NutrientConversionFactors = {
  carbohydrateValue?: number;
  fatValue?: number;
  proteinValue?: number;
  type: string;
}

export type FoodDetail =  {
  description: string; 
  publicationDate: string; 
  dataType: string;
  fdcId: number; 
  ndbNumber: string;
  foodCategory: {
    description: string;
  }
  labelNutrients: {
    protein: {
      value: number; 
    }
    fat: {
      value: number; 
    }
    carbohydrates: {
      value: number; 
    }
  }
  nutrientConversionFactors: NutrientConversionFactors[
  
  ]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FoodDetail>
) {

  const {fdcId } = req.query; 

  // const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?&api_key${process.env.API_KEY}`); 
  const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${process.env.API_KEY}&format=full`);
  const data = await response.json(); 


  res.status(200).json({ ...data})
}



// curl -X 'GET' \
//   'https://api.nal.usda.gov/fdc/v1/food/169572?nutrients=203&nutrients=204&nutrients=205&api_key=OGvwq6mWWAFEjVBy7udsP5fw6rfnh2MmxOigaFkQ' \
//   -H 'accept: application/json'