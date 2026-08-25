function TransactionTypeBadge({ type }) {
	const styles = {
		sale: "bg-blue-50 text-blue-600 border-blue-100",
		receipt:
			"bg-green-50 text-green-600 border-green-100",
		adjustment:
			"bg-orange-50 text-orange-600 border-orange-100",
	};

	const labels = {
		sale: "Sale",
		receipt: "Receipt",
		adjustment: "Adjustment",
	};

	return (
		<span
			className={`inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium ${
				styles[type] ||
				"border-gray-100 bg-gray-50 text-gray-600"
			}`}
		>
			{labels[type] || type}
		</span>
	);
}

export default TransactionTypeBadge;