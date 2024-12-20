import React from 'react'
import "./navbar.css"
import { bascketImg, logoImg } from '../../assets/image'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
      <nav className="nav">  
      <img src={logoImg} alt="" className="nav__img" />
      <div className="nav__menu">
                 <Link  to={"/news/"} className="nav__menu-links">Новинки</Link>
                  <Link to={"/category/"} className="nav__menu-links">Категории</Link>
                  <Link to={"/sales/"} className="nav__menu-links">Скидки</Link>
                  <a href="" className="nav__menu-links">Контакты </a>
                  <a href="" className="nav__menu-links">О нас</a>
                  <Link className='nav__menu-links' to={"/"}>Главная</Link> 
                 </div>
                  <a href="" className="nav__menu-bascket">
                <img src={bascketImg} alt="" />
                  </a>
                </nav>  
  )
}

export default Navbar