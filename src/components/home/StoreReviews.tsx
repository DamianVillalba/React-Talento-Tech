import { Star, CheckCircle } from "lucide-react";
import { useProducts } from "../../context/ProductContext";

const StoreReviews = () => {
	const { isLoading } = useProducts();

	const reviews = [
		{
			id: "1",
			userName: "María González",
			userAvatar:
				"https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
			rating: 5,
			comment:
				"Excelente servicio al cliente. La entrega fue súper rápida y todo llegó en perfecto estado.",
			date: new Date("2025-01-15"),
			verified: true,
		},
		{
			id: "2",
			userName: "Carlos Rodríguez",
			userAvatar:
				"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
			rating: 5,
			comment:
				"Increíble experiencia de compra. Los precios son competitivos y la atención personalizada es excepcional.",
			date: new Date("2025-01-12"),
			verified: true,
		},
		{
			id: "3",
			userName: "Ana Martínez",
			userAvatar:
				"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
			rating: 4,
			comment:
				"Muy satisfecha con mi compra. El proceso fue sencillo y el soporte técnico resolvió todas mis dudas.",
			date: new Date("2025-01-10"),
			verified: true,
		},
		{
			id: "4",
			userName: "Luis Fernández",
			userAvatar:
				"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
			rating: 5,
			comment:
				"Recomiendo totalmente esta tienda. Mangas originales, envío gratuito con mi compra y devoluciones sin complicaciones.",
			date: new Date("2025-01-08"),
			verified: true,
		},
	];

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("es-ES", {
			day: "numeric",
			month: "long",
			year: "numeric",
		}).format(date);
	};

	const averageRating =
		reviews.reduce((acc, review) => acc + review.rating, 0) /
		reviews.length;

	if (isLoading) {
		return (
			<div className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="animate-pulse">
						<div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-12"></div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{[...Array(4)].map((_, index) => (
								<div key={index} className="bg-white rounded-xl p-6">
									<div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
									<div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
									<div className="h-16 bg-gray-200 rounded"></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<section className="py-6 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Lo que dicen nuestros clientes
					</h2>
					<div className="flex items-center justify-center space-x-2 mb-4">
						<div className="flex items-center">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`w-6 h-6 ${
										i < Math.floor(averageRating)
											? "text-yellow-400 fill-current"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className="text-lg font-semibold text-gray-900">
							{averageRating.toFixed(1)}
						</span>
						<span className="text-gray-600">
							({reviews.length} reseñas)
						</span>
					</div>
					<p className="text-lg text-gray-600">
						Experiencias reales de clientes satisfechos
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{reviews.map((review) => (
						<div
							key={review.id}
							className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
						>
							{/* Info usuario */}
							<div className="flex items-center space-x-4 mb-4">
								<img
									src={review.userAvatar}
									alt={review.userName}
									className="w-12 h-12 rounded-full object-cover"
								/>
								<div className="flex-1">
									<div className="flex items-center space-x-2">
										<h4 className="font-semibold text-gray-900">
											{review.userName}
										</h4>
										{review.verified && (
											<CheckCircle className="w-4 h-4 text-green-500" />
										)}
									</div>
									<p className="text-sm text-gray-500">
										{formatDate(review.date)}
									</p>
								</div>
							</div>

							<div className="flex items-center mb-4">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-4 h-4 ${
											i < review.rating
												? "text-yellow-400 fill-current"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>

							<p className="text-gray-700 leading-relaxed">
								"{review.comment}"
							</p>

							{review.verified && (
								<div className="mt-4 flex items-center space-x-1 text-sm text-green-600">
									<CheckCircle className="w-4 h-4" />
									<span>Compra verificada</span>
								</div>
							)}
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<p className="text-gray-600 mb-4">
						¿Que esperas para comprar? ¡No te lo pierdas!
					</p>
				</div>
			</div>
		</section>
	);
};

export default StoreReviews;
