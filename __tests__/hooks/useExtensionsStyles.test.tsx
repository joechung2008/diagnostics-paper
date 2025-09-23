import React from "react";
import { renderHook } from "@testing-library/react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { useExtensionsStyles } from "../../hooks/useExtensionsStyles";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={MD3LightTheme}>{children}</PaperProvider>
);

describe("useExtensionsStyles", () => {
  it("returns memoized styles object with correct theme values", () => {
    const { result } = renderHook(() => useExtensionsStyles(), { wrapper });

    expect(result.current).toEqual(
      expect.objectContaining({
        container: expect.objectContaining({
          flexGrow: 0,
          flexShrink: 1,
          minWidth: 0,
          padding: 10,
          backgroundColor: MD3LightTheme.colors.background,
        }),
        button: expect.objectContaining({
          marginBottom: 8,
        }),
      })
    );
  });

  it("returns the same object reference on re-renders", () => {
    const { result, rerender } = renderHook(() => useExtensionsStyles(), {
      wrapper,
    });

    const firstResult = result.current;
    rerender(undefined);
    const secondResult = result.current;

    expect(firstResult).toStrictEqual(secondResult);
  });
});
