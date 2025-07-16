interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginator = ({ currentPage, totalPages, onPageChange }: PaginatorProps) => (
  <div className="flex justify-center my-4 space-x-2">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        className={`px-4 py-2 rounded-md border transition-colors duration-200 ${
          currentPage === index + 1
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"
        }`}
        onClick={() => onPageChange(index + 1)}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

export default Paginator;