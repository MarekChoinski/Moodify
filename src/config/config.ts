export default {
    authEndpoint: 'https://accounts.spotify.com/authorize',
    clientId: "056a2f6da4284c55980882095f831b4d",
    redirectUri: process.env.NODE_ENV !== "production" ? "http://localhost:3000/": "https://moodify.marekchoinski.com/",
    scopes: [
        "user-library-read",
        "user-modify-playback-state",
    ],
};

export const maxSongs: number = 10000;