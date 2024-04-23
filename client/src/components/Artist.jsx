import '../App.css'
import helpers from '../helpers/helpers';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';

function Artist({ artist }) {

  return (
    <div className="artist">
      {artist && <div className="artist-container">
          <AnimatePresence>
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { duration: 0.5, ease: easeInOut } }}
              exit={{ x: +500, opacity: 0, transition: { duration: 0.5, ease: easeInOut } }}
            >
           <img src={artist.images[0].url}></img>
        </motion.div>
          </AnimatePresence>
          <h2>{artist.name}</h2>
          <p>{helpers.formatNumber(artist.followers.total)} followers</p>
        </div>
      }   
    </div>
  )
}

export default Artist
