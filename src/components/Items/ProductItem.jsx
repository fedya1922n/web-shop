import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNotesContext } from '../context/NotesProvider';
import { backImg } from '../../assets/image';

const ProductItem = () => {
    const {totalProducts } = useNotesContext();
    const { id } = useParams();
    const [single, setSingle] = useState(null);

    const getSingle = async () => {
        try {
            const response = await fetch("https://dummyjson.com/products/" + id);
            const result = await response.json();
            setSingle(result);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingle();
    }, []);

    console.log(single);

    return (
        <div>
            {single && (
                <>
                <Link to={"/"}>
                 <img className='products__image' src={backImg} alt="" />
                </Link>
                <div className="Products">
                    <p className='productItem__stock'> Количество:{single.stock}</p>
                <div className="productItem__card">
                    <h1 className="productItem__title">{single.title}</h1>
                    <img src={single.thumbnail} alt={single.title} />
                    <p className='productItem__desc'>{single.description}</p>
                    <p className='productItem__price'>Price: ${single.price}</p>
                    <p className="productItem__sale">Скидка ${single.discountPercentage}</p>
                    <Link to={"/"} className="productItems__button">Купить</Link>
                </div>
                </div>
                </>
            )}
        </div>
    );
};

export default ProductItem;
