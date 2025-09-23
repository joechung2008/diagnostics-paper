import type { ExtensionError, ExtensionInfo } from "../../lib/types";
import {
  byKey,
  fetchDiagnostics,
  isExtensionInfo,
  toNavLink,
  when,
} from "../../lib/utils";

describe("isExtensionInfo", () => {
  it("returns true for ExtensionInfo objects", () => {
    const extensionInfo: ExtensionInfo = {
      extensionName: "test",
      manageSdpEnabled: true,
    };
    expect(isExtensionInfo(extensionInfo)).toBe(true);
  });

  it("returns false for objects without extensionName", () => {
    const extensionError: ExtensionError = {
      lastError: {
        errorMessage: "Some error",
        time: "2023-01-01",
      },
    };
    expect(isExtensionInfo(extensionError)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isExtensionInfo(undefined)).toBe(false);
  });
});

describe("byKey", () => {
  it("returns negative when a.key < b.key", () => {
    const a = { key: "a", name: "a" };
    const b = { key: "b", name: "b" };
    expect(byKey(a, b)).toBeLessThan(0);
  });

  it("returns positive when a.key > b.key", () => {
    const a = { key: "b", name: "b" };
    const b = { key: "a", name: "a" };
    expect(byKey(a, b)).toBeGreaterThan(0);
  });

  it("returns 0 when keys are equal", () => {
    const a = { key: "same", name: "same" };
    const b = { key: "same", name: "same" };
    expect(byKey(a, b)).toBe(0);
  });
});

describe("toNavLink", () => {
  it("converts ExtensionInfo to KeyedNavLink", () => {
    const extensionInfo: ExtensionInfo = {
      extensionName: "test-extension",
      manageSdpEnabled: true,
    };

    const result = toNavLink(extensionInfo);

    expect(result).toEqual({
      key: "test-extension",
      name: "test-extension",
      url: "",
    });
  });
});

describe("when", () => {
  it("returns args when condition is true", () => {
    expect(when(true, "a", "b", "c")).toEqual(["a", "b", "c"]);
  });

  it("returns empty array when condition is false", () => {
    expect(when(false, "a", "b", "c")).toEqual([]);
  });
});

describe("fetchDiagnostics", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch;
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches diagnostics successfully", async () => {
    const mockData = { extensions: {} };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await fetchDiagnostics("https://example.com/api");

    expect(mockFetch).toHaveBeenCalledWith("https://example.com/api");
    expect(result).toEqual(mockData);
  });

  it("throws error when response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    } as Response);

    await expect(fetchDiagnostics("https://example.com/api")).rejects.toThrow(
      "Failed to fetch diagnostics: Not Found"
    );
  });
});
