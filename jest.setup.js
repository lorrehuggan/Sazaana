// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import { handlers } from "./src/lib/utils/msw";

export const server = setupServer(...handlers);

// Establish API mocking before each test
beforeEach(() => server.listen());
// Clean up and reset after each test
afterEach(() => server.resetHandlers());
// Clean up and reset after all tests
afterAll(() => server.close());

// Set up a logger for React Query
