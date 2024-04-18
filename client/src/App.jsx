import './App.css'
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import LineUp from './components/LineUp';
import Artist from './components/Artist';
import Tracks from './components/Tracks';
import RelatedArtists from './components/RelatedArtists';

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split('&').reduce((initial, item) => {
    let parts = item.split('=')
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
}

// let lineUp = [
  // {
  //   name: 'DMX',
  //   id: 0
  // },
  // {
  //   name: 'Dua Lipa',
  //   id: 1
  // },
  // {
  //   name: 'Coldplay',
  //   id: 2
  // },
// ];

// let artistIndex = 0;
// let lineUp = artistList.slice(0, 50);
// console.log(lineUp);
const playlistURIs = [];

function App() {

  const [spotifyToken, setSpotifyToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [festival, setFestival] = useState({});
  const [lineUp, setLineUp] = useState([]);
  const [artist, setArtist] = useState('');
  const [tracks, setTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  // const [percentLoaded, setPercentLoaded] = useState(0);

  useEffect(() => {
    const accessToken = getTokenFromUrl().access_token;
    window.location.hash = '';
    // console.log('this is our spotify token ', accessToken);
    
    if (accessToken) {
      setSpotifyToken(accessToken);
      spotifyApi.setAccessToken(accessToken);
      setLoggedIn(true);
    }
  })

  useEffect(() => {
    // console.log('logged in change');
    if (!loggedIn) return;
    // getArtist(lineUp[0].name, setArtist);
    // setTimeout(() => { populatePlaylist() }, 1000);
  }, [loggedIn])


  useEffect(() => {
    if (!festival.performer) return;
    setLineUp(festival.performer);
    getArtist(festival.performer[0].name, setArtist);
  }, [festival])
  

  useEffect(() => {
    // console.log('artist changed');
    if (!artist) return;
    getArtistTracks(artist.id, setTracks);
    getRelatedArtists(artist.id, setRelatedArtists);
  }, [artist])


  const getArtist = (artistName, cb) => {
    spotifyApi.searchArtists(artistName).then((res) => {
      // console.log('RES get artist ', res.artists.items[0]);
      cb(res.artists.items[0])
    })
  }

  const getArtistTracks = (artistId, cb) => {
    spotifyApi.getArtistTopTracks(artistId).then((res) => {
      // console.log('RES get tracks ', res.tracks);
      cb(res.tracks);
    })
  }

  const getRelatedArtists = (artistId, cb) => {
    spotifyApi.getArtistRelatedArtists(artistId).then((res) => {
      // console.log('RES related artists ', res);
      cb(res.artists);
    })
  }

  const getMyTopArtists = (cb) => {
    spotifyApi.getMyTopArtists().then((res) => {
      // console.log('RES get my top', res);
      cb(res);
    })
  }
  
  const populatePlaylist = async () => {
    playlistURIs.splice(0, playlistURIs.length);
    for (let i = 0; i < lineUp.length; i++) {
      setTimeout(() => {
        console.log(lineUp[i].name);
        getArtist(lineUp[i].name, (data) => {
          getArtistTracks(data.id, (data) => {
            data.forEach(track => playlistURIs.push(track.uri));
          });
        })
        // setPercentLoaded(i / (lineUp.length - 1));
      }, i * 200)
    }
  }

  const createPlaylist = async () => {
    console.log('PURI', playlistURIs);
    const batches = Math.ceil(playlistURIs.length / 100);
    const remainder = playlistURIs.length % 100;
    
    await spotifyApi
      .getMe()
      .then((res) => {
        return res.id
      })
      .then((userId) => {
        spotifyApi.createPlaylist(userId, { 'name': 'festify', 'description': 'festify description' })
          .then((res) => {
          return res.id
        })
      .then((playlistId) => {
        for (let i = 0; i < batches; i++) {
          let limit = 100;
          let start = i * limit;
          let content = i === batches - 1 ? remainder : limit;
          let end = start + content;
          setTimeout(() => {
            spotifyApi.addTracksToPlaylist(playlistId, playlistURIs.slice(start, end))
              .then((res) => {
                console.log(res);
              })
          }, i * 200)
        }
      })
      })
  }

  const getFestival = async (festivalName, cb) => {
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

  const selectFestival = () => {
    getFestival('Wireless Festival', setFestival);
  }

  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888/login">Log in</a>}
      {loggedIn && (
        <>
          {/* <p>{percentLoaded}</p> */}
          <button onClick={selectFestival}>Search Festival</button>
          <button onClick={populatePlaylist}>Populate Playlist</button>
          <button onClick={createPlaylist}>Download Playlist</button>
          <div className='dashboard'>
            <LineUp lineUp={lineUp} getArtist={getArtist} setArtist={setArtist} />
            <Artist artist={artist} />
            <Tracks tracks={tracks} />
            <RelatedArtists relatedArtists={relatedArtists} />
            </div>
        </>
      )}

    </div>
  )
}

export default App

