import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import type {
	GridColDef,
	GridFilterModel,
	GridRenderCellParams,
} from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import type { Results } from "../../../types/Category";

type Props = {
	data: Results | undefined;
	perPage: number;
	isFetching: boolean;
	rowsPerPage?: number[];

	handleOnPageChange: (page: number) => void;
	handleFilterChange: (filterModel: GridFilterModel) => void;
	handleOnPageSizeChange: (perPage: number) => void;
	handleDelete: (id: string) => void;
};

export function CategoryTable({
	data,
	perPage,
	isFetching,
	rowsPerPage,
	handleOnPageChange,
	handleFilterChange,
	handleOnPageSizeChange,
	handleDelete,
}: Readonly<Props>) {
	const componentProps = {
		toolbar: {
			showQuickFilter: true,
			quickFilterProps: { debounceMs: 500 },
		},
	};

	const columns: GridColDef[] = [
		{ field: "name", flex: 1, headerName: "Name", renderCell: renderNameCell },
		{
			field: "isActive",
			headerName: "Active",
			flex: 1,
			type: "boolean",
			renderCell: renderIsActiveCell,
		},
		{
			field: "id",
			headerName: "Actions",
			type: "string",
			flex: 1,
			renderCell: renderActionsCell,
		},
	];

	function mapDataToGridRows(data: Results) {
		const { data: categories } = data;
		return categories.map((category) => ({
			id: category.id,
			name: category.name,
			isActive: category.is_active,
			createdAt: new Date(category.created_at).toLocaleDateString("pt-BR"),
		}));
	}

	function renderActionsCell(params: GridRenderCellParams) {
		return (
			<IconButton
				color="secondary"
				onClick={() => handleDelete(params.value)}
				aria-label="delete"
				data-testid="delete-button"
			>
				<DeleteIcon />
			</IconButton>
		);
	}

	function renderNameCell(rowData: GridRenderCellParams) {
		return (
			<Link
				style={{ textDecoration: "none" }}
				to={`/categories/edit/${rowData.id}`}
			>
				<Typography color="primary">{rowData.value}</Typography>
			</Link>
		);
	}

	function renderIsActiveCell(rowData: GridRenderCellParams) {
		return (
			<Typography color={rowData.value ? "primary" : "secondary"}>
				{rowData.value ? "Active" : "Inactive"}
			</Typography>
		);
	}

	const rows = data ? mapDataToGridRows(data) : [];
	const rowCount = data?.meta.total || 0;

	return (
		<Box sx={{ display: "flex", height: 600 }}>
			<DataGrid
				rows={rows}
				pagination={true}
				columns={columns}
				pageSize={perPage}
				filterMode="server"
				rowCount={rowCount}
				loading={isFetching}
				paginationMode="server"
				checkboxSelection={false}
				disableColumnFilter={true}
				disableColumnSelector={true}
				disableDensitySelector={true}
				rowsPerPageOptions={rowsPerPage}
				componentsProps={componentProps}
				onPageChange={handleOnPageChange}
				components={{ Toolbar: GridToolbar }}
				onFilterModelChange={handleFilterChange}
				onPageSizeChange={handleOnPageSizeChange}
			/>
		</Box>
	);
}
