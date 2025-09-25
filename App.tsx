import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import Root from "./app/Root";

export default function App() {
  const scheme = useColorScheme();

  const theme = useMemo(
    () => (scheme === "dark" ? MD3DarkTheme : MD3LightTheme),
    [scheme]
  );

  return (
    <PaperProvider theme={theme}>
      <title>
        {
          /* eslint-disable-line react-native/no-raw-text */ "Azure Portal Extensions Dashboard"
        }
      </title>
      <meta
        name="description"
        content="Information about extensions on the Azure portal"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <Root />
    </PaperProvider>
  );
}
