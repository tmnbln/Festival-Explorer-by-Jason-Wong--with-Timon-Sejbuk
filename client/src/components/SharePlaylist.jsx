import { useState } from 'react';
import copyIcon from '../assets/copy-svgrepo-com.svg'
import closeIcon from '../assets/close.svg'

function SharePlaylist({playlistLink, setPlaylistLink}) {

  const [copied, setCopied] = useState(false);
  
  const copyLink = () => {
    navigator.clipboard.writeText(playlistLink);
    setCopied(true);
  }

  const closeModal = () => {
    setPlaylistLink('');
  }

  return (
    <div className="share-playlist">
      <div className='share-modal'>
        <img id="modal-close" src={closeIcon} onClick={closeModal}></img>
        <h3>Share. Connect. Discover.</h3>
        <p>Share with your followers or invite your friends to collaborate with this link:</p>
        <div className="playlist-link-container">
        <p>[</p> <span>{playlistLink}</span> <p>]</p>
          <img className={copied ? "copy-clicked" : "copy-unclicked"} src={copyIcon} onClick={copyLink}></img> 
        </div>
      </div>
    </div>
  )
}

export default SharePlaylist


