import {
	createContext,
	useState,
	useEffect,
	PropsWithChildren,
	useContext,
} from "react";
import { Product } from "../types/Product";
import {
	createProduct,
	deleteProduct,
	getProducts,
	updateProduct,
} from "../services/products";
import { ToastOptions } from "react-toastify";
import { notify } from "../utils/notify";
import Swal from "sweetalert2";

interface ContextType {
	products: Product[];
	saleProducts: Product[];
	featuredProducts: Product[];
	editingProduct: Product | undefined;
	isLoading: boolean;
	error: string | null;
	showForm: boolean;
	handleSubmit: (product: Omit<Product, "id">, id?: string) => void;
	handdleAddProduct: (product: Omit<Product, "id">) => Promise<void>;
	editProduct: (product: Product) => void;
	handleEditProduct: (
		id: string,
		product: Omit<Product, "id">
	) => Promise<void>;
	handleDeleteProduct: (id: string) => void;
	fetchData: () => void;
	toggleForm: () => void;
}

export const ProductContext = createContext<ContextType | null>(null);

export const ProductProvider = ({ children }: PropsWithChildren) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [editingProduct, setEditingProduct] = useState<Product | undefined>(
		undefined
	);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [showForm, setShowForm] = useState<boolean>(false);

	const toastConfig: ToastOptions = {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);
		const { data, errorFetch } = await getProducts();
		if (data) {
			setProducts(data);
		} else {
			setError(errorFetch || "Error desconocido.");
		}
		setLoading(false);
	};

	const handleSubmit = (product: Omit<Product, "id">, id?: string) => {
		if (id) {
			handleEditProduct(id, product);
		} else {
			handdleAddProduct(product);
		}
	};

	const handdleAddProduct = async (productAdd: Omit<Product, "id">) => {
		const { product, errorFetch } = await createProduct(productAdd);
		if (product) {
			setProducts((prev) => [...prev, product]); // agrego localmente para evitar fetch
			setShowForm(false);
			notify("Producto agregado correctamente", "success", toastConfig);
		} else {
			setError(errorFetch || "Error desconocido.");
		}
	};

	const editProduct = (product: Product) => {
		setEditingProduct(product);
		setShowForm(true);
	};

	const handleEditProduct = async (
		id: string,
		productUpdated: Omit<Product, "id">
	) => {
		const { product, errorFetch } = await updateProduct(id, productUpdated);
		if (product) {
			setProducts((prev) => prev.map((p) => (p.id === id ? product : p))); // update localmente para evitar fetch
			setShowForm(false);
			setEditingProduct(undefined);
			notify("Producto actualizado correctamente", "success", toastConfig);
		} else {
			setError(errorFetch || "Error desconocido.");
		}
	};

	const handleDeleteProduct = (id: string) => {
		const product = products.find((p) => p.id === id);
		if (!product) {
			notify("No se encontró el producto para eliminar.", "error", toastConfig);
			return;
		}
		Swal.fire({
			html: `¿Estás seguro de que quiere eliminar <strong>${product.name}</strong>? <br><strong>Esta acción no se puede deshacer</strong>`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4f39f6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancelar",
			confirmButtonText: "Sí, eliminar",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteProductConfirmed(id);
			}
		});
	};

	const toggleForm = () => {
		setShowForm((prev) => !prev);
	};

	const deleteProductConfirmed = async (id: string) => {
		const { success, errorFetch } = await deleteProduct(id);
		if (success) {
			setProducts((prev) => prev.filter((p) => p.id !== id)); // elimino localmente para evitar fetch
			Swal.fire({
				title: "¡Producto eliminado!",
				text: `el producto no se encuentra más en el inventario.`,
				icon: "success",
			});
		} else {
			setError(errorFetch || "Error desconocido.");
		}
	};

	const saleProducts = products.filter(
		(product) =>
			product.originalPrice &&
			product.originalPrice > product.price
	);

	const featuredProducts = products.slice(0, 4);

	return (
		<ProductContext.Provider
			value={{
				products,
				saleProducts,
				featuredProducts,
				editingProduct,
				isLoading,
				error,
				showForm,
				handleSubmit,
				handdleAddProduct,
				handleEditProduct,
				handleDeleteProduct,
				fetchData,
				toggleForm,
				editProduct,
			}}
		>
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
