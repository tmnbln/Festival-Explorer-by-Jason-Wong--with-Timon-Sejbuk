import { useState } from 'react';
import copyIcon from '../assets/copy-svgrepo-com.svg'
import closeIcon from '../assets/close.svg'
import { Bars } from 'react-loader-spinner';

function SharePlaylist({playlistLink, setDisplayModal}) {

  // initialise use state to track whether link copied 
  const [copied, setCopied] = useState(false);
  
  // copy link to clipboard 
  const copyLink = () => {
    navigator.clipboard.writeText(playlistLink);
    setCopied(true);
  }

  // close modal button 
  const closeModal = () => {
    setDisplayModal(false);
  }

  return (
    <div className="share-playlist">
      <div className='share-modal'>
        <img id="modal-close" src={closeIcon} onClick={closeModal}></img>
        {!playlistLink ?
          <>
            <Bars
            height="50"
            width="80"
            color="white"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
            />
           <p>please wait...</p>
          </> :
        <>
        <h3>Share. Connect. Discover.</h3>
        <p>Share with your followers or invite your friends to collaborate with this link:</p>
            <div className="playlist-link-container">
              <p>[</p> <span>{playlistLink}</span> <p>]</p>
              <img className={copied ? "copy-clicked" : "copy-unclicked"} src={copyIcon} onClick={copyLink}></img> 
            </div>
          </>
      }
      </div>
    </div>
  )
}

export default SharePlaylist


