import React, { useState, useEffect } from "react";
import axios from "axios";
import './SavedInvoices.css';

const SavedInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem('authToken'); // make sure you stored this during login

        const res = await axios.get('https://invoice-generator-ebon-eight.vercel.app/api/invoices/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setInvoices(res.data);
      } catch (err) {
        console.error("Error occurred while fetching invoices:", err);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>My Invoices</h2>
      {invoices.length === 0 ? (
        <p>No Invoices Found</p>
      ) : (
        <div className="invoiceList">
          {invoices.map((inv) => (
            <div key={inv._id} className="invoiceCard">
              <p><strong>Invoice #{inv.invoiceNumber || 'N/A'}</strong></p>
              <p>Client: {inv.client.companyName}</p>
              <p>Total: ₹{inv.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedInvoices;
