import { renderWithProviders } from "../../utils/test-utils";
import { EditCastMembers } from "./EditCastMembers";

describe("EditCastMembers", () => {
	it("should render correctly", () => {
		const { asFragment } = renderWithProviders(<EditCastMembers />);
		expect(asFragment()).toMatchSnapshot();
	});
});
