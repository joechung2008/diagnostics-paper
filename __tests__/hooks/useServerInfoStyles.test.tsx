import React from "react";
import { renderHook } from "@testing-library/react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { useServerInfoStyles } from "../../hooks/useServerInfoStyles";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={MD3LightTheme}>{children}</PaperProvider>
);

describe("useServerInfoStyles", () => {
  it("returns memoized styles object with correct theme values", () => {
    const { result } = renderHook(() => useServerInfoStyles(), { wrapper });

    expect(result.current).toEqual(
      expect.objectContaining({
        container: expect.objectContaining({
          padding: 10,
          backgroundColor: MD3LightTheme.colors.background,
        }),
        table: expect.objectContaining({
          borderWidth: 1,
          borderColor: MD3LightTheme.colors.outline,
          backgroundColor: MD3LightTheme.colors.surface,
        }),
        header: expect.objectContaining({
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: MD3LightTheme.colors.outline,
          backgroundColor: MD3LightTheme.colors.surfaceVariant,
        }),
      })
    );
  });

  it("returns the same object reference on re-renders", () => {
    const { result, rerender } = renderHook(() => useServerInfoStyles(), {
      wrapper,
    });

    const firstResult = result.current;
    rerender(undefined);
    const secondResult = result.current;

    expect(firstResult).toStrictEqual(secondResult);
  });
});
