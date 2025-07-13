import type { PreloadedState } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import type React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { type AppStore, type RootState, setupStore } from "../app/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{ store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {},
) {
	type ChildWrapperProps = React.PropsWithChildren<unknown>;

	function Wrapper({ children }: Readonly<ChildWrapperProps>): JSX.Element {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
				</BrowserRouter>
			</Provider>
		);
	}

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from "@testing-library/react";
