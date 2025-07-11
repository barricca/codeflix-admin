import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import type { CastMember } from "../../types/CastMembers";
import { initialState, useCreateCastMemberMutation } from "./castMembersSlice";
import { CastMemberForm } from "./components/CastMemberForm";

export const CreateCastMembers = () => {
	const [castMemberState, setCastMemberState] =
		useState<CastMember>(initialState);
	const [createCastMember, status] = useCreateCastMemberMutation();
	const { enqueueSnackbar } = useSnackbar();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setCastMemberState({ ...castMemberState, [name]: value });
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		await createCastMember(castMemberState);
	}

	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar("Cast member created", { variant: "success" });
		}
		if (status.isError) {
			enqueueSnackbar("Cast member not created", { variant: "error" });
		}
	}, [status, enqueueSnackbar]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Create Cast Member</Typography>
					</Box>
				</Box>
				<CastMemberForm
					castMember={castMemberState}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
					isDisabled={status.isLoading}
					isLoading={status.isLoading}
				/>
			</Paper>
		</Box>
	);
};
