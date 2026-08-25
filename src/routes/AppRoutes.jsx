import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Alerts from "../pages/Alerts/Alerts";
import Dashboard from "../pages/Dashboard/Dashboard";
import Inventory from "../pages/Inventory/Inventory";
import ProductDetails from "../pages/Inventory/ProductDetails";
import Login from "../pages/Login/Login";
import Suppliers from "../pages/Suppliers/Suppliers";
import Settings from "../pages/Settings/Settings";
import Transactions from "../pages/Transactions/Transactions";
import Suggestions from "../pages/Suggestions/Suggestions";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
			<Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/inventory" element={<Inventory />} />
				<Route path="/inventory/:productId" element={<ProductDetails />} />
				<Route path="/transactions" element={<Transactions />} />
				<Route path="/alerts" element={<Alerts />} />
				<Route path="/suggestions" element={<Suggestions />} />
				<Route path="/suppliers" element={<Suppliers />} />
				<Route path="/settings" element={<Settings />} />
			</Route>
			<Route path="/" element={<Navigate to="/login" replace />} />
			<Route path="*" element={<Navigate to="/dashboard" replace />} />
		</Routes>
	);
}

export default AppRoutes;
