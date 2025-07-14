// src/components/common/ProductSection.tsx
import ContentState from "../common/ContentStateProps";
import ProductList from "../common/ProductList";
import { Product } from "../../types/Product";

interface ProductSectionProps {
	isLoading: boolean;
	error?: string | null;
	products: Product[];
	ProductCardComponent: React.ComponentType<any>;
	cardProps?: Record<string, any>;
	title?: string;
}

//componente destinado a crear seccion grid de productos
const ProductSection = ({
	isLoading,
	error,
	products,
	ProductCardComponent,
	cardProps = {},
	title,
}: ProductSectionProps) => (
	<ContentState isLoading={isLoading} error={error}>
		<section className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-6">
        {title && (
          <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900 mb-4">
            {title}
          </h2>
        )}
        <ProductList
          products={products}
          ProductCardComponent={ProductCardComponent}
          cardProps={cardProps}
          gridStyle={"mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"}
        />
			</div>
		</section>
	</ContentState>
);

export default ProductSection;
