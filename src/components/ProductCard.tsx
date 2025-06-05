import { Link } from "react-router-dom";
import { Product } from "../types/Product";
import { Bounce, toast } from "react-toastify";

interface ProductCardProps {
	product: Product;
	addToCart: (product: Product) => void;
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
	const notify = () =>
		toast.success("Producto agregado al carrito 🛒", {
			position: "top-right",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Bounce,
		});

	const addAndNotify = (product: Product) => {
		addToCart(product);
		notify();
	};

	return (
		<div className="group relative">
			<img
				alt="Product"
				src="https://placehold.co/240x320?text=Product"
				className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
			/>
			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm text-gray-700">{product.name}</h3>
					<p className="text-sm font-medium text-gray-900">
						Stock: {product.quantity}
					</p>
				</div>
				<p className="text-sm font-medium text-gray-900">{product.price}</p>
			</div>
			<div className="mt-4 flex gap-2">
				<Link to={`/products/${product.id}`} className="w-1/2">
					<button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition hover:cursor-pointer">
						Ver más
					</button>
				</Link>
				<button
					onClick={() => addAndNotify(product)}
					className="w-3/4 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition hover:cursor-pointer"
				>
					Agregar al carrito
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
