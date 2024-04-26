import '../App.css';
import { useState, useEffect } from 'react';
import track from './Track';

function Tracks({ tracks, spotifyToken }) {
  const [player, setPlayer] = useState(undefined);
  const [nowPlaying, setNowPlaying] = useState('');
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setTrack] = useState(track);

  useEffect(() => {

    if (spotifyToken) {

      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);

      script.onload = () => {
        window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new window.Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => cb(spotifyToken),
            volume: 0.5
          });

          setPlayer(player);

          player.addListener('ready', ({ deviceId }) => {
            console.log('Ready with Device ID', deviceId);
          });

          player.addListener('not_ready', ({ deviceId }) => {
            console.log('Device has gone offline', deviceId);
          });

          player.addListener('player_state_changed', state => {
            if (!state) return;

            setTrack(state.track_window.currentTrack);
            setPaused(state.paused);

            player.getCurrentState().then(state => {
              (!state) ? setActive(false) : setActive(true)
            });
          });

          player.connect().then(success => {
            if (success) {
              console.log('The Web Playback SDK successfully connected to Spotify!');
            }
          });
        };
      };
    }
  }, [spotifyToken]);

  // const playTrack = (trackUri) => {
  //   console.log(`Attempting to play track: ${trackUri}`);
  //   if (player && deviceId) {
  //     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
  //       method: 'PUT',
  //       body: JSON.stringify({ uris: [trackUri] }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${spotifyToken}`
  //       },
  //     }).then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       setNowPlaying(trackUri);
  //     }).catch(e => {
  //       console.error('Playback error:', e);
  //     });
  //   }
  // };

  return (
    <div className="tracks">
      <h3>Top Tracks</h3>
      {tracks.slice(0, 5).map((track) => (
        <div key={track.id}>
          <p
            className={track.url === nowPlaying ? 'track-selected' : 'track-name'}
            onClick={() => { player.togglePlay() }}
          >
            {track.name}
          </p>
        </div>
      ))}
      {isActive && currentTrack && (
        <div className="player-widget">
          <div>Now playing: {currentTrack?.name} by {currentTrack?.artists.map(artist => artist.name).join(', ')}</div>
          <div>Status: {isPaused ? 'Paused' : 'Playing'}</div>
        </div>
      )}
      <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
        &lt;&lt;
      </button>

      <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
        {isPaused ? "PLAY" : "PAUSE"}
      </button>

      <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
        &gt;&gt;
      </button>
    </div>
  );
}

export default Tracks;
