import { useFieldArray } from 'react-hook-form';
import FormInput from '../../forms/FormInput';

export default function BillItemsSection({ control, register, errors, watch, setValue }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const calculateTotals = () => {
    const items = watch('items');
    const subtotal = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const totalDiscount = items.reduce((sum, item) => {
      return sum + (item.discount || 0);
    }, 0);

    const tax = (subtotal - totalDiscount) * 0.1; // 10% tax
    const total = subtotal - totalDiscount + tax;

    setValue('subtotal', subtotal);
    setValue('tax', tax);
    setValue('totalDiscount', totalDiscount);
    setValue('total', total);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Items</h3>
        <button
          type="button"
          onClick={() => append({ inventory: '', quantity: 1, price: 0, discount: 0 })}
          className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100"
        >
          Add Item
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Item #{index + 1}</h4>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  remove(index);
                  calculateTotals();
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormInput
              label="Inventory ID"
              register={register(`items.${index}.inventory`)}
              error={errors.items?.[index]?.inventory?.message}
            />
            <FormInput
              label="Quantity"
              type="number"
              min="1"
              register={register(`items.${index}.quantity`)}
              error={errors.items?.[index]?.quantity?.message}
              onChange={calculateTotals}
            />
            <FormInput
              label="Price"
              type="number"
              step="0.01"
              register={register(`items.${index}.price`)}
              error={errors.items?.[index]?.price?.message}
              onChange={calculateTotals}
            />
            <FormInput
              label="Discount"
              type="number"
              step="0.01"
              register={register(`items.${index}.discount`)}
              error={errors.items?.[index]?.discount?.message}
              onChange={calculateTotals}
            />
          </div>
        </div>
      ))}
    </div>
  );
}