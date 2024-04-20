import './App.css'
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import apiService from './services/ApiServices';
import helpers from './helpers/helpers';

import Login from './components/Login';
import Search from './components/Search';
import Header from './components/Header';
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

const playlistURIs = [];

function App() {

  const [spotifyToken, setSpotifyToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [festival, setFestival] = useState('');
  const [lineUp, setLineUp] = useState([]);
  const [artist, setArtist] = useState('');
  const [tracks, setTracks] = useState([]);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [removedArtists, setRemovedArtists] = useState([]);
 
  // const [percentLoaded, setPercentLoaded] = useState(0);

  useEffect(() => {
    const accessToken = getTokenFromUrl().access_token;
    window.location.hash = '';
    
    if (accessToken) {
      setSpotifyToken(accessToken);
      spotifyApi.setAccessToken(accessToken);
      setLoggedIn(true);
    }
  })

  useEffect(() => {
    if (!loggedIn) return;
    // setTimeout(() => { populatePlaylist() }, 1000);
  }, [loggedIn])

  useEffect(() => {
    if (!festival.performer) {
      resetDashboard();
    } else {
      setLineUp(festival.performer);
      apiService.getArtist(festival.performer[0].name, setArtist)
      apiService.getTopArtists(topArtists, setTopArtists);
    }
  }, [festival])
  
  useEffect(() => {
    if (!lineUp.length) return;
    apiService.getArtist(lineUp[0].name, setArtist);
    apiService.getTopArtists(topArtists, setTopArtists);
  }, [lineUp])

  useEffect(() => {
    if (!artist) return;
    apiService.getArtistTracks(artist.id, setTracks);
    apiService.getRelatedArtists(artist.id, setRelatedArtists);
  }, [artist])

  const resetDashboard = () => {
    setLineUp([]);
    setArtist('');
    setTracks([]);
    setRelatedArtists([]);
    setRemovedArtists([]);
    playlistURIs.slice(0, playlistURIs.length);
  }

  const populatePlaylist = () => {
    helpers.playlist.populate(lineUp, removedArtists, playlistURIs);
  }

  const createPlaylist = () => {
    helpers.playlist.create(festival, playlistURIs);
  }

  return (
    <div className="App">
      {!loggedIn && <Login/>}
      {!festival && loggedIn && <Search setFestival={setFestival} />}
      {loggedIn && festival && (
        <>
          {/* <p>{percentLoaded}</p> */}
        <div className="main-page">
          <Header setFestival={setFestival} festival={festival} />
            <div className='dashboard'> 
              <div className='dashboard-left'>
              <div className="buttons">
                <button className="playlist-button" onClick={populatePlaylist}>POPULATE</button>
                <button className="playlist-button"  onClick={createPlaylist}>DOWNLOAD</button>
              </div>
              <LineUp artist={artist} lineUp={lineUp} setArtist={setArtist} topArtists={topArtists} removedArtists={removedArtists} setRemovedArtists={setRemovedArtists} />
            </div>
            <Artist artist={artist} />
            <div className='dashboard-right'>
              <Tracks tracks={tracks} />
              <RelatedArtists relatedArtists={relatedArtists} />
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
