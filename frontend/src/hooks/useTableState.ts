import { useState, useMemo } from "react";

export interface UseTableStateOptions<T, SortField extends keyof T> {
	data: T[];
	itemsPerPage?: number;
	defaultSortField: SortField;
	defaultSortDirection?: "asc" | "desc";
	searchFields: (keyof T)[];
}

export function useTableState<T, SortField extends keyof T>({
	data,
	itemsPerPage = 5,
	defaultSortField,
	defaultSortDirection = "asc",
	searchFields,
}: UseTableStateOptions<T, SortField>) {
	const [searchValue, setSearchValue] = useState("");
	const [sortField, setSortField] = useState<SortField>(defaultSortField);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
		defaultSortDirection,
	);
	const [currentPage, setCurrentPage] = useState(1);

	// Filter and sort data
	const filteredAndSorted = useMemo(() => {
		let result = [...data];

		// Filter
		if (searchValue) {
			result = result.filter((item) => {
				return searchFields.some((field) => {
					const value = item[field];
					if (typeof value === "string") {
						return value.toLowerCase().includes(searchValue.toLowerCase());
					}
					return false;
				});
			});
		}

		// Sort
		result.sort((a, b) => {
			let aValue = a[sortField as keyof T];
			let bValue = b[sortField as keyof T];

			// Handle string comparison
			if (typeof aValue === "string" && typeof bValue === "string") {
				aValue = aValue.toLowerCase() as typeof aValue;
				bValue = bValue.toLowerCase() as typeof bValue;
			}

			if (sortDirection === "asc") {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});

		return result;
	}, [data, searchValue, sortField, sortDirection, searchFields]);

	// Calculate pagination
	const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredAndSorted.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredAndSorted, currentPage, itemsPerPage]);

	// Reset to page 1 when filters change
	const handleSearchChange = (value: string) => {
		setSearchValue(value);
		setCurrentPage(1);
	};

	const handleSortFieldChange = (field: SortField) => {
		setSortField(field);
		setCurrentPage(1);
	};

	const handleSortDirectionChange = (direction: "asc" | "desc") => {
		setSortDirection(direction);
		setCurrentPage(1);
	};

	const clearSearch = () => {
		setSearchValue("");
		setCurrentPage(1);
	};

	return {
		// Data
		filteredAndSorted,
		paginatedData,

		// Search state
		searchValue,
		setSearchValue: handleSearchChange,
		clearSearch,

		// Sort state
		sortField,
		setSortField: handleSortFieldChange,
		sortDirection,
		setSortDirection: handleSortDirectionChange,

		// Pagination state
		currentPage,
		setCurrentPage,
		totalPages,
		itemsPerPage,

		// Computed values
		totalItems: filteredAndSorted.length,
		hasData: paginatedData.length > 0,
		isEmpty: filteredAndSorted.length === 0,
	};
}
