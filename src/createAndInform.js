import { getCaptions } from "./services/getCaptions.js";
import { getVideoDetails } from "./services/getVideoDetails.js";
import { saveJson } from "./services/saveJson.js";

const s=1000 //1 segundo em ms

const passo1={step:1,message:"Embeding the video..."}
const passo2={step:2,message:"Video embeded!"}
const passo3={step:3,message:"Generating and translating captions..."}
const passo4={step:4,message:"Captions generated and translated!"}
const passo5={step:5,message:"Building you Echo..."}
const passo6={step:6,message:"Directioning to your new Echo..." }
const passo0={step:0,message:"Error" }

function buffer(object){
    console.log(object.message)
    return JSON.stringify(object)+"\n"
}
function buildJson(video_id,details,captions){
    //const {title,description,caption_status,embed_html}=details
    const response={
        video_details:{...details,video_id},
        captions
    }
    return response
}

export async function createAndInform (req, res) {
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Transfer-Encoding", "chunked")
    const {language,ytId}=req.params
    //const id=findTheIdFromLink(input)
    try{
        res.write(buffer(passo1));

        const details = await getVideoDetails(ytId);
        
        res.write(buffer({...passo2,title:details.title , imageUrl:'none'})) 
        setTimeout(() => {res.write(buffer(passo3)) }, 0.5*s )

        const captions = await getCaptions(ytId,language)

        res.write(buffer(passo4))
        setTimeout(() => {res.write(buffer(passo5)) }, 0.5*s )
        
        await saveJson(`${language}-${ytId}.json`,buildJson(ytId,details,captions))
        res.write(buffer({...passo6,id:ytId})); 
        res.end() 
        //const imageUrl=thumbnails.medium.url
    }catch(e){
        console.log(e)
        res.write(buffer(passo0))
        res.end() 
        throw new Error(`Error generating video`);
    }
}