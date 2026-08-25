import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="flex h-screen flex-col overflow-hidden bg-gray-100 md:flex-row">
			<Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
			<div className="flex min-h-0 flex-1 flex-col">
				<Header onMenuClick={() => setIsMobileMenuOpen(true)} />
				<main className="min-h-0 flex-1 overflow-y-auto p-3 md:p-4 rounded-2xl">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default AppLayout;
