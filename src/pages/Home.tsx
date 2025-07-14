import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import ProductSection from "../components/home/ProductSection";
import ProductCard from "../components/home/ProductCard";

const Home = () => {
	const { handleAddToCart } = useCart();
	const { products, isLoading, error } = useProducts();

	return (
		<section>
			<h1 className="text-3xl text-center font-bold m-4">
				Bienvenido a nuestra tienda
			</h1>
            <ProductSection isLoading={isLoading} error={error} products={products} ProductCardComponent={ProductCard} cardProps={{ addToCart: handleAddToCart }} title = {"Explora nuestros productos!"} />
		</section>
	);
};

export default Home;
