import React, { PropsWithChildren, useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { useSearch } from "../../context/SearchContext";
import SearchBar from "./SearchBar";
import Paginator from "./Paginator";
import ProductGrid from "./ProductGrid";

interface ProductListProps extends PropsWithChildren {
	products: Product[];
	ProductCardComponent: React.ComponentType<any>;
	cardProps?: Record<string, any>;
	gridStyle: string;
	showSearchBar?: boolean;
	showPaginator?: boolean;
	qtyProductsPerPage?: number;
}

const ProductList = ({
	products,
	ProductCardComponent,
	cardProps = {},
	gridStyle,
	showSearchBar,
	showPaginator,
	qtyProductsPerPage,
}: ProductListProps) => {
	const { search, updateSearch } = useSearch();
	const [currentPage, setCurrentPage] = useState(1);

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	);

	// Resetear página al cambiar búsqueda
	useEffect(() => {
		setCurrentPage(1);
	}, [search]);

	const productsPerPage = qtyProductsPerPage || 8;
	const LastIndex = currentPage * productsPerPage;
	const FirstIndex = LastIndex - productsPerPage;
	const currentProducts = filteredProducts.slice(FirstIndex, LastIndex);
	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	return (
		<>
			{showSearchBar && (
				<SearchBar
					value={search}
					onChange={updateSearch}
					placeholder="Buscar productos..."
				/>
			)}
			{filteredProducts.length > 0 ? (
				<ProductGrid
					products={currentProducts}
					ProductCardComponent={ProductCardComponent}
					cardProps={cardProps}
					gridStyle={gridStyle}
				/>
			) : (
				<p className="text-center text-gray-500 text-lg mt-8 font-medium">
					No hay productos que coincidan con la búsqueda.
				</p>
			)}
			{showPaginator && (
				<Paginator
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			)}
		</>
	);
};

export default ProductList;
