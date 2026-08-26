import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useInventoryStore } from "../../../store/useInventoryStore";
import { useSupplierStore } from "../../../store/useSupplierStore";

function AddProductModal({ isOpen, onClose }) {
	const addProduct = useInventoryStore((state) => state.addProduct);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { suppliers, fetchSuppliers } = useSupplierStore();

	useEffect(() => {
		if (isOpen) {
			fetchSuppliers();
		}
	}, [isOpen, fetchSuppliers]);

	const [isCustomSupplier, setIsCustomSupplier] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		category: "",
		currentStock: 0,
		minimumStock: 0,
		reorderQuantity: 1,
		price: 0,
		supplier: "",
	});

	if (!isOpen) return null;

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "number" ? Number(value) : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await addProduct(formData);
			setFormData({
				name: "",
				category: "",
				currentStock: 0,
				minimumStock: 0,
				reorderQuantity: 1,
				price: 0,
				supplier: "",
			});
			onClose();
		} catch (err) {
			setError(err.message || "Failed to add product");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
				<div className="mb-5 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
					<button
						onClick={onClose}
						className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{error && (
					<div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Product Name *
						</label>
						<input
							type="text"
							name="name"
							required
							value={formData.name}
							onChange={handleChange}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Category *
						</label>
						<input
							type="text"
							name="category"
							required
							value={formData.category}
							onChange={handleChange}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">
								Current Stock *
							</label>
							<input
								type="number"
								name="currentStock"
								required
								min="0"
								value={formData.currentStock}
								onChange={handleChange}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">
								Min. Threshold *
							</label>
							<input
								type="number"
								name="minimumStock"
								required
								min="0"
								value={formData.minimumStock}
								onChange={handleChange}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">
								Reorder Quantity *
							</label>
							<input
								type="number"
								name="reorderQuantity"
								required
								min="1"
								value={formData.reorderQuantity}
								onChange={handleChange}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="mb-1 block text-sm font-medium text-gray-700">
								Price *
							</label>
							<input
								type="number"
								name="price"
								required
								min="0"
								step="0.01"
								value={formData.price}
								onChange={handleChange}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						</div>
					</div>

					<div>
						<div className="mb-1 flex items-center justify-between">
							<label className="block text-sm font-medium text-gray-700">
								Supplier *
							</label>
							<button
								type="button"
								onClick={() => {
									setIsCustomSupplier(!isCustomSupplier);
									setFormData(prev => ({ ...prev, supplier: "" }));
								}}
								className="text-xs font-medium text-blue-600 hover:text-blue-700"
							>
								{isCustomSupplier ? "Select existing" : "+ Add new supplier"}
							</button>
						</div>
						
						{isCustomSupplier ? (
							<input
								type="text"
								name="supplier"
								required
								placeholder="Type new supplier name..."
								value={formData.supplier}
								onChange={handleChange}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							/>
						) : (
							<select
								name="supplier"
								required
								value={formData.supplier}
								onChange={handleChange}
								className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
							>
								<option value="" disabled>Select a supplier</option>
								{suppliers.map((s, idx) => (
									<option key={s.id || s._id || idx} value={s.name}>
										{s.name}
									</option>
								))}
							</select>
						)}
					</div>

					<div className="mt-6 flex justify-end gap-3">
						<button
							type="button"
							onClick={onClose}
							className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={loading}
							className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
						>
							{loading ? "Adding..." : "Add Product"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddProductModal;
