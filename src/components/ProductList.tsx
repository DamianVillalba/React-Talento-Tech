import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

const ProductList = () => {
	const { products, loading, error } = useProducts();
	const { handleAddToCart } = useCart();

	if (loading) {
		return <h1>Cargando productos...</h1>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<section className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-6">
				<h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">
					Productos disponibles
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<div key={product.id} className="group relative">
							<img
								alt="Product"
								src="https://placehold.co/240x320?text=Product"
								className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
							/>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">{product.name}</h3>
									<p className="text-sm font-medium text-gray-900">
										Stock: {product.quantity}
									</p>
								</div>
								<p className="text-sm font-medium text-gray-900">
									{product.price}
								</p>
							</div>
							<div className="mt-4 flex gap-2">
								<Link to={`/products/${product.id}`} className="w-1/2">
									<button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition hover:cursor-pointer">
										Ver más
									</button>
								</Link>
								<button
									onClick={() => handleAddToCart(product)}
									className="w-3/4 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition hover:cursor-pointer"
								>
									Agregar al carrito
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>

		// <section>
		//     <ul>
		//         {
		//             products.map((product) => (
		//                 <li key={product.id}>
		//                     <span>{product.name} - ${product.price}</span>
		//                     <button onClick = {() => handleAddToCart(product)}>Add to Cart</button>
		//                 </li>
		//             ))
		//         }
		//     </ul>
		// </section>
	);
};

export default ProductList;
