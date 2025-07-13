import { configureStore } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import type React from "react";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import type { AppStore, RootState } from "../app/store";
import { castMembersApiSlice } from "../features/cast-members/castMembersSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: Partial<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	extendedRenderOptions: ExtendedRenderOptions = {},
) {
	const {
		preloadedState = {},
		store = configureStore({
			reducer: {
				castMembers: castMembersApiSlice.reducer,
			},
			preloadedState,
		}),
		...renderOptions
	} = extendedRenderOptions;

	const Wrapper = ({ children }: PropsWithChildren) => (
		<Provider store={store}>
			<BrowserRouter>
				<SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
			</BrowserRouter>
		</Provider>
	);

	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
	};
}
