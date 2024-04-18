import './App.css'
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import LineUp from './components/LineUp';
import Artist from './components/Artist';
import Tracks from './components/Tracks';
import RelatedArtists from './components/RelatedArtists';
// import artistList from './data/index';

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split('&').reduce((initial, item) => {
    let parts = item.split('=')
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
}

// let artistIndex = 0;

let lineUp = [
  {
    name: 'DMX',
    id: 0
  },
  {
    name: 'Dua Lipa',
    id: 1
  },
  {
    name: 'Coldplay',
    id: 2
  },
];

// let lineUp = artistList;
// console.log(lineUp);

function App() {

  const [spotifyToken, setSpotifyToken] = useState('');
  const [nowPlaying, setNowPlaying] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [artist, setArtist] = useState('');
  const [tracks, setTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const playlistURIs = ['spotify:track:66orjI5vOkyxOZLHWrPklh', 'spotify:track:1BKT2I9x4RGKaKqW4up34s', 'spotify:track:0LWkaEyQRkF0XAms8Bg1fC']

  useEffect(() => {
    const accessToken = getTokenFromUrl().access_token;
    window.location.hash = '';
    console.log('this is our spotify token ', accessToken);
    
    if (accessToken) {
      setSpotifyToken(accessToken);
      spotifyApi.setAccessToken(accessToken);
      setLoggedIn(true);
    }
  })

  useEffect(() => {
    console.log('artist changed');
    if (!artist) return;

    const setArtistInfo = async () => {
      console.log('AID', artist.id)
      const artistTracks = await getArtistTracks(artist.id);
      console.log('AT', artistTracks)
      setTracks(artistTracks)
  
      const relatedArtists = await getRelatedArtists(artist.id);
      console.log('RA', relatedArtists);
      setRelatedArtists(relatedArtists)
    }

    setArtistInfo();

  }, [artist])


  const getArtist = (artistName) => {
    spotifyApi.searchArtists(artistName).then((res) => {
      console.log('RES get artist ', res.artists.items[0]);
      setArtist(res.artists.items[0])
      // artistIndex++;
    })
  }

  const getArtistTracks = async (artistId) => {
    return spotifyApi.getArtistTopTracks(artistId).then((res) => {
      console.log('RES get tracks ', res.tracks);
      return res.tracks
      // setTracks(res.tracks)
    })
  }

  const getRelatedArtists = async (artistId) => {
    return spotifyApi.getArtistRelatedArtists(artistId).then((res) => {
      console.log('RES related artists ', res);
      return res.artists;
      // setRelatedArtists(res.artists)
    })
  }

  const getMyTopArtists = () => {
    spotifyApi.getMyTopArtists().then((res) => {
      console.log('RES get my top', res);
    })
  }

  const populatePlaylist = () => {
    // console.log('test')
    // spotifyApi.searchArtists(lineUp[1]).then((res) => {
    //   console.log('RES SEARCH', res.artists.items[0].id);
    //   return res.artists.items[0].id;
    // })
    //   .then((artistId) => {
    //   spotifyApi.getT
    // })

  }

  const createPlaylist = async () => {
    console.log('in playlist')
    await spotifyApi
      .getMe()
      .then((res) => {
        console.log('RES get me', res);
        return res.id
      })
      .then((userId) => {
        spotifyApi.createPlaylist(userId, { 'name': 'festify', 'description': 'festify description' })
          .then((res) => {
          console.log('RES creating playlist', res);
          return res.id
        })
      .then((playlistId) => {
        console.log('PID', playlistId);
        spotifyApi.addTracksToPlaylist(playlistId, playlistURIs)
          .then((res) => {
            console.log(res);
          })
      })
      })
 
  }

  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888/login">Log in</a>}
      {loggedIn && (
        <>
          <button onClick={populatePlaylist}>Populate Playlist</button>
          <button onClick={createPlaylist}>Download Playlist</button>
          <LineUp lineUp={lineUp} getArtist={getArtist} />
          <Artist artist={artist} />
          <Tracks tracks={tracks} />
          <RelatedArtists relatedArtists={relatedArtists} />
        </>
      )}

    </div>
  )
}

export default App

