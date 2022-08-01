import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "@/components/Search/index";

beforeEach(() => {
  render(<Search />);
});

afterAll(cleanup);

describe("Search", () => {
  test("it should render a search input", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });
  test("", () => {
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  test("it should render a search input with value", () => {
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const value = "test";

    fireEvent.change(input, { target: { value } });
    expect(input.value).toBe(value);
  });
});
