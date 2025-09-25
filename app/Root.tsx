import React, { startTransition, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import useSWR from "swr";
import Header from "../components/Header";
import TabPanels from "../components/TabPanels";
import { Environment, EnvironmentType } from "../lib/environment";
import type { ExtensionInfo, KeyedNavLink } from "../lib/types";
import { fetchDiagnostics, isExtensionInfo } from "../lib/utils";

const tabButtons = [
  { value: "extensions", label: "Extensions" },
  { value: "build", label: "Build Info" },
  { value: "server", label: "Server Info" },
];

const Root: React.FC = () => {
  const [environment, setEnvironment] = useState<EnvironmentType>(
    Environment.Public
  );

  const {
    data: diagnostics,
    error,
    isLoading,
  } = useSWR(environment, fetchDiagnostics);

  const [extension, setExtension] = useState<ExtensionInfo>();

  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  const [viewMode, setViewMode] = useState<"list" | "details">("list");

  const handleEnvironmentChange = useCallback((value: string) => {
    startTransition(() => {
      setEnvironment(value as EnvironmentType);
      setExtension(undefined);
      setViewMode("list");
    });
  }, []);

  const handleExtensionSelect = useCallback((extension: ExtensionInfo) => {
    setExtension(extension);
    setSelectedTab("extensions");
    setViewMode("details");
  }, []);

  const handleLinkClick = useCallback(
    (item: KeyedNavLink) => {
      if (item) {
        const $extension = diagnostics?.extensions[item.key];
        if (isExtensionInfo($extension)) {
          handleExtensionSelect($extension);
        }
      }
    },
    [diagnostics?.extensions, handleExtensionSelect]
  );

  const handleTabClick = useCallback(
    (value: string) => {
      // If clicking the already-selected Extensions tab, toggle back to list view
      if (value === "extensions" && selectedTab === "extensions") {
        setViewMode("list");
      }
      setSelectedTab(value);
    },
    [selectedTab]
  );

  return (
    <View style={styles.container}>
      <Header
        environment={environment}
        diagnostics={diagnostics}
        onEnvironmentChange={handleEnvironmentChange}
        onExtensionSelect={handleExtensionSelect}
      />

      <SegmentedButtons
        buttons={tabButtons}
        style={styles.segmentedButtons}
        value={selectedTab}
        onValueChange={handleTabClick}
      />

      <TabPanels
        isLoading={isLoading}
        error={error}
        selectedTab={selectedTab}
        diagnostics={diagnostics}
        viewMode={viewMode}
        extension={extension}
        onLinkClick={handleLinkClick}
        onViewModeChange={setViewMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedButtons: {
    margin: 10,
  },
});

export default Root;
