import React, { useState } from 'react';
import ProductForm from './ProductForms';
import { Button } from '@mui/material';
import { useCreateProduct } from '../../hooks/useCreateProduct';
import { useUpdateProducts } from '../../hooks/useUpdateProduct';


export const NewProductButton = ({refetchProducts}) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { mutate: createProduct, isLoading: isCreating, error: createError } = useCreateProduct();
  const { mutate: updateProduct, isLoading: isUpdating, error: updateError } = useUpdateProducts();
  
  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setOpen(true);
  };
  
  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };
  
  const handleSubmit = (data) => {
      createProduct(data, {
        onSuccess: () => {
          refetchProducts();
          handleClose();
        }
      });
  };
  
  return (
    <div>
      <Button variant="contained" onClick={handleOpenCreate}>
        Crear Nuevo Producto
      </Button>
      
      <ProductForm 
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialData={selectedProduct}
        isLoading={isCreating || isUpdating}
        error={createError || updateError}
      />
    </div>
  );
};