import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithProviders, screen } from "../../utils/test-utils";
import { baseUrl } from "../api/apiSlice";
import { CategoryList } from "./ListCategory";
import { categoryResponse } from "./mocks";

export const handlers = [
	rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
		return res(ctx.json(categoryResponse), ctx.delay(150));
	}),
];

const server = setupServer(...handlers);

describe("CategoryList", () => {
	afterAll(() => server.close());
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());

	it("should render correctly", () => {
		const { asFragment } = renderWithProviders(<CategoryList />);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render with loading state", () => {
		renderWithProviders(<CategoryList />);
		const loading = screen.getByRole("progressbar");
		expect(loading).toBeInTheDocument();
	});
});
