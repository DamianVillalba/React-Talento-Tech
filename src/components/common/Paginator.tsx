import { Link } from "react-router-dom";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Paginator = ({ currentPage, totalPages, basePath }: PaginatorProps) => (
  <div className="flex justify-center my-4 space-x-2">
    {Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      return (
        <Link
          key={page}
          to={`${basePath}?page=${page}`}
          replace
          className={`px-4 py-2 rounded-md border transition-colors duration-200 ${
            currentPage === page
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
          }`}
        >
          {page}
        </Link>
      );
    })}
  </div>
);

export default Paginator;