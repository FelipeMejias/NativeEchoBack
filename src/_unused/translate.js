import { gaiaAuth, gaiaUrl } from "../routes.js";

// - Builds a system message "Translate to {language}" plus the user prompt.
export async function translate(req, res){
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({error: "Missing 'messages' array in request body."});
    }//
    try {
        ;
        const response = await fetch(gaiaUrl, {
            method: "POST",
            headers: {
            accept: "application/json",
            Authorization: gaiaAuth, // from secrets.json
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ messages })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response from Gaia API (/test-translate):", errorText);
            return res.status(response.status).json({ error: errorText });
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error in /test-translate:", error);
        res.status(500).json({ error: error.message });
    }
}
   