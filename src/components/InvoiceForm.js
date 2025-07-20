import React, { useState } from 'react';
import axios from 'axios';
import './InvoiceFrom.css'
const InvoiceForm = () => {
  const [form, setForm] = useState({
    invoiceNumber: '',
    dueDate: '',
    sender: {
      companyName: '',
      address: '',
      email: '',
      phone: ''
    },
    client: {
      companyName: '',
      address: '',
      email: '',
      phone: ''
    },
    items: [{ description: '', quantity: 1, price: 0 }],
    tax: 0,
    discount: 0
  });

  const handleChange = (e, section, field, index = null) => {
    const value = e.target.value;
    if (section === 'items' && index !== null) {
      const updatedItems = [...form.items];
      updatedItems[index][field] = value;
      setForm({ ...form, items: updatedItems });
    } else if (section === 'sender' || section === 'client') {
      setForm({
        ...form,
        [section]: {
          ...form[section],
          [field]: value
        }
      });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { description: '', quantity: 1, price: 0 }] });
  };

  const calculateTotal = () => {
    const subtotal = form.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const taxAmount = (subtotal * parseFloat(form.tax || 0)) / 100;
    const discountAmount = parseFloat(form.discount || 0);
    return subtotal + taxAmount - discountAmount;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const total = calculateTotal();
  const invoiceData = { ...form, subtotal: undefined, total };

  try {
    const res = await axios.post('https://invoice-generator-ebon-eight.vercel.app/api/invoices', invoiceData, {
      withCredentials: true
    });

    const filename = res.data.pdfFilename;
    const downloadUrl = `https://invoice-generator-ebon-eight.vercel.app/api/invoices/pdf/${filename}`;
    window.location.href = downloadUrl;

    alert('Invoice saved and download started!');
  } catch (err) {
    console.error(err);
    alert('Error submitting invoice');
  }
};


  return (
    <div className='formContainer'>
    <form onSubmit={handleSubmit} className='invoiceForm'>
      <h2>Create Invoice</h2>

      <input type="text" placeholder="Invoice Number" onChange={(e) => handleChange(e, null, 'invoiceNumber')} />

      <input type="date" placeholder="Due Date" onChange={(e) => handleChange(e, null, 'dueDate')} />

      <h3>Sender Info</h3>
      <input placeholder="Company Name" onChange={(e) => handleChange(e, 'sender', 'companyName')} />
      <input placeholder="Address" onChange={(e) => handleChange(e, 'sender', 'address')} />
      <input placeholder="Email" onChange={(e) => handleChange(e, 'sender', 'email')} />
      <input placeholder="Phone" onChange={(e) => handleChange(e, 'sender', 'phone')} />

      <h3>Client Info</h3>
      <input placeholder="Company Name" onChange={(e) => handleChange(e, 'client', 'companyName')} />
      <input placeholder="Address" onChange={(e) => handleChange(e, 'client', 'address')} />
      <input placeholder="Email" onChange={(e) => handleChange(e, 'client', 'email')} />
      <input placeholder="Phone" onChange={(e) => handleChange(e, 'client', 'phone')} />

      <h3>Items</h3>
      {form.items.map((item, index) => (
        <div key={index}>
          <input placeholder="Description" onChange={(e) => handleChange(e, 'items', 'description', index)} />
          <input type="number" placeholder="Quantity" onChange={(e) => handleChange(e, 'items', 'quantity', index)} />
          <input type="number" placeholder="Price" onChange={(e) => handleChange(e, 'items', 'price', index)} />
        </div>
      ))}
      <button type="button" onClick={addItem}>+ Add Item</button>

      <input type="number" placeholder="Tax (%)" onChange={(e) => handleChange(e, null, 'tax')} />
      <input type="number" placeholder="Discount (₹)" onChange={(e) => handleChange(e, null, 'discount')} />

      <h4>Total: ₹{calculateTotal().toFixed(2)}</h4>

      <button type="submit">Submit Invoice</button>
    </form>
    </div>
  );
};

export default InvoiceForm;
