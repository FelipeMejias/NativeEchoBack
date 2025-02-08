export async function validateLink(req,res,next){
    const {ytId}=req.params
    try{
        //search for what are the rules of youtube videoId
        next()
    }catch(e){
        console.log(e)
        throw {code:422 ,message:''}
    }
}