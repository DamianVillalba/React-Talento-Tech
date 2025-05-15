import { useState, useEffect } from "react";
import Cart from "../components/Cart"
import ProductList from "../components/ProductList"
import { Product } from "../types/Product"


export interface MainProps{
    cart : Product[];
    scriptAddToCart : (product: Product) => void;
}

const Main = ({cart, scriptAddToCart} : MainProps) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect (() => {
        fetch('https://6812aab0129f6313e20f36c5.mockapi.io/products/products')
        .then((respuesta) => {
            if (!respuesta.ok){
                throw new Error(respuesta.status.toString());
            }
            return respuesta.json()
        })
        .then((datos : Product[]) => {
            setProducts(datos);
            setLoading(false);
        })
        .catch((error : Error) =>{
            setError(`Hubo un error en la carga de productos: ERROR ${error.message}`)
            setLoading(false);
        });
    }, []) 

    if (loading){return <h1>Cargando productos...</h1>}

    if(error){return <p>{error}</p>}

    return (
        <main>
            <ProductList products = {products} addToCart = {scriptAddToCart}/>
            <Cart cartItems = {cart}/>
        </main>
    )
}

export default Main
