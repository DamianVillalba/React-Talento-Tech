import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import NotFound from "../../pages/NotFound";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatPrice, calculateSavings, isProductOnSale, calculateDiscount } from '../../utils/productUtils';

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

    const isOnSale = isProductOnSale(product.price, product.originalPrice);

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= maxQuantity) {
            setQuantity(newQuantity);
        }
    };

    return (
        <section className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="flex items-center gap-2 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link to="/products" className="flex items-center group">
                        <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                        <span className="ml-1 text-gray-600 group-hover:text-gray-900 transition-colors">
                            Volver a Productos
                        </span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pt-0">
                <div className="bg-white rounded-2xl rounded-t-none shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]">
                        {/* Product Image */}
                        <div className="relative bg-gray-50 flex items-center justify-center p-6">
                            <div className="relative w-full max-w-sm aspect-square">
                                <img
                                    src={product.img_url}
                                    alt={product.name}
                                    className="w-full h-full object-contain rounded-lg"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/400x400/cccccc/333333?text=Imagen+no+disponible';
                                    }}
                                />
                                {/* Sale Badge */}
                                {isOnSale && (
                                    <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                        -{calculateDiscount(product.price, product.originalPrice)}% OFF
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Information */}
                        <div className="p-6 lg:p-8 flex flex-col justify-center">
                            <div className="space-y-4">
                                {/* Category */}
                                <div>
                                    <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                                        {product.category.toUpperCase()}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                                    {product.name}
                                </h1>

                                {/* Price */}
                                <div className="space-y-1">
                                    <div className="flex items-baseline gap-3">
                                        {isOnSale ? (
                                            <>
                                                <span className="text-2xl font-bold text-red-600">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <span className="text-lg text-gray-500 line-through">
                                                    {formatPrice(product.originalPrice ?? 0)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-2xl font-bold text-gray-900">
                                                {formatPrice(product.price)}
                                            </span>
                                        )}
                                    </div>
                                    {isOnSale && (
                                        <p className="text-sm text-green-700 font-semibold">
                                            Ahorra {formatPrice(calculateSavings(product.price, product.originalPrice))}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
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
                                                : `Últimas ${product.quantity} unidades`}
                                        </p>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-700">
                                        Cantidad:
                                    </span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1 || isOutOfStock}
                                            className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            disabled={quantity >= maxQuantity || isOutOfStock}
                                            className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="pt-2">
                                    <button
                                        onClick={() => handleAddToCart(product, quantity)}
                                        disabled={isOutOfStock}
                                        className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition-all ${
                                            isOutOfStock
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98]"
                                        }`}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        {isOutOfStock
                                            ? "Fuera de stock"
                                            : `Agregar al carrito - ${formatPrice(product.price * quantity)}`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;