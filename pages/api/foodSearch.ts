// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Food } from '../../components/FoodCard/FoodCard';

export type FoodSearchDetail =  {
    brandName: string;
    description: string; 
    fdcId: number; 
}

export type searchResults = {
    totalHits: number; 
    foods: Food[]; 
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<searchResults>
) {
  const { searchQuery } = req.query;


  const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchQuery}&dataType=&pageSize=24&pageNumber=2&sortBy=dataType.keyword&sortOrder=asc&api_key=${process.env.API_KEY}`); 
  const data = await response.json(); 


  res.status(200).json({ ...data})
}