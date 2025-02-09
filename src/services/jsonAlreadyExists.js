import { readdir } from 'fs/promises';
import { join } from 'path';

export async function jsonAlreadyExists(fileName){
    try{
        const dirPath = join(process.cwd(), 'jsons');
        const files = await readdir(dirPath);
        if(files.includes(`${fileName}.json`)){
            return true
        }else{
            return false
        }
    }catch(e){
        const message="Error while trying to check if json already exists"
        console.log(message,e)
        return {code:400 ,message}
    }
   
}
