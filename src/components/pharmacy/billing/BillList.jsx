import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { getBills } from '../../../services/pharmacyService';

export default function BillList() {
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      setIsLoading(true);
      const response = await getBills();
      setBills(response.data.bills);
    } catch (error) {
      toast.error('Failed to fetch bills');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Bills History</h2>
      
      <div className="space-y-6">
        {bills.length === 0 ? (
          <p className="text-center text-gray-500">No bills found</p>
        ) : (
          bills.map((bill) => (
            <div key={bill._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">Bill #{bill._id}</h3>
                  <p className="text-sm text-gray-500">
                    Patient ID: {bill.patient}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {format(new Date(bill.createdAt), 'PPpp')}
                  </p>
                </div>
                <span className={`px-2 py-1 text-sm rounded-full ${
                  bill.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : bill.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Items:</h4>
                  <div className="space-y-2">
                    {bill.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.inventory}</span>
                        <span>
                          {item.quantity} x ₹{item.price} 
                          {item.discount > 0 && ` (-₹${item.discount})`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{bill.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span>₹{bill.totalDiscount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>₹{bill.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>₹{bill.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}