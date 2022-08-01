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
  test("it should render search switch", () => {
    const searchSwitch = screen.getByTestId("search-switch");
    expect(searchSwitch).toBeInTheDocument();
  });

  test("search placeholder should render search by track when clicked once and toggle back to search by artist when clicked again", () => {
    const searchSwitch = screen.getByTestId("search-switch");
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.placeholder).toBe("Search By Artist");
    fireEvent.click(searchSwitch);
    expect(input.placeholder).toBe("Search By Track");
    fireEvent.click(searchSwitch);
    expect(input.placeholder).toBe("Search By Artist");
  });
});
