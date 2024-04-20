const { dataPage1, dataPage2 } = require('./data');
const model = require('../model/model');
const events = [...dataPage1.events, ...dataPage2.events];

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

