import { Search, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";

interface SortOption<T> {
	value: T;
	label: string;
}

interface SearchAndSortBarProps<T extends string> {
	searchValue: string;
	setSearchValue: (value: string) => void;
	sortField: T;
	setSortField: (field: T) => void;
	sortDirection: "asc" | "desc";
	setSortDirection: (direction: "asc" | "desc") => void;
	setPage: (page: number) => void;
	sortOptions: SortOption<T>[];
}

export default function SearchAndSortBar<T extends string>({
	searchValue,
	setSearchValue,
	sortField,
	setSortField,
	sortDirection,
	setSortDirection,
	setPage,
	sortOptions,
}: SearchAndSortBarProps<T>) {
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		setPage(1);
	};

	const handleSortFieldChange = (value: string) => {
		setSortField(value as T);
		setPage(1);
	};

	const handleDirectionToggle = () => {
		setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		setPage(1);
	};

	return (
		<div className="flex flex-col sm:flex-row gap-3">
			{/* Search Bar */}
			<div className="relative flex-1">
				<Search
					className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
					size={18}
				/>
				<input
					type="text"
					placeholder="Search..."
					value={searchValue}
					onChange={handleSearchChange}
					className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
				/>
			</div>

			{/* Sort Control */}
			<div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2 border border-blue-200">
				<ArrowUpDown className="text-blue-600" size={16} />
				<span className="text-xs sm:text-sm text-blue-700 font-medium">
					Sort:
				</span>
				<select
					value={sortField}
					onChange={(e) => handleSortFieldChange(e.target.value)}
					className="text-xs sm:text-sm border-0 bg-transparent focus:outline-none focus:ring-0 cursor-pointer font-medium text-blue-900"
				>
					{sortOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>

				<button
					onClick={handleDirectionToggle}
					className="p-1 hover:bg-blue-100 rounded transition-colors"
					title={sortDirection === "asc" ? "Ascending" : "Descending"}
					aria-label={`Sort direction: ${sortDirection === "asc" ? "Ascending" : "Descending"}`}
				>
					{sortDirection === "asc" ? (
						<ChevronUp className="w-4 h-4 text-blue-700" />
					) : (
						<ChevronDown className="w-4 h-4 text-blue-700" />
					)}
				</button>
			</div>
		</div>
	);
}
