import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//componente para que todas las redirecciones a paginas comiencen siempre arriba
const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default ScrollToTop;