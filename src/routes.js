import Router from 'express'
import { validateLanguage } from './middlewares/validateLanguage.js'
import { validateLink } from './middlewares/validateLink.js'
import { validateEchoId } from './middlewares/validateEchoId.js'
import { createAndInform } from './createAndInform.js'
import { getEchoJson } from './getEchoJson.js'

export const router=Router()

router.get("/",async (req,res)=>{
    res.sendStatus(200)
})

router.get("/video/:language/:ytId",
    validateLanguage,
    validateLink,
    createAndInform
)

router.get("/videos/:id/:language",
    validateLanguage,
    validateEchoId,
    getEchoJson)

//router.get("/videos/:id/:language", validateEchoId,validateEchoTransl, processYoutube)






/*
/const novo=crypto.randomBytes(6).toString('hex')
//const delay = (ms) => new Promise(resolve => setTigmeout(resolve, ms))

app.get("/video/:language/:input",async (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Transfer-Encoding", "chunked")
    const {language,input}=req.params
    const id=findTheIdFromLink(input)
    try{
        const name=originals[id]
        const original=await objectFromJsonFile(name)
        const {video_details,captions}=original
        const {video_id,title,description,thumbnails,embed_html}=video_details
        const imageUrl=thumbnails.medium.url
        res.write(JSON.stringify({ step: 1, message: "Embeding the video..." }) + "\n");
        setTimeout(() => {
            res.write(JSON.stringify({ step: 2, title , imageUrl, message: "Video embeded!" }) + "\n") 
        }, 4*s )
        setTimeout(() => {
            res.write(JSON.stringify({ step: 3, message: "Generating captions..." }) + "\n") 
        }, 4.5*s )
        setTimeout(() => {
            res.write(JSON.stringify({ step: 4, message: "Original captions generated!" }) + "\n") 
        }, 8*s )
        setTimeout(() => {
            res.write(JSON.stringify({ step: 5, message: "Translating captions..." }) + "\n") 
        }, 8.5*s )
        setTimeout(() => {
            res.write(JSON.stringify({ step: 6, message: "Captions translated!" }) + "\n") 
        }, 12*s )
        setTimeout(() => {
            res.write(JSON.stringify({ step: 7, id, message: "Directioning to your new Echo..." }) + "\n"); res.end() 
        }, 12.5*s )
    }catch(e){
        console.log(e)
        res.sendStatus(433)
    }
})
app.get("/videos/:id", async (req, res) => {
    const {id}=req.params
    const name=originals[id]

    if(!name)return res.status(444).send({error:"This id don't exist"})
    
    const translated=[]
    try{
        const original=await objectFromJsonFile(name)
        
        const {video_details,captions}=original
        const embeded=video_details.embed_html.split('src="//')[1].split('"')[0]
        const response={embeded,captions:id=='746dbb2e5e38'?objectFromJsonFile('translation10'):captions,translated}
        res.status(200).send(response)
    }catch(e){
        console.log(e)
        res.sendStatus(433)
    }
    
})



async (req, res) => {
    const {id}=req.params
    const name=originals[id]
    try{
        const original=await objectFromJsonFile(name)
        const {video_details,captions}=original
        const embeded=video_details.embed_html.split('src="//')[1].split('"')[0]
        const response={embeded,captions:id=='746dbb2e5e38'?objectFromJsonFile('translation10'):captions,translated}
        res.status(200).send(response)
    }catch(e){
        console.log(e)
        res.sendStatus(433)
    }
    
}

*/