import React from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { render } from "@testing-library/react-native";
import Configuration from "../../components/Configuration";

describe("Configuration", () => {
  it("renders correctly with config data", () => {
    const mockConfig = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };

    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <Configuration config={mockConfig} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with empty config", () => {
    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <Configuration config={{}} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
