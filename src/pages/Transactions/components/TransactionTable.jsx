import TransactionRow from "./TransactionRow";

function TransactionTable({
	transactions,
	loading,
}) {
	if (loading) {
		return (
			<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
				<div className="p-10 text-center text-sm text-gray-500">
					Loading transactions...
				</div>
			</div>
		);
	}

	return (
		<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
			{/* Table Header */}

			<div className="grid grid-cols-[1.15fr_1.7fr_1fr_1fr_1fr_1fr_1fr] items-center bg-gray-50 px-8 py-4">
				<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
					Date
				</div>

				<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
					Product
				</div>

				<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
					Type
				</div>

				<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
					Qty Change
				</div>

				<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
					Prev Stock
				</div>

				<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
					New Stock
				</div>

				<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
					User
				</div>
			</div>

			{/* Table Rows */}

			{transactions.length === 0 ? (
				<div className="p-10 text-center text-sm text-gray-500">
					No transactions found.
				</div>
			) : (
				transactions.map((transaction) => (
					<TransactionRow
						key={
							transaction.id ||
							transaction._id
						}
						transaction={transaction}
					/>
				))
			)}
		</div>
	);
}

export default TransactionTable;