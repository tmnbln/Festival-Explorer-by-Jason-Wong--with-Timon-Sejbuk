import './App.css'
import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
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
    if (!festival.performer) return;
    setLineUp(festival.performer);
    getArtist(festival.performer[0].name, setArtist);
    getTopArtists();
  }, [festival])
  
  useEffect(() => {
    if (!lineUp.length) return;
    getArtist(lineUp[0].name, setArtist);
    getTopArtists();
  }, [lineUp])


  useEffect(() => {
    if (!artist) return;
    getArtistTracks(artist.id, setTracks);
    getRelatedArtists(artist.id, setRelatedArtists);
  }, [artist])


  const getArtist = (artistName, cb) => {
    spotifyApi.searchArtists(artistName).then((res) => {
      cb(res.artists.items[0])
    })
  }

  const getArtistTracks = (artistId, cb) => {
    spotifyApi.getArtistTopTracks(artistId).then((res) => {
      cb(res.tracks);
    })
  }

  const getRelatedArtists = (artistId, cb) => {
    spotifyApi.getArtistRelatedArtists(artistId).then((res) => {
      cb(res.artists);
    })
  }

  const getTopArtists = async () => {
    await spotifyApi.getMyTopArtists({ 'limit': '50' })
      .then((res) => {
        let tempTopArtists = [];
        res.items.forEach(artist => tempTopArtists.push(artist.name));
        return tempTopArtists;
      })
      .then((tempTopArtists) => {
      spotifyApi.getMyTopArtists({ 'limit': '50', 'offset': '50' }).then((res) => {
        res.items.forEach(artist => tempTopArtists.push(artist.name));
        setTopArtists([...topArtists, ...tempTopArtists])
      })
    }) 
  }

  const showTopArtists = async () => {
    lineUp.forEach(artist => {
      if (topArtists.includes(artist.name)) console.log(artist.name);
    });
    setLineUp(lineUp.filter(artist => topArtists.includes(artist.name)))


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
    console.log(batches, remainder);
    
    await spotifyApi
      .getMe()
      .then((res) => {
        console.log('userID', res.id)
        return res.id
      })
      .then((userId) => {
        spotifyApi.createPlaylist(userId, { 'name': `${festival.name} 2024`, 'description': 'festify description' })
          .then((res) => {
            console.log('playlistID', res.id)
          return res.id
        })
      .then((playlistId) => {
        for (let i = 0; i < batches; i++) {
          let limit = 100;
          let start = i * limit;
          let content = i === batches - 1 ? remainder : limit;
          let end = start + content;
          setTimeout(() => {
            console.log(i);
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

  const [searchName, setSearchName] = useState('');
  const searchHandler = (e) => {
    setSearchName(e.target.value);
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    getFestival(searchName, setFestival);

  }


  return (
    <div className="App">
      {!loggedIn && <Login/>}
      {!festival && loggedIn && <Search searchName={searchName} searchHandler={searchHandler} searchSubmit={searchSubmit} />}
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
                <button className="filter-button"  onClick={showTopArtists}>FILTER</button>
              </div>
              <LineUp artist={artist} lineUp={lineUp} getArtist={getArtist} setArtist={setArtist} topArtists={topArtists} removedArtists={removedArtists} setRemovedArtists={setRemovedArtists} />
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

