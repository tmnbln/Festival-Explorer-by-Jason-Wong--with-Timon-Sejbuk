import './App.css'
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();


const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split('&').reduce((initial, item) => {
    let parts = item.split('=')
    initial[parts[0]] = decodeURIComponent(parts[1]);
    return initial;
  }, {});
}

function App() {

  const [spotifyToken, setSpotifyToken] = useState("");
  const [nowPlaying, setNowPlaying] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('This is what we derived from the URL ', getTokenFromUrl())
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = '';
    console.log('this is our spotify token ', spotifyToken);
    
    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      spotifyApi.getMe().then((user) => {
        console.log('U ', user);
      })
      setLoggedIn(true);
    }
  })

  const getNowPlaying = () => {
    
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log('R', response);
      setNowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url
      })
    })
  }

  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888/login">Log in</a>}
      {loggedIn && (
        <>
          <div>Now Playing: {nowPlaying.name}</div>
          <div>
            <img src={nowPlaying.albumArt} style={{height:150} } />
          </div>
        </>
      )}
      {loggedIn && (
            <button onClick={()=>getNowPlaying()}>Check now playing</button>
          )}
    </div>
  )
}

export default App
