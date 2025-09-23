import React from "react";
import { renderHook } from "@testing-library/react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { useBuildInfoStyles } from "../../hooks/useBuildInfoStyles";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={MD3LightTheme}>{children}</PaperProvider>
);

describe("useBuildInfoStyles", () => {
  it("returns memoized styles object with correct theme values", () => {
    const { result } = renderHook(() => useBuildInfoStyles(), { wrapper });

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
        headerText: expect.objectContaining({
          flex: 1,
          fontWeight: "bold",
          color: MD3LightTheme.colors.onSurface,
          fontFamily: MD3LightTheme.fonts.titleSmall.fontFamily,
        }),
        row: expect.objectContaining({
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: MD3LightTheme.colors.outline,
        }),
        cell: expect.objectContaining({
          flex: 1,
          paddingLeft: 5,
          paddingRight: 5,
          minWidth: 0,
        }),
        cellText: expect.objectContaining({
          flex: 1,
          flexShrink: 1,
          color: MD3LightTheme.colors.onSurface,
          fontFamily: MD3LightTheme.fonts.bodyMedium.fontFamily,
        }),
      })
    );
  });

  it("returns the same object reference on re-renders", () => {
    const { result, rerender } = renderHook(() => useBuildInfoStyles(), {
      wrapper,
    });

    const firstResult = result.current;
    rerender(undefined);
    const secondResult = result.current;

    expect(firstResult).toStrictEqual(secondResult);
  });
});
