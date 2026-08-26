import { useEffect, useMemo, useState } from "react";
import { useTransaction } from "../../store/useTransactionStore";
import { Search, ShoppingCart, Calendar } from "lucide-react";

function Orders() {
	const { transactions, loading, error, fetchTransactions } = useTransaction();
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 10;

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	// Filter for RECEIPT transactions (Orders)
	const filteredOrders = useMemo(() => {
		let result = transactions.filter(t => t.type === "RECEIPT" || t.type === "reorder");

		if (searchTerm) {
			result = result.filter(order => 
				order.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.note?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		return result;
	}, [transactions, searchTerm]);

	const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
	const paginatedOrders = filteredOrders.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	return (
		<div className="min-h-full bg-white px-[3%] py-[3%]">
			{/* Header */}
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="flex items-center gap-3 text-[clamp(28px,2.5vw,40px)] font-semibold tracking-tight text-gray-900">
						<ShoppingCart className="h-8 w-8 text-blue-600" />
						Orders & Reorders
					</h1>
					<p className="mt-1 text-[clamp(14px,1vw,18px)] text-gray-500">
						A complete history of your restocking actions and smart reorders.
					</p>
				</div>
			</div>

			{/* Toolbar */}
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="relative max-w-md flex-1">
					<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search orders by product or note..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full rounded-xl border-gray-200 py-2.5 pl-10 pr-4 text-sm shadow-sm transition-shadow focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
			</div>

			{/* Error */}
			{error && (
				<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
					{error}
				</div>
			)}

			{/* Table */}
			<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
				<div className="grid grid-cols-[1.5fr_2fr_1fr_1.5fr] items-center bg-gray-50 px-8 py-4">
					<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Date</div>
					<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Product</div>
					<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Qty Ordered</div>
					<div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Note / Reason</div>
				</div>

				{loading ? (
					<div className="p-10 text-center text-sm text-gray-500">Loading orders...</div>
				) : paginatedOrders.length === 0 ? (
					<div className="p-10 text-center text-sm text-gray-500">No orders found.</div>
				) : (
					paginatedOrders.map((order) => (
						<div key={order.id} className="grid grid-cols-[1.5fr_2fr_1fr_1.5fr] items-center border-t border-gray-100 px-8 py-4 transition-colors hover:bg-gray-50/50">
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<Calendar className="h-4 w-4 text-gray-400" />
								{new Date(order.createdAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit"
								})}
							</div>
							<div className="font-medium text-gray-900 text-sm">
								{order.product?.name || "Unknown Product"}
							</div>
							<div className="text-sm font-semibold text-green-600">
								+{order.quantity} units
							</div>
							<div className="text-sm text-gray-500 truncate pr-4" title={order.note || "Manual Restock"}>
								{order.note || "Manual Restock"}
							</div>
						</div>
					))
				)}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-4 flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-8 py-4">
					<p className="text-sm text-gray-500">
						Page {currentPage} of {totalPages}
					</p>
					<div className="flex items-center gap-2">
						<button
							disabled={currentPage === 1}
							onClick={() => setCurrentPage((p) => p - 1)}
							className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
						>
							Previous
						</button>
						<button
							disabled={currentPage >= totalPages}
							onClick={() => setCurrentPage((p) => p + 1)}
							className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Orders;
