import { render } from "@testing-library/react-native";
import React from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import Header from "../../components/Header";
import { Environment } from "../../lib/environment";

describe("Header", () => {
  const mockOnEnvironmentChange = jest.fn();
  const mockOnExtensionSelect = jest.fn();

  it("renders correctly with basic props", () => {
    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <Header
          diagnostics={undefined}
          environment={Environment.Public}
          onEnvironmentChange={mockOnEnvironmentChange}
          onExtensionSelect={mockOnExtensionSelect}
        />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with diagnostics data", () => {
    const mockDiagnostics = {
      buildInfo: { buildVersion: "1.0.0" },
      extensions: {
        paasserverless: {
          extensionName: "paasserverless",
          manageSdpEnabled: true,
        },
        websites: {
          extensionName: "websites",
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

    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <Header
          diagnostics={mockDiagnostics}
          environment={Environment.Fairfax}
          onEnvironmentChange={mockOnEnvironmentChange}
          onExtensionSelect={mockOnExtensionSelect}
        />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
