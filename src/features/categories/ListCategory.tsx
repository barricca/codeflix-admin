import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import DeleteIcon from "@mui/icons-material/Delete";

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories);

  const slotProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.is_active,
    createdAt: new Date(category.created_at).toLocaleDateString(),
  }));

  const columns: GridColDef[] = [
    {
      field: "name",
      flex: 1,
      headerName: "Name",
      renderCell: renderNameCell,
    },
    {
      field: "isActive",
      flex: 1,
      headerName: "Active",
      renderCell: renderIsActiveCell,
      type: "boolean",
    },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "id",
      flex: 1,
      headerName: "Actions",
      renderCell: renderActionsCell,
    },
  ];

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{
          textDecoration: "none",
        }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        aria-label="delete"
        color="secondary"
        onClick={() => console.log("clicked")}
      >
        <DeleteIcon></DeleteIcon>
      </IconButton>
    );
  }

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="secondary"
          component={Link}
          style={{ marginBottom: "1rem" }}
          to="/categories/create"
          variant="contained"
        >
          New Category
        </Button>
      </Box>

      {/* {categories.map((category) => (
        <Typography key={category.id}>{category.name}</Typography>
      ))} */}
      <Box sx={{ display: "flex", height: "600" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          slotProps={slotProps}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};
