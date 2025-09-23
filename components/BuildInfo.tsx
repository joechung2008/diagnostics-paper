import { Text, View } from "react-native";
import { useBuildInfoStyles } from "../hooks/useBuildInfoStyles";
import type { BuildInfoProps } from "../lib/types";

const BuildInfo = ({ buildVersion }: BuildInfoProps) => {
  const items = [
    {
      name: "Build Version",
      value: buildVersion,
    },
  ];

  const dynamicStyles = useBuildInfoStyles();

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.table}>
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.headerText}>Name</Text>
          <Text style={dynamicStyles.headerText}>Value</Text>
        </View>
        {items.map((item) => (
          <View key={item.name} style={dynamicStyles.row}>
            <Text style={[dynamicStyles.cell, dynamicStyles.cellText]}>
              {item.name}
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

export default BuildInfo;
