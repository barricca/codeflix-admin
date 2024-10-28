import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Results } from "../../../types/Category";

type Props = {
  data: Results | undefined;
  page: number;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
};

export function CategoryTable({
  data,
  page,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {
  const slotProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  };

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];

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
      type: "string",
    },
  ];

  function mapDataToGridRows(data: Results) {
    const { data: categories } = data;
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      isActive: category.is_active,
      createdAt: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));
  }

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
        onClick={() => handleDelete(params.value)}
      >
        <DeleteIcon />
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

  const rowCount = data?.meta.total ?? 0;

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid
        checkboxSelection={false}
        columns={columns}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableRowSelectionOnClick={true}
        filterMode={"server"}
        paginationModel={{ page: page, pageSize: perPage }}
        loading={isFetching}
        onPaginationModelChange={(model) => {
          handleOnPageChange(model.page);
          handleOnPageSizeChange(model.pageSize);
        }}
        onFilterModelChange={handleFilterChange}
        pagination={true}
        paginationMode={"server"}
        pageSizeOptions={rowsPerPage}
        rowCount={rowCount}
        rows={rows}
        slotProps={slotProps}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
