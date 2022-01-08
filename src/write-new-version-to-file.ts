import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { promises as fs } from "fs";
import { INPUT_FILENAME } from "./constants";
import { CsProjFile } from "./types";

export const writeNewVersionToFile = async (
  version_number: string,
  filename: string
): Promise<void> => {
  const parser = new XMLParser({ ignoreAttributes: false });
  const originalFileContents = await (await fs.readFile(filename)).toString();
  const parsed = parser.parse(originalFileContents) as CsProjFile;
  //   console.log('Old project')
  //   console.log(project)
  parsed.Project.PropertyGroup.Version = version_number;
  const builder = new XMLBuilder({ ignoreAttributes: false });
  const xml = builder.build(parsed);
  console.log("Writing the following to file: ", xml);

  await fs.writeFile(filename, xml);
};
