import { useMemo } from "react";
import { useTheme } from "react-native-paper";

export const useStageDefinitionStyles = () => {
  const { colors, fonts } = useTheme();

  return useMemo(
    () => ({
      container: {
        backgroundColor: colors.background,
      },
      title: {
        fontSize: 16,
        fontWeight: "bold" as const,
        marginBottom: 10,
        color: colors.onSurface,
        fontFamily: fonts.titleMedium.fontFamily,
      },
      table: {
        borderWidth: 1,
        borderColor: colors.outline,
        backgroundColor: colors.surface,
      },
      header: {
        flexDirection: "row" as const,
        borderBottomWidth: 1,
        borderBottomColor: colors.outline,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: colors.surfaceVariant,
      },
      headerText: {
        flex: 1,
        fontWeight: "bold" as const,
        paddingLeft: 5,
        paddingRight: 5,
        color: colors.onSurface,
        fontFamily: fonts.titleSmall.fontFamily,
      },
      row: {
        flexDirection: "row" as const,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.outline,
      },
      cell: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        minWidth: 0, // Allow flex items to shrink below their content size
      },
      cellText: {
        flex: 1,
        flexShrink: 1,
        color: colors.onSurface,
        fontFamily: fonts.bodyMedium.fontFamily,
      },
    }),
    [colors, fonts]
  );
};
