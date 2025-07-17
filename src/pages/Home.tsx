import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import ProductSection from "../components/home/ProductSection";
import ProductCard from "../components/home/ProductCard";
import IncentivesSection from "../components/home/IncentivesSection";
import StoreReviews from "../components/home/StoreReviews";
import ProductCarousel from "../components/home/ProductCarousel";
import ProductList from "../components/common/ProductList";

const Home = () => {
	const { handleAddToCart } = useCart();
	const { products, isLoading, error } = useProducts();

	return (
		<section>
			<ProductCarousel />
            <ProductSection isLoading={isLoading} error={error} title = {"Explora nuestros productos!"}>
				<ProductList
						products={products}
						ProductCardComponent={ProductCard}
						cardProps={{ addToCart: handleAddToCart }}
						gridStyle={
							"mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
						}
						showViewAllButton={true}
						qtyProductsShow={8}
					/>
			 </ProductSection>
			<StoreReviews />
			<IncentivesSection />
		</section>
	);
};

export default Home;
