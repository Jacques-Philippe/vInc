import { CommandLineInput } from "./io";

const toVersionNumber = (major: string, minor: string, patch: string): string =>
  `${major}.${minor}.${patch}`;

const increment = (original_value: string): string =>
  `${parseInt(original_value) + 1}`;

/**
 *
 * @param version_number the version number before it is incremented (in trimmed form, without the leading v. For instance 1.2.3 is a valid argument, but v1.2.3 is not)
 * @returns the incremented version number
 * @throws error on incorrect input received
 */
export const incrementVersionNumber = (
  input: CommandLineInput,
  version_number: string
): string => {
  const [major, minor, patch] = version_number.split(".");

  switch (input) {
    case CommandLineInput.MAJOR: {
      return "v".concat(
        toVersionNumber(increment(major.replace("v", "")), minor, patch)
      );
    }
    case CommandLineInput.MINOR: {
      return toVersionNumber(major, increment(minor), patch);
    }
    case CommandLineInput.PATCH: {
      return toVersionNumber(major, minor, increment(patch));
    }
    default: {
      throw new Error(
        `Expected command line input major, minor, or patch. Instead received ${input}`
      );
    }
  }
};
