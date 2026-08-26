import {
	useEffect,
	useMemo,
	useState,
} from "react";

import { useTransaction} from "../../store/useTransactionStore";

import TransactionToolbar from "./components/TransactionToolbar";
import TransactionTable from "./components/TransactionTable";

function Transactions() {
	const {
		transactions,
		loading,
		error,
		fetchTransactions,
	} = useTransaction();

	const [type, setType] = useState("all");

	const [dateRange, setDateRange] =
		useState("30");

	const [currentPage, setCurrentPage] =
		useState(1);

	const ITEMS_PER_PAGE = 8;

	/*
	|--------------------------------------------------------------------------
	| Fetch Transactions
	|--------------------------------------------------------------------------
	*/

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	/*
	|--------------------------------------------------------------------------
	| Filter Transactions
	|--------------------------------------------------------------------------
	*/

	const filteredTransactions = useMemo(() => {
		let result = [...transactions];

		// Type filter

		if (type !== "all") {
			result = result.filter(
				(transaction) =>
					transaction.type === type
			);
		}

		// Date filter

		if (dateRange !== "all") {
			const days = Number(dateRange);

			const cutoffDate = new Date();

			cutoffDate.setDate(
				cutoffDate.getDate() - days
			);

			result = result.filter(
				(transaction) => {
					const transactionDate =
						new Date(
							transaction.createdAt || transaction.date
						);

					return (
						transactionDate >=
						cutoffDate
					);
				}
			);
		}

		return result;
	}, [transactions, type, dateRange]);

	/*
	|--------------------------------------------------------------------------
	| Pagination
	|--------------------------------------------------------------------------
	*/

	const totalPages = Math.ceil(
		filteredTransactions.length /
			ITEMS_PER_PAGE
	);

	const paginatedTransactions =
		filteredTransactions.slice(
			(currentPage - 1) *
				ITEMS_PER_PAGE,

			currentPage * ITEMS_PER_PAGE
		);

	/*
	|--------------------------------------------------------------------------
	| Reset Page
	|--------------------------------------------------------------------------
	*/

	useEffect(() => {
		setCurrentPage(1);
	}, [type, dateRange]);

	return (
		<div className="min-h-full bg-white px-[3%] py-[3%]">
			{/* ================= HEADER ================= */}

			<div className="mb-8">
				<h1 className="text-[clamp(28px,2.5vw,40px)] font-semibold tracking-tight text-gray-900">
					Transactions
				</h1>

				<p className="mt-1 text-[clamp(14px,1vw,18px)] text-gray-500">
					Track every stock movement across
					your inventory.
				</p>
			</div>

			{/* ================= FILTERS ================= */}

			<TransactionToolbar
				type={type}
				setType={setType}
				dateRange={dateRange}
				setDateRange={setDateRange}
			/>

			{/* ================= ERROR ================= */}

			{error && (
				<div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
					{error}
				</div>
			)}

			{/* ================= TABLE ================= */}

			<div className="mt-7">
				<TransactionTable
					transactions={
						paginatedTransactions
					}
					loading={loading}
				/>
			</div>

			{/* ================= PAGINATION ================= */}

			<div className="flex items-center justify-between rounded-b-2xl border-x border-b border-gray-200 bg-white px-8 py-4">
				<p className="text-sm text-gray-500">
					Page{" "}
					{totalPages === 0
						? 0
						: currentPage}{" "}
					of {totalPages || 1} ·
					Showing{" "}
					{paginatedTransactions.length}{" "}
					of{" "}
					{filteredTransactions.length}{" "}
					transactions
				</p>

				<div className="flex items-center gap-2">
					{/* Previous */}

					<button
						type="button"
						disabled={
							currentPage === 1
						}
						onClick={() =>
							setCurrentPage(
								(page) =>
									page - 1
							)
						}
						className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
					>
						Previous
					</button>

					{/* Next */}

					<button
						type="button"
						disabled={
							currentPage >=
							totalPages
						}
						onClick={() =>
							setCurrentPage(
								(page) =>
									page + 1
							)
						}
						className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}

export default Transactions;