import {Product} from "../types/Product";

interface ProducListProps{
    products : Product[];
    addToCart : (product : Product) => void;
}

const ProductList = ({ products, addToCart } : ProducListProps) => {
    return (
        <section>
            <ul>
                {
                    products.map((product) => (
                        <li key={product.id}>
                            <span>{product.name} - ${product.price}</span>
                            <button onClick = {() => addToCart(product)}>Add to Cart</button>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}

export default ProductList
