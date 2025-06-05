import { createContext, useState, PropsWithChildren, useContext } from "react";
import { Product } from "../types/Product";
import Swal from "sweetalert2";

interface ContextType {
	cart: Product[];
	showCart: boolean;
	handleAddToCart: (product: Product) => void;
	handleRemoveFromCart: (productName: string, id: string) => void;
	handleIncrementItem: (id: string) => void;
	handleDecrementItem: (id: string) => void;
	toggleCart: () => void;
	//handleClearCart: () => void; mas adelante
}

export const CartContext = createContext<ContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
	const [cart, setCart] = useState<Product[]>([]);
	const [showCart, setShowCart] = useState(false);

	const handleAddToCart = (product: Product) => {
		setCart((prevCart) => {
			const existing = prevCart.find((p) => p.id === product.id); //busco si existe el producto en el carrito
			if (existing) {
				return prevCart.map(
					(p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p) //si existe le sumo 1
				);
			}
			return [...prevCart, { ...product, quantity: 1 }]; //sino agrego el producto y le asigno 1 como cantidad inicial
		});
	};

	const handleRemoveFromCart = (productName : string, id: string) => {
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
				(p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p) //si existe le sumo 1
			)
		);
	};

	const handleDecrementItem = (id: string) => {
		setCart(
			(prevCart) =>
				prevCart
					.map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
					.filter((p) => p.quantity > 0) // elimina si llega a 0
		);
	};

	const toggleCart = () => setShowCart((prev) => !prev); //cambio al estado contrario

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
