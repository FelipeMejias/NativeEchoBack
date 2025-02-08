import { readFile } from 'fs/promises';

// Transform json into Objtect (or List)
export async function jsonToObject(name) {
    try{
      console.log(name)
      const jsonFile = await readFile(new URL(`../../jsons/${name}.json`, import.meta.url), 'utf-8');
      const object = JSON.parse(jsonFile)
      return object
    }catch(e){
      console.log('erro no jsonToObject')
      console.log(e)
      throw {code:422,message:"Can't get this json file"}
    }
}


