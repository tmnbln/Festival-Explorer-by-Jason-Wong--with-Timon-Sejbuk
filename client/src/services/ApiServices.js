import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const apiService = {};

apiService.getArtist = (artistName, cb) => {
  spotifyApi.searchArtists(artistName).then((res) => {
    cb(res.artists.items[0])
  })
}

apiService.getArtistTracks = (artistId, cb) => {
    spotifyApi.getArtistTopTracks(artistId).then((res) => {
      cb(res.tracks);
    })
  }


apiService.getRelatedArtists = (artistId, cb) => {
    spotifyApi.getArtistRelatedArtists(artistId).then((res) => {
      cb(res.artists);
    })
  }

apiService.getTopArtists = async (arr, cb) => {
  await spotifyApi.getMyTopArtists({ 'limit': '50' })
    .then((res) => {
      let tempTopArtists = [];
      res.items.forEach(artist => tempTopArtists.push(artist.name));
      return tempTopArtists;
    })
    .then((tempTopArtists) => {
    spotifyApi.getMyTopArtists({ 'limit': '50', 'offset': '50' }).then((res) => {
      res.items.forEach(artist => tempTopArtists.push(artist.name));
      cb([...arr, tempTopArtists])
    })
  }) 
}

apiService.getUserId = async () => {
  return spotifyApi.getMe()
    .then((res) =>  res.id);
}

apiService.createPlaylist = (userId, festivalName, festivalDescription) => {
  return spotifyApi.createPlaylist(userId, { 'name': `${festivalName} 2024`, 'description': `${festivalDescription}` })
    .then((res) => res.id);
}


apiService.addTracksToPlaylist = (playlistId, playlistURIs) => {
  const batches = Math.ceil(playlistURIs.length / 100);
  const remainder = playlistURIs.length % 100;

  for (let i = 0; i < batches; i++) {
    let limit = 100;
    let start = i * limit;
    let content = i === batches - 1 ? remainder : limit;
    let end = start + content;
    setTimeout(() => {
      spotifyApi.addTracksToPlaylist(playlistId, playlistURIs.slice(start, end))
        .then((res) => console.log(res))
    }, i * 200)
  }
}

apiService.getFestival = async (festivalName, cb) => {
  const url = "http://localhost:8888/festival";
  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({festivalName})
    };

  const response = await fetch(url, requestOptions);
  const body = await response.json();
  cb(body[0]);
}

export default apiService;