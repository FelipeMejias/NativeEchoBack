import cors from 'cors'
import Express, {json} from 'express'
import {router} from './src/routes.js'
import { handleError } from './src/middlewares/handleError.js'
import dotenv from 'dotenv'
import "express-async-errors"
dotenv.config()


export const apiKey = process.env.YOUTUBE_API_KEY
if (!apiKey) {console.error("Error: YouTube API key not found in .env");}

export const gaiaAuth = process.env.GAIA_AUTH
if(!gaiaAuth)console.error("Error: Gaia auth key not found in .env")
    
export const gaiaUrl = "https://0x8171007ceb1848087523c8875743a6dc91cddfa4.gaia.domains/v1/chat/completions"

const app=Express()

app.use(cors())
app.use(json()) 
app.use(router)
app.use(handleError)

// Serve static files from the "public" folder
//app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 4000
app.listen( port , ()=>console.log(`Server running on port ${port}`) )



