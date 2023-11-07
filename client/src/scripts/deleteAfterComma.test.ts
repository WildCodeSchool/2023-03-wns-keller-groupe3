import { deleteAfterComma } from "./deleteAfterComma";

describe("deleteAfterComma", () => {
  it("should delete all the world after comma", () => {
    const result = deleteAfterComma("Lille, France");
    expect(result).toBe("Lille");
  });

  it("should not change the word if there isn't a comma", () => {
    const result = deleteAfterComma("Paris");
    expect(result).toBe("Paris");
  });
});
