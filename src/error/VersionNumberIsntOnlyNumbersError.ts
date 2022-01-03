/**
 * An error class for when the version number doesn't contain exclusively numbers.
 * For instance, in v1abc.2.3, abc is something other than a number
 */
export class VersionNumberIsntOnlyNumbersError extends Error {
  constructor(version_number: string) {
    super(
      `Provided version number ${version_number} contains something other than numbers`
    );
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
