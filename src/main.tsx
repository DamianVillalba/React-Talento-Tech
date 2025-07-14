import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext.tsx'
import CartProvider from './context/CartContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ToastContainer } from 'react-toastify'
import { SearchProvider } from './context/SearchContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <SearchProvider>
              <ToastContainer newestOnTop />
              <App />
            </SearchProvider>
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  </StrictMode>,
)
