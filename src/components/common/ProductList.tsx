import { PropsWithChildren } from "react";
import { Product } from "../../types/Product";
import { useSearch } from "../../context/SearchContext";
import SearchBar from "./SearchBar";
import Paginator from "./Paginator";
import ProductGrid from "./ProductGrid";
import { Link } from "react-router-dom";
import { useResetPageOnSearchChange } from "../../hooks/useResetPageOnSearchChange";
import { usePagination } from "../../hooks/usePagination";

interface ProductListProps extends PropsWithChildren {
	products: Product[];
	ProductCardComponent: React.ComponentType<any>;
	cardProps?: Record<string, any>;
	gridStyle: string;
	showSearchBar?: boolean;
	showPaginator?: boolean;
	paginatorPath?: string;
	qtyProductsPerPage?: number;
	qtyProductsShow?: number;
	showViewAllButton?: boolean;
}

const ProductList = ({
	products,
	ProductCardComponent,
	cardProps = {},
	gridStyle,
	showSearchBar = false,
	showPaginator = false,
	qtyProductsPerPage = 8,
	qtyProductsShow,
	showViewAllButton,
	paginatorPath,
}: ProductListProps) => {
	const { search, updateSearch } = useSearch();

	// Cada vez que se cambia el texto del buscador, vuelve a la página 1
	useResetPageOnSearchChange(search, showPaginator);

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	);

	//configuracion del paginador
	const paginationData = usePagination({
		items: filteredProducts,
		qtyPerPage: qtyProductsPerPage,
	});

	const { currentPage, currentItems, totalPages } = paginationData;

	//selecciono los productos en base si hay paginador o no.
	const currentProducts = showPaginator ? currentItems : filteredProducts.slice(0, qtyProductsShow);

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
			{showPaginator && paginatorPath && (
				<Paginator
					currentPage={currentPage}
					totalPages={totalPages}
					basePath={paginatorPath}
				/>
			)}
		</>
	);
};

export default ProductList;
