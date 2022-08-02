import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import Home from "@/pages/index";
import { store } from "../src/lib/Redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

beforeEach(() => {
  const queryClient = new QueryClient();
  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </Provider>
  );
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
