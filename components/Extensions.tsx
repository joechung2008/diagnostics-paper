import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useExtensionsStyles } from "../hooks/useExtensionsStyles";
import type { ExtensionsProps } from "../lib/types";
import { byKey, isExtensionInfo, toNavLink } from "../lib/utils";

const Extensions = ({ extensions, onLinkClick }: ExtensionsProps) => {
  const dynamicStyles = useExtensionsStyles();

  const links = useMemo(
    () =>
      Object.values(extensions)
        .filter(isExtensionInfo)
        .map(toNavLink)
        .sort(byKey),
    [extensions]
  );

  return (
    <ScrollView style={dynamicStyles.container} accessibilityLabel="Extensions">
      {links.map((link) => (
        <Button
          key={link.key}
          mode="outlined"
          onPress={() => onLinkClick?.(link)}
          style={dynamicStyles.button}
        >
          {link.name}
        </Button>
      ))}
    </ScrollView>
  );
};

export default Extensions;
