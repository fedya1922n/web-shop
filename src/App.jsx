import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Items from './components/Items/Items';

import ProductItem from './components/Items/ProductItem';
import NotesProvider from './components/context/NotesProvider';
import Category from './components/pages/Category';
import Sales from './components/pages/Sales';
import Mens from './components/pages/Mens';
import Woman from './components/pages/Woman';
import News from './components/pages/News';
import "./index.css"
import Price from './components/pages/Price';

const Home = () => (
  <>
  <Items />
  {/* <Category />
  <Mens/>
  <Sales/>
  <Woman/>
  <News/> */}
  </>
);

const App = () => {
  return (
    <NotesProvider>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items/:id" element={<ProductItem />} />
        <Route path='/category' element={<Category/>}/>
        <Route path='/sales' element={<Sales/>}/>
        <Route path='/woman' element={<Woman/>}/>
        <Route path='/mens/' element={<Mens/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path= "/price" element=  {<Price/>}/>
      </Routes>
    </BrowserRouter>
    </NotesProvider>
  );
};

export default App;
