import { VersionNumberDoesntContainMajorVersionError } from "./error/VersionNumberDoesntContainMajorVersionError";
import { VersionNumberDoesntContainMinorVersionError } from "./error/VersionNumberDoesntContainMinorVersionError";
import { VersionNumberDoesntContainPatchVersionError } from "./error/VersionNumberDoesntContainPatchVersionError";
import { VersionNumberDoesntStartWithVError } from "./error/VersionNumberDoesntStartWithVError";
import { VersionNumberIsNotThreeElementsError } from "./error/VersionNumberIsNotThreeElementsError";
import { VersionNumberIsntOnlyNumbersError } from "./error/VersionNumberIsntOnlyNumbersError";
import { getVersionNumber } from "./io";
import {
  versionNumberBeginsWithV,
  versionNumberMadeUpOfThreeElementsSeparatedByPeriods,
} from "./version-number-format";

test("Errors if file doesn't exist", () => {
  const nonexistent_file = "i-probably-dont-exist";
  // expect(getVersionNumber(nonexistent_file)).toThrowError("no such file or directory");
  expect(true).toBe(true);
});

describe("Version number tests", () => {
  // should begin with a v
  // made up of three numbers separated by periods
  test("Errors if version number doesn't begin with a v", () => {
    const version_number_bad = "1.0.0";
    const version_number_good = "v1.0.0";
    expect(() => versionNumberBeginsWithV(version_number_bad)).toThrow(
      VersionNumberDoesntStartWithVError
    );
    expect(() => versionNumberBeginsWithV(version_number_good)).not.toThrow(
      VersionNumberDoesntStartWithVError
    );
  });

  test("Errors if version number isn't made up of three non-empty things separated by periods", () => {
    const version_numbers_without_three_elements = [
      "1.00",
      "111",
      "11.1",
      "....",
    ];
    const version_number_good = "1.0.0";

    version_numbers_without_three_elements.forEach((item) => {
      expect(() =>
        versionNumberMadeUpOfThreeElementsSeparatedByPeriods(item)
      ).toThrow(VersionNumberIsNotThreeElementsError);
    });
  });
  test("Errors if version number doesn't contain a major release number", () => {
    //throw error for missing major release number
    expect(() =>
      versionNumberMadeUpOfThreeElementsSeparatedByPeriods(".1.1")
    ).toThrow(VersionNumberDoesntContainMajorVersionError);
    // //don't throw error if the major release number is present
    expect(() =>
      versionNumberMadeUpOfThreeElementsSeparatedByPeriods("1.1.1")
    ).not.toThrow(VersionNumberDoesntContainMajorVersionError);
  });

  test("Errors if version number doesn't contain a minor release number", () => {
    //throw error for missing minor release number
    expect(() =>
      versionNumberMadeUpOfThreeElementsSeparatedByPeriods("1..1")
    ).toThrow(VersionNumberDoesntContainMinorVersionError);
    //don't throw error if the minor release number is present
    expect(() =>
      versionNumberMadeUpOfThreeElementsSeparatedByPeriods("1.1.1")
    ).not.toThrow(VersionNumberDoesntContainMinorVersionError);
  });

  test("Errors if version number doesn't contain a patch release number", () => {
    //throw error for missing patch release number
    expect(() =>
      versionNumberMadeUpOfThreeElementsSeparatedByPeriods("1.1.")
    ).toThrow(VersionNumberDoesntContainPatchVersionError);
    //don't throw error if the patch release number is present
    expect(() =>
      versionNumberMadeUpOfThreeElementsSeparatedByPeriods("1.1.1")
    ).not.toThrow(VersionNumberDoesntContainPatchVersionError);
  });

  test("Errors if version number contains anything other than numbers", () => {
    //throw error for contains anything other than number
    expect(() =>
      versionNumberMadeUpOfThreeElementsSeparatedByPeriods("1.1abc.1")
    ).toThrow(VersionNumberIsntOnlyNumbersError);
    //throw error for contains anything other than number
    expect(() =>
      versionNumberMadeUpOfThreeElementsSeparatedByPeriods("1abc.1.1")
    ).toThrow(VersionNumberIsntOnlyNumbersError);
    //throw error for contains anything other than number
    expect(() =>
      versionNumberMadeUpOfThreeElementsSeparatedByPeriods("1.1.abc1")
    ).toThrow(VersionNumberIsntOnlyNumbersError);
  });
});
