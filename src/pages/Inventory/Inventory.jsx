import { useEffect, useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useInventoryStore } from "../../store/useInventoryStore";

import InventoryToolbar from "./components/InventoryToolbar";
import ProductTable from "./components/ProductTable";
import AddProductModal from "./components/AddProductModal";

function Inventory() {
	const { products, loading, error, fetchProducts } = useInventoryStore();
	
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	
	// Filters
	const [searchQuery, setSearchQuery] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("All Categories");
	const [statusFilter, setStatusFilter] = useState("All Status");
	
	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 7;

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	// Extract unique categories for the dropdown
	const categories = useMemo(() => {
		const cats = new Set(products.map((p) => p.category));
		return Array.from(cats);
	}, [products]);

	// Filter Logic
	const filteredProducts = useMemo(() => {
		return products.filter((p) => {
			// Search
			if (
				searchQuery &&
				!p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
				!(p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
			) {
				return false;
			}
			
			// Category
			if (categoryFilter !== "All Categories" && p.category !== categoryFilter) {
				return false;
			}
			
			// Status
			if (statusFilter !== "All Status") {
				let status = "Healthy";
				if (p.currentStock === 0) status = "Out of Stock";
				else if (p.currentStock <= p.minimumStock) status = "Low Stock";
				
				if (status !== statusFilter) return false;
			}
			
			return true;
		});
	}, [products, searchQuery, categoryFilter, statusFilter]);

	// Pagination Logic
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// Handle clearing filters
	const handleClearFilters = () => {
		setSearchQuery("");
		setCategoryFilter("All Categories");
		setStatusFilter("All Status");
		setCurrentPage(1);
	};

	// Reset to page 1 if filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, categoryFilter, statusFilter]);

	return (
		<div className="min-h-full bg-gray-50 px-4 py-8 md:px-8">
			{/* Header */}
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
					<p className="text-sm text-gray-500">
						Manage products, stock levels and thresholds.
					</p>
				</div>
				<button
					onClick={() => setIsAddModalOpen(true)}
					className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
				>
					<Plus className="h-4 w-4" />
					Add Product
				</button>
			</div>

			{/* Main Content Area */}
			<div className="flex flex-col gap-6">
				{/* Toolbar */}
				<InventoryToolbar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					categoryFilter={categoryFilter}
					setCategoryFilter={setCategoryFilter}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					onClearFilters={handleClearFilters}
					categories={categories}
				/>

				{error && (
					<div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
						Failed to load products: {error}
					</div>
				)}

				{/* Table Area */}
				<div className="rounded-xl border border-gray-200 bg-white shadow-sm">
					<ProductTable products={paginatedProducts} loading={loading} />

					{/* Pagination Footer */}
					{!loading && filteredProducts.length > 0 && (
						<div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
							<span className="text-sm text-gray-500">
								Showing {paginatedProducts.length} of {filteredProducts.length} products &middot; Page {currentPage}
							</span>
							
							<div className="flex gap-2">
								<button
									onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
									disabled={currentPage === 1}
									className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
								>
									&lt;
								</button>
								
								{Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
									const pageNum = i + 1; // Simplified for now, just shows first 5
									return (
										<button
											key={pageNum}
											onClick={() => setCurrentPage(pageNum)}
											className={`rounded-lg px-3 py-1 text-sm font-medium ${
												currentPage === pageNum
													? "bg-blue-600 text-white"
													: "hover:bg-gray-50 text-gray-700"
											}`}
										>
											{pageNum}
										</button>
									);
								})}
								
								<button
									onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
									disabled={currentPage === totalPages}
									className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
								>
									&gt;
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Add Product Modal */}
			<AddProductModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
			/>
		</div>
	);
}

export default Inventory;
