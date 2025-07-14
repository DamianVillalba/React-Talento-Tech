import { PropsWithChildren } from "react";
import { Product } from "../../types/Product";
import { useSearch } from "../../context/SearchContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ProductListProps extends PropsWithChildren {
	products: Product[];
	ProductCardComponent: React.ComponentType<any>;
	cardProps?: Record<string, any>;
}

const ProductList = ({
	products,
	ProductCardComponent,
	cardProps = {},
}: ProductListProps) => {
	const { search, updateSearch } = useSearch();
	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			<div className="flex justify-end mb-4">
				<div className="relative max-w-md w-full">
					<span className="absolute inset-y-0 left-0 flex items-center pl-3">
						<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
					</span>
					<input
						type="text"
						placeholder="Buscar productos..."
						className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
						value={search}
						onChange={(e) => updateSearch(e.target.value)}
					/>
				</div>
			</div>
			{filteredProducts.length > 0 ? (
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{filteredProducts.map((product) => (
						<ProductCardComponent
							key={product.id}
							product={product}
							{...cardProps}
						/>
					))}
				</div>
			) : (
				<p className="text-center text-gray-500 text-lg mt-8 font-medium">
					No hay productos que coincidan con la búsqueda.
				</p>
			)}
		</>
	);
};

export default ProductList;
