export default function Pagination({
  totalPages = 5,
  currentPage,
  onPageChange,
}: {
  totalPages?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 px-3 py-1 rounded-lg ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={`flex justify-center items-center mt-6`}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center justify-center h-8 px-3 text-sm font-medium border rounded-lg me-3 
          ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }`}
      >
        {"<<"}
      </button>

      {renderPageNumbers()}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center h-8 px-3 text-sm font-medium border rounded-lg ms-3 
          ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          }`}
      >
        {">>"}
      </button>
    </div>
  );
}
