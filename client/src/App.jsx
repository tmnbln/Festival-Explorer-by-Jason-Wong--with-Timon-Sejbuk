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

let artistIndex = 0;

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

function App() {

  const [spotifyToken, setSpotifyToken] = useState('');
  const [nowPlaying, setNowPlaying] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [artist, setArtist] = useState('');
  const [tracks, setTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);

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
    getArtistInfo();
    
  }, [artist])


  const getArtist = (artistName) => {
    spotifyApi.searchArtists(artistName).then((res) => {
      console.log('RES get artist ', res.artists.items[0]);
      setArtist(res.artists.items[0])
      artistIndex++;
    })
  }

  const getArtistInfo = () => {
    spotifyApi.getArtistTopTracks(artist.id).then((res) => {
      console.log('RES get tracks ', res.tracks);
      setTracks(res.tracks)
    })
    spotifyApi.getArtistRelatedArtists(artist.id).then((res) => {
      console.log('RES related artists ', res);
      setRelatedArtists(res.artists)
    })
  }

  
  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888/login">Log in</a>}
      {loggedIn && (
        <>
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
