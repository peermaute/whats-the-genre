export default async function handler(req, res) {
  try {
    const { artistId } = req.query;
    const url = `https://api.spotify.com/v1/artists/${artistId}`;
    const token = await getAccessToken();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

const getAccessToken = async () => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${process.env.WHATS_THE_GENRE_SPOTIFY_CLIENT_ID}&client_secret=${process.env.WHATS_THE_GENRE_SPOTIFY_CLIENT_SECRET}`,
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get access token");
  }
};
