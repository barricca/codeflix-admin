import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
	it("should render Header component correctly", () => {
		const { asFragment } = render(<Header />);
		expect(asFragment()).toMatchSnapshot();
	});
});
