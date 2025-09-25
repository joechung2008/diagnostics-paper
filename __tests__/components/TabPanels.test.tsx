import { render } from "@testing-library/react-native";
import React from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import TabPanels from "../../components/TabPanels";

describe("TabPanels", () => {
  const mockOnLinkClick = jest.fn();
  const mockOnViewModeChange = jest.fn();

  const mockDiagnostics = {
    buildInfo: { buildVersion: "1.0.0" },
    extensions: {
      ext1: {
        extensionName: "Extension One",
        manageSdpEnabled: true,
      },
    },
    serverInfo: {
      deploymentId: "test-deployment",
      extensionSync: { totalSyncAllCount: 5 },
      hostname: "test-host",
      serverId: "test-server",
    },
  };

  it("renders correctly in loading state", () => {
    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <TabPanels
          diagnostics={undefined}
          extension={undefined}
          isLoading={true}
          selectedTab="extensions"
          viewMode="list"
          onLinkClick={mockOnLinkClick}
          onViewModeChange={mockOnViewModeChange}
        />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with error", () => {
    const mockError = new Error("Test error");

    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <TabPanels
          diagnostics={undefined}
          error={mockError}
          extension={undefined}
          isLoading={false}
          selectedTab="extensions"
          viewMode="list"
          onLinkClick={mockOnLinkClick}
          onViewModeChange={mockOnViewModeChange}
        />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with extensions tab in list mode", () => {
    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <TabPanels
          diagnostics={mockDiagnostics}
          extension={undefined}
          isLoading={false}
          selectedTab="extensions"
          viewMode="list"
          onLinkClick={mockOnLinkClick}
          onViewModeChange={mockOnViewModeChange}
        />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with build tab", () => {
    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <TabPanels
          diagnostics={mockDiagnostics}
          extension={undefined}
          isLoading={false}
          selectedTab="build"
          viewMode="list"
          onLinkClick={mockOnLinkClick}
          onViewModeChange={mockOnViewModeChange}
        />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with server tab", () => {
    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <TabPanels
          diagnostics={mockDiagnostics}
          extension={undefined}
          isLoading={false}
          selectedTab="server"
          viewMode="list"
          onLinkClick={mockOnLinkClick}
          onViewModeChange={mockOnViewModeChange}
        />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
