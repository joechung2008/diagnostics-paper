import React from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { render } from "@testing-library/react-native";
import ServerInfo from "../../components/ServerInfo";

describe("ServerInfo", () => {
  it("renders correctly with full server info", () => {
    const mockServerInfo = {
      deploymentId: "test-deployment-123",
      extensionSync: {
        totalSyncAllCount: 42,
      },
      hostname: "test-server.example.com",
      nodeVersions: "v18.17.0",
      serverId: "server-456",
      uptime: 1234567890,
    };

    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <ServerInfo {...mockServerInfo} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with minimal server info", () => {
    const mockServerInfo = {
      deploymentId: "minimal-deployment",
      extensionSync: {
        totalSyncAllCount: 0,
      },
      hostname: "minimal-server",
      serverId: "minimal-server-id",
    };

    const { toJSON } = render(
      <PaperProvider theme={MD3LightTheme}>
        <ServerInfo {...mockServerInfo} />
      </PaperProvider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
