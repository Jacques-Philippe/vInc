import { CommandLineInput, ExitProgram, GetCommandLineInput, getVersionNumber } from "./io";

(async () => {
    //Gather input to know what to increment
    const input = await GetCommandLineInput();
    console.log(`Chose ${input}`);
    if (input === CommandLineInput.CANCEL) ExitProgram();
    
    
    return;
    //Read file and return version number
    console.log('Read file and return version number');
    const version_number = await getVersionNumber("data/Consumer.csproj");
    
    //Increment the number
    console.log('Increment version number');

    //Write the incremented version to file
    console.log('Write version number to file');
})()