import { Link } from "react-router-dom";
import { Product } from "../../types/Product";

interface ProductCardProps {
	product: Product;
	addToCart: (product: Product) => void;
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
	return (
		<div className="group relative">
			<img
				alt={product.name}
				src={product.img_url}
				className="w-full h-90 object-fit max-h-full"
			/>
			<div className="mt-4 w-full flex flex-col items-center">
				<h3
					className="text-base font-bold text-gray-700 text-center mb-1 truncate"
					title={product.name}
				>
					{product.name}
				</h3>
				<p className="text-lg font-semibold text-gray-900 text-center">
					${product.price.toLocaleString("es-AR")}
				</p>
			</div>
			<div className="mt-4 flex gap-2">
				<Link to={`/products/${product.id}`} className="w-1/2">
					<button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-500 transition hover:cursor-pointer">
						Ver más
					</button>
				</Link>
				{product.quantity > 0 ? (
					<button
						onClick={() => addToCart(product)}
						className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition hover:cursor-pointer"
					>
						Agregar al carrito
					</button>
				) : (
					<p className="w-full bg-red-100 text-red-700 text-center font-semibold py-2 rounded-md mb-0">
						Sin stock
					</p>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
