import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";
import ProductDetails from "./components/home/ProductDetails";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
	return (
		<>
			<ScrollToTop />
			<Routes>
				{/* Rutas con MainLayout */}
				<Route element={<MainLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/products" element={<Products />} />
					<Route path="/products/:id" element={<ProductDetails />} />
					<Route path="/login" element={<Login />} />
				</Route>
				{/* Rutas protegidas con AdminLayout */}
				<Route
					element={
						<ProtectedRoute>
							<AdminLayout />
						</ProtectedRoute>
					}
				>
					<Route path="/admin" element={<Admin />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
