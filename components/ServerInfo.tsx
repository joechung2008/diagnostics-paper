import { Text, View } from "react-native";
import { useServerInfoStyles } from "../hooks/useServerInfoStyles";
import type { ServerInfoProps } from "../lib/types";

const ServerInfo = ({
  deploymentId,
  extensionSync,
  hostname,
  nodeVersions,
  serverId,
  uptime,
}: ServerInfoProps) => {
  const dynamicStyles = useServerInfoStyles();

  const items = [
    {
      name: "Hostname",
      value: hostname,
    },
    {
      name: "Uptime",
      value: uptime,
    },
    {
      name: "Server ID",
      value: serverId,
    },
    {
      name: "Deployment ID",
      value: deploymentId,
    },
    {
      name: "Node Versions",
      value: nodeVersions,
    },
    {
      name: "Extension Sync | Total Sync All Count",
      value: extensionSync.totalSyncAllCount,
    },
  ];

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

export default ServerInfo;
