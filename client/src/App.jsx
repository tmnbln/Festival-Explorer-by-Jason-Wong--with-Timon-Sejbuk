import './App.css'
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
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
let artistList = ['Dua Lipa', 'Coldplay', 'SZA', 'DMX'];

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
      spotifyApi.getMe().then((user) => {
        console.log('user info ', user);
      })
      setLoggedIn(true);
    }
  })

  useEffect(() => {
    console.log('artist changed');
    if (!artist) return;
    getArtistInfo();
    
  }, [artist])

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((res) => {
      console.log('playback res ', res);
      setNowPlaying({
        name: res.item.name,
        albumArt: res.item.album.images[0].url
      })
    })
  }

  const getArtist = () => {
    spotifyApi.searchArtists(artistList[artistIndex]).then((res) => {
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

  const playTrack = () => {
    let audio = new Audio(tracks[0].preview_url)
  
    const play = () => {
      audio.play()
    }

    play();

  }


  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888/login">Log in</a>}
      {
        loggedIn && (
        <>
            <button onClick={() => getArtist()}>get artist</button>
            <button onClick={playTrack}>Play</button>
        </>
        )}
      
      {loggedIn && (
        <>
          <Artist artist={artist} />
          <Tracks tracks={tracks} />
          <RelatedArtists relatedArtists={relatedArtists} />
        </>
      )}

    </div>
  )
}

export default App
