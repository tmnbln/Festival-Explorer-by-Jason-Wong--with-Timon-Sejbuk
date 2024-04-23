import SpotifyWebApi from 'spotify-web-api-js';

//initialise new spotify api instance 
const spotifyApi = new SpotifyWebApi();

const apiService = {};

// set spotify access token
apiService.setAccessToken = (accessToken) => {
  spotifyApi.setAccessToken(accessToken);
}

// search for artist by name 
apiService.getArtist = (artistName, cb) => {
  spotifyApi.searchArtists(artistName).then((res) => {
    cb(res.artists.items[0])
  })
}

apiService.getArtist2 = async (artistName) => {
  return spotifyApi.searchArtists(artistName).then((res) => {
    return res.artists.items[0];
  });
}

// get artist top tracks by spotify artist id 
apiService.getArtistTracks = (artistId, cb) => {
    spotifyApi.getArtistTopTracks(artistId).then((res) => {
      cb(res.tracks);
    })
  }

// get artist related artists by spotify artist id
apiService.getRelatedArtists = (artistId, cb) => {
    spotifyApi.getArtistRelatedArtists(artistId).then((res) => {
      cb(res.artists);
    })
  }

// get user top 100 tracks 
apiService.getTopArtists = async (cb) => {

  // const numberOfArtists = 150;
  // const limit = 50;
  // const iterations = numberOfArtists / limit;
  // let tempArr = [];

  // for (let i = 0; i < iterations; i++) {
  //   const offset = limit * i;
  //   spotifyApi.getMyTopArtists({ 'limit': '50', 'offset': `${offset}` })
  //     .then((res) => {
  //       res.items.forEach(artist => tempArr.push(artist.name));
  //   })
  // }

  // cb(...tempArr);


  await spotifyApi.getMyTopArtists({ 'limit': '50' })
    .then((res) => {
      let tempTopArtists = [];
      res.items.forEach(artist => tempTopArtists.push(artist.name));
      return tempTopArtists;
    })
    .then((tempTopArtists) => {
    spotifyApi.getMyTopArtists({ 'limit': '50', 'offset': '50' }).then((res) => {
      res.items.forEach(artist => tempTopArtists.push(artist.name));
      return tempTopArtists;
    })
    .then((tempTopArtists) => {
    spotifyApi.getMyTopArtists({ 'limit': '50', 'offset': '100' }).then((res) => {
      res.items.forEach(artist => tempTopArtists.push(artist.name));
      cb([...tempTopArtists])
    })
    })
  }) 
  
}

// get user ID 
apiService.getUserId = async () => {
  return spotifyApi.getMe()
    .then((res) =>  res.id);
}

// create new playlist for user 
apiService.createPlaylist = (userId, festivalName, festivalDescription) => {
  return spotifyApi.createPlaylist(userId,
    {
      'name': `${festivalName} 2024`,
      'description': `${festivalDescription}`,
      'public': false,
      'collaborative': true,
 })
    .then((res) => {
      return res
    });
}

// add tracks to playlist for playlist with specific id 
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

// get festival line-up from db 
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