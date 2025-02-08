import { google } from 'googleapis'
import { apiKey } from '../../index.js';

//Retrieve video details from YouTube Data API
export async function getVideoDetails(videoId) {
    try{
        const youtube = google.youtube({
            version: 'v3',
            auth: apiKey
        });
        const response = await youtube.videos.list({
            part: 'snippet,contentDetails,player,status',
            id: videoId
        });
        if (!response.data.items || response.data.items.length === 0) {throw new Error(`No video found with ID: ${videoId}`);}
        if (!response.data.items || response.data.items.length === 0) {throw new Error(`No video found with ID: ${videoId}`);}
        const item = response.data.items[0];
        console.log("Retrieved video snippet:")//, item.snippet);
        return {
            video_id: videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            caption_status: item.contentDetails.caption,
            embed_html: item.player.embedHtml
        };
    }catch(e){
        console.log(e)
        throw new Error(`Error to get video details`);
    }
    
    
    
}