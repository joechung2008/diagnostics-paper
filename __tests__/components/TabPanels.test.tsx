// Mock react-native-gesture-handler
import React from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { render } from "@testing-library/react-native";
import TabPanels from "../../components/TabPanels";

jest.mock("react-native-gesture-handler", () => ({
  Gesture: {
    Pan: jest.fn(() => ({
      onStart: jest.fn().mockReturnThis(),
      onUpdate: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
      onFinalize: jest.fn().mockReturnThis(),
    })),
  },
  GestureDetector: ({ children }: { children: React.ReactNode }) => children,
}));

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
