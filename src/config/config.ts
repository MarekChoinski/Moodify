export default {
    authEndpoint: 'https://accounts.spotify.com/authorize',
    clientId: "056a2f6da4284c55980882095f831b4d",
    // redirectUri: "https://clever-sammet-231c42.netlify.app/",
    redirectUri: "http://localhost:3000/",
    scopes: [
        "user-library-read",
        "user-modify-playback-state",
    ],
};

export const maxSongs: number = 10000;