import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, useTheme, Button } from "react-native-paper";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import type { Diagnostics, ExtensionInfo, KeyedNavLink } from "../lib/types";

interface TabPanelsProps {
  diagnostics: Diagnostics | undefined;
  error?: Error;
  extension: ExtensionInfo | undefined;
  isLoading: boolean;
  selectedTab: string;
  viewMode: "list" | "details";
  onLinkClick: (item: KeyedNavLink) => void;
  onViewModeChange: (mode: "list" | "details") => void;
}

const TabPanels: React.FC<TabPanelsProps> = ({
  diagnostics,
  error,
  extension,
  isLoading,
  selectedTab,
  viewMode,
  onLinkClick,
  onViewModeChange,
}) => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={isLoading || error ? styles.center : undefined}
      style={styles.content}
    >
      {isLoading ? (
        <ActivityIndicator
          accessibilityLabel="Loading diagnostics..."
          size="large"
        />
      ) : error ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          Error loading diagnostics: {error.message}
        </Text>
      ) : selectedTab === "extensions" && diagnostics?.extensions ? (
        <View style={styles.tabContent}>
          {viewMode === "list" ? (
            <Extensions
              extensions={diagnostics.extensions}
              onLinkClick={onLinkClick}
            />
          ) : (
            extension && (
              <View>
                <Button
                  mode="outlined"
                  icon="arrow-left"
                  onPress={() => onViewModeChange("list")}
                  style={{ marginBottom: 8 }}
                >
                  Back
                </Button>
                <Extension {...extension} />
              </View>
            )
          )}
        </View>
      ) : selectedTab === "build" && diagnostics?.buildInfo ? (
        <View style={styles.tabContent}>
          <BuildInfo {...diagnostics.buildInfo} />
        </View>
      ) : selectedTab === "server" && diagnostics?.serverInfo ? (
        <View style={styles.tabContent}>
          <ServerInfo {...diagnostics.serverInfo} />
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
  },
  tabContent: {
    padding: 10,
  },
});

export default TabPanels;
