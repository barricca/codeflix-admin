import { renderWithProviders } from "../../utils/test-utils";
import { ListCastMembers } from "./ListCastMembers";

describe("ListCastMembers", () => {
	it("should render correctly", () => {
		const { asFragment } = renderWithProviders(<ListCastMembers />);
		expect(asFragment()).toMatchSnapshot();
	});
});
