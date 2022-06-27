import Link from "next/link";

export type Food = {
    description: string;
    publicationDate: string;
    dataType: string;
    fdcId: number;
    ndbNumber: string;

    ingredients?: string;
    brandName?: string;
    brandOwner?: string;
    additionalDescriptions?: string;
}

export type CardType = 'full' | 'short';

const FoodCard: React.FunctionComponent<{ data: Food | null, type?: CardType, expanded?: boolean }> = ({ data, type = 'short', expanded = false }) => {
    if (type === 'short') return (
        <Link href={`/food/${data?.fdcId}`}>
            <article className="FoodCard">
                <div className="FoodCard__header">
                    <p>{data?.publicationDate}</p>
                    <p>{data?.dataType}</p>
                </div>
                <h3>{data?.description}</h3>
            </article>
        </Link>
    );
    else {
        return (
            <Link href={`/food/${data?.fdcId}`}>
                <article className="FoodCard--full">
                    <div className="FoodCard__header">
                        <p>{data?.publicationDate}</p>
                        {
                            expanded && <>  
                            <p>{data?.brandName}</p>
                            <p>{data?.brandOwner}</p>
                            </>
                        }

                    </div>
                    <h3>{data?.description}</h3>
                    { expanded && <p>{data?.additionalDescriptions}</p> }

                    {(data?.ingredients && expanded) && <>
                        <label>Ingredients</label>
                        <p>{data?.ingredients}</p>
                    </>
                    }
                </article>
            </Link>
        )
    }
}

export default FoodCard; 