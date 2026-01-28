interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
}: PaginationProps) {
	const handlePageChange = (page: number) => {
		onPageChange(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (totalPages <= 1) return null;

	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
			{/* Results Summary */}
			<div className="text-xs sm:text-sm text-gray-600">
				Showing <span className="font-semibold text-blue-900">{startItem}</span>{" "}
				to <span className="font-semibold text-blue-900">{endItem}</span> of{" "}
				<span className="font-semibold text-blue-900">{totalItems}</span>{" "}
				results
			</div>

			{/* Pagination Controls */}
			<div className="flex items-center gap-2">
				{/* Previous Button */}
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
						currentPage === 1
							? "bg-gray-100 text-gray-400 cursor-not-allowed"
							: "bg-blue-100 text-blue-700 hover:bg-blue-200"
					}`}
				>
					Previous
				</button>

				{/* Page Numbers */}
				<div className="flex gap-1">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map(
						(pageNum) => {
							const showPage =
								pageNum === 1 ||
								pageNum === totalPages ||
								(pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

							const showEllipsis =
								(pageNum === 2 && currentPage > 3) ||
								(pageNum === totalPages - 1 && currentPage < totalPages - 2);

							if (!showPage && !showEllipsis) return null;

							if (showEllipsis) {
								return (
									<span
										key={pageNum}
										className="px-2 sm:px-3 py-1 text-gray-500 text-xs sm:text-sm"
									>
										...
									</span>
								);
							}

							return (
								<button
									key={pageNum}
									onClick={() => handlePageChange(pageNum)}
									className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
										currentPage === pageNum
											? "bg-blue-600 text-white shadow-md"
											: "bg-gray-100 text-gray-700 hover:bg-gray-200"
									}`}
								>
									{pageNum}
								</button>
							);
						},
					)}
				</div>

				{/* Next Button */}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
						currentPage === totalPages
							? "bg-gray-100 text-gray-400 cursor-not-allowed"
							: "bg-blue-100 text-blue-700 hover:bg-blue-200"
					}`}
				>
					Next
				</button>
			</div>
		</div>
	);
}
