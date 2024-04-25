< !DOCTYPE html >
    <html>
        <head>
            <title>Spotify Web Player Integration</title>
            <script src="https://sdk.scdn.co/spotify-player.js"></script>
        </head>
        <body>
            <h1>Spotify Web Player Integration</h1>

            <script>
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = 'YOUR_ACCESS_TOKEN';
                const player = new Spotify.Player({
                    name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {cb(token); },
                volume: 0.5
            });

                // Ready
                player.addListener('ready', ({device_id}) => {
                    console.log('Ready with Device ID', device_id);

                const playButtons = document.querySelectorAll('.play-button');
                playButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const trackUri = button.getAttribute('data-track-uri');
                        play(trackUri);
                    });
                });
            });

                // Not Ready
                player.addListener('not_ready', ({device_id}) => {
                    console.log('Device ID has gone offline', device_id);
      });
                // Error handling
                player.addListener('initialization_error', ({message}) => {
                    console.error(message);
      });

                player.addListener('authentication_error', ({message}) => {
                    console.error(message);
      });

                player.addListener('account_error', ({message}) => {
                    console.error(message);
      });
                // Connect to the player
                player.connect();

                // Play a track
                player.addListener('ready', ({device_id}) => {
                    spotifyApi.play({
                        device_id: device_id,
                        uris: ['spotify:track:7xGfFoTpQ2E7fRF5lN10tr']
                    });
      });

      // Pause playback
      document.getElementById('pause-btn').addEventListener('click', () => {
                    player.pause().then(() => {
                        console.log('Paused!');
                    });
      });

      // Resume playback
      document.getElementById('resume-btn').addEventListener('click', () => {
                    player.resume().then(() => {
                        console.log('Resumed!');
                    });
      });

      // Skip to the next track
      document.getElementById('next-btn').addEventListener('click', () => {
                    player.nextTrack().then(() => {
                        console.log('Skipped to next track!');
                    });
      });

      // Skip to the previous track
      document.getElementById('prev-btn').addEventListener('click', () => {
                    player.previousTrack().then(() => {
                        console.log('Skipped to previous track!');
                    });
      });

      // Player state changed
      player.addListener('player_state_changed', state => {
                    console.log('Player state changed', state);
      });

                // Error handling
                player.addListener('initialization_error', ({message}) => {
                    console.error('Failed to initialize', message);
      });

                player.addListener('authentication_error', ({message}) => {
                    console.error('Failed to authenticate', message);
      });

                player.addListener('account_error', ({message}) => {
                    console.error('Failed to validate Spotify account', message);
      });

                player.addListener('playback_error', ({message}) => {
                    console.error('Failed to perform playback', message);
      });
    };
            </script>

            <button id="pause-btn">Pause</button>
            <button id="resume-btn">Resume</button>
            <button id="next-btn">Next Track</button>
            <button id="prev-btn">Previous Track</button>
        </body>
    </html>
