import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { CastMembersTable } from "./CastMembersTable";

const Props = {
	data: {
		data: [
			{
				id: "123",
				type: 1,
				name: "test",
				deleted_at: null,
				created_at: "2021-03-01T00:00:00.000000Z",
				updated_at: "2021-03-01T00:00:00.000000Z",
			},
		],
		meta: {
			currentPage: 1,
			from: 1,
			lastPage: 1,
			path: "http://localhost:8000/api/cast_members",
			perPage: 1,
			to: 1,
			total: 1,
		},
		links: {
			first: "http://localhost:8000/api/cast_members?page=1",
			last: "http://localhost:8000/api/cast_members?page=1",
			prev: "",
			next: "",
		},
	},
	perPage: 15,
	isFetching: false,
	rowsPerPage: [15, 30, 45],
	handleOnPageChange: () => {},
	handleFilterChange: () => {},
	handleOnPageSizeChange: () => {},
	handleDelete: () => {},
};

describe("CastMembersTable", () => {
	it("should render castMember table correctly", () => {
		const { asFragment } = render(<CastMembersTable {...Props} />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});

	it("should render CastMembersTable with loading state", () => {
		const { asFragment } = render(<CastMembersTable {...Props} isFetching />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});

	it("should render CastMembersTable with empty data", () => {
		const { asFragment } = render(
			<CastMembersTable
				{...Props}
				data={{
					data: [],
					meta: { ...Props.data.meta },
					links: { ...Props.data.links },
				}}
			/>,
			{
				wrapper: BrowserRouter,
			},
		);

		expect(asFragment()).toMatchSnapshot();
	});

	it("should render correct type", () => {
		const { asFragment } = render(
			<CastMembersTable
				{...Props}
				data={{
					...Props.data,
					data: [{ ...Props.data.data[0], type: 2 }],
				}}
			/>,
			{
				wrapper: BrowserRouter,
			},
		);

		expect(asFragment()).toMatchSnapshot();
	});

	it("should render CastMembersTable with data undefined (rows = [])", () => {
		const { asFragment } = render(
			<CastMembersTable
				{...Props}
				data={undefined as typeof Props.data | undefined} // força o else do ternário
			/>,
			{ wrapper: BrowserRouter },
		);

		expect(asFragment()).toMatchSnapshot();
	});

	it("should call handleDelete when delete button is clicked", async () => {
		const handleDeleteMock = jest.fn();

		const { asFragment } = render(
			<CastMembersTable {...Props} handleDelete={handleDeleteMock} />,
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
