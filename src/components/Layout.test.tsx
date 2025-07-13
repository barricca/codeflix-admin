import { Typography } from "@mui/material";
import { render } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout", () => {
	it("should render Layout with children correctly", () => {
		const { asFragment } = render(
			<Layout>
				<Typography variant="h1">Test Title</Typography>
			</Layout>,
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
