import "react-native-gesture-handler/jestSetup";

// Mock for @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  MaterialIcons: "MaterialIcons",
  Ionicons: "Ionicons",
}));

// Global mock for react-native-paper with default theme
jest.mock("react-native-paper", () => {
  const mockThemeColors = {
    primary: "#6750A4",
    onPrimary: "#FFFFFF",
    primaryContainer: "#EADDFF",
    onPrimaryContainer: "#21005D",
    secondary: "#625B71",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#E8DEF8",
    onSecondaryContainer: "#1D192B",
    tertiary: "#7D5260",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFD8E4",
    onTertiaryContainer: "#31111D",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#FFFBFE",
    onBackground: "#1C1B1F",
    surface: "#FFFBFE",
    onSurface: "#1C1B1F",
    surfaceVariant: "#E7E0EC",
    onSurfaceVariant: "#49454F",
    outline: "#79747E",
    outlineVariant: "#CAC4D0",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#313033",
    inverseOnSurface: "#F4EFF4",
    inversePrimary: "#D0BCFF",
    elevation: {
      level0: "transparent",
      level1: "#F4EFF4",
      level2: "#F4EFF4",
      level3: "#F4EFF4",
      level4: "#F4EFF4",
      level5: "#F4EFF4",
    },
    surfaceDisabled: "#1C1B1F1F",
    onSurfaceDisabled: "#1C1B1F61",
    backdrop: "#00000033",
  };

  const mockFonts = {
    titleSmall: { fontFamily: "System" },
    bodyMedium: { fontFamily: "System" },
    titleMedium: { fontFamily: "System" },
    headlineSmall: { fontFamily: "System" },
  };

  return {
    PaperProvider: ({ children }) => children,
    useTheme: () => ({
      colors: mockThemeColors,
      fonts: mockFonts,
    }),
    MD3LightTheme: {
      colors: mockThemeColors,
      fonts: mockFonts,
    },
    // Mock Appbar components
    Appbar: {
      Header: ({ children }) => `Appbar.Header: ${children}`,
      Action: ({ children }) => `Appbar.Action: ${children}`,
      Content: ({ children }) => `Appbar.Content: ${children}`,
    },
    // Mock other components
    Button: ({ children }) => `Button: ${children}`,
    Text: ({ children }) => `Text: ${children}`,
    Card: ({ children }) => `Card: ${children}`,
    Surface: ({ children }) => `Surface: ${children}`,
    Menu: ({ children }) => `Menu: ${children}`,
    ActivityIndicator: ({ size }) => `ActivityIndicator: ${size || "small"}`,
    SegmentedButtons: ({ buttons }) =>
      `SegmentedButtons: ${buttons.map((b) => b.label).join(", ")}`,
  };
});

// Global test setup
global.fetch = jest.fn();
