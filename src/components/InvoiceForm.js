import React, { useState, useReducer } from 'react';
import InvoiceItems from './InvoiceItems';
import { jsPDF } from 'jspdf';

const initialState = {
  invoiceNumber: '',
  date: '',
  billingAddress: '',
  items: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

const InvoiceForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [state, dispatch] = useReducer(reducer, formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const handleRemoveItem = (index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
  };

  const calculateTotalAmount = () => {
    let total = 0;
    state.items.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice Number: ${state.invoiceNumber}`, 10, 10);
    doc.text(`Date: ${state.date}`, 10, 20);
    doc.text(`Billing Address: ${state.billingAddress}`, 10, 30);

    let verticalOffset = 40;
    state.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.description} - ${item.quantity} x ${item.price} = ${item.quantity * item.price}`, 10, verticalOffset);
      verticalOffset += 10;
    });

    const totalAmount = calculateTotalAmount();
    doc.text(`Total Amount: $${totalAmount}`, 10, verticalOffset + 10);

    doc.save('invoice.pdf');
  };
  return (
    <div className="invoice-form mx-auto w-3/4 bg-gray-100 p-6 rounded-lg">
      <input
        type="text"
        name="invoiceNumber"
        placeholder="Invoice Number"
        value={formData.invoiceNumber}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2 my-2"
      />
      <input
        type="text"
        name="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2 my-2"
      />
      <textarea
        name="billingAddress"
        placeholder="Billing Address"
        value={formData.billingAddress}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded px-3 py-2 my-2 resize-none"
      ></textarea>
      <InvoiceItems
        items={state.items}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
      />
      <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Generate PDF
      </button>
    </div>
  );
};

export default InvoiceForm;
