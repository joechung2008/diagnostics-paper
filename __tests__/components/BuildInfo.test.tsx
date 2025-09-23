import React from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { render } from "@testing-library/react-native";
import BuildInfo from "../../components/BuildInfo";

describe("BuildInfo", () => {
  it("renders correctly with build version", () => {
    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <BuildInfo buildVersion="1.0.0" />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
