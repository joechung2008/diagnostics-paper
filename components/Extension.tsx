import React from "react";
import { ScrollView, Text } from "react-native";
import Configuration from "../components/Configuration";
import StageDefinition from "../components/StageDefinition";
import { useExtensionStyles } from "../hooks/useExtensionStyles";
import type { ExtensionProps } from "../lib/types";

const Extension = ({
  config,
  extensionName,
  stageDefinition,
}: ExtensionProps) => {
  const dynamicStyles = useExtensionStyles();

  return (
    <ScrollView
      style={dynamicStyles.scrollView}
      contentContainerStyle={dynamicStyles.container}
    >
      <Text style={dynamicStyles.title}>{extensionName}</Text>
      {config && <Configuration config={config} />}
      {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
    </ScrollView>
  );
};

export default Extension;
