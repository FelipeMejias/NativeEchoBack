export async function handleError(error,req,res,next) {
    const {message,code}=error

    if(message){
        console.log(message)
    }else{
        console.log(error)
    }

    if(code){
        if(message){
            res.status(code).send({message})
        }else{
            res.sendStatus(code)
        }
    }else{
        res.sendStatus(500)
    }
}
/*
404 - not found
422 - bad request
401 - unauthorized
405 - unavaileble

*/