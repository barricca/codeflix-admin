import { Box, Button, Typography } from "@mui/material";
import type { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	useDeleteCastMemberMutation,
	useGetCastMembersQuery,
} from "./castMembersSlice";
import { CastMembersTable } from "./components/CastMembersTable";

export const ListCastMembers = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [options, setOptions] = useState({
		page: 1,
		search: "",
		perPage: 10,
		rowsPerPage: [10, 20, 30],
	});
	const { data, isFetching, error } = useGetCastMembersQuery(options);
	const [deleteCastMember, { error: deleteError, isSuccess: deleteSuccess }] =
		useDeleteCastMemberMutation();

	async function handleDeleteCastMember(id: string) {
		await deleteCastMember({ id });
	}

	function handleOnPageChange(page: number) {
		setOptions({ ...options, page: page + 1 });
	}

	function handleOnPageSizeChange(perPage: number) {
		setOptions({ ...options, perPage });
	}

	function handleFilterChange(filterModel: GridFilterModel) {
		if (!filterModel.quickFilterValues?.length) {
			return setOptions({ ...options, search: "" });
		}

		const search = filterModel.quickFilterValues.join("");
		setOptions({ ...options, search });
	}

	useEffect(() => {
		if (deleteSuccess) {
			enqueueSnackbar("Cast member deleted", { variant: "success" });
		}
		if (deleteError) {
			enqueueSnackbar("Cast member not deleted", { variant: "error" });
		}
	}, [deleteError, deleteSuccess, enqueueSnackbar]);

	if (error) {
		return <Typography variant="h2">Error!</Typography>;
	}

	return (
		<Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/cast-members/create"
					style={{ marginBottom: "1rem" }}
				>
					New Cast Member
				</Button>
			</Box>
			<CastMembersTable
				data={data}
				perPage={options.perPage}
				isFetching={isFetching}
				rowsPerPage={options.rowsPerPage}
				handleOnPageChange={handleOnPageChange}
				handleFilterChange={handleFilterChange}
				handleOnPageSizeChange={handleOnPageSizeChange}
				handleDelete={handleDeleteCastMember}
			/>
		</Box>
	);
};
