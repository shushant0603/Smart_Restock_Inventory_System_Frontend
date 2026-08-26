import { create } from 'zustand';
import { request } from '../services/api';

export const useSupplierStore = create((set, get) => ({
  suppliers: [],
  loading: false,
  error: null,
  fetchSuppliers: async (force = false) => {
    if (!force && get().suppliers.length > 0) return;
    set({ loading: true, error: null });
    try {
      const data = await request('/api/suppliers');
      set({ suppliers: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error('Error fetching suppliers:', error);
    }
  }
}));
