import { Product } from "../../types/Product";

interface ProductGridProps {
	products: Product[];
	ProductCardComponent: React.ComponentType<any>;
	cardProps?: Record<string, any>;
	gridStyle: string;
}

const ProductGrid = ({
	products,
	ProductCardComponent,
	cardProps = {},
	gridStyle,
}: ProductGridProps) => (
	<div className={gridStyle}>
		{products.map((product) => (
			<ProductCardComponent key={product.id} product={product} {...cardProps} />
		))}
	</div>
);

export default ProductGrid;
