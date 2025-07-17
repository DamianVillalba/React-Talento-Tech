import ProductList from "../components/common/ProductList";
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
		>
			<ProductList
				products={products}
				ProductCardComponent={ProductCard}
				cardProps={{ addToCart: handleAddToCart }}
				gridStyle={
					"mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
				}
				showSearchBar={true}
				showPaginator={true}
				paginatorPath="/products"
			/>
		</ProductSection>
	);
};

export default Products;
