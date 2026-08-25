import {
	Download,
	ShoppingCart,
	CircleX,
	ArrowUp,
	Pencil,
} from "lucide-react";

const iconMap = {
	received: Download,
	reorder: ShoppingCart,
	out_of_stock: CircleX,
	transfer: ArrowUp,
	updated: Pencil,
};

const iconStyles = {
	received: "bg-emerald-100 text-emerald-600",
	reorder: "bg-blue-100 text-blue-600",
	out_of_stock: "bg-red-100 text-red-600",
	transfer: "bg-orange-100 text-orange-600",
	updated: "bg-blue-100 text-blue-600",
};

function ActivityItem({ activity }) {
	const Icon = iconMap[activity.type] ?? Pencil;

	return (
		<div className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition hover:bg-gray-50">
			<div
				className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
					iconStyles[activity.type] ??
					"bg-gray-100 text-gray-600"
				}`}
			>
				<Icon className="h-4 w-4" />
			</div>

			<div className="min-w-0 flex-1">
				<p className="truncate text-xs font-medium text-gray-900">
					{activity.title}
				</p>

				<p className="truncate text-[10px] text-gray-500">
					{activity.description}
				</p>
			</div>

			<span className="shrink-0 text-[10px] text-gray-500">
				{activity.timeAgo}
			</span>
		</div>
	);
}

export default ActivityItem;