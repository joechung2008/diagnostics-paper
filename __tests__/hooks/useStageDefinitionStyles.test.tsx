import React from "react";
import { renderHook } from "@testing-library/react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { useStageDefinitionStyles } from "../../hooks/useStageDefinitionStyles";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider theme={MD3LightTheme}>{children}</PaperProvider>
);

describe("useStageDefinitionStyles", () => {
  it("returns memoized styles object with correct theme values", () => {
    const { result } = renderHook(() => useStageDefinitionStyles(), {
      wrapper,
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        container: expect.objectContaining({
          backgroundColor: MD3LightTheme.colors.background,
        }),
        title: expect.objectContaining({
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 10,
          color: MD3LightTheme.colors.onSurface,
          fontFamily: MD3LightTheme.fonts.titleMedium.fontFamily,
        }),
        table: expect.objectContaining({
          borderWidth: 1,
          borderColor: MD3LightTheme.colors.outline,
          backgroundColor: MD3LightTheme.colors.surface,
        }),
      })
    );
  });

  it("returns the same object reference on re-renders", () => {
    const { result, rerender } = renderHook(() => useStageDefinitionStyles(), {
      wrapper,
    });

    const firstResult = result.current;
    rerender(undefined);
    const secondResult = result.current;

    expect(firstResult).toStrictEqual(secondResult);
  });
});
