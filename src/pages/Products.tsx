import ProductCard from "../components/home/ProductCard";
import ProductSection from "../components/home/ProductSection";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

const Products = () => {
	const { handleAddToCart } = useCart();
	const { products, isLoading, error } = useProducts();

	return (
		<ProductSection
			isLoading={isLoading}
			error={error}
			products={products}
			ProductCardComponent={ProductCard}
			cardProps={{ addToCart: handleAddToCart }}
		/>
	);
};

export default Products;
