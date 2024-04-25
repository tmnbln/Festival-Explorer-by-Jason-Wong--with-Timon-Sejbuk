import './App.css'
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import apiService from './services/ApiServices';
import helpers from './helpers/helpers';

// custom app components 
import Login from './components/Login';
import Search from './components/Search';
import Header from './components/Header';
import LineUp from './components/LineUp';
import Artist from './components/Artist';
import Tracks from './components/Tracks';
import RelatedArtists from './components/RelatedArtists';
import SharePlaylist from './components/SharePlaylist';


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
  const [displayModal, setDisplayModal] = useState(false);
  const [playlistLink, setPlaylistLink] = useState('');

  // get and set spotify access token 
  useEffect(() => {
    const accessToken = helpers.getTokenFromUrl().access_token;
    window.location.hash = '';
    if (accessToken) {
      setSpotifyToken(accessToken);
      apiService.setAccessToken(accessToken);
      setLoggedIn(true);
    }
  })


  useEffect(() => {
    // reset dashboard if festival removed 
    if (!festival.performer) {
      resetDashboard();
    // set line-up and display first artist if festival changes 
    } else {
      setLineUp(festival.performer);
      setNewArtist(festival.performer[0].name);
      apiService.getTopArtists(setTopArtists);
    }
  }, [festival])
  

  // reset all states 
  const resetDashboard = () => {
    setLineUp([]);
    setArtist('');
    setTracks([]);
    setRelatedArtists([]);
    setRemovedArtists([]);
  }
  
  
  const downloadPlaylist = async () => {
    setDisplayModal(true);
    const tracks = await helpers.playlist.populate(lineUp, removedArtists);
    if (tracks) {
      const playlist = await helpers.playlist.create(festival, tracks);
      console.log(playlist);
      setPlaylistLink(playlist.external_urls.spotify);
    }
  }

  const setNewArtist = (artistName) => {
    helpers.setNewArtist(artistName, setArtist, setTracks, setRelatedArtists);
  } 

  const lineUpProps = {
    artist,
    lineUp,
    topArtists,
    setNewArtist,
    removedArtists,
    setRemovedArtists,
    setTracks,
    setRelatedArtists
  }

  return (
    <div className="App">
      {!loggedIn && <Login/>}
      {loggedIn && !festival && <Search setFestival={setFestival} />}
      {loggedIn && festival && (
        <div className="main-page">
            {displayModal && <SharePlaylist playlistLink={playlistLink} setDisplayModal={setDisplayModal} />}
            <Header setFestival={setFestival} festival={festival} />
            <div className='dashboard'> 
              
              <div className='dashboard-left'>
                <div className="buttons">
                  <button className="playlist-button"  onClick={downloadPlaylist}>DOWNLOAD</button>
                </div>
                <LineUp props={{...lineUpProps}} />
              </div>

              <Artist artist={artist} />

              <div className='dashboard-right'>
                <Tracks accessToken={spotifyToken} tracks={tracks} />
                <RelatedArtists relatedArtists={relatedArtists} />
              </div>

            </div>
          </div>
      )}
    </div>
  )
}

export default App
