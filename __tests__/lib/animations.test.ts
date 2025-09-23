import { Animated } from "react-native";
import {
  createFlingDismissAnimation,
  createFlingResetAnimation,
  createFlingStartAnimation,
} from "../../lib/animations";

// Mock React Native Animated
jest.mock("react-native", () => ({
  Animated: {
    parallel: jest.fn((animations) => ({ start: jest.fn(), animations })),
    timing: jest.fn((value, config) => ({ start: jest.fn(), value, config })),
    Value: jest.fn().mockImplementation((initialValue) => ({
      _value: initialValue,
      setValue: jest.fn(),
      interpolate: jest.fn(),
    })),
  },
  Easing: {
    out: jest.fn(() => "mocked-easing"),
    quad: "mocked-quad",
  },
}));

describe("createFlingResetAnimation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (Animated.parallel as jest.Mock).mockReturnValue({
      start: jest.fn(),
    });
  });

  it("creates parallel animation with correct timing configurations", () => {
    const mockOpacity = new Animated.Value(0.5);
    const mockScale = new Animated.Value(0.8);
    const mockTranslateX = new Animated.Value(50);

    createFlingResetAnimation(mockOpacity, mockScale, mockTranslateX);

    expect(Animated.parallel).toHaveBeenCalledWith([
      expect.objectContaining({
        start: expect.any(Function),
        config: expect.objectContaining({
          duration: 200,
          easing: "mocked-easing",
          toValue: 1,
          useNativeDriver: true,
        }),
      }),
      expect.objectContaining({
        start: expect.any(Function),
        config: expect.objectContaining({
          duration: 200,
          easing: "mocked-easing",
          toValue: 1,
          useNativeDriver: true,
        }),
      }),
      expect.objectContaining({
        start: expect.any(Function),
        config: expect.objectContaining({
          duration: 200,
          easing: "mocked-easing",
          toValue: 0,
          useNativeDriver: true,
        }),
      }),
    ]);
  });

  it("returns an Animated.parallel result", () => {
    const mockOpacity = new Animated.Value(0.5);
    const mockScale = new Animated.Value(0.8);
    const mockTranslateX = new Animated.Value(50);

    const result = createFlingResetAnimation(
      mockOpacity,
      mockScale,
      mockTranslateX
    );

    expect(result).toEqual({ start: expect.any(Function) });
  });
});

describe("createFlingStartAnimation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (Animated.parallel as jest.Mock).mockReturnValue({
      start: jest.fn(),
    });
  });

  it("creates parallel animation with correct timing configurations", () => {
    const mockOpacity = new Animated.Value(1);
    const mockScale = new Animated.Value(1);

    createFlingStartAnimation(mockOpacity, mockScale);

    expect(Animated.parallel).toHaveBeenCalledWith([
      expect.objectContaining({
        start: expect.any(Function),
        config: expect.objectContaining({
          toValue: 0.7,
          duration: 150,
          easing: "mocked-easing",
          useNativeDriver: true,
        }),
      }),
      expect.objectContaining({
        config: expect.objectContaining({
          toValue: 0.95,
          duration: 150,
          easing: "mocked-easing",
          useNativeDriver: true,
        }),
        start: expect.any(Function),
      }),
    ]);
  });

  it("returns an Animated.parallel result", () => {
    const mockOpacity = new Animated.Value(1);
    const mockScale = new Animated.Value(1);

    const result = createFlingStartAnimation(mockOpacity, mockScale);

    expect(result).toEqual({ start: expect.any(Function) });
  });
});

describe("createFlingDismissAnimation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (Animated.timing as jest.Mock).mockReturnValue({
      start: jest.fn(),
    });
  });

  it("creates timing animation with correct configuration", () => {
    const mockTranslateX = new Animated.Value(0);
    const targetValue = -200;

    createFlingDismissAnimation(mockTranslateX, targetValue);

    expect(Animated.timing).toHaveBeenCalledWith(mockTranslateX, {
      toValue: targetValue,
      duration: 150,
      easing: "mocked-easing",
      useNativeDriver: true,
    });
  });

  it("returns an Animated.timing result", () => {
    const mockTranslateX = new Animated.Value(0);

    const result = createFlingDismissAnimation(mockTranslateX, 100);

    expect(result).toEqual({ start: expect.any(Function) });
  });

  it("accepts different target values", () => {
    const mockTranslateX = new Animated.Value(0);

    createFlingDismissAnimation(mockTranslateX, 200);
    expect(Animated.timing).toHaveBeenCalledWith(mockTranslateX, {
      toValue: 200,
      duration: 150,
      easing: "mocked-easing",
      useNativeDriver: true,
    });

    jest.clearAllMocks();

    createFlingDismissAnimation(mockTranslateX, -150);
    expect(Animated.timing).toHaveBeenCalledWith(mockTranslateX, {
      toValue: -150,
      duration: 150,
      easing: "mocked-easing",
      useNativeDriver: true,
    });
  });
});
