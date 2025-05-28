import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function ProductDetails() {
	const { id } = useParams();
    const {products} = useProducts();

    const product = products.find(p => p.id === id);

	return (
		<section>
			<h1>Detalle del Producto</h1>
			{product ? (<p>Este es el detalle del producto: {product.name}</p>) : (<p>No existe el producto con id: {id}</p>)}
		</section>
	);
}
export default ProductDetails;
