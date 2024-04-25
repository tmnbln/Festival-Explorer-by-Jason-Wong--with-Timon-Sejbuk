const { dataPage1, dataPage2 } = require('./data');
const model = require('../model/model');
const events = [...dataPage1.events, ...dataPage2.events];



// used to calculate top genres

let genres = {};
events.forEach(event => {
  event.performer.forEach(artist => {
    artist.genre.forEach(genre => {
      if (genres[genre]) genres[genre]++;
      else genres[genre] = 1;
    })
  })
})

genresSorted = Object.keys(genres).sort((a, b) => genres[b] - genres[a]);

genresSorted.forEach(genre => {
  let count = genres[genre];
  console.log(genre, count);
})


// used to seed db with data from jambase api 

events.forEach(event => {

  const newEvent = {
    name: event.name,
    festivalId: event.identifier,
    image: event.image,
    startDate: event.startDate,
    endDate: event.endDate,
    performer: [],
  };

  event.performer.forEach(performer => {
    const newPerformer = {
      performerType: performer['@type'],
      name: performer['name'],
      performerId: performer['identifier'],
      image: performer['image'],
      bandOrMusician: performer['x-bandOrMusician'],
      genre: performer['genre'],
      performanceDate: performer['x-performanceDate'],
      performanceRank: performer['x-performanceRank'],
      isHeadliner: performer['x-isHeadliner'],
    }
    newEvent.performer.push(newPerformer);
  })

  console.log(newEvent);
  model.addFestival(newEvent);
})

