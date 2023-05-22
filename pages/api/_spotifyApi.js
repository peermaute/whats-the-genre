export async function search(query, type) {
  try{
    const url = `/api/search?query=${query}&type=${type}`;
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Search failed');
  }
}

export async function getArtist(artistId) {
  try{
    const url = `/api/artist?artistId=${artistId}`;
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get artist');
  }
}

export async function getGenreOfArtist(artistId){
  try{
    const artist = await getArtist(artistId);
    return artist.genres[0];
  } catch(error){
    console.error(error);
    throw new Error('Failed to get genre of artist');
  }
}
