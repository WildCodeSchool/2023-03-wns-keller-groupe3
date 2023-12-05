import checkIfPositionIsInCity from "./checkIfInCity";

describe("checkIfLatIsInCity", () => {
  it("should be false", () => {
    const result = checkIfPositionIsInCity(50, 52);
    expect(result).toBe(false);
  });

  it("should be true", () => {
    const result = checkIfPositionIsInCity(50, 50.02);
    expect(result).toBe(true);
  });
});
