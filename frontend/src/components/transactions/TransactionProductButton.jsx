import React, { useState } from "react";
import { Button, Tooltip, IconButton, ButtonGroup } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TransactionForm from "./TransactionForm";
import { useCreateTransaction } from "../../hooks/useCreateTransaction";

const TRANSACTION_TYPES = {
  PURCHASE: 1,
  SALE: 2,
};

export const TransactionProductButton = ({ 
  productId,
  onTransactionComplete = () => {},
  size = "medium"
}) => {
  const [open, setOpen] = useState(false);
  
  const { mutate: createTransaction, isLoading, error } = useCreateTransaction();

  const handleOpenPurchase = () => {
    setOpen(true);
  };
  const handleOpenSale = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formData) => {
    createTransaction(formData, {
      onSuccess: () => {
        handleClose();
        onTransactionComplete(formData);
      }
    });
  };

  return (
    <>
      <ButtonGroup size={size}>
        <Button
          startIcon={<AddShoppingCartIcon />}
          onClick={handleOpenPurchase}
          color="primary"
        >
          Transaccion
        </Button>
      </ButtonGroup>

      <TransactionForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        productId={productId}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default TransactionProductButton;