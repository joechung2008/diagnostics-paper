import { Animated, Easing } from "react-native";

// Animation configurations for fling feedback
export const createFlingResetAnimation = (
  opacity: Animated.Value,
  scale: Animated.Value,
  translateX: Animated.Value
) =>
  Animated.parallel([
    Animated.timing(opacity, {
      duration: 200,
      easing: Easing.out(Easing.quad),
      toValue: 1,
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      duration: 200,
      easing: Easing.out(Easing.quad),
      toValue: 1,
      useNativeDriver: true,
    }),
    Animated.timing(translateX, {
      duration: 200,
      easing: Easing.out(Easing.quad),
      toValue: 0,
      useNativeDriver: true,
    }),
  ]);

export const createFlingStartAnimation = (
  opacity: Animated.Value,
  scale: Animated.Value
) =>
  Animated.parallel([
    Animated.timing(opacity, {
      toValue: 0.7,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      toValue: 0.95,
      duration: 150,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }),
  ]);

export const createFlingDismissAnimation = (
  translateX: Animated.Value,
  targetValue: number
) =>
  Animated.timing(translateX, {
    toValue: targetValue,
    duration: 150,
    easing: Easing.out(Easing.quad),
    useNativeDriver: true,
  });
