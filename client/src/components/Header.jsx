import '../App.css'
import helpers from '../helpers/helpers';
const formatDate = helpers.formatNumber;

function Header({ festival, setFestival }) {
  
  // reset festival to begin search again
  const resetFestival = () => setFestival('');

  return (
    <div className="header">
      <div onClick={resetFestival} id="header-festify" className="festify-title-container">
        <h1 id="header-festify-text" className="festify-title">F</h1>
      </div>
      <div className="header-festival">
        <h1>{festival.name}</h1>
        <h3>{formatDate(festival.startDate)} {festival.startDate === festival.endDate ? '' : `- ${formatDate(festival.endDate)}`} </h3>
      </div>
    </div>
  )
}

export default Header
