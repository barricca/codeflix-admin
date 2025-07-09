import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import {
	DataGrid,
	type GridColDef,
	type GridFilterModel,
	type GridRenderCellParams,
	GridToolbar,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import type { Results } from "../../../types/CastMembers";

type Props = Readonly<{
	data: Results | undefined;
	perPage: number;
	isFetching: boolean;
	rowsPerPage?: number[];

	handleOnPageChange: (page: number) => void;
	handleFilterChange: (filterModel: GridFilterModel) => void;
	handleOnPageSizeChange: (pageSize: number) => void;
	handleDelete: (id: string) => void;
}>;

export function CastMembersTable({
	data,
	perPage,
	isFetching,
	rowsPerPage,
	handleOnPageChange,
	handleFilterChange,
	handleOnPageSizeChange,
	handleDelete,
}: Props) {
	const componentProps = {
		toolbar: {
			showQuickFilter: true,
			quickFilterProps: { debounceMs: 500 },
		},
	};

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
		{ field: "type", headerName: "Type", flex: 1, renderCell: renderTypeCell },
		{
			field: "id",
			flex: 1,
			headerName: "Actions",
			renderCell: renderActionsCell,
			type: "string",
		},
	];

	function mapDataToGridRows(data: Results) {
		const { data: castMembers } = data;
		return castMembers.map((castMember) => ({
			id: castMember.id,
			name: castMember.name,
			type: castMember.type,
		}));
	}

	function renderNameCell(rowData: GridRenderCellParams) {
		return (
			<Link
				style={{ textDecoration: "none" }}
				to={`/cast-members/edit/${rowData.id}`}
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

	function renderTypeCell(rowData: GridRenderCellParams) {
		return (
			<Typography color="primary">
				{rowData.value === 1 ? "Director" : "Actor"}
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
