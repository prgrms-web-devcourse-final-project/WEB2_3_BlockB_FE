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
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
      endPage = totalPages;
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-0.5 sm:mx-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg ${
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
    <div className="flex justify-center items-center mt-4 sm:mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center justify-center h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm font-medium border rounded-lg me-2 sm:me-3
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
        className={`flex items-center justify-center h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm font-medium border rounded-lg ms-2 sm:ms-3
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
