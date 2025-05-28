import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayouts';
import ProductDetails from './components/ProductDetails';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      {/* Rutas con layout */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element = {<ProductDetails />} />
        <Route path='/login' element={<Login />} />
      </Route>
      {/* rutas sin layout */}
      <Route path='/admin' element={<ProtectedRoute children={<Admin />} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
