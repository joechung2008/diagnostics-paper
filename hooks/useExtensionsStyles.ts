import { useMemo } from "react";
import { useTheme } from "react-native-paper";

export const useExtensionsStyles = () => {
  const { colors } = useTheme();

  return useMemo(
    () => ({
      container: {
        flexGrow: 0,
        flexShrink: 1,
        minWidth: 0,
        padding: 10,
        backgroundColor: colors.background,
      },
      button: {
        marginBottom: 8,
      },
    }),
    [colors]
  );
};
