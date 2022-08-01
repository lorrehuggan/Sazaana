import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";

beforeEach(() => {
  render(<Home />);
});

afterAll(cleanup);

describe("Home", () => {
  test("it should render a header", () => {
    const heading = screen.getByRole("banner");
    expect(heading).toBeInTheDocument();
  });

  test("it should render a main section", () => {
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });

  test("it should render a footer", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });
});
