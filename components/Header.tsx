import { useCallback, useMemo, useState } from "react";
import { Appbar, Menu } from "react-native-paper";
import {
  Environment,
  type EnvironmentType,
  getEnvironmentName,
} from "../lib/environment";
import type { Diagnostics, ExtensionInfo } from "../lib/types";
import { isExtensionInfo } from "../lib/utils";

interface HeaderProps {
  diagnostics: Diagnostics | undefined;
  environment: EnvironmentType;
  onEnvironmentChange: (environment: EnvironmentType) => void;
  onExtensionSelect: (extension: ExtensionInfo) => void;
}

const Header = ({
  diagnostics,
  environment,
  onEnvironmentChange,
  onExtensionSelect,
}: HeaderProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const environmentName = useMemo(
    () => getEnvironmentName(environment),
    [environment]
  );

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions["paasserverless"]),
    [diagnostics?.extensions]
  );

  const handleEnvironmentChange = useCallback(
    (value: EnvironmentType) => {
      onEnvironmentChange(value);
      setMenuVisible(false);
    },
    [onEnvironmentChange]
  );

  return (
    <Appbar.Header>
      <Menu
        anchor={
          <Appbar.Action
            accessibilityLabel="Select environment"
            icon="menu"
            onPress={() => setMenuVisible(true)}
          />
        }
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
      >
        {Object.entries(Environment).map(([key, value]) => (
          <Menu.Item
            key={key}
            title={getEnvironmentName(value)}
            onPress={() => handleEnvironmentChange(value)}
          />
        ))}
      </Menu>

      <Appbar.Content title={environmentName} />

      {showPaasServerless && (
        <Appbar.Action
          accessibilityLabel="paasserverless"
          icon="webhook"
          onPress={() => {
            const paasserverless = diagnostics?.extensions["paasserverless"];
            if (isExtensionInfo(paasserverless)) {
              onExtensionSelect(paasserverless);
            }
          }}
        />
      )}

      <Appbar.Action
        accessibilityLabel="websites"
        icon="web"
        onPress={() => {
          const websites = diagnostics?.extensions["websites"];
          if (isExtensionInfo(websites)) {
            onExtensionSelect(websites);
          }
        }}
      />
    </Appbar.Header>
  );
};

export default Header;
