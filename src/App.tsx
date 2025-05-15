import { useState } from 'react';
// import './App.css'
import Home from './layouts/Home';
import { Product } from './types/Product';

function App() {

  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product : Product) => {
    setCart ([...cart, product]);
  }

  return (
    <>
      <Home cart = {cart} scriptAddToCart = {handleAddToCart}/>
    </>
  )
}

export default App
