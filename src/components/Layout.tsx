import { Box, Container } from "@mui/material";

export function Layout({ children }: { readonly children: React.ReactNode }) {
	return (
		<Box>
			<Container maxWidth="lg" sx={{ color: "white", mt: 4, mb: 4 }}>
				{children}
			</Container>
		</Box>
	);
}
