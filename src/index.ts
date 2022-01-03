import { getVersionNumber } from './io';

(async () => {
    //Read file and return version number
    console.log('Read file and return version number');
    await getVersionNumber("data/Consumer.csproj");
    
    //Increment the number
    console.log('Increment version number');

    //Write the incremented version to file
    console.log('Write version number to file');
})()