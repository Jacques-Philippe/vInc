/**
 * An error class for when the version number doesn't begin with a v.
 * For instance, a valid version number could be v1.0.0
 */
export class VersionNumberDoesntStartWithVError extends Error {
  constructor(version_number: string) {
    super(
      `Provided version number ${version_number} must begin with a lowercase v`
    );
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
