import { create } from "zustand";
import { getProducts, createProduct } from "../services/productService";

export const useInventoryStore = create((set, get) => ({
	products: [],
	loading: false,
	error: null,

	fetchProducts: async (force = false) => {
		if (!force && get().products.length > 0) return;
		try {
			set({ loading: true, error: null });
			const data = await getProducts();
			set({ products: data, loading: false });
		} catch (error) {
			set({
				products: [],
				error: error.message || "Failed to fetch products",
				loading: false,
			});
		}
	},

	addProduct: async (payload) => {
		try {
			set({ loading: true, error: null });
			const newProduct = await createProduct(payload);
			set((state) => ({
				products: [newProduct, ...state.products],
				loading: false,
			}));
			return newProduct;
		} catch (error) {
			set({ error: error.message || "Failed to add product", loading: false });
			throw error;
		}
	},

	updateProductStock: (productId, newStock) => {
		set((state) => ({
			products: state.products.map((p) =>
				p.id === productId ? { ...p, currentStock: newStock } : p
			),
		}));
	},
}));
