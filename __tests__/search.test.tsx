import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import Search from "@/components/Search/index";
import { store } from "../src/lib/Redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderWithClient } from "@/lib/utils/msw";

describe("Search", () => {
  const queryClient = new QueryClient();
  beforeEach(() => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </Provider>
    );
  });

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

  test("search placeholder should render 'Search By Track' when clicked once and toggle back to 'Search By Artist' when clicked again", () => {
    const searchSwitch = screen.getByTestId("search-switch");
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.placeholder).toBe("Search By Artist");
    fireEvent.click(searchSwitch);
    expect(input.placeholder).toBe("Search By Track");
    fireEvent.click(searchSwitch);
    expect(input.placeholder).toBe("Search By Artist");
  });

  test("search switch state should initially be false", () => {
    const state = store.getState().searchMode;
    expect(state.searchMode).toBe(false);
  });

  test("search switch state should be true when clicked", () => {
    const searchSwitch = screen.getByTestId("search-switch");
    fireEvent.click(searchSwitch);
    const state = store.getState().searchMode;
    expect(state.searchMode).toBe(true);
  });

  test("input value should be the same as the value entered in input element", () => {
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const value = "50 Cent";
    fireEvent.change(input, { target: { value } });
    expect(input.value).toBe(value);
  });
});
