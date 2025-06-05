import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import loadingImg from "../assets/loading.gif";

const ProductList = () => {
	const { products, loading, error } = useProducts();
	const { handleAddToCart } = useCart();

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen w-screen">
				<img alt="loading" src={loadingImg} className="max-w-lg max-h-lg" />
			</div>
		);
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
						<ProductCard key={product.id} product={product} addToCart={handleAddToCart} />
					))}
				</div>
			</div>
		</section>
	);
};

export default ProductList;
