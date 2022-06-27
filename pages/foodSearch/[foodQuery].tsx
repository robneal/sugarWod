import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FoodCard from '../../components/FoodCard/FoodCard';
import { searchResults } from '../api/foodSearch';



const Home: NextPage = () => {
    const [offSet, setOffset] = useState<number>(1);
    const [searchResults, setSearchResults] = useState<searchResults | null>(null);
    const { foodQuery } = useRouter()?.query;



    const fetchData = async () => {
        const foodList = await (await fetch(`/api/foodSearch?searchQuery=${foodQuery}`)).json();

        // ?searchQuery=apple
        console.log(foodList);
        setSearchResults(foodList);
    }

    // Effects ---> 
    useEffect(() => {
        if (foodQuery) fetchData();
    }, [foodQuery]);



    if (!foodQuery) return <h1>Loading...</h1>
    return (
        <section className='wrapper page-section'>
            <Link className="FoodDetail__link" href="/">
                <a className="FoodDetail__link">← Back to home</a>
            </Link>
            <h1 className='FoodSearch__title'>Showing results for <span>{foodQuery}</span></h1>
            <p className='FoodSearch__subtitle'>Total Hits : <span>{searchResults?.totalHits}</span> </p>



            {searchResults && 
        <div className='FoodList'>
          {searchResults.foods.map((food, index) => {
            if(index < 8) return <FoodCard key={food.fdcId} data={food} type={'full'} expanded={true} />
            else return <FoodCard key={food.fdcId} data={food} type={'full'} expanded={false} />
          })}
        </div>
      }
        </section>
    )
}

export default Home