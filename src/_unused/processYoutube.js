import { getCaptions } from "../services/getCaptions.js";
import { getVideoDetails } from "../services/getVideoDetails.js";
import { getVideoId } from "../services/getVideId.js";

// - Extracts YouTube video details & Fetches captions
export async function processYoutube(req, res){
    const youtubeUrl = req.body.youtube_url;
    const language = req.body.language || 'en';
    try {
        console.log("Processing YouTube URL:", youtubeUrl);
        const videoId = getVideoId(youtubeUrl);
        const videoDetails = await getVideoDetails(videoId);
        const captions = await getCaptions(videoId, language);
        res.json({ videoDetails, captions });
    } catch (err) {
        console.error("Error processing video:", err);
        res.status(500).json({ error: err.message });
    }
}