// Pages.jsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNotesContext } from '../context/NotesProvider';
import { backImg, downImg, nextImg, upImg } from '../../assets/image';
import "../Items/Items.css";
import "./pages.css"

const Pages = () => {
  const { page } = useParams(); // Получаем текущий номер страницы из URL
  const { products, totalProducts } = useNotesContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const productsPerPage = 12;
  const currentPage = parseInt(page) || 1; // Определяем текущую страницу, по умолчанию 1
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex); // Отображаем текущие продукты

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="Items">
      <div className="items__func">
        <div className="items__func-burger">
          <p className="items__func-button-1" onClick={toggleMenu}>
            По цене <img src={isMenuOpen ? upImg : downImg} alt="" />
          </p>
          <div className={`menu__func ${isMenuOpen ? 'open' : ''}`}>
            <Link to={"/mens/"} className="items__func-burgerdown">Мужские</Link>
            <Link to={"/woman/"} className="items__func-burgerdown">Женские</Link>
            <Link to={"/news/"} className="items__func-burgerdown">Новинки</Link>
            <Link to={"/category/"} className="items__func-burgerdown">Категории</Link>
            <Link to={"/sales/"} className="items__func-burgerdown">Скидки</Link>
            <p className="items__func-burgerdown">Контакты</p>
            <p className="items__func-burgerdown">О нас</p>
          </div>
        </div>
        <p className="items__func-button">Применить</p> 
        <p className="items__all">Кол-во товаров: {totalProducts}</p>
      </div>
      <div className="items">
        {productsToDisplay.map((product) => (
          <div key={product.id}>
            <div className="items__card">
              <img className='items__img' src={product.thumbnail} alt={product.title} />
              <h2 className='items__title'>{product.title}</h2>
              <p className='items__desc'>{product.description}</p>
              <p className='items__price'>Цена: {product.price} $</p>
              <p className='items__sale'>Скидка: {product.discountPercentage}%</p>  
              <Link to={`/items/${product.id}`} className="items__button">Купить</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {currentPage > 1 && (
          <Link to={`/pages/${currentPage - 1}`} className='prev__link'>
          <img className='pagination__img' src={backImg} alt="" />  Назад 
          </Link>
        )}
        {endIndex < totalProducts && (
          <Link to={`/pages/${ currentPage + 1 } `} className='prev__link'>
            Далее <img className='pagination__img' src={nextImg} alt="" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pages;
