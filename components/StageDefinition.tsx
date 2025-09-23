import { useMemo } from "react";
import { Text, View } from "react-native";
import { useStageDefinitionStyles } from "../hooks/useStageDefinitionStyles";
import type { KeyValuePair, StageDefinitionProps } from "../lib/types";

const StageDefinition = ({ stageDefinition }: StageDefinitionProps) => {
  const dynamicStyles = useStageDefinitionStyles();

  const items = useMemo(
    () =>
      Object.entries(stageDefinition).reduce<KeyValuePair<string>[]>(
        (previous, [key, value]) => [
          ...previous,
          { key, value: value.join(", ") },
        ],
        []
      ),
    [stageDefinition]
  );

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Stage Definitions</Text>
      <View style={dynamicStyles.table}>
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.headerText}>Key</Text>
          <Text style={dynamicStyles.headerText}>Value</Text>
        </View>
        {items.map((item) => (
          <View key={item.key} style={dynamicStyles.row}>
            <Text style={[dynamicStyles.cell, dynamicStyles.cellText]}>
              {item.key}
            </Text>
            <Text style={[dynamicStyles.cell, dynamicStyles.cellText]}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StageDefinition;
