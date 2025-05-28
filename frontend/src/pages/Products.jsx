import React from 'react';
import ProductsTable from '../components/products/productsTable';

export default function Products() {
  return (
    <div>
      <h1 className="w-[900px]">Gestión de Productos</h1>
      <ProductsTable />
    </div>
  );
}