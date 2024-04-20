import '../App.css'
import moment from 'moment';

  const formatDate = (str) => {
    return moment(new Date(str)).format("MMMM D");
  }

function Header({ festival, setFestival }) {
  
  const emptyFestival = () => {
    setFestival('');
  }

  return (
    <div className="header">

      <div onClick={emptyFestival} id="header-festify" className="festify-title-container">
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
