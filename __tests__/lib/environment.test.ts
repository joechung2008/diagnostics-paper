import {
  Environment,
  type EnvironmentType,
  getEnvironmentName,
} from "../../lib/environment";

describe("getEnvironmentName", () => {
  it("returns 'Public Cloud' for Environment.Public", () => {
    expect(getEnvironmentName(Environment.Public)).toBe("Public Cloud");
  });

  it("returns 'Fairfax' for Environment.Fairfax", () => {
    expect(getEnvironmentName(Environment.Fairfax)).toBe("Fairfax");
  });

  it("returns 'Mooncake' for Environment.Mooncake", () => {
    expect(getEnvironmentName(Environment.Mooncake)).toBe("Mooncake");
  });

  it("returns 'Select environment' for undefined", () => {
    expect(getEnvironmentName(undefined)).toBe("Select environment");
  });

  it("returns 'Select environment' for unknown environment", () => {
    expect(getEnvironmentName("unknown" as EnvironmentType)).toBe(
      "Select environment"
    );
  });
});
