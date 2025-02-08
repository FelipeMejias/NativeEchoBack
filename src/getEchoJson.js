import { jsonToObject } from "./services/jsonToObject.js"

export async function getEchoJson (req, res) {
    const {id,language}=req.params
    //const id=findTheIdFromLink(input)
    try{
        const jsonName=`${language}-${id}`
        const finalJson=await jsonToObject(jsonName)
        const {video_details,captions}=finalJson
        const response={embeded:video_details.video_id,captions}
        res.status(200).send(response)
    }catch(e){
        console.log(e)
        throw new Error(`Error getting Echo json`);
    }
}
