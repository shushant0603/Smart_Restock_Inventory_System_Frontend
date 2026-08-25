import TransactionFilters from "./TransactionFilters";

function TransactionToolbar({
	type,
	setType,
	dateRange,
	setDateRange,
}) {
	return (
		<div className="flex items-center justify-start">
			<TransactionFilters
				type={type}
				setType={setType}
				dateRange={dateRange}
				setDateRange={setDateRange}
			/>
		</div>
	);
}

export default TransactionToolbar;