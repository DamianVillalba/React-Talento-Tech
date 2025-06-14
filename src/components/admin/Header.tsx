import { Package, RefreshCw, Plus } from "lucide-react";
import { useProducts } from "../../context/ProductContext";

export default function Header() {

	const {isLoading, toggleForm, fetchData} = useProducts();

	return (
		<header className="bg-amber-100 shadow-sm border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-6">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-indigo-600 rounded-lg">
							<Package className="h-6 w-6 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								Dashboard Administrativo
							</h1>
							<p className="text-sm text-gray-600">
								Gestión de productos e inventario
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<button
							onClick={fetchData}
							disabled={isLoading}
							className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-white/50 rounded-lg transition-colors disabled:opacity-50"
							title="Actualizar"
						>
							<RefreshCw
								className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
							/>
						</button>

						<button
							onClick={() => toggleForm()}
							className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
						>
							<Plus className="h-4 w-4" />
							Nuevo Producto
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}
