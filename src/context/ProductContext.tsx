import {
	createContext,
	useState,
	useEffect,
	PropsWithChildren,
	useContext,
} from "react";
import { Product } from "../types/Product";

interface ContextType {
	products: Product[];
	loading: boolean;
	error: string | null;
}

export const ProductContext = createContext<ContextType | null>(null);

export const ProductProvider = ({ children }: PropsWithChildren) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("https://6812aab0129f6313e20f36c5.mockapi.io/products/products")
			.then((respuesta) => {
				if (!respuesta.ok) {
					throw new Error(respuesta.status.toString());
				}
				return respuesta.json();
			})
			.then((datos: Product[]) => {
				setProducts(datos);
				setLoading(false);
			})
			.catch((error: Error) => {
				setError(
					`Hubo un error en la carga de productos: ERROR ${error.message}`
				);
				setLoading(false);
			});
	}, []);

	return (
		<ProductContext.Provider value={{ products, loading, error }}>
			{children}
		</ProductContext.Provider>
	);
};

// Hook para usar el contexto
export const useProducts = (): ContextType => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error("useProducts debe usarse dentro de un <ProductsProvider>");
	}
	return context;
};

export default ProductContext;
