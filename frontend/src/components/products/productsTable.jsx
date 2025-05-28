import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGetProducts } from "../../hooks/useGetProducts";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { NewProductButton } from "./NewProductButton";

export const ProductsTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [filterValue, setFilterValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [tempFilterValue, setTempFilterValue] = useState("");
  const [tempCategoryFilter, setTempCategoryFilter] = useState("");

  const { data, isLoading, error, refetch } = useGetProducts(
    paginationModel.page + 1,
    paginationModel.pageSize,
    filterValue,
    categoryFilter
  );

  const handleSearch = () => {
    setFilterValue(tempFilterValue);
    setCategoryFilter(tempCategoryFilter);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handleClearFilters = () => {
    setTempFilterValue("");
    setTempCategoryFilter("");
    setFilterValue("");
    setCategoryFilter("");
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const columns = [
    { field: "name", headerName: "Nombre", width: 200, flex: 1 },
    { field: "description", headerName: "Descripción", width: 300, flex: 1 },
    { field: "category", headerName: "Categoría", width: 130 },
    {
      field: "price",
      headerName: "Precio",
      width: 120,
      type: "number",
      cellClassName: (params) => {
        if (params.value <= 5) {
          return "low-stock";
        }
        return "";
      },
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 90,
      type: "number",
      cellClassName: (params) => {
        if (params.value <= 5) {
          return "low-stock";
        }
        return "";
      },
    },
  ];

  const categories = [
    "Electrónicos",
    "Ropa",
    "Hogar",
    "Juguetes",
    "Deportes",
    "Comida",
    "Libros",
    "Tech"
  ];

  useEffect(() => {
    if (filterValue !== undefined || categoryFilter !== undefined) {
      refetch();
    }
  }, [filterValue, categoryFilter, paginationModel]);

  if (isLoading && !data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">
          Error al cargar los productos: {error.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ mb: 2, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Buscar por nombre"
              variant="outlined"
              size="small"
              fullWidth
              value={tempFilterValue}
              onChange={(e) => setTempFilterValue(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: tempFilterValue && (
                  <ClearIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => setTempFilterValue("")}
                  />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={tempCategoryFilter}
                onChange={(e) => setTempCategoryFilter(e.target.value)}
                label="Categoría"
              >
                <MenuItem value="">Todas</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<SearchIcon />}
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
            >
              Limpiar
            </Button>
          </Grid>
          <Grid item xs={6} sm={2}>
            <NewProductButton
              refetchProducts={refetch}
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ height: 650 }}>
        <DataGrid
          rows={data?.items || []}
          rowCount={data?.totalCount || 0}
          columns={columns}
          pageSizeOptions={[5, 10, 25, 50]}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          loading={isLoading}
          disableRowSelectionOnClick
          autoHeight
          slots={{ toolbar: GridToolbar }}
          sx={{
            "& .low-stock": {
              color: "error.main",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductsTable;
