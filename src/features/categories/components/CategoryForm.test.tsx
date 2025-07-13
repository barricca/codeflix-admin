import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CategoryForm } from "./CategoryForm";

const Props = {
	category: {
		id: "1",
		name: "Action",
		description: "Action movies and series",
		is_active: true,
		deleted_at: null,
		created_at: "2021-01-01T00:00:00Z",
		updated_at: "2021-01-01T00:00:00Z",
	},
	isDisabled: false,
	isLoading: false,
	handleChange: () => {},
	handleSubmit: () => {},
	handleToggle: () => {},
};

describe("CategoryForm", () => {
	it("should render category form correctly", () => {
		const { asFragment } = render(<CategoryForm {...Props} />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render disabled category form correctly", () => {
		const { asFragment } = render(
			<CategoryForm {...Props} isDisabled={true} />,
			{ wrapper: BrowserRouter },
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render loading category form correctly", () => {
		const { asFragment } = render(
			<CategoryForm {...Props} isLoading={true} />,
			{ wrapper: BrowserRouter },
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render with default props (isDisabled and isLoading)", () => {
		const { asFragment } = render(
			<CategoryForm
				// props base sem isDisabled nem isLoading
				category={Props.category}
				handleChange={Props.handleChange}
				handleSubmit={Props.handleSubmit}
				handleToggle={Props.handleToggle}
			/>,
			{ wrapper: BrowserRouter },
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render CategoryForm with empty name (trigger || fallback)", () => {
		const { asFragment } = render(
			<CategoryForm
				{...Props}
				category={{
					...Props.category,
					name: "",
				}}
			/>,
			{ wrapper: BrowserRouter },
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render CategoryForm with empty description (trigger || fallback)", () => {
		const { asFragment } = render(
			<CategoryForm
				{...Props}
				category={{
					...Props.category,
					description: "",
				}}
			/>,
			{ wrapper: BrowserRouter },
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
