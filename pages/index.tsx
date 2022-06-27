import type { NextPage } from 'next'; 
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import FoodCard, { Food } from '../components/FoodCard/FoodCard';
import Router, { useRouter } from 'next/router';


const Home: NextPage = () => {
    const [offSet, setOffset] = useState<number>(1); 
    const [foodList, setFoodList] = useState<Food[] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter(); 
    
  
    const fetchData = async () => {
        const foods = await (await fetch(`/api/foods?offset=${offSet}`)).json();
        console.log(foods); 
        setFoodList(foods?.foods);
        const netOffset = offSet + 1; 
        setOffset(netOffset); 
    }

    // Effects ---> 
    useEffect(() => {
        if (!foodList) fetchData();
    }, [foodList]);

    const handleClick = async (e: any) => {
      e.preventDefault();
      router.push(`/foodSearch/${searchQuery}`); 
    }

    const handleKeyDown = (e: any) => {
      if (e.key === 'Enter') handleClick(e);
    }
  
    const handleChange = (e: any) => {
      setSearchQuery(e.target.value);
    }

  return (
    <section className='wrapper page-section'>
      <h1 className='FoodList__title'>SugarWod Foods</h1>

      <div className='FoodList__search'>
        <input className="FoodList__search-input" placeholder={'search for food items from the USDA'} 
          name="searQuery" onKeyDown={handleKeyDown} onChange={handleChange} value={searchQuery}
        />
        <span onClick={handleClick}>🔎</span>
      </div>

      {foodList && 
        <div className='FoodList'>
          {foodList.map(food => {
            return <FoodCard key={food.fdcId} data={food} />
          })}
        </div>
      }

    {/* <button className="FoodDetail__button">Load More</button> */}
    </section>
  )
}

export default Home; 