import React, { useEffect } from 'react';
import { Truck, Search, Plus, MapPin, Mail, Phone } from 'lucide-react';
import { useSupplierStore } from '../../store/useSupplierStore';

const Suppliers = () => {
  const { suppliers, loading, fetchSuppliers } = useSupplierStore();

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Truck className="h-6 w-6 text-blue-600" />
            Supplier Management
          </h1>
          <p className="text-gray-500 mt-1">Manage your vendors and supply chain partners</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="h-4 w-4" />
          Add Supplier
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search suppliers..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading suppliers...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="p-4 border-b font-medium">Supplier Name</th>
                  <th className="p-4 border-b font-medium">Contact</th>
                  <th className="p-4 border-b font-medium">Phone</th>
                  <th className="p-4 border-b font-medium">Address</th>
                  <th className="p-4 border-b font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {suppliers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No suppliers found. Add your first supplier above.
                    </td>
                  </tr>
                ) : (
                  suppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{supplier.name}</div>
                      </td>
                      <td className="p-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {supplier.contactEmail || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {supplier.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {supplier.address || 'N/A'}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
