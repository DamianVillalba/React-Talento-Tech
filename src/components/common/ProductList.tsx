import React, { PropsWithChildren, useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { useSearch } from "../../context/SearchContext";
import SearchBar from "./SearchBar";
import Paginator from "./Paginator";
import ProductGrid from "./ProductGrid";
import { Link, useParams } from "react-router-dom";

interface ProductListProps extends PropsWithChildren {
	products: Product[];
	ProductCardComponent: React.ComponentType<any>;
	cardProps?: Record<string, any>;
	gridStyle: string;
	showSearchBar?: boolean;
	showPaginator?: boolean;
	qtyProductsPerPage?: number;
	showViewAllButton?: boolean;
}

const ProductList = ({
	products,
	ProductCardComponent,
	cardProps = {},
	gridStyle,
	showSearchBar,
	showPaginator,
	qtyProductsPerPage,
	showViewAllButton,
}: ProductListProps) => {
	const { search, updateSearch } = useSearch();
	const { page } = useParams();

	// Cargar la página correspondiente
	const currentPage = parseInt(page ?? '1', 10);

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	);

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
				<div className="flex flex-col items-center">
					<ProductGrid
						products={currentProducts}
						ProductCardComponent={ProductCardComponent}
						cardProps={cardProps}
						gridStyle={gridStyle}
					/>
					{showViewAllButton && (
						<Link to="/products">
							<button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors duration-300 mt-4 hover:cursor-pointer">
								Ver Todo
							</button>
						</Link>
					)}
				</div>
			) : (
				<p className="text-center text-gray-500 text-lg mt-8 font-medium">
					No hay productos que coincidan con la búsqueda.
				</p>
			)}
			{showPaginator && (
				<Paginator
					currentPage={currentPage}
					totalPages={totalPages}
					basePath={`/products`}
				/>
			)}
		</>
	);
};

export default ProductList;
