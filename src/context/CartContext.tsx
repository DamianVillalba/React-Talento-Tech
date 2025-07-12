import { createContext, useState, PropsWithChildren, useContext } from "react";
import { Product } from "../types/Product";
import Swal from "sweetalert2";
import { Bounce, ToastOptions } from "react-toastify";
import { notify } from "../utils/notify";

interface CartProduct extends Product {
	cartQuantity: number;
}

interface ContextType {
	cart: CartProduct[];
	showCart: boolean;
	handleAddToCart: (product: Product, quantity?: number) => void;
	handleRemoveFromCart: (productName: string, id: string) => void;
	handleIncrementItem: (id: string) => void;
	handleDecrementItem: (id: string) => void;
	toggleCart: () => void;
	processPurchase: () => void;
	handleClearCart: () => void;
}

export const CartContext = createContext<Required<ContextType>>({
	cart: [],
	showCart: false,
	handleAddToCart: () => {},
	handleRemoveFromCart: () => {},
	handleIncrementItem: () => {},
	handleDecrementItem: () => {},
	toggleCart: () => {},
	processPurchase: () => {},
	handleClearCart: () => {},
});

export const CartProvider = ({ children }: PropsWithChildren) => {
	const [cart, setCart] = useState<CartProduct[]>([]);
	const [showCart, setShowCart] = useState(false);

	const toastConfig: ToastOptions = {
		position: "top-right",
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Bounce,
	};

	const handleAddToCart = (product: Product, quantity = 1) => {
		const existingProduct = cart.find((p) => p.id === product.id);
		const currentCartQuantity = existingProduct
			? existingProduct.cartQuantity
			: 0;
		if (currentCartQuantity + quantity > product.quantity) {
			notify(
				"No hay suficiente stock para agregar esta cantidad ❌",
				"error",
				toastConfig
			);
			return;
		}
		setCart((prevCart) => {
			const existing = prevCart.find((p) => p.id === product.id);
			return existing
				? prevCart.map((p) =>
						p.id === product.id
							? { ...p, cartQuantity: p.cartQuantity + quantity }
							: p
				  )
				: [...prevCart, { ...product, cartQuantity: quantity }];
		});
		notify("Producto agregado al carrito 🛒", "success", toastConfig);
	};

	const handleRemoveFromCart = (productName: string, id: string) => {
		Swal.fire({
			title: `Confirmar Eliminación`,
			html: `¿Estás seguro de que quieres quitar <strong>${productName}</strong> del carrito?<br><strong>Esta acción no se puede deshacer</strong>`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4f39f6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancelar",
			confirmButtonText: "Sí, eliminar",
		}).then((result) => {
			if (result.isConfirmed) {
				setCart((prevCart) => prevCart.filter((p) => p.id !== id));
				Swal.fire({
					title: "¡Eliminado!",
					text: `${productName} ha sido eliminado del carrito.`,
					icon: "success",
				});
			}
		});
	};

	const handleIncrementItem = (id: string) => {
		setCart((prevCart) =>
			prevCart.map(
				(p) => (p.id === id ? { ...p, cartQuantity: p.cartQuantity + 1 } : p) //si existe le sumo 1
			)
		);
	};

	const handleDecrementItem = (id: string) => {
		setCart((prevCart) =>
			prevCart.map((p) =>
				p.id === id ? { ...p, cartQuantity: p.cartQuantity - 1 } : p
			)
		);
	};

	const toggleCart = () => setShowCart((prev) => !prev); //cambio al estado contrario

	const processPurchase = () => {
		clearCart();
		//TODO: agregar crud para eliminar bajar cantidad productos
		Swal.fire({
			title: "Compra Exitosa!",
			timer: 3000,
			icon: "success",
			showConfirmButton: false,
		});
	};

	const handleClearCart = () => {
		Swal.fire({
			html: `¿Estás seguro de que quieres <strong>vaciar el carrito</strong>? <br><strong>Esta acción no se puede deshacer</strong>`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4f39f6",
			cancelButtonColor: "#d33",
			cancelButtonText: "Cancelar",
			confirmButtonText: "Sí, vaciar",
		}).then((result) => {
			if (result.isConfirmed) {
				clearCart();
				Swal.fire({
					title: "¡Vaciado!",
					text: `el carrito ha sido vaciado.`,
					icon: "success",
				});
			}
		});
	};

	const clearCart = () => {
		setCart([]);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				showCart,
				toggleCart,
				handleAddToCart,
				handleRemoveFromCart,
				handleIncrementItem,
				handleDecrementItem,
				processPurchase,
				handleClearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

// Hook para usar el contexto
export const useCart = (): ContextType => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart debe usarse dentro de un <CartProvider>");
	}
	return context;
};

export default CartProvider;
