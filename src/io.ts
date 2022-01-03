import { promises as fs } from 'fs';
import * as path from 'path';
import {XMLParser, XMLValidator} from 'fast-xml-parser';

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
    console.log(`cwd ${process.cwd()}`);
    
    //read file, 
    const result = await fs.readFile(path.join(process.cwd(), filename));
    //get data as string
    const data: string = result.toString();
    console.log(`Data:\n${data}`);


    if (!XMLValidator.validate(data)) console.error('Bad XML format');
    else console.log('Valid XML data');
    
    
    const parser = new XMLParser();
    
    //parse string to XML, cast data to Project
    const project = (new XMLParser().parse(data) as CsProjFile).Project;
    
    //return Version property
    console.log(`Object stringified\n${project.PropertyGroup.Version}`);
    
     
    return project.PropertyGroup.Version;
}
