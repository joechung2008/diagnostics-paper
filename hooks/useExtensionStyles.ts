import { useMemo } from "react";
import { useTheme } from "react-native-paper";

export const useExtensionStyles = () => {
  const { colors, fonts } = useTheme();

  return useMemo(
    () => ({
      scrollView: {
        flex: 1,
        backgroundColor: colors.background,
      },
      container: {
        display: "flex" as const,
        flexDirection: "column" as const,
        gap: 16,
        padding: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: "600" as const,
        marginBottom: 10,
        color: colors.onSurface,
        fontFamily: fonts.headlineSmall.fontFamily,
      },
    }),
    [colors, fonts]
  );
};
