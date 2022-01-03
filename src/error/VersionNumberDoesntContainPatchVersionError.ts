/**
 * An error class for when the version number doesn't contain a patch number, which is the third number in the sequence.
 * For instance, in v1.2.3, 3 is the patch number
 */
export class VersionNumberDoesntContainPatchVersionError extends Error {
    
    constructor(version_number: string) {
        super(`Provided version number ${version_number} is missing a patch version`);
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}