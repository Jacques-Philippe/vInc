/**
 * An error class for when the version number doesn't begin with a v.
 * For instance, a valid version number could be v1.0.0
 */
export class VersionNumberIsNotThreeElementsError extends Error {
  constructor(version_number: string) {
    super(
      `Provided version number ${version_number} should be made up of a major version number, a minor version number, and a patch number`
    );
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
