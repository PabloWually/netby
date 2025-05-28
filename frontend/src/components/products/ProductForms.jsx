import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { StyledModal } from "../Modal";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("El nombre es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
    price: yup
      .number()
      .positive("El precio debe ser positivo")
      .required("El precio es obligatorio"),
    stock: yup
      .number()
      .integer("El stock debe ser un número entero")
      .min(0, "El stock no puede ser negativo")
      .required("El stock es obligatorio"),
    category: yup.string().required("La categoría es obligatoria"),
  })
  .required();

const categories = [
  "Electrónicos",
  "Ropa",
  "Hogar",
  "Juguetes",
  "Deportes",
  "Comida",
  "Libros",
];

export const ProductForm = ({
  open,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
  error = null,
}) => {
  const isEditMode = !!initialData;
  const formTitle = isEditMode ? "Actualizar Producto" : "Crear Nuevo Producto";
  const buttonText = isEditMode ? "Actualizar" : "Crear";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset(
        initialData || {
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "",
        }
      );
    }
  }, [open, initialData, reset]);

  const submitHandler = (data) => {
    if (isEditMode && initialData.id) {
      data.id = initialData.id;
    }
    onSubmit(data);
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-product-form"
    >
      <Box sx={{ width: { xs: "100%", sm: 500 }, maxHeight: "90vh" }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {formTitle}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message || "Ocurrió un error. Intente nuevamente."}
          </Alert>
        )}

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="my-3">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre del producto"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <div className="my-3">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <div className="my-3" >
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Precio"
                  variant="outlined"
                  fullWidth
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <div className="my-3">
            <Controller
              name="stock"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stock"
                  variant="outlined"
                  fullWidth
                  type="number"
                  error={!!errors.stock}
                  helperText={errors.stock?.message}
                  disabled={isLoading}
                />
              )}
            />
          </div>

          <div className="my-3">
            <FormControl
              fullWidth
              error={!!errors.category}
              disabled={isLoading}
            >
              <InputLabel>Categoría</InputLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Categoría">
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.category && (
                <Typography variant="caption" color="error">
                  {errors.category.message}
                </Typography>
              )}
            </FormControl>
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
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {isLoading ? "Enviando..." : buttonText}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </StyledModal>
  );
};

export default ProductForm;
