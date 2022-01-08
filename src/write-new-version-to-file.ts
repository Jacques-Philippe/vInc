import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { promises as fs } from "fs";
import { CsProjFile } from "./types";

export const writeNewVersionToFile = async (
  version_number: string,
  filename: string
): Promise<void> => {
  const parser = new XMLParser({ ignoreAttributes: false });
  const originalFileContents = await (await fs.readFile(filename)).toString();
  const parsed = parser.parse(originalFileContents) as CsProjFile;

  parsed.Project.PropertyGroup.Version = version_number;
  const builder = new XMLBuilder({ ignoreAttributes: false });
  const xml = builder.build(parsed);

  await fs.writeFile(filename, xml);
};
