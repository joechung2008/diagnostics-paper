import React from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { render } from "@testing-library/react-native";
import StageDefinition from "../../components/StageDefinition";

describe("StageDefinition", () => {
  it("renders correctly with stage definition data", () => {
    const mockStageDefinition = {
      stage1: ["step1", "step2", "step3"],
      stage2: ["step4"],
      stage3: ["step5", "step6"],
    };

    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <StageDefinition stageDefinition={mockStageDefinition} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with empty stage definition", () => {
    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <StageDefinition stageDefinition={{}} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
