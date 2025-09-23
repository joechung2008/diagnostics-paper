import { useMemo } from "react";
import { Text, View } from "react-native";
import { useConfigurationStyles } from "../hooks/useConfigurationStyles";
import type { ConfigurationProps, KeyValuePair } from "../lib/types";

const Configuration = ({ config }: ConfigurationProps) => {
  const dynamicStyles = useConfigurationStyles();

  const items = useMemo(
    () =>
      Object.entries(config).reduce<KeyValuePair<string>[]>(
        (previous, [key, value]) => [...previous, { key, value }],
        []
      ),
    [config]
  );

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.title}>Configuration</Text>
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

export default Configuration;
