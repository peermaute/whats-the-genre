export default search = async (query, type) => {
    const url = `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=5`;
    const response = await fetch(url, {
        headers: {
        Authorization: `Bearer ${getAccessToken()}`
        }
    });
    const data = await response.json();
    return data;
}

const getAccessToken = async () => {
    const url = 'https://accounts.spotify.com/api/token';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        Authorization: `Basic ${process.env.WHATS_THE_GENRE_SPOTIFY_CLIENT_ID}:${process.env.WHATS_THE_GENRE_SPOTIFY_CLIENT_SECRET}`
        },
        body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
}

