import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext.tsx'
import CartProvider from './context/CartContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <ToastContainer newestOnTop />
            <App />
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  </StrictMode>,
)
