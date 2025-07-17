import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useProducts } from "../../context/ProductContext";
import { Product } from "../../types/Product";
import { useCart } from "../../context/CartContext";
import { formatPrice, calculateSavings, isProductOnSale, calculateDiscount } from '../../utils/productUtils';

const ProductCarousel = () => {
    const { featuredProducts, isLoading } = useProducts();
    const { handleAddToCart } = useCart();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying || featuredProducts.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, featuredProducts.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length
        );
    };

    if (isLoading) {
        return (
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
                        <div className="h-96 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Productos Destacados
                    </h2>
                    <p className="text-lg text-gray-600">
                        Descubre nuestra selección premium de productos
                    </p>
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Container */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {featuredProducts.map((product: Product) => (
                                <div key={product.id} className="w-full flex-shrink-0">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8 min-h-[400px] lg:h-[550px]">
                                        {/* Imagen Producto */}
                                        <div className="w-full h-64 sm:h-80 lg:h-full flex items-center justify-center bg-white rounded-lg overflow-hidden"> 
                                            <img
                                                src={product.img_url}
                                                alt={product.name}
                                                className="object-contain w-full h-full rounded-lg shadow-lg p-2 transition-transform duration-300 ease-in-out"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://placehold.co/400x300/cccccc/333333?text=Imagen+no+disponible';
                                                }}
                                            />
                                            {isProductOnSale(product.price, product.originalPrice) && (
                                                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
                                                    -{calculateDiscount(product.price, product.originalPrice)}% OFF
                                                </div>
                                            )}
                                        </div>

                                        {/* Info Producto */}
                                        <div className="flex flex-col justify-center p-4 flex-grow">
                                            <div className="mb-4">
                                                <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                                                    {product.category.toLocaleUpperCase()}
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                                {product.name}
                                            </h3>

                                            <p className="text-gray-600 mb-4 leading-relaxed text-sm lg:text-base line-clamp-4 lg:line-clamp-9"> 
                                                {product.description}
                                            </p>

                                            {/* Precio */}
                                            <div className="mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-2xl font-bold text-gray-900">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                    {product.originalPrice && (
                                                        <span className="text-lg text-gray-500 line-through">
                                                            {formatPrice(product.originalPrice)}
                                                        </span>
                                                    )}
                                                </div>
                                                {isProductOnSale(product.price, product.originalPrice) && (
                                                    <p className="text-sm text-green-600 mt-1">
                                                        Ahorra{" "}
                                                        {formatPrice(calculateSavings(product.price, product.originalPrice))}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Boton Compra */}
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto mt-auto"
                                            >
                                                <ShoppingCart className="w-5 h-5" />
                                                <span>Añadir al Carrito</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botones de navegacion */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10 md:block hidden"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10 md:block hidden"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indices */}
                    <div className="flex justify-center space-x-2 mt-6">
                        {featuredProducts.map((_: any, index: number) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? "bg-blue-600 w-8"
                                        : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;
