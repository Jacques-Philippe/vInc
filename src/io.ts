import { promises as fs } from 'fs';
import * as path from 'path';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import prompts from 'prompts';

type PropertyGroup = {
    Version: string
};

type Project = {
    PropertyGroup: PropertyGroup
}

type CsProjFile = {
    Project: Project
};

export const getVersionNumber = async (filename: string): Promise<string> => {
    
    //read file, 
    const result = await fs.readFile(path.join(process.cwd(), filename));
    //get data as string
    const data: string = result.toString();
    console.log(`Data:\n${data}`);

    //TODO XMLFormatError?
    if (!XMLValidator.validate(data)) console.error('Bad XML format');
    else console.log('Valid XML data');
    
    
    const parser = new XMLParser();
    
    //parse string to XML, cast data to Project
    const project = (new XMLParser().parse(data) as CsProjFile).Project;
    
    //return Version property
    // console.log(`Object stringified\n${project.PropertyGroup.Version}`);
    
    return project.PropertyGroup.Version;
}

export enum CommandLineInput {
    MAJOR = 0, MINOR, PATCH, CANCEL
}

export const ExitProgram = () => {
    console.log('Exiting...');
        
    process.exit();
}

const CommandLineInputToString = (input: CommandLineInput): string => `${input}`;

const StringToCommandLineInput = (input: string): CommandLineInput => {
    if (input === undefined) ExitProgram();

    if (input.length !== 1) throw new Error(`Expected string of length 1. Instead received ${input}`);
    const num_char = parseInt(input);
    const enum_length = Object.keys(CommandLineInput).length / 2;
    if (num_char < 0 || enum_length - 1 < num_char) throw new Error(`Expected number between 0 and 2 (inclusive). Instead received ${input}`);
    return num_char;
};

const HEADER =
    "   =====   VERSION INCREMENTOR   =====   \n";

  
export const GetCommandLineInput = async (): Promise<CommandLineInput> => {
    const choices: prompts.Choice[] = [
        {title: 'major', value: CommandLineInputToString(CommandLineInput.MAJOR)},
        {title: 'minor', value: CommandLineInputToString(CommandLineInput.MINOR)},
        { title: 'patch', value: CommandLineInputToString(CommandLineInput.PATCH) },
        {title: 'cancel', value: CommandLineInputToString(CommandLineInput.CANCEL)}
    ]

    const { choice } = await prompts({ type: 'autocomplete', name: 'choice', message: 'Choose an option', choices });
    
    return StringToCommandLineInput(choice);
}