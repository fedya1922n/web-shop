import React, { useState } from 'react';
import { useNotesContext } from '../context/NotesProvider';
import "./Items.css";
import { downImg, upImg } from '../../assets/image';
import { Link } from 'react-router-dom';

const Items = () => {
  const { products, getProductById, totalProducts } = useNotesContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [salePrice, setSalePrice] = useState(false);
  const [sortByStock, setSortByStock] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleSortByPrice = () => {
    setSortByPrice((prev) => !prev);
    setSalePrice(false);
    setSortByStock(false);
  };

  const toggleSortByStock = () => {
    setSortByStock((prev) => !prev);
    setSortByPrice(false);
    setSalePrice(false);
  };

  const toggleSale = () => {
    setSalePrice((prev) => !prev);
    setSortByPrice(false);
    setSortByStock(false);
  };

  const goToHome = () => {
    setSortByPrice(false);
    setSalePrice(false);
    setSortByStock(false);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortByPrice) return a.price - b.price;
    if (sortByStock) return b.stock - a.stock; 
    if (salePrice) return b.discountPercentage - a.discountPercentage;
    return 0; 
  });

  const productsToDisplay = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="Items">
      <div className="items__func">
        <div className="items__func-burger">
          <p className="items__func-button-1" onClick={toggleMenu}>
            Фильтры <img src={isMenuOpen ? upImg : downImg} alt="" />
          </p>
          <div className={`menu__func ${isMenuOpen ? 'open' : ''}`}>
            <p className="items__func-burgerdown" onClick={goToHome}>Главная</p>
            <p className="items__func-burgerdown" onClick={toggleSortByStock}>По Количеству</p>
            <p className="items__func-burgerdown" onClick={toggleSale}>Скидки</p>
            <p className="items__func-burgerdown" onClick={toggleSortByPrice}>По цене</p>
          </div>
        </div>
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
              <Link to={"/items/" + product.id} className="items__button">Купить</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className='pagination__button' onClick={handlePrevPage} disabled={currentPage === 1}>
          Назад
        </button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button className='pagination__button' onClick={handleNextPage} disabled={currentPage === totalPages}>
          Далее
        </button>
      </div>
    </div>
  );
};

export default Items;
