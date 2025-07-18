import { Box, ThemeProvider, Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { CreateCastMembers } from "./features/cast-members/CreateCastMembers";
import { EditCastMembers } from "./features/cast-members/EditCastMembers";
import { ListCastMembers } from "./features/cast-members/ListCastMembers";
import { CategoryCreate } from "./features/categories/CreateCategory";
import { CategoryEdit } from "./features/categories/EditCategory";
import { CategoryList } from "./features/categories/ListCategory";

function App() {
	return (
		<ThemeProvider theme={appTheme}>
			<SnackbarProvider
				autoHideDuration={2000}
				maxSnack={3}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<Box
					component="main"
					sx={{
						height: "100vh",
						backgroundColor: (theme) => theme.palette.grey[900],
					}}
				>
					<Header />
					<Layout>
						<Routes>
							<Route path="/" element={<CategoryList />} />

							{/* Categories */}
							<Route path="/categories" element={<CategoryList />} />
							<Route path="/categories/create" element={<CategoryCreate />} />
							<Route path="/categories/edit/:id" element={<CategoryEdit />} />

							{/* Cast Members */}
							<Route path="/cast-members" element={<ListCastMembers />} />
							<Route
								path="/cast-members/create"
								element={<CreateCastMembers />}
							/>
							<Route
								path="/cast-members/edit/:id"
								element={<EditCastMembers />}
							/>

							<Route
								path="*"
								element={
									<Box sx={{ color: "white" }}>
										<Typography variant="h1">404</Typography>
										<Typography variant="h2">Page Not Found</Typography>
									</Box>
								}
							/>
						</Routes>
					</Layout>
				</Box>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
