/**
 * An error class for when the version number doesn't contain a minor release number, which is the first number in the sequence.
 * For instance, in v1.2.3, 1 is the major release number
 */
export class VersionNumberDoesntContainMajorVersionError extends Error {
    constructor(version_number: string) {
        super(`Provided version number ${version_number} is missing a major release version`);
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}