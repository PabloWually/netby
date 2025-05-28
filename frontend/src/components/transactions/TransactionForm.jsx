import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Grid,
  FormHelperText,
} from "@mui/material";
import { StyledModal } from "../Modal";
import { useGetProducts } from "../../hooks/useGetProducts";


const TRANSACTION_TYPES = {
  PURCHASE: 1,
  SALE: 2,
};

const TRANSACTION_TYPE_LABELS = {
  [TRANSACTION_TYPES.PURCHASE]: "Compra",
  [TRANSACTION_TYPES.SALE]: "Venta",
};

export const TransactionForm = ({
  open,
  onClose,
  onSubmit,
  initialType = TRANSACTION_TYPES.PURCHASE,
  productId = null,
  isLoading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState({
    Type: initialType,
    ProductId: productId || "",
    Quantity: 1,
    Detail: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const { data: productsData, isLoading: productsLoading } = useGetProducts(
    1,
    100
  );

  useEffect(() => {
    if (open) {
      setFormData({
        Type: initialType,
        ProductId: productId || "",
        Quantity: 1,
        Detail: "",
      });
      setValidationErrors({});
    }
  }, [open, initialType, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Quantity" && (value < 1 || isNaN(value))) {
      setValidationErrors({
        ...validationErrors,
        [name]: "La cantidad debe ser un número mayor a 0",
      });
    } else {
      const newErrors = { ...validationErrors };
      delete newErrors[name];
      setValidationErrors(newErrors);
    }

    let processedValue = value;
    if (name === "Quantity" || name === "Type") {
      processedValue = parseInt(value, 10);
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.ProductId) {
      errors.ProductId = "Debes seleccionar un producto";
    }

    if (!formData.Quantity || formData.Quantity < 1) {
      errors.Quantity = "La cantidad debe ser mayor a 0";
    }

    if (!formData.Detail.trim()) {
      errors.Detail = "El detalle es obligatorio";
    }

    if (formData.Type === TRANSACTION_TYPES.SALE) {
      const selectedProduct = productsData?.items.find(
        (p) => p.id === formData.ProductId
      );
      if (selectedProduct && formData.Quantity > selectedProduct.stock) {
        errors.Quantity = `No hay suficiente stock. Disponible: ${selectedProduct.stock}`;
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getFormTitle = () => {
    return `Registrar ${TRANSACTION_TYPE_LABELS[formData.Type]} de Producto`;
  };

  const getSubmitButtonText = () => {
    if (isLoading) return "Procesando...";
    return `Registrar ${TRANSACTION_TYPE_LABELS[formData.Type]}`;
  };

  const selectedProduct = formData.ProductId
    ? productsData?.items.find((p) => p.id === formData.ProductId)
    : null;

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-transaction-form"
    >
      <Box sx={{ width: { xs: "100%", sm: 500 }, maxHeight: "90vh" }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {getFormTitle()}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message || "Ocurrió un error. Intente nuevamente."}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <FormControl fullWidth disabled={isLoading}>
              <InputLabel>Tipo de Transacción</InputLabel>
              <Select
                name="Type"
                value={formData.Type}
                onChange={handleChange}
                label="Tipo de Transacción"
              >
                <MenuItem value={TRANSACTION_TYPES.PURCHASE}>Compra</MenuItem>
                <MenuItem value={TRANSACTION_TYPES.SALE}>Venta</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="my-3">
            <FormControl
              fullWidth
              error={!!validationErrors.ProductId}
              disabled={isLoading || !!productId}
            >
              <InputLabel>Producto</InputLabel>
              <Select
                name="ProductId"
                value={formData.ProductId}
                onChange={handleChange}
                label="Producto"
              >
                {productsLoading ? (
                  <MenuItem disabled>Cargando productos...</MenuItem>
                ) : (
                  productsData?.items?.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} - Stock: {product.stock}
                    </MenuItem>
                  ))
                )}
              </Select>
              {validationErrors.ProductId && (
                <FormHelperText error>
                  {validationErrors.ProductId}
                </FormHelperText>
              )}
              {productId && (
                <FormHelperText>Producto preseleccionado</FormHelperText>
              )}
            </FormControl>
          </div>

          <div className="my-3">
            <TextField
              name="Quantity"
              label="Cantidad"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.Quantity}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              error={!!validationErrors.Quantity}
              helperText={
                validationErrors.Quantity ||
                (selectedProduct && formData.Type === TRANSACTION_TYPES.SALE
                  ? `Stock disponible: ${selectedProduct.stock}`
                  : "")
              }
              disabled={isLoading}
            />
          </div>

          <div className="my-3">
            <TextField
              name="Detail"
              label={`Detalle de la ${TRANSACTION_TYPE_LABELS[
                formData.Type
              ].toLowerCase()}`}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              value={formData.Detail}
              onChange={handleChange}
              error={!!validationErrors.Detail}
              helperText={validationErrors.Detail}
              disabled={isLoading}
            />
          </div>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button variant="outlined" onClick={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color={
                  formData.Type === TRANSACTION_TYPES.PURCHASE
                    ? "primary"
                    : "success"
                }
                disabled={isLoading || productsLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {getSubmitButtonText()}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </StyledModal>
  );
};

export default TransactionForm;
