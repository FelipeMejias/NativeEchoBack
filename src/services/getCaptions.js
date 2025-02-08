import { getSubtitles } from 'youtube-captions-scraper'

//Retrieve captions using youtube-captions-scraper
export async function getCaptions(videoId, lang = 'en') {
    try {
        const captions = await getSubtitles({
            videoID: videoId,lang: lang
        });
        console.log(`Fetched ${captions.length} captions for video ${videoId}`);
        return captions;
    }catch (e) {
        console.log(e)
        throw new Error(`Error getting the captions`);
    }
}