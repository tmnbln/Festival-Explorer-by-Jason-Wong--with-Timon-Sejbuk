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
  const [displayModal, setDisplayModal] = useState(false);
  const [playlistLink, setPlaylistLink] = useState('');
  // const [percentLoaded, setPercentLoaded] = useState(0);

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
    if (!loggedIn) return;
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
    apiService.getRelatedArtists(artist.id, setRelatedArtists);
    apiService.getArtistTracks(artist.id, setTracks);
    // Promise.all(apiService.getArtistTracks(artist.id, setTracks), apiService.getRelatedArtists(artist.id, setRelatedArtists))
  }, [artist])

  const resetDashboard = () => {
    setLineUp([]);
    setArtist('');
    setTracks([]);
    setRelatedArtists([]);
    setRemovedArtists([]);
    playlistURIs.slice(0, playlistURIs.length);
  }

  
  // const download = async () => {
  //   setTimeout(()=>createPlaylist(), 10000);
  // }
  
  const downloadPlaylist = async () => {
    setDisplayModal(true);
    const tracks = await helpers.playlist.populate(lineUp, removedArtists);
    if (tracks) {
      const playlist = await helpers.playlist.create(festival, tracks);
      console.log(playlist);
      setPlaylistLink(playlist.external_urls.spotify);
    }
  }

  return (
    <div className="App">
      {!loggedIn && <Login/>}
      {!festival && loggedIn && <Search setFestival={setFestival} />}
      {loggedIn && festival && (
        <>
          {/* <p>{percentLoaded}</p> */}
          <div className="main-page">
            {displayModal && <SharePlaylist playlistLink={playlistLink} setDisplayModal={setDisplayModal} />}
            <Header setFestival={setFestival} festival={festival} />
            <div className='dashboard'> 
              <div className='dashboard-left'>
              <div className="buttons">
                <button className="playlist-button"  onClick={downloadPlaylist}>DOWNLOAD</button>
              </div>
                <LineUp artist={artist} lineUp={lineUp} setArtist={setArtist} topArtists={topArtists} removedArtists={removedArtists} setRemovedArtists={setRemovedArtists} setTracks={setTracks} setRelatedArtists={ setRelatedArtists } />
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
