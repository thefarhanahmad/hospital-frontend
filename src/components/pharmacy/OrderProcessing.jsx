import { useState } from 'react';
import toast from 'react-hot-toast';

const mockOrders = [
  {
    id: '1',
    patientName: 'John Doe',
    status: 'pending',
    items: [
      { name: 'Paracetamol', quantity: 2 },
      { name: 'Vitamin C', quantity: 1 },
    ],
    total: 25.50,
    date: '2024-01-15',
  },
];

export default function OrderProcessing() {
  const [orders, setOrders] = useState(mockOrders);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // API call would go here
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Order Processing</h2>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">Patient: {order.patientName}</p>
                <p className="text-sm text-gray-500">Date: {order.date}</p>
              </div>
              <span className={`px-2 py-1 text-sm rounded-full ${
                order.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'processing'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <h4 className="font-medium text-sm">Items:</h4>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>x{item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(order.id, 'processing')}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                  >
                    Process
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                    className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100"
                  >
                    Cancel
                  </button>
                </>
              )}
              {order.status === 'processing' && (
                <button
                  onClick={() => handleStatusUpdate(order.id, 'completed')}
                  className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}