import { useState } from 'react';
import copyIcon from '../assets/copy-svgrepo-com.svg'
import tickIcon from '../assets/tick-icon.png'

function SharePlaylist({playlistLink}) {

  const [copied, setCopied] = useState(false);
  
  const copyLink = () => {
    console.log('copied');
    navigator.clipboard.writeText(playlistLink);
    setCopied(true);
  }

  return (
    <div className="share-playlist">
      <div className='share-modal'>
        <h3>Share. Connect. Discover</h3>
        <p>Share with your followers or invite your friends to collaborate.</p>
        <div className="playlist-link-container">
        <p>[</p> <span>{playlistLink}</span> <p>]</p>
        {!copied ? <img src={copyIcon} onClick={copyLink}></img> 
          : <img id="tick-icon" src={tickIcon} ></img>}
          
        </div>
      </div>
    </div>
  )
}

export default SharePlaylist


