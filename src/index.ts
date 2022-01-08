import { INPUT_FILENAME } from "./constants";
import { incrementVersionNumber } from "./increment-version-number";
import {
  CommandLineInput,
  ExitProgram,
  GetCommandLineInput,
  getVersionNumber,
} from "./io";
import { writeNewVersionToFile } from "./write-new-version-to-file";
(async () => {
  //Gather input to know what to increment
  const input = await GetCommandLineInput();
  // console.log(`Chose ${input}`)
  if (input === CommandLineInput.CANCEL) ExitProgram();

  //Read file and return version number
  const old_version_number = await getVersionNumber(INPUT_FILENAME);

  const new_version_number = incrementVersionNumber(input, old_version_number);

  //Increment the number
  console.log(`${old_version_number} -> ${new_version_number}`);

  await writeNewVersionToFile(new_version_number, INPUT_FILENAME);
  console.log(`Version number written to file ${INPUT_FILENAME}`);
})();
