import React, { useState } from 'react';

const InvoiceItems = ({ items, onAddItem, onRemoveItem }) => {
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: '',
    price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAdd = () => {
    onAddItem(newItem);
    setNewItem({ description: '', quantity: '', price: '' });
  };
  const calculateTotal = (item) => {
    return item.quantity * item.price;
  };

  return (
    <div className="my-4">
      <h3 className="text-lg font-semibold mb-2">Items</h3>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>{item.description}</span>
          <span className="text-gray-500"> ({item.quantity} x ${item.price})</span>
          <span>Total: ${calculateTotal(item)}</span>
          <button onClick={() => onRemoveItem(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
            Remove
          </button>
        </div>
      ))}
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newItem.description}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2 my-1"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={newItem.quantity}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2 my-1"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newItem.price}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2 my-1"
      />
      <button onClick={handleAdd} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add Item
      </button>
    </div>
  );
};

export default InvoiceItems;
