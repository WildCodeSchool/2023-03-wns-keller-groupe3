import SecureInput, {
  SecureEmail,
  SecurePassword,
} from "../security/SecureInput";

describe("checkUserInput", () => {
  describe("when input contains forbidden characters", () => {
    it("should throw an error", () => {
      expect(() =>
        SecureInput(`      odjfv>iojg"çà)éè{("_çà(è_ç"à&<(     `)
      ).toThrow(
        `The input "      odjfv>iojg"çà)éè{("_çà(è_ç"à&<(     " contains forbidden characters`
      );
    });
  });

  describe("when input contains whitespace at the start or the end of the string", () => {
    it("should return trimed input", () => {
      const result = SecureInput(`      Hello     `);
      expect(result).toBe("Hello");
    });
  });

  describe("when input is correct", () => {
    it("should return input", () => {
      const result = SecureInput(`Hello`);
      expect(result).toBe("Hello");
    });
  });
});

describe("checkEmailInput", () => {
  describe("when email format is not correct", () => {
    it("should throw an error", () => {
      expect(() => SecureEmail(`od {jf<v>.com         `)).toThrow(
        `Bad email format`
      );
    });
  });

  describe("when input contains whitespace at the start or the end of the string", () => {
    it("should throw an error", () => {
      expect(() => SecureEmail(`      test@test.com     `)).toThrow(
        `Bad email format`
      );
    });
  });

  describe("when email is in correct format", () => {
    it("should return email", () => {
      const result = SecureEmail(`test@test.com`);
      expect(result).toBe("test@test.com");
    });
  });
});

describe("checkPasswordInput", () => {
  describe("when password contains whitespaces", () => {
    it("should throw an error", () => {
      expect(() => SecurePassword(`od  {jf<v153H48`)).toThrow(
        `Bad password format`
      );
    });
  });

  describe("when password length is under 8 characters", () => {
    it("should throw an error", () => {
      expect(() => SecurePassword(`Azer12`)).toThrow(`Bad password format`);
    });
  });

  describe("when password does not contain any number", () => {
    it("should throw an error", () => {
      expect(() => SecurePassword(`AzerjkdFKfnjd`)).toThrow(
        `Bad password format`
      );
    });
  });

  describe("when password does not contain any capitalized letter", () => {
    it("should throw an error", () => {
      expect(() => SecurePassword(`azerty1234`)).toThrow(`Bad password format`);
    });
  });

  describe("when password is in correct format", () => {
    it("should return password", () => {
      const result = SecurePassword(`Azerty1234`);
      expect(result).toBe("Azerty1234");
    });
  });
});
