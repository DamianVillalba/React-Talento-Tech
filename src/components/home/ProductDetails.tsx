import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import NotFound from "../../pages/NotFound";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

const ProductDetails = () => {
	const [quantity, setQuantity] = useState(1);
	const { id } = useParams();
	const { products } = useProducts();
	const { handleAddToCart } = useCart();

	const product = products.find((p) => p.id === id);

	if (!product) {
		return <NotFound />;
	}

	const isLowStock = product.quantity <= 10;
	const isOutOfStock = product.quantity === 0;
	const maxQuantity = Math.min(product.quantity, 10);

	const handleQuantityChange = (change: number) => {
		const newQuantity = quantity + change;
		if (newQuantity >= 1 && newQuantity <= maxQuantity) {
			setQuantity(newQuantity);
		}
	};

	return (
		<section className="min-h-screen bg-gray-50">
			<div className="bg-white border-b border-gray-100">
				<div className="flex items-center gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<Link to="/products" className="flex items-center group">
						<ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
						<span className="ml-1 text-gray-600 group-hover:text-gray-900 transition-colors">
							Volver a Productos
						</span>
					</Link>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Product Images */}
					<div className="space-y-4">
						{/* Main Image */}
						<div className="aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-lg">
							<img
								src={product.img_url}
								alt={product.name}
								className="w-full h-full object-fit"
							/>
						</div>
					</div>

					{/* Product Information */}
					<div className="space-y-6">
						<div>
							<h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
								{product.name}
							</h1>
						</div>

						<div className="flex items-center gap-4">
							<span className="text-4xl font-bold text-gray-900">
								${product.price}
							</span>
						</div>

						<div className="prose prose-gray max-w-none">
							<p className="text-gray-700 leading-relaxed">
								{product.description}
							</p>
						</div>

						{/* Stock Status */}
						{(isLowStock || isOutOfStock) && (
							<div
								className={`p-3 rounded-lg ${
									isOutOfStock
										? "bg-red-50 border border-red-200"
										: "bg-orange-50 border border-orange-200"
								}`}
							>
								<p
									className={`text-sm text-center font-medium ${
										isOutOfStock ? "text-red-700" : "text-orange-700"
									}`}
								>
									{isOutOfStock
										? "Actualmente sin stock"
										: `Ultimas ${product.quantity} unidades`}
								</p>
							</div>
						)}

						<div className="space-y-4">
							<div className="flex items-center gap-4">
								<span className="text-sm font-medium text-gray-700">
									Cantidad:
								</span>
								<div className="flex items-center border border-gray-300 rounded-lg">
									<button
										onClick={() => handleQuantityChange(-1)}
										disabled={quantity <= 1}
										className="p-2 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Minus className="w-4 h-4" />
									</button>
									<span className="px-4 py-2 font-medium">{quantity}</span>
									<button
										onClick={() => handleQuantityChange(1)}
										disabled={quantity >= maxQuantity}
										className="p-2 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<Plus className="w-4 h-4" />
									</button>
								</div>
							</div>

							<div className="flex gap-3">
								<button
									onClick={() => handleAddToCart(product, quantity)}
									disabled={isOutOfStock}
									className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
										isOutOfStock
											? "bg-gray-100 text-gray-400 cursor-not-allowed"
											: "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer hover:shadow-lg active:scale-95"
									}`}
								>
									<ShoppingCart className="w-5 h-5" />
									{isOutOfStock
										? "Fuera de stock"
										: `Agregar al carrito - $${(
												product.price * quantity
										  ).toFixed(2)}`}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
