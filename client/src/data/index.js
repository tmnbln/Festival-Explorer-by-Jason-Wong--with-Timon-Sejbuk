import { dataPage1, dataPage2 } from './data.js';
let events = [...dataPage1.events, ...dataPage2.events]

let festivalName = 'Parklife'

let artistList = [];

events
  .filter(event => event['name'].includes(festivalName))
  .forEach(event => event['performer'].forEach(performer => {
    artistList.push({name: performer['name'], id: performer['identifier']})
  }));

// console.log(artistList);

export default artistList;