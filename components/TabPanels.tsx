import React, { useCallback, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ActivityIndicator, useTheme } from "react-native-paper";
import BuildInfo from "./BuildInfo";
import Extension from "./Extension";
import Extensions from "./Extensions";
import ServerInfo from "./ServerInfo";
import type { Diagnostics, ExtensionInfo, KeyedNavLink } from "../lib/types";
import {
  createFlingDismissAnimation,
  createFlingResetAnimation,
  createFlingStartAnimation,
} from "../lib/animations";

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

  // Animation values for fling feedback
  const { current: flingOpacity } = useRef(new Animated.Value(1));
  const { current: flingScale } = useRef(new Animated.Value(1));
  const { current: flingTranslateX } = useRef(new Animated.Value(0));
  const animationStarted = useRef(false);

  const resetFlingAnimation = useCallback(() => {
    createFlingResetAnimation(
      flingOpacity,
      flingScale,
      flingTranslateX
    ).start();
    // https://www.epicreact.dev/why-you-shouldnt-put-refs-in-a-dependency-array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Create swipe gestures using the modern Gesture API
  const flingGesture = Gesture.Pan()
    .onStart(() => {
      animationStarted.current = false;
      createFlingStartAnimation(flingOpacity, flingScale).start();
    })
    .onUpdate((event) => {
      if (!animationStarted.current) {
        let translateValue = 0;
        if (event.velocityX > 500 && event.translationX > 50) {
          translateValue = -200;
        } else if (event.velocityX < -500 && event.translationX < -50) {
          translateValue = 200;
        }
        if (translateValue !== 0) {
          animationStarted.current = true;
          createFlingDismissAnimation(flingTranslateX, translateValue).start();
        }
      }
    })
    .onEnd(() => {
      if (animationStarted.current) {
        onViewModeChange("list");
      }
    })
    .onFinalize(() => {
      resetFlingAnimation();
    });

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
          <Animated.View
            style={[
              styles.gestureContainer,
              {
                opacity: flingOpacity,
                transform: [
                  { scale: flingScale },
                  { translateX: flingTranslateX },
                ],
              },
            ]}
          >
            {viewMode === "list" ? (
              <Extensions
                extensions={diagnostics.extensions}
                onLinkClick={onLinkClick}
              />
            ) : (
              <GestureDetector gesture={flingGesture}>
                {extension && <Extension {...extension} />}
              </GestureDetector>
            )}
          </Animated.View>
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
  gestureContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 10,
  },
});

export default TabPanels;
