import { Box, Button, Typography } from "@mui/material";
import type { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	useDeleteCastMemberMutation,
	useGetCastMembersQuery,
} from "./castMembersSlice";

const initialOptions = {
	page: 1,
	search: "",
	perPage: 10,
	rowsPerPage: [10, 25, 30],
};

export const ListCastMembers = () => {
	const [options, setOptions] = useState(initialOptions);
	const { data, isFetching, error } = useGetCastMembersQuery(options);
	const [deleteCastMember, { error: deleteError, isSuccess: deleteSuccess }] =
		useDeleteCastMemberMutation();

	const { enqueueSnackbar } = useSnackbar();

	function handleOnPageChange(page: number) {
		options.page = page;
		setOptions({ ...options, page });
	}

	function handleOnPageSizeChange(perPage: number) {
		options.perPage = perPage;
		setOptions({ ...options, perPage });
	}

	function handleFilterChange(filterModel: GridFilterModel) {
		if (!filterModel.quickFilterValues?.length) {
			return setOptions({ ...options, search: "" });
		}

		const search = filterModel.quickFilterValues.join("");
		options.search = search;
		setOptions({ ...options, search });
	}

	async function handleDeleteCastMember({ id }: { id: string }) {
		await deleteCastMember({ id });
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
		return <Typography variant="h2">Erro</Typography>;
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
		</Box>
	);
};
