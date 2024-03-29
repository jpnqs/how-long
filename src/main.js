
// get url hash
const hash = window.location.hash.replace(/^#/, '');

const dates = hash.split('-');

// date given in the format YYYYMMDD perform substring read
const year = dates[0].substring(0, 4);
const month = dates[0].substring(4, 6);
const day = dates[0].substring(6, 8);

const dateStart = new Date(year, month - 1, day);

// date end
const yearEnd = dates[1].substring(0, 4);
const monthEnd = dates[1].substring(4, 6);
const dayEnd = dates[1].substring(6, 8);

const dateEnd = new Date(yearEnd, monthEnd - 1, dayEnd);

const currentDate = new Date();

// get the difference in days
const difference = dateEnd.getTime() - currentDate.getTime();
const days = Math.ceil(difference / (1000 * 3600 * 24));

// get difference between start and end
const differenceStartEnd = dateEnd.getTime() - dateStart.getTime();
const startEndDays = Math.ceil(differenceStartEnd / (1000 * 3600 * 24));

// set #till date output from endDate
document.getElementById('till').innerHTML = 'till ' + dateEnd.toLocaleDateString('DE');

const blossom = new Blossom();

const game = new Game();



blossom.appendTo(document.body);

blossom.createPetals(startEndDays, days);
game.start();
