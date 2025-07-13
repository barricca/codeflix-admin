import { renderWithProviders } from "../../utils/test-utils";
import { CategoryCreate } from "./CreateCategory";

describe("CreateCategory", () => {
	it("should render correctly", () => {
		const { asFragment } = renderWithProviders(<CategoryCreate />);
		expect(asFragment()).toMatchSnapshot();
	});
});
