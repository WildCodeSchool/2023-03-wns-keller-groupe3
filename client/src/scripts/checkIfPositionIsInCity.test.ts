import checkIfPositionIsInCity from "./checkIfPositionIsInCity";

describe("checkIfPositionIsInCity", () => {
  it("should be false", () => {
    const result = checkIfPositionIsInCity(50, 39, 52, 39.02);
    expect(result).toBe(false);
  });

  it("should be true", () => {
    const result = checkIfPositionIsInCity(50, 39, 49.96, 39.02);
    expect(result).toBe(true);
  });
});
