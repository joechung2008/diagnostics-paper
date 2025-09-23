import React from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { render } from "@testing-library/react-native";
import Extensions from "../../components/Extensions";

describe("Extensions", () => {
  const mockOnLinkClick = jest.fn();

  it("renders correctly with extensions", () => {
    const mockExtensions = {
      ext1: {
        extensionName: "Extension One",
        manageSdpEnabled: true,
      },
      ext2: {
        extensionName: "Extension Two",
        manageSdpEnabled: false,
      },
    };

    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <Extensions extensions={mockExtensions} onLinkClick={mockOnLinkClick} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with empty extensions", () => {
    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <Extensions extensions={{}} onLinkClick={mockOnLinkClick} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
