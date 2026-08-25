import {
	CalendarDays,
	ChevronDown,
} from "lucide-react";

function TransactionFilters({
	type,
	setType,
	dateRange,
	setDateRange,
}) {
	return (
		<div className="flex items-center gap-4">
			{/* Type Filter */}

			<div className="relative">
				<select
					value={type}
					onChange={(e) =>
						setType(e.target.value)
					}
					className="h-12 w-[205px] appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
				>
					<option value="all">
						All Types
					</option>

					<option value="sale">
						Sale
					</option>

					<option value="receipt">
						Receipt
					</option>

					<option value="adjustment">
						Adjustment
					</option>
				</select>

				<ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
			</div>

			{/* Date Filter */}

			<div className="relative">
				<CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

				<select
					value={dateRange}
					onChange={(e) =>
						setDateRange(e.target.value)
					}
					className="h-12 w-[245px] appearance-none rounded-xl border border-gray-200 bg-white pl-12 pr-10 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
				>
					<option value="30">
						Last 30 days
					</option>

					<option value="7">
						Last 7 days
					</option>

					<option value="90">
						Last 90 days
					</option>

					<option value="365">
						Last year
					</option>

					<option value="all">
						All time
					</option>
				</select>

				<ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
			</div>
		</div>
	);
}

export default TransactionFilters;