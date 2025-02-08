import { readdir } from 'fs/promises';
import { join } from 'path';

export async function validateEchoId(req,res,next){
    const {language,id}=req.params
    try{
        const jsonFileName=`${language}-${id}.json`
        const dirPath = join(process.cwd(), 'jsons');
        const files = await readdir(dirPath);
        if(!files.includes(jsonFileName))throw {code:404 ,message:"This id don't exist"}
        next()
    }catch(e){
        console.log('erro no validateEchoId')
        console.log(e)
        
        throw {code:404 ,message:""}
    }
   
}


