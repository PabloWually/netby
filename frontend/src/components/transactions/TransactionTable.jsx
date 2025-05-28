import React, { useState } from "react";
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
  Chip,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useGetTransactions } from "../../hooks/useGetTransactions";

export const TransactionTable = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [type, setType] = useState("");

  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const [tempType, setTempType] = useState("");

  const { data, isLoading, error, refetch } = useGetTransactions(
    paginationModel.page + 1,
    paginationModel.pageSize,
    startDate,
    endDate,
    type
  );

  const handleSearch = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setType(tempType);
    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const handleClearFilters = () => {
    setTempStartDate(null);
    setTempEndDate(null);
    setTempType("");

    setStartDate(null);
    setEndDate(null);
    setType("");

    setPaginationModel({ ...paginationModel, page: 0 });
  };

  const columns = [
    {
      field: "date",
      headerName: "Fecha",
      width: 180,
      renderCell: (params) => {
        if (!params.value) return "";
        try {
          const date = new Date(params.value);

          if (isNaN(date.getTime())) return "Fecha inválida";

          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");

          return <p>{day}/{month}/{year}</p>
        } catch (error) {
          console.error("Error al formatear fecha:", error);
          return "Error de formato";
        }
      },
    },
    {
      field: "type",
      headerName: "Tipo",
      width: 130,
      renderCell: (params) => {
        const isCompra = params.value === "Purchase";
        return (
          <Chip
            label={isCompra ? "Compra" : "Venta"}
            color={isCompra ? "primary" : "success"}
            size="small"
            variant="outlined"
          />
        );
      },
    },
    {
      field: "productName",
      headerName: "Producto",
      width: 200,
      flex: 1,
    },
    {
      field: "productStock",
      headerName: "Stock Actual",
      width: 120,
      type: "number",
    },
    {
      field: "quantity",
      headerName: "Cantidad",
      width: 120,
      type: "number",
    },
    {
      field: "unitPrice",
      headerName: "Precio Unitario",
      width: 150,
      type: "number",
      cellClassName: (params) => {
        if (params.value <= 0) {
          return "low-stock";
        }
        return "";
      },
    },
    {
      field: "totalPrice",
      headerName: "Precio Total",
      width: 150,
      type: "number",
      cellClassName: (params) => {
        if (params.value <= 0) {
          return "low-stock";
        }
        return "";
      },
    },
    {
      field: "detail",
      headerName: "Detalle",
      width: 200,
      flex: 1,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filtros de Transacciones
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Fecha inicial"
                value={tempStartDate}
                onChange={(date) => setTempStartDate(date)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    variant: "outlined",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="Fecha final"
                value={tempEndDate}
                onChange={(date) => setTempEndDate(date)}
                minDate={tempStartDate}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    variant: "outlined",
                  },
                }}
              />
            </Grid>
          </LocalizationProvider>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Tipo de Transacción</InputLabel>
              <Select
                value={tempType}
                onChange={(e) => setTempType(e.target.value)}
                label="Tipo de Transacción"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value={1}>Compra</MenuItem>
                <MenuItem value={2}>Venta</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Button
              variant="contained"
              startIcon={<FilterAltIcon />}
              onClick={handleSearch}
              fullWidth
            >
              Filtrar
            </Button>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClearFilters}
              fullWidth
            >
              Limpiar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ height: 600 }}>
        {isLoading && !data ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 2 }}>
            <Typography color="error">
              Error al cargar las transacciones: {error.message}
            </Typography>
          </Box>
        ) : (
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
            slots={{ toolbar: GridToolbar }}
            sx={{
              "& .MuiDataGrid-cell": {
                whiteSpace: "normal",
                lineHeight: "normal",
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default TransactionTable;
