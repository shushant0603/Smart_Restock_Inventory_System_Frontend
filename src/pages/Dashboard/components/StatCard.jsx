import { useRef } from "react";
import gsap from "gsap";

function StatCard({
	title,
	value,
	icon,
	iconClassName = "",
	trend,
	trendClassName = "",
}) {
	const cardRef = useRef(null);

	const handleMouseEnter = () => {
		gsap.to(cardRef.current, {
			y: -6,
			scale: 1.01,
			duration: 0.25,
			ease: "power2.out",
			boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
		});
	};

	const handleMouseLeave = () => {
		gsap.to(cardRef.current, {
			y: 0,
			scale: 1,
			duration: 0.25,
			ease: "power2.out",
			boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
		});
	};

	return (
		<div
			ref={cardRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="rounded-xl border border-gray-200 bg-white p-5"
		>
			<p className="text-xs font-medium text-gray-500">
				{title}
			</p>

			<div
				className={`mt-2 flex h-7 w-7 items-center justify-center rounded-md ${iconClassName}`}
			>
				{icon}
			</div>

			<p className="mt-3 text-2xl font-bold tracking-tight text-gray-950">
				{value}
			</p>

			{trend && (
				<div
					className={`mt-1 text-[11px] ${trendClassName}`}
				>
					{trend}
				</div>
			)}
		</div>
	);
}

export default StatCard;