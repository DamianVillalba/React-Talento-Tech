import { Product } from "../types/Product";

interface CartProps{
    cartItems : Product[];
}

const Cart = ({cartItems} : CartProps) => {

    const listCartItems = () => {
        return(
            <ul>
                {
                    cartItems.map((product, index) =>(
                        <li key = {index}>
                            <span>{product.name} - ${product.price}</span>
                        </li>
                    ))
                }
            </ul>
        )
    }

    return (
        <section>
            <h2>Productos en el carrito</h2>
            {
                cartItems.length === 0 ? (<span>No hay productos en el carrito</span>) : listCartItems()
            }
        </section>
    )
}

export default Cart
