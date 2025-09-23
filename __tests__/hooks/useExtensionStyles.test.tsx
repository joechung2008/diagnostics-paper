import React from "react";
import { renderHook } from "@testing-library/react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { useExtensionStyles } from "../../hooks/useExtensionStyles";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={MD3LightTheme}>{children}</PaperProvider>
);

describe("useExtensionStyles", () => {
  it("returns memoized styles object with correct theme values", () => {
    const { result } = renderHook(() => useExtensionStyles(), { wrapper });

    expect(result.current).toEqual(
      expect.objectContaining({
        scrollView: expect.objectContaining({
          flex: 1,
          backgroundColor: MD3LightTheme.colors.background,
        }),
        container: expect.objectContaining({
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: 10,
        }),
        title: expect.objectContaining({
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 10,
          color: MD3LightTheme.colors.onSurface,
          fontFamily: MD3LightTheme.fonts.headlineSmall.fontFamily,
        }),
      })
    );
  });

  it("returns the same object reference on re-renders", () => {
    const { result, rerender } = renderHook(() => useExtensionStyles(), {
      wrapper,
    });

    const firstResult = result.current;
    rerender(undefined);
    const secondResult = result.current;

    expect(firstResult).toStrictEqual(secondResult);
  });
});
