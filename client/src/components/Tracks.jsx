import '../App.css';
import { useState, useEffect } from 'react';
// branch brunch 🥪
function Tracks({ tracks, accessToken }) {
  const [player, setPlayer] = useState(undefined);
  const [nowPlaying, setNowPlaying] = useState('');
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState(null);
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    console.log(accessToken);
    if (accessToken) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);


      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: cb => cb(accessToken),
          volume: 1
        });

        setPlayer(player);

        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          setDeviceId(device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device has gone offline', device_id);
        });

        player.addListener('player_state_changed', state => {
          if (!state) return;
          setTrack(state.track_window.current_track);
          setPaused(state.paused);
          setActive(true);
          const songSlider = document.getElementById('song-slider');
          songSlider.value = Math.round(state.position);
          songSlider.max = Math.round(state.duration);
        });

        player.connect();
      };
    }
  }, [accessToken]);

  useEffect(() => {
    return () => {
      player && player.disconnect();
    };
  }, [player, accessToken]);

  const playTrack = (trackUri) => {
    if (!deviceId) {
      console.error('No device ID found. Make sure the Spotify player is ready.');
      return;
    }

    const songSlider = document.getElementById('song-slider');
    songSlider.addEventListener('input', () => {
      const seekPosition = songSlider.value;
      player.seek(seekPosition).then(() => {
        console.log('Changed position!');
      });
    });

    songSlider.addEventListener('input', () => {
      const seekPosition = Math.round(songSlider.value);
      player.seek(seekPosition).then(() => {
        console.log('Changed position!');
      });
    });

    console.log(`Attempting to play track: ${trackUri}`);
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [trackUri] }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNowPlaying(trackUri);
    }).catch(e => {
      console.error('Playback error:', e);
    });
  };


  return (
    <div className="tracks">
      <h3>Top Tracks</h3>
      {tracks.slice(0, 5).map((track) => (
        <div key={track.id}>
          <p
            className={track.url === nowPlaying ? 'track-selected' : 'track-name'}
            onClick={() => playTrack(`spotify:track:` + track.id)}
          >
            {track.name}
          </p>
        </div>
      ))}
      {isActive && currentTrack && (
        <div className="player-widget">
          <div>Now playing: {currentTrack.name})}</div>
          <div>Status: {isPaused ? 'Paused' : 'Playing'}</div>
        </div>
      )}
      <button className="btn-spotify" onClick={() => player.togglePlay()}>
        {isPaused ? "PLAY" : "PAUSE"}
      </button>
      <input type="range" id="song-slider" min="0" max="100" value="0" step="1"></input>
    </div>
  );
}

export default Tracks;
