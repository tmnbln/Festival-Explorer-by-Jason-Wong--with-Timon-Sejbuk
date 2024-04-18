import '../App.css'
import { useState, useEffect } from 'react';
import moment from 'moment';

  const formatDate = (str) => {
    return moment(new Date(str)).format("MMMM D");
  }

function Header({festival}) {

  return (
    <div className="Header">
      <h1>{festival.name}</h1>
      <h3>{formatDate(festival.startDate)} {festival.startDate === festival.endDate ? '' : `- ${formatDate(festival.endDate)}`} </h3>
    </div>
  )
}

export default Header
