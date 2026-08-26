import { useState, useRef, useEffect } from "react";
import { X, PackagePlus, ShoppingCart, Info, Loader2 } from "lucide-react";
import gsap from "gsap";
import { createTransaction } from "../../../api";

export default function ReorderModal({ alert, onClose, onSuccess }) {
	const modalRef = useRef(null);
	const contentRef = useRef(null);
	const defaultQty = Math.max(10, (alert.minimumStock || 0) - (alert.currentStock || 0) + 5);
	const [quantity, setQuantity] = useState(defaultQty.toString());
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

	const presetQuantities = [10, 25, 50, 100];

	useEffect(() => {
		gsap.fromTo(
			modalRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.3, ease: "power2.out" }
		);
		gsap.fromTo(
			contentRef.current,
			{ scale: 0.95, opacity: 0, y: 20 },
			{ scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }
		);
	}, []);

	const handleClose = () => {
		gsap.to(contentRef.current, {
			scale: 0.95,
			opacity: 0,
			y: 10,
			duration: 0.2,
			ease: "power2.in"
		});
		gsap.to(modalRef.current, {
			opacity: 0,
			duration: 0.2,
			ease: "power2.in",
			onComplete: onClose
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const qty = parseInt(quantity, 10);
		if (isNaN(qty) || qty <= 0) {
			setError("Please enter a valid quantity greater than zero.");
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			await createTransaction({
				productId: alert.productId,
				type: "RECEIPT",
				quantity: qty,
				note: "Reordered directly from Alerts Dashboard"
			});
			onSuccess(alert.id);
			handleClose();
		} catch (err) {
			setError(err.message || "Failed to create reorder transaction.");
			setIsSubmitting(false);
		}
	};

	return (
		<div
			ref={modalRef}
			className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm"
		>
			<div
				ref={contentRef}
				className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/5"
			>
				{/* Header */}
				<div className="relative border-b border-gray-100 bg-gray-50/50 px-6 py-5">
					<button
						onClick={handleClose}
						disabled={isSubmitting}
						className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
					>
						<X className="h-5 w-5" />
					</button>
					
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
							<ShoppingCart className="h-5 w-5 text-blue-600" />
						</div>
						<div>
							<h2 className="text-lg font-semibold text-gray-900">Reorder Stock</h2>
							<p className="text-sm text-gray-500">Quickly replenish your inventory</p>
						</div>
					</div>
				</div>

				{/* Body */}
				<form onSubmit={handleSubmit} className="px-6 py-6">
					
					{/* Product Summary */}
					<div className="mb-6 flex items-start gap-3 rounded-xl bg-blue-50/50 p-4 ring-1 ring-blue-100/50">
						<Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
						<div>
							<p className="text-sm font-medium text-gray-900">
								{alert.productName || alert.product?.name || "Product"}
							</p>
							<p className="mt-1 text-xs text-gray-600">
								Currently sitting at <span className="font-semibold text-red-600">{alert.currentStock} units</span>. 
								We recommend ordering enough to restore safe stock levels.
							</p>
						</div>
					</div>

					{/* Quantity Input */}
					<div className="mb-2 flex items-center justify-between">
						<label htmlFor="qty" className="block text-sm font-medium text-gray-700">
							Reorder Quantity
						</label>
					</div>
					
					<div className="relative mb-6">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
							<PackagePlus className="h-5 w-5 text-gray-400" />
						</div>
						<input
							id="qty"
							type="number"
							min="1"
							required
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							disabled={isSubmitting}
							className="block w-full rounded-xl border-0 bg-white py-3.5 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:opacity-75 disabled:bg-gray-50"
							placeholder="Enter quantity..."
						/>
					</div>

					{/* Quick Select Pills */}
					<div className="mb-8">
						<p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">Quick Select</p>
						<div className="flex flex-wrap gap-2">
							{presetQuantities.map((preset) => (
								<button
									key={preset}
									type="button"
									disabled={isSubmitting}
									onClick={() => setQuantity(preset.toString())}
									className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
										quantity === preset.toString()
											? "bg-blue-600 text-white shadow-md ring-1 ring-blue-600"
											: "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:text-gray-900"
									} disabled:opacity-50 disabled:cursor-not-allowed`}
								>
									+{preset}
								</button>
							))}
						</div>
					</div>

					{/* Error Message */}
					{error && (
						<div className="mb-6 rounded-lg bg-red-50 p-3 text-sm text-red-600 ring-1 ring-red-100">
							{error}
						</div>
					)}

					{/* Actions */}
					<div className="mt-2 flex items-center justify-end gap-3">
						<button
							type="button"
							onClick={handleClose}
							disabled={isSubmitting}
							className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-70 disabled:hover:bg-blue-600"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="h-4 w-4 animate-spin" />
									Processing
								</>
							) : (
								"Confirm Order"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
