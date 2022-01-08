import { writeNewVersionToFile } from "./write-new-version-to-file";
import { promises as fs } from "fs";
import { Module } from "module";
import { INPUT_FILENAME } from "./constants";
import exp from "constants";
import path from "path";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import * as _ from "lodash";

const TMP_DIRNAME = `${Date.now()}`;
const TMP_INPUT_FILENAME = `${TMP_DIRNAME}/input.xml`;

const XML = (
  version_number: string
): string => `<Project Sdk="Microsoft.NET.Sdk">
  
<ItemGroup>
  <ProjectReference Include="..\\Calculator\\Calculator.csproj" />
</ItemGroup>

<PropertyGroup>
  <PackageId>Test-CalculatorApp</PackageId>
  <Version>${version_number}</Version>
  <Authors>Jacques-Philippe Amiot</Authors>
  <Company>Not A Company Inc.</Company>
  <OutputType>Exe</OutputType>
  <TargetFramework>net5.0</TargetFramework>
</PropertyGroup>

</Project>`;

describe("Tests to verify that the new version is properly written to the file", () => {
  //Create tmp test file

  beforeAll(async () => {
    await fs.mkdir(TMP_DIRNAME);
  });

  beforeEach(async () => {
    await fs.writeFile(TMP_INPUT_FILENAME, XML("v1.2.3"));
  });

  afterAll(() => {
    fs.rm(TMP_DIRNAME, { recursive: true });
  });

  test("The new version should be added to the file", async () => {
    //given some new version number
    const new_version_number = `v3.2.1`;
    await writeNewVersionToFile(new_version_number, TMP_INPUT_FILENAME);
    const newFileContents = await (
      await fs.readFile(TMP_INPUT_FILENAME)
    ).toString();

    const fileContentsContainVersionNumberString = (): boolean => {
      return newFileContents.includes(
        `<Version>${new_version_number}</Version>`
      );
    };
    expect(fileContentsContainVersionNumberString()).toBe(true);
  });
  test("Other file content shouldn't be modified", async () => {
    // First ensure the new version number does indeed appear in the file
    const newVersionNumber = `v3.2.1`;
    const oldFileContents = await (
      await fs.readFile(TMP_INPUT_FILENAME)
    ).toString();
    await writeNewVersionToFile(newVersionNumber, TMP_INPUT_FILENAME);
    const newFileContents = await (
      await fs.readFile(TMP_INPUT_FILENAME)
    ).toString();

    const fileContentsContainVersionNumberString = (): boolean => {
      return newFileContents.includes(`<Version>${newVersionNumber}</Version>`);
    };
    expect(fileContentsContainVersionNumberString()).toBe(true);

    //Now given we remove the version number from both old and new file contents
    //we should expect the objects resulting from parsing the file XMLs to be identical
    const versionNumberSearchString = /<Version>.*<\/Version>/;
    /**
     * @param oldFileContents the string file contents before modifying the version number
     * @param newFileContents the string file contents after modifying the version number
     * @returns true for file XML objects identical without version number
     */
    const withoutVersionNumberOldFileContentsAreEqualToNewFileContents = (
      oldFileContents: string,
      newFileContents: string
    ): boolean => {
      const parser = new XMLParser({ ignoreAttributes: false });
      const oldObj = parser.parse(oldFileContents);
      const newObj = parser.parse(newFileContents);

      return _.isEqual(oldObj, newObj);
    };

    //helper function to remove the version number from the string content of the file
    const removeVersionNumber = (fileContents: string): string =>
      fileContents.replace(versionNumberSearchString, "");

    expect(
      withoutVersionNumberOldFileContentsAreEqualToNewFileContents(
        removeVersionNumber(oldFileContents),
        removeVersionNumber(newFileContents)
      )
    ).toBe(true);
  });
});
