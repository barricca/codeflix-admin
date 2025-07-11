import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CastMemberForm } from "./CastMemberForm";

const Props = {
	castMember: {
		id: "1",
		name: "Jhonny Depp",
		type: 1,
		deleted_at: null,
		created_at: "2021-01-01T00:00:00Z",
		updated_at: "2021-01-01T00:00:00Z",
	},
	handleChange: jest.fn(),
	handleSubmit: jest.fn(),
	isDisabled: false,
	isLoading: false,
};

describe("CastMemberForm", () => {
	it("should render cast member form correctly", () => {
		const { asFragment } = render(<CastMemberForm {...Props} />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render cast member form with loading state", () => {
		const { asFragment } = render(<CastMemberForm {...Props} isLoading />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});
});
