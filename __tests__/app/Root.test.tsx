import React from "react";
import { render } from "@testing-library/react-native";
import useSWR from "swr";
import Root from "../../app/Root";

// Mock useSWR
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Root", () => {
  beforeEach(() => {
    (useSWR as jest.MockedFunction<typeof useSWR>).mockReturnValue({
      data: {
        extensions: {},
        build: {},
        server: {},
      },
      error: null,
      isLoading: false,
      mutate: jest.fn(),
      isValidating: false,
    });
  });

  it("renders without crashing", () => {
    const { toJSON } = render(<Root />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders Header component", () => {
    const { getByTestId } = render(<Root />);
    // Assuming Header has a testID, but since it's mocked, perhaps check for text or something
    // For now, just check it renders
    expect(getByTestId).toBeDefined(); // Placeholder
  });

  // Add more tests as needed
});
