export async function validateLanguage(req,res,next){
    const {language}=req.params
    const languages=['ar','br','pt','jp','mx','en']
    try{
        if(!languages.includes(language))throw {code:422 ,message:"This language don't exist"}
        next()
    }catch(e){
        console.log(e)
        throw {code:422,message:''}
    }
}