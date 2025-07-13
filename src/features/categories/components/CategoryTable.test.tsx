import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { CategoryTable } from "./CategoryTable";

const Props = {
	data: undefined,
	perPage: 10,
	isFetching: false,
	rowsPerPage: [5, 10, 20],
	handleOnPageChange: jest.fn(),
	handleFilterChange: jest.fn(),
	handleOnPageSizeChange: jest.fn(),
	handleDelete: jest.fn(),
};

const mockData = {
	data: [
		{
			id: "123",
			name: "Action",
			description: "Action movies and series",
			is_active: true,
			deleted_at: null,
			created_at: "2021-01-01T00:00:00Z",
			updated_at: "2021-01-01T00:00:00Z",
		},
	],
	meta: {
		to: 1,
		from: 1,
		path: "http://localhost:8000/api/categories",
		total: 1,
		per_page: 1,
		last_page: 1,
		current_page: 1,
	},
	links: {
		first: "http://localhost:8000/api/categories?page=1",
		last: "http://localhost:8000/api/categories?page=1",
		prev: "",
		next: "",
	},
};

describe("CategoryTable", () => {
	it("should render category table correctly", () => {
		const { asFragment } = render(<CategoryTable {...Props} />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render CategoryTable with loading", () => {
		const { asFragment } = render(
			<CategoryTable {...Props} isFetching={true} />,
			{ wrapper: BrowserRouter },
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render CategoryTable with data", () => {
		const { asFragment } = render(
			<CategoryTable {...Props} data={mockData} />,
			{
				wrapper: BrowserRouter,
			},
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render CategoryTable with inactive status", () => {
		const { asFragment } = render(
			<CategoryTable
				{...Props}
				data={{
					...mockData,
					data: mockData.data.map((category) => ({
						...category,
						is_active: false,
					})),
				}}
			/>,
			{
				wrapper: BrowserRouter,
			},
		);

		expect(asFragment()).toMatchSnapshot();
	});

	it("should call handleDelete when delete button is clicked", async () => {
		const handleDeleteMock = jest.fn();

		const { asFragment } = render(
			<CategoryTable
				{...Props}
				data={mockData}
				handleDelete={handleDeleteMock}
			/>,
			{
				wrapper: BrowserRouter,
			},
		);

		// encontra o botão de deletar pelo aria-label definido
		const deleteButton = screen.getByLabelText("delete");

		await userEvent.click(deleteButton);

		expect(handleDeleteMock).toHaveBeenCalledTimes(1);
		expect(handleDeleteMock).toHaveBeenCalledWith("123"); // id do mock
		expect(asFragment()).toMatchSnapshot();
	});
});
