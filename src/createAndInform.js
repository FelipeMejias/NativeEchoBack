import { getCaptions } from "./services/getCaptions.js";
import { getVideoDetails } from "./services/getVideoDetails.js";
import { jsonAlreadyExists } from "./services/jsonAlreadyExists.js";
import { jsonToObject } from "./services/jsonToObject.js";
import { saveJson } from "./services/saveJson.js";

const s=1000 //1 segundo em ms
const messages={
    checking:{step:1,message:"Checking if this Echo already exists..."},
    // json exists, directing...
    doneChecking:{step:2,message:"This Echo already exists!"},
    directiongB:{step:3,message:"Directing to the Echo..."},
    // json doesn't exists, creating and directing...
    embeding:{step:2,message:"Embeding the video..."},
    doneEmbeding:{step:3,message:"Video embeded!"},
    gettingCaptions:{step:4,message:"Generating and translating captions..."},
    doneCaptions:{step:5,message:"Captions generated and translated!"},
    saving:{step:6,message:"Building you Echo..."},
    directingA:{step:7,message:"Directing to your New Echo..." },
    // errors
    errorChecking:{step:0,error:"checking the existance of echo"},

    errorTracking:{step:0,error:"getting existing echo infos"},
    
    errorEmbeding:{step:0,error:"getting video details"},
    errorCapting:{step:0,error:"getting captions"},
    errorSaving:{step:0,error:"saving new echo"},
    
}
function buffer(object){
    try{
         console.log(object.message)
    return JSON.stringify(object)+"\n"
    }catch(e){
        console.log(e)
        throw{code:400,message:'error to buffer'}
    }
   
}
function buildJson(video_id,details,captions){
    //const {title,description,caption_status,embed_html}=details
    try{
        const response={
            video_details:{...details,video_id},
            captions
        }
        return response
    }catch(e){
        console.log(e)
        throw{code:400,message:'error to build json file'}
    }
}

export async function createAndInform (req, res, next) {
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Transfer-Encoding", "chunked")
    const {language,ytId}=req.params
    try{
        const fileName=`${language}-${ytId}`
res.write(buffer(messages.checking));
        const alreadyExists=await jsonAlreadyExists(fileName)
        if(alreadyExists===true){
            const {video_details}=await jsonToObject(fileName)
            if(!video_details){
                res.write(buffer(messages.errorTracking))
                throw{code:400,message:'Error creating your Echo'}
            }
            const {title,thumbnails}=video_details
            const imageUrl=thumbnails?.default?.url
res.write(buffer({...messages.doneChecking, 
title:title,imageUrl
})) 
setTimeout(() => {res.write(buffer({...messages.directiongB,ytId})) ;throw{code:400,message:'Error creating your Echo'} }, 0.5*s )

        }else if(alreadyExists===false){
res.write(buffer(messages.embeding));

            const details = await getVideoDetails(ytId);
            if(!details){
                res.write(buffer(messages.errorEmbeding))
                throw{code:400,message:'Error creating your Echo'}
            }

res.write(buffer({...messages.doneEmbeding,
title:details.title,imageUrl:details?.thumbnails?.default?.url
})) 
setTimeout(() => {res.write(buffer(messages.gettingCaptions)) }, 0.5*s )

            const captions = await getCaptions(ytId,language)
            if(!captions){
                res.write(buffer(messages.errorCapting))
                throw{code:400,message:'Error creating your Echo'}
            }

res.write(buffer(messages.doneCaptions))
setTimeout(() => {res.write(buffer(messages.saving)) }, 0.5*s )

            const saved=await saveJson(`${language}-${ytId}.json`,buildJson(ytId,details,captions))
            if(saved!==true){
                res.write(buffer(messages.errorSaving))
                throw{code:400,message:'Error creating your Echo'}
            }

res.write(buffer({...messages.directingA,ytId})); 
res.end() 
        }else{
            res.write(buffer(messages.errorChecking))
            throw{code:400,message:'Error creating your Echo'}
        }
    }catch(error){
        res.end() 
        next({...error,message:"Error creating your Echo",code:400})
    }
}
