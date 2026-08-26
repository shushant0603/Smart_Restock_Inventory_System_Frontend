import TransactionTypeBadge from "./TransactionTypeBadge";

function TransactionRow({ transaction }) {
	const {
		createdAt,
		date,
		product,
		type,
		quantity,
		qtyChange,
		prevStock,
		newStock,
		user,
	} = transaction;

	const formattedDate = new Date(
		createdAt || date
	).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	const isPositive = type === "RECEIPT";
	const displayQty = qtyChange || quantity;
	const displayProduct = product?.name || product || "Unknown";
	const displayPrevStock = prevStock ?? "-";
	const displayNewStock = newStock ?? "-";
	const displayUser = user || "System";

	return (
		<div className="grid grid-cols-[1.15fr_1.7fr_1fr_1fr_1fr_1fr_1fr] items-center border-t border-gray-200 px-8 py-5">
			{/* Date */}

			<div className="text-sm text-gray-500">
				{formattedDate}
			</div>

			{/* Product */}

			<div className="pr-4 text-sm font-semibold text-gray-900">
				{displayProduct}
			</div>

			{/* Type */}

			<div>
				<TransactionTypeBadge type={type} />
			</div>

			{/* Quantity Change */}

			<div
				className={`text-sm font-semibold ${
					isPositive
						? "text-green-600"
						: "text-red-600"
				}`}
			>
				{isPositive ? "+" : "-"}
				{displayQty}
			</div>

			{/* Previous Stock */}

			<div className="text-sm text-gray-500">
				{displayPrevStock}
			</div>

			{/* New Stock */}

			<div className="text-sm font-semibold text-gray-900">
				{displayNewStock}
			</div>

			{/* User */}

			<div className="text-sm text-gray-500">
				{displayUser}
			</div>
		</div>
	);
}

export default TransactionRow;