
import { VersionNumberDoesntContainMajorVersionError } from './error/VersionNumberDoesntContainMajorVersionError';
import { VersionNumberDoesntContainMinorVersionError } from './error/VersionNumberDoesntContainMinorVersionError';
import { VersionNumberDoesntContainPatchVersionError } from './error/VersionNumberDoesntContainPatchVersionError';
import { VersionNumberDoesntStartWithVError } from './error/VersionNumberDoesntStartWithVError';
import { VersionNumberIsNotThreeElementsError } from './error/VersionNumberIsNotThreeElementsError';
import { VersionNumberIsntOnlyNumbersError } from './error/VersionNumberIsntOnlyNumbersError';

export const versionNumberBeginsWithV = (version_number: string): void => {
    if (!version_number.startsWith('v')) throw new VersionNumberDoesntStartWithVError(version_number);
}
/**
 * Ensure the version number is made up of three non-empty elements, each separated by a period.
 * @param version_number the version number being evaluated
 * @throws VersionNumberIsNotThreeElementsError
 * @throws VersionNumberDoesntContainMajorVersionError
 * @throws VersionNumberDoesntContainMinorVersionError
 * @throws VersionNumberDoesntContainPatchVersionError
 */
export const versionNumberMadeUpOfThreeElementsSeparatedByPeriods = (version_number: string): void => {
    const elements: string[] = version_number.split('.');
    if (elements.length !== 3) throw new VersionNumberIsNotThreeElementsError(version_number);
    
    enum VersionNumbers { MAJOR = 0, MINOR, PATCH };

    // console.log(`version number: ${version_number}\nelements: ${elements}`);
    
    for (let index = 0; index < elements.length; index++) {
        const number_string = elements[index];
        // const length = elements[index].length;
        // console.log(`${item} has length ${length}`);

        const itemIsEmpty = number_string.length < 1;
        
        switch (index) {
            case VersionNumbers.MAJOR: {
                if (itemIsEmpty) throw new VersionNumberDoesntContainMajorVersionError(version_number)
                break;
            }
            case VersionNumbers.MINOR: {
                if (itemIsEmpty) throw new VersionNumberDoesntContainMinorVersionError(version_number)
                break;
            }
            default: {
                if (itemIsEmpty) throw new VersionNumberDoesntContainPatchVersionError(version_number)
                break;
            }
        }
        number_string.split('').forEach(char => {
            if (!charIsADigit(char)) throw new VersionNumberIsntOnlyNumbersError(version_number);
        });
        
    }
}

const charIsADigit = (char: string): boolean => {
    if (char.length !== 1) throw Error(`Received ${char} expected string argument of length 1`);
    const ordinal_val = char.charCodeAt(0);
    return "0".charCodeAt(0) <= ordinal_val && ordinal_val <= "9".charCodeAt(0);
}