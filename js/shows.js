/* What are you gonna do, steal my Songkick API key? */
const SONGKICK_API_KEY          = '2kPN9eFcrPY9pwv4';
const SONGKICK_ARTIST_ID        = '4925458';
const SONGKICK_API_CALENDAR_URL = `https://api.songkick.com/api/3.0/artists/${SONGKICK_ARTIST_ID}/calendar.json?apikey=${SONGKICK_API_KEY}`;

const LOCALE      = navigator.languages?.[0] || navigator.language;
const GRID_BORDER = '<div class="grid-row-border"></div>';

const singleMessage = text => `<div class="embiggened" id="shows_slug">${text}</div>`;

const DATE_FORMAT = luxon.DateTime.DATE_MED_WITH_WEEKDAY;
const TIME_FORMAT = luxon.DateTime.TIME_SIMPLE;

$(() => {
  const showList = $('#shows_show_list');
  const onFail = () => showList.append(singleMessage('Failed to retrieve upcoming shows! Tell Chad.'));

  $.get(SONGKICK_API_CALENDAR_URL, data => {
    const resultsPage = data.resultsPage;

    if(resultsPage.status != 'ok') {
      onFail();
      return;
    }

    const results = resultsPage.results;

    if(results.totalEntries <= 0) {
      showList.append(singleMessage('No upcoming shows.'));
      return;
    }

    showList.append(GRID_BORDER);

    results.event.forEach((s, i) => {
      const startDay = luxon.DateTime.fromISO(s.start.date);
      const day      = startDay.toLocaleString(DATE_FORMAT);
      let timeElem   = '';

      if(s.start.time) {
        const startTime = luxon.DateTime.fromISO(s.start.time);
        const time      = startTime.toLocaleString(TIME_FORMAT);
              timeElem  = `<i>${time} @ </i>`;
      }

      const showElem = `
  <div class="embiggened">
    <strong>${day}</strong>
    <br />
    <br />
    <div class="shows-time-and-venue">
      ${timeElem}
      <strong>${s.venue.displayName}</strong>
    </div>
  </div>
  <div class="embiggened">
    <strong>${s.location.city}</strong>
  </div>
  <a class="a-button link" href="${s.uri}" target="_blank">Tickets</a>
  `;

      showList.append(showElem);
      showList.append(GRID_BORDER);
    });
  })
    .fail(onFail)
    .always(() => $('#shows_loading').remove());
});
