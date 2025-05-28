import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Transactions from '../pages/Transactions';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
}