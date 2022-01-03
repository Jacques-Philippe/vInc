import { CommandLineInput } from "./io";
import { incrementVersionNumber } from "./increment-version-number";

describe("Increment version number tests", () => {
  test("Choosing patch should increment the patch release number", () => {
    const original = "1.0.0";
    expect(incrementVersionNumber(CommandLineInput.PATCH, original)).toBe(
      "1.0.1"
    );
  });

  test("Choosing minor should increment the minor release number", () => {
    const original = "1.0.0";
    expect(incrementVersionNumber(CommandLineInput.MINOR, original)).toBe(
      "1.1.0"
    );
  });

  test("Choosing major should increment the major release number", () => {
    const original = "1.0.0";
    expect(incrementVersionNumber(CommandLineInput.MAJOR, original)).toBe(
      "2.0.0"
    );
  });
});
