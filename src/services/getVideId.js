//Extract YouTube video ID from URL
export function getVideoId(youtubeUrl) {
    if (youtubeUrl.includes("watch?v=")) {
      return youtubeUrl.split("watch?v=")[1].split("&")[0];
    } else if (youtubeUrl.includes("youtu.be/")) {
      return youtubeUrl.split("youtu.be/")[1].split("?")[0];
    } else {
      throw new Error("Invalid YouTube URL");
    }
}