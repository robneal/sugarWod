// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Food } from '../../components/FoodCard/FoodCard';

type Data =  {
  foods: Food[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/list?dataType=&pageSize=24&pageNumber=2&api_key=${process.env.API_KEY}`); 
  const data = await response.json(); 


  res.status(200).json({ foods: data})
}
