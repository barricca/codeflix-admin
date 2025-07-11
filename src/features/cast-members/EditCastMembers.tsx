import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CastMember } from "../../types/CastMembers";
import {
	initialState,
	useGetCastMemberQuery,
	useUpdateCastMemberMutation,
} from "./castMembersSlice";
import { CastMemberForm } from "./components/CastMemberForm";

export const EditCastMembers = () => {
	const id = useParams().id ?? "";
	const { data: castMember, isFetching } = useGetCastMemberQuery({ id });
	const [castMemberState, setCastMemberState] =
		useState<CastMember>(initialState);

	const [updateCastMember, status] = useUpdateCastMemberMutation();

	const { enqueueSnackbar } = useSnackbar();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setCastMemberState({ ...castMemberState, [name]: value });
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		await updateCastMember(castMemberState);
	}

	useEffect(() => {
		if (castMember) {
			setCastMemberState(castMember.data);
		}
	}, [castMember]);

	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar("Cast member updated", { variant: "success" });
		}
		if (status.isError) {
			enqueueSnackbar("Cast member not updated", { variant: "error" });
		}
	}, [status, enqueueSnackbar]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Edit Cast Member</Typography>
					</Box>
				</Box>
				<CastMemberForm
					castMember={castMemberState}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					isDisabled={isFetching || status.isLoading}
					isLoading={status.isLoading}
				/>
			</Paper>
		</Box>
	);
};
