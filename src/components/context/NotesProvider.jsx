import React, { createContext, useEffect, useState, useContext } from 'react';

const NotesContext = createContext();
const PRODUCTS_API = "https://dummyjson.com/products?limit=100";

export const getApi = async () => {
  try {
    const response = await fetch(PRODUCTS_API);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
};

export const NotesProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getApi();
      if (data) {
        setProducts(data.products);
        setTotalProducts(Math.min(data.total, 100))
      }
    };
    fetchProducts();
  }, []);


  const getProductById = (id) => {
    return products.find(product => product.id === id); 
  };
  const getExpensiveProducts = ()=>{
    return products.reduce((max, product)=>{
      return product.price > max.price ? product : max;
    }, products[0])
  }
  return (
    <NotesContext.Provider value={{ products, getProductById, totalProducts, setTotalProducts, getExpensiveProducts }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  return useContext(NotesContext);
};

export default NotesProvider;
