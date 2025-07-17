import { Link } from "react-router-dom";
import { Product } from "../../types/Product";
import {
    calculateDiscount,
    calculateSavings,
    formatPrice,
    isProductOnSale,
} from "../../utils/productUtils";

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
}

const ProductCard = ({ product, addToCart }: ProductCardProps) => {
    const isOnSale = isProductOnSale(product.price, product.originalPrice);

    return (
        <div
            className={`
                group relative
                bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                flex flex-col h-full
                ${isOnSale ? 'border-2 border-red-500 ring-2 ring-red-200' : 'border border-gray-200'}
            `}
        >
            <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden rounded-t-xl flex items-center justify-center">
                <img
                    alt={product.name}
                    src={product.img_url}
                    className="object-contain w-full h-full p-4"
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/400x300/cccccc/333333?text=Imagen+no+disponible';
                    }}
                />
                {isOnSale && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
                        -{calculateDiscount(product.price, product.originalPrice)}% OFF
                    </div>
                )}
            </div>

            <div className="mt-4 px-4 pb-4 flex flex-col flex-grow">
                <h3
                    className="text-lg font-bold text-gray-800 text-center mb-2 leading-tight min-h-[3.5rem] flex items-center justify-center"
                    title={product.name}
                >
                    {product.name}
                </h3>

                <div className="flex flex-col items-center justify-center mb-2 min-h-[4rem]">
                    {isOnSale ? (
                        <>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-2xl font-extrabold text-red-600">
                                    {formatPrice(product.price)}
                                </span>
                                <span className="text-lg text-gray-500 line-through">
                                    {formatPrice(product.originalPrice ?? 0)}
                                </span>
                            </div>
                            <p className="text-sm text-green-700 font-semibold mt-1">
                                Ahorra {formatPrice(calculateSavings(product.price, product.originalPrice))}
                            </p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-extrabold text-gray-900">
                                {formatPrice(product.price)}
                            </span>
                            <div className="h-6"></div>
                        </div>
                    )}
                </div>

                <div className="mt-auto flex flex-col gap-2 pt-4">
                    <Link to={`/products/${product.id}`} className="w-full">
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
                        >
                            Ver más
                        </button>
                    </Link>
                    {product.quantity > 0 ? (
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
                        >
                            Agregar al carrito
                        </button>
                    ) : (
                        <p className="w-full bg-red-100 text-red-700 text-center font-semibold py-2 rounded-lg mb-0 opacity-80 shadow-sm">
                            Sin stock
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
