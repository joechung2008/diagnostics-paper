import { render } from "@testing-library/react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import Extension from "../../components/Extension";

describe("Extension", () => {
  it("renders correctly with full data", () => {
    const mockExtension = {
      extensionName: "Test Extension",
      manageSdpEnabled: true,
      config: {
        setting1: "value1",
        setting2: "value2",
      },
      stageDefinition: {
        stage1: ["step1", "step2"],
        stage2: ["step3"],
      },
    };

    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <Extension {...mockExtension} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with minimal data", () => {
    const mockExtension = {
      extensionName: "Minimal Extension",
      manageSdpEnabled: false,
    };

    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <Extension {...mockExtension} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
