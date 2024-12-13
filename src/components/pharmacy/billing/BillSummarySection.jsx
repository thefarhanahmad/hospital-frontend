export default function BillSummarySection({ watch }) {
  // Helper function to safely format numbers
  const formatAmount = (value) => {
    const number = Number(value);
    return isNaN(number) ? '0.00' : number.toFixed(2);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Bill Summary</h3>
      <div className="p-4 border rounded-lg space-y-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>₹{formatAmount(watch('subtotal'))}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Total Discount:</span>
          <span>₹{formatAmount(watch('totalDiscount'))}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (10%):</span>
          <span>₹{formatAmount(watch('tax'))}</span>
        </div>
        <div className="flex justify-between font-semibold border-t pt-3">
          <span>Total:</span>
          <span>₹{formatAmount(watch('total'))}</span>
        </div>
      </div>
    </div>
  );
}