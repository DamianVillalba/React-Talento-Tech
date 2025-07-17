import { useEffect } from "react";

export const useScrollToTopOnPageChange = (page: number) => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [page]);
};