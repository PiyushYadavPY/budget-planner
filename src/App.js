import React from 'react';
import './App.css';
import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <div className="App text-center">
      <h1 className="text-3xl font-bold my-8">Budget Planner</h1>
      <InvoiceForm />
    </div>
  );
}

export default App;
