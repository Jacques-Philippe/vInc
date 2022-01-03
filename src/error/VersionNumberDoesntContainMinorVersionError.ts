/**
 * An error class for when the version number doesn't contain a minor release number, which is the second number in the sequence.
 * For instance, in v1.2.3, 2 is the minor release number
 */
export class VersionNumberDoesntContainMinorVersionError extends Error {
  constructor(version_number: string) {
    super(
      `Provided version number ${version_number} is missing a minor release version`
    );
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
