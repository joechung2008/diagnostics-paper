export interface BuildInfoProps {
  buildVersion: string;
}

export interface ConfigurationProps {
  config: Record<string, string>;
}

export interface Diagnostics {
  buildInfo: BuildInfoProps;
  extensions: Record<string, Extension>;
  serverInfo: ServerInfoProps;
}

export interface ServerInfoProps {
  deploymentId: string;
  extensionSync: {
    totalSyncAllCount: number;
  };
  hostname: string;
  nodeVersions?: string;
  serverId: string;
  uptime?: number;
}

export interface StageDefinitionProps {
  stageDefinition: Record<string, string[]>;
}

export interface KeyValuePair<TValue> {
  key: string;
  value: TValue;
}

export interface ExtensionInfo {
  extensionName: string;
  manageSdpEnabled: boolean;
  config?: Record<string, string>;
  stageDefinition?: Record<string, string[]>;
}

export interface ExtensionError {
  lastError: {
    errorMessage: string;
    time: string;
  };
}

export type Extension = ExtensionInfo | ExtensionError;

export type ExtensionProps = ExtensionInfo;

export interface ExtensionsProps {
  extensions: Record<string, Extension>;
  onLinkClick(item?: KeyedNavLink): void;
}

export type KeyedNavLink = {
  key: string;
  name: string;
  url?: string;
  [prop: string]: unknown;
};
