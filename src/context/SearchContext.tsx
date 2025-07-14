import { createContext, useState, useContext, PropsWithChildren } from "react";

interface ContextType {
    search: string;
    updateSearch: (search: string) => void;
}

const SearchContext = createContext<ContextType | null>(null);
export function SearchProvider({ children }: PropsWithChildren) {
	const [search, setBusqueda] = useState("");

    const updateSearch = (search: string) => {
        setBusqueda(search);
    }

	return (
		<SearchContext.Provider value={{ search, updateSearch }}>
			{children}
		</SearchContext.Provider>
	);
}
export function useSearch() {
	const context = useContext(SearchContext);
	if (!context) {
		throw new Error("useSearch debe usarse dentro de un <SearchProvider>");
	}
	return context;
}
