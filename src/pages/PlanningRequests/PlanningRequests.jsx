import React, { useState, useEffect } from "react";
import { usePlanningStore } from "../../store/usePlanningStore";
import { Truck, Box, Check, MoreVertical, X } from "lucide-react";

const PlanningRequestsPage = () => {
	const requests = usePlanningStore((state) => state.requests);
	const fetchRequests = usePlanningStore((state) => state.fetchRequests);
	const acceptRequest = usePlanningStore((state) => state.acceptRequest);
	const rejectRequest = usePlanningStore((state) => state.rejectRequest);

	useEffect(() => {
		fetchRequests();
	}, [fetchRequests]);

	const [rejectModalOpen, setRejectModalOpen] = useState(false);
	const [selectedRequestId, setSelectedRequestId] = useState(null);
	const [rejectReason, setRejectReason] = useState("");
	const [menuOpenFor, setMenuOpenFor] = useState(null);

	const pendingRequests = requests?.filter(r => r.status === "New") || [];

	const handleAccept = (id) => {
		acceptRequest(id);
	};

	const handleRejectClick = (id) => {
		setSelectedRequestId(id);
		setRejectModalOpen(true);
		setMenuOpenFor(null);
	};

	const submitReject = () => {
		if (selectedRequestId && rejectReason) {
			rejectRequest(selectedRequestId, rejectReason);
			setRejectModalOpen(false);
			setSelectedRequestId(null);
			setRejectReason("");
		}
	};

	const getBadgeStyles = (type) => {
		switch (type) {
			case "Transfer Out":
				return "bg-blue-100 text-blue-700";
			case "Transfer In":
				return "bg-purple-100 text-purple-700";
			case "Replenishment":
				return "bg-green-100 text-green-700";
			default:
				return "bg-gray-100 text-gray-700";
		}
	};

	const getPriorityStyles = (priority) => {
		if (priority === "High") return "bg-red-100 text-red-700";
		if (priority === "Medium") return "bg-amber-100 text-amber-700";
		return "bg-gray-100 text-gray-700";
	};

	return (
		<div className="min-h-full bg-white p-2 md:p-8">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-xl font-semibold text-gray-900">
					Planning Requests
				</h1>
				<p className="mt-1 text-sm text-gray-500">
					Requests and recommendations from Planning Manager
				</p>
			</div>

			<div className="rounded-2xl border border-purple-200 bg-white shadow-sm overflow-hidden relative">
				{/* Header Section */}
				<div className="border-b border-purple-100 bg-purple-50/50 p-4 sm:p-5 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
							<Truck className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-lg font-semibold text-gray-900">
								Pending Requests (From P1)
							</h2>
							<p className="text-sm text-gray-500">
								Review and take action on incoming plans
							</p>
						</div>
					</div>
					<div className="text-sm font-medium text-purple-600 flex items-center gap-1">
						Total <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">{pendingRequests.length}</span>
					</div>
				</div>

				{/* Table */}
				{pendingRequests.length === 0 ? (
					<div className="p-12 text-center text-gray-500">
						No pending planning requests at the moment.
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left text-sm text-gray-600">
							<thead className="bg-gray-50/50 text-xs uppercase text-gray-500">
								<tr>
									<th className="px-5 py-3 font-medium">Request ID</th>
									<th className="px-5 py-3 font-medium">Type</th>
									<th className="px-5 py-3 font-medium">From</th>
									<th className="px-5 py-3 font-medium">To</th>
									<th className="px-5 py-3 font-medium">Product</th>
									<th className="px-5 py-3 font-medium">Qty</th>
									<th className="px-5 py-3 font-medium">Required Date</th>
									<th className="px-5 py-3 font-medium">Priority</th>
									<th className="px-5 py-3 font-medium">Status</th>
									<th className="px-5 py-3 font-medium text-right">Action</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{pendingRequests.map((req) => (
									<tr key={req.id} className="hover:bg-gray-50 transition-colors">
										<td className="px-5 py-4 font-medium text-blue-600">{req.requestId || req.id}</td>
										<td className="px-5 py-4">
											<span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getBadgeStyles(req.type)}`}>
												{req.type}
											</span>
										</td>
										<td className="px-5 py-4">{req.from}</td>
										<td className="px-5 py-4">{req.to}</td>
										<td className="px-5 py-4 font-medium text-gray-900">{req.product}</td>
										<td className="px-5 py-4">{req.qty} units</td>
										<td className="px-5 py-4">{req.requiredDate}</td>
										<td className="px-5 py-4">
											<span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getPriorityStyles(req.priority)}`}>
												{req.priority}
											</span>
										</td>
										<td className="px-5 py-4 text-blue-600 font-medium">{req.status}</td>
										<td className="px-5 py-4 text-right">
											<div className="flex justify-end items-center gap-2 relative">
												<button
													onClick={() => handleAccept(req.id)}
													className="inline-flex items-center rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 transition-colors"
												>
													Accept
												</button>
												<button
													onClick={() => setMenuOpenFor(menuOpenFor === req.id ? null : req.id)}
													className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
												>
													<MoreVertical className="h-4 w-4" />
												</button>
												
												{/* Dropdown menu */}
												{menuOpenFor === req.id && (
													<div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-gray-100 bg-white p-1 shadow-lg z-10">
														<button 
															onClick={() => handleRejectClick(req.id)}
															className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
														>
															<X className="h-4 w-4" />
															Unable to Fulfill
														</button>
													</div>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{/* Footer Legend */}
				<div className="border-t border-gray-100 bg-gray-50/50 p-4 flex flex-wrap gap-4 text-xs text-gray-600">
					<div className="flex items-center gap-1.5">
						<Truck className="h-4 w-4 text-blue-600" />
						<span className="font-medium text-gray-900">Transfer Out:</span> Send stock to another DC
					</div>
					<div className="flex items-center gap-1.5">
						<Box className="h-4 w-4 text-purple-600" />
						<span className="font-medium text-gray-900">Transfer In:</span> Receive stock from another DC
					</div>
					<div className="flex items-center gap-1.5">
						<Check className="h-4 w-4 text-green-600" />
						<span className="font-medium text-gray-900">Replenishment:</span> Receive from supplier/WH
					</div>
				</div>

				{/* Reject Modal */}
				{rejectModalOpen && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
						<div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Fulfill Request</h3>
							<p className="text-sm text-gray-500 mb-4">Please provide a reason why this request cannot be fulfilled. This will notify the Planning Manager.</p>
							
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Business Reason</label>
									<select 
										value={rejectReason}
										onChange={(e) => setRejectReason(e.target.value)}
										className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
									>
										<option value="">Select a reason...</option>
										<option value="Insufficient Stock">Insufficient Stock</option>
										<option value="Stock Damaged/Expired">Stock Damaged/Expired</option>
										<option value="Logistics Issue">Logistics Issue (No transport available)</option>
										<option value="Supplier Delay">Supplier Delay</option>
										<option value="Other">Other</option>
									</select>
								</div>

								<div className="flex gap-3 pt-2">
									<button
										onClick={() => setRejectModalOpen(false)}
										className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
									>
										Cancel
									</button>
									<button
										onClick={submitReject}
										disabled={!rejectReason}
										className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
									>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PlanningRequestsPage;
