import { PropsWithChildren } from "react";
import { Product } from "../../types/Product";

interface ProductListProps extends PropsWithChildren {
	products : Product[];
	ProductCardComponent: React.ComponentType<any>;
	cardProps?: Record<string, any>;
}

const ProductList = ({
	products,
	ProductCardComponent,
	cardProps = {},
}: ProductListProps) => {
	return (
		<>
			{products.map((product) => (
				<ProductCardComponent
					key={product.id}
					product={product}
					{...cardProps}
				/>
			))}
		</>
	);
};

export default ProductList;
